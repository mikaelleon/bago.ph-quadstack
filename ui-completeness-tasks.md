# UI Completeness Tasks — BAGO.PH

## Summary
- Total subtasks: `210`
- Completed: `101 (48%)`
- Effort breakdown: `S×166 + M×35 + L×9`

| Main task | % complete |
|---|---:|
| `T-UI-01` | 93% |
| `T-UI-02` | 100% |
| `T-UI-03` | 100% |
| `T-UI-04` | 57% |
| `T-UI-05` | 58% |
| `T-UI-06` | 56% |
| `T-UI-07` | 21% |
| `T-UI-08` | 0% |
| `T-UI-09` | 13% |
| `T-UI-10` | 0% |

| Page | % complete |
|---|---:|
| `html/index.html` | 43% |
| `html/auth-web-login.html` | 14% |
| `html/register.html` | 14% |
| `html/auth-web-register-collector.html` | 14% |
| `html/auth-web-register-lgu.html` | 14% |
| `html/dashboard-resident.html` | 17% |
| `html/schedule.html` | 14% |
| `html/report.html` | 43% |
| `html/eco-points.html` | 50% |
| `html/announcements.html` | 43% |
| `html/dashboard-collector.html` | 17% |
| `html/collectors.html` | 17% |
| `html/qr-audit.html` | 29% |
| `html/dashboard-lgu.html` | 50% |
| `html/compliance.html` | 83% |
| `html/denr-reports.html` | 17% |
| `html/users.html` | 17% |
| `html/xml-schedules-editor.html` | 43% |
| `html/xml-barangays-editor.html` | 43% |

## T-UI-01
**ID** — `T-UI-01`  
**Goal** — Normalize design tokens and shared component primitives into single reusable baseline.  
**Source ref** — `ui-completeness-spec.md` §3.

**Subtasks**
- [x] (M) Create `css/tokens.css` and move canonical color/type/spacing/radius/elevation/motion tokens there — artifact: `css/tokens.css`.
- [x] (S) Keep existing base token set from `css/style.css` as migration source — artifact: `css/style.css` `:root` token block.
- [x] (S) Keep extended token set from `css/bento.css` as migration source — artifact: `css/bento.css` `:root` token block.
- [x] (M) Define primary/secondary/neutral 50-900 scales and map aliases used by pages — artifact: token scale table in `css/tokens.css`.
- [x] (S) Define spacing scale `4/8/12/16/24/32/48` and replace ad hoc values in shared classes — artifact: spacing vars + updated shared classes.
- [x] (S) Define type scale tokens (`xs`..`display`) and replace hard-coded sizes in shared components — artifact: typography tokens + refactored CSS.
- [x] (M) Build unified button component classes (`primary/secondary/ghost/danger`, `sm/md/lg`, `loading`, `disabled`) — artifact: `css/components/button.css` or equivalent shared block.
- [x] (M) Build unified field component classes (`input/select/textarea`, `error`, `disabled`, `hint`) — artifact: `css/components/forms.css`.
- [x] (M) Build shared table component classes (`sortable`, `loading`, `empty`, `pagination`) — artifact: `css/components/table.css`.
- [x] (S) Reuse existing modal base class set in bento system as foundation — artifact: `css/bento.css` `.bento-modal*`.
- [x] (M) Build shared toast component styles + tokens — artifact: `css/components/toast.css`.
- [x] (M) Build shared skeleton component styles (`row/card/button`) — artifact: `css/components/skeleton.css`.
- [x] (M) Build shared breadcrumb + dropdown + tabs component styles — artifact: `css/components/navigation.css`.
- [ ] (L) Remove duplicate inline per-page style blocks by migrating common rules to shared CSS — artifact: reduced inline `<style>` blocks in `html/*.html`.
- [x] (S) Preserve global Poppins baseline until tokenized typography rollout completes — artifact: `html/js/bago-env.js` font bootstrap.

**Completion** — `14 / 15 subtasks (93%)`  
**Dependencies** — none  
**Done when**
- Shared token source exists and pages consume it.
- Shared component classes cover required states.
- Duplicate style definitions removed from page-local inline blocks.

## T-UI-02
**ID** — `T-UI-02`  
**Goal** — Implement consistent feedback layer for loading/empty/error/success/destructive flows.  
**Source ref** — `ui-completeness-spec.md` §6.

