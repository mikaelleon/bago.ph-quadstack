# BAGO.PH Work Breakdown (`srs.md` + `progress-and-flows.md`)

## Summary
- Total subtasks: **96**
- Completed: **54 (56%)**
- Effort breakdown: **S×37 + M×55 + L×4**

| Area prefix | % complete |
|---|---:|
| `T-DB` | 3 / 8 (38%) |
| `T-AUTH` | 8 / 9 (89%) |
| `T-ROLE` | 4 / 6 (67%) |
| `T-SCHED` | 6 / 6 (100%) |
| `T-REPORT` | 8 / 9 (89%) |
| `T-ECO` | 7 / 8 (88%) |
| `T-ANALYTICS` | 6 / 9 (67%) |
| `T-XML` | 6 / 8 (75%) |
| `T-NFR` | 3 / 9 (33%) |
| `T-PERF` | 1 / 6 (17%) |
| `T-QUALITY` | 1 / 6 (17%) |
| `T-DIAGRAM` | 0 / 5 (0%) |
| `T-DEPLOY` | 1 / 7 (14%) |

## T-DB-01
**Goal** — Stabilize production database baseline for Aiven MySQL with repeatable schema/migration operations.  
**Source ref** — FR-01, FR-02, FR-04, NFR-03, NFR-05, SEC-03, SEC-08, F-10.  
**Subtasks**
- [ ] (M) Provision Aiven MySQL and capture instance details + SSL requirements — `docs/ops/aiven-setup.md`.
- [x] (S) Keep canonical schema import script versioned — `sql/bago_ph_database.sql`.
- [x] (S) Keep seed dataset in canonical schema file — seed inserts in `sql/bago_ph_database.sql`.
- [x] (S) Maintain migration folder with numbered SQL scripts — `sql/migrations/001_lgu_officer_gov_email_login.sql`, `sql/migrations/002_eco_points_ledger_immutable.sql`.
- [ ] (M) Add migration baseline/readme for full replay order — `sql/migrations/README.md` + `sql/migrations/000_init_schema.sql`.
- [ ] (M) Upgrade DB pool to SSL-aware mysql2 config (`DB_SSL_CA`, strict SSL) — `server/db.js`.
- [ ] (M) Add shared parameterized query helper wrapper and adopt in services — `server/db/query.js`.
- [ ] (M) Add Aiven import log + validation checklist artifact — `docs/ops/db-import-log.md`.
**Completion** — **3 / 8 subtasks (38%)**.  
**Dependencies** — none.  
**Done when**
- Aiven connection path documented and reproducible from repo docs.
- DB pool enforces SSL for cloud DB.
- Query helper exists and used for all new data access code.

## T-AUTH-02
**Goal** — Deliver complete authentication/session flow for resident, collector, and LGU officer.  
**Source ref** — FR-01, F-01, SEC-02, SEC-03, SR-06.  
**Subtasks**
- [x] (M) Implement registration API for role-based identity creation — `POST /api/auth/register` in `server/routes/auth.js`.
- [x] (M) Implement login API supporting mobile+PIN and gov-email+password — `POST /api/auth/login` in `server/routes/auth.js`.
- [x] (S) Hash credentials with bcrypt during auth create/verify paths — `server/routes/auth.js`.
- [x] (S) Issue expiring JWT token and verify claims — `server/middleware/auth.js` (`signToken()`, `verifyToken()`).
- [x] (S) Enforce bearer auth middleware on protected APIs — `authMiddleware()` in `server/middleware/auth.js`.
- [x] (M) Support gov-email LGU login branch in UI/API bridge — `html/js/prototype-page-loader.js`, `html/js/bago-api.js`.
- [x] (M) Support resident/collector mobile+PIN login branch in UI/API bridge — `html/js/prototype-page-loader.js`, `html/js/bago-api.js`.
- [x] (S) Implement logout/session clear path for frontend role/token bridge — `appendLogoutNav()` in `html/role-access.js`.
- [ ] (L) Replace prototype-dependent auth screens with pure HTML/JS auth flow (no `window.BAGOPrototype.render`) — `html/index.html`, `html/register.html`, `html/otp.html`, `html/auth-web-*.html`.
**Completion** — **8 / 9 subtasks (89%)**.  
**Dependencies** — T-DB-01.  
**Done when**
- Both credential modes authenticate against live API.
- All protected pages fail closed without valid JWT/session.
- Auth entry flow no longer depends on prototype renderer.

