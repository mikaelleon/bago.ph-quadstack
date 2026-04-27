(function () {
  function rows(targetId, count) {
    var host = document.getElementById(targetId);
    if (!host) return;
    host.innerHTML = "";
    var n = Number(count || 3);
    for (var i = 0; i < n; i += 1) {
      var row = document.createElement("div");
      row.className = "ui-skeleton ui-skeleton-row";
      host.appendChild(row);
    }
  }

  function tableBody(targetId, columns, rowsCount) {
    var host = document.getElementById(targetId);
    if (!host) return;
    host.innerHTML = "";
    var c = Number(columns || 4);
    var r = Number(rowsCount || 3);
    for (var i = 0; i < r; i += 1) {
      var tr = document.createElement("tr");
      tr.className = "ui-table-loading";
      for (var j = 0; j < c; j += 1) {
        var td = document.createElement("td");
        var bar = document.createElement("div");
        bar.className = "ui-skeleton ui-skeleton-row";
        td.appendChild(bar);
        tr.appendChild(td);
      }
      host.appendChild(tr);
    }
  }

  window.BAGOSkeleton = { rows: rows, tableBody: tableBody };
})();
