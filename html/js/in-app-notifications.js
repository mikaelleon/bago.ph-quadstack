(function () {
  function q(id) {
    return document.getElementById(id);
  }

  async function loadInAppFeed(targetId, scope) {
    const query = scope ? `?scope=${encodeURIComponent(scope)}` : "";
    const items = await window.BAGOApi.request("GET", "/api/notifications" + query);
    const host = q(targetId);
    if (!host) return;
    host.innerHTML = "";
    items.slice(0, 8).forEach((item) => {
      const card = document.createElement("div");
      card.className = "inapp-card";
      card.innerHTML =
        "<strong>" +
        esc(item.title) +
        "</strong><div>" +
        esc(item.message) +
        "</div><small>" +
        esc(String(item.updated_at || "").replace("T", " ").slice(0, 19)) +
        "</small>";
      host.appendChild(card);
    });
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = String(s || "");
    return d.innerHTML;
  }

  window.BAGOInAppNotifications = { loadInAppFeed: loadInAppFeed };
})();
