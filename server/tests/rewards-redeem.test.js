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
        sub: 5000,
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

test("collector cannot redeem rewards", async () => {
  const res = await request(app)
    .post("/api/rewards/redeem")
    .set(authHeaderFor("collector"))
    .set("Idempotency-Key", "redeem-test-1")
    .send({ reward_id: "RWD-001" });
  assert.equal(res.status, 403);
});

test("user redeem validates reward id", async () => {
  const res = await request(app)
    .post("/api/rewards/redeem")
    .set(authHeaderFor("user"))
    .set("Idempotency-Key", "redeem-test-2")
    .send({ reward_id: "NOPE" });
  assert.equal(res.status, 400);
});
