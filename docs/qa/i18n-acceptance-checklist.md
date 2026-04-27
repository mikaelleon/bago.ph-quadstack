# i18n Acceptance Checklist

Date: 2026-04-27  
Scope: `T-I18N-09`, `T-I18N-10` implementation verification

- [x] Pre-auth pages show EN/TL toggle (`index`, `auth-web-login`, `register`, `auth-web-register-*`)
- [x] In-app pages show locale toggle (nav attach or floating fallback)
- [x] Locale switch applies without full reload (`BAGO.i18n.set()` + re-apply)
- [x] `bagoLocale` persists and survives logout
- [x] First-visit locale detection uses `navigator.language` (`tl|fil -> tl`, else `en`)
- [x] `<html lang>` updates on locale switch (`document.documentElement.lang`)
- [x] Selector exposes `role="group"` + `aria-label`
- [x] `aria-live="polite"` locale announcement exists and updates
- [x] Focus retained on toggle after locale apply cycle
- [x] Runtime-generated text paths migrated to `t(...)` in dynamic modules (`prototype-page-loader`, schedule/report/eco/announcements/XML tools)
- [x] API errors mapped from stable `code` to localized `errors.*` (client map in `bago-api.js`)
- [x] XML preview/export passes locale query and XSL receives locale param
- [x] XML data values remain source values (XSL changes only labels/chrome)

## Verification Notes

- Automated test suite run: `npm test -- --runInBand` passed (`21/21`).
- Lint check on edited files: no diagnostics.
- Accessibility behavior implemented in `html/js/i18n/i18n.js`:
  - lang update
  - ARIA pressed state
  - live region announcement
  - focus retention after apply.
