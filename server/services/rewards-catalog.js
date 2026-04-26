"use strict";

const CATALOG = Object.freeze([
  { reward_id: "RWD-001", name: "Partner Voucher P25", points_cost: 30, partner: "LGU Partner" },
  { reward_id: "RWD-002", name: "Partner Voucher P50", points_cost: 55, partner: "LGU Partner" },
  { reward_id: "RWD-003", name: "Partner Voucher P100", points_cost: 100, partner: "LGU Partner" }
]);

function listCatalog() {
  return CATALOG.slice();
}

function getRewardById(rewardId) {
  return CATALOG.find((r) => r.reward_id === rewardId) || null;
}

module.exports = { listCatalog, getRewardById };
