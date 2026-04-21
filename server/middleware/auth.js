"use strict";

const jwt = require("jsonwebtoken");

function getJwtSecret() {
  const s = process.env.JWT_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[bago.ph] JWT_SECRET not set; using insecure dev default. Set JWT_SECRET in .env for real use."
    );
    return "bago-ph-dev-jwt-secret-min-32-chars!!";
  }
  throw new Error("JWT_SECRET must be set (min 16 characters)");
}

function signToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

function verifyToken(token) {
  return jwt.verify(token, getJwtSecret());
}

function authMiddleware(required) {
  return function (req, res, next) {
    const h = req.headers.authorization || "";
    const m = h.match(/^Bearer\s+(.+)$/i);
    const token = m ? m[1] : null;
    if (!token) {
      if (required) return res.status(401).json({ error: "Missing bearer token" });
      req.user = null;
      return next();
    }
    try {
      req.user = verifyToken(token);
      next();
    } catch (e) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}

function requireRole(...roles) {
  return function (req, res, next) {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden for this role" });
    }
    next();
  };
}

module.exports = { signToken, verifyToken, authMiddleware, requireRole };