## T-ROLE-03
**Goal** — Keep client and server role-access controls consistent and auditable.  
**Source ref** — FR-01, F-01, F-10, SEC-03.  
**Subtasks**
- [x] (S) Maintain client role-page matrix and guard behavior — `ROLE_PAGE_ACCESS` + `enforceAccessControl()` in `html/role-access.js`.
- [x] (S) Inject logout/nav behavior for authenticated sessions — `appendLogoutNav()` in `html/role-access.js`.
- [x] (M) Maintain server role-page/api matrix mirror — `server/constants/role-routes.js`.
- [x] (M) Enforce per-resource API policy middleware on protected routes — `server/middleware/route-policy.js`.
- [ ] (M) Eliminate matrix drift between `html/role-access.js` and `html/js/prototype-page-loader.js` allowlists — unified source/adapter module.
- [ ] (M) Remove duplicate prototype route-guard path after auth page migration — simplify to single role guard chain.
**Completion** — **4 / 6 subtasks (67%)**.  
**Dependencies** — T-AUTH-02.  
**Done when**
- One authoritative role matrix drives both client and server.
- Forbidden role access returns redirect (client) and 403 (server) consistently.
- No stale prototype-only allowlist remains.

## T-SCHED-04
**Goal** — Provide end-to-end schedule management for LGU edits and resident/collector visibility.  
**Source ref** — FR-02, F-03, FR-03.  
**Subtasks**
- [x] (M) Implement schedule CRUD endpoints with role policy — `server/routes/schedules.js`.
- [x] (M) Keep schedule service abstraction with parameterized SQL — `server/services/schedules-service.js`.
- [x] (M) Ship LGU schedule editor UI for create/update/delete — `html/schedule.html`, `html/js/schedule-lgu.js`.
- [x] (S) Ship resident/collector read view for upcoming schedules — `html/js/schedule-resident.js`.
- [x] (S) Expose schedule notification feed endpoint — `GET /api/notifications/schedule` in `server/routes/notifications.js`.
- [x] (M) Render in-app schedule change banner in schedule page — `html/js/components/in-app-banner.js`, `html/js/schedule-resident.js`.
**Completion** — **6 / 6 subtasks (100%)**.  
**Dependencies** — T-ROLE-03.  
**Done when**
- LGU can fully manage schedule rows from web page.
- Residents/collectors see live schedule list from API.
- Schedule updates surface in notification banner feed.

## T-REPORT-05
**Goal** — Complete waste report intake and status workflow with media, geolocation, and map visibility.  
**Source ref** — FR-02, F-04, SR-01, SR-02, SR-03, SEC-06.  
**Subtasks**
- [x] (S) Keep report file-capture input in report form — `<input type="file" capture>` in `html/report.html`.
- [x] (M) Capture geolocation per report submit and attach coordinates — `captureLocation()` in `html/js/report-submit.js`.
- [x] (M) Compress report images client-side before upload — `html/js/lib/image-compress.js`.
- [x] (M) Support multipart upload endpoint with metadata validation — `POST /api/reports` in `server/routes/reports.js`.
- [x] (M) Support report status workflow APIs (`Open→...→Resolved/Rejected`) — `PATCH /api/reports/:id`, `PATCH /api/reports/:id/status` in `server/routes/reports.js`.
- [x] (M) Render LGU/collector map overlay using Leaflet + OSM CDN — `html/js/report-map.js`, `html/report.html`.
- [x] (S) Publish resident report-status notifications feed — `GET /api/notifications/reports` in `server/routes/notifications.js`.
- [ ] (M) Add LGU status-action controls to live LGU report page (not only API) — `html/report.html`, `html/js/report-map.js`/new LGU module.
- [x] (S) Keep signed media URL + token verification for report images — `server/services/report-media.js`, `/api/reports/image/:id`.
**Completion** — **8 / 9 subtasks (89%)**.  
**Dependencies** — T-ROLE-03, T-SCHED-04.  
**Done when**
- Resident can submit geo-tagged report with compressed photo.
- Collector/LGU can transition status via UI and API.
- Resident sees timeline/notification updates from backend state.

