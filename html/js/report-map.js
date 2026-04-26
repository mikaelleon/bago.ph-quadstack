(function () {
  let map = null;
  let markers = [];

  function clearMarkers() {
    markers.forEach((m) => m.remove());
    markers = [];
  }

  function ensureMap() {
    if (map) return map;
    map = L.map("lgu-report-map").setView([13.9411, 121.1637], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
    return map;
  }

  async function loadReportMap() {
    ensureMap();
    clearMarkers();
    const rows = await window.BAGOApi.request("GET", "/api/reports");
    rows.forEach((row) => {
      if (row.gps_latitude == null || row.gps_longitude == null) return;
      const marker = L.marker([Number(row.gps_latitude), Number(row.gps_longitude)]).addTo(map);
      marker.bindPopup(
        `<strong>${row.reference_number}</strong><br>${row.issue_type}<br>Status: ${row.status}`
      );
      markers.push(marker);
    });
  }

  window.BAGOReportMap = { loadReportMap: loadReportMap };
})();
