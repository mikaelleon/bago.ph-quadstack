/** Prototype-only: mobile → { role, pin } (plain PIN; no server). */
const STORAGE_ACCOUNTS = "bago_ph_accounts_v1";

const ROLE_PAGE_ACCESS = {
  user: new Set([
    "index.html",
    "register.html",
    "dashboard.html",
    "dashboard-resident.html",
    "schedule.html",
    "report.html",
    "eco-points.html",
    "announcements.html"
  ]),
  collector: new Set([
    "index.html",
    "register.html",
    "dashboard.html",
    "dashboard-collector.html",
    "schedule.html",
    "report.html",
    "collectors.html",
    "announcements.html",
    "qr-audit.html",
    "xml-schedules-editor.html"
  ]),
  lgu_officer: new Set([
    "index.html",
    "register.html",
    "dashboard.html",
    "dashboard-lgu.html",
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

function normalizeMobile(raw) {
  let d = String(raw || "").replace(/\D/g, "");
  if (d.length > 11) d = d.slice(-11);
  return d;
}

function loadAccounts() {
  try {
    const j = localStorage.getItem(STORAGE_ACCOUNTS);
    return j ? JSON.parse(j) : {};
  } catch (e) {
    return {};
  }
}

function saveRegisteredAccount(mobileRaw, pinRaw, role) {
  const m = normalizeMobile(mobileRaw);
  if (!m) return;
  const all = loadAccounts();
  all[m] = {
    role: normalizeRole(role),
    pin: String(pinRaw || "")
  };
  localStorage.setItem(STORAGE_ACCOUNTS, JSON.stringify(all));
}

function getRegisteredAccount(mobileRaw) {
  const m = normalizeMobile(mobileRaw);
  if (!m) return null;
  const row = loadAccounts()[m];
  if (!row || row.role == null) return null;
  return {
    role: normalizeRole(row.role),
    pin: String(row.pin != null ? row.pin : "")
  };
}

/**
 * @returns {{ ok: true, role: string } | { ok: false, message: string }}
 */
function validateLoginAttempt(mobileRaw, pinRaw) {
  const m = normalizeMobile(mobileRaw);
  if (!m || m.length < 10) {
    return { ok: false, message: "Enter a valid Philippine mobile number (e.g. 09171234567)." };
  }
  const pin = String(pinRaw || "");
  if (!/^\d{4}$/.test(pin)) {
    return { ok: false, message: "PIN must be exactly 4 digits." };
  }
  const acc = getRegisteredAccount(m);
  if (!acc) {
    return {
      ok: false,
      message:
        "No account for this number on this device. Use Create an account to register first."
    };
  }
  if (acc.pin !== pin) {
    return { ok: false, message: "Incorrect PIN." };
  }
  return { ok: true, role: acc.role };
}

function getDashboardHomeForRole(role) {
  const n = normalizeRole(role);
  if (n === "collector") return "dashboard-collector.html";
  if (n === "lgu_officer") return "dashboard-lgu.html";
  return "dashboard-resident.html";
}

function getCurrentPageName() {
  const path = window.location.pathname.split("/").pop();
  return path || "index.html";
}

function isAuthPage() {
  const p = getCurrentPageName();
  return p === "index.html" || p === "register.html";
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

function rewriteDashboardLinks(role) {
  const home = getDashboardHomeForRole(role);
  document.querySelectorAll('a[href="dashboard.html"]').forEach(function (a) {
    a.setAttribute("href", home);
  });
}

function appendLogoutNav() {
  if (isAuthPage()) return;
  if (!localStorage.getItem("bagoRole")) return;
  var navUl = document.querySelector("nav ul");
  if (!navUl || document.getElementById("bago-logout-nav")) return;
  var li = document.createElement("li");
  li.id = "bago-logout-nav";
  var a = document.createElement("a");
  a.href = "#";
  a.textContent = "Logout";
  a.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("bagoRole");
    try {
      localStorage.removeItem("bagoToken");
    } catch (_err) {}
    window.location.href = "index.html";
  });
  li.appendChild(a);
  navUl.appendChild(li);
}

function enforceAccessControl() {
  const currentPage = getCurrentPageName();
  const roleStored = localStorage.getItem("bagoRole");

  if (isAuthPage()) {
    if (roleStored) {
      window.location.href = getDashboardHomeForRole(getStoredRole());
      return;
    }
    return;
  }

  if (!roleStored) {
    window.location.href = "index.html";
    return;
  }

  const role = getStoredRole();
  if (!canAccessPage(role, currentPage)) {
    window.location.href = getDashboardHomeForRole(role);
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

  rewriteDashboardLinks(role);
  appendLogoutNav();
}

function getDashboardHome() {
  return getDashboardHomeForRole(getStoredRole());
}

function roleFromSelectorButtonText(buttonText) {
  if (!buttonText) return "user";
  const t = String(buttonText);
  if (t.includes("Collector")) return "collector";
  if (t.includes("LGU")) return "lgu_officer";
  return "user";
}

function activateRoleButton(btn) {
  document.querySelectorAll(".role-btn").forEach(function (b) {
    b.classList.remove("active");
  });
  btn.classList.add("active");
}

window.BAGOAccess = {
  setCurrentRole,
  getStoredRole,
  normalizeRole,
  getDashboardHome,
  roleFromSelectorButtonText,
  activateRoleButton,
  normalizeMobile,
  saveRegisteredAccount,
  getRegisteredAccount,
  validateLoginAttempt
};

document.addEventListener("DOMContentLoaded", enforceAccessControl);
