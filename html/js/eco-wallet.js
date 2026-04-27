(function () {
  function t(key, fallback) {
    if (window.BAGO && window.BAGO.i18n && typeof window.BAGO.i18n.t === "function") {
      var v = window.BAGO.i18n.t(key);
      if (v && v !== key) return v;
    }
    return fallback || key;
  }
  function q(id) {
    return document.getElementById(id);
  }

  function showError(targetId, message, retryFn) {
    if (window.BAGOErrorBanner && typeof window.BAGOErrorBanner.render === "function") {
      window.BAGOErrorBanner.render(targetId, {
        title: t("common.error", "Error"),
        message: message || t("common.retry", "Try again"),
        retryLabel: t("common.retry", "Retry"),
        onRetry: retryFn
      });
      return;
    }
    q(targetId).textContent = message || t("common.error", "Error");
  }

  async function loadLedger() {
    const rows = await window.BAGOApi.request("GET", "/api/eco-points/ledger");
    const body = q("ledger-body");
    body.innerHTML = "";
    let balance = 0;
    rows.forEach((row) => {
      balance += Number(row.points_delta || 0);
      const tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" +
        esc(String(row.created_at).slice(0, 19).replace("T", " ")) +
        "</td><td>" +
        esc(row.source_type) +
        "</td><td>" +
        esc(row.points_delta) +
        "</td><td>" +
        esc(row.notes || "") +
        "</td>";
      body.appendChild(tr);
    });
    q("wallet-summary").textContent =
      t("ecopoints.entries_prefix", "Entries: ") +
      rows.length +
      " | " +
      t("ecopoints.balance_delta_prefix", "Computed balance delta: ") +
      balance;
    if (!rows.length) {
      const tr = document.createElement("tr");
      tr.innerHTML = "<td colspan='4'>" + esc(t("ecopoints.empty_ledger", "No ledger entries yet.")) + "</td>";
      body.appendChild(tr);
    }
  }

  async function loadCatalog() {
    const rows = await window.BAGOApi.request("GET", "/api/rewards/catalog");
    const body = q("reward-catalog-body");
    body.innerHTML = "";
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" +
        esc(row.name) +
        "</td><td>" +
        esc(row.partner) +
        "</td><td>" +
        esc(row.points_cost) +
        "</td><td><button data-id='" +
        esc(row.reward_id) +
        "'>" +
        esc(t("ecopoints.redeem_btn", "Redeem")) +
        "</button></td>";
      body.appendChild(tr);
    });
    if (!rows.length) {
      const tr = document.createElement("tr");
      tr.innerHTML = "<td colspan='4'>" + esc(t("ecopoints.empty_catalog", "No rewards available.")) + "</td>";
      body.appendChild(tr);
    }
    body.querySelectorAll("button[data-id]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        await redeem(btn.getAttribute("data-id"));
      });
    });
  }

  async function redeem(rewardId) {
    const idk = `redeem-${rewardId}-${Date.now()}`;
    try {
      const out = await fetch((window.BAGOApi.base() || "") + "/api/rewards/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (localStorage.getItem("bagoToken") || ""),
          "Idempotency-Key": idk
        },
        body: JSON.stringify({ reward_id: rewardId })
      });
      const data = await out.json();
      if (!out.ok) throw new Error(data.error || t("ecopoints.redeem_failed", "Redeem failed"));
      if (window.BAGOToast && typeof window.BAGOToast.show === "function") {
        window.BAGOToast.show(t("ecopoints.redeemed_prefix", "Redeemed: ") + data.reward.name, { type: "success" });
      } else {
        q("redeem-status").textContent = t("ecopoints.redeemed_prefix", "Redeemed: ") + data.reward.name;
      }
      await loadLedger();
    } catch (err) {
      showError("redeem-status", err.message || t("ecopoints.redeem_failed", "Redeem failed"), function () {
        redeem(rewardId);
      });
    }
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = String(s || "");
    return d.innerHTML;
  }

  async function initEcoWallet() {
    try {
      await loadCatalog();
    } catch (err) {
      showError("redeem-status", err.message || t("ecopoints.load_catalog_failed", "Failed to load rewards catalog"), function () {
        initEcoWallet();
      });
      return;
    }
    try {
      await loadLedger();
    } catch (err2) {
      showError("wallet-summary", err2.message || t("ecopoints.load_ledger_failed", "Failed to load wallet ledger"), function () {
        initEcoWallet();
      });
    }
  }

  window.BAGOEcoWallet = { initEcoWallet: initEcoWallet };
})();
