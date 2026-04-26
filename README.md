# BAGO.PH
**Barangay App for Garbage Operations in the Philippines**

---

## Table of Contents
- [Project Title](#project-title)
- [Group Members](#group-members)
- [Description of the System](#description-of-the-system)
- [Implementation Milestones (Progress Tracker)](#implementation-milestones-progress-tracker)
- [Who This Is For](#who-this-is-for)
- [Feature Overview](#feature-overview)
- [Auth, Registration & Navigation](#auth-registration--navigation)
- [Role-Based Pages](#role-based-pages)
- [Lipa City Barangays (Data)](#lipa-city-barangays-data)
- [XML, XSLT & Interactive Editors](#xml-xslt--interactive-editors)
- [Can Do / Cannot Do Yet](#can-do--cannot-do-yet)
- [Setup Walkthrough](#setup-walkthrough)
- [API & Aiven MySQL Database (Node + Express)](#api--aiven-mysql-database-node--express)
- [Deployment (Render)](#deployment-render)
- [Folder Structure (high level)](#folder-structure-high-level)
- [Notes](#notes)
- [Future / Missing Improvements](#future--missing-improvements)

---

## Project Title
**BAGO.PH Waste Operations Platform** — a barangay-focused waste operations platform for Lipa City–style LGU workflows, built for deployable municipal operations.

---

## Group Members
- Carlos Kent D. Del Rio — CEO / Lead Developer
- Kimberly Claire A. Aliwate — COO / UI/UX Designer
- Kenneth Elijah N. Castillo — CTO / Frontend Developer
- Miguel Yuan M. Mercado — CPO / Database Administrator

---

## Description of the System
BAGO.PH is a **web-based waste management platform** that connects **residents**, **garbage collectors**, and **LGU officers** in one system. It is designed to reduce schedule confusion, improve issue reporting, and give local government stronger operational visibility for collection, compliance, and community engagement.

The platform currently combines **deployed-ready backend services** and **role-focused web screens**. **Login or registration** stores a **role** in the browser (`localStorage`) as a client bridge and **unlocks the main app navbar**; until then, login and registration screens stay **without the main navigation bar**. Role-based rules control which HTML pages appear in the menu and which URLs are allowed, while server routes enforce protected access.

---

## Implementation Milestones (Progress Tracker)

### Milestone 1 — Foundation & Auth (15%)
- [x] Landing, login, and register pages without navbar.
- [x] CSS design system applied across auth and app screens.
- [x] Mobile + PIN flow for resident and collector roles.
- [x] Government email + password flow for LGU role.
- [x] `localStorage` role bridge for client session routing.
- [x] Demo credentials modal with per-role copy actions.

### Milestone 2 — Role-Based Pages & Client Guards (30%)
- [x] Full HTML page set per role.
- [x] Navbar injection on authenticated pages.
- [x] `role-access.js` URL guards.
- [x] Redirect-to-dashboard behavior for disallowed routes.
- [x] Logout/sign-out wired across resident, collector, and LGU dashboards.
- [x] Responsive auth layouts.

### Milestone 3 — XML / XSLT + Interactive Editors (50%)
- [x] `schedules.xml` and `barangays.xml` with all 72 Lipa barangays.
- [x] XSLT 1.0 transforms for browser-viewable tables.
- [x] `xml-schedules-editor.html` with filter, sort, CRUD, export.
- [x] `xml-barangays-editor.html` with filter, sort, CRUD, export.
- [x] `?mode=view` read-only mode for both XML editor pages.

### Milestone 4 — Backend API + Aiven MySQL (70%)
- [x] 8-table schema with `app_identity` split.
- [x] `sql/migrations/` folder for incremental DB updates.
- [x] Express routes: `/auth/*`, `/barangays`, `/schedules`, `/reports`.
- [ ] Aiven MySQL swap from local MySQL.
- [ ] Universal server-side role checks on every protected route.
- [x] JWT middleware and bcrypt hashing for auth flows.

### Milestone 5 — Dynamic Data, CRUD & XML/XSL Export Pipeline (90%)
- [ ] All role dashboards consume live API data; localStorage only as offline fallback.
- [ ] End-to-end CRUD for schedules, reports, barangays, eco-points, announcements, DENR reports, users, and QR audit log.
- [ ] XML export endpoint pulling from MySQL with filters (barangay, date range, role).
- [ ] XSL-driven export to printable HTML and downloadable PDF for DENR submissions, plus CSV export.
- [ ] Modal CRUD forms replacing `prompt()` dialogs.
- [ ] Field validation rules across all forms (PH mobile, 4-digit PIN, gov-email, barangay whitelist).
- [ ] Push/in-app announcement dispatch.
- [ ] Live charts on LGU analytics, compliance, and eco-points screens.
- [ ] Deeper eco-points wallet with real balances and redemption ledger.
- [ ] QR verification pipeline: scan -> validate -> audit log.

### Milestone 6 — Deployment & Hardening (100%)
- [ ] Render deployment of API + static frontend.
- [ ] Aiven MySQL provisioned with automated backups.
- [ ] HTTPS, strict CORS, rate limiting, and CSRF hardening.
- [ ] Audit log table for LGU write actions.
- [ ] RA 10173 consent text and data privacy controls.
- [ ] Live URL and demo accounts documented in README.
- [ ] Cross-browser QA (Chrome, Edge, Firefox-with-XSLT).
- [ ] Automated tests + WCAG accessibility audit.

---

## Who This Is For
- **Residents** who want clear schedules and easier reporting.
- **Collectors** who need route and field monitoring support.
- **LGU Officers** who need oversight, compliance visibility, and management tools.

---

## Feature Overview
- **Login & Register** — register picks role; **Resident/Collector** login uses mobile + PIN; **LGU Officer** login uses **government email + password** (min. 10 characters in the UI); session role stored in `localStorage` as client role bridge. LGU email login **skips the OTP page** and goes straight to the LGU dashboard.
- **Dashboard**: high-level waste operations snapshot.
- **Collection Schedule**: planned routes and collection timing.
- **Report Management**: issue reporting and follow-up workflow.
- **Collectors**: deployment and route monitoring.
- **Compliance**: segregation compliance analytics.
- **Eco-Points**: community incentives and point tracking.
- **Announcements**: updates and information broadcast.
- **DENR Reports**: compliance-oriented report generation.
- **User Management**: resident, collector, and officer account management (mock).
- **QR Audit**: QR-related validation and audit page.
- **XML tools**: schedule & barangay data editors / viewers (see below).

---

## Auth, Registration & Navigation
- Open **`html/index.html`** (or **`html/auth-web-login.html`** for the wide marketing layout) to log in, or **`html/register.html`** to register. These pages intentionally **omit** the main app navbar.
- After login or successful registration, the app stores **`bagoRole`** (`user` | `collector` | `lgu_officer`) from the account and opens the **dashboard** (LGU email login goes directly to **`dashboard-lgu.html`** without OTP).
- If a role is already stored, visiting login or register **redirects to the dashboard**.
- Inside the app, use **Logout** (injected on authenticated pages) to clear the role and return to login.
- On auth screens, demo accounts now open through an explicit **Demo credentials** button (modal with per-role copy buttons), not via background click handlers.
- **Demo credentials (non-production):**
  - **Resident** — `html/js/prototype-page-loader.js` seeds localStorage mobile **`09171234567`** · PIN **`1234`**. With API + DB: **`09181234501`–`09181234505`** · PIN **`1234`**.
  - **Collector** — local **`09171234568`** · PIN **`1234`**. With API: **`09171111001`–`09171111005`** · PIN **`1234`**.
  - **LGU Officer** — government email **`m.santos@lipacity.gov.ph`** · password **`LipaDemo2026!`** (local fallback and SQL seed; matches the web login fields). The old mobile-only LGU demo **`09171234569` / `1234`** is **removed** on load from `localStorage` if still present.
- **Security note:** demo passwords are **plaintext in docs and client seeds** for local development only. With the API enabled, resident/collector PINs and the LGU password are stored as **bcrypt** hashes in MySQL (`app_identity.pin_hash` / `app_identity.password_hash`).

---

## Role-Based Pages
Navigation and direct URL access follow `role-access.js`. Typical allowed pages:

### Resident (`user`)
- `index.html`, `register.html`
- `dashboard.html` (redirect shim), `dashboard-resident.html` (home)
- `schedule.html`, `report.html`, `eco-points.html`, `announcements.html`

### Collector (`collector`)
- `index.html`, `register.html`
- `dashboard.html` (redirect shim), `dashboard-collector.html` (home)
- `schedule.html`, `report.html`, `collectors.html`, `announcements.html`
- `qr-audit.html`, `xml-schedules-editor.html` (append `?mode=view` for read-only)

### LGU Officer (`lgu_officer`)
- `index.html`, `register.html`, `auth-web-login.html`
- `dashboard.html` (redirect shim), `dashboard-lgu.html` (home)
- `schedule.html`, `report.html`, `collectors.html`, `compliance.html`, `eco-points.html`, `announcements.html`, `denr-reports.html`, `users.html`
- `qr-audit.html`, `xml-schedules-editor.html`, `xml-barangays-editor.html` (append `?mode=view` for read-only)

If a page is not allowed for the current role, the app redirects to that role’s dashboard home.

---

## Lipa City Barangays (Data)
- **72 barangays** — official-style list in `html/js/lipa-barangays.js` (alphabetical / standard listing).
- **Dashboard / forms** — dropdowns that use `data-lipa-barangays` load this list automatically.
- **`xml/barangays.xml`** — one `<barangay>` per barangay with sample metrics (regenerate with `node scripts/gen-barangays-xml.mjs` after editing the JS list).

---

## XML, XSLT & Interactive Editors
| Item | Purpose |
|------|--------|
| `xml/schedules.xml`, `xml/barangays.xml` | Source data; `<?xml-stylesheet?>` points to `xsl/*.xsl` for **static** HTML-like view in supporting browsers. |
| `xsl/*.xsl` | XSLT 1.0 transforms (tables, styling). |
| `html/xml-schedules-editor.html` | Edit/browse schedule XML: filters, **sortable columns**, CRUD (unless `?mode=view`). |
| `html/xml-barangays-editor.html` | Same for barangay performance XML. |
| `html/js/xml-data-core.js` | Load/save XML string, `localStorage`, export file. |

**Sort/filter on raw XML in Firefox:** XSLT output is static. **Sort, filter, and CRUD** are provided by the **HTML editor** pages, not inside the `.xsl` files themselves.

---

## Can Do / Cannot Do Yet

### Can Do
- Role-based menus and URL guards; login, register, logout (client-side).
- Full role-based navigation and core workflows.
- 72-barangay dropdowns and barangays XML sample.
- XML editors: filter, sort, CRUD, export, browser persistence (schedules & barangays).
- XSL transformation when opening XML files in a suitable browser.

### Cannot Do Yet
- **With API off:** static mode can still run using `localStorage`.
- **With API on:** core auth and selected schedules/reports are live via MySQL; several UI-heavy pages still need full API migration.
- No production identity provider (OAuth, etc.); current JWT + bcrypt stack remains app-native.
- No automatic write-back of exported XML into the repository (manual file replace).
- XSLT in the browser is **not** extended with interactive sorting; use the HTML tools instead.

---

## Setup Walkthrough
1. Clone or download this repository.
2. Provision an **Aiven MySQL** service and note the host, port, database, user, password, and CA certificate.
3. Copy `.env.example` to `.env`, then set `DATABASE_URL` using the Aiven URI format with SSL required:  
   `mysql://USER:PASSWORD@HOST:PORT/DATABASE?ssl-mode=REQUIRED`
4. Open **MySQL Workbench**, connect to the Aiven host over SSL, and import `sql/bago_ph_database.sql`.
5. From project root, run `npm install`.
6. Start app in development mode with `npm run dev` (serves Express API + static frontend).
7. Verify `GET /health`, then open the app in browser and test role login flows.
8. Optional: open `xml-schedules-editor.html` / `xml-barangays-editor.html`; append `?mode=view` for read-only.

---

## API & Aiven MySQL Database (Node + Express)

**Stack:** Node.js **20+**, **Express 5**, **mysql2**, **bcryptjs**, **jsonwebtoken**, **CORS**.  
Frontend is **pure HTML/CSS/vanilla JS** with **XML + XSLT 1.0** data views.  
Schema source of truth: **`sql/bago_ph_database.sql`** with **`app_identity`** split auth model.

**Aiven connection and SSL**
- Use `DATABASE_URL` for local and cloud runtime:  
  `mysql://USER:PASSWORD@HOST:PORT/DATABASE?ssl-mode=REQUIRED`
- If using CA pinning, provide cert path/content through env (for example `DB_SSL_CA`) and load into mysql2 SSL config.
- For Render, keep SSL enforced (`ssl-mode=REQUIRED`) and do not disable certificate validation in production.

**Connection pooling**
- API uses pooled mysql2 connections for concurrent auth, schedule, and report requests.
- Configure pool limits through env (for example `DB_CONN_LIMIT`) to match Render instance size and Aiven plan.

**Endpoints (summary):** `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`, `GET /api/barangays`, `GET|POST|PATCH /api/schedules` (LGU writes), `GET|POST|PATCH /api/reports` (resident creates; LGU/collector updates). All protected routes require **`Authorization: Bearer <token>`** except barangays list.

**`POST /api/auth/login` body (either/or):**
- **Resident or collector:** `{ "mobile": "09181234501", "pin": "1234" }` (11-digit Philippine mobile normalized server-side; PIN exactly 4 digits).
- **LGU officer:** `{ "email": "m.santos@lipacity.gov.ph", "password": "LipaDemo2026!" }` (email lowercased server-side; password minimum **10** characters).

**Demo seed data (after `mysql … < sql/bago_ph_database.sql`):**
- **Residents** — mobiles **`09181234501`–`09181234505`** · PIN **`1234`** (bcrypt in `pin_hash`).
- **Collectors** — **`09171111001`–`09171111005`** · PIN **`1234`**.
- **LGU (single demo row)** — email **`m.santos@lipacity.gov.ph`** · password **`LipaDemo2026!`** (bcrypt in `password_hash`), linked to `lgu_admins.admin_id = 6` (*Maria Santos Mercado*). The previous five LGU seed identities (**`09230000001`–`09230000005`**, mobile + PIN only) are **removed** from the canonical SQL file.

With API running, browser prefers server data; if API unreachable in local runs, **`html/js/prototype-page-loader.js`** can fall back to **localStorage** for selected flows.

**Existing databases:** run **`sql/migrations/001_lgu_officer_gov_email_login.sql`** once to add nullable columns, then import the updated LGU seed row from **`sql/bago_ph_database.sql`** section B (or insert manually per this README).

**Single migration file:** schema changes should be applied by editing **`sql/bago_ph_database.sql`** (and re-importing on fresh DBs) or by adding numbered scripts under **`sql/migrations/`** documented next to your deploy process—avoid hand-editing production DB without updating the repo.

**Render `DB_*` environment variables (alternative to `DATABASE_URL`)**
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_SSL_CA` (CA certificate text or mounted secret file path)
- `DB_CONN_LIMIT`

---

## Deployment (Render)

- **Service type:** Render Web Service running Node.js 20+ Express app.
- **Build command:** `npm install`
- **Start command:** `npm start` (or project-defined production start script)
- **Health check route:** `/health`
- **Static frontend path:** Express serves `html/` as static assets in same service as API.
- **Required env vars:** `NODE_ENV=production`, `JWT_SECRET`, and either `DATABASE_URL` (recommended) or `DB_*` variables listed above.
- **CORS:** allow frontend origin(s) from deployed domain only.
- **Frontend API base:** set deployed API URL in `window.__BAGO_API_BASE__` (see `html/js/bago-env.js`) so browser requests point to Render host.

---

## Folder Structure (high level)
| Path | Contents |
|------|----------|
| `server/` | Express API (`index.js`, routes, DB pool, JWT middleware) |
| `html/` | Pages, `role-access.js`, `js/` (barangay list, XML helpers, editors, `bago-api.js`) |
| `css/` | Stylesheets |
| `xml/` | `schedules.xml`, `barangays.xml` |
| `xsl/` | XSLT transforms |
| `sql/` | Database scripts |
| `scripts/` | e.g. `gen-barangays-xml.mjs` to rebuild `xml/barangays.xml` from the JS list |

---

## Notes
- Platform aligns with RA 9003 and SDGs 11, 12, and 13 direction.
- Platform roadmap aligns with RA 10173 privacy and deployable LGU operations requirements.

---

## Future / Missing Improvements
Work that still needs implementation for full municipal-scale deployment:

**Backend & data**
- Broaden **server-side role checks** across every route and screen path (some static flows still fallback to local logic).
- Expand MySQL-backed CRUD coverage to remaining mock-heavy pages and reduce `localStorage` dependence.
- **Server-side** or controlled **write path** for schedule/barangay XML or JSON if that remains a source format.

**Features called out in earlier milestones**
- Deeper **eco-points wallet** and redemption flows tied to real balances.
- **QR verification** pipeline (scan → validate → audit log) with hardware integration.
- **LGU analytics** with live charts and export pipelines.
- **Push notifications** (or email/SMS) when schedules or announcements change.

**Security, compliance & ops**
- **HTTPS**, CSRF protection, rate limiting, and audit logs for LGU actions.
- **RA 10173**-aligned consent and data-minimization for any production deployment.
- **Monitoring, backups, and deployment** hardening.

**UX & content**
- Replace **prompt dialogs** in XML editors with proper modals/forms.
- **Validation** rules for mobile/PIN/barangay fields aligned to LGU policies.
- **Internationalization** (Filipino/English toggles) if required by stakeholders.

**Testing & quality**
- Automated tests (unit/e2e), accessibility audit (WCAG), and cross-browser QA.
