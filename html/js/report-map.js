(function () {
  let map = null;
  let markers = [];
  let reportsCache = [];

  function clearMarkers() {
    markers.forEach((m) => m.remove());
    markers = [];
  }

  function ensureMap() {
    if (map) return map;
    map = L.map("lgu-report-map").setView([13.9411, 121.1637], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
    return map;
  }

  async function loadReportMap() {
    ensureMap();
    clearMarkers();
    const rows = await window.BAGOApi.request("GET", "/api/reports");
    reportsCache = Array.isArray(rows) ? rows : [];
    rows.forEach((row) => {
      if (row.gps_latitude == null || row.gps_longitude == null) return;
      const marker = L.marker([Number(row.gps_latitude), Number(row.gps_longitude)]).addTo(map);
      marker.bindPopup(
        `<strong>${row.reference_number}</strong><br>${row.issue_type}<br>Status: ${row.status}`
      );
      markers.push(marker);
    });
  }

  function setMessage(message, isError) {
    const el = document.getElementById("lgu-report-status-message");
    if (!el) return;
    el.textContent = message || "";
    el.style.color = isError ? "#b91c1c" : "#065f46";
  }

  function renderReportList() {
    const root = document.getElementById("lgu-report-list");
    if (!root) return;
    if (!reportsCache.length) {
      root.innerHTML = `<div class="report-row"><div>No reports found.</div></div>`;
      return;
    }
    root.innerHTML = reportsCache
      .map(
        (row) => `
      <div class="report-row">
        <div>
          <strong>${row.reference_number}</strong><br>
          <span>${row.issue_type}</span><br>
          <span class="muted">Status: ${row.status}</span>
        </div>
        <button type="button" data-pick-report="${row.report_id}" data-pick-status="${row.status}">Select</button>
      </div>`
      )
      .join("");

    root.querySelectorAll("[data-pick-report]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const reportId = btn.getAttribute("data-pick-report");
        const status = btn.getAttribute("data-pick-status");
        const idInput = document.getElementById("lgu-report-id");
        const statusInput = document.getElementById("lgu-report-status");
        if (idInput) idInput.value = reportId;
        if (statusInput) statusInput.value = status;
      });
    });
  }

  async function submitStatusUpdate(event) {
    event.preventDefault();
    const id = Number(document.getElementById("lgu-report-id").value);
    const status = String(document.getElementById("lgu-report-status").value || "");
    if (!id || !status) {
      setMessage("Report ID and status required.", true);
      return;
    }
    try {
      await window.BAGOApi.request("PATCH", `/api/reports/${id}/status`, { status });
      setMessage("Report status updated.");
      await loadReportMap();
      renderReportList();
    } catch (err) {
      setMessage((err.body && err.body.error) || err.message || "Failed to update report status.", true);
    }
  }

  async function initLguReportTools() {
    await loadReportMap();
    renderReportList();
    const form = document.getElementById("lgu-report-status-form");
    if (form && !form.__bagoBound) {
      form.addEventListener("submit", submitStatusUpdate);
      form.__bagoBound = true;
    }
  }

  window.BAGOReportMap = { loadReportMap: loadReportMap, initLguReportTools: initLguReportTools };
})();
