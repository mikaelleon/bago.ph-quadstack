"use strict";

const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const { requireApiAccess } = require("../middleware/route-policy");
const { listCatalog, getRewardById } = require("../services/rewards-catalog");
const { creditLedger } = require("../services/eco-points-service");
const { writeAudit } = require("../services/audit-log");

const router = express.Router();
function err(res, status, code, error) {
  return res.status(status).json({ code, error });
}
router.use(authMiddleware(true));

router.get("/catalog", requireApiAccess("rewards", "catalog"), async (_req, res) => {
  return res.json(listCatalog());
});

router.post("/redeem", requireApiAccess("rewards", "redeem"), async (req, res) => {
  const reward_id = String(req.body.reward_id || "");
  const idempotencyKey = String(req.header("Idempotency-Key") || "").trim();
  const resident_id = Number(req.user.resident_id);
  if (!idempotencyKey) return err(res, 400, "REWARD_IDEMPOTENCY_REQUIRED", "Idempotency-Key header required");
  if (!resident_id) return err(res, 400, "REWARD_RESIDENT_REQUIRED", "Resident session required");
  const reward = getRewardById(reward_id);
  if (!reward) return err(res, 400, "REWARD_INVALID_ID", "Invalid reward_id");
  try {
    const result = await creditLedger({
      resident_id,
      points_delta: -Math.abs(Number(reward.points_cost)),
      source_type: "REDEMPTION",
      reference_id: reward.reward_id,
      idempotency_key: idempotencyKey,
      notes: `Redeemed ${reward.name}`,
      created_by_identity_id: req.user.sub
    });
    await writeAudit("ECO_POINTS_REDEEM", req.user.sub, "reward", reward.reward_id, {
      resident_id,
      reward_id: reward.reward_id
    });
    return res.status(result.duplicate ? 200 : 201).json({
      reward,
      ledger: result.ledger,
      duplicate: result.duplicate
    });
  } catch (e) {
    console.error(e);
    return err(res, 500, "REWARD_REDEEM_FAILED", "Failed to redeem reward");
  }
});

module.exports = router;
