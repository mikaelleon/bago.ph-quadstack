const ROLE_PAGE_ACCESS = {
  user: new Set([
    "index.html",
    "dashboard.html",
    "schedule.html",
    "report.html",
    "eco-points.html",
    "announcements.html"
  ]),
  collector: new Set([
    "index.html",
    "dashboard.html",
    "schedule.html",
    "report.html",
    "collectors.html",
    "announcements.html",
    "qr-audit.html",
    "xml-schedules-editor.html"
  ]),
  lgu_officer: new Set([
    "index.html",
    "dashboard.html",
    "schedule.html",
    "report.html",
    "collectors.html",
    "compliance.html",
    "eco-points.html",
    "announcements.html",
    "denr-reports.html",
    "users.html",
    "qr-audit.html",
    "xml-schedules-editor.html",
    "xml-barangays-editor.html"
  ])
};

function normalizeRole(role) {
  if (!role) return "user";
  const cleaned = String(role).trim().toLowerCase().replace(/\s+/g, "_");
  if (cleaned === "lgu_admin") return "lgu_officer";
  if (!ROLE_PAGE_ACCESS[cleaned]) return "user";
  return cleaned;
}

function getCurrentPageName() {
  const path = window.location.pathname.split("/").pop();
  return path || "index.html";
}

function getStoredRole() {
  return normalizeRole(localStorage.getItem("bagoRole"));
}

function setCurrentRole(role) {
  const normalized = normalizeRole(role);
  localStorage.setItem("bagoRole", normalized);
  return normalized;
}

function canAccessPage(role, pageName) {
  const normalizedRole = normalizeRole(role);
  const allowedPages = ROLE_PAGE_ACCESS[normalizedRole] || ROLE_PAGE_ACCESS.user;
  return allowedPages.has(pageName);
}

function getFirstAllowedPage(role) {
  const normalizedRole = normalizeRole(role);
  const allowedPages = ROLE_PAGE_ACCESS[normalizedRole] || ROLE_PAGE_ACCESS.user;
  return allowedPages.has("dashboard.html") ? "dashboard.html" : "index.html";
}

function enforceAccessControl() {
  const role = getStoredRole();
  const currentPage = getCurrentPageName();
  const isLoginPage = currentPage === "index.html";

  if (!isLoginPage && !localStorage.getItem("bagoRole")) {
    window.location.href = "index.html";
    return;
  }

  if (!canAccessPage(role, currentPage)) {
    window.location.href = getFirstAllowedPage(role);
    return;
  }

  const navLinks = document.querySelectorAll("nav ul li a[href$='.html']");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const pageName = href.split("/").pop();
    const allowed = canAccessPage(role, pageName);
    const item = link.closest("li");
    if (!item) return;
    item.style.display = allowed ? "" : "none";
  });
}

window.BAGOAccess = {
  setCurrentRole,
  getStoredRole,
  normalizeRole
};

document.addEventListener("DOMContentLoaded", enforceAccessControl);
