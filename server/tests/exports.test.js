"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const app = require("../index");
const { signToken } = require("../middleware/auth");

function authHeaderFor(role, extra) {
  const token = signToken(
    Object.assign(
      {
        sub: 7000,
        role,
        resident_id: role === "user" ? 1 : null,
        collector_id: role === "collector" ? 1 : null,
        lgu_admin_id: role === "lgu_officer" ? 1 : null
      },
      extra || {}
    )
  );
  return { Authorization: `Bearer ${token}` };
}

test("lgu can access analytics overview", async () => {
  const res = await request(app).get("/api/analytics/overview").set(authHeaderFor("lgu_officer"));
  assert.equal(res.status, 200);
  assert.equal(Boolean(res.body && res.body.totals && res.body.series), true);
});

test("csv export requires lgu role", async () => {
  const denied = await request(app).get("/api/exports/csv?type=overview").set(authHeaderFor("user"));
  assert.equal(denied.status, 403);
  const allowed = await request(app).get("/api/exports/csv?type=overview").set(authHeaderFor("lgu_officer"));
  assert.equal(allowed.status, 200);
  assert.equal(String(allowed.headers["content-type"]).includes("text/csv"), true);
});

test("xml export returns xml payload", async () => {
  const res = await request(app)
    .get("/api/exports/xml?barangay=NonExisting&start=2026-01-01&end=2026-12-31")
    .set(authHeaderFor("lgu_officer"));
  assert.equal(res.status, 200);
  assert.equal(String(res.headers["content-type"]).includes("application/xml"), true);
});

test("denr html and pdf endpoints return expected content-types", async () => {
  const html = await request(app).get("/api/exports/denr-html").set(authHeaderFor("lgu_officer"));
  assert.equal(html.status, 200);
  assert.equal(String(html.headers["content-type"]).includes("text/html"), true);
  const pdf = await request(app).get("/api/exports/denr-pdf").set(authHeaderFor("lgu_officer"));
  assert.equal(pdf.status, 200);
  assert.equal(String(pdf.headers["content-type"]).includes("application/pdf"), true);
});
