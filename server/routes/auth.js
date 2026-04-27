"use strict";

const express = require("express");
const bcrypt = require("bcryptjs");
const { getPool } = require("../db");
const { signToken, authMiddleware } = require("../middleware/auth");

const router = express.Router();

function errorJson(res, status, code, error) {
  return res.status(status).json({ code, error });
}

function dbErrorResponse(res, err, fallbackMessage) {
  const code = err && err.code;
  if (code === "ER_ACCESS_DENIED_ERROR") {
    return errorJson(
      res,
      503,
      "DB_ACCESS_DENIED",
      "Database credentials rejected. Check DB_USER/DB_PASSWORD in .env."
    );
  }
  if (code === "ER_BAD_DB_ERROR") {
    return errorJson(
      res,
      503,
      "DB_NOT_FOUND",
      "Database not found. Check DB_NAME and import schema."
    );
  }
  if (code === "ECONNREFUSED") {
    return errorJson(
      res,
      503,
      "DB_UNREACHABLE",
      "Database server unreachable. Start MySQL and verify DB_HOST/DB_PORT."
    );
  }
  return errorJson(res, 500, "INTERNAL_ERROR", fallbackMessage);
}

function normalizeMobile(raw) {
  let d = String(raw || "").replace(/\D/g, "");
  if (d.length > 11) d = d.slice(-11);
  return d;
}

function normalizeGovEmail(raw) {
  return String(raw || "").trim().toLowerCase();
}

function normalizeRole(role) {
  if (!role) return "user";
  const cleaned = String(role).trim().toLowerCase().replace(/\s+/g, "_");
  if (cleaned === "lgu_admin") return "lgu_officer";
  if (["user", "collector", "lgu_officer"].includes(cleaned)) return cleaned;
  return "user";
}

function normalizeLocale(raw) {
  const val = String(raw || "").trim().toLowerCase();
  if (val === "fil") return "tl";
  if (val === "tl") return "tl";
  return "en";
}

