"use strict";

const express = require("express");
const { getPool } = require("../db");

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      `SELECT barangay_id, barangay_name, city, province, registered_households, compliance_rate, status
       FROM barangays
       ORDER BY barangay_name ASC`
    );
    return res.json(rows);
  } catch (e) {
    if (e && e.code) {
      if (e.code === "ENOTFOUND") {
        return res.status(503).json({
          code: "DB_DNS_UNRESOLVED",
          error: "Database host not reachable. Check DB_HOST / DATABASE_URL DNS settings."
        });
      }
      if (["ER_ACCESS_DENIED_ERROR", "ER_BAD_DB_ERROR", "ECONNREFUSED"].includes(e.code)) {
        return res.status(503).json({ code: "DB_UNAVAILABLE", error: "Database unavailable" });
      }
    }
    console.error(e);
    return res.status(500).json({ error: "Failed to load barangays" });
  }
});

module.exports = router;