## T-ECO-06
**Goal** — Deliver auditable eco-points lifecycle (scan, credit, ledger, redeem).  
**Source ref** — FR-03, F-07, F-10, SR-04, SR-05, SEC-04, SEC-05.  
**Subtasks**
- [ ] (M) Implement live household QR card issuance/display flow (currently shell pages only) — `html/resident-web-qrcard.html` + API/service.
- [x] (M) Implement collector QR scan endpoint with token validation — `POST /api/qr/scan` in `server/routes/qr.js`.
- [x] (M) Implement idempotent eco-point credit endpoint requiring `Idempotency-Key` — `POST /api/eco-points/credit` in `server/routes/eco-points.js`.
- [x] (M) Keep immutable eco-points ledger schema migration — `sql/migrations/002_eco_points_ledger_immutable.sql`.
- [x] (S) Expose reward catalog API for redemption options — `GET /api/rewards/catalog` in `server/routes/rewards.js`.
- [x] (M) Implement redemption endpoint with ledger debit — `POST /api/rewards/redeem` in `server/routes/rewards.js`.
- [x] (S) Implement 30-day grace reconciliation endpoint (LGU only) — `POST /api/eco-points/reconcile` in `server/routes/eco-points.js`.
- [x] (S) Record eco-point and QR actions in audit service calls — `server/services/audit-log.js`, `server/routes/eco-points.js`, `server/routes/qr.js`, `server/routes/rewards.js`.
**Completion** — **7 / 8 subtasks (88%)**.  
**Dependencies** — T-REPORT-05.  
**Done when**
- Collector scan creates exactly one credit per idempotency window.
- Ledger remains append-only with compensating entries.
- Resident can redeem reward against real ledger balance.

## T-ANALYTICS-07
**Goal** — Provide LGU analytics and regulatory export surfaces from MySQL-backed data.  
**Source ref** — FR-04, F-06, F-09, PERF-05.  
**Subtasks**
- [x] (M) Implement aggregated metric queries and series service — `server/services/analytics-service.js`.
- [x] (M) Expose analytics overview endpoint with role guard — `GET /api/analytics/overview` in `server/routes/analytics.js`.
- [x] (M) Render dashboard cards from analytics response — `html/dashboard-lgu.html`, `html/js/dashboard-lgu.js`.
- [x] (M) Render charts via Chart.js CDN on LGU dashboard — `html/js/lgu-charts.js`.
- [x] (S) Provide CSV exports for overview/schedules — `GET /api/exports/csv` in `server/routes/exports.js`.
- [x] (M) Provide XML export from MySQL schedules dataset — `GET /api/exports/xml` in `server/routes/exports.js`.
- [ ] (L) Make DENR HTML export explicitly XSL-driven transform output (currently template string HTML) — `GET /api/exports/denr-html` + XSL transform pipeline.
- [ ] (L) Make DENR PDF export generated from XSL-transformed HTML output (currently minimal PDF builder) — `GET /api/exports/denr-pdf`.
- [ ] (M) Ship live compliance page wired to analytics API (not prototype shell) — `html/compliance.html` + new JS module.
**Completion** — **6 / 9 subtasks (67%)**.  
**Dependencies** — T-ECO-06, T-REPORT-05.  
**Done when**
- LGU sees live card/chart analytics in production page.
- XML export is filterable and MySQL-backed.
- DENR HTML/PDF flow uses declared XSL transform path end-to-end.

