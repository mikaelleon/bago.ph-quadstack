(function () {
  function t(key, fallback) {
    if (window.BAGO && window.BAGO.i18n && typeof window.BAGO.i18n.t === "function") {
      var v = window.BAGO.i18n.t(key);
      if (v && v !== key) return v;
    }
    return fallback || key;
  }

  function mountScheduleBanner(targetId, items) {
    var host = document.getElementById(targetId);
    if (!host) return;
    host.innerHTML = "";
    if (!items || !items.length) return;
    var wrap = document.createElement("div");
    wrap.className = "bago-banner-wrap";
    items.slice(0, 3).forEach(function (item) {
      var card = document.createElement("div");
      card.className = "bago-banner-card";
      card.innerHTML =
        "<strong>" +
        escapeHtml(item.title || t("common.update", "Update")) +
        "</strong><span>" +
        escapeHtml(item.message || "") +
        "</span>";
      wrap.appendChild(card);
    });
    host.appendChild(wrap);
  }

  function escapeHtml(input) {
    var d = document.createElement("div");
    d.textContent = String(input || "");
    return d.innerHTML;
  }

  window.BAGOBanner = { mountScheduleBanner: mountScheduleBanner };
})();
