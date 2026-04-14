# BAGO.PH
**Barangay App for Garbage Operations in the Philippines**

BAGO.PH is a community-first prototype that helps residents, collectors, and LGU officers coordinate waste collection, reporting, and compliance in one place.

---

## Table of Contents
- [What BAGO.PH Is](#what-bagoph-is)
- [Who This Is For](#who-this-is-for)
- [Feature Overview](#feature-overview)
- [Role-Based Pages](#role-based-pages)
- [Can Do / Cannot Do Yet](#can-do--cannot-do-yet)
- [Setup Walkthrough](#setup-walkthrough)
- [Project Team](#project-team)
- [Notes](#notes)

---

## What BAGO.PH Is
BAGO.PH is a web prototype for cleaner barangays and better waste operations.  
It gives each role a focused view:
- Residents can view schedules, submit concerns, and track engagement.
- Collectors can monitor routes and scan-related tasks.
- LGU officers can manage users, compliance, reports, and city-level operations.

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
Pages shown in navigation now depend on selected role at login.

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

If someone opens disallowed page directly, app redirects to allowed page.

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
This project runs as a prototype in browser.

1. Download or clone this repository.
2. Open folder `bago.ph-quadstack`.
3. Go to `html` folder.
4. Open `index.html` in browser.
5. Pick role (Resident, Collector, or LGU Officer).
6. Click **Login to BAGO.PH** to enter role-based view.
7. Use top navigation to explore allowed pages for chosen role.

Optional files for class/demo review:
- `xml` and `xsl` folders for XML/XSL outputs.
- `sql` folder for schema and sample SQL artifacts.

---

## Project Team
- Carlos Kent D. Del Rio — CEO / Lead Developer
- Kimberly Claire A. Aliwate — COO / UI/UX Designer
- Kenneth Elijah N. Castillo — CTO / Frontend Developer
- Miguel Yuan M. Mercado — CPO / Database Administrator

**Course:** FreeElective 1 | Technopreneurship  
**Section:** IT3B | University of Batangas — CITEC  
**Academic Year:** 2025–2026

---

## Notes
- Prototype aligns with RA 9003 goals and SDGs 11, 12, and 13 direction.
- Current build intended for demonstration, validation, and milestone progression.