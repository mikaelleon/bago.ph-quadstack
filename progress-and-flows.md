# BAGO.PH Progress and Flows (Current Build State)

## Overview

BAGO.PH currently ships a mixed state: several core operational screens are already live as pure HTML/CSS/JS wired to Node/Express APIs (`schedule`, `report`, `eco-points`, `qr-audit`, `announcements`, `dashboard-lgu`), while many legacy/prototype screens are still rendered through `window.BAGOPrototype.render(...)` and rely on fallback/demo behavior in `html/js/prototype-page-loader.js`. Backend wiring exists for auth, schedules, reports, notifications, eco-points, rewards, QR scan, announcements, analytics, and exports, with role enforcement in middleware. XML/XSLT editing and preview are functional in-browser but persist to `localStorage`/download only; they do not write back to server files.

## Stack Scope Used

- HTML5, CSS3, vanilla JavaScript
- XML 1.0 + XSLT 1.0
- Node 20+ with Express 5
- JWT + bcrypt
- Aiven MySQL over SSL
- Render hosting model

## Page Inventory

| page | role(s) allowed | purpose | state |
|---|---|---|---|
| `html/schedule.html` | `user`, `collector`, `lgu_officer` via `html/role-access.js` | Resident schedule feed + LGU schedule CRUD panel toggle | Live |
| `html/report.html` | `user`, `collector`, `lgu_officer` | Resident report submit + resident timeline + collector/LGU map mode | Live |
| `html/announcements.html` | all authenticated roles; behavior split by role | LGU publish/history and resident/collector unified feed | Live |
| `html/dashboard-lgu.html` | effectively `lgu_officer` (API-enforced) | Metrics, charts, export links | Live |
| `html/eco-points.html` | API policy allows auth users ledger; resident redeem | Wallet summary, reward catalog, ledger view | Live |
| `html/qr-audit.html` | `collector`, `lgu_officer` by API policy | QR secure token validation + eco-point credit | Live |
| `html/xml-schedules-editor.html` | exposed to `collector`/`lgu_officer` in access lists | XML schedules CRUD/filter/sort/export + XSL preview | Partial — UI only |
| `html/xml-barangays-editor.html` | exposed to `lgu_officer` in access lists | XML barangay metrics CRUD/filter/sort/export + XSL preview | Partial — UI only |
| `html/index.html` | unauthenticated entry | Web login shell loading prototype component | Mock |
| `html/register.html` | unauthenticated entry | Web register shell loading prototype component | Mock |
| `html/otp.html` | unauthenticated transition | OTP shell loading prototype component | Mock |
| `html/auth-web-login.html` | unauthenticated entry | Alternate web login prototype screen | Mock |
| `html/auth-web-register.html` | unauthenticated entry | Alternate web register prototype screen | Mock |
| `html/auth-web-register-collector.html` | unauthenticated entry | Collector register prototype screen | Mock |
| `html/auth-web-register-lgu.html` | unauthenticated entry | LGU register/apply prototype screen | Mock |
| `html/auth-web-otp.html` | unauthenticated transition | Alternate OTP prototype screen | Mock |
| `html/dashboard-resident.html` | `user` in prototype allowlist | Resident dashboard prototype | Mock |
| `html/dashboard-collector.html` | `collector` in prototype allowlist | Collector dashboard prototype | Mock |
| `html/dashboard.html` | role-redirect target in older links | Generic dashboard prototype route | Mock |
| `html/collector-route.html` | `collector` | Collector route management shell | Mock |
| `html/collector-web-route.html` | `collector` | Collector web route management shell | Mock |
| `html/collector-web-scan.html` | `collector` | Collector web scan shell (prototype) | Mock |
| `html/collector-scan.html` | `collector` | Collector mobile scan shell (prototype) | Mock |
| `html/collector-reports.html` | `collector` | Collector reports list shell | Mock |
| `html/collector-web-reports.html` | `collector` | Collector reports web shell | Mock |
| `html/collector-report-update.html` | `collector` | Collector report update shell | Mock |
| `html/collector-web-schedule.html` | `collector` | Collector schedule shell | Mock |
| `html/collector-web-analytics.html` | `collector` | Collector analytics shell | Mock |
| `html/collector-web-profile.html` | `collector` | Collector profile shell | Mock |
| `html/admin-login.html` | `lgu_officer` route path | LGU admin login shell | Mock |
| `html/admin-schedule.html` | `lgu_officer` | LGU admin schedule shell | Mock |
| `html/admin-reports.html` | `lgu_officer` | LGU admin reports shell | Mock |
| `html/admin-residents.html` | `lgu_officer` | Resident registry shell | Mock |
| `html/admin-collectors-fleet.html` | `lgu_officer` | Collector fleet shell | Mock |
| `html/admin-announcements.html` | `lgu_officer` | Admin announcements shell | Mock |
| `html/admin-settings.html` | `lgu_officer` | LGU settings shell | Mock |
| `html/users.html` | `lgu_officer` in access list | User management shell | Mock |
| `html/compliance.html` | `lgu_officer` in access list | Compliance page shell | Mock |
| `html/denr-reports.html` | `lgu_officer` in access list | DENR report page shell | Mock |
| `html/collectors.html` | `collector`, `lgu_officer` | Collector view shell | Mock |
| `html/resident-reports.html` | `user` | Resident reports shell | Mock |
| `html/resident-report-detail.html` | `user` | Resident report detail shell | Mock |
| `html/resident-report-submitted.html` | `user` | Report submitted confirmation shell | Mock |
| `html/resident-missions.html` | `user` | Missions shell | Mock |
| `html/resident-rewards.html` | `user` | Rewards shell | Mock |
| `html/resident-leaderboard.html` | `user` | Leaderboard shell | Mock |
| `html/resident-web-home.html` | `user` | Resident web home shell | Mock |
| `html/resident-web-schedule.html` | `user` | Resident web schedule shell | Mock |
| `html/resident-web-report.html` | `user` | Resident web report shell | Mock |
| `html/resident-web-myreports.html` | `user` | Resident web reports shell | Mock |
| `html/resident-web-wallet.html` | `user` | Resident web wallet shell | Mock |
| `html/resident-web-missions.html` | `user` | Resident web missions shell | Mock |
| `html/resident-web-rewards.html` | `user` | Resident web rewards shell | Mock |
| `html/resident-web-leaderboard.html` | `user` | Resident web leaderboard shell | Mock |
| `html/resident-web-profile.html` | `user` | Resident web profile shell | Mock |
| `html/resident-web-qrcard.html` | `user` | Household QR card shell | Mock |

