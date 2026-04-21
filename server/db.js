"use strict";

const mysql = require("mysql2/promise");

function createPool() {
  const urlStr = process.env.DATABASE_URL;
  if (urlStr) {
    const u = new URL(urlStr);
    const database = u.pathname.replace(/^\//, "").split("?")[0];
    return mysql.createPool({
      host: u.hostname,
      port: u.port ? Number(u.port) : 3306,
      user: decodeURIComponent(u.username || ""),
      password: decodeURIComponent(u.password || ""),
      database,
      waitForConnections: true,
      connectionLimit: 10
    });
  }

  return mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME || "bago_ph",
    waitForConnections: true,
    connectionLimit: 10
  });
}

let pool;
function getPool() {
  if (!pool) pool = createPool();
  return pool;
}

module.exports = { getPool };
