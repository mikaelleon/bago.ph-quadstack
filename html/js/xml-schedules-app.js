(function () {
  var doc = null;
  var C = window.BAGO_XML_CORE;
  var viewMode = new URLSearchParams(location.search).get("mode") === "view";

  var sortState = {
    routes: { col: null, dir: 1 },
    barangay: { col: null, dir: 1 },
    special: { col: null, dir: 1 },
    shifts: { col: null, dir: 1 }
  };

  function getSchedulesFallback() {
    if (window.BAGO_SCHEDULES_FALLBACK) return window.BAGO_SCHEDULES_FALLBACK;
    var n = document.getElementById("schedules-xml-fallback");
    return n
      ? n.textContent.trim()
      : "<ecolinisph_schedules><title>BAGO.PH</title><tagline/><proponent/><coverage_area/><statistics><weekly_routes_planned>0</weekly_routes_planned><on_time_completion>0%</on_time_completion><barangays_on_schedule>0</barangays_on_schedule><exceptions_this_month>0</exceptions_this_month></statistics><weekly_route_calendar/><barangay_schedules/><special_dates/><collector_shifts/></ecolinisph_schedules>";
  }

  function el(id) {
    return document.getElementById(id);
  }

  function getText(parent, tag) {
    var n = parent.getElementsByTagName(tag)[0];
    return n ? n.textContent : "";
  }

  function setText(parent, tag, value) {
    var n = parent.getElementsByTagName(tag)[0];
    if (!n) {
      n = parent.ownerDocument.createElement(tag);
      parent.appendChild(n);
    }
    n.textContent = value;
  }

  function ensureSection(root, name) {
    var sec = root.getElementsByTagName(name)[0];
    if (!sec) {
      sec = root.ownerDocument.createElement(name);
      root.appendChild(sec);
    }
    return sec;
  }

  function syncMetaFromForm() {
    var root = doc.documentElement;
    setText(root, "title", el("meta-title").value);
    setText(root, "tagline", el("meta-tagline").value);
    setText(root, "proponent", el("meta-proponent").value);
    setText(root, "coverage_area", el("meta-coverage").value);
  }

  function syncMetaToForm() {
    var root = doc.documentElement;
    el("meta-title").value = getText(root, "title");
    el("meta-tagline").value = getText(root, "tagline");
    el("meta-proponent").value = getText(root, "proponent");
    el("meta-coverage").value = getText(root, "coverage_area");
  }

  function syncStatsFromForm() {
    var root = doc.documentElement;
    var st = ensureSection(root, "statistics");
    setText(st, "weekly_routes_planned", el("stat-routes").value);
    setText(st, "on_time_completion", el("stat-ontime").value);
    setText(st, "barangays_on_schedule", el("stat-barangays").value);
    setText(st, "exceptions_this_month", el("stat-exceptions").value);
  }

  function syncStatsToForm() {
    var st = doc.documentElement.getElementsByTagName("statistics")[0];
    if (!st) return;
    el("stat-routes").value = getText(st, "weekly_routes_planned");
    el("stat-ontime").value = getText(st, "on_time_completion");
    el("stat-barangays").value = getText(st, "barangays_on_schedule");
    el("stat-exceptions").value = getText(st, "exceptions_this_month");
  }

  function routeSortVal(r, col) {
    switch (col) {
      case 0:
        return getText(r, "weekday").toLowerCase();
      case 1:
        return getText(r, "route_code").toLowerCase();
      case 2:
        return getText(r, "areas").toLowerCase();
      case 3:
        return getText(r, "window_start") + getText(r, "window_end");
      case 4:
        return getText(r, "status").toLowerCase();
      default:
        return "";
    }
  }

  function barangaySortVal(b, col) {
    switch (col) {
      case 0:
        return getText(b, "name").toLowerCase();
      case 1:
        return getText(b, "primary_day").toLowerCase();
      case 2:
        return getText(b, "time_window").toLowerCase();
      case 3:
        return getText(b, "frequency").toLowerCase();
      case 4:
        return getText(b, "notes").toLowerCase();
      default:
        return "";
    }
  }

  function specialSortVal(e, col) {
    switch (col) {
      case 0:
        return getText(e, "date");
      case 1:
        return getText(e, "description").toLowerCase();
      case 2:
        return getText(e, "action").toLowerCase();
      default:
        return "";
    }
  }

  function shiftSortVal(s, col) {
    switch (col) {
      case 0:
        return getText(s, "team").toLowerCase();
      case 1:
        return getText(s, "lead").toLowerCase();
      case 2:
        return getText(s, "assigned_days").toLowerCase();
      case 3:
        return getText(s, "start_time") + getText(s, "end_time");
      default:
        return "";
    }
  }

  function applySort(rows, section, getVal) {
    var st = sortState[section];
    if (st.col === null) return rows;
    rows.sort(function (a, b) {
      var va = getVal(a.node, st.col);
      var vb = getVal(b.node, st.col);
      var cmp = String(va).localeCompare(String(vb), undefined, { numeric: true, sensitivity: "base" });
      return cmp * st.dir;
    });
    return rows;
  }

  function toggleSort(section, col) {
    var st = sortState[section];
    if (st.col === col) st.dir = -st.dir;
    else {
      st.col = col;
      st.dir = 1;
    }
    updateSortLabels();
    renderTables();
  }

  function updateSortLabels() {
    document.querySelectorAll("th.sortable").forEach(function (th) {
      var base = th.getAttribute("data-label") || "";
      var sec = th.getAttribute("data-section");
      var col = parseInt(th.getAttribute("data-col"), 10);
      var st = sortState[sec];
      var mark = " ⇅";
      if (st && st.col === col) mark = st.dir === 1 ? " ▲" : " ▼";
      th.textContent = base + mark;
    });
  }

  function renderRoutes() {
    var tbody = el("tbody-routes");
    tbody.innerHTML = "";
    var filterDay = el("filter-route-day").value.toLowerCase();
    var filterQ = el("filter-route-q").value.toLowerCase();
    var routes = doc.getElementsByTagName("weekly_route_calendar")[0];
    if (!routes) return;
    var list = routes.getElementsByTagName("route");
    var rows = [];
    for (var i = 0; i < list.length; i++) {
      var r = list[i];
      var wd = getText(r, "weekday");
      var code = getText(r, "route_code");
      var areas = getText(r, "areas");
      if (filterDay && wd.toLowerCase().indexOf(filterDay) === -1) continue;
      if (filterQ) {
        var blob = (wd + " " + code + " " + areas).toLowerCase();
        if (blob.indexOf(filterQ) === -1) continue;
      }
      rows.push({ i: i, node: r });
    }
    applySort(rows, "routes", routeSortVal);
    rows.forEach(function (row) {
      var i = row.i;
      var r = row.node;
      var wd = getText(r, "weekday");
      var code = getText(r, "route_code");
      var areas = getText(r, "areas");
      var tr = document.createElement("tr");
      var actions =
        '<button type="button" class="bento-btn bento-btn-sm bento-btn-ghost btn-edit-route xml-crud-only" data-i="' +
        i +
        '">Edit</button> <button type="button" class="bento-btn bento-btn-sm bento-btn-outline btn-del-route xml-crud-only" data-i="' +
        i +
        '">Delete</button>';
      if (viewMode) actions = "";
      tr.innerHTML =
        "<td>" +
        esc(wd) +
        "</td><td>" +
        esc(code) +
        "</td><td>" +
        esc(areas) +
        "</td><td>" +
        esc(getText(r, "window_start")) +
        " – " +
        esc(getText(r, "window_end")) +
        "</td><td>" +
        esc(getText(r, "status")) +
        "</td><td>" +
        actions +
        "</td>";
      tbody.appendChild(tr);
    });
    tbody.querySelectorAll(".btn-edit-route").forEach(function (b) {
      b.onclick = function () {
        editRoute(parseInt(b.getAttribute("data-i"), 10));
      };
    });
    tbody.querySelectorAll(".btn-del-route").forEach(function (b) {
      b.onclick = function () {
        delRoute(parseInt(b.getAttribute("data-i"), 10));
      };
    });
  }

  function renderBarangays() {
    var tbody = el("tbody-barangay");
    tbody.innerHTML = "";
    var filterDay = el("filter-barangay-day").value.toLowerCase();
    var filterQ = el("filter-barangay-q").value.toLowerCase();
    var holder = doc.getElementsByTagName("barangay_schedules")[0];
    if (!holder) return;
    var list = holder.getElementsByTagName("barangay");
    var rows = [];
    for (var i = 0; i < list.length; i++) {
      var b = list[i];
      var name = getText(b, "name");
      var pd = getText(b, "primary_day");
      if (filterDay && pd.toLowerCase().indexOf(filterDay) === -1) continue;
      if (filterQ && name.toLowerCase().indexOf(filterQ) === -1) continue;
      rows.push({ i: i, node: b });
    }
    applySort(rows, "barangay", barangaySortVal);
    rows.forEach(function (row) {
      var i = row.i;
      var b = row.node;
      var name = getText(b, "name");
      var pd = getText(b, "primary_day");
      var tr = document.createElement("tr");
      var actions =
        '<button type="button" class="bento-btn bento-btn-sm bento-btn-ghost btn-edit-bg xml-crud-only" data-i="' +
        i +
        '">Edit</button> <button type="button" class="bento-btn bento-btn-sm bento-btn-outline btn-del-bg xml-crud-only" data-i="' +
        i +
        '">Delete</button>';
      if (viewMode) actions = "";
      tr.innerHTML =
        "<td>" +
        esc(name) +
        "</td><td>" +
        esc(pd) +
        "</td><td>" +
        esc(getText(b, "time_window")) +
        "</td><td>" +
        esc(getText(b, "frequency")) +
        "</td><td>" +
        esc(getText(b, "notes")) +
        "</td><td>" +
        actions +
        "</td>";
      tbody.appendChild(tr);
    });
    tbody.querySelectorAll(".btn-edit-bg").forEach(function (btn) {
      btn.onclick = function () {
        editBarangay(parseInt(btn.getAttribute("data-i"), 10));
      };
    });
    tbody.querySelectorAll(".btn-del-bg").forEach(function (btn) {
      btn.onclick = function () {
        delBarangay(parseInt(btn.getAttribute("data-i"), 10));
      };
    });
  }

  function renderSpecial() {
    var tbody = el("tbody-special");
    tbody.innerHTML = "";
    var filterQ = el("filter-special-q").value.toLowerCase();
    var holder = doc.getElementsByTagName("special_dates")[0];
    if (!holder) return;
    var list = holder.getElementsByTagName("entry");
    var rows = [];
    for (var i = 0; i < list.length; i++) {
      var e = list[i];
      var d = getText(e, "date");
      var desc = getText(e, "description");
      var act = getText(e, "action");
      if (filterQ) {
        var blob = (d + " " + desc + " " + act).toLowerCase();
        if (blob.indexOf(filterQ) === -1) continue;
      }
      rows.push({ i: i, node: e });
    }
    applySort(rows, "special", specialSortVal);
    rows.forEach(function (row) {
      var i = row.i;
      var e = row.node;
      var d = getText(e, "date");
      var desc = getText(e, "description");
      var act = getText(e, "action");
      var tr = document.createElement("tr");
      var actions =
        '<button type="button" class="bento-btn bento-btn-sm bento-btn-ghost btn-edit-sp xml-crud-only" data-i="' +
        i +
        '">Edit</button> <button type="button" class="bento-btn bento-btn-sm bento-btn-outline btn-del-sp xml-crud-only" data-i="' +
        i +
        '">Delete</button>';
      if (viewMode) actions = "";
      tr.innerHTML =
        "<td>" +
        esc(d) +
        "</td><td>" +
        esc(desc) +
        "</td><td>" +
        esc(act) +
        "</td><td>" +
        actions +
        "</td>";
      tbody.appendChild(tr);
    });
    tbody.querySelectorAll(".btn-edit-sp").forEach(function (btn) {
      btn.onclick = function () {
        editSpecial(parseInt(btn.getAttribute("data-i"), 10));
      };
    });
    tbody.querySelectorAll(".btn-del-sp").forEach(function (btn) {
      btn.onclick = function () {
        delSpecial(parseInt(btn.getAttribute("data-i"), 10));
      };
    });
  }

  function renderShifts() {
    var tbody = el("tbody-shifts");
    tbody.innerHTML = "";
    var filterQ = el("filter-shift-q").value.toLowerCase();
    var holder = doc.getElementsByTagName("collector_shifts")[0];
    if (!holder) return;
    var list = holder.getElementsByTagName("shift");
    var rows = [];
    for (var i = 0; i < list.length; i++) {
      var s = list[i];
      var team = getText(s, "team");
      var lead = getText(s, "lead");
      if (filterQ) {
        var blob = (team + " " + lead + " " + getText(s, "assigned_days")).toLowerCase();
        if (blob.indexOf(filterQ) === -1) continue;
      }
      rows.push({ i: i, node: s });
    }
    applySort(rows, "shifts", shiftSortVal);
    rows.forEach(function (row) {
      var i = row.i;
      var s = row.node;
      var team = getText(s, "team");
      var lead = getText(s, "lead");
      var tr = document.createElement("tr");
      var actions =
        '<button type="button" class="bento-btn bento-btn-sm bento-btn-ghost btn-edit-sh xml-crud-only" data-i="' +
        i +
        '">Edit</button> <button type="button" class="bento-btn bento-btn-sm bento-btn-outline btn-del-sh xml-crud-only" data-i="' +
        i +
        '">Delete</button>';
      if (viewMode) actions = "";
      tr.innerHTML =
        "<td>" +
        esc(team) +
        "</td><td>" +
        esc(lead) +
        "</td><td>" +
        esc(getText(s, "assigned_days")) +
        "</td><td>" +
        esc(getText(s, "start_time")) +
        " – " +
        esc(getText(s, "end_time")) +
        "</td><td>" +
        actions +
        "</td>";
      tbody.appendChild(tr);
    });
    tbody.querySelectorAll(".btn-edit-sh").forEach(function (btn) {
      btn.onclick = function () {
        editShift(parseInt(btn.getAttribute("data-i"), 10));
      };
    });
    tbody.querySelectorAll(".btn-del-sh").forEach(function (btn) {
      btn.onclick = function () {
        delShift(parseInt(btn.getAttribute("data-i"), 10));
      };
    });
  }

  function esc(s) {
    if (s == null) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function renderTables() {
    updateSortLabels();
    renderRoutes();
    renderBarangays();
    renderSpecial();
    renderShifts();
  }

  function fullRefresh() {
    syncMetaToForm();
    syncStatsToForm();
    renderTables();
  }

  function saveBrowser() {
    if (viewMode) return;
    syncMetaFromForm();
    syncStatsFromForm();
    C.saveToStorage(C.STORAGE_SCHEDULES, doc, C.PI_SCHEDULES);
    el("save-status").textContent = "Saved to this browser (" + new Date().toLocaleString() + ").";
  }

  function editRoute(index) {
    if (viewMode) return;
    var routes = doc.getElementsByTagName("weekly_route_calendar")[0];
    var r = routes.getElementsByTagName("route")[index];
    if (!r) return;
    window.BAGOXmlModal
      .openModal({
        title: "Edit route",
        fields: [
          { name: "weekday", label: "Weekday", value: getText(r, "weekday") },
          { name: "route_code", label: "Route code", value: getText(r, "route_code") },
          { name: "areas", label: "Areas", value: getText(r, "areas") },
          { name: "window_start", label: "Window start (HH:MM)", value: getText(r, "window_start") },
          { name: "window_end", label: "Window end (HH:MM)", value: getText(r, "window_end") },
          { name: "status", label: "Status (active/limited)", value: getText(r, "status") }
        ],
        validate: function (v) {
          if (!v.weekday || !v.route_code) return "Weekday and route code required";
          return true;
        }
      })
      .then(function (v) {
        if (!v) return;
        setText(r, "weekday", v.weekday);
        setText(r, "route_code", v.route_code);
        setText(r, "areas", v.areas);
        setText(r, "window_start", v.window_start);
        setText(r, "window_end", v.window_end);
        setText(r, "status", v.status);
        saveBrowser();
        renderTables();
      });
  }

  function delRoute(index) {
    if (viewMode) return;
    if (!confirm("Delete this route row?")) return;
    var routes = doc.getElementsByTagName("weekly_route_calendar")[0];
    var r = routes.getElementsByTagName("route")[index];
    if (r) r.parentNode.removeChild(r);
    saveBrowser();
    renderTables();
  }

  function addRoute() {
    if (viewMode) return;
    var routes = doc.getElementsByTagName("weekly_route_calendar")[0];
    var r = doc.createElement("route");
    setText(r, "weekday", "Monday");
    setText(r, "route_code", "R-NEW");
    setText(r, "areas", "TBD");
    setText(r, "window_start", "06:00");
    setText(r, "window_end", "14:00");
    setText(r, "status", "active");
    routes.appendChild(r);
    saveBrowser();
    renderTables();
  }

  function editBarangay(index) {
    if (viewMode) return;
    var holder = doc.getElementsByTagName("barangay_schedules")[0];
    var b = holder.getElementsByTagName("barangay")[index];
    if (!b) return;
    window.BAGOXmlModal
      .openModal({
        title: "Edit barangay schedule",
        fields: [
          { name: "name", label: "Barangay name", value: getText(b, "name") },
          { name: "primary_day", label: "Primary day", value: getText(b, "primary_day") },
          { name: "time_window", label: "Time window", value: getText(b, "time_window") },
          { name: "frequency", label: "Frequency", value: getText(b, "frequency") },
          { name: "notes", label: "Notes", value: getText(b, "notes") }
        ],
        validate: function (v) {
          if (!window.BAGOXmlValidators.validBarangayName(v.name)) return "Invalid barangay name";
          return true;
        }
      })
      .then(function (v) {
        if (!v) return;
        setText(b, "name", v.name);
        setText(b, "primary_day", v.primary_day);
        setText(b, "time_window", v.time_window);
        setText(b, "frequency", v.frequency);
        setText(b, "notes", v.notes);
        saveBrowser();
        renderTables();
      });
  }

  function delBarangay(index) {
    if (viewMode) return;
    if (!confirm("Delete this barangay row?")) return;
    var holder = doc.getElementsByTagName("barangay_schedules")[0];
    var b = holder.getElementsByTagName("barangay")[index];
    if (b) b.parentNode.removeChild(b);
    saveBrowser();
    renderTables();
  }

  function addBarangay() {
    if (viewMode) return;
    var holder = doc.getElementsByTagName("barangay_schedules")[0];
    var b = doc.createElement("barangay");
    setText(b, "name", "New Barangay");
    setText(b, "primary_day", "Monday");
    setText(b, "time_window", "06:00–14:00");
    setText(b, "frequency", "Weekly");
    setText(b, "notes", "");
    holder.appendChild(b);
    saveBrowser();
    renderTables();
  }

  function editSpecial(index) {
    if (viewMode) return;
    var holder = doc.getElementsByTagName("special_dates")[0];
    var e = holder.getElementsByTagName("entry")[index];
    if (!e) return;
    window.BAGOXmlModal
      .openModal({
        title: "Edit special date",
        fields: [
          { name: "date", label: "Date (YYYY-MM-DD)", value: getText(e, "date") },
          { name: "description", label: "Description", value: getText(e, "description") },
          { name: "action", label: "Action / adjustment", value: getText(e, "action") }
        ]
      })
      .then(function (v) {
        if (!v) return;
        setText(e, "date", v.date);
        setText(e, "description", v.description);
        setText(e, "action", v.action);
        saveBrowser();
        renderTables();
      });
  }

  function delSpecial(index) {
    if (viewMode) return;
    if (!confirm("Delete this special date?")) return;
    var holder = doc.getElementsByTagName("special_dates")[0];
    var e = holder.getElementsByTagName("entry")[index];
    if (e) e.parentNode.removeChild(e);
    saveBrowser();
    renderTables();
  }

  function addSpecial() {
    if (viewMode) return;
    var holder = doc.getElementsByTagName("special_dates")[0];
    var e = doc.createElement("entry");
    setText(e, "date", "2026-01-01");
    setText(e, "description", "Holiday");
    setText(e, "action", "No collection");
    holder.appendChild(e);
    saveBrowser();
    renderTables();
  }

  function editShift(index) {
    if (viewMode) return;
    var holder = doc.getElementsByTagName("collector_shifts")[0];
    var s = holder.getElementsByTagName("shift")[index];
    if (!s) return;
    window.BAGOXmlModal
      .openModal({
        title: "Edit shift",
        fields: [
          { name: "team", label: "Team", value: getText(s, "team") },
          { name: "lead", label: "Lead", value: getText(s, "lead") },
          { name: "assigned_days", label: "Assigned days", value: getText(s, "assigned_days") },
          { name: "start_time", label: "Start (HH:MM)", value: getText(s, "start_time") },
          { name: "end_time", label: "End (HH:MM)", value: getText(s, "end_time") }
        ],
        validate: function (v) {
          if (v.lead && v.lead.indexOf("@") > -1 && !window.BAGOXmlValidators.validGovEmail(v.lead)) {
            return "Lead email must be gov domain if email used";
          }
          return true;
        }
      })
      .then(function (v) {
        if (!v) return;
        setText(s, "team", v.team);
        setText(s, "lead", v.lead);
        setText(s, "assigned_days", v.assigned_days);
        setText(s, "start_time", v.start_time);
        setText(s, "end_time", v.end_time);
        saveBrowser();
        renderTables();
      });
  }

  function delShift(index) {
    if (viewMode) return;
    if (!confirm("Delete this shift?")) return;
    var holder = doc.getElementsByTagName("collector_shifts")[0];
    var s = holder.getElementsByTagName("shift")[index];
    if (s) s.parentNode.removeChild(s);
    saveBrowser();
    renderTables();
  }

  function addShift() {
    if (viewMode) return;
    var holder = doc.getElementsByTagName("collector_shifts")[0];
    var s = doc.createElement("shift");
    setText(s, "team", "New Team");
    setText(s, "lead", "TBD");
    setText(s, "assigned_days", "Mon");
    setText(s, "start_time", "06:00");
    setText(s, "end_time", "14:00");
    holder.appendChild(s);
    saveBrowser();
    renderTables();
  }

  function reloadFromFile() {
    if (viewMode) return;
    C.clearStorage(C.STORAGE_SCHEDULES);
    return C.loadXmlAsync({
      storageKey: C.STORAGE_SCHEDULES,
      fetchPath: "../xml/schedules.xml",
      fallbackXml: getSchedulesFallback()
    }).then(function (d) {
      doc = d;
      fullRefresh();
      el("save-status").textContent = "Reloaded from project file.";
    });
  }

  function bindSortClicks() {
    var main = document.querySelector("main");
    if (!main) return;
    main.addEventListener("click", function (e) {
      var th = e.target.closest("th.sortable");
      if (!th) return;
      e.preventDefault();
      var section = th.getAttribute("data-section");
      var col = parseInt(th.getAttribute("data-col"), 10);
      if (!section || isNaN(col)) return;
      toggleSort(section, col);
    });
  }

  function applyViewMode() {
    if (!viewMode) return;
    document.body.classList.add("xml-view-mode");
    var banner = el("view-mode-banner");
    if (banner) banner.style.display = "block";
    ["meta-title", "meta-tagline", "meta-proponent", "meta-coverage", "stat-routes", "stat-ontime", "stat-barangays", "stat-exceptions"].forEach(function (id) {
      var n = el(id);
      if (n) n.readOnly = true;
    });
  }

  function init() {
    applyViewMode();
    bindSortClicks();

    C.loadXmlAsync({
      storageKey: C.STORAGE_SCHEDULES,
      fetchPath: "../xml/schedules.xml",
      fallbackXml: getSchedulesFallback()
    }).then(function (d) {
      doc = d;
      fullRefresh();
    });

    if (!viewMode) {
      el("btn-save-browser").onclick = function () {
        saveBrowser();
      };
      el("btn-export").onclick = function () {
        syncMetaFromForm();
        syncStatsFromForm();
        C.downloadXml("schedules-edited.xml", doc, C.PI_SCHEDULES);
        el("save-status").textContent = "Export started (downloads folder). Replace xml/schedules.xml manually if needed.";
      };
      el("btn-reload-file").onclick = function () {
        reloadFromFile();
      };
      el("btn-clear-storage").onclick = function () {
        if (!confirm("Clear saved copy in this browser? Unsaved export only in download folder.")) return;
        C.clearStorage(C.STORAGE_SCHEDULES);
        reloadFromFile();
      };

      ["meta-title", "meta-tagline", "meta-proponent", "meta-coverage", "stat-routes", "stat-ontime", "stat-barangays", "stat-exceptions"].forEach(function (id) {
        el(id).addEventListener("change", function () {
          syncMetaFromForm();
          syncStatsFromForm();
          saveBrowser();
        });
      });

      el("btn-add-route").onclick = addRoute;
      el("btn-add-barangay").onclick = addBarangay;
      el("btn-add-special").onclick = addSpecial;
      el("btn-add-shift").onclick = addShift;
      var prev = el("btn-xsl-preview");
      if (prev) {
        prev.onclick = function () {
          window.open("../xml/schedules.xml", "_blank");
        };
      }
    } else {
      el("btn-export").onclick = function () {
        syncMetaFromForm();
        syncStatsFromForm();
        C.downloadXml("schedules-export.xml", doc, C.PI_SCHEDULES);
        el("save-status").textContent = "Downloaded copy of current data.";
      };
      var prevView = el("btn-xsl-preview");
      if (prevView) {
        prevView.onclick = function () {
          window.open("../xml/schedules.xml", "_blank");
        };
      }
    }

    ["filter-route-day", "filter-route-q", "filter-barangay-day", "filter-barangay-q", "filter-special-q", "filter-shift-q"].forEach(function (id) {
      el(id).addEventListener("input", function () {
        renderTables();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
