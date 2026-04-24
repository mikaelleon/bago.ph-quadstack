(function () {
  function fillSelect(sel) {
    var list = window.LIPA_BARANGAYS;
    if (!list || !list.length) return;

    var includeAll = sel.getAttribute("data-include-all") === "true";
    var placeholder = sel.getAttribute("data-placeholder-option");
    var isMultiple = sel.hasAttribute("multiple");

    sel.innerHTML = "";

    if (placeholder !== null && placeholder !== undefined && placeholder !== "") {
      var ph = document.createElement("option");
      ph.value = "";
      ph.textContent = placeholder;
      ph.setAttribute("disabled", "disabled");
      ph.setAttribute("selected", "selected");
      sel.appendChild(ph);
    }

    if (includeAll) {
      var all = document.createElement("option");
      all.value = "all";
      all.textContent = "All Barangays";
      if (isMultiple) all.setAttribute("selected", "selected");
      sel.appendChild(all);
    }

    list.forEach(function (name) {
      var o = document.createElement("option");
      o.value = window.lipaBarangaySlug(name);
      o.textContent = name;
      sel.appendChild(o);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("select[data-lipa-barangays]").forEach(fillSelect);
  });
})();
