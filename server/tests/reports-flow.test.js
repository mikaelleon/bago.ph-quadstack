"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const app = require("../index");
const { signToken } = require("../middleware/auth");
const { buildSignedImageUrl, verifyImageToken } = require("../services/report-media");

function authHeaderFor(role, extra) {
  const token = signToken(
    Object.assign(
      {
        sub: 3000,
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

test("collector cannot create resident report", async () => {
  const res = await request(app).post("/api/reports").set(authHeaderFor("collector")).send({
    issue_type: "Missed Pickup",
    street_address: "Street",
    barangay_id: 1
  });
  assert.equal(res.status, 403);
});

test("status endpoint validates allowed status values", async () => {
  const res = await request(app)
    .patch("/api/reports/1/status")
    .set(authHeaderFor("lgu_officer"))
    .send({ status: "INVALID_STATUS" });
  assert.equal(res.status, 400);
});

test("signed URL token verifies for matching report only", async () => {
  const signed = buildSignedImageUrl("http://localhost:3000", 44);
  const token = new URL(signed).searchParams.get("token");
  assert.equal(verifyImageToken(token, 44), true);
  assert.equal(verifyImageToken(token, 45), false);
});
