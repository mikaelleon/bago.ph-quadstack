# BAGO.PH
**Barangay App for Garbage Operations in the Philippines**

---

## Table of Contents
- [Project Title](#project-title)
- [Group Members](#group-members)
- [Description of the System](#description-of-the-system)
- [Features Completed (30%)](#features-completed-30)
- [Progress Since the 30% Milestone](#progress-since-the-30-milestone)
- [Who This Is For](#who-this-is-for)
- [Feature Overview](#feature-overview)
- [Auth, Registration & Navigation](#auth-registration--navigation)
- [Role-Based Pages](#role-based-pages)
- [Lipa City Barangays (Data)](#lipa-city-barangays-data)
- [XML, XSLT & Interactive Editors](#xml-xslt--interactive-editors)
- [Can Do / Cannot Do Yet](#can-do--cannot-do-yet)
- [Setup Walkthrough](#setup-walkthrough)
- [Folder Structure (high level)](#folder-structure-high-level)
- [Notes](#notes)
- [Future / Missing Improvements](#future--missing-improvements)

---

## Project Title
**BAGO.PH Web Prototype** — a barangay-focused waste operations web prototype for Lipa City–style LGU workflows, built for course milestone delivery and public demonstration.

---

## Group Members
- Carlos Kent D. Del Rio — CEO / Lead Developer
- Kimberly Claire A. Aliwate — COO / UI/UX Designer
- Kenneth Elijah N. Castillo — CTO / Frontend Developer
- Miguel Yuan M. Mercado — CPO / Database Administrator

**Course:** FreeElective 1 | Technopreneurship  
**Section:** IT3B | University of Batangas — CITEC  
**Academic Year:** 2025–2026

---

## Description of the System
BAGO.PH is a **web-based prototype** of a waste management platform meant to connect **residents**, **garbage collectors**, and **LGU officers** in one place. It is designed to reduce confusion around schedules, make reporting easier, and give local government a clearer picture of collection, compliance, and community engagement.

The prototype focuses on **clear screens and flows** rather than live production services: schedules and reports are shown as **demonstration content**. **Login or registration** stores a **role** in the browser (`localStorage`) and **unlocks the main app navbar**; until then, login and registration screens stay **without the main navigation bar**. Role-based rules control which HTML pages appear in the menu and which URLs are allowed.

---

## Features Completed (30%)
Baseline milestone work includes:

**Done (original 30% scope)**
- [x] Landing page and login form (HTML + CSS)
- [x] Collection schedule viewer with XML data display
- [x] XML schedule data structured and valid
- [x] XSL transformation of `schedules.xml` to an HTML table
- [x] Waste issue report submission form
- [x] Basic LGU overview / dashboard page
- [x] SQL database schema with 5 tables
- [x] Sample SQL queries (SELECT, INSERT, UPDATE, DELETE)
- [x] Consistent CSS design system across pages
- [x] Barangay XML data file with XSL transformation

**Originally planned for later milestones (see also [Future / Missing Improvements](#future--missing-improvements))**
- [ ] Eco-points wallet dashboard (deeper than current mock screens)
- [ ] QR code verification system (production-grade)
- [ ] LGU analytics charts (live charts)
- [ ] Push notification simulation
- [ ] Full database connection and backend logic

---

## Progress Since the 30% Milestone
Implemented on top of the baseline above:

- **Dedicated login & registration** — `index.html` (mobile + PIN; role loaded from the saved account for that number) and `register.html` (sign-up with role selection); **no main navbar** on these screens until the user completes login or registration.
- **Client-side access control** — `html/role-access.js` stores role in `localStorage`, hides disallowed nav links, redirects unauthorized URLs, adds **Logout**, and sends already-logged-in users away from login/register toward the dashboard.
- **Official Lipa City barangay list** — all **72 barangays** in `html/js/lipa-barangays.js`, populated into relevant dropdowns via `lipa-barangays-select.js`; `xml/barangays.xml` regenerated with 72 rows (helper: `scripts/gen-barangays-xml.mjs`).
- **XML / XSLT layout** — stylesheets under `xsl/` (e.g. `ecolinisph-schedules.xsl`, `barangays.xsl`); XML files reference them for browser transform (Firefox works best for opening raw `.xml`).
- **Interactive XML pages** — `xml-schedules-editor.html` and `xml-barangays-editor.html`: filter, **column sort**, add/edit/delete in memory, **Save to browser** (`localStorage`), **Export** downloaded XML, **Reload from file** / clear storage; **`?mode=view`** for read-only browse (sort & filter, no CRUD). Raw `.xml` files on disk are **not** overwritten automatically (browser security); replace files manually after export if needed.

---

## Who This Is For
- **Residents** who want clear schedules and easier reporting.
- **Collectors** who need route and field monitoring support.
- **LGU Officers** who need oversight, compliance visibility, and management tools.

---

## Feature Overview
- **Login & Register** — register picks role; login uses mobile + PIN only; session role stored in `localStorage` (prototype only).
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
- Open **`html/index.html`** to log in, or **`html/register.html`** to register. Both pages intentionally **omit** the main app navbar.
- After login or successful registration, the app stores **`bagoRole`** (`user` | `collector` | `lgu_officer`) from the account and opens the **dashboard**.
- If a role is already stored, visiting login or register **redirects to the dashboard**.
- Inside the app, use **Logout** (injected on authenticated pages) to clear the role and return to login.
- **Security note:** this is a **front-end prototype**. There is no real server-side authentication or password hashing.

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
- `index.html`, `register.html`
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
- Full prototype navigation and mock workflows.
- 72-barangay dropdowns and barangays XML sample.
- XML editors: filter, sort, CRUD, export, browser persistence (schedules & barangays).
- XSL transformation when opening XML files in a suitable browser.

### Cannot Do Yet
- No server API or database connection from these HTML pages.
- No real identity provider; PINs are not verified or hashed on a server.
- No automatic write-back of exported XML into the repository (manual file replace).
- XSLT in the browser is **not** extended with interactive sorting; use the HTML tools instead.

---

## Setup Walkthrough
1. Clone or download this repository.
2. Open `bago.ph-quadstack/html/`.
3. Open **`index.html`** in a modern browser (Chrome is fine for the app; **Firefox** is recommended if you open **`xml/*.xml`** directly to see XSLT).
4. **Log in** or go to **`register.html`** to create a session with a role.
5. Explore pages from the navbar; use **Logout** to return to login.
6. Optional: open **`xml-schedules-editor.html`** / **`xml-barangays-editor.html`** from the Schedule page links or dashboard (role permitting). Append **`?mode=view`** for read-only.
7. Optional: serve the folder with a simple HTTP server if you need `fetch()` to load `../xml/*.xml` without file-scheme restrictions (otherwise embedded fallbacks still work).

For class review: **`sql/`** (schema and queries), **`xml/`** + **`xsl/`**, **`prompt/`** docs.

---

## Folder Structure (high level)
| Path | Contents |
|------|----------|
| `html/` | Pages, `role-access.js`, `js/` (barangay list, XML helpers, editors) |
| `css/` | Stylesheets |
| `xml/` | `schedules.xml`, `barangays.xml` |
| `xsl/` | XSLT transforms |
| `sql/` | Database scripts |
| `scripts/` | e.g. `gen-barangays-xml.mjs` to rebuild `xml/barangays.xml` from the JS list |

---

## Notes
- Prototype aligns with RA 9003 and SDGs 11, 12, and 13 direction.
- Build is for demonstration and milestone progression, not production deployment.

---

## Future / Missing Improvements
Work that still **needs** or **would benefit from** implementation for a production or thesis-final system:

**Backend & data**
- Real **authentication** (hashed passwords, sessions or tokens, optional OAuth), server-side role checks.
- **Database connection** and CRUD APIs replacing `localStorage` and manual XML export.
- **Server-side** or controlled **write path** for schedule/barangay XML or JSON if that remains a source format.

**Features called out in earlier milestones**
- Deeper **eco-points wallet** and redemption flows tied to real balances.
- **QR verification** pipeline (scan → validate → audit log) with hardware integration.
- **LGU analytics** with live charts and export pipelines.
- **Push notifications** (or email/SMS) when schedules or announcements change.

**XML / XSLT**
- Optional **single backend** that serves transformed XML or JSON so all browsers behave consistently without `file://` limits.
- If interactive sorting is ever required **inside** raw XSLT output without JavaScript, that would need a **different architecture** (e.g. server-rendered pages or a SPA); current approach uses **HTML editors** for interactivity.

**Security, compliance & ops**
- **HTTPS**, CSRF protection, rate limiting, and audit logs for LGU actions.
- **RA 10173**-aligned consent and data-minimization for any production deployment.
- **Monitoring, backups, and deployment** hardening.

**UX & content**
- Replace **prompt dialogs** in XML editors with proper modals/forms.
- **Validation** rules for mobile/PIN/barangay fields aligned to LGU policies.
- **Internationalization** (Filipino/English toggles) if required by stakeholders.

**Testing & quality**
- Automated tests (unit/e2e), accessibility audit (WCAG), and cross-browser QA beyond the prototype happy path.

This list is not exhaustive; it reflects the gap between the **current static + client-side prototype** and a **deployable municipal system**.
