# BAGO.PH i18n Work Breakdown (`i18n-spec.md`)

## Summary
- Total subtasks: **82**
- Completed: **16 (20%)**
- Effort breakdown: **S×16 + M×53 + L×13**

| Main task ID | % complete |
|---|---:|
| `T-I18N-01` | 8 / 8 (100%) |
| `T-I18N-02` | 6 / 6 (100%) |
| `T-I18N-03` | 0 / 6 (0%) |
| `T-I18N-04` | 0 / 6 (0%) |
| `T-I18N-05` | 0 / 5 (0%) |
| `T-I18N-06` | 0 / 22 (0%) |
| `T-I18N-07` | 0 / 8 (0%) |
| `T-I18N-08` | 0 / 7 (0%) |
| `T-I18N-09` | 1 / 5 (20%) |
| `T-I18N-10` | 0 / 5 (0%) |
| `T-I18N-11` | 1 / 4 (25%) |

## T-I18N-01
**Goal** — Build core client i18n runtime and attribute-binding foundation for static HTML/JS pages.  
**Source ref** — §4, §5.  
**Subtasks**
- [x] (M) Create string catalog module with `window.BAGO_I18N` and key namespaces — `html/js/i18n/strings.js`.
- [x] (M) Create runtime module exposing `BAGO.i18n.t/set/get/apply/detectInitialLocale` — `html/js/i18n/i18n.js`.
- [x] (M) Implement `data-i18n` text-node binder — `html/js/i18n/i18n.js`.
- [x] (M) Implement `data-i18n-attr` parser supporting multi-attribute maps — `html/js/i18n/i18n.js`.
- [x] (S) Wire `DOMContentLoaded` bootstrap for locale detect + apply — `html/js/i18n/i18n.js` + page bootstraps.
- [x] (S) Emit `bago:locale-changed` custom event after locale swap — `html/js/i18n/i18n.js`.
- [x] (S) Add missing-key fallback chain (`requested -> en -> key`) — `html/js/i18n/i18n.js`.
- [x] (M) Include i18n scripts in pre-auth and live in-app pages — `html/*.html`.
**Completion** — **8 / 8 subtasks (100%)**.  
**Dependencies** — none.  
**Done when**
- `BAGO.i18n` global exists and callable on any page.
- `data-i18n*` attributes translate without reload.
- Locale change event broadcasts reliably.

## T-I18N-02
**Goal** — Implement locale persistence, detection, and client override behavior.  
**Source ref** — §2, §3, §5.  
**Subtasks**
- [x] (S) Add `bagoLocale` read/write utility with value guard (`en|tl`) — `html/js/i18n/i18n.js`.
- [x] (S) Implement first-visit detection via `navigator.language` (`tl|fil -> tl`) — `html/js/i18n/i18n.js`.
- [x] (S) Persist explicit user choice and override detection on subsequent loads — `html/js/i18n/i18n.js`.
- [x] (S) Keep `bagoLocale` intact on logout flow — `html/role-access.js`, `html/js/prototype-page-loader.js`.
- [x] (M) Sync chosen locale after successful auth login/register flow — `html/js/prototype-page-loader.js`.
- [x] (M) Load user locale from profile response if available and reconcile with local override — `html/js/bago-api.js` + auth flow handlers.
**Completion** — **6 / 6 subtasks (100%)**.  
**Dependencies** — `T-I18N-01`.  
**Done when**
- Reload preserves locale across sessions.
- Explicit toggle choice beats browser auto-detection.
- Logout does not reset language setting.

