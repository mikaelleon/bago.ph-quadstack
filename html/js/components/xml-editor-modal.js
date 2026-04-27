(function () {
  function t(key, fallback) {
    if (window.BAGO && window.BAGO.i18n && typeof window.BAGO.i18n.t === "function") {
      var v = window.BAGO.i18n.t(key);
      if (v && v !== key) return v;
    }
    return fallback || key;
  }

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
      title.textContent = config.title || t("common.edit", "Edit");
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
      cancel.textContent = t("common.cancel", "Cancel");
      const ok = document.createElement("button");
      ok.type = "submit";
      ok.textContent = t("common.save", "Save");
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
            err.textContent = validation || t("common.invalid_input", "Invalid input");
            return;
          }
        }
        cleanup(out);
      });
      const first = form.querySelector("input");
      if (first) first.focus();
    });
  }

  function openConfirm(config) {
    var cfg = config || {};
    var requireText = String(cfg.requireText || "");
    return new Promise(function (resolve) {
      var back = document.createElement("div");
      back.style.cssText =
        "position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:9999;";
      var box = document.createElement("div");
      box.style.cssText =
        "background:#fff;border-radius:10px;padding:16px;min-width:320px;max-width:520px;width:100%;font-family:Arial,sans-serif;";
      var title = document.createElement("h3");
      title.textContent = cfg.title || t("common.confirm", "Confirm");
      title.style.margin = "0 0 8px";
      var msg = document.createElement("p");
      msg.style.margin = "0 0 10px";
      msg.textContent = cfg.message || t("common.confirm_action", "Are you sure?");
      box.appendChild(title);
      box.appendChild(msg);

      var input = null;
      if (requireText) {
        var hint = document.createElement("div");
        hint.style.cssText = "font-size:12px;color:#374151;margin-bottom:6px;";
        hint.textContent = 'Type "' + requireText + '" to continue.';
        input = document.createElement("input");
        input.type = "text";
        input.style.cssText = "width:100%;height:34px;border:1px solid #d1d5db;border-radius:6px;padding:0 8px;";
        box.appendChild(hint);
        box.appendChild(input);
      }

      var err = document.createElement("div");
      err.style.cssText = "font-size:12px;color:#b91c1c;min-height:16px;margin-top:8px;";
      box.appendChild(err);

      var row = document.createElement("div");
      row.style.cssText = "display:flex;justify-content:flex-end;gap:8px;margin-top:8px;";
      var cancel = document.createElement("button");
      cancel.type = "button";
      cancel.textContent = t("common.cancel", "Cancel");
      var ok = document.createElement("button");
      ok.type = "button";
      ok.textContent = cfg.confirmLabel || t("common.delete", "Delete");
      cancel.style.cssText =
        "height:34px;border:1px solid #d1d5db;border-radius:6px;background:#fff;padding:0 12px;cursor:pointer;";
      ok.style.cssText =
        "height:34px;border:none;border-radius:6px;background:#b91c1c;color:#fff;padding:0 12px;cursor:pointer;";
      row.appendChild(cancel);
      row.appendChild(ok);
      box.appendChild(row);
      back.appendChild(box);
      document.body.appendChild(back);

      function cleanup(val) {
        if (back.parentNode) back.parentNode.removeChild(back);
        resolve(!!val);
      }

      cancel.onclick = function () { cleanup(false); };
      back.addEventListener("click", function (e) {
        if (e.target === back) cleanup(false);
      });
      ok.onclick = function () {
        if (requireText) {
          var got = String(input.value || "").trim();
          if (got !== requireText) {
            err.textContent = "Confirmation text mismatch.";
            return;
          }
        }
        cleanup(true);
      };
      if (input) input.focus();
      else cancel.focus();
    });
  }

  window.BAGOXmlModal = { openModal: openModal, openConfirm: openConfirm };
})();
