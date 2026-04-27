(function () {
  function render(targetId, config) {
    var cfg = config || {};
    var host = document.getElementById(targetId);
    if (!host) return;
    host.innerHTML = "";
    var wrap = document.createElement("div");
    wrap.className = "bento-alert danger";
    var content = document.createElement("div");
    content.className = "bento-alert-content";
    var title = document.createElement("div");
    title.className = "bento-alert-title";
    title.textContent = cfg.title || "Action failed";
    var text = document.createElement("div");
    text.className = "bento-alert-text";
    text.textContent = cfg.message || "Try again.";
    content.appendChild(title);
    content.appendChild(text);
    wrap.appendChild(content);
    if (typeof cfg.onRetry === "function") {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ui-btn ui-btn-sm ui-btn-secondary";
      btn.textContent = cfg.retryLabel || "Retry";
      btn.addEventListener("click", function () {
        cfg.onRetry();
      });
      wrap.appendChild(btn);
    }
    host.appendChild(wrap);
  }

  function clear(targetId) {
    var host = document.getElementById(targetId);
    if (!host) return;
    host.innerHTML = "";
  }

  window.BAGOErrorBanner = { render: render, clear: clear };
})();
