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

  async function loadSchedules() {
    var rows = await window.BAGOApi.request("GET", "/api/schedules");
    var list = q("resident-schedule-list");
    list.innerHTML = "";
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
    await loadSchedules();
    await loadBanners();
  }

  window.BAGOScheduleResident = { initResidentSchedule: initResidentSchedule };
})();
