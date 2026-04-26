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
        sub: 4000,
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

test("credit endpoint requires Idempotency-Key header", async () => {
  const res = await request(app)
    .post("/api/eco-points/credit")
    .set(authHeaderFor("collector"))
    .send({ resident_id: 1, points_delta: 10, source_type: "QR_SCAN" });
  assert.equal(res.status, 400);
});

test("reconcile endpoint forbids collector role", async () => {
  const res = await request(app)
    .post("/api/eco-points/reconcile")
    .set(authHeaderFor("collector"))
    .set("Idempotency-Key", "eco-reconcile-1")
    .send({ resident_id: 1, points_delta: 5 });
  assert.equal(res.status, 403);
});
