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
        sub: 6000,
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

test("resident cannot publish announcement", async () => {
  const res = await request(app).post("/api/announcements").set(authHeaderFor("user")).send({
    title: "Notice",
    message: "Message body",
    target_scope: "all",
    urgency: "General"
  });
  assert.equal(res.status, 403);
});

test("lgu can publish announcement", async () => {
  const res = await request(app).post("/api/announcements").set(authHeaderFor("lgu_officer")).send({
    title: "Collection Update",
    message: "Collection moves to 8AM",
    target_scope: "resident",
    urgency: "General"
  });
  assert.equal(res.status, 201);
  assert.equal(Boolean(res.body.announcement && res.body.announcement.announcement_id), true);
});

test("notifications feed returns merged list for authenticated user", async () => {
  const res = await request(app).get("/api/notifications").set(authHeaderFor("user"));
  assert.equal(res.status, 200);
  assert.equal(Array.isArray(res.body), true);
});
