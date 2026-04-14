# BAGO.PH
**Barangay App for Garbage Operations in the Philippines**

---

## Table of Contents
- [Project Title](#project-title)
- [Group Members](#group-members)
- [Description of the System](#description-of-the-system)
- [Features Completed (30%)](#features-completed-30)
- [Who This Is For](#who-this-is-for)
- [Feature Overview](#feature-overview)
- [Role-Based Pages](#role-based-pages)
- [Can Do / Cannot Do Yet](#can-do--cannot-do-yet)
- [Setup Walkthrough](#setup-walkthrough)
- [Notes](#notes)

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

The prototype focuses on **clear screens and flows** rather than live production services: schedules and reports are shown as **demonstration content**, and **role selection at login** controls which pages each user type can open. The goal is to show how a full system could work—schedules, issue reports, eco-points motivation, QR-related oversight, and LGU dashboards—before backend and mobile apps are fully built.

---

## Features Completed (30%)
Work finished at the **30% milestone** includes:

**Done**
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

**Planned for later milestones**
- [ ] Eco-points wallet dashboard (target — 60% milestone)
- [ ] QR code verification system (target — 60% milestone)
- [ ] LGU analytics charts (target — 60% milestone)
- [ ] Push notification simulation (target — 100% milestone)
- [ ] Full database connection and backend logic (target — 100% milestone)

---

## Who This Is For
- **Residents** who want clear schedules and easier reporting.
- **Collectors** who need route and field monitoring support.
- **LGU Officers** who need oversight, compliance visibility, and management tools.

---

## Feature Overview
- **Home & Login**: entry point with role selection.
- **Dashboard**: high-level waste operations snapshot.
- **Collection Schedule**: planned routes and collection timing.
- **Report Management**: issue reporting and follow-up workflow.
- **Collectors**: deployment and route monitoring.
- **Compliance**: segregation compliance analytics.
- **Eco-Points**: community incentives and point tracking.
- **Announcements**: updates and information broadcast.
- **DENR Reports**: compliance-oriented report generation.
- **User Management**: resident, collector, and officer account management.
- **QR Audit**: QR-related validation and audit page.

---

## Role-Based Pages
Pages shown in navigation depend on the role selected at login.

### Resident (`user`)
Can access:
- `index.html`
- `dashboard.html`
- `schedule.html`
- `report.html`
- `eco-points.html`
- `announcements.html`

### Collector (`collector`)
Can access:
- `index.html`
- `dashboard.html`
- `schedule.html`
- `report.html`
- `collectors.html`
- `announcements.html`
- `qr-audit.html`

### LGU Officer (`lgu_officer`)
Can access:
- `index.html`
- `dashboard.html`
- `schedule.html`
- `report.html`
- `collectors.html`
- `compliance.html`
- `eco-points.html`
- `announcements.html`
- `denr-reports.html`
- `users.html`
- `qr-audit.html`

If someone opens a disallowed page directly, the app redirects to an allowed page.

---

## Can Do / Cannot Do Yet

### Can Do
- Role-based page visibility for resident, collector, and LGU officer.
- Frontend navigation across all major feature pages.
- Static workflows for schedule viewing, reporting, monitoring, and management.
- Prototype-level dashboard and operational views.
- XML/XSL and SQL files included for academic and demonstration use.

### Cannot Do Yet
- No full backend/API integration for live production data.
- No real authentication server (role selection is frontend prototype behavior).
- No full push notification delivery system.
- No complete end-to-end QR scanning service integration.
- No production deployment hardening yet (security, monitoring, scaling).

---

## Setup Walkthrough
This project runs as a prototype in the browser.

1. Download or clone this repository.
2. Open the folder `bago.ph-quadstack`.
3. Go to the `html` folder.
4. Open `index.html` in a browser.
5. Pick a role (Resident, Collector, or LGU Officer).
6. Click **Login to BAGO.PH** to enter the role-based view.
7. Use the top navigation to explore the pages allowed for that role.

Optional files for class or demo review:
- `xml` and `xsl` folders for XML/XSL outputs.
- `sql` folder for schema and sample SQL artifacts.

---

## Notes
- Prototype aligns with RA 9003 goals and SDGs 11, 12, and 13 direction.
- Current build is intended for demonstration, validation, and milestone progression.
