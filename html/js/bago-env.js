(function () {
  if (typeof window.__BAGO_API_BASE__ === "undefined") {
    window.__BAGO_API_BASE__ = "http://localhost:3000";
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
      style.textContent = "html, body, body * { font-family: 'Poppins', sans-serif !important; }";
      document.head.appendChild(style);
    }
  }

  function ensureUiDesignSystemStyles() {
    var path = String(window.location.pathname || "/");
    // When static web serves from /html as document root (dev mode),
    // sibling ../css is unreachable and causes repeated 404 noise.
    if (!(path.indexOf("/html/") === 0 || path === "/html")) return;
    var base = "/css/";
    var styles = [
      { key: "tokens", href: base + "tokens.css" },
      { key: "ui-button", href: base + "components/button.css" },
      { key: "ui-forms", href: base + "components/forms.css" },
      { key: "ui-table", href: base + "components/table.css" },
      { key: "ui-toast", href: base + "components/toast.css" },
      { key: "ui-skeleton", href: base + "components/skeleton.css" },
      { key: "ui-navigation", href: base + "components/navigation.css" }
    ];
    styles.forEach(function (row) {
      if (document.querySelector('link[data-bago-ui-style="' + row.key + '"]')) return;
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = row.href;
      link.setAttribute("data-bago-ui-style", row.key);
      document.head.appendChild(link);
    });
  }

  function ensureUiFallbackStyles() {
    if (document.getElementById("bago-ui-fallback-style")) return;
    var style = document.createElement("style");
    style.id = "bago-ui-fallback-style";
    style.textContent =
      ".ui-breadcrumb{margin:0 0 12px;font-size:13px;color:#616161;}" +
      ".ui-breadcrumb ol{list-style:none;margin:0;padding:0;display:flex;align-items:center;gap:8px;}" +
      ".ui-breadcrumb li{display:flex;align-items:center;gap:8px;}" +
      ".ui-breadcrumb li+li:before{content:'/';color:#9e9e9e;}" +
      ".ui-breadcrumb a{color:#334155;text-decoration:none;}" +
      ".ui-breadcrumb a:hover{text-decoration:underline;}" +
      ".ui-breadcrumb span{color:#616161;}" +
      ".ui-btn{display:inline-flex;align-items:center;justify-content:center;border-radius:8px;border:1px solid #cfd8dc;background:#fff;color:#0d1b2a;padding:8px 12px;font:600 13px/1.2 Poppins,Arial,sans-serif;}" +
      ".ui-btn-secondary{background:#fff;color:#0d1b2a;}";
    document.head.appendChild(style);
  }

  function loadI18nRuntime() {
    if (window.__BAGO_I18N_LOAD_PROMISE__) return window.__BAGO_I18N_LOAD_PROMISE__;
    window.__BAGO_I18N_LOAD_PROMISE__ = new Promise(function (resolve) {
      function done() {
        resolve(window.BAGO && window.BAGO.i18n ? window.BAGO.i18n : null);
      }

      if (window.BAGO && window.BAGO.i18n) {
        done();
        return;
      }

      var path = String(window.location.pathname || "/");
      var base = path.indexOf("/html/") === 0 || path === "/html" ? "/html/" : "./";
      var scripts = [base + "js/i18n/strings.js", base + "js/i18n/i18n.js"];
      var idx = 0;

      function next() {
        if (idx >= scripts.length) {
          done();
          return;
        }
        var src = scripts[idx++];
        if (document.querySelector('script[data-bago-i18n-src="' + src + '"]')) {
          next();
          return;
        }
        var s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.setAttribute("data-bago-i18n-src", src);
        s.onload = next;
        s.onerror = next;
        document.head.appendChild(s);
      }

      next();
    });

    return window.__BAGO_I18N_LOAD_PROMISE__;
  }

  ensureGlobalPoppins();
  ensureUiDesignSystemStyles();
  ensureUiFallbackStyles();
  loadI18nRuntime();
})();
