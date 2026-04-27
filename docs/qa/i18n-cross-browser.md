# i18n Cross-Browser Check

Date: 2026-04-27

## Target Matrix

- Chrome (latest stable)
- Edge (latest stable)
- Firefox (latest stable)

## Test Cases

- Locale toggle appears on pre-auth and in-app contexts.
- Toggle changes text without reload.
- Localized placeholders/labels render correctly.
- `document.documentElement.lang` changes after toggle.
- XML preview links include `?locale=<en|tl>`.
- Export endpoints accept locale:
  - `/api/exports/xml?locale=tl`
  - `/api/exports/denr-html?locale=tl`
  - `/api/exports/denr-pdf?locale=tl`

## Current Status

- [x] Browser-agnostic runtime behavior verified via static implementation review.
- [ ] Manual per-browser execution pending QA operator run.

## Evidence Pointers

- Runtime: `html/js/i18n/i18n.js`
- XML editors: `html/js/xml-schedules-app.js`, `html/js/xml-barangays-app.js`
- Exports: `server/routes/exports.js`
- XSL locale params: `xsl/ecolinisph-schedules.xsl`, `xsl/barangays.xsl`, `xsl/denr-report.xsl`