Notes:
- `html/html/*.html` contains a mirrored duplicate page tree, also primarily prototype-rendered.
- Live pages still use inline `<style>` blocks heavily and often do not include shared nav markup.

## User Flows

### Resident

1. Entry at `html/index.html` (mock), login form handled by `onLogin()` in `html/js/prototype-page-loader.js` `(mock)`.
2. If API login succeeds, token stored and redirects toward `dashboard-resident.html`; OTP behavior still driven by local OTP fallback logic and `html/otp.html` `(mock)`.
3. Schedule check in `html/schedule.html`: resident panel calls `window.BAGOScheduleResident.initResidentSchedule()` -> `GET /api/schedules` and `GET /api/notifications/schedule` `(live)`.
4. Report filing in `html/report.html`: `window.BAGOReportSubmit.initResidentReportSubmit()` posts multipart to `POST /api/reports`, with geolocation and image compression via `html/js/lib/image-compress.js` `(live)`.
5. Report history/status in same `html/report.html`: `window.BAGOReportDetail.loadTimeline()` + `loadReportStatusBanners()` from `GET /api/reports` and `GET /api/notifications/reports` `(live)`.
6. Wallet and redeem in `html/eco-points.html`: `window.BAGOEcoWallet.initEcoWallet()` loads `GET /api/eco-points/ledger`, `GET /api/rewards/catalog`, posts `POST /api/rewards/redeem` with `Idempotency-Key` `(live)`.
7. Resident notifications in `html/announcements.html`: non-LGU branch calls `window.BAGOInAppNotifications.loadInAppFeed()` against `GET /api/notifications?scope=user` `(live)`.

### Collector

