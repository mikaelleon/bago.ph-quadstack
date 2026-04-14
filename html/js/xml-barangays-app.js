(function () {
  var doc = null;
  var C = window.BAGO_XML_CORE;
  var viewMode = new URLSearchParams(location.search).get("mode") === "view";
  var sortState = { col: null, dir: 1 };

  function getBarangaysFallback() {
    if (window.BAGO_BARANGAYS_FALLBACK) return window.BAGO_BARANGAYS_FALLBACK;
    var n = document.getElementById("barangays-xml-fallback");
    return n
      ? n.textContent.trim()
      : '<bago_barangays city="Lipa City" province="Batangas" last_updated="2026-04-14"><meta><source>BAGO.PH</source><note/></meta></bago_barangays>';
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

  function esc(s) {
    if (s == null) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function parsePct(s) {
    var m = String(s).replace(/,/g, "").match(/[\d.]+/);
    return m ? parseFloat(m[0]) : 0;
  }

  function parseIntLoose(s) {
    var m = String(s).replace(/,/g, "").match(/[\d-]+/);
    return m ? parseInt(m[0], 10) : 0;
  }

  function rowSortVal(b, col) {
    switch (col) {
      case 0:
        return (b.getAttribute("name") || "").toLowerCase();
      case 1:
        return parsePct(getText(b, "collection_rate"));
      case 2:
        return parsePct(getText(b, "compliance_rate"));
      case 3:
        return parseIntLoose(getText(b, "open_reports"));
      case 4:
        return parseIntLoose(getText(b, "eco_points"));
      case 5:
        return getText(b, "status").toLowerCase();
      default:
        return 0;
    }
  }

  function syncHeaderFromForm() {
    var root = doc.documentElement;
    root.setAttribute("city", el("hdr-city").value);
    root.setAttribute("province", el("hdr-province").value);
    root.setAttribute("last_updated", el("hdr-updated").value);
    var meta = root.getElementsByTagName("meta")[0];
    if (!meta) {
      meta = doc.createElement("meta");
      root.insertBefore(meta, root.firstChild);
    }
    setText(meta, "source", el("meta-source").value);
    setText(meta, "note", el("meta-note").value);
  }

  function syncHeaderToForm() {
    var root = doc.documentElement;
    el("hdr-city").value = root.getAttribute("city") || "";
    el("hdr-province").value = root.getAttribute("province") || "";
    el("hdr-updated").value = root.getAttribute("last_updated") || "";
    var meta = root.getElementsByTagName("meta")[0];
    if (meta) {
      el("meta-source").value = getText(meta, "source");
      el("meta-note").value = getText(meta, "note");
    }
  }

  function updateSortLabels() {
    document.querySelectorAll("th.sortable").forEach(function (th) {
      var base = th.getAttribute("data-label") || "";
      var col = parseInt(th.getAttribute("data-col"), 10);
      var mark = " ⇅";
      if (sortState.col === col) mark = sortState.dir === 1 ? " ▲" : " ▼";
      th.textContent = base + mark;
    });
  }

  function toggleSort(col) {
    if (sortState.col === col) sortState.dir = -sortState.dir;
    else {
      sortState.col = col;
      sortState.dir = 1;
    }
    updateSortLabels();
    renderTable();
  }

  function renderTable() {
    updateSortLabels();
    var tbody = el("tbody-barangays");
    tbody.innerHTML = "";
    var fq = el("filter-barangay-q").value.toLowerCase();
    var fs = el("filter-status").value.toLowerCase();
    var list = doc.documentElement.getElementsByTagName("barangay");
    var rows = [];
    for (var i = 0; i < list.length; i++) {
      var b = list[i];
      var name = b.getAttribute("name") || "";
      var status = getText(b, "status");
      if (fq) {
        var blob = (
          name +
          " " +
          getText(b, "collection_rate") +
          " " +
          getText(b, "compliance_rate") +
          " " +
          status
        ).toLowerCase();
        if (blob.indexOf(fq) === -1) continue;
      }
      if (fs && status.toLowerCase().indexOf(fs) === -1) continue;
      rows.push({ i: i, node: b });
    }
    if (sortState.col !== null) {
      rows.sort(function (a, b) {
        var va = rowSortVal(a.node, sortState.col);
        var vb = rowSortVal(b.node, sortState.col);
        var cmp;
        if (typeof va === "number" && typeof vb === "number") cmp = va - vb;
        else cmp = String(va).localeCompare(String(vb), undefined, { numeric: true });
        return cmp * sortState.dir;
      });
    }
    rows.forEach(function (row) {
      var i = row.i;
      var b = row.node;
      var name = b.getAttribute("name") || "";
      var status = getText(b, "status");
      var tr = document.createElement("tr");
      var actions =
        '<button type="button" class="bento-btn bento-btn-sm bento-btn-ghost btn-edit xml-crud-only" data-i="' +
        i +
        '">Edit</button> <button type="button" class="bento-btn bento-btn-sm bento-btn-outline btn-del xml-crud-only" data-i="' +
        i +
        '">Delete</button>';
      if (viewMode) actions = "";
      tr.innerHTML =
        "<td><strong>" +
        esc(name) +
        "</strong></td><td>" +
        esc(getText(b, "collection_rate")) +
        "</td><td>" +
        esc(getText(b, "compliance_rate")) +
        "</td><td>" +
        esc(getText(b, "open_reports")) +
        "</td><td>" +
        esc(getText(b, "eco_points")) +
        "</td><td>" +
        esc(status) +
        "</td><td>" +
        actions +
        "</td>";
      tbody.appendChild(tr);
    });
    tbody.querySelectorAll(".btn-edit").forEach(function (btn) {
      btn.onclick = function () {
        editRow(parseInt(btn.getAttribute("data-i"), 10));
      };
    });
    tbody.querySelectorAll(".btn-del").forEach(function (btn) {
      btn.onclick = function () {
        delRow(parseInt(btn.getAttribute("data-i"), 10));
      };
    });
  }

  function saveBrowser() {
    if (viewMode) return;
    syncHeaderFromForm();
    C.saveToStorage(C.STORAGE_BARANGAYS, doc, C.PI_BARANGAYS);
    el("save-status").textContent = "Saved to this browser (" + new Date().toLocaleString() + ").";
  }

  function editRow(index) {
    if (viewMode) return;
    var b = doc.documentElement.getElementsByTagName("barangay")[index];
    if (!b) return;
    var name = prompt("Barangay name", b.getAttribute("name") || "");
    if (name === null) return;
    b.setAttribute("name", name);
    var cr = prompt("Collection rate", getText(b, "collection_rate"));
    if (cr === null) return;
    var comp = prompt("Compliance rate", getText(b, "compliance_rate"));
    if (comp === null) return;
    var rep = prompt("Open reports", getText(b, "open_reports"));
    if (rep === null) return;
    var ep = prompt("Eco-points", getText(b, "eco_points"));
    if (ep === null) return;
    var st = prompt("Status (On Track / Monitor / Urgent)", getText(b, "status"));
    if (st === null) return;
    setText(b, "collection_rate", cr);
    setText(b, "compliance_rate", comp);
    setText(b, "open_reports", rep);
    setText(b, "eco_points", ep);
    setText(b, "status", st);
    saveBrowser();
    renderTable();
  }

  function delRow(index) {
    if (viewMode) return;
    if (!confirm("Delete this barangay row?")) return;
    var b = doc.documentElement.getElementsByTagName("barangay")[index];
    if (b) b.parentNode.removeChild(b);
    saveBrowser();
    renderTable();
  }

  function addRow() {
    if (viewMode) return;
    var b = doc.createElement("barangay");
    b.setAttribute("name", "New Barangay");
    setText(b, "collection_rate", "0%");
    setText(b, "compliance_rate", "0%");
    setText(b, "open_reports", "0");
    setText(b, "eco_points", "0");
    setText(b, "status", "On Track");
    doc.documentElement.appendChild(b);
    saveBrowser();
    renderTable();
  }

  function reloadFromFile() {
    if (viewMode) return;
    C.clearStorage(C.STORAGE_BARANGAYS);
    return C.loadXmlAsync({
      storageKey: C.STORAGE_BARANGAYS,
      fetchPath: "../xml/barangays.xml",
      fallbackXml: getBarangaysFallback()
    }).then(function (d) {
      doc = d;
      syncHeaderToForm();
      renderTable();
      el("save-status").textContent = "Reloaded from project file.";
    });
  }

  function fullRefresh() {
    syncHeaderToForm();
    renderTable();
  }

  function applyViewMode() {
    if (!viewMode) return;
    document.body.classList.add("xml-view-mode");
    var banner = el("view-mode-banner");
    if (banner) banner.style.display = "block";
    ["hdr-city", "hdr-province", "hdr-updated", "meta-source", "meta-note"].forEach(function (id) {
      var n = el(id);
      if (n) n.readOnly = true;
    });
  }

  function init() {
    applyViewMode();

    document.querySelector("main").addEventListener("click", function (e) {
      var th = e.target.closest("th.sortable");
      if (!th) return;
      e.preventDefault();
      var col = parseInt(th.getAttribute("data-col"), 10);
      if (isNaN(col)) return;
      toggleSort(col);
    });

    C.loadXmlAsync({
      storageKey: C.STORAGE_BARANGAYS,
      fetchPath: "../xml/barangays.xml",
      fallbackXml: getBarangaysFallback()
    }).then(function (d) {
      doc = d;
      fullRefresh();
    });

    if (!viewMode) {
      el("btn-save-browser").onclick = saveBrowser;
      el("btn-export").onclick = function () {
        syncHeaderFromForm();
        C.downloadXml("barangays-edited.xml", doc, C.PI_BARANGAYS);
        el("save-status").textContent = "Export started. Replace xml/barangays.xml manually if needed.";
      };
      el("btn-reload-file").onclick = reloadFromFile;
      el("btn-clear-storage").onclick = function () {
        if (!confirm("Clear saved copy in this browser?")) return;
        C.clearStorage(C.STORAGE_BARANGAYS);
        reloadFromFile();
      };
      el("btn-add").onclick = addRow;

      ["hdr-city", "hdr-province", "hdr-updated", "meta-source", "meta-note"].forEach(function (id) {
        el(id).addEventListener("change", function () {
          syncHeaderFromForm();
          saveBrowser();
        });
      });
    } else {
      el("btn-export").onclick = function () {
        syncHeaderFromForm();
        C.downloadXml("barangays-export.xml", doc, C.PI_BARANGAYS);
        el("save-status").textContent = "Downloaded copy of current data.";
      };
    }

    el("filter-barangay-q").addEventListener("input", renderTable);
    el("filter-status").addEventListener("change", renderTable);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