## T-I18N-03
**Goal** — Add DB/API support for persisted user locale and code-based localized errors.  
**Source ref** — §3, §7.  
**Subtasks**
- [ ] (M) Add locale column migration (`users.locale` logical field) — `sql/migrations/00X_user_locale.sql`.
- [ ] (M) Update schema baseline to include locale field for fresh installs — `sql/bago_ph_database.sql`.
- [ ] (M) Add authenticated locale update endpoint — `PATCH /api/auth/me/locale` in `server/routes/auth.js`.
- [ ] (M) Return locale in auth/login profile payloads for client sync — `server/routes/auth.js`.
- [ ] (M) Refactor API error responses to stable `code` values (not locale prose) — `server/routes/*.js`.
- [ ] (M) Keep locale queries parameterized in update/read operations — `server/routes/auth.js` SQL calls.
**Completion** — **0 / 6 subtasks (0%)**.  
**Dependencies** — `T-I18N-02`.  
**Done when**
- Locale value persists per user record.
- Client can patch and re-read locale from API.
- Frontend can map error `code` to translated strings.

## T-I18N-04
**Goal** — Ship pre-auth locale selector UI with keyboard/accessibility behavior.  
**Source ref** — §2, §10.  
**Subtasks**
- [ ] (M) Add EN/TL selector on `html/index.html` auth shell and fallback state.
- [ ] (M) Add EN/TL selector on `html/auth-web-login.html` auth card area.
- [ ] (M) Add EN/TL selector on `html/register.html` auth shell.
- [ ] (S) Add EN/TL selector on `html/auth-web-register-collector.html`.
- [ ] (S) Add EN/TL selector on `html/auth-web-register-lgu.html`.
- [ ] (M) Add active-state styling + `aria-pressed` + keyboard focus handling for pre-auth selectors — auth page markup + CSS class hooks.
**Completion** — **0 / 6 subtasks (0%)**.  
**Dependencies** — `T-I18N-01`, `T-I18N-02`.  
**Done when**
- All pre-auth pages expose working selector.
- Active locale visibly highlighted.
- Selector works by mouse and keyboard.

## T-I18N-05
**Goal** — Add persistent in-app selector for authenticated navigation contexts.  
**Source ref** — §2, §5, §10.  
**Subtasks**
- [ ] (M) Add compact `EN | TL` control in authenticated navbar pattern — pages using `nav ul` + `css/style.css`.
- [ ] (M) Add floating fallback selector for live pages without `<nav>` (`schedule`, `report`, `eco-points`, `announcements`, `dashboard-lgu`, `qr-audit`, XML editors).
- [ ] (M) Wire selector reapply-on-navigation across role-based pages — `html/role-access.js` + page init scripts.
- [ ] (S) Apply locale change without full reload in all in-app pages — page script integrations.
- [ ] (S) Keep selector state synced with `bagoLocale` on page entry — i18n runtime + page bootstrap.
**Completion** — **0 / 5 subtasks (0%)**.  
**Dependencies** — `T-I18N-04`.  
**Done when**
- Authenticated users can switch language anywhere in app.
- Switching does not reload page.
- Selector remains consistent between pages.

