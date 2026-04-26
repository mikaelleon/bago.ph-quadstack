# BAGO.PH i18n Specification (EN / TL)

## 1. Goals & Scope

BAGO.PH must support bilingual UI (`en`, `tl`) across resident, collector, and LGU flows, including all user-visible strings from static HTML pages, JS-rendered content, modal copy, validation/error messages, and XML/XSLT chrome labels; translation layer must work in pure HTML/CSS/vanilla JS with no build step and no framework runtime coupling. Non-goals: RTL layout support, pluralization libraries, grammar engines, server-side prose translation beyond stable error-code catalog, and automatic translation of database content fields.

## 2. Selector Placement & UX

- Pre-auth pages must show language toggle on:
  - `html/index.html`
  - `html/auth-web-login.html`
  - `html/register.html`
  - `html/auth-web-register-collector.html`
  - `html/auth-web-register-lgu.html`
- Toggle appears top-right of auth card and also visible on landing/marketing area (for pages with split layout).
- In-app pages must expose compact nav toggle in navbar area: `EN | TL`.
- Locale switch applies instantly without full page reload.
- First visit default logic:
  - Read `localStorage.getItem("bagoLocale")`.
  - If null, inspect `navigator.language`.
  - If language starts with `tl` or `fil`, use `tl`; otherwise use `en`.
- Explicit user choice always overrides `navigator.language`.
- If page has no `<nav>` (many live pages use standalone `<main>`), inject compact floating toggle until navbar normalization is done.

### Placement Contract

- Auth pages: inject into auth shell root near `#app`.
- App pages with nav: append to `nav ul` or nav right utility slot.
- App pages without nav: append fixed corner launcher inside `body`.
- XML editors: place near existing action button rows (`#btn-save-browser`, `#btn-export`).

## 3. Persistence

- Storage key: `bagoLocale`.
- Allowed values: `"en"` or `"tl"`.
- Persist in `localStorage`; do not clear on logout.
- On login success:
  - Read current `bagoLocale`.
  - Send locale to backend profile update endpoint.
  - Persist backend-returned locale if provided.
- Backend profile persistence:
  - Add locale column via migration `sql/migrations/00X_user_locale.sql`.
  - Requirement target field: `users.locale` (nullable, default `en`).
  - Current repo uses `app_identity`; implementation may map logical `users.locale` to auth identity record while preserving API contract.
- On logout:
  - Keep `bagoLocale`.
  - Clear only session auth keys (`bagoToken`, `bagoRole`) and pending OTP keys if needed.

## 4. String Catalog Format

- File: `html/js/i18n/strings.js`.
- Expose one global object:

```js
window.BAGO_I18N = {
  en: {
    "auth.login.title": "Welcome back",
    "common.save": "Save"
  },
  tl: {
    "auth.login.title": "Maligayang pagbabalik",
    "common.save": "I-save"
  }
};
```

- Key naming: dot namespace by area.
  - `auth.*`
  - `nav.*`
  - `schedule.*`
  - `report.*`
  - `ecopoints.*`
  - `collectors.*`
  - `lgu.*`
  - `xml.*`
  - `errors.*`
  - `common.*`
- Fallback chain:
  1. requested locale key
  2. `en` key
  3. key literal (dev-visible missing-key marker behavior)
- Keep catalog flat (single-depth map by string key) for low runtime overhead.
- Keep HTML in strings disallowed by default; allow only plain text values.

## 5. Binding Mechanism

- Runtime module file: `html/js/i18n/i18n.js`.
- Public API:
  - `BAGO.i18n.t(key, params?)`
  - `BAGO.i18n.set(locale)`
  - `BAGO.i18n.get()`
  - `BAGO.i18n.apply(root?)`
  - `BAGO.i18n.detectInitialLocale()`
- DOM binding conventions:
  - Text node binding:
    - `<span data-i18n="auth.login.title"></span>`
  - Attribute binding:
    - `<input data-i18n-attr="placeholder:auth.login.mobile_placeholder">`
  - Multi-attribute binding:
    - `<button data-i18n-attr="title:common.switch_lang,aria-label:common.switch_lang"></button>`
- Apply cycle:
  - On `DOMContentLoaded`: detect locale, set `<html lang>`, call `apply(document)`.
  - On toggle click: `set(locale)` -> save storage -> `apply(document)` -> dispatch `bago:locale-changed`.
- Global event:
  - `window.dispatchEvent(new CustomEvent("bago:locale-changed", { detail: { locale } }))`.
  - JS widgets listening must rerender labels.
