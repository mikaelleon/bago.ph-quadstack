(function () {
  function q(id) {
    return document.getElementById(id);
  }

  function setCard(id, value) {
    const n = q(id);
    if (n) n.textContent = String(value);
  }

  function hasData(out) {
    if (!out || !out.totals) return false;
    var keys = Object.keys(out.totals);
    for (var i = 0; i < keys.length; i++) {
      if (Number(out.totals[keys[i]] || 0) > 0) return true;
    }
    return false;
  }

  async function loadOverview() {
    const out = await window.BAGOApi.request("GET", "/api/analytics/overview");
    setCard("metric-schedules", out.totals.schedules_total);
    setCard("metric-reports-total", out.totals.reports_total);
    setCard("metric-reports-open", out.totals.reports_open);
    setCard("metric-reports-resolved", out.totals.reports_resolved);
    setCard("metric-residents", out.totals.residents_total);
    setCard("metric-collectors", out.totals.collectors_total);
    setCard("metric-eco", out.totals.eco_points_total);
    setCard("metric-compliance", Number(out.totals.compliance_avg).toFixed(2));
    return out;
  }

  async function initDashboardLGU() {
    try {
      q("dashboard-state").textContent = "Loading dashboard...";
      q("dashboard-error").textContent = "";
      const out = await loadOverview();
      if (!hasData(out)) {
        q("dashboard-state").textContent = "No analytics data available yet.";
      } else {
        q("dashboard-state").textContent = "";
      }
      if (window.BAGOLguCharts) window.BAGOLguCharts.render(out.series);
    } catch (err) {
      q("dashboard-state").textContent = "";
      q("dashboard-error").textContent = err.message || "Failed to load dashboard";
    }
  }

  window.BAGODashboardLGU = { initDashboardLGU: initDashboardLGU };
})();
