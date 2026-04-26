"use strict";

const { ROLE_API_ACCESS, normalizeRole } = require("../constants/role-routes");

function requireApiAccess(resource, action) {
  return function (req, res, next) {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const role = normalizeRole(req.user.role);
    const rule = ROLE_API_ACCESS[resource] && ROLE_API_ACCESS[resource][action];
    if (!rule || !rule.includes(role)) {
      return res.status(403).json({ error: "Forbidden for this role" });
    }
    next();
  };
}

module.exports = { requireApiAccess };