**Subtasks**
- [x] (M) Build shared `Toast` JS module with auto-dismiss (3s), dismiss button, `aria-live` region — artifact: `html/js/components/toast.js`.
- [x] (S) Reuse existing banner mount helper as baseline alert presenter — artifact: `html/js/components/in-app-banner.js`.
- [x] (M) Build shared region error banner with retry button API (`renderError({message,retry})`) — artifact: `html/js/components/error-banner.js`.
- [x] (M) Build shared skeleton helpers for list/table placeholders — artifact: `html/js/components/skeleton.js`.
- [x] (S) Add upload progress pattern helper for photo/report uploads — artifact: `html/js/components/upload-progress.js`.
- [x] (M) Replace page-level plain text success messages with toast calls (`report`, `eco-points`, `announcements`) — artifact: updated `html/js/report-submit.js`, `html/js/eco-wallet.js`, `html/js/announcements-admin.js`.
- [x] (M) Replace page-level plain text error messages with alert/banner components and retry actions — artifact: updated live modules with retry callbacks.
- [x] (S) Keep shared modal utility as destructive-action base before migration — artifact: `html/js/components/xml-editor-modal.js`.
- [x] (M) Implement typed-confirm destructive modal variant for multi-record deletes — artifact: modal API + usage in schedule/xml delete flows.
- [x] (S) Document feedback usage contract for all page modules — artifact: `docs/ui/feedback-contract.md`.

**Completion** — `10 / 10 subtasks (100%)`  
**Dependencies** — `T-UI-01`  
**Done when**
- Toast/Banner/Skeleton/Destructive confirm components available and used.
- Success and error UX no longer page-specific plain text hacks.
- Retry path exists in each error-rendering region.

## T-UI-03
**ID** — `T-UI-03`  
**Goal** — Remove native dialogs and migrate all runtime flows to shared modal system.  
**Source ref** — `ui-completeness-spec.md` §6.5, §6.7.

**Subtasks**
- [x] (M) Replace `alert()/confirm()/prompt()` in `html/js/prototype-page-loader.js` with shared modal/toast calls — artifact: no native dialog calls in file.
- [x] (S) Replace `confirm()/prompt()` in `html/js/schedule-lgu.js` with shared modal flows — artifact: edit/delete schedule uses modal UI.
- [x] (M) Replace `confirm()` in `html/js/xml-schedules-app.js` with destructive modal + optional typed confirm — artifact: XML schedules delete flows modalized.
- [x] (M) Replace `confirm()` in `html/js/xml-barangays-app.js` with destructive modal + optional typed confirm — artifact: XML barangays delete flows modalized.

**Completion** — `4 / 4 subtasks (100%)`  
**Dependencies** — `T-UI-01`, `T-UI-02`  
**Done when**
- `rg "prompt\\(|alert\\(|confirm\\(" html/js` returns no runtime UI hits.
- All destructive actions route through shared modal API.

## T-UI-04
**ID** — `T-UI-04`  
**Goal** — Achieve live data wiring and four-state coverage on every §4 inventory page.  
**Source ref** — `ui-completeness-spec.md` §2.1, §2.2, §4.

**Subtasks**
- [x] (S) Add/keep `Loaded` state on `html/index.html` auth shell render path — artifact: `window.BAGOPrototype.render("LoginScreen")`.
- [x] (S) Add explicit `Loading` state on `html/index.html` — artifact: “Loading login screen...” block.
- [ ] (S) Add explicit `Empty` auth-shell state on `html/index.html` for no available auth options — artifact: empty-state block in page script.
- [x] (S) Add explicit `Error` state on `html/index.html` script failure — artifact: `hardFallback(...)` block.
- [ ] (M) Replace prototype-only auth shell with fully live API-driven login UI on `html/index.html` — artifact: no prototype render dependency for core login.

- [x] (S) Add/keep `Loaded` state on `html/auth-web-login.html` — artifact: `window.BAGOPrototype.render("AuthWebLogin")`.
- [ ] (S) Add explicit `Loading` state on `html/auth-web-login.html` — artifact: loading placeholder prior render.
- [ ] (S) Add explicit `Empty` state on `html/auth-web-login.html` — artifact: empty auth-provider state block.
- [ ] (S) Add explicit `Error` state on `html/auth-web-login.html` — artifact: visible load/auth bootstrap error block.
- [ ] (M) Replace prototype-only auth render with live login page DOM flow on `html/auth-web-login.html` — artifact: direct form + API flow without prototype screen.

