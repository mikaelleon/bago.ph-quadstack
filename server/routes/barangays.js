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
    console.error(e);
    return res.status(500).json({ error: "Failed to load barangays" });
  }
});

module.exports = router;
