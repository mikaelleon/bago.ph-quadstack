"use strict";

const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const { requireApiAccess } = require("../middleware/route-policy");
const { creditLedger, listLedgerByRole } = require("../services/eco-points-service");
const { writeAudit } = require("../services/audit-log");

const router = express.Router();
function err(res, status, code, error) {
  return res.status(status).json({ code, error });
}
router.use(authMiddleware(true));

router.get("/ledger", requireApiAccess("eco_points", "ledger"), async (req, res) => {
  try {
    const rows = await listLedgerByRole(req.user);
    return res.json(rows);
  } catch (e) {
    console.error(e);
    return err(res, 500, "ECO_LEDGER_FAILED", "Failed to load eco-points ledger");
  }
});

router.post("/credit", requireApiAccess("eco_points", "credit"), async (req, res) => {
  const idempotencyKey = String(req.header("Idempotency-Key") || "").trim();
  const resident_id = Number(req.body.resident_id);
  const points_delta = Number(req.body.points_delta);
  const source_type = String(req.body.source_type || "QR_SCAN");
  if (!idempotencyKey) return err(res, 400, "ECO_IDEMPOTENCY_REQUIRED", "Idempotency-Key header required");
  if (!resident_id || !Number.isFinite(points_delta) || points_delta <= 0) {
    return err(res, 400, "ECO_INVALID_CREDIT_INPUT", "resident_id and positive points_delta required");
  }
  try {
    const result = await creditLedger({
      resident_id,
      points_delta,
      source_type,
      reference_id: req.body.reference_id || null,
      idempotency_key: idempotencyKey,
      notes: req.body.notes || null,
      created_by_identity_id: req.user.sub
    });
    await writeAudit(
      result.duplicate ? "ECO_POINTS_CREDIT_DUPLICATE" : "ECO_POINTS_CREDIT",
      req.user.sub,
      "resident",
      resident_id,
      { idempotencyKey, points_delta, source_type }
    );
    return res.status(result.duplicate ? 200 : 201).json(result);
  } catch (e) {
    console.error(e);
    return err(res, 500, "ECO_CREDIT_FAILED", "Failed to credit eco-points");
  }
});

router.post("/reconcile", requireApiAccess("eco_points", "reconcile"), async (req, res) => {
  const idempotencyKey = String(req.header("Idempotency-Key") || "").trim();
  const resident_id = Number(req.body.resident_id);
  const points_delta = Number(req.body.points_delta);
  if (!idempotencyKey) return err(res, 400, "ECO_IDEMPOTENCY_REQUIRED", "Idempotency-Key header required");
  if (!resident_id || !Number.isFinite(points_delta) || points_delta === 0) {
    return err(res, 400, "ECO_INVALID_RECON_INPUT", "resident_id and non-zero points_delta required");
  }
  try {
    const result = await creditLedger({
      resident_id,
      points_delta,
      source_type: "RECONCILE",
      reference_id: req.body.reference_id || null,
      idempotency_key: idempotencyKey,
      notes: req.body.notes || "30-day grace reconciliation",
      created_by_identity_id: req.user.sub
    });
    await writeAudit("ECO_POINTS_RECONCILE", req.user.sub, "resident", resident_id, {
      idempotencyKey,
      points_delta
    });
    return res.status(result.duplicate ? 200 : 201).json(result);
  } catch (e) {
    console.error(e);
    return err(res, 500, "ECO_RECONCILE_FAILED", "Failed to reconcile eco-points");
  }
});

module.exports = router;
