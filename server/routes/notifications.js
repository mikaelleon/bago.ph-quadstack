"use strict";

const express = require("express");
const { getPool } = require("../db");
const { authMiddleware } = require("../middleware/auth");
const { listRecentScheduleEvents } = require("../services/schedules-service");

const router = express.Router();

router.use(authMiddleware(true));

router.get("/schedule", async (_req, res) => {
  try {
    const rows = await listRecentScheduleEvents(20);
    const items = rows.map((row) => ({
      id: `sched-${row.schedule_id}-${new Date(row.updated_at).getTime()}`,
      schedule_id: row.schedule_id,
      title: "Schedule Update",
      message: `${row.barangay_name}: ${row.waste_type} on ${String(row.collection_date).slice(0, 10)} is ${row.status}.`,
      updated_at: row.updated_at
    }));
    return res.json(items);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to load schedule notifications" });
  }
});

router.get("/reports", async (req, res) => {
  const pool = getPool();
  const role = req.user.role;
  const residentId = req.user.resident_id;
  let sql = `
    SELECT report_id, reference_number, status, submitted_at, resolved_at
    FROM waste_reports
  `;
  const params = [];
  if (role === "user" && residentId) {
    sql += " WHERE resident_id = ?";
    params.push(residentId);
  }
  sql += " ORDER BY COALESCE(resolved_at, submitted_at) DESC LIMIT 20";
  try {
    const [rows] = await pool.query(sql, params);
    const items = rows.map((row) => ({
      id: `report-${row.report_id}-${row.status}`,
      report_id: row.report_id,
      title: "Report Status Update",
      message: `${row.reference_number}: status is now ${row.status}.`,
      updated_at: row.resolved_at || row.submitted_at
    }));
    return res.json(items);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to load report notifications" });
  }
});

module.exports = router;