- Dynamic content rule:
  - Never hardcode English in JS-rendered strings.
  - Use `BAGO.i18n.t("...")` in modules:
    - `html/js/prototype-page-loader.js`
    - `html/js/schedule-resident.js`
    - `html/js/schedule-lgu.js`
    - `html/js/report-submit.js`
    - `html/js/report-detail.js`
    - `html/js/eco-wallet.js`
    - `html/js/announcements-admin.js`
    - `html/js/in-app-notifications.js`
    - `html/js/collector-scan.js`
    - `html/js/xml-schedules-app.js`
    - `html/js/xml-barangays-app.js`
    - `html/js/components/xml-editor-modal.js`
    - `html/js/components/in-app-banner.js`
- Required bindings for attribute strings:
  - `placeholder`
  - `aria-label`
  - `title`
  - `alt`
  - `value` (for input buttons if used)

### Runtime Bootstrap Order

1. `html/js/i18n/strings.js`
2. `html/js/i18n/i18n.js`
3. page feature scripts
4. `BAGO.i18n.apply(document)` at page init

### Existing Script Integration Points

- `html/js/prototype-page-loader.js`:
  - modal titles/buttons/messages
  - fallback component labels
  - `alert(...)` copy
  - demo credentials modal copy
- `html/role-access.js`:
  - logout label currently hardcoded as `"Logout"`.
- `html/js/bago-api.js`:
  - convert displayed fallback prose to key-based map from error code.

## 6. Coverage Inventory

| Page | Strings to bind | Notes |
|---|---|---|
| `html/index.html` | loading text, fallback load error, auth links | Prototype shell; includes hardcoded “Loading login screen...” |
| `html/auth-web-login.html` | page title, any fallback shell labels | Core strings mostly from prototype components |
| `html/register.html` | load-error fallback text | Strings mostly from prototype components |
| `html/auth-web-register-collector.html` | page title / fallback labels | React prototype render path |
| `html/auth-web-register-lgu.html` | page title / fallback labels | React prototype render path |
| `html/dashboard-resident.html` | page title/fallback strings | Currently prototype render |
| `html/dashboard-collector.html` | page title/fallback strings | Currently prototype render |
| `html/dashboard-lgu.html` | headings, card labels, chart titles, export link labels, error text | Fully static live page with inline labels |
| `html/schedule.html` | headings, form labels/options/buttons/table headers | Live page + role-based panel switch |
| `html/report.html` | form labels/placeholders/options, section headings, status labels | Live page with resident and LGU/collector branches |
| `html/eco-points.html` | headings, table headers, status placeholders | Live page |
| `html/announcements.html` | form placeholders/options/buttons, feed headings | Live page with role branch |
| `html/collectors.html` | page title/fallback strings | Prototype render shell |
| `html/qr-audit.html` | heading, label, placeholder, button text, default result text | Live page |
| `html/compliance.html` | title/fallback strings | Prototype render shell |
| `html/denr-reports.html` | title/fallback strings | Prototype render shell |
| `html/users.html` | title/fallback strings | Prototype render shell |
| `html/xml-schedules-editor.html` | placeholders, button labels, table headers, view-mode banner text | Live XML editor |
| `html/xml-barangays-editor.html` | placeholders, button labels, filter option labels, table headers, view banner | Live XML editor |
| `html/js/prototype-page-loader.js` | alerts, modal copy, confirm/cancel labels, demo credentials, fallback component text | Highest string density; central migration target |
| `html/role-access.js` | logout nav link label, login validation messages | Direct text in validation and nav injection |
| `html/js/bago-api.js` | client fallback error prose (`Login failed`, `Registration failed`, etc.) | Convert to error code mapping |
| `html/js/components/in-app-banner.js` | empty states, banner metadata labels | ensure `t()` use in render path |
| `html/js/components/xml-editor-modal.js` | modal action labels (`Save`, `Cancel`, validation messages) | dynamic, event-driven |
| Shared navbar in `css/style.css` consumers | toggle labels `EN`, `TL`, `Language` tooltip | no text in CSS, but placement/styling needed |
| XML view `xml/schedules.xml` + `xsl/ecolinisph-schedules.xsl` | section headers, table headers, nav links, footer chrome text | data values remain source language |
| XML view `xml/barangays.xml` + `xsl/barangays.xsl` | page title, metadata labels, table headers, footer text | data values remain source language |
| Export transform `xsl/denr-report.xsl` | report title, subtitle, table headers | server export and browser preview consistency |

### Mandatory Shared Components

- Navbar language segment in all authenticated screens.
- Footer legal copy if present.
- Logout confirm modal in `prototype-page-loader.js`.
- Demo-credentials modal in `prototype-page-loader.js`.
- In-app toasts/banners (`schedule`, `report`, `announcements`, `eco` statuses).

## 7. Server-Side Messages

- API response contract must return stable `code` values (machine-consumable), not locale prose.
- Example:
  - `{ "code": "AUTH_INVALID_PIN", "error": "Invalid credentials" }`
  - `{ "code": "REPORT_UPLOAD_TOO_LARGE", "error": "Upload rejected" }`
