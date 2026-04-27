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

  function showScheduleError(message, retryFn) {
    if (window.BAGOErrorBanner && typeof window.BAGOErrorBanner.render === "function") {
      window.BAGOErrorBanner.render("resident-schedule-state", {
        title: t("common.error", "Error"),
        message: message || t("schedule.load_failed", "Failed to load schedules."),
        retryLabel: t("common.retry", "Retry"),
        onRetry: retryFn
      });
      return;
    }
    q("resident-schedule-state").textContent = message || t("schedule.load_failed", "Failed to load schedules.");
  }

  function clearScheduleError() {
    if (window.BAGOErrorBanner && typeof window.BAGOErrorBanner.clear === "function") {
      window.BAGOErrorBanner.clear("resident-schedule-state");
      return;
    }
    q("resident-schedule-state").textContent = "";
  }

  async function loadSchedules() {
    var list = q("resident-schedule-list");
    list.innerHTML = "<li class='schedule-item'>" + esc(t("common.loading", "Loading...")) + "</li>";
    clearScheduleError();
    var rows = await window.BAGOApi.request("GET", "/api/schedules");
    list.innerHTML = "";
    if (!rows.length) {
      list.innerHTML = "<li class='schedule-item'>" + esc(t("schedule.empty", "No schedules found yet.")) + "</li>";
      return;
    }
    rows.forEach(function (row) {
      var li = document.createElement("li");
      li.className = "schedule-item";
      li.innerHTML =
        "<div><strong>" +
        esc(row.barangay_name) +
        "</strong> - " +
        esc(row.waste_type) +
        "</div><div>" +
        esc(String(row.collection_date).slice(0, 10)) +
        " " +
        esc(String(row.time_start).slice(0, 5)) +
        "-" +
        esc(String(row.time_end).slice(0, 5)) +
        "</div><div>" + t("common.status", "Status") + ": " +
        esc(row.status) +
        "</div>";
      list.appendChild(li);
    });
  }

  async function loadBanners() {
    try {
      var items = await window.BAGOApi.request("GET", "/api/notifications/schedule");
      if (window.BAGOBanner) window.BAGOBanner.mountScheduleBanner("schedule-banner", items);
    } catch (_err) {}
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = String(s || "");
    return d.innerHTML;
  }

  async function initResidentSchedule() {
    try {
      await loadSchedules();
    } catch (err) {
      showScheduleError(err && err.message ? err.message : t("schedule.load_failed", "Failed to load schedules."), function () {
        initResidentSchedule();
      });
    }
    await loadBanners();
  }

  window.BAGOScheduleResident = { initResidentSchedule: initResidentSchedule };
})();
