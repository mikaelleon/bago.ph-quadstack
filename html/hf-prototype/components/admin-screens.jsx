// admin-screens.jsx — static-host copy (minimal but complete)
function _adminBox(title, subtitle) {
  return (
    <div style={{ width: 1180, minHeight: 720, margin: "30px auto", background: "white", borderRadius: 12, padding: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.1)", fontFamily: "Poppins" }}>
      <h1 style={{ marginTop: 0 }}>{title}</h1>
      <p style={{ color: "#666" }}>{subtitle}</p>
    </div>
  );
}
function AdminLogin() { return _adminBox("LGU Admin Login", "Secure admin authentication portal."); }
function AdminDashboard() { return _adminBox("LGU Operations Dashboard", "KPIs, activity feed, barangay performance."); }
function AdminSchedule() { return _adminBox("Schedule Management", "Calendar and upcoming collection table."); }
function AdminReports() { return _adminBox("Report Console", "Triaging and assignment console."); }
function AdminDENRReport() { return _adminBox("DENR Compliance Report", "Generate and export compliance reports."); }
Object.assign(window, { AdminLogin, AdminDashboard, AdminSchedule, AdminReports, AdminDENRReport });
