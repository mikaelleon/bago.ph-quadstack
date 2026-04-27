(function () {
  var schedules = [];
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

  function asTime(v) {
    if (!v) return "";
    return String(v).slice(0, 5);
  }

  async function loadBarangays() {
    var rows = await window.BAGOApi.request("GET", "/api/barangays");
    var sel = q("lgu-barangay");
    sel.innerHTML = "";
    rows.forEach(function (b) {
      var opt = document.createElement("option");
      opt.value = String(b.barangay_id);
      opt.textContent = b.barangay_name;
      sel.appendChild(opt);
    });
  }

  async function loadSchedules() {
    schedules = await window.BAGOApi.request("GET", "/api/schedules");
    renderTable();
  }

  function renderTable() {
    var body = q("lgu-schedule-tbody");
    body.innerHTML = "";
    schedules.forEach(function (row) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" +
        esc(row.barangay_name) +
        "</td><td>" +
        esc(row.waste_type) +
        "</td><td>" +
        esc(String(row.collection_date).slice(0, 10)) +
        "</td><td>" +
        esc(asTime(row.time_start) + "-" + asTime(row.time_end)) +
        "</td><td>" +
        esc(row.status) +
        "</td><td><button data-id='" +
        row.schedule_id +
        "' class='btn-edit'>" + esc(t("common.edit", "Edit")) + "</button> <button data-id='" +
        row.schedule_id +
        "' class='btn-del'>" + esc(t("common.delete", "Delete")) + "</button></td>";
      body.appendChild(tr);
    });
    body.querySelectorAll(".btn-edit").forEach(function (btn) {
      btn.addEventListener("click", function () {
        editSchedule(Number(btn.getAttribute("data-id")));
      });
    });
    body.querySelectorAll(".btn-del").forEach(function (btn) {
      btn.addEventListener("click", async function () {
        var id = Number(btn.getAttribute("data-id"));
        if (!window.BAGOXmlModal || typeof window.BAGOXmlModal.openConfirm !== "function") return;
        var ok = await window.BAGOXmlModal.openConfirm({
          title: t("common.delete", "Delete"),
          message: t("schedule.delete_confirm", "Delete schedule?"),
          confirmLabel: t("common.delete", "Delete")
        });
        if (!ok) return;
        await window.BAGOApi.request("DELETE", "/api/schedules/" + id);
        await loadSchedules();
      });
    });
  }

  async function onCreateSubmit(e) {
    e.preventDefault();
    await window.BAGOApi.request("POST", "/api/schedules", {
      barangay_id: Number(q("lgu-barangay").value),
      waste_type: q("lgu-waste").value,
      collection_date: q("lgu-date").value,
      time_start: q("lgu-start").value,
      time_end: q("lgu-end").value,
      status: q("lgu-status").value
    });
    e.target.reset();
    await loadBarangays();
    await loadSchedules();
  }

  async function editSchedule(id) {
    var row = schedules.find(function (s) {
      return Number(s.schedule_id) === Number(id);
    });
    if (!row) return;
    if (!window.BAGOXmlModal || typeof window.BAGOXmlModal.openModal !== "function") return;
    var values = await window.BAGOXmlModal.openModal({
      title: t("schedule.edit", "Edit schedule"),
      fields: [
        { name: "status", label: t("common.status", "Status"), value: row.status || "" },
        { name: "collection_date", label: t("schedule.date_prompt", "Date (YYYY-MM-DD)"), value: String(row.collection_date).slice(0, 10) }
      ]
    });
    if (!values) return;
    await window.BAGOApi.request("PATCH", "/api/schedules/" + id, {
      status: values.status,
      collection_date: values.collection_date
    });
    await loadSchedules();
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = String(s || "");
    return d.innerHTML;
  }

  async function initLguSchedule() {
    await loadBarangays();
    await loadSchedules();
    q("lgu-schedule-form").addEventListener("submit", onCreateSubmit);
  }

  window.BAGOScheduleLGU = { initLguSchedule: initLguSchedule };
})();
