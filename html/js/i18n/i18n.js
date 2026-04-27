(function () {
  var STORAGE_KEY = "bagoLocale";
  var allowed = { en: true, tl: true };
  var currentLocale = "en";

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

  function set(locale, opts) {
    var options = opts || {};
    var next = normalizeLocale(locale);
    currentLocale = next;
    writeStoredLocale(next);
    document.documentElement.lang = next;
    apply(options.root || document);

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