- [x] (S) Add/keep `Loaded` state on `html/register.html` — artifact: `window.BAGOPrototype.render("RegisterScreen")`.
- [ ] (S) Add explicit `Loading` state on `html/register.html` — artifact: render-time loading block.
- [ ] (S) Add explicit `Empty` state on `html/register.html` — artifact: no-city/barangay source empty-state block.
- [ ] (S) Add explicit `Error` state on `html/register.html` — artifact: bootstrap/register error region.
- [ ] (M) Replace prototype-only registration shell with live registration form DOM flow — artifact: direct form + API path.

- [x] (S) Add/keep `Loaded` state on `html/auth-web-register-collector.html` — artifact: `window.BAGOPrototype.render("AuthWebRegisterCollector")`.
- [ ] (S) Add explicit `Loading` state on `html/auth-web-register-collector.html` — artifact: loading placeholder.
- [ ] (S) Add explicit `Empty` state on `html/auth-web-register-collector.html` — artifact: empty invite/source state.
- [ ] (S) Add explicit `Error` state on `html/auth-web-register-collector.html` — artifact: bootstrap/register error region.
- [ ] (M) Replace prototype-only collector registration with live collector enrollment flow — artifact: DOM form + API wiring.

- [x] (S) Add/keep `Loaded` state on `html/auth-web-register-lgu.html` — artifact: `window.BAGOPrototype.render("AuthWebRegisterAdmin")`.
- [ ] (S) Add explicit `Loading` state on `html/auth-web-register-lgu.html` — artifact: loading placeholder.
- [ ] (S) Add explicit `Empty` state on `html/auth-web-register-lgu.html` — artifact: empty LGU source/options block.
- [ ] (S) Add explicit `Error` state on `html/auth-web-register-lgu.html` — artifact: bootstrap/register error region.
- [ ] (M) Replace prototype-only LGU registration with live DOM enrollment flow — artifact: form + API wiring.

- [x] (S) Add/keep `Loaded` state on `html/dashboard-resident.html` — artifact: `window.BAGOPrototype.render("ResidentWebHome")`.
- [ ] (S) Add explicit `Loading` state on `html/dashboard-resident.html` — artifact: dashboard skeleton.
- [ ] (S) Add explicit `Empty` state on `html/dashboard-resident.html` — artifact: no data empty cards.
- [ ] (S) Add explicit `Error` state on `html/dashboard-resident.html` — artifact: retry-able error region.
- [ ] (L) Replace prototype dashboard with live resident dashboard widgets/API calls — artifact: live module + API requests.

- [x] (S) Add/keep `Loaded` state on `html/schedule.html` — artifact: resident/LGU panels render schedule data.
- [x] (S) Add explicit `Loading` state on `html/schedule.html` — artifact: schedule skeleton while fetching.
- [x] (S) Add explicit `Empty` state on `html/schedule.html` — artifact: no-schedules empty panel.
- [x] (S) Add explicit `Error` state on `html/schedule.html` — artifact: retry-able schedule error banner.
- [x] (S) Keep live data fetch wiring on `html/schedule.html` (`/api/schedules`, `/api/barangays`) — artifact: `html/js/schedule-resident.js`, `html/js/schedule-lgu.js`.

- [x] (S) Add/keep `Loaded` state on `html/report.html` — artifact: resident timeline + LGU report list/map render.
- [ ] (S) Add explicit `Loading` state on `html/report.html` — artifact: report skeleton/loading region.
- [x] (S) Add explicit `Empty` state on `html/report.html` — artifact: “No reports found.” in `html/js/report-map.js`.
- [x] (S) Add explicit `Error` state on `html/report.html` — artifact: submit/status message errors in `report-submit.js`/`report-map.js`.
- [x] (S) Keep live data fetch wiring on `html/report.html` (`/api/reports`, status patch) — artifact: `html/js/report-submit.js`, `html/js/report-detail.js`, `html/js/report-map.js`.

