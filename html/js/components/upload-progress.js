(function () {
  function ensure(targetId) {
    var host = document.getElementById(targetId);
    if (!host) return null;
    var wrap = host.querySelector("[data-upload-progress]");
    if (wrap) return wrap;
    wrap = document.createElement("div");
    wrap.setAttribute("data-upload-progress", "1");
    wrap.style.marginTop = "8px";
    var bar = document.createElement("div");
    bar.className = "bento-progress";
    var fill = document.createElement("div");
    fill.className = "bento-progress-bar";
    fill.style.width = "0%";
    bar.appendChild(fill);
    var text = document.createElement("div");
    text.className = "helper-text";
    text.textContent = "0%";
    text.setAttribute("data-upload-label", "1");
    wrap.appendChild(bar);
    wrap.appendChild(text);
    host.appendChild(wrap);
    return wrap;
  }

  function set(targetId, pct) {
    var wrap = ensure(targetId);
    if (!wrap) return;
    var safe = Math.max(0, Math.min(100, Number(pct || 0)));
    var fill = wrap.querySelector(".bento-progress-bar");
    var label = wrap.querySelector("[data-upload-label]");
    if (fill) fill.style.width = safe + "%";
    if (label) label.textContent = safe + "%";
    if (safe >= 100) {
      window.setTimeout(function () {
        if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
      }, 500);
    }
  }

  window.BAGOUploadProgress = { set: set };
})();