- Client maps code -> localized display string from `errors.*`.
- Keep generic fallback for unknown code: `errors.unknown`.

### Required API Adjustments

- Add locale update endpoint:
  - `PATCH /api/auth/me/locale`
  - body: `{ "locale": "en" | "tl" }`
  - auth required
- Add migration:
  - `sql/migrations/00X_user_locale.sql`
  - add locale column to user identity record (`users.locale` logical field, mapped to implemented auth table).
- Login flow update:
  - after successful auth (`POST /api/auth/login`), include persisted locale in response payload when available.
- Error code adoption scope:
  - `server/routes/auth.js`
  - `server/routes/schedules.js`
  - `server/routes/reports.js`
  - `server/routes/eco-points.js`
  - `server/routes/rewards.js`
  - `server/routes/qr.js`
  - `server/routes/announcements.js`
  - `server/routes/analytics.js`
  - `server/routes/exports.js`
  - `server/routes/notifications.js`

## 8. XML / XSLT Layer

- XSL stylesheets must accept locale param:
  - `<xsl:param name="locale" select="'en'"/>`
- Define per-locale label maps in stylesheet scope.
- Use label resolver template or keyed variable selection for display chrome.
- Keep source XML values unchanged:
  - barangay names
  - waste types
  - schedule values
  - metrics

### XSL Locale Pattern

- In each XSL:
  - `xsl/ecolinisph-schedules.xsl`
  - `xsl/barangays.xsl`
  - `xsl/denr-report.xsl`
- Add:
  - locale param (`$locale`)
  - label variables for EN/TL
  - conditional selection based on `$locale`

### Editor + Preview Passing

- XML editor pages:
  - `html/xml-schedules-editor.html`
  - `html/xml-barangays-editor.html`
- When opening preview, append locale query:
  - `../xml/schedules.xml?locale=tl`
  - `../xml/barangays.xml?locale=tl`
- For server exports:
  - add optional query param `locale=en|tl` in:
    - `/api/exports/xml`
    - `/api/exports/denr-html`
    - `/api/exports/denr-pdf`
- Server export transformer must pass locale param into XSL transform engine (or equivalent generated HTML branch if transform step still staged).

## 9. Translation Style Guide

- Tagalog tone: conversational, practical, product UI tone.
- Prefer natural tech loanwords:
  - “Mag-login”
  - “I-report”
  - “Iskedyul”
  - “I-save”
- Avoid overly formal/purist terminology.
- Keep proper nouns and policy/legal refs unchanged:
  - BAGO.PH
  - RA 9003
  - DENR
  - LGU
  - CENRO
- Keep numeric/currency/date symbols unchanged.
- Date format: `MMM D, YYYY` for both locales.
- Buttons use imperative mood:
  - `Submit` / `Isumite`
  - `Save` / `I-save`
  - `Cancel` / `Kanselahin`
- Validation tone:
  - short, direct, corrective
  - no blame phrasing

## 10. Accessibility

- On locale switch:
  - set `document.documentElement.lang = "en" | "tl"`.
- Toggle semantics:
  - wrapper `role="group"`
  - buttons with `aria-pressed="true|false"`
  - clear `aria-label` like “Switch language to Tagalog”.
- Add live announcement region:
  - hidden element with `aria-live="polite"`.
  - update text on switch (localized):
    - EN: “Language changed to English.”
    - TL: “Napalitan ang wika sa Tagalog.”
- Ensure focus retention:
  - keep focus on toggle button after `apply()`.
- Re-apply translated `title`, `aria-label`, and `placeholder` attributes for assistive tech parity.

## 11. Acceptance Criteria

- [ ] Pre-auth pages show EN/TL toggle on `index`, `auth-web-login`, all `register*` pages.
- [ ] In-app pages show compact EN/TL switch in navbar or fallback floating slot.
- [ ] Locale change applies immediately without full reload.
- [ ] `bagoLocale` persists across reload and survives logout.
- [ ] First visit defaults by `navigator.language` (`tl|fil` -> `tl`, else `en`).
- [ ] Every page in coverage inventory has bound text keys or dynamic `t()` usage.
- [ ] JS-rendered modals (`modalAlert`, `modalConfirm`, demo credentials modal) honor locale.
- [ ] Validation and alert strings in `prototype-page-loader.js` and `role-access.js` are key-based.
- [ ] API errors are displayed via client code-map (`errors.*`), not backend prose.
- [ ] XML editor preview/export labels switch locale; XML data values remain untouched.
- [ ] `<html lang>` updates on every locale change.
- [ ] Screen-reader live region announces locale switches.
- [ ] No hardcoded English remains in inventoried page-level chrome and shared UI components.

