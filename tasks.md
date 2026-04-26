# BAGO.PH work breakdown from `srs.md`: 14 main tasks, 103 leaf subtasks, estimated effort `S×37 + M×63 + L×3` (103 total) to deliver deployable HTML/CSS/JS + Node/Express + Aiven MySQL platform with XML/XSLT exports, security hardening, quality gates, and Render deployment. Current completion: **32/103 subtasks (31%)**.

## T-DB-01
**Goal** — Stand up production-shaped database foundation on Aiven MySQL with SSL and migration workflow.
**Source ref** — FR-01, FR-02, FR-04, NFR-03, NFR-05, SEC-03, SEC-08, F-10.
**Subtasks**
- [ ] (M) Provision Aiven MySQL service and capture connection metadata in `docs/ops/aiven-setup.md` — documented Aiven instance + SSL parameters.
- [ ] (S) Create `.env.example` entries for `DATABASE_URL`, `DB_SSL_CA`, `DB_CONN_LIMIT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` — updated `.env.example`.
- [ ] (M) Import `sql/bago_ph_database.sql` into Aiven via MySQL Workbench and record import checksum in `docs/ops/db-import-log.md` — reproducible import log.
- [ ] (S) Create `sql/seeds/001_demo_accounts.sql` for resident/collector/LGU demo accounts aligned to current auth model — seed SQL file committed.
- [ ] (M) Add migration baseline file `sql/migrations/000_init_schema.sql` and migration README at `sql/migrations/README.md` — versioned migration process.
- [ ] (M) Implement SSL-enabled mysql2 pool in `server/db/pool.js` using Aiven CA config — pooled connection module with SSL.
- [ ] (M) Add parameterized query helper `server/db/query.js` wrapping `pool.execute` with standardized error mapping — reusable safe query utility.
**Completion** — **0%** (0/7 subtasks).
**Dependencies** — none.
**Done when**
- DB connection from local server to Aiven succeeds with SSL required.
- Schema + seed scripts run without manual SQL edits outside repo.
- Backend imports `server/db/query.js` without raw string-concatenated SQL.

## T-AUTH-02
**Goal** — Deliver complete auth flows for resident/collector mobile+PIN and LGU gov-email+password.
**Source ref** — FR-01, F-01, SEC-02, SEC-03, SR-06.
**Subtasks**
- [x] (M) Add registration endpoint `POST /api/auth/register` in `server/routes/auth.js` writing to `app_identity` with role-specific fields — tested registration API.
- [x] (M) Add login endpoint `POST /api/auth/login` in `server/routes/auth.js` supporting `{mobile,pin}` and `{email,password}` payloads — dual-mode login API.
- [ ] (S) Implement bcrypt hashing utility in `server/lib/passwords.js` for PIN/password create + verify — shared hash helper.
- [x] (S) Add JWT issue/verify helper `server/lib/jwt.js` with expiration and role claims — signed token utility.
- [x] (M) Create auth middleware `server/middleware/auth-jwt.js` validating bearer token on protected routes — enforced auth middleware.
- [x] (M) Implement role middleware `server/middleware/require-role.js` to gate resident/collector/lgu_officer routes — server-side role guard.
- [x] (S) Add logout/session clear client logic in `html/js/auth-session.js` removing token/role from storage and redirecting to login — logout behavior change.
- [x] (M) Wire login and register forms in `html/js/auth-web-login.js` and `html/js/register.js` to API instead of local-only flow — live auth UI integration.
**Completion** — **88%** (7/8 subtasks).
**Dependencies** — T-DB-01.
**Done when**
- Valid resident/collector and LGU credentials return JWT + role payload.
- Invalid credentials return 401 without revealing account existence.
- Logout clears storage and blocks protected page access on refresh.

## T-ROLE-03
**Goal** — Align client and server role enforcement across pages and endpoints.
**Source ref** — FR-01, F-01, F-10, SEC-03.
**Subtasks**
- [x] (M) Refactor `html/role-access.js` route matrix to explicit per-role allowlists matching active pages — deterministic client guard map.
- [x] (S) Add navbar role injection map in `html/js/prototype-page-loader.js` (or split into `html/js/navbar-role.js`) — role-specific navbar rendering.
- [x] (M) Mirror role matrix in backend constants `server/constants/role-routes.js` and apply in route handlers — shared authorization source.
- [x] (M) Add integration tests `server/tests/role-guards.test.js` covering disallowed role access (403) per protected endpoint group — passing guard tests.
- [x] (S) Add redirect-to-dashboard behavior for disallowed URLs in `html/js/role-redirects.js` — documented behavior change in browser.
**Completion** — **100%** (5/5 subtasks).
**Dependencies** — T-AUTH-02.
**Done when**
- Same role matrix enforced in browser and API.
- Protected endpoint access by wrong role consistently returns 403.
- Direct URL entry to disallowed page redirects to correct dashboard.

