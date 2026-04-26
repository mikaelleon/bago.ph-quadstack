"use strict";

const { getPool } = require("../db");

let ensured = false;
let memoryFallback = [];

function useMemoryFallback(err) {
  return Boolean(err && (err.code === "ENOTFOUND" || err.code === "ECONNREFUSED" || err.code === "ER_ACCESS_DENIED_ERROR"));
}

async function ensureAnnouncementsTable() {
  if (ensured) return;
  const pool = getPool();
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS announcements (
        announcement_id BIGINT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(120) NOT NULL,
        message TEXT NOT NULL,
        target_scope VARCHAR(120) NOT NULL DEFAULT 'all',
        urgency ENUM('General','Urgent') NOT NULL DEFAULT 'General',
        created_by_identity_id INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_announcement_scope_created (target_scope, created_at)
      )`
    );
    ensured = true;
  } catch (e) {
    if (!useMemoryFallback(e)) throw e;
  }
}

async function createAnnouncement(input) {
  try {
    await ensureAnnouncementsTable();
    if (!ensured) throw Object.assign(new Error("memory fallback"), { code: "ENOTFOUND" });
    const pool = getPool();
    const [ins] = await pool.query(
      `INSERT INTO announcements
        (title, message, target_scope, urgency, created_by_identity_id)
       VALUES (?, ?, ?, ?, ?)`,
      [
        input.title,
        input.message,
        input.target_scope || "all",
        input.urgency || "General",
        input.created_by_identity_id || null
      ]
    );
    const [[row]] = await pool.query("SELECT * FROM announcements WHERE announcement_id = ?", [ins.insertId]);
    return row;
  } catch (e) {
    if (!useMemoryFallback(e)) throw e;
    const row = {
      announcement_id: memoryFallback.length + 1,
      title: input.title,
      message: input.message,
      target_scope: input.target_scope || "all",
      urgency: input.urgency || "General",
      created_by_identity_id: input.created_by_identity_id || null,
      created_at: new Date().toISOString()
    };
    memoryFallback.unshift(row);
    return row;
  }
}

async function listAnnouncements(filterScope) {
  try {
    await ensureAnnouncementsTable();
    if (!ensured) throw Object.assign(new Error("memory fallback"), { code: "ENOTFOUND" });
    const pool = getPool();
    let sql = "SELECT * FROM announcements";
    const params = [];
    if (filterScope && filterScope !== "all") {
      sql += " WHERE target_scope IN ('all', ?)";
      params.push(filterScope);
    }
    sql += " ORDER BY created_at DESC LIMIT 50";
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (e) {
    if (!useMemoryFallback(e)) throw e;
    return memoryFallback
      .filter((row) => !filterScope || filterScope === "all" || row.target_scope === "all" || row.target_scope === filterScope)
      .slice(0, 50);
  }
}

module.exports = { ensureAnnouncementsTable, createAnnouncement, listAnnouncements };
