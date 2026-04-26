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
