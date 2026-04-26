"use strict";

const { getPool } = require("../db");

async function creditLedger(input) {
  const pool = getPool();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [existing] = await conn.query(
      "SELECT ledger_id, resident_id, points_delta, idempotency_key FROM eco_points_ledger WHERE idempotency_key = ? LIMIT 1",
      [input.idempotency_key]
    );
    if (existing.length) {
      await conn.commit();
      return { duplicate: true, ledger: existing[0] };
    }
    const [ins] = await conn.query(
      `INSERT INTO eco_points_ledger
        (resident_id, points_delta, source_type, reference_id, idempotency_key, notes, created_by_identity_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        input.resident_id,
        input.points_delta,
        input.source_type,
        input.reference_id || null,
        input.idempotency_key,
        input.notes || null,
        input.created_by_identity_id || null
      ]
    );
    await conn.query(
      `UPDATE residents
       SET eco_points = eco_points + ?,
           tier = CASE
             WHEN eco_points + ? >= 600 THEN 'Eco Champion'
             WHEN eco_points + ? >= 300 THEN 'Green Guardian'
             WHEN eco_points + ? >= 100 THEN 'Eco Saver'
             ELSE 'Seedling'
           END
       WHERE resident_id = ?`,
      [
        input.points_delta,
        input.points_delta,
        input.points_delta,
        input.points_delta,
        input.resident_id
      ]
    );
    await conn.commit();
    const [[row]] = await pool.query("SELECT * FROM eco_points_ledger WHERE ledger_id = ?", [ins.insertId]);
    return { duplicate: false, ledger: row };
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

async function listLedgerByRole(user) {
  const pool = getPool();
  let sql = `
    SELECT l.ledger_id, l.resident_id, r.full_name, l.points_delta, l.source_type, l.reference_id, l.notes, l.created_at
    FROM eco_points_ledger l
    JOIN residents r ON r.resident_id = l.resident_id
  `;
  const params = [];
  if (user.role === "user") {
    sql += " WHERE l.resident_id = ?";
    params.push(user.resident_id || -1);
  }
  sql += " ORDER BY l.created_at DESC LIMIT 100";
  const [rows] = await pool.query(sql, params);
  return rows;
}

module.exports = { creditLedger, listLedgerByRole };
