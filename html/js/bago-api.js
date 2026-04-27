(function () {
  function base() {
    return String(window.__BAGO_API_BASE__ || "").replace(/\/$/, "");
  }

  function hasBase() {
    return !!base();
  }

  function getToken() {
    return localStorage.getItem("bagoToken");
  }

  function setToken(t) {
    if (t) localStorage.setItem("bagoToken", t);
    else localStorage.removeItem("bagoToken");
  }

  function normalizeLocale(locale) {
    const raw = String(locale || "").trim().toLowerCase();
    if (raw === "fil") return "tl";
    return raw === "tl" ? "tl" : "en";
  }

  function getLocale() {
    try {
      const stored = localStorage.getItem("bagoLocale");
      if (stored) return normalizeLocale(stored);
      const nav = String((navigator && navigator.language) || "").toLowerCase();
      return nav.indexOf("tl") === 0 || nav.indexOf("fil") === 0 ? "tl" : "en";
    } catch (_e) {
      return "en";
    }
  }

  function setLocale(locale) {
    const next = normalizeLocale(locale);
    try {
      localStorage.setItem("bagoLocale", next);
    } catch (_e) {}
    if (window.BAGO && window.BAGO.i18n && typeof window.BAGO.i18n.set === "function") {
      window.BAGO.i18n.set(next);
    }
    return next;
  }

  function i18nError(code, fallback) {
    var key = code ? "errors." + String(code) : "errors.unknown";
    if (window.BAGO && window.BAGO.i18n && typeof window.BAGO.i18n.t === "function") {
      var out = window.BAGO.i18n.t(key);
      if (out && out !== key) return out;
      return window.BAGO.i18n.t("errors.unknown");
    }
    return fallback || "Request failed";
  }

  async function request(method, path, body) {
    const url = base() + path;
    const headers = { Accept: "application/json" };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    const token = getToken();
    if (token) headers["Authorization"] = "Bearer " + token;
    const res = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined
    });
    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (_e) {
      data = { error: text || "Invalid JSON" };
    }
    if (!res.ok) {
      const msg = i18nError(data && data.code, (data && data.error) || res.statusText || "Request failed");
      const err = new Error(msg);
      err.status = res.status;
      err.body = data;
      throw err;
    }
    return data;
  }

  async function tryLogin(mobile, pin, email, password) {
    if (!hasBase()) return null;
    setToken(null);
    try {
      var body =
        email && String(email).indexOf("@") !== -1
          ? { email: String(email).trim().toLowerCase(), password: String(password || ""), locale: getLocale() }
          : { mobile: mobile, pin: pin, locale: getLocale() };
      const data = await request("POST", "/api/auth/login", body);
      setToken(data.token);
      if (data && data.locale) setLocale(data.locale);
      return { ok: true, role: data.role };
    } catch (e) {
      return {
        ok: false,
        message: i18nError(e.body && e.body.code, (e.body && e.body.error) || e.message || "Login failed")
      };
    }
  }

  async function tryRegister(full_name, mobile, pin, role) {
    if (!hasBase()) return null;
    setToken(null);
    try {
      const data = await request("POST", "/api/auth/register", {
        full_name,
        mobile,
        pin,
        role,
        locale: getLocale()
      });
      setToken(data.token);
      if (data && data.locale) setLocale(data.locale);
      return { ok: true, role: data.role };
    } catch (e) {
      return {
        ok: false,
        message: i18nError(
          e.body && e.body.code,
          (e.body && e.body.error) || e.message || "Registration failed"
        )
      };
    }
  }

  async function loadBarangaysIntoSelect(selectEl) {
    if (!selectEl || !hasBase()) return;
    const rows = await request("GET", "/api/barangays");
    const ph = selectEl.getAttribute("data-placeholder-option") || "Select your barangay";
    selectEl.innerHTML = "";
    const first = document.createElement("option");
    first.value = "";
    first.textContent = ph;
    first.setAttribute("disabled", "disabled");
    first.setAttribute("selected", "selected");
    selectEl.appendChild(first);
    rows.forEach(function (b) {
      const o = document.createElement("option");
      o.value = String(b.barangay_id);
      o.textContent = b.barangay_name;
      selectEl.appendChild(o);
    });
  }

  async function syncLocaleFromProfile() {
    if (!hasBase() || !getToken()) return null;
    try {
      const data = await request("GET", "/api/auth/me");
      if (data && data.locale) {
        return setLocale(data.locale);
      }
    } catch (_e) {}
    return null;
  }

  window.BAGOApi = {
    base,
    hasBase,
    getToken,
    setToken,
    request,
    normalizeLocale,
    getLocale,
    setLocale,
    syncLocaleFromProfile,
    tryLogin,
    tryRegister,
    loadBarangaysIntoSelect
  };
})();
