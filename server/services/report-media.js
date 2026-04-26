"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const UPLOAD_ROOT = path.resolve(__dirname, "..", "..", "uploads", "reports");
const SIGN_TTL_SECONDS = 60 * 15;

function ensureUploadRoot() {
  fs.mkdirSync(UPLOAD_ROOT, { recursive: true });
}

function mediaSecret() {
  return process.env.MEDIA_SIGNING_SECRET || process.env.JWT_SECRET || "bago-media-dev-secret";
}

function extForMime(mime) {
  const m = String(mime || "").toLowerCase();
  if (m.includes("jpeg") || m.includes("jpg")) return ".jpg";
  if (m.includes("png")) return ".png";
  if (m.includes("webp")) return ".webp";
  if (m.includes("gif")) return ".gif";
  return ".bin";
}

function destinationPath(reportId, mime) {
  ensureUploadRoot();
  return path.join(UPLOAD_ROOT, `${Number(reportId)}${extForMime(mime)}`);
}

function writeReportImage(reportId, buffer, mime) {
  const filePath = destinationPath(reportId, mime);
  fs.writeFileSync(filePath, buffer);
  return filePath;
}

function buildImageToken(reportId, expiresAt) {
  const payload = `${Number(reportId)}.${Number(expiresAt)}`;
  const sig = crypto.createHmac("sha256", mediaSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

function verifyImageToken(token, reportId) {
  if (!token) return false;
  const parts = String(token).split(".");
  if (parts.length !== 3) return false;
  const tokenReportId = Number(parts[0]);
  const expiresAt = Number(parts[1]);
  const sig = parts[2];
  if (tokenReportId !== Number(reportId)) return false;
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;
  const expected = crypto
    .createHmac("sha256", mediaSecret())
    .update(`${tokenReportId}.${expiresAt}`)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

function buildSignedImageUrl(baseUrl, reportId) {
  const expiresAt = Date.now() + SIGN_TTL_SECONDS * 1000;
  const token = buildImageToken(reportId, expiresAt);
  return `${baseUrl}/api/reports/image/${Number(reportId)}?token=${encodeURIComponent(token)}`;
}

function readReportImage(reportId) {
  ensureUploadRoot();
  const names = fs.readdirSync(UPLOAD_ROOT).filter((f) => f.startsWith(`${Number(reportId)}.`));
  if (!names.length) return null;
  const abs = path.join(UPLOAD_ROOT, names[0]);
  return { path: abs, filename: names[0] };
}

module.exports = {
  writeReportImage,
  buildSignedImageUrl,
  verifyImageToken,
  readReportImage
};
