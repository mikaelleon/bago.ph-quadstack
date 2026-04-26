"use strict";

const { getPool } = require("../db");

function fallbackOverview() {
  return {
    totals: {
      schedules_total: 0,
      reports_total: 0,
      reports_open: 0,
      reports_resolved: 0,
      residents_total: 0,
      collectors_total: 0,
      eco_points_total: 0,
      compliance_avg: 0
    },
    series: {
      reports_by_status: [],
      schedules_by_status: [],
      eco_points_by_day: []
    }
  };
}

function dbUnavailable(err) {
  return Boolean(
    err &&
      (err.code === "ENOTFOUND" ||
        err.code === "ECONNREFUSED" ||
        err.code === "ER_ACCESS_DENIED_ERROR" ||
        err.code === "ER_BAD_DB_ERROR")
  );
}

async function getOverview(_filters) {
  const pool = getPool();
  try {
    const [[sched]] = await pool.query("SELECT COUNT(*) AS count FROM collection_schedules");
    const [[reportTotal]] = await pool.query("SELECT COUNT(*) AS count FROM waste_reports");
    const [[reportOpen]] = await pool.query(
      "SELECT COUNT(*) AS count FROM waste_reports WHERE status IN ('Open','Acknowledged','In Progress')"
    );
    const [[reportResolved]] = await pool.query(
      "SELECT COUNT(*) AS count FROM waste_reports WHERE status = 'Resolved'"
    );
    const [[residentCount]] = await pool.query("SELECT COUNT(*) AS count FROM residents");
    const [[collectorCount]] = await pool.query("SELECT COUNT(*) AS count FROM collectors");
    const [[ecoTotal]] = await pool.query(
      "SELECT COALESCE(SUM(points_delta),0) AS points FROM eco_points_ledger"
    );
    const [[complianceAvg]] = await pool.query(
      "SELECT COALESCE(AVG(compliance_rate),0) AS value FROM barangays"
    );
    const [reportsByStatus] = await pool.query(
      "SELECT status AS label, COUNT(*) AS value FROM waste_reports GROUP BY status"
    );
    const [schedulesByStatus] = await pool.query(
      "SELECT status AS label, COUNT(*) AS value FROM collection_schedules GROUP BY status"
    );
    const [ecoByDay] = await pool.query(
      `SELECT DATE(created_at) AS label, COALESCE(SUM(points_delta),0) AS value
       FROM eco_points_ledger
       GROUP BY DATE(created_at)
       ORDER BY DATE(created_at) DESC
       LIMIT 14`
    );
    return {
      totals: {
        schedules_total: Number(sched.count || 0),
        reports_total: Number(reportTotal.count || 0),
        reports_open: Number(reportOpen.count || 0),
        reports_resolved: Number(reportResolved.count || 0),
        residents_total: Number(residentCount.count || 0),
        collectors_total: Number(collectorCount.count || 0),
        eco_points_total: Number(ecoTotal.points || 0),
        compliance_avg: Number(complianceAvg.value || 0)
      },
      series: {
        reports_by_status: reportsByStatus,
        schedules_by_status: schedulesByStatus,
        eco_points_by_day: ecoByDay.reverse()
      }
    };
  } catch (e) {
    if (dbUnavailable(e)) return fallbackOverview();
    throw e;
  }
}

module.exports = { getOverview };
