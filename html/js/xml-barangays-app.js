(function () {
  var doc = null;
  var C = window.BAGO_XML_CORE;

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

  function renderTable() {
    var tbody = el("tbody-barangays");
    tbody.innerHTML = "";
    var fq = el("filter-barangay-q").value.toLowerCase();
    var fs = el("filter-status").value.toLowerCase();
    var list = doc.documentElement.getElementsByTagName("barangay");
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
      var tr = document.createElement("tr");
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
        '</td><td><button type="button" class="bento-btn bento-btn-sm bento-btn-ghost btn-edit" data-i="' +
        i +
        '">Edit</button> <button type="button" class="bento-btn bento-btn-sm bento-btn-outline btn-del" data-i="' +
        i +
        '">Delete</button></td>';
      tbody.appendChild(tr);
    }
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
    syncHeaderFromForm();
    C.saveToStorage(C.STORAGE_BARANGAYS, doc, C.PI_BARANGAYS);
    el("save-status").textContent = "Saved to this browser (" + new Date().toLocaleString() + ").";
  }

  function editRow(index) {
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
    if (!confirm("Delete this barangay row?")) return;
    var b = doc.documentElement.getElementsByTagName("barangay")[index];
    if (b) b.parentNode.removeChild(b);
    saveBrowser();
    renderTable();
  }

  function addRow() {
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

  function init() {
    C.loadXmlAsync({
      storageKey: C.STORAGE_BARANGAYS,
      fetchPath: "../xml/barangays.xml",
      fallbackXml: getBarangaysFallback()
    }).then(function (d) {
      doc = d;
      fullRefresh();
    });

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

    el("filter-barangay-q").addEventListener("input", renderTable);
    el("filter-status").addEventListener("change", renderTable);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