## T-SCHED-04
**Goal** — Deliver schedule management end to end for LGU and resident views with in-app change banners.
**Source ref** — FR-01, FR-02, F-03, F-08.
**Subtasks**
- [x] (M) Implement schedule CRUD endpoints `GET/POST/PATCH/DELETE /api/schedules` in `server/routes/schedules.js` with role restrictions — functional schedule API.
- [x] (S) Add schedule query service `server/services/schedules-service.js` using parameterized SQL and barangay/date filters — reusable data service.
- [x] (M) Build LGU schedule editor UI in `html/schedule.html` + `html/js/schedule-lgu.js` for create/update/cancel actions — live LGU edit screen.
- [x] (M) Build resident schedule list/calendar view in `html/js/schedule-resident.js` consuming `GET /api/schedules` — live resident view.
- [x] (S) Add in-app notification banner component `html/js/components/in-app-banner.js` for schedule change events — reusable banner module.
- [x] (M) Create endpoint `GET /api/notifications/schedule` in `server/routes/notifications.js` and wire banner polling in resident page — visible schedule change banner.
- [x] (S) Add API tests `server/tests/schedules-api.test.js` for CRUD + role permissions — passing schedule tests.
**Completion** — **100%** (7/7 subtasks).
**Dependencies** — T-ROLE-03.
**Done when**
- LGU can create/update/cancel schedule from web screen.
- Resident schedule page reflects DB-backed updates.
- Schedule changes appear in resident in-app banner feed.

## T-REPORT-05
**Goal** — Deliver report submission and resolution workflow with media, geolocation, compression, map overlay, and status notifications.
**Source ref** — FR-02, F-04, SR-01, SR-02, SR-03, SEC-06.
**Subtasks**
- [x] (M) Implement report upload endpoint `POST /api/reports` in `server/routes/reports.js` with multipart validation and metadata persistence — report create API.
- [x] (M) Add secure media storage service `server/services/report-media.js` with signed URL generation for access — signed image access flow.
- [x] (M) Add report status endpoints `PATCH /api/reports/:id/status` and `GET /api/reports` filters in `server/routes/reports.js` — status workflow API.
- [x] (S) Implement browser file capture field `<input type="file" capture>` in `html/report.html` + `html/js/report-submit.js` — capture-enabled report form.
- [x] (M) Add Geolocation API capture per submission in `html/js/report-submit.js` with permission prompt and fallback handling — location-tagged submission.
- [x] (M) Add client compression module `html/js/lib/image-compress.js` targeting <=500KB before upload — compressed upload artifact.
- [x] (M) Add LGU report map overlay in `html/report.html` + `html/js/report-map.js` using Leaflet + OpenStreetMap CDN — live map overlay view.
- [x] (S) Publish resident status-change banners in `GET /api/notifications/reports` via `server/routes/notifications.js` — report update notifications.
- [x] (M) Add frontend status timeline UI `html/js/report-detail.js` showing Open/Acknowledged/In Progress/Resolved/Rejected — visible workflow timeline.
- [x] (S) Add test suite `server/tests/reports-flow.test.js` for create + status transitions + signed URL access checks — passing report tests.
**Completion** — **100%** (10/10 subtasks).
**Dependencies** — T-ROLE-03, T-SCHED-04.
**Done when**
- Resident can submit compressed, geo-tagged report with image.
- LGU/collector can update report status through API + UI.
- Resident sees status-change notification and timeline update.

