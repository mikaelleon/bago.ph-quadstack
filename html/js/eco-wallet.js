(function () {
  function q(id) {
    return document.getElementById(id);
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
    q("wallet-summary").textContent = `Entries: ${rows.length} | Computed balance delta: ${balance}`;
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
        "'>Redeem</button></td>";
      body.appendChild(tr);
    });
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
      if (!out.ok) throw new Error(data.error || "Redeem failed");
      q("redeem-status").textContent = `Redeemed: ${data.reward.name}`;
      await loadLedger();
    } catch (err) {
      q("redeem-status").textContent = err.message || "Redeem failed";
    }
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = String(s || "");
    return d.innerHTML;
  }

  async function initEcoWallet() {
    await loadCatalog();
    await loadLedger();
  }

  window.BAGOEcoWallet = { initEcoWallet: initEcoWallet };
})();