router.post("/register", async (req, res) => {
  const full_name = String(req.body.full_name || "").trim();
  const mobile = normalizeMobile(req.body.mobile);
  const pin = String(req.body.pin || "");
  const role = normalizeRole(req.body.role);
  const locale = normalizeLocale(req.body.locale);
  const city = String(req.body.city || "").trim() || "Lipa City";
  const barangay = String(req.body.barangay || "").trim();
  const street_address = String(req.body.street_address || "").trim().slice(0, 200);

  if (!full_name || full_name.length > 120) {
    return errorJson(res, 400, "AUTH_FULL_NAME_REQUIRED", "Full name required (max 120 chars)");
  }
  if (!mobile || mobile.length < 10) {
    return errorJson(res, 400, "AUTH_MOBILE_REQUIRED", "Valid Philippine mobile number required");
  }
  if (!/^\d{4}$/.test(pin)) {
    return errorJson(res, 400, "AUTH_INVALID_PIN", "PIN must be exactly 4 digits");
  }
  if (role === "user" && !barangay) {
    return errorJson(
      res,
      400,
      "AUTH_BARANGAY_REQUIRED",
      "Barangay is required for resident registration"
    );
  }

  const pool = getPool();
  let conn;
  try {
    const [[existing]] = await pool.query(
      "SELECT identity_id FROM app_identity WHERE mobile_number = ? LIMIT 1",
      [mobile]
    );
    if (existing) {
      return errorJson(res, 409, "AUTH_MOBILE_EXISTS", "Mobile number already registered");
    }

    const pin_hash = await bcrypt.hash(pin, 10);
    conn = await pool.getConnection();
    await conn.beginTransaction();

    let resident_id = null;
    let collector_id = null;
    let lgu_admin_id = null;

    if (role === "user") {
      const hid = `BAGO-REG-${Date.now()}`;
      let barangay_id = 1;
      if (barangay) {
        const [rows] = await conn.query(
          `SELECT barangay_id FROM barangays
           WHERE barangay_name = ? AND city = ?
           LIMIT 1`,
          [barangay, city]
        );
        if (rows.length) {
          barangay_id = rows[0].barangay_id;
        } else {
          const [createdBarangay] = await conn.query(
            `INSERT INTO barangays (barangay_name, city, province, registered_households, compliance_rate, status)
             VALUES (?, ?, 'Batangas', 0, 0.00, 'On Track')`,
            [barangay, city]
          );
          barangay_id = createdBarangay.insertId;
        }
      }
      const [ins] = await conn.query(
        `INSERT INTO residents
          (household_id, full_name, mobile_number, barangay_id, street_address, pin_hash, eco_points, tier, registration_date)
         VALUES (?, ?, ?, ?, ?, ?, 0, 'Seedling', CURDATE())`,
        [hid, full_name, mobile, barangay_id, street_address, pin_hash]
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
      `INSERT INTO app_identity (mobile_number, pin_hash, gov_email, password_hash, role, resident_id, collector_id, lgu_admin_id, locale)
       VALUES (?, ?, NULL, NULL, ?, ?, ?, ?, ?)`,
      [mobile, pin_hash, role, resident_id, collector_id, lgu_admin_id, locale]
    );

    await conn.commit();

    const [[row]] = await pool.query(
      `SELECT identity_id, mobile_number, role, resident_id, collector_id, lgu_admin_id, locale
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
      locale: row.locale || "en",
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
  const email = normalizeGovEmail(req.body.email);
  const password = String(req.body.password || "");
  const mobile = normalizeMobile(req.body.mobile);
  const pin = String(req.body.pin || "");
  const inputLocale = req.body.locale != null ? normalizeLocale(req.body.locale) : null;

  const useEmailLogin = Boolean(email && email.includes("@"));

  if (useEmailLogin) {
    if (!password || password.length < 10) {
      return errorJson(
        res,
        400,
        "AUTH_EMAIL_PASSWORD_REQUIRED",
        "Government email and password (min 10 chars) required"
      );
    }
  } else {
    if (!mobile || !/^\d{4}$/.test(pin)) {
      return errorJson(res, 400, "AUTH_MOBILE_PIN_REQUIRED", "Mobile and 4-digit PIN required");
    }
  }

  try {
    const pool = getPool();
    let row;
    if (useEmailLogin) {
      const [[r]] = await pool.query(
        `SELECT identity_id, mobile_number, gov_email, password_hash, pin_hash, role, resident_id, collector_id, lgu_admin_id, locale
         FROM app_identity WHERE gov_email = ? AND role = 'lgu_officer'`,
        [email]
      );
      row = r;
      if (!row) {
        return errorJson(
          res,
          401,
          "AUTH_INVALID_GOV_CREDENTIALS",
          "Unknown government email or wrong password"
        );
      }
      const ok = row.password_hash && (await bcrypt.compare(password, row.password_hash));
      if (!ok) {
        return errorJson(
          res,
          401,
          "AUTH_INVALID_GOV_CREDENTIALS",
          "Unknown government email or wrong password"
        );
      }
    } else {
      const [[r]] = await pool.query(
        `SELECT identity_id, mobile_number, gov_email, password_hash, pin_hash, role, resident_id, collector_id, lgu_admin_id, locale
         FROM app_identity WHERE mobile_number = ?`,
        [mobile]
      );
      row = r;
      if (!row) {
        return errorJson(res, 401, "AUTH_INVALID_CREDENTIALS", "Unknown mobile number or wrong PIN");
      }
      const ok = row.pin_hash && (await bcrypt.compare(pin, row.pin_hash));
      if (!ok) {
        return errorJson(res, 401, "AUTH_INVALID_CREDENTIALS", "Unknown mobile number or wrong PIN");
      }
    }

    if (inputLocale) {
      await pool.query("UPDATE app_identity SET locale = ? WHERE identity_id = ?", [
        inputLocale,
        row.identity_id
      ]);
      row.locale = inputLocale;
    }

    const token = signToken({
      sub: row.identity_id,
      role: row.role,
      mobile: row.mobile_number,
      gov_email: row.gov_email || undefined,
      resident_id: row.resident_id,
      collector_id: row.collector_id,
      lgu_admin_id: row.lgu_admin_id
    });

    return res.json({
      token,
      role: row.role,
      locale: row.locale || "en",
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
      `SELECT identity_id, mobile_number, gov_email, role, resident_id, collector_id, lgu_admin_id, locale
       FROM app_identity WHERE identity_id = ?`,
      [req.user.sub]
    );
    if (!row) return errorJson(res, 404, "AUTH_IDENTITY_NOT_FOUND", "Identity not found");
    row.locale = row.locale || "en";
    return res.json(row);
  } catch (e) {
    console.error(e);
    return dbErrorResponse(res, e, "Failed to load profile");
  }
});

router.patch("/me/locale", authMiddleware(true), async (req, res) => {
  const locale = normalizeLocale(req.body && req.body.locale);
  try {
    const pool = getPool();
    const [result] = await pool.query(
      "UPDATE app_identity SET locale = ? WHERE identity_id = ?",
      [locale, req.user.sub]
    );
    if (!result.affectedRows) {
      return errorJson(res, 404, "AUTH_IDENTITY_NOT_FOUND", "Identity not found");
    }
    return res.json({ locale });
  } catch (e) {
    console.error(e);
    return dbErrorResponse(res, e, "Failed to update locale");
  }
});

module.exports = router;