## T-ECO-06
**Goal** — Implement eco-points earning and redemption with QR validation, idempotent credits, and immutable ledger.
**Source ref** — FR-03, F-07, F-10, SR-04, SR-05, SEC-04, SEC-05.
**Subtasks**
- [ ] (M) Add migration `sql/migrations/002_eco_points_ledger_immutable.sql` with append-only constraints and reversal pattern — immutable ledger schema.
- [ ] (M) Create QR token generator service `server/services/qr-token.js` using UUIDv4 tokens and household mapping — QR generation module.
- [ ] (M) Implement collector scan endpoint `POST /api/qr/scan` in `server/routes/qr.js` validating token and route context — scan validation API.
- [ ] (M) Implement idempotent credit endpoint `POST /api/eco-points/credit` in `server/routes/eco-points.js` requiring `Idempotency-Key` header — duplicate-safe credit API.
- [ ] (M) Implement redemption catalog endpoint `GET /api/rewards/catalog` and redemption endpoint `POST /api/rewards/redeem` in `server/routes/rewards.js` — redemption API pair.
- [ ] (S) Add 30-day grace reconciliation endpoint `POST /api/eco-points/reconcile` with LGU-only access in `server/routes/eco-points.js` — grace policy endpoint.
- [ ] (M) Build collector scan flow UI `html/qr-audit.html` + `html/js/collector-scan.js` for scan -> validate -> credit feedback — collector web flow.
- [ ] (M) Build resident wallet + redemption UI in `html/eco-points.html` + `html/js/eco-wallet.js` consuming live ledger and catalog APIs — live wallet screen.
- [ ] (S) Add audit entries for all eco-point writes in `server/services/audit-log.js` — eco-point write audit trail.
- [ ] (M) Add tests `server/tests/eco-points-idempotency.test.js` and `server/tests/rewards-redeem.test.js` — passing idempotency + redemption tests.
**Completion** — **0%** (0/10 subtasks).
**Dependencies** — T-REPORT-05.
**Done when**
- Duplicate credit requests with same idempotency key create one ledger credit only.
- QR scan flow validates token and writes auditable transaction event.
- Resident can redeem catalog item with ledger debit and balance update.

## T-ANN-07
**Goal** — Deliver announcement and in-app notification pipeline with email/SMS hook points.
**Source ref** — FR-03, F-08, NFR-04.
**Subtasks**
- [ ] (M) Implement announcement endpoints `GET/POST /api/announcements` in `server/routes/announcements.js` with barangay targeting — announcement API.
- [ ] (S) Add in-app banner feed endpoint `GET /api/notifications` in `server/routes/notifications.js` merging schedule/report/announcement events — unified banner feed.
- [ ] (M) Build LGU announcement compose UI in `html/announcements.html` + `html/js/announcements-admin.js` — LGU broadcast screen.
- [ ] (S) Build resident/collector banner display module `html/js/in-app-notifications.js` consuming `/api/notifications` — visible in-app notifications.
- [ ] (M) Add provider hook interface `server/integrations/messaging-hooks.js` for future email/SMS adapters (stub adapters + config) — extensible comms hook artifact.
- [ ] (S) Add tests `server/tests/announcements-api.test.js` for role-restricted creation and targeted retrieval — passing announcement tests.
**Completion** — **0%** (0/6 subtasks).
**Dependencies** — T-SCHED-04, T-REPORT-05.
**Done when**
- LGU can publish announcement targeted by barangay.
- Residents/collectors receive announcement in in-app banner feed.
- Email/SMS hook interface exists with documented future adapter contract.

## T-ANALYTICS-08
**Goal** — Build analytics, exports, and DENR-oriented output pipeline from live MySQL data.
**Source ref** — FR-04, F-06, F-09, PERF-05.
**Subtasks**
- [ ] (M) Implement analytics query service `server/services/analytics-service.js` for collection, reports, compliance, eco-points metrics — reusable metric queries.
- [ ] (M) Add LGU analytics endpoint `GET /api/analytics/overview` in `server/routes/analytics.js` with period filters — analytics API.
- [ ] (M) Build LGU dashboard cards in `html/dashboard-lgu.html` + `html/js/dashboard-lgu.js` from overview API — live metric cards.
- [ ] (M) Add charts with Chart.js CDN in `html/js/lgu-charts.js` for compliance, report SLA, eco-points trends — analytics charts artifact.
- [ ] (M) Add CSV export endpoint `GET /api/exports/csv?type=...` in `server/routes/exports.js` — downloadable CSV export.
- [ ] (L) Add XML export endpoint `GET /api/exports/xml` in `server/routes/exports.js` with filters (barangay, date range, role) sourced from MySQL — filtered XML export API.
- [ ] (L) Create XSL templates `xsl/denr-report.xsl` and export transform route `GET /api/exports/denr-html` in `server/routes/exports.js` — XSL-driven printable HTML.
- [ ] (L) Add PDF generation endpoint `GET /api/exports/denr-pdf` in `server/routes/exports.js` using transformed HTML source — downloadable DENR PDF.
- [ ] (S) Add endpoint tests `server/tests/exports.test.js` covering XML filter behavior and CSV/PDF response headers — passing export tests.
**Completion** — **0%** (0/9 subtasks).
**Dependencies** — T-ECO-06, T-ANN-07.
**Done when**
- LGU dashboard renders live cards and charts from API.
- XML export returns filtered MySQL-backed dataset.
- DENR HTML/PDF exports generated from XSL transform path.