- [x] (S) Add/keep `Loaded` state on `html/eco-points.html` — artifact: wallet/catalog/ledger renders.
- [x] (S) Add explicit `Loading` state on `html/eco-points.html` — artifact: “Loading wallet...” default state.
- [x] (S) Add explicit `Empty` state on `html/eco-points.html` — artifact: no-ledger/no-rewards empty blocks.
- [x] (S) Add explicit `Error` state on `html/eco-points.html` — artifact: redeem failure status text path.
- [x] (S) Keep live data fetch wiring on `html/eco-points.html` (`/api/eco-points/ledger`, `/api/rewards/*`) — artifact: `html/js/eco-wallet.js`.

- [x] (S) Add/keep `Loaded` state on `html/announcements.html` — artifact: admin feed + notification cards render.
- [x] (S) Add explicit `Loading` state on `html/announcements.html` — artifact: loading skeleton/placeholder on feed.
- [x] (S) Add explicit `Empty` state on `html/announcements.html` — artifact: “No notifications yet.” in `html/js/in-app-notifications.js`.
- [x] (S) Add explicit `Error` state on `html/announcements.html` — artifact: publish failure status in `html/js/announcements-admin.js`.
- [x] (S) Keep live data fetch wiring on `html/announcements.html` (`/api/announcements`, `/api/notifications`) — artifact: announcement + notification modules.

- [x] (S) Add/keep `Loaded` state on `html/dashboard-collector.html` — artifact: `window.BAGOPrototype.render("CollectorWebRoute")`.
- [ ] (S) Add explicit `Loading` state on `html/dashboard-collector.html` — artifact: collector dashboard skeleton.
- [ ] (S) Add explicit `Empty` state on `html/dashboard-collector.html` — artifact: no-assigned-route empty panel.
- [ ] (S) Add explicit `Error` state on `html/dashboard-collector.html` — artifact: retry-able error panel.
- [ ] (L) Replace prototype collector dashboard with live collector dashboard data flow — artifact: dedicated live module + API calls.

- [x] (S) Add/keep `Loaded` state on `html/collectors.html` — artifact: role-switched prototype render (`CollectorReports`/`AdminCollectors`).
- [ ] (S) Add explicit `Loading` state on `html/collectors.html` — artifact: loading placeholder per role path.
- [ ] (S) Add explicit `Empty` state on `html/collectors.html` — artifact: empty collectors/fleet state.
- [ ] (S) Add explicit `Error` state on `html/collectors.html` — artifact: retry-able error block.
- [ ] (L) Replace prototype collectors/admin collectors with live collector/fleet data UI — artifact: live page module + API wiring.

- [x] (S) Add/keep `Loaded` state on `html/qr-audit.html` — artifact: result `pre` renders scan output.
- [x] (S) Add explicit `Loading` state on `html/qr-audit.html` — artifact: pending scan indicator.
- [x] (S) Add explicit `Empty` state on `html/qr-audit.html` — artifact: “No scan yet.” initial state.
- [x] (S) Add explicit `Error` state on `html/qr-audit.html` — artifact: error JSON output on failed scan.
- [x] (S) Keep live data fetch wiring on `html/qr-audit.html` (`/api/qr/scan`) — artifact: `html/js/collector-scan.js`.

- [x] (S) Add/keep `Loaded` state on `html/dashboard-lgu.html` — artifact: metrics/charts render from analytics response.
- [x] (S) Add explicit `Loading` state on `html/dashboard-lgu.html` — artifact: dashboard skeleton while analytics loads.
- [x] (S) Add explicit `Empty` state on `html/dashboard-lgu.html` — artifact: no-analytics-data empty view.
- [x] (S) Add explicit `Error` state on `html/dashboard-lgu.html` — artifact: `#dashboard-error` path in `html/js/dashboard-lgu.js`.
- [x] (S) Keep live data fetch wiring on `html/dashboard-lgu.html` (`/api/analytics/overview`, `/api/exports/*`) — artifact: `html/js/dashboard-lgu.js` + export links.

- [x] (S) Add/keep `Loaded` state on `html/compliance.html` — artifact: metrics + status rows render.
- [x] (S) Add explicit `Loading` state on `html/compliance.html` — artifact: “Loading analytics...” status.
- [x] (S) Add explicit `Empty` state on `html/compliance.html` — artifact: “No status rows available.” row.
- [x] (S) Add explicit `Error` state on `html/compliance.html` — artifact: error message path in `html/js/compliance.js`.
- [x] (S) Keep live data fetch wiring on `html/compliance.html` (`/api/analytics/overview`) — artifact: `html/js/compliance.js`.

