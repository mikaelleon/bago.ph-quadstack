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
        sub: 999,
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

test("blocks resident from LGU schedule write route", async () => {
  const res = await request(app)
    .post("/api/schedules")
    .set(authHeaderFor("user"))
    .send({
      barangay_id: 1,
      waste_type: "Biodegradable",
      collection_date: "2026-05-01",
      time_start: "07:00",
      time_end: "09:00",
      status: "Scheduled"
    });

  assert.equal(res.status, 403);
  assert.equal(res.body.error, "Forbidden for this role");
});

test("blocks collector from resident report create route", async () => {
  const res = await request(app).post("/api/reports").set(authHeaderFor("collector")).send({
    issue_type: "Missed Pickup",
    description: "Not collected",
    street_address: "Sample St",
    barangay_id: 1
  });

  assert.equal(res.status, 403);
  assert.equal(res.body.error, "Forbidden for this role");
});

test("blocks resident from report status update route", async () => {
  const res = await request(app).patch("/api/reports/123").set(authHeaderFor("user")).send({
    status: "Acknowledged"
  });

  assert.equal(res.status, 403);
  assert.equal(res.body.error, "Forbidden for this role");
});

