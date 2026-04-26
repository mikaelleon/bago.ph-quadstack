"use strict";

const express = require("express");
const { authMiddleware, requireRole } = require("../middleware/auth");
const { getOverview } = require("../services/analytics-service");

const router = express.Router();
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
    return res.status(500).json({ error: "Failed to load analytics overview" });
  }
});

module.exports = router;
