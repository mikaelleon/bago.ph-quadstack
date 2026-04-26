(function () {
  function byId(id) {
    return document.getElementById(id);
  }

  function toNum(v) {
    var n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }

  function renderOverview(data) {
    var totals = (data && data.totals) || {};
    byId("m-compliance").textContent = toNum(totals.compliance_avg).toFixed(1) + "%";
    byId("m-open").textContent = String(toNum(totals.reports_open));
    byId("m-resolved").textContent = String(toNum(totals.reports_resolved));
    byId("m-residents").textContent = String(toNum(totals.residents_total));

    var rows = (data && data.series && data.series.reports_by_status) || [];
    var tbody = byId("status-rows");
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="2" class="muted">No status rows available.</td></tr>`;
      return;
    }
    tbody.innerHTML = rows
      .map(function (r) {
        return `<tr><td>${r.label}</td><td>${toNum(r.value)}</td></tr>`;
      })
      .join("");
  }

  async function initCompliancePage() {
    var msg = byId("compliance-message");
    msg.textContent = "Loading analytics...";
    try {
      var data = await window.BAGOApi.request("GET", "/api/analytics/overview");
      renderOverview(data);
      msg.textContent = "Live analytics loaded.";
    } catch (err) {
      msg.textContent = (err && err.body && err.body.error) || err.message || "Failed to load analytics.";
      msg.style.color = "#b91c1c";
    }
  }

  document.addEventListener("DOMContentLoaded", initCompliancePage);
})();