- [x] (S) Add/keep `Loaded` state on `html/denr-reports.html` — artifact: `window.BAGOPrototype.render("AdminDENRReport")`.
- [ ] (S) Add explicit `Loading` state on `html/denr-reports.html` — artifact: loading placeholders.
- [ ] (S) Add explicit `Empty` state on `html/denr-reports.html` — artifact: empty DENR dataset panel.
- [ ] (S) Add explicit `Error` state on `html/denr-reports.html` — artifact: retry-able export/load error panel.
- [ ] (L) Replace prototype DENR page with live export preview/actions UI (`/api/exports/denr-*`) — artifact: live DENR page module.

- [x] (S) Add/keep `Loaded` state on `html/users.html` — artifact: `window.BAGOPrototype.render("AdminResidents")`.
- [ ] (S) Add explicit `Loading` state on `html/users.html` — artifact: user list skeleton.
- [ ] (S) Add explicit `Empty` state on `html/users.html` — artifact: no-users empty panel.
- [ ] (S) Add explicit `Error` state on `html/users.html` — artifact: retry-able users error panel.
- [ ] (L) Replace prototype users page with live user-management data/actions UI — artifact: live users module + API integration.

- [x] (S) Add/keep `Loaded` state on `html/xml-schedules-editor.html` — artifact: XML tables render after load.
- [x] (S) Add explicit `Loading` state on `html/xml-schedules-editor.html` — artifact: loading block while XML source resolves.
- [x] (S) Add explicit `Empty` state on `html/xml-schedules-editor.html` — artifact: empty-state row/placeholder when sections have zero rows.
- [x] (S) Add explicit `Error` state on `html/xml-schedules-editor.html` — artifact: visible parse/load error banner.
- [x] (S) Keep live XML/XSL data wiring on `html/xml-schedules-editor.html` — artifact: `html/js/xml-schedules-app.js` + `xml/schedules.xml` + preview.

- [x] (S) Add/keep `Loaded` state on `html/xml-barangays-editor.html` — artifact: XML table renders after load.
- [x] (S) Add explicit `Loading` state on `html/xml-barangays-editor.html` — artifact: loading block while XML source resolves.
- [x] (S) Add explicit `Empty` state on `html/xml-barangays-editor.html` — artifact: empty-state row/placeholder when zero barangays.
- [x] (S) Add explicit `Error` state on `html/xml-barangays-editor.html` — artifact: visible parse/load error banner.
- [x] (S) Keep live XML/XSL data wiring on `html/xml-barangays-editor.html` — artifact: `html/js/xml-barangays-app.js` + `xml/barangays.xml` + preview.

**Completion** — `54 / 95 subtasks (57%)`  
**Dependencies** — `T-UI-01`, `T-UI-02`, `T-UI-03`  
**Done when**
- Every inventory page has explicit Load/Empty/Error/Loaded UX.
- Every inventory page is live-wired to API/XML source.
- Prototype-only required pages replaced with live production views.

## T-UI-05
**ID** — `T-UI-05`  
**Goal** — Implement full form validation contract with inline errors and submit-state binding.  
**Source ref** — `ui-completeness-spec.md` §2.4, §5.

**Subtasks**
- [ ] (M) Implement inline validation + disabled submit for resident/collector login form (`html/index.html` flow) — artifact: field-level error elements + submit state.
- [ ] (M) Implement inline validation + disabled submit for LGU login (`html/auth-web-login.html`) — artifact: gov email + password rule binding.
- [ ] (M) Implement inline validation + submit-state binding for resident registration (`html/register.html`) — artifact: name/mobile/barangay/PIN rules.
- [ ] (M) Implement inline validation + submit-state binding for collector registration (`html/auth-web-register-collector.html`) — artifact: invite/ID rules.
- [ ] (M) Implement inline validation + submit-state binding for LGU registration (`html/auth-web-register-lgu.html`) — artifact: `.gov.ph` + password policy + doc requirement.
- [x] (M) Implement full inline validation for report submit (`html/report.html`, `html/js/report-submit.js`) — artifact: file type/size/geolocation/required errors.
- [x] (M) Implement full inline validation for schedule create form (`html/schedule.html`, `html/js/schedule-lgu.js`) — artifact: field and time/date logical checks.
- [x] (S) Implement inline validation + submit state for announcement publish form (`html/announcements.html`) — artifact: title/message constraints + disabled submit.
- [x] (S) Implement inline validation + submit state for report status update form (`html/report.html`) — artifact: ID/status checks + inline errors.
- [x] (S) Implement inline validation + submit state for QR audit form (`html/qr-audit.html`) — artifact: token format errors under input.
- [x] (S) Keep/extend inline modal validation path in XML schedules editor forms — artifact: `validate(...)` callbacks in `html/js/xml-schedules-app.js`.
- [x] (S) Keep/extend inline modal validation path in XML barangays editor forms — artifact: `validate(...)` callbacks in `html/js/xml-barangays-app.js`.

