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
      const err = new Error((data && data.error) || res.statusText || "Request failed");
      err.status = res.status;
      err.body = data;
      throw err;
    }
    return data;
  }

  async function tryLogin(mobile, pin) {
    if (!hasBase()) return null;
    setToken(null);
    try {
      const data = await request("POST", "/api/auth/login", { mobile, pin });
      setToken(data.token);
      return { ok: true, role: data.role };
    } catch (e) {
      return {
        ok: false,
        message: (e.body && e.body.error) || e.message || "Login failed"
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
        role
      });
      setToken(data.token);
      return { ok: true, role: data.role };
    } catch (e) {
      return {
        ok: false,
        message: (e.body && e.body.error) || e.message || "Registration failed"
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

  window.BAGOApi = {
    base,
    hasBase,
    getToken,
    setToken,
    request,
    tryLogin,
    tryRegister,
    loadBarangaysIntoSelect
  };
})();
