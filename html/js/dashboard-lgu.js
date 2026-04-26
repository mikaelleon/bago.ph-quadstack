(function () {
  function q(id) {
    return document.getElementById(id);
  }

  function setCard(id, value) {
    const n = q(id);
    if (n) n.textContent = String(value);
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
      const out = await loadOverview();
      if (window.BAGOLguCharts) window.BAGOLguCharts.render(out.series);
    } catch (err) {
      q("dashboard-error").textContent = err.message || "Failed to load dashboard";
    }
  }

  window.BAGODashboardLGU = { initDashboardLGU: initDashboardLGU };
})();
