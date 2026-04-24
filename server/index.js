"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const barangaysRoutes = require("./routes/barangays");
const schedulesRoutes = require("./routes/schedules");
const reportsRoutes = require("./routes/reports");

const app = express();
const PORT = Number(process.env.PORT || 3000);

const corsOrigin = process.env.CORS_ORIGIN;
app.use(
  cors({
    origin: corsOrigin === "*" || !corsOrigin ? true : corsOrigin.split(",").map((s) => s.trim()),
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "bago.ph-api" });
});

app.get("/", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "bago.ph-api",
    message: "API is running. Use /health or /api/* endpoints.",
    health: "/health",
    auth_login: "/api/auth/login",
    auth_register: "/api/auth/register"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/barangays", barangaysRoutes);
app.use("/api/schedules", schedulesRoutes);
app.use("/api/reports", reportsRoutes);

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`BAGO.PH API listening on http://localhost:${PORT}`);
    console.log(`Health: http://localhost:${PORT}/health`);
    console.log(`Project root: ${path.resolve(__dirname, "..")}`);
  });
}

module.exports = app;
