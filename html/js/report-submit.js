(function () {
  function q(id) {
    return document.getElementById(id);
  }

  async function captureLocation() {
    return new Promise((resolve) => {
      if (!navigator.geolocation) return resolve({ lat: null, lng: null });
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => resolve({ lat: null, lng: null }),
        { enableHighAccuracy: false, timeout: 8000 }
      );
    });
  }

  async function onSubmitResidentReport(e) {
    e.preventDefault();
    const fileInput = q("report-photo");
    const photo = fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;
    const compressed = photo
      ? await window.BAGOImageCompress.compressImageToMax(photo, 500 * 1024)
      : null;
    const loc = await captureLocation();
    const form = new FormData();
    form.append("issue_type", q("report-issue").value);
    form.append("description", q("report-description").value);
    form.append("street_address", q("report-street").value);
    form.append("barangay_id", q("report-barangay").value);
    if (loc.lat != null) form.append("gps_latitude", String(loc.lat));
    if (loc.lng != null) form.append("gps_longitude", String(loc.lng));
    if (compressed) form.append("photo", compressed);

    const token = localStorage.getItem("bagoToken");
    const res = await fetch((window.BAGOApi.base() || "") + "/api/reports", {
      method: "POST",
      headers: token ? { Authorization: "Bearer " + token } : {},
      body: form
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Report submit failed");
    q("report-submit-status").textContent = `Submitted: ${data.reference_number}`;
    e.target.reset();
  }

  async function loadBarangaysForReport() {
    const rows = await window.BAGOApi.request("GET", "/api/barangays");
    const sel = q("report-barangay");
    sel.innerHTML = "";
    rows.forEach((b) => {
      const opt = document.createElement("option");
      opt.value = String(b.barangay_id);
      opt.textContent = b.barangay_name;
      sel.appendChild(opt);
    });
  }

  async function initResidentReportSubmit() {
    await loadBarangaysForReport();
    q("resident-report-form").addEventListener("submit", async (e) => {
      try {
        await onSubmitResidentReport(e);
      } catch (err) {
        q("report-submit-status").textContent = err.message || "Failed to submit";
      }
    });
  }

  window.BAGOReportSubmit = { initResidentReportSubmit: initResidentReportSubmit };
})();
