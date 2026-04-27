(function () {
  function ensureRegion() {
    var existing = document.getElementById("bago-toast-region");
    if (existing) return existing;
    var region = document.createElement("div");
    region.id = "bago-toast-region";
    region.className = "ui-toast-region";
    region.setAttribute("role", "status");
    region.setAttribute("aria-live", "polite");
    document.body.appendChild(region);
    return region;
  }

  function show(message, opts) {
    var options = opts || {};
    var type = String(options.type || "info");
    var duration = typeof options.duration_ms === "number" ? options.duration_ms : 3000;
    var region = ensureRegion();
    var item = document.createElement("div");
    item.className = "ui-toast ui-toast-" + type;
    var text = document.createElement("div");
    text.textContent = String(message || "");
    var close = document.createElement("button");
    close.className = "ui-toast-close";
    close.type = "button";
    close.setAttribute("aria-label", "Dismiss notification");
    close.textContent = "x";
    item.appendChild(text);
    item.appendChild(close);
    region.appendChild(item);

    var done = false;
    function dismiss() {
      if (done) return;
      done = true;
      if (item.parentNode) item.parentNode.removeChild(item);
    }
    close.addEventListener("click", dismiss);
    window.setTimeout(dismiss, duration);
  }

  window.BAGOToast = { show: show };
})();
