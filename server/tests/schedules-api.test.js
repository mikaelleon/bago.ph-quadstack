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
        sub: 2000,
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

test("resident cannot create schedule", async () => {
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
});

test("lgu create validation runs for bad payload", async () => {
  const res = await request(app).post("/api/schedules").set(authHeaderFor("lgu_officer")).send({
    barangay_id: 1,
    waste_type: "BadType",
    collection_date: "2026-05-01",
    time_start: "07:00",
    time_end: "09:00",
    status: "Scheduled"
  });
  assert.equal(res.status, 400);
});

test("resident cannot update schedule", async () => {
  const res = await request(app).patch("/api/schedules/1").set(authHeaderFor("user")).send({
    status: "Updated"
  });
  assert.equal(res.status, 403);
});

test("resident cannot delete schedule", async () => {
  const res = await request(app).delete("/api/schedules/1").set(authHeaderFor("user"));
  assert.equal(res.status, 403);
});

