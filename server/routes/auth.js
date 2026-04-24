"use strict";

const express = require("express");
const bcrypt = require("bcryptjs");
const { getPool } = require("../db");
const { signToken, authMiddleware } = require("../middleware/auth");

const router = express.Router();

function dbErrorResponse(res, err, fallbackMessage) {
  const code = err && err.code;
  if (code === "ER_ACCESS_DENIED_ERROR") {
    return res.status(503).json({
      error: "Database credentials rejected. Check DB_USER/DB_PASSWORD in .env."
    });
  }
  if (code === "ER_BAD_DB_ERROR") {
    return res.status(503).json({
      error: "Database not found. Check DB_NAME and import schema."
    });
  }
  if (code === "ECONNREFUSED") {
    return res.status(503).json({
      error: "Database server unreachable. Start MySQL and verify DB_HOST/DB_PORT."
    });
  }
  return res.status(500).json({ error: fallbackMessage });
}

function normalizeMobile(raw) {
  let d = String(raw || "").replace(/\D/g, "");
  if (d.length > 11) d = d.slice(-11);
  return d;
}

function normalizeRole(role) {
  if (!role) return "user";
  const cleaned = String(role).trim().toLowerCase().replace(/\s+/g, "_");
  if (cleaned === "lgu_admin") return "lgu_officer";
  if (["user", "collector", "lgu_officer"].includes(cleaned)) return cleaned;
  return "user";
}

router.post("/register", async (req, res) => {
  const full_name = String(req.body.full_name || "").trim();
  const mobile = normalizeMobile(req.body.mobile);
  const pin = String(req.body.pin || "");
  const role = normalizeRole(req.body.role);

  if (!full_name || full_name.length > 120) {
    return res.status(400).json({ error: "Full name required (max 120 chars)" });
  }
  if (!mobile || mobile.length < 10) {
    return res.status(400).json({ error: "Valid Philippine mobile number required" });
  }
  if (!/^\d{4}$/.test(pin)) {
    return res.status(400).json({ error: "PIN must be exactly 4 digits" });
  }

  const pool = getPool();
  let conn;
  try {
    const [[existing]] = await pool.query(
      "SELECT identity_id FROM app_identity WHERE mobile_number = ? LIMIT 1",
      [mobile]
    );
    if (existing) {
      return res.status(409).json({ error: "Mobile number already registered" });
    }

    const pin_hash = await bcrypt.hash(pin, 10);
    conn = await pool.getConnection();
    await conn.beginTransaction();

    let resident_id = null;
    let collector_id = null;
    let lgu_admin_id = null;

    if (role === "user") {
      const hid = `BAGO-REG-${Date.now()}`;
      const [ins] = await conn.query(
        `INSERT INTO residents
          (household_id, full_name, mobile_number, barangay_id, street_address, pin_hash, eco_points, tier, registration_date)
         VALUES (?, ?, ?, 1, '', ?, 0, 'Seedling', CURDATE())`,
        [hid, full_name, mobile, pin_hash]
      );
      resident_id = ins.insertId;
    } else if (role === "collector") {
      const code = `COL-REG-${Date.now()}`;
      const [ins] = await conn.query(
        `INSERT INTO collectors (collector_code, full_name, mobile_number, assigned_barangay)
         VALUES (?, ?, ?, 1)`,
        [code, full_name, mobile]
      );
      collector_id = ins.insertId;
    } else {
      const email = `${mobile}@bago.local`;
      const [ins] = await conn.query(
        `INSERT INTO lgu_admins (full_name, position, email, barangay_id)
         VALUES (?, 'Environment Officer', ?, NULL)`,
        [full_name, email]
      );
      lgu_admin_id = ins.insertId;
    }

    await conn.query(
      `INSERT INTO app_identity (mobile_number, pin_hash, role, resident_id, collector_id, lgu_admin_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [mobile, pin_hash, role, resident_id, collector_id, lgu_admin_id]
    );

    await conn.commit();

    const [[row]] = await pool.query(
      `SELECT identity_id, mobile_number, role, resident_id, collector_id, lgu_admin_id
       FROM app_identity WHERE mobile_number = ?`,
      [mobile]
    );

    const token = signToken({
      sub: row.identity_id,
      role: row.role,
      mobile: row.mobile_number,
      resident_id: row.resident_id,
      collector_id: row.collector_id,
      lgu_admin_id: row.lgu_admin_id
    });

    return res.status(201).json({
      token,
      role: row.role,
      resident_id: row.resident_id,
      collector_id: row.collector_id,
      lgu_admin_id: row.lgu_admin_id
    });
  } catch (e) {
    if (conn) await conn.rollback();
    console.error(e);
    return dbErrorResponse(res, e, "Registration failed");
  } finally {
    if (conn) conn.release();
  }
});

router.post("/login", async (req, res) => {
  const mobile = normalizeMobile(req.body.mobile);
  const pin = String(req.body.pin || "");

  if (!mobile || !/^\d{4}$/.test(pin)) {
    return res.status(400).json({ error: "Mobile and 4-digit PIN required" });
  }

  try {
    const pool = getPool();
    const [[row]] = await pool.query(
      `SELECT identity_id, mobile_number, pin_hash, role, resident_id, collector_id, lgu_admin_id
       FROM app_identity WHERE mobile_number = ?`,
      [mobile]
    );

    if (!row) {
      return res.status(401).json({ error: "Unknown mobile number or wrong PIN" });
    }

    const ok = await bcrypt.compare(pin, row.pin_hash);
    if (!ok) {
      return res.status(401).json({ error: "Unknown mobile number or wrong PIN" });
    }

    const token = signToken({
      sub: row.identity_id,
      role: row.role,
      mobile: row.mobile_number,
      resident_id: row.resident_id,
      collector_id: row.collector_id,
      lgu_admin_id: row.lgu_admin_id
    });

    return res.json({
      token,
      role: row.role,
      resident_id: row.resident_id,
      collector_id: row.collector_id,
      lgu_admin_id: row.lgu_admin_id
    });
  } catch (e) {
    console.error(e);
    return dbErrorResponse(res, e, "Login failed");
  }
});

router.get("/me", authMiddleware(true), async (req, res) => {
  try {
    const pool = getPool();
    const [[row]] = await pool.query(
      `SELECT identity_id, mobile_number, role, resident_id, collector_id, lgu_admin_id
       FROM app_identity WHERE identity_id = ?`,
      [req.user.sub]
    );
    if (!row) return res.status(404).json({ error: "Identity not found" });
    return res.json(row);
  } catch (e) {
    console.error(e);
    return dbErrorResponse(res, e, "Failed to load profile");
  }
});

module.exports = router;
