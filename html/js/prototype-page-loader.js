window.BAGOPrototype = (function () {
  var lastComponent = "";
  var fallbackComponents = {};

  function h(tag, props) {
    var children = Array.prototype.slice.call(arguments, 2);
    return React.createElement.apply(React, [tag, props || {}].concat(children));
  }

  function ensureGlobalPoppins() {
    if (!document.querySelector('link[data-bago-poppins="preconnect"]')) {
      var preconnect1 = document.createElement("link");
      preconnect1.rel = "preconnect";
      preconnect1.href = "https://fonts.googleapis.com";
      preconnect1.setAttribute("data-bago-poppins", "preconnect");
      document.head.appendChild(preconnect1);
    }
    if (!document.querySelector('link[data-bago-poppins="preconnect-gstatic"]')) {
      var preconnect2 = document.createElement("link");
      preconnect2.rel = "preconnect";
      preconnect2.href = "https://fonts.gstatic.com";
      preconnect2.crossOrigin = "anonymous";
      preconnect2.setAttribute("data-bago-poppins", "preconnect-gstatic");
      document.head.appendChild(preconnect2);
    }
    if (!document.querySelector('link[data-bago-poppins="stylesheet"]')) {
      var fontLink = document.createElement("link");
      fontLink.rel = "stylesheet";
      fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap";
      fontLink.setAttribute("data-bago-poppins", "stylesheet");
      document.head.appendChild(fontLink);
    }
    if (!document.getElementById("bago-global-font-style")) {
      var style = document.createElement("style");
      style.id = "bago-global-font-style";
      style.textContent = "html, body, button, input, select, textarea { font-family: 'Poppins', sans-serif; }";
      document.head.appendChild(style);
    }
  }

  /** Lightweight overlay dialogs (no React dependency). */
  function modalAlert(message, title) {
    title = title || "BAGO.PH";
    return new Promise(function (resolve) {
      var backdrop = document.createElement("div");
      backdrop.setAttribute("role", "dialog");
      backdrop.setAttribute("aria-modal", "true");
      backdrop.style.cssText =
        "position:fixed;inset:0;z-index:999999;background:rgba(13,27,42,0.55);display:flex;align-items:center;justify-content:center;padding:20px;font-family:Poppins,system-ui,sans-serif;";
      var box = document.createElement("div");
      box.style.cssText =
        "background:#fff;border-radius:12px;max-width:420px;width:100%;box-shadow:0 24px 64px rgba(0,0,0,0.25);overflow:hidden;";
      var head = document.createElement("div");
      head.style.cssText = "padding:14px 18px;border-bottom:1px solid #eee;font-size:16px;font-weight:700;color:#0D1B2A;";
      head.textContent = title;
      var body = document.createElement("div");
      body.style.cssText = "padding:18px;font-size:14px;color:#424242;line-height:1.55;white-space:pre-wrap;";
      body.textContent = message;
      var foot = document.createElement("div");
      foot.style.cssText = "padding:12px 18px;border-top:1px solid #eee;text-align:right;background:#fafafa;";
      var ok = document.createElement("button");
      ok.type = "button";
      ok.textContent = "OK";
      ok.style.cssText =
        "height:40px;padding:0 20px;border:none;border-radius:8px;background:#2E7D32;color:#fff;font-weight:700;font-family:Poppins;cursor:pointer;";
      function cleanup() {
        if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
        document.removeEventListener("keydown", onKey);
        resolve(true);
      }
      function onKey(ev) {
        if (ev.key === "Escape") cleanup();
      }
      ok.onclick = cleanup;
      backdrop.onclick = function (e) {
        if (e.target === backdrop) cleanup();
      };
      foot.appendChild(ok);
      box.appendChild(head);
      box.appendChild(body);
      box.appendChild(foot);
      backdrop.appendChild(box);
      document.body.appendChild(backdrop);
      document.addEventListener("keydown", onKey);
      ok.focus();
    });
  }

  function modalConfirm(message, title) {
    title = title || "Confirm";
    return new Promise(function (resolve) {
      var backdrop = document.createElement("div");
      backdrop.setAttribute("role", "dialog");
      backdrop.setAttribute("aria-modal", "true");
      backdrop.style.cssText =
        "position:fixed;inset:0;z-index:999999;background:rgba(13,27,42,0.55);display:flex;align-items:center;justify-content:center;padding:20px;font-family:Poppins,system-ui,sans-serif;";
      var box = document.createElement("div");
      box.style.cssText =
        "background:#fff;border-radius:12px;max-width:420px;width:100%;box-shadow:0 24px 64px rgba(0,0,0,0.25);overflow:hidden;";
      var head = document.createElement("div");
      head.style.cssText = "padding:14px 18px;border-bottom:1px solid #eee;font-size:16px;font-weight:700;color:#0D1B2A;";
      head.textContent = title;
      var body = document.createElement("div");
      body.style.cssText = "padding:18px;font-size:14px;color:#424242;line-height:1.55;";
      body.textContent = message;
      var foot = document.createElement("div");
      foot.style.cssText =
        "padding:12px 18px;border-top:1px solid #eee;text-align:right;background:#fafafa;display:flex;gap:10px;justify-content:flex-end;";
      var cancel = document.createElement("button");
      cancel.type = "button";
      cancel.textContent = "Cancel";
      cancel.style.cssText =
        "height:40px;padding:0 16px;border:1px solid #bdbdbd;border-radius:8px;background:#fff;font-family:Poppins;font-weight:600;cursor:pointer;";
      var confirm = document.createElement("button");
      confirm.type = "button";
      confirm.textContent = "Sign out";
      confirm.style.cssText =
        "height:40px;padding:0 18px;border:none;border-radius:8px;background:#C62828;color:#fff;font-weight:700;font-family:Poppins;cursor:pointer;";
      function cleanup(val) {
        if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
        document.removeEventListener("keydown", onKey);
        resolve(!!val);
      }
      function onKey(ev) {
        if (ev.key === "Escape") cleanup(false);
      }
      cancel.onclick = function () {
        cleanup(false);
      };
      confirm.onclick = function () {
        cleanup(true);
      };
      backdrop.onclick = function (e) {
        if (e.target === backdrop) cleanup(false);
      };
      foot.appendChild(cancel);
      foot.appendChild(confirm);
      box.appendChild(head);
      box.appendChild(body);
      box.appendChild(foot);
      backdrop.appendChild(box);
      document.body.appendChild(backdrop);
      document.addEventListener("keydown", onKey);
      cancel.focus();
    });
  }

  function copyText(value) {
    var text = String(value || "");
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "readonly");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (ok) resolve();
        else reject(new Error("Copy failed"));
      } catch (err) {
        reject(err);
      }
    });
  }

  function showDemoCredentialsModal() {
    var creds = [
      { role: "Resident", value: "09171234567 / 1234", copy: "09171234567\t1234" },
      { role: "Collector", value: "09171234568 / 1234", copy: "09171234568\t1234" },
      { role: "LGU Admin", value: "m.santos@lipacity.gov.ph / LipaDemo2026!", copy: "m.santos@lipacity.gov.ph\tLipaDemo2026!" }
    ];
    var backdrop = document.createElement("div");
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.style.cssText =
      "position:fixed;inset:0;z-index:999999;background:rgba(13,27,42,0.55);display:flex;align-items:center;justify-content:center;padding:20px;font-family:Poppins,system-ui,sans-serif;";
    var box = document.createElement("div");
    box.style.cssText =
      "background:#fff;border-radius:12px;max-width:560px;width:100%;box-shadow:0 24px 64px rgba(0,0,0,0.25);overflow:hidden;";
    var head = document.createElement("div");
    head.style.cssText = "padding:14px 18px;border-bottom:1px solid #eee;font-size:16px;font-weight:700;color:#0D1B2A;";
    head.textContent = "Demo credentials";
    var body = document.createElement("div");
    body.style.cssText = "padding:14px 18px;display:flex;flex-direction:column;gap:10px;";
    creds.forEach(function (entry) {
      var row = document.createElement("div");
      row.style.cssText = "display:flex;align-items:center;gap:10px;flex-wrap:wrap;border:1px solid #E0E0E0;border-radius:8px;padding:10px;";
      var meta = document.createElement("div");
      meta.style.cssText = "flex:1;min-width:210px;";
      var role = document.createElement("div");
      role.style.cssText = "font-size:12px;font-weight:700;color:#0D1B2A;";
      role.textContent = entry.role;
      var value = document.createElement("div");
      value.style.cssText = "font-size:12px;color:#616161;margin-top:2px;font-family:ui-monospace,Menlo,Consolas,monospace;";
      value.textContent = entry.value;
      var copy = document.createElement("button");
      copy.type = "button";
      copy.textContent = "Copy";
      copy.style.cssText =
        "height:34px;padding:0 12px;border:1px solid #2E7D32;border-radius:7px;background:#E8F5E9;color:#1B5E20;font-weight:700;font-family:Poppins;cursor:pointer;";
      copy.onclick = function () {
        copyText(entry.copy).then(function () {
          var old = copy.textContent;
          copy.textContent = "Copied";
          setTimeout(function () { copy.textContent = old; }, 1000);
        }).catch(function () {
          copy.textContent = "Failed";
          setTimeout(function () { copy.textContent = "Copy"; }, 1000);
        });
      };
      meta.appendChild(role);
      meta.appendChild(value);
      row.appendChild(meta);
      row.appendChild(copy);
      body.appendChild(row);
    });
    var foot = document.createElement("div");
    foot.style.cssText = "padding:12px 18px;border-top:1px solid #eee;text-align:right;background:#fafafa;";
    var close = document.createElement("button");
    close.type = "button";
    close.textContent = "Close";
    close.style.cssText =
      "height:38px;padding:0 16px;border:none;border-radius:8px;background:#2E7D32;color:#fff;font-weight:700;font-family:Poppins;cursor:pointer;";
    function cleanup() {
      if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
      document.removeEventListener("keydown", onKey);
    }
    function onKey(ev) {
      if (ev.key === "Escape") cleanup();
    }
    close.onclick = cleanup;
    backdrop.onclick = function (e) {
      if (e.target === backdrop) cleanup();
    };
    foot.appendChild(close);
    box.appendChild(head);
    box.appendChild(body);
    box.appendChild(foot);
    backdrop.appendChild(box);
    document.body.appendChild(backdrop);
    document.addEventListener("keydown", onKey);
    close.focus();
  }

  function applyWebRegister(opts) {
    opts = opts || {};
    var role = normalizeRole(opts.role || "user");
    var mobile = normalizeMobile(opts.mobile || "");
    var pin = String(opts.pin || "").replace(/\D/g, "").slice(0, 4);
    if (!mobile || mobile.length < 10) {
      alert("Enter a valid Philippine mobile number (10 digits after +63).");
      return;
    }
    if (!/^\d{4}$/.test(pin)) {
      alert("PIN must be exactly 4 digits.");
      return;
    }
    if (role === "collector") {
      var inv = String(opts.inviteCode || "").replace(/\D/g, "");
      if (inv !== "207142") {
        alert("Invalid or expired supervisor invite code. Prototype accepts code 207142.");
        return;
      }
    }
    saveLocalAccount(mobile, pin, role);
    setRole(role);
    issueOtpForLocal(mobile);
    go("auth-web-otp");
  }

  function submitLGUAdminApplication(payload) {
    var name = payload && payload.fullName ? String(payload.fullName) : "—";
    var em = payload && payload.email ? String(payload.email) : "—";
    var msg =
      "Recorded (prototype only):\n" +
      name +
      "\n" +
      em +
      "\n\nNo LGU account is created until NSWMC approval. Use the demo LGU sign-in on the login page to explore the admin console.";
    modalAlert(msg, "Application submitted").then(function () {
      go("auth-web-login");
    });
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
    fallbackComponents.CollectorScan = rolePage("Collector QR Scan (Mobile)");
    fallbackComponents.CollectorReports = rolePage("Collector Reports");
    fallbackComponents.CollectorReportUpdate = rolePage("Collector Report Update");
    fallbackComponents.AdminLogin = rolePage("LGU Admin Login");
    fallbackComponents.AdminDashboard = rolePage("LGU Admin Dashboard");
    fallbackComponents.AdminSchedule = rolePage("LGU Admin Schedule");
    fallbackComponents.AdminReports = rolePage("LGU Admin Reports");
    fallbackComponents.AdminDENRReport = rolePage("DENR Report");
    fallbackComponents.AdminResidents = rolePage("Residents registry");
    fallbackComponents.AdminCollectors = rolePage("Collectors & fleet");
    fallbackComponents.AdminAnnouncements = rolePage("Announcements composer");
    fallbackComponents.AdminSettings = rolePage("LGU settings");

    // Web screens fallbacks
    fallbackComponents.AuthWebLogin = rolePage("Web Login");
    fallbackComponents.AuthWebRegister = rolePage("Web Register");
    fallbackComponents.AuthWebOTP = rolePage("Web OTP");
    fallbackComponents.ResidentWebHome = rolePage("Resident Web Home");
    fallbackComponents.ResidentWebSchedule = rolePage("Resident Web Schedule");
    fallbackComponents.ResidentWebReport = rolePage("Resident Web Report");
    fallbackComponents.ResidentWebMyReports = rolePage("Resident Web My Reports");
    fallbackComponents.ResidentWebWallet = rolePage("Resident Web Wallet");
    fallbackComponents.ResidentWebMissions = rolePage("Resident Web Missions");
    fallbackComponents.ResidentWebRewards = rolePage("Resident Web Rewards");
    fallbackComponents.ResidentWebLeaderboard = rolePage("Resident Web Leaderboard");
    fallbackComponents.ResidentWebProfile = rolePage("Resident Web Profile");
    fallbackComponents.ResidentHouseholdQRCard = rolePage("Household QR Card");
    fallbackComponents.CollectorWebRoute = rolePage("Collector Web Route");
    fallbackComponents.CollectorWebScan = rolePage("Collector Web QR Scan");
    fallbackComponents.CollectorWebReports = rolePage("Collector Web Reports");
    fallbackComponents.CollectorWebSchedule = rolePage("Collector Web Schedule");
    fallbackComponents.CollectorWebAnalytics = rolePage("Collector Web Analytics");
    fallbackComponents.CollectorWebProfile = rolePage("Collector Web Profile");
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
    if (d.length === 10 && d.indexOf("9") === 0) d = "0" + d;
    if (d.length > 11) d = d.slice(-11);
    return d;
  }

  function issueOtpForLocal(mobile) {
    var m = normalizeMobile(mobile);
    var otp = String(Math.floor(100000 + Math.random() * 900000));
    localStorage.setItem("bagoPendingMobile", m);
    localStorage.setItem("bagoPendingOtp", otp);
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      console.log("[BAGO.PH][OTP] mobile=" + m + " otp=" + otp);
      console.warn("[BAGO.PH][OTP] Use this code for localhost OTP verification: " + otp);
    }
    return otp;
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

  var DEMO_LGU_EMAIL = "m.santos@lipacity.gov.ph";
  var DEMO_LGU_PASSWORD = "LipaDemo2026!";

  function ensureDemoAccounts() {
    var all = localAccounts();
    var oldLgu = normalizeMobile("09171234569");
    if (all[oldLgu]) {
      delete all[oldLgu];
      localStorage.setItem("bago_ph_accounts_v1", JSON.stringify(all));
    }
    var demos = [
      { mobile: "09171234567", pin: "1234", role: "user", name: "Resident Demo" },
      { mobile: "09171234568", pin: "1234", role: "collector", name: "Collector Demo" }
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
    window.BAGODemoAccounts = {
      resident: demos[0],
      collector: demos[1],
      lgu_officer: { email: DEMO_LGU_EMAIL, password: DEMO_LGU_PASSWORD, note: "prototype / seed; not production" }
    };
  }

  function tryLocalLguLogin(email, password) {
    var e = String(email || "").trim().toLowerCase();
    var p = String(password || "");
    if (e !== DEMO_LGU_EMAIL || p !== DEMO_LGU_PASSWORD) {
      return { ok: false, message: "Unknown government email or wrong password." };
    }
    return { ok: true, role: "lgu_officer", local: true };
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
    if (r === "collector") return "dashboard-collector";
    if (r === "lgu_officer") return "dashboard-lgu";
    return "dashboard-resident";
  }

  function pagePath(page) {
    var p = String(page || "index").replace(/^\.\//, "");
    if (!/\.html$/i.test(p)) p += ".html";
    return "./" + p;
  }

  function go(page) {
    window.location.href = pagePath(page);
  }

  function currentPage() {
    var p = window.location.pathname.split("/").pop() || "index";
    if (!/\.html$/i.test(p)) p += ".html";
    return p.toLowerCase();
  }

  function enforceAccess() {
    var page = currentPage();
    var authPages = {
      "index.html": true,
      "register.html": true,
      "otp.html": true,
      "auth-web-login.html": true,
      "auth-web-register.html": true,
      "auth-web-register-collector.html": true,
      "auth-web-register-lgu.html": true,
      "auth-web-otp.html": true
    };
    if (authPages[page]) return;
    var role = normalizeRole(localStorage.getItem("bagoRole"));
    if (!localStorage.getItem("bagoRole")) {
      go("index");
      return;
    }
    var allow = {
      user: [
        "dashboard-resident.html", "schedule.html", "report.html", "eco-points.html", "announcements.html",
        "resident-reports.html", "resident-report-detail.html", "resident-report-submitted.html",
        "resident-missions.html", "resident-rewards.html", "resident-leaderboard.html",
        "resident-web-home.html", "resident-web-schedule.html", "resident-web-report.html",
        "resident-web-myreports.html", "resident-web-wallet.html", "resident-web-missions.html",
        "resident-web-rewards.html", "resident-web-leaderboard.html", "resident-web-profile.html",
        "resident-web-qrcard.html"
      ],
      collector: [
        "dashboard-collector.html", "collectors.html", "qr-audit.html", "announcements.html", "schedule.html", "report.html",
        "collector-route.html", "collector-reports.html", "collector-report-update.html", "collector-scan.html",
        "collector-web-route.html", "collector-web-scan.html", "collector-web-reports.html",
        "collector-web-schedule.html", "collector-web-analytics.html", "collector-web-profile.html"
      ],
      lgu_officer: [
        "dashboard-lgu.html", "dashboard.html", "compliance.html", "users.html", "denr-reports.html",
        "xml-schedules-editor.html", "xml-barangays-editor.html", "announcements.html", "collectors.html",
        "eco-points.html", "qr-audit.html", "admin-login.html", "admin-schedule.html", "admin-reports.html",
        "admin-residents.html", "admin-collectors-fleet.html", "admin-announcements.html", "admin-settings.html"
      ]
    };
    if ((allow[role] || []).indexOf(page) === -1) {
      go(dashboardFor(role));
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
    var emailEl = document.querySelector("input[type=\"email\"]");
    var email = emailEl ? String(emailEl.value || "").trim().toLowerCase() : "";
    var useLgu = email.indexOf("@") !== -1;

    if (useLgu) {
      var passList = document.querySelectorAll("input[type=\"password\"]");
      var password = passList.length ? String(passList[0].value || "") : "";
      if (!email || password.length < 10) {
        alert("Enter government email and password (min 10 characters).");
        return;
      }
      if (apiHasBase()) {
        try {
          var outLgu = window.BAGOApi && window.BAGOApi.tryLogin
            ? await window.BAGOApi.tryLogin(null, null, email, password)
            : null;
          if (!outLgu) {
            var dataLgu = await apiRequest("POST", "/api/auth/login", { email: email, password: password });
            localStorage.setItem("bagoToken", dataLgu.token);
            outLgu = { ok: true, role: dataLgu.role };
          }
          if (outLgu.ok) {
            setRole(outLgu.role);
            go(dashboardFor(outLgu.role));
            return;
          }
          alert(outLgu.message || "Login failed");
          var fbLgu = tryLocalLguLogin(email, password);
          if (fbLgu.ok) {
            setRole(fbLgu.role);
            go(dashboardFor(fbLgu.role));
            return;
          }
          alert("API failed. Local fallback: " + (fbLgu.message || "login failed"));
          return;
        } catch (eLgu) {
          var fbLgu2 = tryLocalLguLogin(email, password);
          if (fbLgu2.ok) {
            setRole(fbLgu2.role);
            go(dashboardFor(fbLgu2.role));
            return;
          }
          alert("API failed. Local fallback: " + (fbLgu2.message || eLgu.message || "Login failed"));
          return;
        }
      }
      var fbLgu3 = tryLocalLguLogin(email, password);
      if (fbLgu3.ok) {
        setRole(fbLgu3.role);
        go(dashboardFor(fbLgu3.role));
        return;
      }
      alert("API unavailable. " + (fbLgu3.message || "Login failed"));
      return;
    }

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
          issueOtpForLocal(mobile);
          go("otp");
          return;
        }
        alert(out.message || "Login failed");
        var fallback = tryLocalLogin(mobile, pin);
        if (fallback.ok) {
          setRole(fallback.role);
          issueOtpForLocal(mobile);
          go(dashboardFor(fallback.role));
          return;
        }
        alert("API failed. Local fallback failed: " + (fallback.message || "login failed"));
        return;
      } catch (e) {
        var fallback2 = tryLocalLogin(mobile, pin);
        if (fallback2.ok) {
          setRole(fallback2.role);
          issueOtpForLocal(mobile);
          go(dashboardFor(fallback2.role));
          return;
        }
        alert("API failed. Local fallback failed: " + (fallback2.message || e.message || "Login failed"));
        return;
      }
    }
    var fallback3 = tryLocalLogin(mobile, pin);
    if (fallback3.ok) {
      setRole(fallback3.role);
      issueOtpForLocal(mobile);
      go(dashboardFor(fallback3.role));
      return;
    }
    alert("API unavailable. Local fallback failed: " + (fallback3.message || "login failed"));
  }

  async function onRegister() {
    var textInputs = Array.prototype.slice.call(document.querySelectorAll('input[type="text"]'));
    var fullName = String(textInputs.length ? textInputs[0].value : "").trim();
    var streetAddress = String(textInputs.length > 1 ? textInputs[1].value : "").trim();
    var selects = Array.prototype.slice.call(document.querySelectorAll("select"));
    var city = String(selects[0] ? selects[0].value : "").trim();
    var barangay = String(selects[1] ? selects[1].value : "").trim();
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
    if (!city) {
      alert("Select a city.");
      return;
    }
    if (!barangay) {
      alert("Select a barangay.");
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
            role: role,
            city: city,
            barangay: barangay,
            street_address: streetAddress
          });
          localStorage.setItem("bagoToken", data.token);
          out = { ok: true, role: data.role };
        }
        if (out.ok) {
          saveLocalAccount(mobile, pin, out.role || role);
          setRole(out.role);
          issueOtpForLocal(mobile);
          go("otp");
          return;
        }
        saveLocalAccount(mobile, pin, role);
        setRole(role);
        issueOtpForLocal(mobile);
        go("otp");
      } catch (e) {
        saveLocalAccount(mobile, pin, role);
        setRole(role);
        issueOtpForLocal(mobile);
        go("otp");
      }
      return;
    }
    saveLocalAccount(mobile, pin, role);
    setRole(role);
    issueOtpForLocal(mobile);
    go("otp");
  }

  async function onSubmitReport() {
    if (!token()) {
      alert("Login first before submitting report.");
      go("index");
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
      go("dashboard-resident");
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

      if ((lastComponent === "LoginScreen" || lastComponent === "AuthWebLogin") && txt.indexOf("log in") !== -1) {
        event.preventDefault();
        onLogin();
      }
      if (lastComponent === "RegisterScreen" && txt.indexOf("continue to verification") !== -1) {
        event.preventDefault();
        onRegister();
      }
      if (lastComponent === "OTPScreen" && txt.indexOf("verify and continue") !== -1) {
        event.preventDefault();
        var expected1 = String(localStorage.getItem("bagoPendingOtp") || "");
        var got1 = Array.prototype.slice.call(document.querySelectorAll("[data-otp-digit]"))
          .map(function (el) { return String(el.value || "").replace(/\D/g, "").slice(0, 1); })
          .join("");
        if (expected1 && got1 !== expected1) {
          alert("Invalid OTP. Check browser console for local test OTP.");
          return;
        }
        localStorage.removeItem("bagoPendingOtp");
        go(dashboardFor(localStorage.getItem("bagoRole") || "user"));
      }
      if (lastComponent === "OTPScreen" && txt.indexOf("verify & finish registration") !== -1) {
        event.preventDefault();
        var expected2 = String(localStorage.getItem("bagoPendingOtp") || "");
        var got2 = Array.prototype.slice.call(document.querySelectorAll("[data-otp-digit]"))
          .map(function (el) { return String(el.value || "").replace(/\D/g, "").slice(0, 1); })
          .join("");
        if (expected2 && got2 !== expected2) {
          alert("Invalid OTP. Check browser console for local test OTP.");
          return;
        }
        localStorage.removeItem("bagoPendingOtp");
        go(dashboardFor(localStorage.getItem("bagoRole") || "user"));
      }
      if (lastComponent === "AuthWebOTP" && txt.indexOf("verify & finish registration") !== -1) {
        event.preventDefault();
        var expected3 = String(localStorage.getItem("bagoPendingOtp") || "");
        var got3 = Array.prototype.slice.call(document.querySelectorAll("[data-otp-digit]"))
          .map(function (el) { return String(el.value || "").replace(/\D/g, "").slice(0, 1); })
          .join("");
        if (expected3 && got3 !== expected3) {
          alert("Invalid OTP. Check browser console for local test OTP.");
          return;
        }
        localStorage.removeItem("bagoPendingOtp");
        go(dashboardFor(localStorage.getItem("bagoRole") || "user"));
      }
      if (lastComponent === "OTPScreen" && txt.indexOf("go back") !== -1) {
        event.preventDefault();
        go("register");
      }
      if (lastComponent === "ResidentReport" && txt.indexOf("submit report") !== -1) {
        event.preventDefault();
        onSubmitReport();
      }
      if (lastComponent === "AdminLogin" && txt.indexOf("log in to console") !== -1) {
        event.preventDefault();
        var adminRole = "lgu_officer";
        setRole(adminRole);
        go(dashboardFor(adminRole));
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
        modalConfirm("You will return to the login screen. Session and token on this device will be cleared.", "Sign out?").then(function (ok) {
          if (!ok) return;
          localStorage.removeItem("bagoRole");
          localStorage.removeItem("bagoToken");
          go("index");
        });
      }
    });

    document.addEventListener("click", function (event) {
      var demoBtn = event.target.closest("[data-bago-demo-creds]");
      if (demoBtn) {
        event.preventDefault();
        showDemoCredentialsModal();
        return;
      }
      var node = event.target.closest("div,span,a,button");
      if (!node) return;
      var text = String(node.textContent || "").trim();
      if (!text) return;
      var textLc = text.toLowerCase();

      if (lastComponent && lastComponent.indexOf("Admin") === 0 && text === "Dashboard") {
        go("dashboard-lgu");
        return;
      }
      if (lastComponent && lastComponent.indexOf("Admin") === 0 && text === "Schedule") {
        go("admin-schedule");
        return;
      }
      if (lastComponent && lastComponent.indexOf("Admin") === 0 && text === "Reports") {
        go("admin-reports");
        return;
      }
      if (lastComponent && lastComponent.indexOf("Admin") === 0 && text === "DENR Report") {
        go("denr-reports");
        return;
      }
      if (lastComponent && lastComponent.indexOf("Admin") === 0 && text === "Log in to console") {
        go("dashboard-lgu");
      }
      if (textLc.indexOf("register now") !== -1 || textLc.indexOf("create an account") !== -1) {
        event.preventDefault();
        go("register");
        return;
      }
      if (textLc.indexOf("register your household") !== -1) {
        event.preventDefault();
        go("register");
        return;
      }
      if (textLc.indexOf("forgot pin") !== -1 || textLc.indexOf("forgot password") !== -1) return;
    });
  }

  ensureGlobalPoppins();
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

  return {
    render: render,
    applyWebRegister: applyWebRegister,
    submitLGUAdminApplication: submitLGUAdminApplication,
    modalAlert: modalAlert,
    modalConfirm: modalConfirm
  };
})();