1. Entry via `html/index.html` or collector-specific prototype pages (`html/collector-web-route.html`, `html/dashboard-collector.html`) managed by `prototype-page-loader.js` `(mock)`.
2. QR scan flow in `html/qr-audit.html`: `window.BAGOCollectorScan.initCollectorScan()` posts `secure_token` to `POST /api/qr/scan` `(live)`.
3. Report map mode in `html/report.html`: collector branch loads `window.BAGOReportMap.loadReportMap()` from `GET /api/reports` and plots Leaflet markers `(live)`.
4. Schedule visibility in `html/schedule.html`: collector follows resident panel path (`initResidentSchedule`) with read-only schedules and schedule banners `(live)`.
5. Announcement feed in `html/announcements.html`: non-LGU feed through `GET /api/notifications?scope=collector` `(live)`.
6. Collector route/reports/schedule/profile pages remain prototype shells with `window.BAGOPrototype.render(...)` `(mock)`.

### LGU Officer

1. Entry/login through `html/auth-web-login.html` or `html/admin-login.html`, handled by `onLogin()` plus fallback branch in `prototype-page-loader.js` `(mock/partial)`.
2. LGU dashboard at `html/dashboard-lgu.html`: `window.BAGODashboardLGU.initDashboardLGU()` fetches `GET /api/analytics/overview`, renders Chart.js series, binds export links to `/api/exports/*` `(live)`.
3. Schedule management in `html/schedule.html`: LGU branch `window.BAGOScheduleLGU.initLguSchedule()` loads barangays/schedules and calls `POST/PATCH/DELETE /api/schedules` `(live)`.
4. Report oversight in `html/report.html`: LGU sees map overlay (`loadReportMap`) using `GET /api/reports`; status update UI is not present on this page `(partial live)`.
5. Announcement publishing in `html/announcements.html`: admin branch `window.BAGOAnnouncementsAdmin.initAnnouncementsAdmin()` calls `GET /api/announcements` and `POST /api/announcements` `(live)`.
6. XML operations in `html/xml-schedules-editor.html` and `html/xml-barangays-editor.html`: CRUD/filter/sort/export in browser with XSL preview links `(partial — no server save)`.
7. Legacy LGU admin pages (`html/admin-*.html`, `html/compliance.html`, `html/denr-reports.html`, `html/users.html`) are still prototype-rendered `(mock)`.

## UI/UX Patterns

### Design tokens and styles

- Global tokens defined in `css/style.css` under `:root` (`--green-dark`, `--green-light`, `--blue`, `--bg`, `--surface`, `--text-primary`, `--text-secondary`, `--error`, `--radius`, `--shadow`).
- Extended visual tokens in `css/bento.css` (`--glass-*`, `--shadow-*`, `--transition-*`, `--radius-*`).
- `css/style.css` has nav/mobile breakpoint at `@media (max-width: 1100px)`.
- `css/bento.css` adds responsive grid shifts at `@media (max-width: 1200px)` and `@media (max-width: 768px)`.
- Most live pages (`schedule.html`, `report.html`, `announcements.html`, `dashboard-lgu.html`, `eco-points.html`, `qr-audit.html`, XML editors) use local inline styles rather than centralized classes.

### Shared components and interaction patterns

- Reusable API wrapper: `window.BAGOApi.request()` in `html/js/bago-api.js`.
- Shared role-gating script: `html/role-access.js` (`ROLE_PAGE_ACCESS`, `enforceAccessControl()`).
- Shared in-app banner component: `window.BAGOBanner.mountScheduleBanner()` in `html/js/components/in-app-banner.js`.
- Shared XML modal component: `window.BAGOXmlModal.openModal()` in `html/js/components/xml-editor-modal.js`.
- Shared XML validators: `window.BAGOXmlValidators.*` in `html/js/xml-editor-validators.js`.
- Shared XML data utilities: `BAGO_XML_CORE.loadXmlAsync()`, `saveToStorage()`, `downloadXml()`, `sortRows()`, `filterRows()` in `html/js/xml-data-core.js`.

### Navigation and role gating behavior

- Top-level live pages generally lack a full consistent navbar; they rely on page-local controls.
- `html/role-access.js` rewrites `dashboard.html` links and appends logout item if `<nav><ul>` exists.
- Prototype path has separate role enforcement (`enforceAccess()`) in `html/js/prototype-page-loader.js`.
- Two access matrices exist (`ROLE_PAGE_ACCESS` in `html/role-access.js` and `allow` object in `prototype-page-loader.js`) and are not fully identical.

