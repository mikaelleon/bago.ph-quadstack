(function () {
  function byId(id) {
    return document.getElementById(id);
  }

  function setStatus(message, isError) {
    var el = byId("qr-status");
    if (!el) return;
    el.textContent = message || "";
    el.style.color = isError ? "#b91c1c" : "#065f46";
  }

  function formatDate(raw) {
    if (!raw) return "N/A";
    var d = new Date(raw);
    if (Number.isNaN(d.getTime())) return String(raw);
    return d.toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" });
  }

  function renderCard(payload) {
    var row = payload && payload.card ? payload.card : null;
    byId("qr-full-name").textContent = payload.full_name || "N/A";
    byId("qr-household-id").textContent = payload.household_id || "N/A";
    byId("qr-barangay").textContent = payload.barangay_name || "N/A";
    byId("qr-token").textContent = row ? row.secure_token : "No active household QR card";
    byId("qr-status-badge").textContent = row ? row.status : "Missing";
    byId("qr-issued-date").textContent = row ? formatDate(row.issued_date) : "N/A";
  }

  async function loadCard() {
    byId("qr-loading").style.display = "block";
    byId("qr-root").style.display = "none";
    setStatus("");
    try {
      var payload = await window.BAGOApi.request("GET", "/api/qr/my-card");
      renderCard(payload);
      byId("qr-loading").style.display = "none";
      byId("qr-root").style.display = "block";
    } catch (err) {
      byId("qr-loading").textContent =
        (err && err.body && err.body.error) || err.message || "Failed to load QR card";
      byId("qr-loading").style.color = "#b91c1c";
    }
  }

  async function copyToken() {
    var token = byId("qr-token").textContent || "";
    if (!token || token === "No active household QR card") {
      setStatus("No token to copy.", true);
      return;
    }
    try {
      await navigator.clipboard.writeText(token);
      setStatus("Token copied.");
    } catch (_e) {
      setStatus("Clipboard not available in this browser.", true);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    byId("btn-copy-token").addEventListener("click", copyToken);
    byId("btn-refresh-token").addEventListener("click", loadCard);
    loadCard();
  });
})();
