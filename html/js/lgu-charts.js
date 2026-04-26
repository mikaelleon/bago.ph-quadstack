(function () {
  let reportsChart = null;
  let schedulesChart = null;
  let ecoChart = null;

  function render(series) {
    if (!window.Chart) return;
    const rCtx = document.getElementById("chart-reports");
    const sCtx = document.getElementById("chart-schedules");
    const eCtx = document.getElementById("chart-eco");
    if (!rCtx || !sCtx || !eCtx) return;
    if (reportsChart) reportsChart.destroy();
    if (schedulesChart) schedulesChart.destroy();
    if (ecoChart) ecoChart.destroy();

    reportsChart = new Chart(rCtx, {
      type: "bar",
      data: {
        labels: (series.reports_by_status || []).map((x) => x.label),
        datasets: [{ label: "Reports", data: (series.reports_by_status || []).map((x) => x.value) }]
      }
    });

    schedulesChart = new Chart(sCtx, {
      type: "pie",
      data: {
        labels: (series.schedules_by_status || []).map((x) => x.label),
        datasets: [{ data: (series.schedules_by_status || []).map((x) => x.value) }]
      }
    });

    ecoChart = new Chart(eCtx, {
      type: "line",
      data: {
        labels: (series.eco_points_by_day || []).map((x) => String(x.label).slice(0, 10)),
        datasets: [{ label: "Eco points by day", data: (series.eco_points_by_day || []).map((x) => x.value) }]
      }
    });
  }

  window.BAGOLguCharts = { render: render };
})();
