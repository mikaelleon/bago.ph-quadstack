"use strict";

const express = require("express");
const { getPool } = require("../db");
const { authMiddleware } = require("../middleware/auth");
const { requireApiAccess } = require("../middleware/route-policy");

const router = express.Router();

router.use(authMiddleware(true));

const ISSUE_TYPES = new Set([
  "Missed Pickup",
  "Overflowing Bin",
  "Illegal Dumping",
  "Blocked Road",
  "Other"
]);

router.get("/", async (req, res) => {
  const pool = getPool();
  const role = req.user.role;
  const residentId = req.user.resident_id;

  let sql = `
    SELECT r.report_id, r.reference_number, r.resident_id, r.barangay_id, b.barangay_name,
           r.issue_type, r.description, r.street_address, r.gps_latitude, r.gps_longitude,
           r.status, r.assigned_to, r.submitted_at, r.resolved_at,
           res.full_name AS resident_name
    FROM waste_reports r
    JOIN barangays b ON b.barangay_id = r.barangay_id
    JOIN residents res ON res.resident_id = r.resident_id
  `;
  const params = [];
  if (role === "user") {
    if (!residentId) return res.json([]);
    sql += " WHERE r.resident_id = ?";
    params.push(residentId);
  }
  sql += " ORDER BY r.submitted_at DESC";

  try {
    const [rows] = await pool.query(sql, params);
    return res.json(rows);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to load reports" });
  }
});

router.post("/", requireApiAccess("reports", "create"), async (req, res) => {
  const resident_id = req.user.resident_id;
  if (!resident_id) {
    return res.status(403).json({ error: "Resident profile required to submit reports" });
  }

  const issue_type = String(req.body.issue_type || "");
  const description = String(req.body.description || "").slice(0, 5000);
  const street_address = String(req.body.street_address || "").slice(0, 200);
  const barangay_id = Number(req.body.barangay_id);

  if (!ISSUE_TYPES.has(issue_type)) {
    return res.status(400).json({ error: "Invalid issue_type" });
  }
  if (!street_address || !barangay_id) {
    return res.status(400).json({ error: "street_address and barangay_id required" });
  }

  const pool = getPool();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const tmpRef = `TMP-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const lat = req.body.gps_latitude != null ? Number(req.body.gps_latitude) : null;
    const lng = req.body.gps_longitude != null ? Number(req.body.gps_longitude) : null;

    const [ins] = await conn.query(
      `INSERT INTO waste_reports
        (reference_number, resident_id, barangay_id, issue_type, description, street_address,
         gps_latitude, gps_longitude, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Open')`,
      [
        tmpRef,
        resident_id,
        barangay_id,
        issue_type,
        description || null,
        street_address,
        Number.isFinite(lat) ? lat : null,
        Number.isFinite(lng) ? lng : null
      ]
    );

    const reference_number = `RPT-2025-${String(ins.insertId).padStart(5, "0")}`;
    await conn.query(
      "UPDATE waste_reports SET reference_number = ? WHERE report_id = ?",
      [reference_number, ins.insertId]
    );

    await conn.commit();

    const [[row]] = await pool.query(
      `SELECT r.report_id, r.reference_number, r.resident_id, r.barangay_id, b.barangay_name,
              r.issue_type, r.description, r.street_address, r.gps_latitude, r.gps_longitude,
              r.status, r.assigned_to, r.submitted_at, r.resolved_at, res.full_name AS resident_name
       FROM waste_reports r
       JOIN barangays b ON b.barangay_id = r.barangay_id
       JOIN residents res ON res.resident_id = r.resident_id
       WHERE r.report_id = ?`,
      [ins.insertId]
    );
    return res.status(201).json(row);
  } catch (e) {
    await conn.rollback();
    console.error(e);
    return res.status(500).json({ error: "Failed to create report" });
  } finally {
    conn.release();
  }
});

router.patch("/:id", requireApiAccess("reports", "update"), async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid id" });

  const status = req.body.status != null ? String(req.body.status) : null;
  const assigned_to = req.body.assigned_to != null ? Number(req.body.assigned_to) : null;

  const allowed = ["Open", "Acknowledged", "In Progress", "Resolved", "Rejected"];
  const updates = [];
  const vals = [];

  if (status) {
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    updates.push("status = ?");
    vals.push(status);
    if (status === "Resolved" || status === "Rejected") {
      updates.push("resolved_at = CURRENT_TIMESTAMP");
    }
  }
  if (assigned_to !== null && Number.isFinite(assigned_to)) {
    updates.push("assigned_to = ?");
    vals.push(assigned_to);
  }

  if (!updates.length) return res.status(400).json({ error: "No fields to update" });

  vals.push(id);
  const pool = getPool();
  try {
    const [result] = await pool.query(
      `UPDATE waste_reports SET ${updates.join(", ")} WHERE report_id = ?`,
      vals
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Report not found" });
    const [[row]] = await pool.query(
      `SELECT r.report_id, r.reference_number, r.resident_id, r.barangay_id, b.barangay_name,
              r.issue_type, r.description, r.street_address, r.gps_latitude, r.gps_longitude,
              r.status, r.assigned_to, r.submitted_at, r.resolved_at, res.full_name AS resident_name
       FROM waste_reports r
       JOIN barangays b ON b.barangay_id = r.barangay_id
       JOIN residents res ON res.resident_id = r.resident_id
       WHERE r.report_id = ?`,
      [id]
    );
    return res.json(row);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to update report" });
  }
});

module.exports = router;
