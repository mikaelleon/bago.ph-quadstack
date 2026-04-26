"use strict";

const ROLE_PAGE_ACCESS = Object.freeze({
  user: Object.freeze([
    "index.html",
    "register.html",
    "dashboard.html",
    "dashboard-resident.html",
    "resident-web-qrcard.html",
    "schedule.html",
    "report.html",
    "eco-points.html",
    "announcements.html"
  ]),
  collector: Object.freeze([
    "index.html",
    "register.html",
    "dashboard.html",
    "dashboard-collector.html",
    "schedule.html",
    "report.html",
    "collectors.html",
    "announcements.html",
    "qr-audit.html",
    "xml-schedules-editor.html"
  ]),
  lgu_officer: Object.freeze([
    "index.html",
    "register.html",
    "dashboard.html",
    "dashboard-lgu.html",
    "schedule.html",
    "report.html",
    "collectors.html",
    "compliance.html",
    "eco-points.html",
    "announcements.html",
    "denr-reports.html",
    "users.html",
    "qr-audit.html",
    "xml-schedules-editor.html",
    "xml-barangays-editor.html"
  ])
});

const ROLE_API_ACCESS = Object.freeze({
  schedules: Object.freeze({
    read: Object.freeze(["user", "collector", "lgu_officer"]),
    write: Object.freeze(["lgu_officer"])
  }),
  reports: Object.freeze({
    read: Object.freeze(["user", "collector", "lgu_officer"]),
    create: Object.freeze(["user"]),
    update: Object.freeze(["collector", "lgu_officer"])
  }),
  qr: Object.freeze({
    scan: Object.freeze(["collector", "lgu_officer"]),
    card_read: Object.freeze(["user"]),
    card_issue: Object.freeze(["lgu_officer"])
  }),
  eco_points: Object.freeze({
    credit: Object.freeze(["collector", "lgu_officer"]),
    reconcile: Object.freeze(["lgu_officer"]),
    ledger: Object.freeze(["user", "collector", "lgu_officer"])
  }),
  rewards: Object.freeze({
    catalog: Object.freeze(["user", "collector", "lgu_officer"]),
    redeem: Object.freeze(["user"])
  }),
  announcements: Object.freeze({
    create: Object.freeze(["lgu_officer"]),
    read: Object.freeze(["user", "collector", "lgu_officer"])
  }),
  barangays: Object.freeze({
    read: Object.freeze(["public", "user", "collector", "lgu_officer"])
  })
});

function normalizeRole(role) {
  if (!role) return "user";
  const cleaned = String(role).trim().toLowerCase().replace(/\s+/g, "_");
  if (cleaned === "lgu_admin") return "lgu_officer";
  if (ROLE_PAGE_ACCESS[cleaned]) return cleaned;
  return "user";
}

module.exports = { ROLE_PAGE_ACCESS, ROLE_API_ACCESS, normalizeRole };
