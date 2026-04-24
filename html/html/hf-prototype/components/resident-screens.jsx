// resident-screens.jsx — static-host copy (minimal but complete)
function _resBox(title, subtitle) {
  return (
    <div style={{ width: 980, minHeight: 620, margin: "40px auto", background: "white", borderRadius: 12, padding: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.1)", fontFamily: "Poppins" }}>
      <h1 style={{ marginTop: 0 }}>{title}</h1>
      <p style={{ color: "#666" }}>{subtitle}</p>
    </div>
  );
}
function ResidentHome() { return _resBox("Resident Home", "Dashboard and quick actions."); }
function ResidentSchedule() { return _resBox("Resident Schedule", "Collection schedule view."); }
function ResidentReport() { return _resBox("Resident Report", "Submit waste issue reports."); }
function ResidentReportSubmitted() { return _resBox("Report Submitted", "Report confirmation details."); }
function ResidentMyReports() { return _resBox("My Reports", "Track submitted reports."); }
function ResidentReportDetail() { return _resBox("Report Detail", "Detailed report timeline/status."); }
function ResidentWallet() { return _resBox("Eco-Points Wallet", "Balance and transaction history."); }
function ResidentMissions() { return _resBox("Missions", "Active mission list."); }
function ResidentRewards() { return _resBox("Rewards", "Redeem eco-points rewards."); }
function ResidentLeaderboard() { return _resBox("Leaderboard", "Barangay rankings."); }
Object.assign(window, { ResidentHome, ResidentSchedule, ResidentReport, ResidentReportSubmitted, ResidentMyReports, ResidentReportDetail, ResidentWallet, ResidentMissions, ResidentRewards, ResidentLeaderboard });
