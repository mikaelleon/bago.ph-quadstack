(function () {
  function q(id) {
    return document.getElementById(id);
  }

  function statusSteps(current) {
    const all = ["Open", "Acknowledged", "In Progress", "Resolved", "Rejected"];
    const idx = all.indexOf(current);
    return all
      .map((s, i) => `<li class="${i <= idx ? "done" : ""}">${s}</li>`)
      .join("");
  }

  async function loadTimeline() {
    const rows = await window.BAGOApi.request("GET", "/api/reports");
    const host = q("resident-report-timeline");
    host.innerHTML = "";
    rows.slice(0, 10).forEach((row) => {
      const card = document.createElement("div");
      card.className = "timeline-card";
      card.innerHTML =
        `<h4>${row.reference_number}</h4><div>${row.issue_type}</div><ol class="status-steps">` +
        statusSteps(row.status) +
        `</ol>`;
      host.appendChild(card);
    });
  }

  async function loadReportStatusBanners() {
    const items = await window.BAGOApi.request("GET", "/api/notifications/reports");
    if (window.BAGOBanner) window.BAGOBanner.mountScheduleBanner("report-banner", items);
  }

  window.BAGOReportDetail = {
    loadTimeline: loadTimeline,
    loadReportStatusBanners: loadReportStatusBanners
  };
})();
