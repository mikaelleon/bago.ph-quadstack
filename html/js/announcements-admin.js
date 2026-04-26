(function () {
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
    q("ann-status").textContent = `Published: ${out.announcement.title}`;
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
        q("ann-status").textContent = err.message || "Publish failed";
      }
    });
    await loadFeed();
  }

  window.BAGOAnnouncementsAdmin = { initAnnouncementsAdmin: initAnnouncementsAdmin };
})();
