(function () {
  function openModal(config) {
    const fields = config.fields || [];
    return new Promise((resolve) => {
      const back = document.createElement("div");
      back.style.cssText =
        "position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:9999;";
      const box = document.createElement("div");
      box.style.cssText =
        "background:#fff;border-radius:10px;padding:16px;min-width:320px;max-width:540px;width:100%;font-family:Arial,sans-serif;";
      const title = document.createElement("h3");
      title.textContent = config.title || "Edit";
      title.style.margin = "0 0 10px";
      const form = document.createElement("form");
      form.style.display = "grid";
      form.style.gap = "8px";
      fields.forEach((f) => {
        const label = document.createElement("label");
        label.textContent = f.label;
        const input = document.createElement("input");
        input.name = f.name;
        input.value = f.value == null ? "" : String(f.value);
        input.placeholder = f.placeholder || "";
        input.style.cssText = "height:34px;border:1px solid #d1d5db;border-radius:6px;padding:0 8px;";
        label.style.display = "grid";
        label.style.gap = "4px";
        label.appendChild(input);
        form.appendChild(label);
      });
      const err = document.createElement("div");
      err.style.cssText = "color:#b91c1c;font-size:12px;min-height:16px;";
      const row = document.createElement("div");
      row.style.cssText = "display:flex;justify-content:flex-end;gap:8px;margin-top:8px;";
      const cancel = document.createElement("button");
      cancel.type = "button";
      cancel.textContent = "Cancel";
      const ok = document.createElement("button");
      ok.type = "submit";
      ok.textContent = "Save";
      cancel.style.cssText =
        "height:34px;border:1px solid #d1d5db;border-radius:6px;background:#fff;padding:0 12px;cursor:pointer;";
      ok.style.cssText =
        "height:34px;border:none;border-radius:6px;background:#0f766e;color:#fff;padding:0 12px;cursor:pointer;";
      row.appendChild(cancel);
      row.appendChild(ok);
      form.appendChild(err);
      form.appendChild(row);
      box.appendChild(title);
      box.appendChild(form);
      back.appendChild(box);
      document.body.appendChild(back);

      function cleanup(value) {
        if (back.parentNode) back.parentNode.removeChild(back);
        resolve(value);
      }

      cancel.addEventListener("click", function () {
        cleanup(null);
      });
      back.addEventListener("click", function (e) {
        if (e.target === back) cleanup(null);
      });
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const out = {};
        fields.forEach((f) => {
          out[f.name] = form.elements[f.name].value.trim();
        });
        if (typeof config.validate === "function") {
          const validation = config.validate(out);
          if (validation !== true) {
            err.textContent = validation || "Invalid input";
            return;
          }
        }
        cleanup(out);
      });
      const first = form.querySelector("input");
      if (first) first.focus();
    });
  }

  window.BAGOXmlModal = { openModal: openModal };
})();