## T-XML-09
**Goal** — Complete XML/XSLT editor layer with view mode, modal CRUD, and strict field validation.
**Source ref** — F-08, FR-04, NFR-04, NFR-05.
**Subtasks**
- [ ] (M) Refactor `html/xml-schedules-editor.html` + `html/js/xml-schedules-editor.js` to modal-based CRUD (remove `prompt()`) — modal CRUD schedules editor.
- [ ] (M) Refactor `html/xml-barangays-editor.html` + `html/js/xml-barangays-editor.js` to modal-based CRUD (remove `prompt()`) — modal CRUD barangays editor.
- [ ] (S) Add shared modal component `html/js/components/xml-editor-modal.js` used by both editors — reusable modal artifact.
- [ ] (M) Add validation module `html/js/xml-editor-validators.js` for PH mobile format, 4-digit PIN, gov-email pattern, barangay whitelist — field validation rules.
- [x] (S) Enforce `?mode=view` read-only restrictions in both editor scripts with disabled controls and guard checks — read-only behavior.
- [ ] (M) Improve filter/sort utilities in `html/js/xml-data-core.js` for deterministic sorting and multi-filter handling — stable editor behavior.
- [ ] (M) Add export controls in editors for XML download and XSL preview trigger (`xsl/*.xsl`) — verifiable export actions.
- [ ] (S) Add browser regression checklist `docs/qa/xml-xslt-checklist.md` for Firefox XSLT path and editor modes — QA artifact.
**Completion** — **13%** (1/8 subtasks).
**Dependencies** — T-SCHED-04, T-ROLE-03.
**Done when**
- No `prompt()` remains in XML editors.
- Both editors support filter/sort/CRUD and honor `?mode=view`.
- Validation errors block invalid field submission with clear messages.

## T-NFR-10
**Goal** — Apply security and compliance controls required for production operations.
**Source ref** — NFR-06, SR-06, SEC-01..SEC-08.
**Subtasks**
- [x] (M) Configure strict CORS allowlist in `server/middleware/cors.js` and wire in `server/index.js` — origin-locked API behavior.
- [ ] (M) Add rate limiting middleware `server/middleware/rate-limit.js` for auth/report/export routes — request throttling artifact.
- [ ] (M) Create audit log table migration `sql/migrations/003_audit_log.sql` and write service `server/services/audit-log.js` — persistent audit logging.
- [ ] (S) Enforce 30-minute LGU idle timeout in `html/js/auth-session.js` and token refresh/reauth behavior — measurable idle timeout behavior.
- [ ] (M) Add RA 10173 consent banner component `html/js/components/consent-banner.js` on auth and first-login pages — privacy consent UX.
- [ ] (M) Create `html/privacy.html` with data usage, retention, and rights content linked from auth/footer — privacy policy page artifact.
- [ ] (S) Add secrets policy doc `docs/security/secrets-policy.md` forbidding committed credentials and defining env-var handling — compliance documentation.
- [ ] (S) Add security tests `server/tests/security-middleware.test.js` for CORS and rate limits — passing security tests.
**Completion** — **13%** (1/8 subtasks).
**Dependencies** — T-AUTH-02, T-ROLE-03.
**Done when**
- CORS rejects non-allowlisted origins in production mode.
- Rate limits enforced on sensitive endpoints.
- Privacy consent + policy page visible and linked in UI.

## T-PERF-11
**Goal** — Hit performance targets with DB indexes and web delivery optimization.
**Source ref** — NFR-01, NFR-03, PERF-01..PERF-07.
**Subtasks**
- [ ] (M) Add index migration `sql/migrations/004_perf_indexes.sql` for top-10 read paths (`schedules`, `reports`, `eco_points_ledger`, `barangays`) — query index artifacts.
- [ ] (M) Create DB performance script `scripts/bench/top-queries.sql` and baseline report `docs/perf/query-baseline.md` — measured query timings.
- [ ] (M) Enable gzip/brotli compression middleware in `server/middleware/compression.js` and wire in `server/index.js` — compressed responses.
- [ ] (S) Set cache headers for static assets in `server/middleware/static-cache.js` (hashed JS/CSS long TTL; HTML short TTL) — cache policy behavior.
- [ ] (M) Add Lighthouse CI config `.lighthouserc.json` and script `npm run perf:lighthouse` targeting dashboard/schedule/report pages — automated perf check.
- [ ] (S) Add perf budget doc `docs/perf/budgets.md` mapping SRS thresholds to measurable probes — performance contract artifact.
**Completion** — **0%** (0/6 subtasks).
**Dependencies** — T-SCHED-04, T-REPORT-05, T-ANALYTICS-08.
**Done when**
- Indexed queries show measurable improvement in baseline report.
- Compression and cache headers active in response inspection.
- Lighthouse run produces passing scores for agreed budgets.

