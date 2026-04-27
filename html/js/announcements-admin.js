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
      window.BAGOErrorBanner.render("ann-status", {
        title: t("announcements.publish_failed", "Publish failed"),
        message: message || t("announcements.publish_failed", "Publish failed"),
        retryLabel: t("common.retry", "Retry"),
        onRetry: retryFn
      });
      return;
    }
    q("ann-status").textContent = message || t("announcements.publish_failed", "Publish failed");
  }

  async function loadFeed() {
    const rows = await window.BAGOApi.request("GET", "/api/announcements");
    const host = q("announcement-feed");
    host.innerHTML = "";
    if (!rows.length) {
      var empty = document.createElement("li");
      empty.textContent = t("announcements.empty", "No announcements yet.");
      host.appendChild(empty);
      return;
    }
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
    if (window.BAGOErrorBanner && typeof window.BAGOErrorBanner.clear === "function") {
      window.BAGOErrorBanner.clear("ann-status");
    } else {
      q("ann-status").textContent = "";
    }
    if (window.BAGOToast && typeof window.BAGOToast.show === "function") {
      window.BAGOToast.show(t("announcements.published_prefix", "Published: ") + out.announcement.title, { type: "success" });
    } else {
      q("ann-status").textContent = t("announcements.published_prefix", "Published: ") + out.announcement.title;
    }
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
        showError(err.message || t("announcements.publish_failed", "Publish failed"), function () {
          q("announcement-form").requestSubmit();
        });
      }
    });
    try {
      await loadFeed();
    } catch (err2) {
      showError(err2.message || t("announcements.load_failed", "Failed to load announcement feed"), function () {
        initAnnouncementsAdmin();
      });
    }
  }

  window.BAGOAnnouncementsAdmin = { initAnnouncementsAdmin: initAnnouncementsAdmin };
})();
