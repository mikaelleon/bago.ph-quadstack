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

  function setErr(id, msg) {
    var n = q(id);
    if (n) n.textContent = msg || "";
  }

  function validateReportForm() {
    var issue = String((q("report-issue") && q("report-issue").value) || "").trim();
    var barangay = String((q("report-barangay") && q("report-barangay").value) || "").trim();
    var street = String((q("report-street") && q("report-street").value) || "").trim();
    var fileInput = q("report-photo");
    var photo = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;
    var valid = true;
    setErr("report-issue-error", issue ? "" : t("report.issue_required", "Issue type required."));
    setErr("report-barangay-error", barangay ? "" : t("report.barangay_required", "Barangay required."));
    setErr("report-street-error", street ? "" : t("report.street_required", "Street address required."));
    setErr("report-photo-error", "");
    if (!issue || !barangay || !street) valid = false;
    if (photo) {
      var isImg = /^image\/(jpeg|jpg|png|webp)$/i.test(String(photo.type || ""));
      if (!isImg) {
        setErr("report-photo-error", t("report.photo_type", "Photo must be JPG/PNG/WEBP."));
        valid = false;
      } else if (Number(photo.size || 0) > 10 * 1024 * 1024) {
        setErr("report-photo-error", t("report.photo_size", "Photo too large."));
        valid = false;
      }
    }
    var btn = q("report-submit-btn");
    if (btn) btn.disabled = !valid;
    return valid;
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
    if (!validateReportForm()) return;
    var btn = q("report-submit-btn");
    if (btn) btn.disabled = true;
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
    if (loc.lat == null || loc.lng == null) {
      setErr("report-geo-error", t("report.geo_required", "Enable location access before submit."));
      validateReportForm();
      return;
    }
    setErr("report-geo-error", "");
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
    validateReportForm();
    setErr("report-geo-error", "");
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
    ["report-issue", "report-barangay", "report-street", "report-photo"].forEach(function (id) {
      var node = q(id);
      if (!node) return;
      node.addEventListener("input", validateReportForm);
      node.addEventListener("change", validateReportForm);
    });
    validateReportForm();
    q("resident-report-form").addEventListener("submit", async (e) => {
      try {
        await onSubmitResidentReport(e);
      } catch (err) {
        validateReportForm();
        showError(err.message || t("report.submit_failed", "Failed to submit"), function () {
          q("resident-report-form").requestSubmit();
        });
      }
    });
  }

  window.BAGOReportSubmit = { initResidentReportSubmit: initResidentReportSubmit };
})();