### Accessibility state (present vs missing)

Present:
- Some dialogs include `role="dialog"` and `aria-modal="true"` in `prototype-page-loader.js` modal helpers.
- Forms generally include visible labels or placeholders on live pages.
- Tables and semantic headings are used on many pages.

Missing / inconsistent:
- Limited ARIA labels beyond dialog wrappers.
- Focus management is not consistently implemented across all custom components.
- Many controls rely on placeholders instead of explicit `<label for>` pairs.
- Minimal keyboard interaction patterns for dynamic tables/modals in XML editors.
- No consistent skip links / landmark navigation structure across live pages.
- Leaflet map markers and chart canvases do not expose equivalent textual summaries per chart/map region.

## Data and Backend Wiring Status

Legend:
- `[Live]` End-to-end UI + API wiring exists.
- `[Partial — UI only]` UI exists but backend persistence/flow is missing or incomplete.
- `[Not started]` No live implementation found.

### F-01 to F-10

- **F-01 Authentication and Role Access** — `[Partial — UI only]` Live auth endpoints in `server/routes/auth.js`; many auth screens still prototype-rendered by `html/js/prototype-page-loader.js`.
- **F-02 Dashboard Overview** — `[Partial — UI only]` LGU dashboard is live (`html/dashboard-lgu.html`, `html/js/dashboard-lgu.js`, `GET /api/analytics/overview`), resident/collector dashboards remain mock.
- **F-03 Schedule Management** — `[Live]` `html/schedule.html` + `html/js/schedule-lgu.js` / `schedule-resident.js` with `server/routes/schedules.js`.
- **F-04 Waste Report Console** — `[Live]` `html/report.html` + `report-submit.js`, `report-detail.js`, `report-map.js` with `server/routes/reports.js`.
- **F-05 Collector Route Management (Web)** — `[Not started]` Collector route pages (`html/collector-route.html`, `html/collector-web-route.html`) are prototype shells; no dedicated route-management API.
- **F-06 Compliance Analytics** — `[Partial — UI only]` Aggregate analytics exists (`server/services/analytics-service.js`, `server/routes/analytics.js`), but `html/compliance.html` is still prototype.
- **F-07 Eco-Points Program Management** — `[Live]` `html/eco-points.html`, `html/js/eco-wallet.js`, `server/routes/eco-points.js`, `server/routes/rewards.js`.
- **F-08 XML/XSLT Editors and Export** — `[Partial — UI only]` XML editors live in browser (`html/xml-*.html`, `html/js/xml-*.js`) but no server-side write-back endpoint.
- **F-09 DENR Report Generator** — `[Partial — UI only]` exports live in `server/routes/exports.js` (`/xml`, `/denr-html`, `/denr-pdf`), dedicated `html/denr-reports.html` still mock.
- **F-10 User and QR Audit Management** — `[Partial — UI only]` QR scan + audit logging live (`server/routes/qr.js`, `server/services/audit-log.js`), user management pages remain mock.

### FR-01 to FR-04

- **FR-01 Role-Based Authentication and Access** — `[Partial — UI only]` JWT and role middleware live (`server/middleware/auth.js`, `server/middleware/route-policy.js`, `server/constants/role-routes.js`), frontend role gating split across two different client scripts.
- **FR-02 Schedule and Report Management** — `[Live]` APIs and live pages wired (`server/routes/schedules.js`, `server/routes/reports.js`, `html/schedule.html`, `html/report.html`).
- **FR-03 Notifications and Communications** — `[Live]` `server/routes/notifications.js`, `server/routes/announcements.js`, `html/announcements.html`, `html/js/in-app-notifications.js`.
- **FR-04 Analytics, Exports, and Compliance** — `[Partial — UI only]` analytics/export APIs live (`server/routes/analytics.js`, `server/routes/exports.js`), compliance and DENR pages mostly prototype.

## XML / XSLT Layer

### XML files

- `xml/schedules.xml`
  - Root: `<ecolinisph_schedules>`.
  - Includes processing instruction to `../xsl/ecolinisph-schedules.xsl`.
  - Holds route calendar, barangay schedules, special dates, and collector shifts.

