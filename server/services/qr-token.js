"use strict";

const crypto = require("crypto");

function generateQrToken() {
  return crypto.randomUUID();
}

module.exports = { generateQrToken };