**Completion** — `7 / 12 subtasks (58%)`  
**Dependencies** — `T-UI-01`, `T-UI-02`, `T-UI-03`, `T-UI-04`  
**Done when**
- Every form in §5 has inline per-field validation and submit-state binding.
- Validation messages no longer rely on alert dialogs.
- Contract rules (mobile/PIN/gov email/password/barangay/file/geolocation) enforced client-side.

## T-UI-06
**ID** — `T-UI-06`  
**Goal** — Complete navigation system: mobile behavior, route indicators, breadcrumbs, preserved back state, and 403/404 pages.  
**Source ref** — `ui-completeness-spec.md` §7.

**Subtasks**
- [x] (S) Keep existing mobile navbar collapse baseline classes in shared CSS — artifact: `css/style.css` nav media query + toggle classes.
- [ ] (M) Apply mobile navbar collapse behavior to every authenticated page shell — artifact: consistent nav toggle script + markup across pages.
- [x] (S) Keep active-route indicator on LGU dashboard shell as baseline pattern — artifact: `.navlist a.active` in `html/dashboard-lgu.html`.
- [ ] (M) Add active-route indicator on all authenticated pages (resident/collector/LGU/tool pages) — artifact: shared route-highlighting helper.
- [x] (M) Add breadcrumb component to nested LGU pages (`denr-reports`, `users`, `xml-*`) — artifact: breadcrumb markup + style + route data.
- [ ] (M) Implement querystring-preserving back navigation for detail flows — artifact: filter state preserved in URL and restored on return.
- [x] (S) Add styled `html/403.html` page and hook forbidden redirects there — artifact: new page + guard redirect path.
- [x] (S) Add styled `html/404.html` page and hook unknown routes there — artifact: new page + route fallback.
- [ ] (M) Unify client role guard matrix between `html/role-access.js` and `html/js/prototype-page-loader.js` — artifact: single source mapping + tests/doc.

**Completion** — `5 / 9 subtasks (56%)`  
**Dependencies** — `T-UI-01`, `T-UI-04`  
**Done when**
- All authenticated pages share consistent responsive navigation.
- 403/404 pages exist and wired.
- Route/role behavior consistent across client and server guards.

## T-UI-07
**ID** — `T-UI-07`  
**Goal** — Finish responsive pass on every inventory page for 360/768/1024/1440.  
**Source ref** — `ui-completeness-spec.md` §2.5, §8.

