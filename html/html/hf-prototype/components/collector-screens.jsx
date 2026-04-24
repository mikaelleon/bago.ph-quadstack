// collector-screens.jsx — static-host copy (minimal but complete)
function _colBox(title, subtitle) {
  return (
    <div style={{ width: 980, minHeight: 620, margin: "40px auto", background: "white", borderRadius: 12, padding: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.1)", fontFamily: "Poppins" }}>
      <h1 style={{ marginTop: 0 }}>{title}</h1>
      <p style={{ color: "#666" }}>{subtitle}</p>
    </div>
  );
}
function CollectorHome() { return _colBox("Collector Home", "Route status and assigned workload."); }
function CollectorRoute() { return _colBox("Collector Route", "Stops and route progression."); }
function CollectorScan() { return _colBox("Collector QR Scan", "Scan household QR and verify."); }
function CollectorReports() { return _colBox("Assigned Reports", "Collector report queue."); }
function CollectorReportUpdate() { return _colBox("Update Report", "Update report status and notes."); }
Object.assign(window, { CollectorHome, CollectorRoute, CollectorScan, CollectorReports, CollectorReportUpdate });