## T-I18N-06
**Goal** — Extract and bind translatable strings per page inventory from `i18n-spec.md` §6.  
**Source ref** — §4, §5, §6.  
**Subtasks**
- [ ] (M) Bind auth shell strings on `html/index.html` to `auth.*` keys.
- [ ] (S) Bind auth shell strings on `html/auth-web-login.html` to `auth.*` keys.
- [ ] (M) Bind auth shell strings on `html/register.html` to `auth.*` keys.
- [ ] (S) Bind auth shell strings on `html/auth-web-register-collector.html` to `auth.*` keys.
- [ ] (S) Bind auth shell strings on `html/auth-web-register-lgu.html` to `auth.*` keys.
- [ ] (M) Bind resident dashboard shell strings on `html/dashboard-resident.html` to `resident.*` keys.
- [ ] (M) Bind collector dashboard shell strings on `html/dashboard-collector.html` to `collectors.*` keys.
- [ ] (M) Bind LGU dashboard labels/charts/export links on `html/dashboard-lgu.html` to `lgu.*` keys.
- [ ] (M) Bind schedule page headings/forms/table labels on `html/schedule.html` to `schedule.*` keys.
- [ ] (M) Bind report page headings/forms/placeholders/status labels on `html/report.html` to `report.*` keys.
- [ ] (M) Bind eco-points wallet/catalog/ledger labels on `html/eco-points.html` to `ecopoints.*` keys.
- [ ] (M) Bind announcements page compose/feed labels on `html/announcements.html` to `announcements.*` keys.
- [ ] (M) Bind collector shell strings on `html/collectors.html` to `collectors.*` keys.
- [ ] (S) Bind QR audit labels/placeholders/results baseline on `html/qr-audit.html` to `qr.*` keys.
- [ ] (M) Bind compliance shell strings on `html/compliance.html` to `lgu.compliance.*` keys.
- [ ] (M) Bind DENR shell strings on `html/denr-reports.html` to `lgu.denr.*` keys.
- [ ] (M) Bind users shell strings on `html/users.html` to `lgu.users.*` keys.
- [ ] (M) Bind XML schedules editor controls/table headers on `html/xml-schedules-editor.html` to `xml.schedules.*` keys.
- [ ] (M) Bind XML barangays editor controls/table headers on `html/xml-barangays-editor.html` to `xml.barangays.*` keys.
- [ ] (M) Define EN keyset for all pages above in `html/js/i18n/strings.js`.
- [ ] (L) Define TL keyset parity for all pages above in `html/js/i18n/strings.js`.
- [ ] (M) Add shared `common.*` keys for repeated labels (`save`, `cancel`, `search`, `status`, `actions`) and replace duplicates.
**Completion** — **0 / 22 subtasks (0%)**.  
**Dependencies** — `T-I18N-01`, `T-I18N-05`.  
**Done when**
- Every inventoried page renders from catalog keys.
- EN and TL catalogs have key parity.
- No remaining hardcoded UI chrome text in listed pages.

## T-I18N-07
**Goal** — Localize JS-rendered content, validations, modals, and error surfaces.  
**Source ref** — §5, §6, §7.  
**Subtasks**
- [ ] (L) Replace hardcoded modal copy in `html/js/prototype-page-loader.js` (`modalAlert`, `modalConfirm`, demo credentials).
- [ ] (L) Replace hardcoded `alert(...)` validation/login/register/report copy in `html/js/prototype-page-loader.js`.
- [ ] (M) Localize logout link text + auth validation messages in `html/role-access.js`.
- [ ] (M) Localize banner/toast text paths in `html/js/components/in-app-banner.js` and feed renderers.
- [ ] (M) Localize dynamic card/list rendering in `html/js/announcements-admin.js`, `html/js/in-app-notifications.js`, `html/js/eco-wallet.js`.
- [ ] (M) Localize dynamic schedule/report renderers in `html/js/schedule-resident.js`, `html/js/schedule-lgu.js`, `html/js/report-detail.js`, `html/js/report-submit.js`.
- [ ] (M) Localize XML modal/button/validation dynamic strings in `html/js/components/xml-editor-modal.js`, `html/js/xml-schedules-app.js`, `html/js/xml-barangays-app.js`.
- [ ] (M) Implement error code -> localized message mapping layer in `html/js/bago-api.js` + `errors.*` catalog.
**Completion** — **0 / 8 subtasks (0%)**.  
**Dependencies** — `T-I18N-03`, `T-I18N-06`.  
**Done when**
- Runtime-generated text respects active locale.
- Validation and modal copy no longer fixed English.
- API errors display localized mapped messages.

