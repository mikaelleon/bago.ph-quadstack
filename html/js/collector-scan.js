(function () {
  function q(id) {
    return document.getElementById(id);
  }

  function setErr(id, message) {
    var n = q(id);
    if (n) n.textContent = message || "";
  }

  function validateScanForm() {
    var token = String(q("qr-token").value || "").trim();
    var valid = true;
    if (!token) {
      setErr("qr-token-error", "Token required.");
      valid = false;
    } else if (!/^BAGO-[A-Za-z0-9-]{4,}$/i.test(token)) {
      setErr("qr-token-error", "Token format invalid.");
      valid = false;
    } else {
      setErr("qr-token-error", "");
    }
    var btn = q("qr-submit-btn");
    if (btn) btn.disabled = !valid;
    return valid;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const token = String(q("qr-token").value || "").trim();
    if (!validateScanForm()) return;
    var btn = q("qr-submit-btn");
    if (btn) btn.disabled = true;
    q("qr-scan-result").textContent = "Loading scan result...";
    try {
      const out = await window.BAGOApi.request("POST", "/api/qr/scan", { secure_token: token });
      q("qr-scan-result").textContent = JSON.stringify(out, null, 2);
    } catch (err) {
      q("qr-scan-result").textContent = JSON.stringify(
        { error: err.message || "Scan failed" },
        null,
        2
      );
    } finally {
      validateScanForm();
    }
  }

  function initCollectorScan() {
    q("qr-scan-result").textContent = "No scan yet.";
    q("qr-token").addEventListener("input", validateScanForm);
    validateScanForm();
    q("qr-scan-form").addEventListener("submit", onSubmit);
  }

  window.BAGOCollectorScan = { initCollectorScan: initCollectorScan };
})();