## T-XML-08
**Goal** — Complete XML/XSLT editing workflow with robust UX and persistence path.  
**Source ref** — F-08, FR-04, NFR-04, NFR-05.  
**Subtasks**
- [x] (M) Keep schedules XML editor with filter/sort/CRUD controls — `html/xml-schedules-editor.html`, `html/js/xml-schedules-app.js`.
- [x] (M) Keep barangays XML editor with filter/sort/CRUD controls — `html/xml-barangays-editor.html`, `html/js/xml-barangays-app.js`.
- [x] (M) Keep modal-based CRUD forms replacing `prompt()` — `html/js/components/xml-editor-modal.js`, XML app scripts.
- [x] (M) Keep field validation hooks (barangay, gov email, pin, mobile) — `html/js/xml-editor-validators.js`.
- [x] (S) Keep `?mode=view` read-only behavior for both editor pages — XML app scripts.
- [x] (S) Keep XSL preview + XML export actions in editors — XML editor pages/scripts.
- [ ] (L) Add server persistence endpoint for edited XML content (currently localStorage/download only) — new API route/service + editor wiring.
- [ ] (M) Reconcile legacy XSL root mismatch (`/technosystem`) to active XML roots or retire file — `xsl/ecolinisph.xsl`.
**Completion** — **6 / 8 subtasks (75%)**.  
**Dependencies** — T-SCHED-04, T-ROLE-03.  
**Done when**
- XML editors fully usable in edit and view-only modes.
- No prompt-based CRUD remains.
- XML changes can persist through controlled backend path (optional mode) or documented authoritative process.

## T-NFR-10
**Goal** — Implement security/privacy operational controls required by SRS NFR/SR/SEC sections.  
**Source ref** — NFR-06, SR-06, SEC-01..SEC-08.  
**Subtasks**
- [ ] (M) Enforce HTTPS redirect/block strategy for production traffic — Express middleware + deploy config.
- [x] (M) Enforce configurable CORS policy in API bootstrap — `server/index.js` CORS config using `CORS_ORIGIN`.
- [ ] (M) Add API rate limiting middleware for auth/report/export abuse paths — `server/middleware/rate-limit.js`.
- [ ] (M) Add DB migration for persistent audit table used by `writeAudit()` — `sql/migrations/003_lgu_action_log.sql`.
- [x] (S) Keep best-effort audit write service used by critical flows — `server/services/audit-log.js`.
- [ ] (M) Implement 30-minute LGU idle timeout with forced re-auth on privileged actions — frontend session module.
- [ ] (M) Add RA 10173 consent capture UI on onboarding/auth — new consent component + storage policy.
- [ ] (S) Add privacy policy page linked in auth/app footer — `html/privacy.html`.
- [x] (S) Keep secrets in env-var-driven config (no hardcoded runtime secrets) — `server/index.js`, `server/middleware/auth.js`, `server/db.js`, `.env` usage.
**Completion** — **3 / 9 subtasks (33%)**.  
**Dependencies** — T-AUTH-02, T-ROLE-03.  
**Done when**
- Sensitive endpoints are throttled and audited in DB table.
- LGU privileged sessions auto-expire at 30 minutes idle.
- Privacy consent + policy are visible and enforceable.

## T-PERF-11
**Goal** — Meet SRS performance targets with DB, transport, and frontend optimization.  
**Source ref** — NFR-01, NFR-03, PERF-01..PERF-07.  
**Subtasks**
- [x] (S) Keep foundational indexes in schema for major tables — indexes in `sql/bago_ph_database.sql` and `sql/migrations/002_eco_points_ledger_immutable.sql`.
- [ ] (M) Add dedicated performance index migration for current hot queries — `sql/migrations/004_perf_indexes.sql`.
- [ ] (M) Add query benchmark script and baseline report — `scripts/bench/top-queries.sql`, `docs/perf/query-baseline.md`.
- [ ] (M) Enable gzip/brotli response compression — middleware wired in `server/index.js`.
- [ ] (S) Add static asset cache-header policy for HTML vs JS/CSS/media — static serving middleware.
- [ ] (M) Add Lighthouse CI budget checks for primary screens — `.lighthouserc.json` + `npm run perf:lighthouse`.
**Completion** — **1 / 6 subtasks (17%)**.  
**Dependencies** — T-SCHED-04, T-REPORT-05, T-ANALYTICS-07.  
**Done when**
- Hot query latency tracked and improved against baseline.
- Compression and caching visible in response headers.
- Lighthouse budgets enforced in repeatable CI/local command.

