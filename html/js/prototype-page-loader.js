window.BAGOPrototype = (function () {
  var lastComponent = "";
  var fallbackComponents = {};

  function h(tag, props) {
    var children = Array.prototype.slice.call(arguments, 2);
    return React.createElement.apply(React, [tag, props || {}].concat(children));
  }

  function ensureFallbacks() {
    if (fallbackComponents.LoginScreen) return;

    function box(children) {
      return h("div", {
        style: {
          width: "100%",
          maxWidth: 560,
          margin: "60px auto",
          background: "white",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          fontFamily: "Poppins,sans-serif"
        }
      }, children);
    }

    fallbackComponents.LoginScreen = function LoginScreenFallback() {
      return box(h("div", null,
        h("h1", { style: { marginTop: 0 } }, "BAGO.PH Login"),
        h("p", null, "Prototype asset not loaded. Fallback screen active."),
        h("div", { style: { marginTop: 12 } },
          h("label", null, "Mobile number"),
          h("input", { type: "tel", placeholder: "09171234567", style: { width: "100%", height: 42, marginTop: 6, marginBottom: 10 } }),
          h("label", null, "PIN"),
          h("input", { type: "password", placeholder: "1234", style: { width: "100%", height: 42, marginTop: 6 } })
        ),
        h("button", { style: { marginTop: 14, width: "100%", height: 44 } }, "Log in"),
        h("div", { style: { marginTop: 10 } }, "No account? ", h("a", { href: "#" }, "Register your household"))
      ));
    };

    fallbackComponents.RegisterScreen = function RegisterFallback() {
      return box(h("div", null,
        h("h1", { style: { marginTop: 0 } }, "Register Household"),
        h("input", { type: "text", placeholder: "Full name", style: { width: "100%", height: 42, marginBottom: 8 } }),
        h("input", { type: "tel", placeholder: "09171234567", style: { width: "100%", height: 42, marginBottom: 8 } }),
        h("input", { type: "password", placeholder: "Create PIN", style: { width: "100%", height: 42, marginBottom: 8 } }),
        h("input", { type: "password", placeholder: "Confirm PIN", style: { width: "100%", height: 42, marginBottom: 8 } }),
        h("button", { style: { marginTop: 6, width: "100%", height: 44 } }, "Continue to verification")
      ));
    };

    fallbackComponents.OTPScreen = function OtpFallback() {
      return box(h("div", null,
        h("h1", { style: { marginTop: 0 } }, "Verify your number"),
        h("p", null, "Enter OTP to continue"),
        h("button", { style: { width: "100%", height: 44 } }, "Verify & finish registration"),
        h("div", { style: { marginTop: 8 } }, h("a", { href: "#" }, "Go back"))
      ));
    };

    function rolePage(title) {
      return function RoleFallback() {
        return box(h("div", null,
          h("h1", { style: { marginTop: 0 } }, title),
          h("p", null, "Prototype component missing in static build. Fallback screen active."),
          h("p", null, "Auth/session flow still works.")
        ));
      };
    }

    fallbackComponents.ResidentHome = rolePage("Resident Dashboard");
    fallbackComponents.ResidentSchedule = rolePage("Resident Schedule");
    fallbackComponents.ResidentReport = rolePage("Resident Report");
    fallbackComponents.ResidentWallet = rolePage("Resident Wallet");
    fallbackComponents.ResidentMissions = rolePage("Resident Missions");
    fallbackComponents.ResidentRewards = rolePage("Resident Rewards");
    fallbackComponents.ResidentLeaderboard = rolePage("Resident Leaderboard");
    fallbackComponents.ResidentMyReports = rolePage("Resident Reports");
    fallbackComponents.ResidentReportDetail = rolePage("Resident Report Detail");
    fallbackComponents.ResidentReportSubmitted = rolePage("Report Submitted");
    fallbackComponents.CollectorHome = rolePage("Collector Dashboard");
    fallbackComponents.CollectorRoute = rolePage("Collector Route");
    fallbackComponents.CollectorScan = rolePage("Collector QR Scan");
    fallbackComponents.CollectorReports = rolePage("Collector Reports");
    fallbackComponents.CollectorReportUpdate = rolePage("Collector Report Update");
    fallbackComponents.AdminLogin = rolePage("LGU Admin Login");
    fallbackComponents.AdminDashboard = rolePage("LGU Admin Dashboard");
    fallbackComponents.AdminSchedule = rolePage("LGU Admin Schedule");
    fallbackComponents.AdminReports = rolePage("LGU Admin Reports");
    fallbackComponents.AdminDENRReport = rolePage("DENR Report");
  }

  function apiBase() {
    if (window.BAGOApi && typeof window.BAGOApi.base === "function") {
      return window.BAGOApi.base();
    }
    return String(window.__BAGO_API_BASE__ || "http://localhost:3000").replace(/\/$/, "");
  }

  function apiHasBase() {
    if (window.BAGOApi && typeof window.BAGOApi.hasBase === "function") {
      return window.BAGOApi.hasBase();
    }
    return !!apiBase();
  }

  function token() {
    return localStorage.getItem("bagoToken");
  }

  async function apiRequest(method, path, body) {
    if (window.BAGOApi && typeof window.BAGOApi.request === "function") {
      return window.BAGOApi.request(method, path, body);
    }
    var headers = { Accept: "application/json" };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    if (token()) headers.Authorization = "Bearer " + token();
    var res = await fetch(apiBase() + path, {
      method: method,
      headers: headers,
      body: body !== undefined ? JSON.stringify(body) : undefined
    });
    var text = await res.text();
    var data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (_e) {
      data = { error: text || "Invalid response" };
    }
    if (!res.ok) throw new Error((data && data.error) || "Request failed");
    return data;
  }

  function normalizeRole(role) {
    var r = String(role || "user").toLowerCase().replace(/\s+/g, "_");
    if (r === "lgu_admin") return "lgu_officer";
    if (r === "collector" || r === "lgu_officer") return r;
    return "user";
  }

  function setRole(role) {
    localStorage.setItem("bagoRole", normalizeRole(role));
  }

  function normalizeMobile(raw) {
    var d = String(raw || "").replace(/\D/g, "");
    if (d.indexOf("63") === 0 && d.length >= 12) d = "0" + d.slice(2);
    if (d.length > 11) d = d.slice(-11);
    return d;
  }

  function localAccounts() {
    try {
      return JSON.parse(localStorage.getItem("bago_ph_accounts_v1") || "{}");
    } catch (_e) {
      return {};
    }
  }

  function saveLocalAccount(mobile, pin, role) {
    var m = normalizeMobile(mobile);
    if (!m) return;
    var all = localAccounts();
    all[m] = { pin: String(pin || ""), role: normalizeRole(role || "user") };
    localStorage.setItem("bago_ph_accounts_v1", JSON.stringify(all));
  }

  function ensureDemoAccounts() {
    var all = localAccounts();
    var demos = [
      { mobile: "09171234567", pin: "1234", role: "user", name: "Resident Demo" },
      { mobile: "09171234568", pin: "1234", role: "collector", name: "Collector Demo" },
      { mobile: "09171234569", pin: "1234", role: "lgu_officer", name: "LGU Admin Demo" }
    ];
    var changed = false;
    demos.forEach(function (d) {
      var m = normalizeMobile(d.mobile);
      if (!all[m]) {
        all[m] = { pin: d.pin, role: d.role, name: d.name, demo: true };
        changed = true;
      }
    });
    if (changed) {
      localStorage.setItem("bago_ph_accounts_v1", JSON.stringify(all));
    }
    window.BAGODemoAccounts = demos;
  }

  function tryLocalLogin(mobile, pin) {
    var m = normalizeMobile(mobile);
    var p = String(pin || "");
    if (!m || !/^\d{4}$/.test(p)) {
      return { ok: false, message: "Enter valid mobile and 4-digit PIN." };
    }
    var row = localAccounts()[m];
    if (!row) {
      return { ok: false, message: "No local account for this mobile. Register first." };
    }
    if (String(row.pin) !== p) {
      return { ok: false, message: "Incorrect PIN." };
    }
    return { ok: true, role: normalizeRole(row.role || "user"), local: true };
  }

  function dashboardFor(role) {
    var r = normalizeRole(role);
    if (r === "collector") return "dashboard-collector.html";
    if (r === "lgu_officer") return "dashboard-lgu.html";
    return "dashboard-resident.html";
  }

  function currentPage() {
    var p = window.location.pathname.split("/").pop();
    return p || "index.html";
  }

  function enforceAccess() {
    var page = currentPage();
    var authPages = { "index.html": true, "register.html": true };
    if (authPages[page]) return;
    var role = normalizeRole(localStorage.getItem("bagoRole"));
    if (!localStorage.getItem("bagoRole")) {
      window.location.href = "index.html";
      return;
    }
    var allow = {
      user: [
        "dashboard-resident.html", "schedule.html", "report.html", "eco-points.html", "announcements.html",
        "resident-reports.html", "resident-report-detail.html", "resident-report-submitted.html",
        "resident-missions.html", "resident-rewards.html", "resident-leaderboard.html", "otp.html"
      ],
      collector: [
        "dashboard-collector.html", "collectors.html", "qr-audit.html", "announcements.html", "schedule.html", "report.html",
        "collector-route.html", "collector-reports.html", "collector-report-update.html", "otp.html"
      ],
      lgu_officer: [
        "dashboard-lgu.html", "dashboard.html", "compliance.html", "users.html", "denr-reports.html",
        "xml-schedules-editor.html", "xml-barangays-editor.html", "announcements.html", "collectors.html",
        "eco-points.html", "qr-audit.html", "admin-login.html", "admin-schedule.html", "admin-reports.html", "otp.html"
      ]
    };
    if ((allow[role] || []).indexOf(page) === -1) {
      window.location.href = dashboardFor(role);
    }
  }

  function activeLoginRole() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll("button"));
    var roleBtn = buttons.find(function (btn) {
      var t = btn.textContent.trim();
      if (!t || (t !== "Resident" && t !== "Collector" && t !== "LGU Admin")) return false;
      return getComputedStyle(btn).color.indexOf("46, 125, 50") !== -1;
    });
    var txt = roleBtn ? roleBtn.textContent.trim() : "Resident";
    if (txt === "Collector") return "collector";
    if (txt === "LGU Admin") return "lgu_officer";
    return "user";
  }

  function normalizeIssueType(label) {
    var map = {
      "Illegal dumping": "Illegal Dumping",
      "Missed collection": "Missed Pickup",
      "Overflowing bin": "Overflowing Bin",
      "Improper segregation": "Other",
      "Broken container": "Other"
    };
    return map[label] || "Other";
  }

  function byTextButton(textMatch) {
    var buttons = Array.prototype.slice.call(document.querySelectorAll("button"));
    return buttons.find(function (b) {
      return b.textContent && b.textContent.toLowerCase().indexOf(textMatch) !== -1;
    });
  }

  async function onLogin() {
    var mobileInput = document.querySelector('input[type="tel"],input[placeholder*="63"]');
    var pinInput = document.querySelector('input[type="password"]');
    var mobile = normalizeMobile(mobileInput ? mobileInput.value : "");
    var pin = String(pinInput ? pinInput.value : "").replace(/\D/g, "").slice(0, 4);
    if (!mobile || mobile.length < 10 || !/^\d{4}$/.test(pin)) {
      alert("Enter valid mobile number and 4-digit PIN.");
      return;
    }

    if (apiHasBase()) {
      try {
        var out = window.BAGOApi && window.BAGOApi.tryLogin
          ? await window.BAGOApi.tryLogin(mobile, pin)
          : null;
        if (!out) {
          var data = await apiRequest("POST", "/api/auth/login", { mobile: mobile, pin: pin });
          localStorage.setItem("bagoToken", data.token);
          out = { ok: true, role: data.role };
        }
        if (out.ok) {
          setRole(out.role);
          window.location.href = dashboardFor(out.role);
          return;
        }
        alert(out.message || "Login failed");
        var fallback = tryLocalLogin(mobile, pin);
        if (fallback.ok) {
          setRole(fallback.role);
          window.location.href = dashboardFor(fallback.role);
          return;
        }
        alert("API failed. Local fallback failed: " + (fallback.message || "login failed"));
        return;
      } catch (e) {
        var fallback2 = tryLocalLogin(mobile, pin);
        if (fallback2.ok) {
          setRole(fallback2.role);
          window.location.href = dashboardFor(fallback2.role);
          return;
        }
        alert("API failed. Local fallback failed: " + (fallback2.message || e.message || "Login failed"));
        return;
      }
    }
    var fallback3 = tryLocalLogin(mobile, pin);
    if (fallback3.ok) {
      setRole(fallback3.role);
      window.location.href = dashboardFor(fallback3.role);
      return;
    }
    alert("API unavailable. Local fallback failed: " + (fallback3.message || "login failed"));
  }

  async function onRegister() {
    var textInputs = Array.prototype.slice.call(document.querySelectorAll('input[type="text"]'));
    var fullName = String(textInputs.length ? textInputs[0].value : "").trim();
    var mobileInput = document.querySelector('input[type="tel"]');
    var passInputs = Array.prototype.slice.call(document.querySelectorAll('input[type="password"]'));
    var mobile = normalizeMobile(mobileInput ? mobileInput.value : "");
    var pin = String(passInputs.length ? passInputs[0].value : "").replace(/\D/g, "").slice(0, 4);
    var confirmPin = String(passInputs.length > 1 ? passInputs[1].value : "").replace(/\D/g, "").slice(0, 4);
    var role = "user";
    if (!fullName || fullName.length < 3) {
      alert("Enter full name.");
      return;
    }
    if (!mobile || mobile.length < 10) {
      alert("Enter valid mobile number.");
      return;
    }
    if (!/^\d{4}$/.test(pin)) {
      alert("PIN must be exactly 4 digits.");
      return;
    }
    if (confirmPin && pin !== confirmPin) {
      alert("PIN and confirm PIN do not match.");
      return;
    }

    if (apiHasBase()) {
      try {
        var out = window.BAGOApi && window.BAGOApi.tryRegister
          ? await window.BAGOApi.tryRegister(fullName, mobile, pin, role)
          : null;
        if (!out) {
          var data = await apiRequest("POST", "/api/auth/register", {
            full_name: fullName,
            mobile: mobile,
            pin: pin,
            role: role
          });
          localStorage.setItem("bagoToken", data.token);
          out = { ok: true, role: data.role };
        }
        if (out.ok) {
          setRole(out.role);
          window.location.href = dashboardFor(out.role);
          return;
        }
        saveLocalAccount(mobile, pin, role);
        setRole(role);
        window.location.href = "otp.html";
      } catch (e) {
        saveLocalAccount(mobile, pin, role);
        setRole(role);
        window.location.href = "otp.html";
      }
      return;
    }
    saveLocalAccount(mobile, pin, role);
    setRole(role);
    window.location.href = "otp.html";
  }

  async function onSubmitReport() {
    if (!token()) {
      alert("Login first before submitting report.");
      window.location.href = "index.html";
      return;
    }

    var selects = Array.prototype.slice.call(document.querySelectorAll("select"));
    var issueRaw = selects[0] ? selects[0].value : "Other";
    var brgyRaw = selects[1] ? selects[1].value : "";
    var description = (document.querySelector("textarea") || {}).value || "";
    var street = (Array.prototype.slice.call(document.querySelectorAll('input[type="text"]'))[0] || {}).value || "";

    try {
      var barangays = await apiRequest("GET", "/api/barangays");
      var b = barangays.find(function (row) {
        return String(row.barangay_name || "").toLowerCase() === String(brgyRaw || "").replace(/^Brgy\.\s*/i, "").toLowerCase();
      }) || barangays[0];
      if (!b) {
        alert("No barangays found in API.");
        return;
      }
      var created = await apiRequest("POST", "/api/reports", {
        issue_type: normalizeIssueType(issueRaw),
        description: description,
        street_address: street || "Not specified",
        barangay_id: b.barangay_id
      });
      alert("Report submitted: " + created.reference_number);
      window.location.href = "dashboard-resident.html";
    } catch (e) {
      alert(e.message || "Failed to submit report");
    }
  }

  async function resolveRefToReportId(referenceNumber) {
    var reports = await apiRequest("GET", "/api/reports");
    var row = reports.find(function (r) { return r.reference_number === referenceNumber; });
    return row ? row.report_id : null;
  }

  async function onCollectorUpdate() {
    try {
      var refEl = Array.prototype.slice.call(document.querySelectorAll("div")).find(function (el) {
        return /^RPT-\d{4}-\d+$/i.test(String(el.textContent || "").trim());
      });
      var ref = refEl ? refEl.textContent.trim() : "";
      if (!ref) {
        alert("Report reference not found on screen.");
        return;
      }
      var id = await resolveRefToReportId(ref);
      if (!id) {
        alert("Report not found in API: " + ref);
        return;
      }
      await apiRequest("PATCH", "/api/reports/" + id, { status: "In Progress" });
      alert("Report updated to In Progress.");
    } catch (e) {
      alert(e.message || "Failed to update report");
    }
  }

  async function onAdminSaveReport() {
    try {
      var mono = Array.prototype.slice.call(document.querySelectorAll("div")).find(function (el) {
        return /^RPT-\d{4}-\d+$/i.test(String(el.textContent || "").trim());
      });
      var ref = mono ? mono.textContent.trim() : "";
      if (!ref) return alert("No report reference found.");
      var id = await resolveRefToReportId(ref);
      if (!id) return alert("Report not found: " + ref);
      await apiRequest("PATCH", "/api/reports/" + id, { status: "Acknowledged" });
      alert("Report saved.");
    } catch (e) {
      alert(e.message || "Failed to save report");
    }
  }

  async function onAddSchedule() {
    try {
      var barangays = await apiRequest("GET", "/api/barangays");
      if (!barangays.length) return alert("No barangays found.");
      var b = barangays[0];
      var d = new Date();
      d.setDate(d.getDate() + 1);
      var day = d.toISOString().slice(0, 10);
      await apiRequest("POST", "/api/schedules", {
        barangay_id: b.barangay_id,
        waste_type: "Biodegradable",
        collection_date: day,
        time_start: "07:00",
        time_end: "09:00",
        status: "Scheduled"
      });
      alert("Schedule created for " + b.barangay_name + " (" + day + ").");
    } catch (e) {
      alert(e.message || "Failed to create schedule");
    }
  }

  function bindPhase2Handlers() {
    document.addEventListener("click", async function (event) {
      var btn = event.target.closest("button");
      if (!btn) return;
      var txt = String(btn.textContent || "").trim().toLowerCase();
      if (!txt) return;

      if (lastComponent === "LoginScreen" && txt.indexOf("log in") !== -1) {
        event.preventDefault();
        onLogin();
      }
      if (lastComponent === "RegisterScreen" && txt.indexOf("continue to verification") !== -1) {
        event.preventDefault();
        onRegister();
      }
      if (lastComponent === "OTPScreen" && txt.indexOf("verify and continue") !== -1) {
        event.preventDefault();
        window.location.href = dashboardFor(localStorage.getItem("bagoRole") || "user");
      }
      if (lastComponent === "OTPScreen" && txt.indexOf("verify & finish registration") !== -1) {
        event.preventDefault();
        window.location.href = dashboardFor(localStorage.getItem("bagoRole") || "user");
      }
      if (lastComponent === "OTPScreen" && txt.indexOf("go back") !== -1) {
        event.preventDefault();
        window.location.href = "register.html";
      }
      if (lastComponent === "ResidentReport" && txt.indexOf("submit report") !== -1) {
        event.preventDefault();
        onSubmitReport();
      }
      if (lastComponent === "AdminLogin" && txt.indexOf("log in to console") !== -1) {
        event.preventDefault();
        var adminRole = "lgu_officer";
        setRole(adminRole);
        window.location.href = dashboardFor(adminRole);
      }
      if (lastComponent === "CollectorReportUpdate" && txt.indexOf("update report status") !== -1) {
        event.preventDefault();
        onCollectorUpdate();
      }
      if (lastComponent === "AdminReports" && txt.indexOf("save changes") !== -1) {
        event.preventDefault();
        onAdminSaveReport();
      }
      if (lastComponent === "AdminSchedule" && txt.indexOf("add new schedule") !== -1) {
        event.preventDefault();
        onAddSchedule();
      }
      if (txt.indexOf("logout") !== -1) {
        event.preventDefault();
        localStorage.removeItem("bagoRole");
        localStorage.removeItem("bagoToken");
        window.location.href = "index.html";
      }
    });

    document.addEventListener("click", function (event) {
      if (!lastComponent || lastComponent.indexOf("Admin") !== 0) return;
      var node = event.target.closest("div,span,a,button");
      if (!node) return;
      var text = String(node.textContent || "").trim();
      if (!text) return;

      if (text === "Dashboard") {
        window.location.href = "dashboard-lgu.html";
        return;
      }
      if (text === "Schedule") {
        window.location.href = "admin-schedule.html";
        return;
      }
      if (text === "Reports") {
        window.location.href = "admin-reports.html";
        return;
      }
      if (text === "DENR Report") {
        window.location.href = "denr-reports.html";
        return;
      }
      if (text === "Log in to console") {
        window.location.href = "dashboard-lgu.html";
      }
      if (text.indexOf("Register now") !== -1 || text.indexOf("Create an account") !== -1) {
        window.location.href = "register.html";
        return;
      }
      if (text.indexOf("Register your household") !== -1) {
        window.location.href = "register.html";
        return;
      }
      if (text.indexOf("Forgot PIN?") !== -1) {
        alert(
          "Demo accounts:\n" +
          "Resident: 09171234567 / 1234\n" +
          "Collector: 09171234568 / 1234\n" +
          "LGU Admin: 09171234569 / 1234"
        );
        return;
      }
    });
  }

  bindPhase2Handlers();
  ensureDemoAccounts();
  enforceAccess();

  function render(componentName, tries) {
    ensureFallbacks();
    var mount = document.getElementById("app");
    if (!mount) {
      return;
    }
    var component = window[componentName];
    if (!component) {
      var left = typeof tries === "number" ? tries : 40;
      if (left > 0) {
        setTimeout(function () { render(componentName, left - 1); }, 100);
        return;
      }
      component = fallbackComponents[componentName];
      if (!component) {
        mount.innerHTML = "<p style='color:#b00020;font-family:sans-serif'>Prototype component not found: " + componentName + "</p>";
        return;
      }
    }
    lastComponent = componentName;
    ReactDOM.createRoot(mount).render(React.createElement(component));
  }

  return { render: render };
})();
