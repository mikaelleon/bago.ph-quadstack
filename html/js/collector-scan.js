(function () {
  function q(id) {
    return document.getElementById(id);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const token = String(q("qr-token").value || "").trim();
    if (!token) return;
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
    }
  }

  function initCollectorScan() {
    q("qr-scan-result").textContent = "No scan yet.";
    q("qr-scan-form").addEventListener("submit", onSubmit);
  }

  window.BAGOCollectorScan = { initCollectorScan: initCollectorScan };
})();