## T-QUALITY-12
**Goal** — Validate accessibility and cross-browser quality for primary user flows.  
**Source ref** — NFR-04, Quality Attributes (Usability, Accessibility, Portability).  
**Subtasks**
- [ ] (S) Create WCAG 2.1 AA checklist for login/schedule/report/eco/analytics flows — `docs/qa/wcag-2.1-aa-checklist.md`.
- [ ] (M) Fix semantic label/focus/ARIA gaps identified by checklist — `html/*.html`, `html/js/components/*.js`.
- [ ] (S) Add keyboard-only QA script and execute against core flows — `docs/qa/keyboard-nav-test.md`.
- [ ] (S) Add screen-reader spot-check notes (NVDA/JAWS) — `docs/qa/screen-reader-results.md`.
- [x] (S) Keep XML/XSLT browser-path QA checklist artifact — `docs/qa/xml-xslt-checklist.md`.
- [ ] (S) Add full cross-browser QA matrix (Chrome/Edge/Firefox primary flows + XML path) — `docs/qa/cross-browser-matrix.md`.
**Completion** — **1 / 6 subtasks (17%)**.  
**Dependencies** — T-XML-08, T-ANALYTICS-07, T-NFR-10.  
**Done when**
- WCAG blockers resolved on primary live pages.
- Keyboard and screen-reader checks documented with outcomes.
- Browser compatibility matrix shows pass/fail per required flow.

## T-DIAGRAM-13
**Goal** — Produce SRS Section 3 design artifacts in repo docs.  
**Source ref** — SRS §3.1, §3.2, §3.3, §3.4.  
**Subtasks**
- [ ] (S) Create existing/proposed flowchart diagrams — `docs/diagrams/flowchart-existing.mmd`, `docs/diagrams/flowchart-proposed.mmd`.
- [ ] (S) Create actor/use-case diagram — `docs/diagrams/use-case.mmd`.
- [ ] (M) Create DFD Level 0/1/2 diagrams — `docs/diagrams/dfd-level-0.mmd`, `docs/diagrams/dfd-level-1.mmd`, `docs/diagrams/dfd-level-2.mmd`.
- [ ] (M) Create ERD covering 8 core entities and key relations — `docs/diagrams/erd.mmd`.
- [ ] (S) Add diagrams index/readme with export instructions — `docs/diagrams/README.md`.
**Completion** — **0 / 5 subtasks (0%)**.  
**Dependencies** — T-DB-01, T-ROLE-03, T-ANALYTICS-07.  
**Done when**
- All SRS-required diagrams exist in versioned docs path.
- ERD matches implemented schema tables/relations.
- Diagram index links all sources and output process.

## T-DEPLOY-14
**Goal** — Ship production deployment package and operational runbook for Render + Aiven.  
**Source ref** — NFR-02, SEC-01, SEC-08, PERF-06, Appendix B.  
**Subtasks**
- [ ] (M) Add Render infrastructure config file — `render.yaml`.
- [x] (S) Keep health endpoint for liveness checks — `GET /health` in `server/index.js`.
- [ ] (M) Add Render deploy/rollback runbook — `docs/ops/render-deploy.md`.
- [ ] (S) Add explicit env-var inventory doc — `docs/ops/env-vars.md`.
- [ ] (S) Add Aiven backup verification record/process — `docs/ops/aiven-backup-verification.md`.
- [ ] (S) Add README live demo block with deployed URL + health URL + demo notes — `README.md`.
- [ ] (M) Add post-deploy smoke checklist artifact — `scripts/ops/post-deploy-checklist.md`.
**Completion** — **1 / 7 subtasks (14%)**.  
**Dependencies** — T-PERF-11, T-QUALITY-12, T-DIAGRAM-13, T-NFR-10.  
**Done when**
- Deploy process reproducible from repo docs/config.
- Health and environment readiness verifiable after deploy.
- README exposes live demo entry and verification links.

