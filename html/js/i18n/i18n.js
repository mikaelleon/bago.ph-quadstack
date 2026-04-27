(function () {
  var STORAGE_KEY = "bagoLocale";
  var allowed = { en: true, tl: true };
  var currentLocale = "en";
  var toggleNodes = [];
  var liveRegion = null;

  window.BAGO = window.BAGO || {};

  function normalizeLocale(locale) {
    var val = String(locale || "").trim().toLowerCase();
    if (val === "fil") return "tl";
    return allowed[val] ? val : "en";
  }

  function readStoredLocale() {
    try {
      return normalizeLocale(localStorage.getItem(STORAGE_KEY) || "");
    } catch (_e) {
      return "en";
    }
  }

  function writeStoredLocale(locale) {
    try {
      localStorage.setItem(STORAGE_KEY, normalizeLocale(locale));
    } catch (_e) {}
  }

  function detectInitialLocale() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && allowed[normalizeLocale(stored)]) return normalizeLocale(stored);
    } catch (_e) {}

    var nav = String((navigator && navigator.language) || "").toLowerCase();
    var detected = nav.indexOf("tl") === 0 || nav.indexOf("fil") === 0 ? "tl" : "en";
    writeStoredLocale(detected);
    return detected;
  }

  function dictionary(locale) {
    var all = window.BAGO_I18N || {};
    return all[normalizeLocale(locale)] || {};
  }

  function t(key, params) {
    var safeKey = String(key || "");
    var value = dictionary(currentLocale)[safeKey];
    if (value == null) value = dictionary("en")[safeKey];
    if (value == null) value = safeKey;
    var out = String(value);
    if (params && typeof params === "object") {
      Object.keys(params).forEach(function (k) {
        var token = new RegExp("\\{\\{\\s*" + k + "\\s*\\}\\}", "g");
        out = out.replace(token, String(params[k]));
      });
    }
    return out;
  }

  function parseAttrMap(raw) {
    return String(raw || "")
      .split(",")
      .map(function (chunk) {
        return chunk.trim();
      })
      .filter(Boolean)
      .map(function (chunk) {
        var idx = chunk.indexOf(":");
        if (idx < 1) return null;
        return {
          attr: chunk.slice(0, idx).trim(),
          key: chunk.slice(idx + 1).trim()
        };
      })
      .filter(Boolean);
  }

  function apply(root) {
    var scope = root || document;

    scope.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = t(key);
    });

    scope.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var mappings = parseAttrMap(el.getAttribute("data-i18n-attr"));
      mappings.forEach(function (m) {
        el.setAttribute(m.attr, t(m.key));
      });
    });
  }

  function ensureDataI18n(selector, key) {
    var node = document.querySelector(selector);
    if (!node) return;
    node.setAttribute("data-i18n", key);
  }

  function ensureDataI18nAttr(selector, attr, key) {
    var node = document.querySelector(selector);
    if (!node) return;
    var raw = String(node.getAttribute("data-i18n-attr") || "").trim();
    var pair = attr + ":" + key;
    if (!raw) {
      node.setAttribute("data-i18n-attr", pair);
      return;
    }
    if (raw.indexOf(pair) !== -1) return;
    node.setAttribute("data-i18n-attr", raw + "," + pair);
  }

  function applyPageBindings() {
    var page = String(window.location.pathname || "").split("/").pop().toLowerCase();

    if (page === "index.html") {
      ensureDataI18n("#app h1", "auth.brand");
      ensureDataI18n("#app p", "auth.loading_login");
    }
    if (page === "register.html") {
      ensureDataI18n("title", "auth.register.title");
    }
    if (page === "auth-web-login.html") {
      ensureDataI18n("title", "auth.login.title");
    }
    if (page === "auth-web-register-collector.html") {
      ensureDataI18n("title", "auth.register.collector.title");
    }
    if (page === "auth-web-register-lgu.html") {
      ensureDataI18n("title", "auth.register.lgu.title");
    }
    if (page === "dashboard-resident.html") {
      ensureDataI18n("title", "resident.dashboard.title");
    }
    if (page === "dashboard-collector.html") {
      ensureDataI18n("title", "collectors.dashboard.title");
    }
    if (page === "schedule.html") {
      ensureDataI18n("h1", "schedule.title");
      ensureDataI18n("#resident-panel .card:nth-of-type(1) h2", "schedule.recent_updates");
      ensureDataI18n("#resident-panel .card:nth-of-type(2) h2", "schedule.upcoming");
      ensureDataI18n("#lgu-panel .card:nth-of-type(1) h2", "schedule.create_title");
      ensureDataI18n("#lgu-panel .card:nth-of-type(2) h2", "schedule.manage_title");
      ensureDataI18n("#lgu-waste option:nth-child(1)", "schedule.waste_biodegradable");
      ensureDataI18n("#lgu-waste option:nth-child(2)", "schedule.waste_non_biodegradable");
      ensureDataI18n("#lgu-waste option:nth-child(3)", "schedule.waste_recyclable");
      ensureDataI18n("#lgu-waste option:nth-child(4)", "schedule.waste_residual");
      ensureDataI18n("#lgu-status option:nth-child(1)", "schedule.status_scheduled");
      ensureDataI18n("#lgu-status option:nth-child(2)", "schedule.status_updated");
      ensureDataI18n("#lgu-status option:nth-child(3)", "schedule.status_cancelled");
      ensureDataI18n("#lgu-schedule-form button[type='submit']", "schedule.save");
    }
    if (page === "report.html") {
      ensureDataI18n("h1", "report.title");
      ensureDataI18n("#resident-view .card:nth-of-type(1) h2", "report.submit");
      ensureDataI18n("#resident-view .card:nth-of-type(2) h2", "report.status_updates");
      ensureDataI18n("#resident-view .card:nth-of-type(3) h2", "report.timeline");
      ensureDataI18n("#lgu-view .card:nth-of-type(1) h2", "report.lgu_map");
      ensureDataI18n("#lgu-view .card:nth-of-type(2) h2", "report.update_status");
      ensureDataI18nAttr("#report-street", "placeholder", "report.street_placeholder");
      ensureDataI18nAttr("#report-description", "placeholder", "report.description_placeholder");
      ensureDataI18nAttr("#lgu-report-id", "placeholder", "report.report_id_placeholder");
      ensureDataI18n("#resident-report-form button[type='submit']", "report.submit_btn");
      ensureDataI18n("#lgu-report-status-form button[type='submit']", "report.apply_status");
    }
    if (page === "eco-points.html") {
      ensureDataI18n(".card:nth-of-type(1) h1", "ecopoints.wallet");
      ensureDataI18n("#wallet-summary", "ecopoints.loading_wallet");
      ensureDataI18n(".card:nth-of-type(2) h2", "ecopoints.catalog");
      ensureDataI18n(".card:nth-of-type(3) h2", "ecopoints.ledger");
      ensureDataI18n(".card:nth-of-type(2) thead th:nth-child(1)", "ecopoints.reward");
      ensureDataI18n(".card:nth-of-type(2) thead th:nth-child(2)", "ecopoints.partner");
      ensureDataI18n(".card:nth-of-type(2) thead th:nth-child(3)", "ecopoints.cost");
      ensureDataI18n(".card:nth-of-type(2) thead th:nth-child(4)", "common.actions");
      ensureDataI18n(".card:nth-of-type(3) thead th:nth-child(1)", "common.date");
      ensureDataI18n(".card:nth-of-type(3) thead th:nth-child(2)", "ecopoints.source");
      ensureDataI18n(".card:nth-of-type(3) thead th:nth-child(3)", "ecopoints.delta");
      ensureDataI18n(".card:nth-of-type(3) thead th:nth-child(4)", "ecopoints.notes");
    }
    if (page === "announcements.html") {
      ensureDataI18n("#admin-view h1", "announcements.publish");
      ensureDataI18nAttr("#ann-title", "placeholder", "announcements.title_placeholder");
      ensureDataI18nAttr("#ann-message", "placeholder", "announcements.message_placeholder");
      ensureDataI18n("#ann-scope option:nth-child(1)", "announcements.scope_all");
      ensureDataI18n("#ann-scope option:nth-child(2)", "announcements.scope_residents");
      ensureDataI18n("#ann-scope option:nth-child(3)", "announcements.scope_collectors");
      ensureDataI18n("#ann-scope option:nth-child(4)", "announcements.scope_lgu");
      ensureDataI18n("#ann-urgency option:nth-child(1)", "announcements.urgency_general");
      ensureDataI18n("#ann-urgency option:nth-child(2)", "announcements.urgency_urgent");
      ensureDataI18n("#announcement-form button[type='submit']", "announcements.publish_btn");
      ensureDataI18n("#admin-view .card:nth-of-type(2) h2", "announcements.history");
      ensureDataI18n("#resident-view h1", "announcements.inapp");
    }
    if (page === "collectors.html") ensureDataI18n("title", "collectors.title");
    if (page === "qr-audit.html") {
      ensureDataI18n("h1", "qr.title");
      ensureDataI18n("label[for='qr-token']", "qr.token_label");
      ensureDataI18nAttr("#qr-token", "placeholder", "qr.token_placeholder");
      ensureDataI18n("#qr-scan-form button", "qr.validate_credit");
      ensureDataI18n("#qr-scan-result", "qr.no_scan");
    }
    if (page === "compliance.html") {
      ensureDataI18n("h1", "lgu.compliance.title");
      ensureDataI18n(".metric:nth-child(1) .label", "lgu.compliance.avg");
      ensureDataI18n(".metric:nth-child(2) .label", "lgu.compliance.open");
      ensureDataI18n(".metric:nth-child(3) .label", "lgu.compliance.resolved");
      ensureDataI18n(".metric:nth-child(4) .label", "lgu.compliance.residents");
      ensureDataI18n("section.card:nth-of-type(2) h2", "lgu.compliance.mix");
      ensureDataI18n("thead th:nth-child(1)", "common.status");
      ensureDataI18n("thead th:nth-child(2)", "common.count");
    }
    if (page === "denr-reports.html") ensureDataI18n("title", "lgu.denr.title");
    if (page === "users.html") ensureDataI18n("title", "lgu.users.title");
    if (page === "xml-schedules-editor.html") {
      ensureDataI18n("#view-mode-banner", "xml.schedules.view_mode");
      ensureDataI18nAttr("#meta-title", "placeholder", "xml.schedules.title");
      ensureDataI18nAttr("#meta-tagline", "placeholder", "xml.schedules.tagline");
      ensureDataI18nAttr("#meta-proponent", "placeholder", "xml.schedules.proponent");
      ensureDataI18nAttr("#meta-coverage", "placeholder", "xml.schedules.coverage");
      ensureDataI18n("#btn-save-browser", "common.save");
      ensureDataI18n("#btn-export", "xml.common.export_xml");
      ensureDataI18n("#btn-xsl-preview", "xml.common.xsl_preview");
      ensureDataI18n("#btn-reload-file", "xml.common.reload_file");
      ensureDataI18n("#btn-clear-storage", "xml.common.clear_browser_copy");
    }
    if (page === "xml-barangays-editor.html") {
      ensureDataI18n("#view-mode-banner", "xml.barangays.view_mode");
      ensureDataI18nAttr("#hdr-city", "placeholder", "xml.barangays.city");
      ensureDataI18nAttr("#hdr-province", "placeholder", "xml.barangays.province");
      ensureDataI18nAttr("#hdr-updated", "placeholder", "xml.barangays.last_updated");
      ensureDataI18n("#btn-save-browser", "common.save");
      ensureDataI18n("#btn-export", "xml.common.export_xml");
      ensureDataI18n("#btn-xsl-preview", "xml.common.xsl_preview");
      ensureDataI18n("#btn-reload-file", "xml.common.reload_file");
      ensureDataI18n("#btn-clear-storage", "xml.common.clear_browser_copy");
    }
    if (page === "dashboard-lgu.html") {
      ensureDataI18n(".brand p", "lgu.sidebar_role");
      ensureDataI18n(".navlist li:nth-child(1) a", "lgu.nav.dashboard");
      ensureDataI18n(".navlist li:nth-child(2) a", "lgu.nav.schedule");
      ensureDataI18n(".navlist li:nth-child(3) a", "lgu.nav.reports");
      ensureDataI18n(".navlist li:nth-child(4) a", "lgu.nav.collectors");
      ensureDataI18n(".navlist li:nth-child(5) a", "lgu.nav.announcements");
      ensureDataI18n(".navlist li:nth-child(6) a", "lgu.nav.denr");
      ensureDataI18n(".navlist li:nth-child(7) a", "lgu.nav.users");
      ensureDataI18n(".navlist li:nth-child(8) a", "lgu.nav.compliance");
      ensureDataI18n("#btn-signout-side", "common.logout");
      ensureDataI18n(".topbar h1", "lgu.header_title");
      ensureDataI18n(".topbar p", "lgu.header_subtitle");
      ensureDataI18n(".metric-card:nth-child(1) .metric-label", "lgu.metrics.schedules");
      ensureDataI18n(".metric-card:nth-child(2) .metric-label", "lgu.metrics.reports_total");
      ensureDataI18n(".metric-card:nth-child(3) .metric-label", "lgu.metrics.open_reports");
      ensureDataI18n(".metric-card:nth-child(4) .metric-label", "lgu.metrics.resolved_reports");
      ensureDataI18n(".metric-card:nth-child(5) .metric-label", "lgu.metrics.residents");
      ensureDataI18n(".metric-card:nth-child(6) .metric-label", "lgu.metrics.collectors");
      ensureDataI18n(".metric-card:nth-child(7) .metric-label", "lgu.metrics.eco_total");
      ensureDataI18n(".metric-card:nth-child(8) .metric-label", "lgu.metrics.compliance_avg");
      ensureDataI18n(".charts .card:nth-child(1) h3", "lgu.charts.reports_status");
      ensureDataI18n(".charts .card:nth-child(2) h3", "lgu.charts.schedules_status");
      ensureDataI18n(".charts .card:nth-child(3) h3", "lgu.charts.eco_trend");
      ensureDataI18n("#btn-export-overview", "lgu.exports.overview");
      ensureDataI18n("#btn-export-schedules", "lgu.exports.schedules");
      ensureDataI18n("#btn-export-xml", "lgu.exports.xml");
      ensureDataI18n("#btn-export-denr-html", "lgu.exports.denr_html");
      ensureDataI18n("#btn-export-denr-pdf", "lgu.exports.denr_pdf");
      ensureDataI18n(".activity h3", "lgu.activity.title");
    }
  }

  function isPreAuthPage() {
    var page = String(window.location.pathname || "")
      .split("/")
      .pop()
      .toLowerCase();
    return [
      "index.html",
      "auth-web-login.html",
      "register.html",
      "auth-web-register.html",
      "auth-web-register-collector.html",
      "auth-web-register-lgu.html"
    ].indexOf(page) !== -1;
  }

  function ensureLiveRegion() {
    if (liveRegion && document.body.contains(liveRegion)) return liveRegion;
    var node = document.getElementById("bago-locale-live");
    if (!node) {
      node = document.createElement("div");
      node.id = "bago-locale-live";
      node.setAttribute("aria-live", "polite");
      node.style.position = "fixed";
      node.style.width = "1px";
      node.style.height = "1px";
      node.style.overflow = "hidden";
      node.style.clip = "rect(1px, 1px, 1px, 1px)";
      node.style.clipPath = "inset(50%)";
      node.style.whiteSpace = "nowrap";
      document.body.appendChild(node);
    }
    liveRegion = node;
    return liveRegion;
  }

  function announceLocale(locale) {
    var region = ensureLiveRegion();
    var msg = locale === "tl" ? t("common.language_changed_tl") : t("common.language_changed_en");
    region.textContent = "";
    setTimeout(function () {
      region.textContent = msg;
    }, 10);
  }

  function updateToggleState() {
    var locale = get();
    toggleNodes.forEach(function (node) {
      var select = node.querySelector('[data-locale-control="select"]');
      if (select) {
        select.value = locale;
        select.setAttribute("aria-label", t("common.language"));
        var enOption = select.querySelector('option[value="en"]');
        var tlOption = select.querySelector('option[value="tl"]');
        if (enOption) enOption.textContent = t("common.english");
        if (tlOption) tlOption.textContent = t("common.tagalog");
      }
      var enBtn = node.querySelector('[data-locale-value="en"]');
      var tlBtn = node.querySelector('[data-locale-value="tl"]');
      if (!enBtn || !tlBtn) return;
      var enActive = locale === "en";
      enBtn.setAttribute("aria-pressed", enActive ? "true" : "false");
      tlBtn.setAttribute("aria-pressed", enActive ? "false" : "true");
      enBtn.style.background = enActive ? "#111827" : "#ffffff";
      enBtn.style.color = enActive ? "#ffffff" : "#111827";
      tlBtn.style.background = enActive ? "#ffffff" : "#111827";
      tlBtn.style.color = enActive ? "#111827" : "#ffffff";
      enBtn.setAttribute("aria-label", t("common.switch_to_english"));
      tlBtn.setAttribute("aria-label", t("common.switch_to_tagalog"));
      enBtn.title = t("common.switch_to_english");
      tlBtn.title = t("common.switch_to_tagalog");
    });
  }

  function onToggleKeydown(event) {
    var key = String(event.key || "");
    if (key !== "ArrowLeft" && key !== "ArrowRight") return;
    event.preventDefault();
    var current = normalizeLocale(event.currentTarget.getAttribute("data-locale-value"));
    var next = current === "en" ? "tl" : "en";
    set(next);
    var node = event.currentTarget.parentNode.querySelector('[data-locale-value="' + next + '"]');
    if (node) node.focus();
  }

  function makeLocaleSelect(id) {
    var select = document.createElement("select");
    select.id = id;
    select.setAttribute("data-locale-control", "select");
    select.setAttribute("aria-label", t("common.language"));
    select.style.border = "1px solid #d1d5db";
    select.style.borderRadius = "8px";
    select.style.padding = "6px 10px";
    select.style.font = "600 12px Poppins, Arial, sans-serif";
    select.style.background = "#ffffff";
    select.style.color = "#111827";
    select.style.cursor = "pointer";
    select.style.minWidth = "120px";

    var enOption = document.createElement("option");
    enOption.value = "en";
    enOption.textContent = t("common.english");

    var tlOption = document.createElement("option");
    tlOption.value = "tl";
    tlOption.textContent = t("common.tagalog");

    select.appendChild(enOption);
    select.appendChild(tlOption);

    select.addEventListener("change", function () {
      set(select.value);
      select.focus();
    });
    return select;
  }

  function mountPreAuthToggle() {
    if (!isPreAuthPage()) return;
    if (document.getElementById("bago-preauth-locale-toggle")) return;

    var wrap = document.createElement("div");
    wrap.id = "bago-preauth-locale-toggle";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", t("common.language"));
    wrap.style.position = "fixed";
    wrap.style.top = "12px";
    wrap.style.right = "12px";
    wrap.style.zIndex = "99999";
    wrap.style.display = "inline-flex";
    wrap.style.gap = "6px";
    wrap.style.padding = "6px";
    wrap.style.border = "1px solid #d1d5db";
    wrap.style.borderRadius = "999px";
    wrap.style.background = "#ffffff";
    wrap.style.boxShadow = "0 4px 14px rgba(0,0,0,0.08)";
    wrap.appendChild(makeLocaleSelect("bago-preauth-locale-select"));

    document.body.appendChild(wrap);
    toggleNodes.push(wrap);
    updateToggleState();
  }

  function isAuthenticatedContext() {
    try {
      return !!localStorage.getItem("bagoRole");
    } catch (_e) {
      return false;
    }
  }

  function mountInAppToggle() {
    if (isPreAuthPage() || !isAuthenticatedContext()) return;
    if (document.getElementById("bago-inapp-locale-toggle")) return;

    var wrap = document.createElement("div");
    wrap.id = "bago-inapp-locale-toggle";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", t("common.language"));
    wrap.style.display = "inline-flex";
    wrap.style.gap = "6px";
    wrap.style.padding = "6px";
    wrap.style.border = "1px solid #d1d5db";
    wrap.style.borderRadius = "999px";
    wrap.style.background = "#ffffff";
    wrap.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
    wrap.appendChild(makeLocaleSelect("bago-inapp-locale-select"));

    var host = document.querySelector("nav ul");
    if (host) {
      var li = document.createElement("li");
      li.style.listStyle = "none";
      li.appendChild(wrap);
      host.appendChild(li);
    } else {
      wrap.style.position = "fixed";
      wrap.style.bottom = "12px";
      wrap.style.right = "12px";
      wrap.style.zIndex = "99999";
      document.body.appendChild(wrap);
    }

    toggleNodes.push(wrap);
    updateToggleState();
  }

  function set(locale, opts) {
    var options = opts || {};
    var next = normalizeLocale(locale);
    var activeEl = document.activeElement;
    var activeToggle = activeEl && activeEl.getAttribute ? activeEl.getAttribute("data-locale-value") : null;
    var activeSelectId =
      activeEl &&
      activeEl.getAttribute &&
      activeEl.getAttribute("data-locale-control") === "select" &&
      activeEl.id
        ? activeEl.id
        : null;
    currentLocale = next;
    writeStoredLocale(next);
    document.documentElement.lang = next;
    apply(options.root || document);
    updateToggleState();
    if (activeSelectId) {
      var selectTarget = document.getElementById(activeSelectId);
      if (selectTarget) selectTarget.focus();
    } else if (activeToggle) {
      var focusTarget = document.querySelector('[data-locale-value="' + normalizeLocale(activeToggle) + '"]');
      if (focusTarget) focusTarget.focus();
    }
    if (!options.silent) announceLocale(next);

    if (!options.silent) {
      window.dispatchEvent(
        new CustomEvent("bago:locale-changed", { detail: { locale: next } })
      );
    }
    return next;
  }

  function get() {
    return currentLocale || detectInitialLocale();
  }

  function bootstrap() {
    var initial = detectInitialLocale();
    applyPageBindings();
    mountPreAuthToggle();
    mountInAppToggle();
    ensureLiveRegion();
    set(initial, { silent: true });
  }

  window.BAGO.i18n = {
    t: t,
    set: set,
    get: get,
    apply: apply,
    detectInitialLocale: detectInitialLocale,
    normalizeLocale: normalizeLocale
  };

  document.addEventListener("DOMContentLoaded", bootstrap);
})();
