"use strict";

const crypto = require("crypto");
const express = require("express");
const { getPool } = require("../db");
const { authMiddleware } = require("../middleware/auth");
const { requireApiAccess } = require("../middleware/route-policy");
const { creditLedger } = require("../services/eco-points-service");
const { writeAudit } = require("../services/audit-log");
const { generateQrToken } = require("../services/qr-token");

const router = express.Router();
router.use(authMiddleware(true));

function buildShortToken() {
  return `BAGO-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
}

router.get("/my-card", requireApiAccess("qr", "card_read"), async (req, res) => {
  const residentId = Number(req.user.resident_id);
  if (!residentId) return res.status(400).json({ error: "Resident session required" });

  const pool = getPool();
  try {
    const [[resident]] = await pool.query(
      `SELECT r.resident_id, r.household_id, r.full_name, b.barangay_name
       FROM residents r
       JOIN barangays b ON b.barangay_id = r.barangay_id
       WHERE r.resident_id = ?
       LIMIT 1`,
      [residentId]
    );
    if (!resident) return res.status(404).json({ error: "Resident record not found" });

    const [[row]] = await pool.query(
      `SELECT qr_id, secure_token, status, issued_date, expiry_date
       FROM qr_codes
       WHERE household_id = ? AND qr_type = 'Household'
       ORDER BY qr_id DESC
       LIMIT 1`,
      [resident.household_id]
    );

    return res.json({
      resident_id: resident.resident_id,
      full_name: resident.full_name,
      household_id: resident.household_id,
      barangay_name: resident.barangay_name,
      card: row || null
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to load household QR card" });
  }
});

router.post("/issue", requireApiAccess("qr", "card_issue"), async (req, res) => {
  const residentId = Number(req.body.resident_id);
  if (!residentId) return res.status(400).json({ error: "resident_id required" });

  const pool = getPool();
  try {
    const [[resident]] = await pool.query(
      `SELECT resident_id, household_id
       FROM residents
       WHERE resident_id = ?
       LIMIT 1`,
      [residentId]
    );
    if (!resident) return res.status(404).json({ error: "Resident not found" });

    let created = null;
    for (let i = 0; i < 5; i += 1) {
      const token = buildShortToken();
      try {
        const [insert] = await pool.query(
          `INSERT INTO qr_codes (household_id, secure_token, qr_type, status, issued_date, expiry_date, issued_by)
           VALUES (?, ?, 'Household', 'Active', CURDATE(), NULL, ?)`,
          [resident.household_id, token, req.user.lgu_admin_id || null]
        );
        created = { qr_id: insert.insertId, secure_token: token };
        break;
      } catch (err) {
        if (err && err.code === "ER_DUP_ENTRY") continue;
        throw err;
      }
    }
    if (!created) return res.status(500).json({ error: "Failed to generate unique QR token" });

    const [[row]] = await pool.query(
      `SELECT qr_id, household_id, secure_token, qr_type, status, issued_date, expiry_date
       FROM qr_codes
       WHERE qr_id = ?
       LIMIT 1`,
      [created.qr_id]
    );
    return res.status(201).json(row);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to issue household QR card" });
  }
});

router.post("/scan", requireApiAccess("qr", "scan"), async (req, res) => {
  const secureToken = String(req.body.secure_token || "").trim();
  if (!secureToken) return res.status(400).json({ error: "secure_token required" });
  const pool = getPool();
  try {
    const [[qr]] = await pool.query(
      `SELECT qr_id, household_id, secure_token, qr_type, status
       FROM qr_codes
       WHERE secure_token = ? LIMIT 1`,
      [secureToken]
    );
    if (!qr || qr.qr_type !== "Household" || qr.status !== "Active") {
      return res.status(404).json({ error: "QR token invalid or inactive" });
    }
    const [[resident]] = await pool.query(
      "SELECT resident_id, full_name FROM residents WHERE household_id = ? LIMIT 1",
      [qr.household_id]
    );
    if (!resident) return res.status(404).json({ error: "Household not linked to resident" });
    const idempotency_key = `qr-scan:${qr.qr_id}:${new Date().toISOString().slice(0, 10)}`;
    const result = await creditLedger({
      resident_id: resident.resident_id,
      points_delta: 10,
      source_type: "QR_SCAN",
      reference_id: String(qr.qr_id),
      idempotency_key,
      notes: "Collector scan validation",
      created_by_identity_id: req.user.sub
    });
    await writeAudit("QR_SCAN_VALIDATE", req.user.sub, "qr_code", qr.qr_id, {
      resident_id: resident.resident_id,
      duplicate: result.duplicate
    });
    const audit_id = generateQrToken() || crypto.randomUUID();
    return res.status(result.duplicate ? 200 : 201).json({
      qr_id: qr.qr_id,
      resident_id: resident.resident_id,
      resident_name: resident.full_name,
      points_delta: 10,
      duplicate: result.duplicate,
      audit_id
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to process QR scan" });
  }
});

module.exports = router;
