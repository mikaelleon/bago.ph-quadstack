"use strict";

const { getPool } = require("../db");

async function listSchedules(filters) {
  const pool = getPool();
  let sql = `
    SELECT s.schedule_id, s.barangay_id, b.barangay_name, s.waste_type,
           s.collection_date, s.time_start, s.time_end, s.status, s.created_by, s.updated_at
    FROM collection_schedules s
    JOIN barangays b ON b.barangay_id = s.barangay_id
  `;
  const params = [];
  if (filters && filters.barangayId && filters.barangayId !== "all") {
    sql += " WHERE s.barangay_id = ?";
    params.push(Number(filters.barangayId));
  }
  sql += " ORDER BY s.collection_date ASC, s.time_start ASC";
  const [rows] = await pool.query(sql, params);
  return rows;
}

async function getScheduleById(scheduleId) {
  const pool = getPool();
  const [[row]] = await pool.query(
    `SELECT s.schedule_id, s.barangay_id, b.barangay_name, s.waste_type,
            s.collection_date, s.time_start, s.time_end, s.status, s.created_by, s.updated_at
     FROM collection_schedules s
     JOIN barangays b ON b.barangay_id = s.barangay_id
     WHERE s.schedule_id = ?`,
    [Number(scheduleId)]
  );
  return row || null;
}

async function createSchedule(input) {
  const pool = getPool();
  const [result] = await pool.query(
    `INSERT INTO collection_schedules
      (barangay_id, waste_type, collection_date, time_start, time_end, status, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      Number(input.barangay_id),
      input.waste_type,
      input.collection_date,
      input.time_start,
      input.time_end,
      input.status,
      Number(input.created_by)
    ]
  );
  return getScheduleById(result.insertId);
}

async function updateSchedule(scheduleId, updates, values) {
  const pool = getPool();
  const [result] = await pool.query(
    `UPDATE collection_schedules SET ${updates.join(", ")} WHERE schedule_id = ?`,
    [...values, Number(scheduleId)]
  );
  if (result.affectedRows === 0) return null;
  return getScheduleById(scheduleId);
}

async function deleteSchedule(scheduleId) {
  const pool = getPool();
  const [result] = await pool.query("DELETE FROM collection_schedules WHERE schedule_id = ?", [
    Number(scheduleId)
  ]);
  return result.affectedRows > 0;
}

async function listRecentScheduleEvents(limit) {
  const pool = getPool();
  const [rows] = await pool.query(
    `SELECT s.schedule_id, b.barangay_name, s.waste_type, s.collection_date, s.status, s.updated_at
     FROM collection_schedules s
     JOIN barangays b ON b.barangay_id = s.barangay_id
     ORDER BY s.updated_at DESC
     LIMIT ?`,
    [Number(limit || 20)]
  );
  return rows;
}

module.exports = {
  listSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  listRecentScheduleEvents
};
