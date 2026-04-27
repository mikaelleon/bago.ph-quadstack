(function () {
  function pageName() {
    var p = String(window.location.pathname || "").split("/").pop() || "index.html";
    return p.toLowerCase();
  }

  function setActiveRoute() {
    var current = pageName();
    document.querySelectorAll("a[href$='.html']").forEach(function (a) {
      var href = String(a.getAttribute("href") || "").split("/").pop().toLowerCase();
      if (!href) return;
      if (href === current) a.classList.add("active");
      else a.classList.remove("active");
    });
  }

  function ensureSidebarToggle() {
    var sidebar = document.querySelector(".sidebar");
    var topbar = document.querySelector(".topbar");
    if (!sidebar || !topbar) return;
    if (document.getElementById("bago-nav-toggle")) return;
    var btn = document.createElement("button");
    btn.id = "bago-nav-toggle";
    btn.type = "button";
    btn.className = "ui-btn ui-btn-secondary ui-btn-sm";
    btn.textContent = "Menu";
    btn.style.display = "none";
    btn.style.marginRight = "8px";
    topbar.insertBefore(btn, topbar.firstChild);

    var mq = window.matchMedia("(max-width: 860px)");
    function sync() {
      btn.style.display = mq.matches ? "inline-flex" : "none";
      if (!mq.matches) sidebar.style.display = "flex";
      else if (!sidebar.getAttribute("data-mobile-open")) sidebar.style.display = "none";
    }
    function toggle() {
      var open = sidebar.getAttribute("data-mobile-open") === "1";
      if (open) {
        sidebar.removeAttribute("data-mobile-open");
        sidebar.style.display = "none";
      } else {
        sidebar.setAttribute("data-mobile-open", "1");
        sidebar.style.display = "flex";
        sidebar.style.position = "fixed";
        sidebar.style.inset = "0 auto 0 0";
        sidebar.style.zIndex = "1000";
      }
    }
    btn.addEventListener("click", toggle);
    if (typeof mq.addEventListener === "function") mq.addEventListener("change", sync);
    else mq.addListener(sync);
    sync();
  }

  function init() {
    setActiveRoute();
    ensureSidebarToggle();
  }

  window.BAGONavRuntime = { init: init, setActiveRoute: setActiveRoute };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
