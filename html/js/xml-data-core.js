/**
 * Client-side XML load/save for BAGO.PH prototype.
 * Persists to localStorage; export downloads a file (cannot overwrite repo XML without a server).
 */
(function (global) {
  var STORAGE_SCHEDULES = "bago_ph_xml_schedules_v1";
  var STORAGE_BARANGAYS = "bago_ph_xml_barangays_v1";
  var PI_SCHEDULES =
    '<?xml-stylesheet type="text/xsl" href="../xsl/ecolinisph-schedules.xsl"?>';
  var PI_BARANGAYS = '<?xml-stylesheet type="text/xsl" href="../xsl/barangays.xsl"?>';

  function parseXml(str) {
    var doc = new DOMParser().parseFromString(str, "text/xml");
    var err = doc.querySelector("parsererror");
    if (err) throw new Error(err.textContent || "Invalid XML");
    return doc;
  }

  function serializeDocument(doc, includePi, piLine) {
    var ser = new XMLSerializer();
    var body = ser.serializeToString(doc.documentElement);
    var out = '<?xml version="1.0" encoding="UTF-8"?>\n';
    if (includePi && piLine) out += piLine + "\n";
    out += body;
    return out;
  }

  function loadXmlAsync(options) {
    var storageKey = options.storageKey;
    var fetchPath = options.fetchPath;
    var fallbackXml = options.fallbackXml;

    var cached = localStorage.getItem(storageKey);
    if (cached) {
      try {
        return Promise.resolve(parseXml(cached));
      } catch (e) {
        localStorage.removeItem(storageKey);
      }
    }

    return fetch(fetchPath, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("fetch failed");
        return res.text();
      })
      .then(function (text) {
        return parseXml(text);
      })
      .catch(function () {
        return parseXml(fallbackXml);
      });
  }

  function saveToStorage(storageKey, doc, piLine) {
    var xml = serializeDocument(doc, true, piLine);
    localStorage.setItem(storageKey, xml);
  }

  function downloadXml(filename, doc, piLine) {
    var xml = serializeDocument(doc, true, piLine);
    var blob = new Blob([xml], { type: "application/xml;charset=utf-8" });
    var a = document.createElement("a");
    var url = URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Revoke after click tick so browser has time to start download.
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 0);
  }

  function clearStorage(storageKey) {
    localStorage.removeItem(storageKey);
  }

  function sortRows(rows, keyFn, dir) {
    var out = rows.slice();
    out.sort(function (a, b) {
      var va = keyFn(a);
      var vb = keyFn(b);
      var cmp = String(va).localeCompare(String(vb), undefined, { numeric: true, sensitivity: "base" });
      return cmp * (dir || 1);
    });
    return out;
  }

  function filterRows(rows, predicate) {
    return rows.filter(predicate);
  }

  global.BAGO_XML_CORE = {
    STORAGE_SCHEDULES: STORAGE_SCHEDULES,
    STORAGE_BARANGAYS: STORAGE_BARANGAYS,
    PI_SCHEDULES: PI_SCHEDULES,
    PI_BARANGAYS: PI_BARANGAYS,
    parseXml: parseXml,
    loadXmlAsync: loadXmlAsync,
    saveToStorage: saveToStorage,
    downloadXml: downloadXml,
    clearStorage: clearStorage,
    serializeDocument: serializeDocument,
    sortRows: sortRows,
    filterRows: filterRows
  };
})(window);
