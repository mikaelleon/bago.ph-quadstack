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

    ["en", "tl"].forEach(function (locale) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-locale-value", locale);
      btn.textContent = locale.toUpperCase();
      btn.style.border = "1px solid #d1d5db";
      btn.style.borderRadius = "999px";
      btn.style.padding = "4px 10px";
      btn.style.font = "600 12px Poppins, Arial, sans-serif";
      btn.style.cursor = "pointer";
      btn.addEventListener("click", function () {
        set(locale);
        btn.focus();
      });
      btn.addEventListener("keydown", onToggleKeydown);
      wrap.appendChild(btn);
    });

    document.body.appendChild(wrap);
    toggleNodes.push(wrap);
    updateToggleState();
  }

  function set(locale, opts) {
    var options = opts || {};
    var next = normalizeLocale(locale);
    currentLocale = next;
    writeStoredLocale(next);
    document.documentElement.lang = next;
    apply(options.root || document);
    updateToggleState();
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
    mountPreAuthToggle();
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
