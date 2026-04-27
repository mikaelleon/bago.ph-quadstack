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

  function showError(message, retryFn) {
    if (window.BAGOErrorBanner && typeof window.BAGOErrorBanner.render === "function") {
      window.BAGOErrorBanner.render("report-submit-status", {
        title: t("report.submit_failed", "Report submit failed"),
        message: message || t("report.submit_failed", "Failed to submit"),
        retryLabel: t("common.retry", "Retry"),
        onRetry: retryFn
      });
      return;
    }
    q("report-submit-status").textContent = message || t("report.submit_failed", "Failed to submit");
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
    if (window.BAGOErrorBanner && typeof window.BAGOErrorBanner.clear === "function") {
      window.BAGOErrorBanner.clear("report-submit-status");
    }
    if (window.BAGOUploadProgress && typeof window.BAGOUploadProgress.set === "function") {
      window.BAGOUploadProgress.set("report-submit-status", 10);
    }
    const fileInput = q("report-photo");
    const photo = fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;
    const compressed = photo
      ? await window.BAGOImageCompress.compressImageToMax(photo, 500 * 1024)
      : null;
    if (window.BAGOUploadProgress && typeof window.BAGOUploadProgress.set === "function") {
      window.BAGOUploadProgress.set("report-submit-status", 35);
    }
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
    if (window.BAGOUploadProgress && typeof window.BAGOUploadProgress.set === "function") {
      window.BAGOUploadProgress.set("report-submit-status", 85);
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || t("report.submit_failed", "Report submit failed"));
    if (window.BAGOUploadProgress && typeof window.BAGOUploadProgress.set === "function") {
      window.BAGOUploadProgress.set("report-submit-status", 100);
    }
    if (window.BAGOToast && typeof window.BAGOToast.show === "function") {
      window.BAGOToast.show(t("report.submitted_prefix", "Submitted: ") + data.reference_number, { type: "success" });
    } else {
      q("report-submit-status").textContent = t("report.submitted_prefix", "Submitted: ") + data.reference_number;
    }
    e.target.reset();
  }

  async function loadBarangaysForReport() {
    if (window.BAGOSkeleton && typeof window.BAGOSkeleton.rows === "function") {
      window.BAGOSkeleton.rows("report-submit-status", 2);
    }
    const rows = await window.BAGOApi.request("GET", "/api/barangays");
    const sel = q("report-barangay");
    sel.innerHTML = "";
    rows.forEach((b) => {
      const opt = document.createElement("option");
      opt.value = String(b.barangay_id);
      opt.textContent = b.barangay_name;
      sel.appendChild(opt);
    });
    if (window.BAGOErrorBanner && typeof window.BAGOErrorBanner.clear === "function") {
      window.BAGOErrorBanner.clear("report-submit-status");
    } else {
      q("report-submit-status").innerHTML = "";
    }
  }

  async function initResidentReportSubmit() {
    await loadBarangaysForReport();
    q("resident-report-form").addEventListener("submit", async (e) => {
      try {
        await onSubmitResidentReport(e);
      } catch (err) {
        showError(err.message || t("report.submit_failed", "Failed to submit"), function () {
          q("resident-report-form").requestSubmit();
        });
      }
    });
  }

  window.BAGOReportSubmit = { initResidentReportSubmit: initResidentReportSubmit };
})();
