(function () {
  if (typeof window.__BAGO_API_BASE__ === "undefined") {
    window.__BAGO_API_BASE__ = "http://localhost:3000";
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

  loadI18nRuntime();
})();