**Subtasks**
- [ ] (S) Validate/fix responsive behavior on `html/index.html` at 360/768/1024/1440 — artifact: no horizontal overflow in auth shell.
- [ ] (M) Validate/fix responsive behavior on `html/auth-web-login.html` at 360/768/1024/1440 — artifact: responsive auth layout.
- [ ] (M) Validate/fix responsive behavior on `html/register.html` at 360/768/1024/1440 — artifact: responsive register layout.
- [ ] (M) Validate/fix responsive behavior on `html/auth-web-register-collector.html` at 360/768/1024/1440 — artifact: responsive collector register layout.
- [ ] (M) Validate/fix responsive behavior on `html/auth-web-register-lgu.html` at 360/768/1024/1440 — artifact: responsive LGU register layout.
- [ ] (M) Validate/fix responsive behavior on `html/dashboard-resident.html` at 360/768/1024/1440 — artifact: responsive resident dashboard.
- [ ] (M) Validate/fix responsive behavior on `html/schedule.html` at 360/768/1024/1440 — artifact: schedule forms/table fit without clipping.
- [ ] (M) Validate/fix responsive behavior on `html/report.html` at 360/768/1024/1440 — artifact: report form/map/list responsive modes.
- [ ] (M) Validate/fix responsive behavior on `html/eco-points.html` at 360/768/1024/1440 — artifact: wallet/catalog/ledger responsive view.
- [ ] (M) Validate/fix responsive behavior on `html/announcements.html` at 360/768/1024/1440 — artifact: publish/feed responsive layout.
- [ ] (M) Validate/fix responsive behavior on `html/dashboard-collector.html` at 360/768/1024/1440 — artifact: responsive collector dashboard shell.
- [ ] (M) Validate/fix responsive behavior on `html/collectors.html` at 360/768/1024/1440 — artifact: responsive collectors/admin collectors shell.
- [ ] (M) Validate/fix responsive behavior on `html/qr-audit.html` at 360/768/1024/1440 — artifact: scan form/result responsive layout.
- [x] (S) Validate/fix responsive behavior on `html/dashboard-lgu.html` at 360/768/1024/1440 — artifact: sidebar collapse + chart grid media rules.
- [x] (S) Validate/fix responsive behavior on `html/compliance.html` at 360/768/1024/1440 — artifact: metric grid media rule in page CSS.
- [ ] (M) Validate/fix responsive behavior on `html/denr-reports.html` at 360/768/1024/1440 — artifact: responsive DENR page.
- [ ] (M) Validate/fix responsive behavior on `html/users.html` at 360/768/1024/1440 — artifact: responsive users page.
- [x] (S) Validate/fix responsive behavior on `html/xml-schedules-editor.html` at 360/768/1024/1440 — artifact: table wrappers and wrapping controls.
- [x] (S) Validate/fix responsive behavior on `html/xml-barangays-editor.html` at 360/768/1024/1440 — artifact: table wrappers and wrapping controls.

**Completion** — `4 / 19 subtasks (21%)`  
**Dependencies** — `T-UI-01`, `T-UI-04`, `T-UI-06`  
**Done when**
- All inventory pages pass four-breakpoint checks.
- Table strategy per page is documented and implemented.
- No clipped controls/text at 360 width.

## T-UI-08
**ID** — `T-UI-08`  
**Goal** — Complete per-page accessibility pass for labels, focus, semantics, ARIA, and keyboard traversal.  
**Source ref** — `ui-completeness-spec.md` §2.6, §9.

**Subtasks**
- [ ] (M) Accessibility pass on `html/index.html` (labels/focus/landmarks/keyboard) — artifact: corrected markup + a11y checklist entry.
- [ ] (M) Accessibility pass on `html/auth-web-login.html` (labels/focus/landmarks/keyboard) — artifact: corrected markup + a11y checklist entry.
- [ ] (M) Accessibility pass on `html/register.html` (labels/focus/landmarks/keyboard) — artifact: corrected markup + a11y checklist entry.
- [ ] (M) Accessibility pass on `html/auth-web-register-collector.html` (labels/focus/landmarks/keyboard) — artifact: corrected markup + a11y checklist entry.
- [ ] (M) Accessibility pass on `html/auth-web-register-lgu.html` (labels/focus/landmarks/keyboard) — artifact: corrected markup + a11y checklist entry.
- [ ] (M) Accessibility pass on `html/dashboard-resident.html` (labels/focus/landmarks/keyboard) — artifact: corrected markup + a11y checklist entry.
- [ ] (M) Accessibility pass on `html/schedule.html` (labels/focus/landmarks/keyboard) — artifact: corrected markup + a11y checklist entry.
- [ ] (M) Accessibility pass on `html/report.html` (labels/focus/landmarks/keyboard/map summary) — artifact: corrected markup + textual map alternatives.
- [ ] (M) Accessibility pass on `html/eco-points.html` (labels/focus/landmarks/keyboard) — artifact: corrected markup + a11y checklist entry.
- [ ] (M) Accessibility pass on `html/announcements.html` (labels/focus/landmarks/keyboard) — artifact: corrected markup + a11y checklist entry.
- [ ] (M) Accessibility pass on `html/dashboard-collector.html` (labels/focus/landmarks/keyboard) — artifact: corrected markup + a11y checklist entry.
- [ ] (M) Accessibility pass on `html/collectors.html` (labels/focus/landmarks/keyboard) — artifact: corrected markup + a11y checklist entry.
- [ ] (M) Accessibility pass on `html/qr-audit.html` (labels/focus/landmarks/keyboard) — artifact: corrected markup + a11y checklist entry.
- [ ] (M) Accessibility pass on `html/dashboard-lgu.html` (labels/focus/landmarks/keyboard/chart summary) — artifact: corrected markup + chart text summaries.
- [ ] (M) Accessibility pass on `html/compliance.html` (labels/focus/landmarks/keyboard) — artifact: corrected markup + a11y checklist entry.
- [ ] (M) Accessibility pass on `html/denr-reports.html` (labels/focus/landmarks/keyboard) — artifact: corrected markup + a11y checklist entry.
- [ ] (M) Accessibility pass on `html/users.html` (labels/focus/landmarks/keyboard) — artifact: corrected markup + a11y checklist entry.
- [ ] (M) Accessibility pass on `html/xml-schedules-editor.html` (labels/focus/landmarks/modal ARIA) — artifact: corrected markup + modal keyboard behavior.
- [ ] (M) Accessibility pass on `html/xml-barangays-editor.html` (labels/focus/landmarks/modal ARIA) — artifact: corrected markup + modal keyboard behavior.

