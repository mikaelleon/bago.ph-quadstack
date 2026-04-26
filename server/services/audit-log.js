"use strict";

const { getPool } = require("../db");

async function writeAudit(actionType, actorIdentityId, entityType, entityId, details) {
  const pool = getPool();
  try {
    await pool.query(
      `INSERT INTO lgu_action_log
        (admin_id, action_type, target_type, target_id, action_details)
       VALUES (?, ?, ?, ?, ?)`,
      [actorIdentityId || null, actionType, entityType, String(entityId || ""), JSON.stringify(details || {})]
    );
  } catch (_err) {
    // best-effort only; do not fail caller
  }
}

module.exports = { writeAudit };
