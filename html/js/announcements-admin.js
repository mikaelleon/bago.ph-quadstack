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

  async function loadFeed() {
    const rows = await window.BAGOApi.request("GET", "/api/announcements");
    const host = q("announcement-feed");
    host.innerHTML = "";
    rows.forEach((row) => {
      const li = document.createElement("li");
      li.innerHTML =
        "<strong>" +
        esc(row.title) +
        "</strong> <small>(" +
        esc(row.target_scope) +
        " | " +
        esc(row.urgency) +
        ")</small><div>" +
        esc(row.message) +
        "</div>";
      host.appendChild(li);
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const payload = {
      title: q("ann-title").value,
      message: q("ann-message").value,
      target_scope: q("ann-scope").value,
      urgency: q("ann-urgency").value
    };
    const out = await window.BAGOApi.request("POST", "/api/announcements", payload);
    q("ann-status").textContent = t("announcements.published_prefix", "Published: ") + out.announcement.title;
    e.target.reset();
    await loadFeed();
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = String(s || "");
    return d.innerHTML;
  }

  async function initAnnouncementsAdmin() {
    q("announcement-form").addEventListener("submit", async (e) => {
      try {
        await onSubmit(e);
      } catch (err) {
        q("ann-status").textContent = err.message || t("announcements.publish_failed", "Publish failed");
      }
    });
    await loadFeed();
  }

  window.BAGOAnnouncementsAdmin = { initAnnouncementsAdmin: initAnnouncementsAdmin };
})();
