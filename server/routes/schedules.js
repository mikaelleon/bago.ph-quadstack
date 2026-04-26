"use strict";

const express = require("express");
const { getPool } = require("../db");
const { authMiddleware } = require("../middleware/auth");
const { requireApiAccess } = require("../middleware/route-policy");

const router = express.Router();

router.use(authMiddleware(true));

router.get("/", async (req, res) => {
  const barangayId = req.query.barangay_id;
  const pool = getPool();
  let sql = `
    SELECT s.schedule_id, s.barangay_id, b.barangay_name, s.waste_type,
           s.collection_date, s.time_start, s.time_end, s.status, s.created_by, s.updated_at
    FROM collection_schedules s
    JOIN barangays b ON b.barangay_id = s.barangay_id
  `;
  const params = [];
  if (barangayId && barangayId !== "all") {
    sql += " WHERE s.barangay_id = ?";
    params.push(Number(barangayId));
  }
  sql += " ORDER BY s.collection_date ASC, s.time_start ASC";
  try {
    const [rows] = await pool.query(sql, params);
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

  const pool = getPool();
  try {
    const [r] = await pool.query(
      `INSERT INTO collection_schedules
        (barangay_id, waste_type, collection_date, time_start, time_end, status, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [barangay_id, waste_type, collection_date, time_start, time_end, status, lgu_admin_id]
    );
    const [[row]] = await pool.query(
      `SELECT s.schedule_id, s.barangay_id, b.barangay_name, s.waste_type,
              s.collection_date, s.time_start, s.time_end, s.status, s.created_by, s.updated_at
       FROM collection_schedules s
       JOIN barangays b ON b.barangay_id = s.barangay_id
       WHERE s.schedule_id = ?`,
      [r.insertId]
    );
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
  const vals = [];
  if (req.body.status != null) {
    updates.push("status = ?");
    vals.push(String(req.body.status));
  }
  if (req.body.collection_date != null) {
    updates.push("collection_date = ?");
    vals.push(String(req.body.collection_date));
  }
  if (req.body.time_start != null) {
    let t = String(req.body.time_start);
    if (/^\d{2}:\d{2}$/.test(t)) t += ":00";
    updates.push("time_start = ?");
    vals.push(t);
  }
  if (req.body.time_end != null) {
    let t = String(req.body.time_end);
    if (/^\d{2}:\d{2}$/.test(t)) t += ":00";
    updates.push("time_end = ?");
    vals.push(t);
  }
  if (!updates.length) {
    return res.status(400).json({ error: "No fields to update" });
  }

  vals.push(id);
  const pool = getPool();
  try {
    const [result] = await pool.query(
      `UPDATE collection_schedules SET ${updates.join(", ")} WHERE schedule_id = ?`,
      vals
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Schedule not found" });
    const [[row]] = await pool.query(
      `SELECT s.schedule_id, s.barangay_id, b.barangay_name, s.waste_type,
              s.collection_date, s.time_start, s.time_end, s.status, s.created_by, s.updated_at
       FROM collection_schedules s
       JOIN barangays b ON b.barangay_id = s.barangay_id
       WHERE s.schedule_id = ?`,
      [id]
    );
    return res.json(row);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to update schedule" });
  }
});

module.exports = router;
