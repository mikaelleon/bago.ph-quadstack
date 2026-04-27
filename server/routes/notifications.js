"use strict";

const express = require("express");
const { getPool } = require("../db");
const { authMiddleware } = require("../middleware/auth");
const { listRecentScheduleEvents } = require("../services/schedules-service");
const { listAnnouncements } = require("../services/announcements-service");

const router = express.Router();
function err(res, status, code, error) {
  return res.status(status).json({ code, error });
}

router.use(authMiddleware(true));

async function loadScheduleItems() {
  const rows = await listRecentScheduleEvents(20);
  return rows.map((row) => ({
    id: `sched-${row.schedule_id}-${new Date(row.updated_at).getTime()}`,
    schedule_id: row.schedule_id,
    title: "Schedule Update",
    message: `${row.barangay_name}: ${row.waste_type} on ${String(row.collection_date).slice(0, 10)} is ${row.status}.`,
    updated_at: row.updated_at
  }));
}

async function loadReportItems(user) {
  const pool = getPool();
  const role = user.role;
  const residentId = user.resident_id;
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
  const [rows] = await pool.query(sql, params);
  return rows.map((row) => ({
    id: `report-${row.report_id}-${row.status}`,
    report_id: row.report_id,
    title: "Report Status Update",
    message: `${row.reference_number}: status is now ${row.status}.`,
    updated_at: row.resolved_at || row.submitted_at
  }));
}

async function loadAnnouncementItems(scope) {
  const rows = await listAnnouncements(scope || "all");
  return rows.map((row) => ({
    id: `announcement-${row.announcement_id}`,
    announcement_id: row.announcement_id,
    title: row.urgency === "Urgent" ? "Urgent Announcement" : "Announcement",
    message: `${row.title}: ${row.message}`,
    updated_at: row.created_at
  }));
}

router.get("/schedule", async (_req, res) => {
  try {
    const items = await loadScheduleItems();
    return res.json(items);
  } catch (e) {
    console.error(e);
    return err(res, 500, "NOTIFICATIONS_SCHEDULE_FAILED", "Failed to load schedule notifications");
  }
});

router.get("/reports", async (req, res) => {
  try {
    const items = await loadReportItems(req.user);
    return res.json(items);
  } catch (e) {
    console.error(e);
    return err(res, 500, "NOTIFICATIONS_REPORT_FAILED", "Failed to load report notifications");
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await Promise.allSettled([
      loadScheduleItems(),
      loadReportItems(req.user),
      loadAnnouncementItems(req.query.scope || "all")
    ]);
    const schedule = results[0].status === "fulfilled" ? results[0].value : [];
    const reports = results[1].status === "fulfilled" ? results[1].value : [];
    const announcements = results[2].status === "fulfilled" ? results[2].value : [];
    const items = schedule.concat(reports, announcements).sort((a, b) => {
      const ta = new Date(a.updated_at).getTime();
      const tb = new Date(b.updated_at).getTime();
      return tb - ta;
    });
    return res.json(items.slice(0, 50));
  } catch (e) {
    console.error(e);
    return err(res, 500, "NOTIFICATIONS_FEED_FAILED", "Failed to load notifications feed");
  }
});

module.exports = router;
