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

  function validateForm() {
    var title = String(q("ann-title").value || "").trim();
    var message = String(q("ann-message").value || "").trim();
    var valid = true;
    if (!title) {
      setErr("ann-title-error", t("announcements.title_required", "Title required."));
      valid = false;
    } else if (title.length > 120) {
      setErr("ann-title-error", t("announcements.title_max_120", "Title max 120 characters."));
      valid = false;
    } else {
      setErr("ann-title-error", "");
    }
    if (!message) {
      setErr("ann-message-error", t("announcements.message_required", "Message required."));
      valid = false;
    } else if (message.length > 2000) {
      setErr("ann-message-error", t("announcements.message_max", "Message too long."));
      valid = false;
    } else {
      setErr("ann-message-error", "");
    }
    var btn = q("ann-submit-btn");
    if (btn) btn.disabled = !valid;
    return valid;
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
    if (!validateForm()) return;
    var btn = q("ann-submit-btn");
    if (btn) btn.disabled = true;
    const payload = {
      title: q("ann-title").value.trim(),
      message: q("ann-message").value.trim(),
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
    validateForm();
    await loadFeed();
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = String(s || "");
    return d.innerHTML;
  }

  async function initAnnouncementsAdmin() {
    q("announcement-feed").innerHTML = "<li>" + esc(t("common.loading", "Loading...")) + "</li>";
    q("ann-title").addEventListener("input", validateForm);
    q("ann-message").addEventListener("input", validateForm);
    validateForm();
    q("announcement-form").addEventListener("submit", async (e) => {
      try {
        await onSubmit(e);
      } catch (err) {
        var btn = q("ann-submit-btn");
        if (btn) btn.disabled = false;
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