## T-I18N-08
**Goal** — Add locale-aware XSLT chrome translation and pass locale from editor/export flows.  
**Source ref** — §8.  
**Subtasks**
- [ ] (M) Add `$locale` param + label maps in `xsl/ecolinisph-schedules.xsl`.
- [ ] (M) Add `$locale` param + label maps in `xsl/barangays.xsl`.
- [ ] (M) Add `$locale` param + label maps in `xsl/denr-report.xsl`.
- [ ] (M) Update XML schedules editor preview trigger to pass locale query/param — `html/js/xml-schedules-app.js`.
- [ ] (M) Update XML barangays editor preview trigger to pass locale query/param — `html/js/xml-barangays-app.js`.
- [ ] (M) Add `locale` query handling to export endpoints (`/api/exports/xml`, `/api/exports/denr-html`, `/api/exports/denr-pdf`) — `server/routes/exports.js`.
- [ ] (S) Keep XML data values untranslated while only XSL chrome labels switch language — XSL template logic + tests.
**Completion** — **0 / 7 subtasks (0%)**.  
**Dependencies** — `T-I18N-06`, `T-I18N-07`.  
**Done when**
- XSL output labels switch EN/TL by locale parameter.
- Editor preview/export carries active locale.
- Raw XML content values remain unchanged.

## T-I18N-09
**Goal** — Meet accessibility behavior for locale switching and announcement semantics.  
**Source ref** — §10.  
**Subtasks**
- [x] (S) Keep baseline document language declared in markup (`<html lang="en">`) across current HTML pages — `html/*.html`.
- [ ] (M) Update `document.documentElement.lang` on locale change at runtime — `html/js/i18n/i18n.js`.
- [ ] (M) Implement selector `role="group"` and `aria-pressed` state on EN/TL buttons — selector markup in auth/in-app pages.
- [ ] (S) Add `aria-live="polite"` locale-change announcement region and localized message text — shared i18n runtime.
- [ ] (S) Preserve keyboard focus on selector after DOM re-apply cycle — `html/js/i18n/i18n.js`.
**Completion** — **1 / 5 subtasks (20%)**.  
**Dependencies** — `T-I18N-04`, `T-I18N-05`.  
**Done when**
- Screen readers receive locale-change announcement.
- Toggle state is exposed via ARIA.
- Focus does not jump/loss after switch.

## T-I18N-10
**Goal** — Execute QA pass for bilingual behavior across pages/browsers/accessibility checks.  
**Source ref** — §11.  
**Subtasks**
- [ ] (M) Run acceptance checklist on all pages from `i18n-spec.md` §6 and record results — `docs/qa/i18n-acceptance-checklist.md`.
- [ ] (S) Run screen-reader spot check (EN/TL toggle announcements) and document findings — `docs/qa/i18n-screen-reader-check.md`.
- [ ] (S) Run cross-browser pass (Chrome, Edge, Firefox) including XML/XSLT preview behavior — `docs/qa/i18n-cross-browser.md`.
- [ ] (M) Add regression check for hardcoded English scan (`rg` report) and fail list — `docs/qa/i18n-hardcoded-scan.md`.
- [ ] (S) Verify API error-code localization map with sample failures — `docs/qa/i18n-api-error-map-check.md`.
**Completion** — **0 / 5 subtasks (0%)**.  
**Dependencies** — `T-I18N-06`, `T-I18N-07`, `T-I18N-08`, `T-I18N-09`.  
**Done when**
- Checklist covers every inventoried page.
- Browser/accessibility reports logged and reproducible.
- Hardcoded text scan report is clean or triaged.

## T-I18N-11
**Goal** — Document i18n operation, contributor workflow, and translator handoff process.  
**Source ref** — §9, §11.  
**Subtasks**
- [ ] (S) Add README section for language selector usage and fallback behavior — `README.md`.
- [ ] (S) Add contributor guide for adding new keys and binding attributes — `docs/i18n/contributor-guide.md`.
- [ ] (S) Add translator handoff document (tone/style/key context) — `docs/i18n/translator-handoff.md`.
- [x] (S) Keep core implementation spec documented for build handoff — `i18n-spec.md`.
**Completion** — **1 / 4 subtasks (25%)**.  
**Dependencies** — `T-I18N-10`.  
**Done when**
- Engineers have clear key/binding workflow docs.
- Translators get context and style guardrails.
- README exposes locale feature behavior for testers/users.

