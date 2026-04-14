(function () {
  var doc = null;
  var C = window.BAGO_XML_CORE;

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

  function renderRoutes() {
    var tbody = el("tbody-routes");
    tbody.innerHTML = "";
    var filterDay = el("filter-route-day").value.toLowerCase();
    var filterQ = el("filter-route-q").value.toLowerCase();
    var routes = doc.getElementsByTagName("weekly_route_calendar")[0];
    if (!routes) return;
    var list = routes.getElementsByTagName("route");
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
      var tr = document.createElement("tr");
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
        '</td><td><button type="button" class="bento-btn bento-btn-sm bento-btn-ghost btn-edit-route" data-i="' +
        i +
        '">Edit</button> <button type="button" class="bento-btn bento-btn-sm bento-btn-outline btn-del-route" data-i="' +
        i +
        '">Delete</button></td>';
      tbody.appendChild(tr);
    }
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
    for (var i = 0; i < list.length; i++) {
      var b = list[i];
      var name = getText(b, "name");
      var pd = getText(b, "primary_day");
      if (filterDay && pd.toLowerCase().indexOf(filterDay) === -1) continue;
      if (filterQ && name.toLowerCase().indexOf(filterQ) === -1) continue;
      var tr = document.createElement("tr");
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
        '</td><td><button type="button" class="bento-btn bento-btn-sm bento-btn-ghost btn-edit-bg" data-i="' +
        i +
        '">Edit</button> <button type="button" class="bento-btn bento-btn-sm bento-btn-outline btn-del-bg" data-i="' +
        i +
        '">Delete</button></td>';
      tbody.appendChild(tr);
    }
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
    for (var i = 0; i < list.length; i++) {
      var e = list[i];
      var d = getText(e, "date");
      var desc = getText(e, "description");
      var act = getText(e, "action");
      if (filterQ) {
        var blob = (d + " " + desc + " " + act).toLowerCase();
        if (blob.indexOf(filterQ) === -1) continue;
      }
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" +
        esc(d) +
        "</td><td>" +
        esc(desc) +
        "</td><td>" +
        esc(act) +
        '</td><td><button type="button" class="bento-btn bento-btn-sm bento-btn-ghost btn-edit-sp" data-i="' +
        i +
        '">Edit</button> <button type="button" class="bento-btn bento-btn-sm bento-btn-outline btn-del-sp" data-i="' +
        i +
        '">Delete</button></td>';
      tbody.appendChild(tr);
    }
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
    for (var i = 0; i < list.length; i++) {
      var s = list[i];
      var team = getText(s, "team");
      var lead = getText(s, "lead");
      if (filterQ) {
        var blob = (team + " " + lead + " " + getText(s, "assigned_days")).toLowerCase();
        if (blob.indexOf(filterQ) === -1) continue;
      }
      var tr = document.createElement("tr");
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
        '</td><td><button type="button" class="bento-btn bento-btn-sm bento-btn-ghost btn-edit-sh" data-i="' +
        i +
        '">Edit</button> <button type="button" class="bento-btn bento-btn-sm bento-btn-outline btn-del-sh" data-i="' +
        i +
        '">Delete</button></td>';
      tbody.appendChild(tr);
    }
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
    syncMetaFromForm();
    syncStatsFromForm();
    C.saveToStorage(C.STORAGE_SCHEDULES, doc, C.PI_SCHEDULES);
    el("save-status").textContent = "Saved to this browser (" + new Date().toLocaleString() + ").";
  }

  function editRoute(index) {
    var routes = doc.getElementsByTagName("weekly_route_calendar")[0];
    var r = routes.getElementsByTagName("route")[index];
    if (!r) return;
    var wd = prompt("Weekday", getText(r, "weekday"));
    if (wd === null) return;
    var code = prompt("Route code", getText(r, "route_code"));
    if (code === null) return;
    var areas = prompt("Areas", getText(r, "areas"));
    if (areas === null) return;
    var ws = prompt("Window start (HH:MM)", getText(r, "window_start"));
    if (ws === null) return;
    var we = prompt("Window end (HH:MM)", getText(r, "window_end"));
    if (we === null) return;
    var st = prompt("Status (active / limited)", getText(r, "status"));
    if (st === null) return;
    setText(r, "weekday", wd);
    setText(r, "route_code", code);
    setText(r, "areas", areas);
    setText(r, "window_start", ws);
    setText(r, "window_end", we);
    setText(r, "status", st);
    saveBrowser();
    renderTables();
  }

  function delRoute(index) {
    if (!confirm("Delete this route row?")) return;
    var routes = doc.getElementsByTagName("weekly_route_calendar")[0];
    var r = routes.getElementsByTagName("route")[index];
    if (r) r.parentNode.removeChild(r);
    saveBrowser();
    renderTables();
  }

  function addRoute() {
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
    var holder = doc.getElementsByTagName("barangay_schedules")[0];
    var b = holder.getElementsByTagName("barangay")[index];
    if (!b) return;
    var name = prompt("Barangay name", getText(b, "name"));
    if (name === null) return;
    var pd = prompt("Primary day", getText(b, "primary_day"));
    if (pd === null) return;
    var tw = prompt("Time window", getText(b, "time_window"));
    if (tw === null) return;
    var fq = prompt("Frequency", getText(b, "frequency"));
    if (fq === null) return;
    var notes = prompt("Notes", getText(b, "notes"));
    if (notes === null) return;
    setText(b, "name", name);
    setText(b, "primary_day", pd);
    setText(b, "time_window", tw);
    setText(b, "frequency", fq);
    setText(b, "notes", notes);
    saveBrowser();
    renderTables();
  }

  function delBarangay(index) {
    if (!confirm("Delete this barangay row?")) return;
    var holder = doc.getElementsByTagName("barangay_schedules")[0];
    var b = holder.getElementsByTagName("barangay")[index];
    if (b) b.parentNode.removeChild(b);
    saveBrowser();
    renderTables();
  }

  function addBarangay() {
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
    var holder = doc.getElementsByTagName("special_dates")[0];
    var e = holder.getElementsByTagName("entry")[index];
    if (!e) return;
    var d = prompt("Date (YYYY-MM-DD)", getText(e, "date"));
    if (d === null) return;
    var desc = prompt("Description", getText(e, "description"));
    if (desc === null) return;
    var act = prompt("Action / adjustment", getText(e, "action"));
    if (act === null) return;
    setText(e, "date", d);
    setText(e, "description", desc);
    setText(e, "action", act);
    saveBrowser();
    renderTables();
  }

  function delSpecial(index) {
    if (!confirm("Delete this special date?")) return;
    var holder = doc.getElementsByTagName("special_dates")[0];
    var e = holder.getElementsByTagName("entry")[index];
    if (e) e.parentNode.removeChild(e);
    saveBrowser();
    renderTables();
  }

  function addSpecial() {
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
    var holder = doc.getElementsByTagName("collector_shifts")[0];
    var s = holder.getElementsByTagName("shift")[index];
    if (!s) return;
    var team = prompt("Team", getText(s, "team"));
    if (team === null) return;
    var lead = prompt("Lead", getText(s, "lead"));
    if (lead === null) return;
    var ad = prompt("Assigned days", getText(s, "assigned_days"));
    if (ad === null) return;
    var st = prompt("Start (HH:MM)", getText(s, "start_time"));
    if (st === null) return;
    var en = prompt("End (HH:MM)", getText(s, "end_time"));
    if (en === null) return;
    setText(s, "team", team);
    setText(s, "lead", lead);
    setText(s, "assigned_days", ad);
    setText(s, "start_time", st);
    setText(s, "end_time", en);
    saveBrowser();
    renderTables();
  }

  function delShift(index) {
    if (!confirm("Delete this shift?")) return;
    var holder = doc.getElementsByTagName("collector_shifts")[0];
    var s = holder.getElementsByTagName("shift")[index];
    if (s) s.parentNode.removeChild(s);
    saveBrowser();
    renderTables();
  }

  function addShift() {
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

  function init() {
    C.loadXmlAsync({
      storageKey: C.STORAGE_SCHEDULES,
      fetchPath: "../xml/schedules.xml",
      fallbackXml: getSchedulesFallback()
    }).then(function (d) {
      doc = d;
      fullRefresh();
    });

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

    ["filter-route-day", "filter-route-q", "filter-barangay-day", "filter-barangay-q", "filter-special-q", "filter-shift-q"].forEach(function (id) {
      el(id).addEventListener("input", renderTables);
    });

    el("btn-add-route").onclick = addRoute;
    el("btn-add-barangay").onclick = addBarangay;
    el("btn-add-special").onclick = addSpecial;
    el("btn-add-shift").onclick = addShift;
  }

  document.addEventListener("DOMContentLoaded", init);
})();
