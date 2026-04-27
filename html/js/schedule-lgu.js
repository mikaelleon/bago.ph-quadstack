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

  function setState(message) {
    var node = q("lgu-schedule-state");
    if (node) node.textContent = String(message || "");
  }

  function setErr(id, msg) {
    var n = q(id);
    if (n) n.textContent = msg || "";
  }

  function validateCreateForm() {
    var barangay = String((q("lgu-barangay") && q("lgu-barangay").value) || "");
    var waste = String((q("lgu-waste") && q("lgu-waste").value) || "");
    var date = String((q("lgu-date") && q("lgu-date").value) || "");
    var start = String((q("lgu-start") && q("lgu-start").value) || "");
    var end = String((q("lgu-end") && q("lgu-end").value) || "");
    var status = String((q("lgu-status") && q("lgu-status").value) || "");
    var valid = true;
    setErr("lgu-barangay-error", barangay ? "" : t("schedule.barangay_required", "Barangay required."));
    setErr("lgu-waste-error", waste ? "" : t("schedule.waste_required", "Waste type required."));
    setErr("lgu-date-error", date ? "" : t("schedule.date_required", "Date required."));
    setErr("lgu-start-error", start ? "" : t("schedule.start_required", "Start time required."));
    setErr("lgu-end-error", end ? "" : t("schedule.end_required", "End time required."));
    setErr("lgu-status-error", status ? "" : t("schedule.status_required", "Status required."));
    if (!barangay || !waste || !date || !start || !end || !status) valid = false;
    if (start && end && end <= start) {
      setErr("lgu-end-error", t("schedule.time_logic", "End time must be after start time."));
      valid = false;
    }
    var btn = q("lgu-schedule-submit-btn");
    if (btn) btn.disabled = !valid;
    return valid;
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
    setState(t("common.loading", "Loading..."));
    schedules = await window.BAGOApi.request("GET", "/api/schedules");
    renderTable();
    setState("");
  }

  function renderTable() {
    var body = q("lgu-schedule-tbody");
    body.innerHTML = "";
    if (!schedules.length) {
      body.innerHTML =
        "<tr><td colspan='6'>" + esc(t("schedule.empty", "No schedules found yet.")) + "</td></tr>";
      return;
    }
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
    if (!validateCreateForm()) return;
    var btn = q("lgu-schedule-submit-btn");
    if (btn) btn.disabled = true;
    try {
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
    } finally {
      validateCreateForm();
    }
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
    try {
      await loadBarangays();
      await loadSchedules();
    } catch (err) {
      setState(err && err.message ? err.message : t("schedule.load_failed", "Failed to load schedules."));
    }
    q("lgu-schedule-form").addEventListener("submit", onCreateSubmit);
    ["lgu-barangay", "lgu-waste", "lgu-date", "lgu-start", "lgu-end", "lgu-status"].forEach(function (id) {
      var node = q(id);
      if (node) node.addEventListener("input", validateCreateForm);
      if (node) node.addEventListener("change", validateCreateForm);
    });
    validateCreateForm();
  }

  window.BAGOScheduleLGU = { initLguSchedule: initLguSchedule };
})();
