"use strict";

const express = require("express");
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

module.exports = router;
