"use strict";

const express = require("express");
const path = require("path");
const multer = require("multer");
const { getPool } = require("../db");
const { authMiddleware } = require("../middleware/auth");
const { requireApiAccess } = require("../middleware/route-policy");
const {
  writeReportImage,
  buildSignedImageUrl,
  verifyImageToken,
  readReportImage
} = require("../services/report-media");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 2 }
});
function err(res, status, code, error) {
  return res.status(status).json({ code, error });
}

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
  const filterStatus = String(req.query.status || "").trim();

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
  const where = [];
  if (role === "user") {
    if (!residentId) return res.json([]);
    where.push("r.resident_id = ?");
    params.push(residentId);
  }
  if (filterStatus) {
    where.push("r.status = ?");
    params.push(filterStatus);
  }
  if (where.length) {
    sql += " WHERE " + where.join(" AND ");
  }
  sql += " ORDER BY r.submitted_at DESC";

  try {
    const [rows] = await pool.query(sql, params);
    const hostBase = `${req.protocol}://${req.get("host")}`;
    rows.forEach((row) => {
      const image = readReportImage(row.report_id);
      row.image_url = image ? buildSignedImageUrl(hostBase, row.report_id) : null;
    });
    return res.json(rows);
  } catch (e) {
    console.error(e);
    return err(res, 500, "REPORT_LIST_FAILED", "Failed to load reports");
  }
});

router.post("/", requireApiAccess("reports", "create"), upload.single("photo"), async (req, res) => {
  const resident_id = req.user.resident_id;
  if (!resident_id) {
    return err(res, 403, "REPORT_RESIDENT_REQUIRED", "Resident profile required to submit reports");
  }

  const issue_type = String(req.body.issue_type || "");
  const description = String(req.body.description || "").slice(0, 5000);
  const street_address = String(req.body.street_address || "").slice(0, 200);
  const barangay_id = Number(req.body.barangay_id);

  if (!ISSUE_TYPES.has(issue_type)) {
    return err(res, 400, "REPORT_INVALID_ISSUE_TYPE", "Invalid issue_type");
  }
  if (!street_address || !barangay_id) {
    return err(res, 400, "REPORT_MISSING_FIELDS", "street_address and barangay_id required");
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

    if (req.file && req.file.buffer) {
      const filePath = writeReportImage(ins.insertId, req.file.buffer, req.file.mimetype);
      await conn.query(
        "UPDATE waste_reports SET description = CONCAT(IFNULL(description,''), ?) WHERE report_id = ?",
        [` [img:${path.basename(filePath)}]`, ins.insertId]
      );
    }
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
    row.image_url = buildSignedImageUrl(`${req.protocol}://${req.get("host")}`, row.report_id);
    return res.status(201).json(row);
  } catch (e) {
    await conn.rollback();
    console.error(e);
    return err(res, 500, "REPORT_CREATE_FAILED", "Failed to create report");
  } finally {
    conn.release();
  }
});

async function patchReport(req, res) {
  const id = Number(req.params.id);
  if (!id) return err(res, 400, "REPORT_INVALID_ID", "Invalid id");

  const status = req.body.status != null ? String(req.body.status) : null;
  const assigned_to = req.body.assigned_to != null ? Number(req.body.assigned_to) : null;

  const allowed = ["Open", "Acknowledged", "In Progress", "Resolved", "Rejected"];
  const updates = [];
  const vals = [];

  if (status) {
    if (!allowed.includes(status)) {
      return err(res, 400, "REPORT_INVALID_STATUS", "Invalid status");
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

  if (!updates.length) return err(res, 400, "REPORT_NO_UPDATES", "No fields to update");

  vals.push(id);
  const pool = getPool();
  try {
    const [result] = await pool.query(
      `UPDATE waste_reports SET ${updates.join(", ")} WHERE report_id = ?`,
      vals
    );
    if (result.affectedRows === 0) return err(res, 404, "REPORT_NOT_FOUND", "Report not found");
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
    return err(res, 500, "REPORT_UPDATE_FAILED", "Failed to update report");
  }
}

router.patch("/:id", requireApiAccess("reports", "update"), patchReport);

router.patch("/:id/status", requireApiAccess("reports", "update"), async (req, res) => {
  return patchReport(req, res);
});

router.get("/:id/image-url", authMiddleware(true), async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return err(res, 400, "REPORT_INVALID_ID", "Invalid id");
  return res.json({ image_url: buildSignedImageUrl(`${req.protocol}://${req.get("host")}`, id) });
});

router.get("/image/:id", async (req, res) => {
  const id = Number(req.params.id);
  const token = String(req.query.token || "");
  if (!id || !verifyImageToken(token, id)) {
    return err(res, 403, "REPORT_MEDIA_TOKEN_INVALID", "Invalid or expired media token");
  }
  const file = readReportImage(id);
  if (!file) return err(res, 404, "REPORT_IMAGE_NOT_FOUND", "Image not found");
  const ext = path.extname(file.filename).toLowerCase();
  const mime =
    ext === ".jpg" || ext === ".jpeg"
      ? "image/jpeg"
      : ext === ".png"
        ? "image/png"
        : ext === ".webp"
          ? "image/webp"
          : ext === ".gif"
            ? "image/gif"
            : "application/octet-stream";
  res.setHeader("Content-Type", mime);
  return res.sendFile(file.path);
});

module.exports = router;
