"use strict";

const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const { requireApiAccess } = require("../middleware/route-policy");
const { createAnnouncement, listAnnouncements } = require("../services/announcements-service");
const { sendAnnouncementHooks } = require("../integrations/messaging-hooks");

const router = express.Router();
function err(res, status, code, error) {
  return res.status(status).json({ code, error });
}
router.use(authMiddleware(true));

router.get("/", async (req, res) => {
  const scope = String(req.query.scope || "all").trim();
  try {
    const rows = await listAnnouncements(scope);
    return res.json(rows);
  } catch (e) {
    console.error(e);
    return err(res, 500, "ANNOUNCEMENTS_LIST_FAILED", "Failed to load announcements");
  }
});

router.post("/", requireApiAccess("announcements", "create"), async (req, res) => {
  const title = String(req.body.title || "").trim();
  const message = String(req.body.message || "").trim();
  const target_scope = String(req.body.target_scope || "all").trim();
  const urgency = String(req.body.urgency || "General").trim();
  if (!title || !message) return err(res, 400, "ANNOUNCEMENTS_REQUIRED_FIELDS", "title and message required");
  try {
    const row = await createAnnouncement({
      title,
      message,
      target_scope,
      urgency: urgency === "Urgent" ? "Urgent" : "General",
      created_by_identity_id: req.user.sub
    });
    const hooks = await sendAnnouncementHooks(row);
    return res.status(201).json({ announcement: row, hooks });
  } catch (e) {
    console.error(e);
    return err(res, 500, "ANNOUNCEMENTS_CREATE_FAILED", "Failed to publish announcement");
  }
});

module.exports = router;
