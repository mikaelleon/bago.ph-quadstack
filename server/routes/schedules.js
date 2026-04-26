"use strict";

const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const { requireApiAccess } = require("../middleware/route-policy");
const {
  listSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule
} = require("../services/schedules-service");

const router = express.Router();

router.use(authMiddleware(true));

router.get("/", async (req, res) => {
  try {
    const rows = await listSchedules({ barangayId: req.query.barangay_id });
    return res.json(rows);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to load schedules" });
  }
});

router.post("/", requireApiAccess("schedules", "write"), async (req, res) => {
  const lgu_admin_id = req.user.lgu_admin_id;
  if (!lgu_admin_id) {
    return res.status(403).json({ error: "LGU admin record required" });
  }

  const barangay_id = Number(req.body.barangay_id);
  const waste_type = String(req.body.waste_type || "");
  const collection_date = String(req.body.collection_date || "");
  let time_start = String(req.body.time_start || "06:00:00");
  let time_end = String(req.body.time_end || "10:00:00");
  const status = String(req.body.status || "Scheduled");

  const allowedWaste = ["Biodegradable", "Non-Biodegradable", "Recyclable", "Residual"];
  if (!barangay_id || !allowedWaste.includes(waste_type)) {
    return res.status(400).json({ error: "barangay_id and valid waste_type required" });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(collection_date)) {
    return res.status(400).json({ error: "collection_date must be YYYY-MM-DD" });
  }

  if (/^\d{2}:\d{2}$/.test(time_start)) time_start += ":00";
  if (/^\d{2}:\d{2}$/.test(time_end)) time_end += ":00";

  try {
    const row = await createSchedule({
      barangay_id,
      waste_type,
      collection_date,
      time_start,
      time_end,
      status,
      created_by: lgu_admin_id
    });
    return res.status(201).json(row);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to create schedule" });
  }
});

router.patch("/:id", requireApiAccess("schedules", "write"), async (req, res) => {
  const id = Number(req.params.id);
  const lgu_admin_id = req.user.lgu_admin_id;
  if (!id || !lgu_admin_id) return res.status(400).json({ error: "Invalid request" });

  const updates = [];
  const values = [];
  if (req.body.status != null) {
    updates.push("status = ?");
    values.push(String(req.body.status));
  }
  if (req.body.collection_date != null) {
    updates.push("collection_date = ?");
    values.push(String(req.body.collection_date));
  }
  if (req.body.time_start != null) {
    let t = String(req.body.time_start);
    if (/^\d{2}:\d{2}$/.test(t)) t += ":00";
    updates.push("time_start = ?");
    values.push(t);
  }
  if (req.body.time_end != null) {
    let t = String(req.body.time_end);
    if (/^\d{2}:\d{2}$/.test(t)) t += ":00";
    updates.push("time_end = ?");
    values.push(t);
  }
  if (req.body.waste_type != null) {
    updates.push("waste_type = ?");
    values.push(String(req.body.waste_type));
  }
  if (req.body.barangay_id != null) {
    updates.push("barangay_id = ?");
    values.push(Number(req.body.barangay_id));
  }
  if (!updates.length) {
    return res.status(400).json({ error: "No fields to update" });
  }

  try {
    const row = await updateSchedule(id, updates, values);
    if (!row) return res.status(404).json({ error: "Schedule not found" });
    return res.json(row);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to update schedule" });
  }
});

router.delete("/:id", requireApiAccess("schedules", "write"), async (req, res) => {
  const id = Number(req.params.id);
  const lgu_admin_id = req.user.lgu_admin_id;
  if (!id || !lgu_admin_id) return res.status(400).json({ error: "Invalid request" });
  try {
    const ok = await deleteSchedule(id);
    if (!ok) return res.status(404).json({ error: "Schedule not found" });
    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to delete schedule" });
  }
});

module.exports = router;
