"use strict";

const express = require("express");
const { authMiddleware, requireRole } = require("../middleware/auth");
const { getOverview } = require("../services/analytics-service");

const router = express.Router();
function err(res, status, code, error) {
  return res.status(status).json({ code, error });
}
router.use(authMiddleware(true));

router.get("/overview", requireRole("lgu_officer"), async (req, res) => {
  try {
    const out = await getOverview({
      start: req.query.start || null,
      end: req.query.end || null,
      barangay_id: req.query.barangay_id || null
    });
    return res.json(out);
  } catch (e) {
    console.error(e);
    return err(res, 500, "ANALYTICS_OVERVIEW_FAILED", "Failed to load analytics overview");
  }
});

module.exports = router;
