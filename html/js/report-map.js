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

  function setErr(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message || "";
  }

  function validateStatusForm() {
    const rawId = String((document.getElementById("lgu-report-id") || {}).value || "").trim();
    const status = String((document.getElementById("lgu-report-status") || {}).value || "").trim();
    let valid = true;
    if (!rawId) {
      setErr("lgu-report-id-error", "Report ID required.");
      valid = false;
    } else if (!/^\d+$/.test(rawId)) {
      setErr("lgu-report-id-error", "Report ID must be numeric.");
      valid = false;
    } else {
      setErr("lgu-report-id-error", "");
    }
    if (!status) {
      setErr("lgu-report-status-error", "Status required.");
      valid = false;
    } else {
      setErr("lgu-report-status-error", "");
    }
    const btn = document.getElementById("lgu-report-status-btn");
    if (btn) btn.disabled = !valid;
    return valid;
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
        validateStatusForm();
      });
    });
  }

  async function submitStatusUpdate(event) {
    event.preventDefault();
    if (!validateStatusForm()) {
      setMessage("Fix validation errors.", true);
      return;
    }
    const id = Number(document.getElementById("lgu-report-id").value);
    const status = String(document.getElementById("lgu-report-status").value || "");
    const btn = document.getElementById("lgu-report-status-btn");
    if (btn) btn.disabled = true;
    try {
      await window.BAGOApi.request("PATCH", `/api/reports/${id}/status`, { status });
      setMessage("Report status updated.");
      await loadReportMap();
      renderReportList();
    } catch (err) {
      setMessage((err.body && err.body.error) || err.message || "Failed to update report status.", true);
    } finally {
      validateStatusForm();
    }
  }

  async function initLguReportTools() {
    await loadReportMap();
    renderReportList();
    const form = document.getElementById("lgu-report-status-form");
    if (form && !form.__bagoBound) {
      form.addEventListener("submit", submitStatusUpdate);
      ["lgu-report-id", "lgu-report-status"].forEach((id) => {
        const node = document.getElementById(id);
        if (!node) return;
        node.addEventListener("input", validateStatusForm);
        node.addEventListener("change", validateStatusForm);
      });
      validateStatusForm();
      form.__bagoBound = true;
    }
  }

  window.BAGOReportMap = { loadReportMap: loadReportMap, initLguReportTools: initLguReportTools };
})();
