"use strict";

function getMessagingConfig() {
  return {
    email_enabled: String(process.env.MESSAGING_EMAIL_ENABLED || "false") === "true",
    sms_enabled: String(process.env.MESSAGING_SMS_ENABLED || "false") === "true",
    email_provider: process.env.MESSAGING_EMAIL_PROVIDER || "stub",
    sms_provider: process.env.MESSAGING_SMS_PROVIDER || "stub"
  };
}

async function sendAnnouncementHooks(payload) {
  const cfg = getMessagingConfig();
  return {
    queued: true,
    channels: {
      email: cfg.email_enabled ? "queued" : "disabled",
      sms: cfg.sms_enabled ? "queued" : "disabled"
    },
    provider: {
      email: cfg.email_provider,
      sms: cfg.sms_provider
    },
    payload_preview: {
      title: payload.title,
      target_scope: payload.target_scope,
      urgency: payload.urgency
    }
  };
}

module.exports = { getMessagingConfig, sendAnnouncementHooks };