- `xml/barangays.xml`
  - Root: `<bago_barangays city="..." province="..." last_updated="...">`.
  - Includes processing instruction to `../xsl/barangays.xsl`.
  - Contains barangay metric rows (`collection_rate`, `compliance_rate`, `open_reports`, `eco_points`, `status`).

### XSL transforms

- `xsl/ecolinisph-schedules.xsl`
  - Match target: `/ecolinisph_schedules`.
  - Renders schedule dashboard-style HTML with tables for routes/barangays/special dates/shifts.
  - Used for browser preview when opening `xml/schedules.xml`.

- `xsl/barangays.xsl`
  - Match target: `/bago_barangays`.
  - Renders barangay metric table with status badges.
  - Used for browser preview when opening `xml/barangays.xml`.

- `xsl/denr-report.xsl`
  - Match target: `/` then loops `denr_report/schedule`.
  - Used by `/api/exports/xml` output because route injects `<?xml-stylesheet ... href="/xsl/denr-report.xsl"?>`.

- `xsl/ecolinisph.xsl`
  - Match target: `/technosystem`.
  - Currently not aligned with `xml/schedules.xml` or `xml/barangays.xml` roots; effectively legacy/unwired for active XML files.

### XML editor pages and current behavior

- `html/xml-schedules-editor.html` + `html/js/xml-schedules-app.js`
  - Loads XML via `BAGO_XML_CORE.loadXmlAsync()` (localStorage first, then `../xml/schedules.xml`, fallback inline XML).
  - Supports filter/search/sort across multiple tables.
  - CRUD through modal (`BAGOXmlModal.openModal`) for routes, barangays, special dates, shifts.
  - `?mode=view` disables editing controls.
  - `btn-export` downloads XML; `btn-xsl-preview` opens `../xml/schedules.xml`.

- `html/xml-barangays-editor.html` + `html/js/xml-barangays-app.js`
  - Same load strategy for `../xml/barangays.xml`.
  - Supports filter by keyword/status and sortable columns.
  - CRUD through modal with validators.
  - `?mode=view` supported.
  - Export is file download; preview opens `../xml/barangays.xml`.

## Known Gaps

- Auth journey user-visible, but mostly prototype flow (`index/register/otp/auth-web-*`) with local fallback behaviors in `prototype-page-loader.js`.
- Collector route operations are visible as pages, but no live route-planning CRUD/API beyond QR/report interactions.
- LGU report map exists, but no direct status update controls on live `report.html` LGU view.
- XML editors look complete, but edits are browser-local/download; no server endpoint persists changes into `xml/*.xml`.
- Two separate client-side access matrices can drift (`html/role-access.js` vs `html/js/prototype-page-loader.js`).
- Dedicated compliance and DENR pages remain mock despite live analytics/export APIs.
- User management pages (`users`, `admin-residents`, `admin-collectors-fleet`) are visible but not backend-wired.
- Live pages have inconsistent shared navigation and inconsistent reuse of `css/style.css`/`css/bento.css`.
- Accessibility is partial: some dialogs have ARIA roles, but broader keyboard/focus/ARIA coverage is incomplete.
- `xsl/ecolinisph.xsl` currently targets `/technosystem`, not active XML root structures.

## Backend Surface Reference (Observed Mounted APIs)

- `GET /health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/barangays`
- `GET /api/schedules`, `POST /api/schedules`, `PATCH /api/schedules/:id`, `DELETE /api/schedules/:id`
- `GET /api/reports`, `POST /api/reports`, `PATCH /api/reports/:id`, `PATCH /api/reports/:id/status`
- `GET /api/reports/:id/image-url`, `GET /api/reports/image/:id?token=...`
- `GET /api/notifications/schedule`, `GET /api/notifications/reports`, `GET /api/notifications`
- `GET /api/eco-points/ledger`, `POST /api/eco-points/credit`, `POST /api/eco-points/reconcile`
- `GET /api/rewards/catalog`, `POST /api/rewards/redeem`
- `POST /api/qr/scan`
- `GET /api/announcements`, `POST /api/announcements`
- `GET /api/analytics/overview`
- `GET /api/exports/csv`, `GET /api/exports/xml`, `GET /api/exports/denr-html`, `GET /api/exports/denr-pdf`
- Static XSL path: `/xsl/*`