**Completion** — `0 / 19 subtasks (0%)`  
**Dependencies** — `T-UI-01`, `T-UI-02`, `T-UI-03`, `T-UI-04`, `T-UI-06`, `T-UI-07`  
**Done when**
- Every page passes keyboard traversal and label coverage checks.
- Modal/toast/loading regions use required ARIA semantics.
- No `outline: none` without visible replacement focus indicator.

## T-UI-09
**ID** — `T-UI-09`  
**Goal** — Enforce page-level performance budgets and loading strategy from spec.  
**Source ref** — `ui-completeness-spec.md` §10.

**Subtasks**
- [ ] (M) Add page-size audit script for HTML/CSS/JS budget checks per page — artifact: `scripts/ui-budget-check.*`.
- [ ] (M) Defer non-critical scripts on all inventory pages where safe — artifact: updated script tags/loading order.
- [ ] (M) Add lazy-loading strategy for non-critical images/assets — artifact: lazy attributes or JS lazy loader.
- [ ] (S) Enable/verify gzip+brotli compression in runtime config — artifact: server compression middleware/config proof.
- [x] (S) Keep font loading with `display=swap` where Google Fonts links already used — artifact: font URLs with `display=swap`.
- [ ] (M) Add font fallback metric tuning to reduce CLS shifts — artifact: CSS fallback stack + size-adjust or equivalent.
- [ ] (L) Run Lighthouse profile at required breakpoints/pages and store reports — artifact: `docs/qa/ui-lighthouse/*.json|md`.
- [ ] (S) Add perf budget section to CI or release checklist — artifact: CI step or checklist doc update.

**Completion** — `1 / 8 subtasks (13%)`  
**Dependencies** — `T-UI-01`, `T-UI-04`, `T-UI-07`  
**Done when**
- Budget checks run against all inventory pages.
- Measured CWV and bundle sizes meet target thresholds.
- Perf checks recorded and repeatable.

## T-UI-10
**ID** — `T-UI-10`  
**Goal** — Execute and record quality gates across every inventory page.  
**Source ref** — `ui-completeness-spec.md` §11.

**Subtasks**
- [ ] (M) Run full §11 quality gate checklist for `html/index.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/auth-web-login.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/register.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/auth-web-register-collector.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/auth-web-register-lgu.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/dashboard-resident.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/schedule.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/report.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/eco-points.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/announcements.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/dashboard-collector.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/collectors.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/qr-audit.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/dashboard-lgu.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/compliance.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/denr-reports.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/users.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/xml-schedules-editor.html` and record pass/fail — artifact: QA log entry.
- [ ] (M) Run full §11 quality gate checklist for `html/xml-barangays-editor.html` and record pass/fail — artifact: QA log entry.

**Completion** — `0 / 19 subtasks (0%)`  
**Dependencies** — `T-UI-01`, `T-UI-02`, `T-UI-03`, `T-UI-04`, `T-UI-05`, `T-UI-06`, `T-UI-07`, `T-UI-08`, `T-UI-09`  
**Done when**
- Each inventory page has signed QA checklist result.
- Failures link to fixing task IDs.
- Release gate requires no open blocker failures.
