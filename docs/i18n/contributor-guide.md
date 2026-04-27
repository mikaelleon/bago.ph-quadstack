# i18n Contributor Guide

This guide defines workflow for adding or updating localized UI text in BAGO.PH.

## 1) Source of Truth

- Catalog file: `html/js/i18n/strings.js`
- Runtime file: `html/js/i18n/i18n.js`
- Locale key: `bagoLocale`
- Supported locales: `en`, `tl`

## 2) Key Naming Rules

Use flat dot-namespace keys:

- `common.*`
- `auth.*`
- `schedule.*`
- `report.*`
- `ecopoints.*`
- `announcements.*`
- `collectors.*`
- `lgu.*`
- `qr.*`
- `xml.*`
- `errors.*`

Do not create deep nested objects; keep one-level map for runtime speed.

## 3) Add New UI String

1. Add key in `en` map.
2. Add matching key in `tl` map.
3. Bind key in HTML or JS:
   - HTML text: `data-i18n="namespace.key"`
   - HTML attrs: `data-i18n-attr="placeholder:namespace.key,aria-label:namespace.key"`
   - JS dynamic text: `window.BAGO.i18n.t("namespace.key")`
4. Verify fallback behavior by temporary key removal.

## 4) Dynamic JS Text Rule

Never hardcode visible English for dynamic UI.

Use helper pattern:

```js
function t(key, fallback) {
  if (window.BAGO && window.BAGO.i18n && typeof window.BAGO.i18n.t === "function") {
    var v = window.BAGO.i18n.t(key);
    if (v && v !== key) return v;
  }
  return fallback || key;
}
```

## 5) API Error Mapping Rule

- Backend returns stable `code`.
- Client maps `code -> errors.<CODE>` in `html/js/bago-api.js`.
- Always add `errors.<CODE>` entries in both `en` and `tl`.

## 6) Accessibility Requirements

Locale controls must keep:

- wrapper `role="group"`
- button `aria-pressed`
- live region announcement (`aria-live="polite"`)
- focus retention after language switch

## 7) QA Minimum Before Merge

- Run app smoke for auth + in-app locale switch.
- Verify `document.documentElement.lang` changes.
- Verify `bagoLocale` persists across reload/logout.
- Run tests: `npm test -- --runInBand`
- Update docs in `docs/qa/` if behavior changed.