## T-QUALITY-12
**Goal** — Validate accessibility and cross-browser quality on primary user flows.
**Source ref** — NFR-04, Quality Attributes (Accessibility, Usability, Portability).
**Subtasks**
- [ ] (M) Build WCAG checklist `docs/qa/wcag-2.1-aa-checklist.md` for login, schedule, report, dashboard, eco-points flows — auditable accessibility matrix.
- [ ] (M) Fix semantic/ARIA issues in `html/*.html` and shared scripts `html/js/components/*.js` identified in checklist — accessibility behavior improvements.
- [ ] (S) Add keyboard navigation test script `docs/qa/keyboard-nav-test.md` and execute against primary flows — keyboard QA artifact.
- [ ] (S) Run NVDA/JAWS spot checks and record outcomes in `docs/qa/screen-reader-results.md` — screen-reader verification report.
- [ ] (M) Create cross-browser QA matrix `docs/qa/cross-browser-matrix.md` for Chrome, Edge, Firefox (including XML/XSLT paths) — browser compatibility evidence.
- [ ] (S) Add smoke test script `scripts/qa/smoke-checklist.md` and run before release — repeatable QA routine artifact.
**Completion** — **0%** (0/6 subtasks).
**Dependencies** — T-XML-09, T-ANALYTICS-08, T-NFR-10.
**Done when**
- WCAG checklist completed with no critical blockers on primary flows.
- NVDA/JAWS spot-check issues triaged and resolved or documented.
- Cross-browser matrix shows pass status for required browsers/features.

## T-DIAGRAM-13
**Goal** — Deliver software analysis/design artifacts for SRS Section 3 in repo docs.
**Source ref** — SRS 3.1, 3.2, 3.3, 3.4.
**Subtasks**
- [ ] (S) Create `docs/diagrams/flowchart-existing.mmd` and `docs/diagrams/flowchart-proposed.mmd` Mermaid flowcharts — committed flowchart files.
- [ ] (S) Create `docs/diagrams/use-case.mmd` listing actors and core use cases — use case diagram artifact.
- [ ] (M) Create `docs/diagrams/dfd-level-0.mmd`, `docs/diagrams/dfd-level-1.mmd`, `docs/diagrams/dfd-level-2.mmd` — DFD L0/L1/L2 artifacts.
- [ ] (M) Create `docs/diagrams/erd.mmd` with 8 tables and key relations from SRS — ERD artifact.
- [ ] (S) Export PNG copies into `docs/diagrams/png/` via Mermaid CLI script `scripts/docs/export-diagrams.sh` (or `.ps1`) — image outputs for sharing.
- [ ] (S) Add index page `docs/diagrams/README.md` linking all diagram sources and exports — documentation entrypoint.
**Completion** — **0%** (0/6 subtasks).
**Dependencies** — T-DB-01, T-ROLE-03, T-ANALYTICS-08.
**Done when**
- Mermaid source files exist for all required diagram types.
- ERD includes exactly 8 SRS tables and named key relationships.
- Diagram README links source + generated images.

## T-DEPLOY-14
**Goal** — Deploy full stack on Render with verified health, backups, environment inventory, and live-demo documentation.
**Source ref** — NFR-02, NFR-06, SEC-01, SEC-08, PERF-06.
**Subtasks**
- [ ] (M) Add Render config `render.yaml` for web service build/start and env var bindings — versioned deployment config.
- [x] (S) Implement `/health` route in `server/routes/health.js` and register in `server/index.js` — health endpoint artifact.
- [ ] (M) Create deployment runbook `docs/ops/render-deploy.md` with build cmd, start cmd, rollback, log access — deployment guide artifact.
- [ ] (S) Create env inventory `docs/ops/env-vars.md` documenting required, optional, and secret vars per environment — env contract doc.
- [ ] (M) Verify Aiven automated backups and record evidence in `docs/ops/aiven-backup-verification.md` — backup verification artifact.
- [ ] (S) Update `README.md` with "Live Demo" block including deployed URL, `/health` check URL, and demo account guidance — documented live access.
- [ ] (M) Run post-deploy smoke test script `scripts/ops/post-deploy-checklist.md` against live URL — signed-off deployment checklist.
**Completion** — **14%** (1/7 subtasks).
**Dependencies** — T-PERF-11, T-QUALITY-12, T-DIAGRAM-13, T-NFR-10.
**Done when**
- Render service live and `/health` returns healthy status.
- Required environment variables documented and present in deployment.
- README contains working live-demo section with verification links.

