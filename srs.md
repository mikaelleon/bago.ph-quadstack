# Software Requirements Specification (SRS)
## BAGO.PH — Barangay App for Garbage Operations (Web Edition)

---

## 1. Project Description

### 1.1 Introduction
BAGO.PH is municipal waste-operations web platform for barangays and LGUs in Philippines.
It addresses recurring local gaps: delayed schedule advisories, weak report tracking, low segregation compliance, and fragmented records across offices.
RA 9003 requires organized solid-waste management and active citizen participation; BAGO.PH operationalizes those requirements through auditable digital workflows.
UNEP and World Bank publications on urban waste systems reinforce need for traceable collection, data-backed compliance monitoring, and community participation incentives.
PNA 2025 coverage on local waste-pressure indicators further supports urgency for city-level digital coordination.

This web edition uses:
- Frontend: pure HTML5, CSS3, vanilla JavaScript (no frameworks, no build step).
- Data display and transform: XML 1.0 + XSLT 1.0 for structured views, filters, sorting, and printable exports.
- Backend: Node.js 20+ with Express 5, JWT authentication, bcrypt password/PIN hashing.
- Database: Aiven MySQL cloud instance over SSL (admin operations via MySQL Workbench).
- Hosting: Render web service serving both API endpoints and static HTML pages.

Out of scope for this document:
- Supabase, PostgreSQL, Flutter, Firebase Cloud Messaging.
- Mobile app packaging, PWA-specific requirements, app-store release sections.
- Direct GCash/Maya payment integrations (retained only as future integration note).

### 1.2 Product Purpose
BAGO.PH web platform has five core purposes:

1. **Operational Coordination**
   Provide role-specific dashboards for residents, collectors, and LGU officers to coordinate schedules, reports, and enforcement actions in one system.

2. **Compliance Visibility**
   Track segregation and collection performance with auditable records aligned to RA 9003 reporting and local enforcement workflows.

3. **Incident Reporting and Resolution**
   Capture resident-submitted waste issues with evidence, workflow status, and accountability trail from submission to closure.

4. **Behavior Incentive via Eco-Points**
   Support eco-points earning and redemption flows, including partner-voucher redemption records.
   GCash/Maya payout integrations are future extensions, not current hard requirements.

5. **Targeted Resident Communication**
   Deliver in-app notification banners for schedule/report/announcement updates, with configurable email/SMS integration hooks for future rollout.

### 1.3 Intended Audience
This SRS is for:
- Product owners and implementation teams building BAGO.PH web platform.
- LGU digital transformation units, CENRO operations teams, and barangay administrators.
- QA, security, and DevOps teams validating production readiness.
- Project stakeholders evaluating requirement completeness and rollout fitness.

This specification is written for technical and operational review across public-sector and implementation stakeholders.

### 1.4 Intended Use
BAGO.PH is accessed through modern web browsers on desktop or mobile devices with internet connectivity.
System supports:
- Resident self-service (schedule viewing, reporting, eco-points status).
- Collector work views (route updates, QR verification workflow, assigned reports).
- LGU officer governance views (scheduling, compliance analytics, DENR-oriented exports, user administration).

The platform is deployed as single Render-hosted web service that serves static web frontend and API.
Client-side pages consume API endpoints over HTTPS with JWT-based session model.
XML and XSLT views are available in supported browsers for structured records and printable outputs.

### 1.5 User Class and Characteristics

| User Class | Primary Responsibilities | Technical Proficiency | Access Device | Access Level |
|---|---|---|---|---|
| Resident | View schedules, submit reports, track eco-points, read announcements | Basic | Mobile browser or desktop browser (Chrome/Edge/Firefox/Safari latest) | Own records + public barangay advisories |
| Garbage Collector | Manage route tasks, update assigned report statuses, verify QR events | Basic to intermediate | Mobile browser (field) and desktop browser (office) | Assigned operational records |
| LGU Officer | Manage schedules, reports, analytics, exports, announcements, and user controls | Intermediate to advanced | Desktop browser (primary), tablet browser (secondary) | Barangay or city-wide administrative scope |
| DENR/Compliance Reviewer | Review generated compliance outputs and exported summaries | Intermediate | Desktop browser | Read-only compliance artifacts |
| System Administrator | Configure deployment, secrets, DB connectivity, monitoring | Advanced | Desktop browser + admin console tools | Full system administration |

---

## 2. System Features and Requirements

### 2.1 Functional Requirements (FR) and Non-Functional Requirements (NFR)

#### Functional Requirements

**FR-01 — Role-Based Authentication and Access**
- System shall authenticate resident and collector via mobile number + 4-digit PIN or password policy defined by account type.
- System shall authenticate LGU officers via government email + password.
- System shall issue JWT on successful login and enforce expiration.
- System shall enforce authorization using server-side role middleware on all protected routes.

**FR-02 — Schedule and Report Management**
- Authorized LGU accounts shall create, update, and cancel collection schedules.
- Residents shall submit waste reports with photo, location metadata, and issue category.
- Collectors/LGU officers shall update report statuses through defined workflow.
- System shall keep immutable audit trail for critical state changes.

**FR-03 — Notifications and Communications**
- System shall display in-app notification banners for schedule changes, report updates, eco-point events, and announcements.
- System shall support email/SMS hook points for future outbound communication services.
- System shall provide announcement targeting by barangay scope and urgency level.

**FR-04 — Analytics, Exports, and Compliance**
- System shall provide compliance and operations dashboards for authorized users.
- System shall export structured data via XML for defined reports and filters.
- System shall support XSLT-driven transformation to printable HTML and PDF-ready layouts.
- System shall provide CSV export options for operational and regulatory reporting.

#### Non-Functional Requirements

**NFR-01 — Performance**
- Schedule pages shall reach interactive state within 2 seconds on broadband network under normal load.
- Photo upload (compressed to <=500KB) shall complete within 8 seconds on broadband.
- Login response shall complete within 1.5 seconds under normal load.
- Dashboard data refresh shall complete within 3 seconds for standard LGU view.

**NFR-02 — Availability**
- Production service shall maintain minimum 99.5% monthly uptime on Render deployment.
- Health endpoint (`/health`) shall expose liveness status for monitoring and orchestration.

**NFR-03 — Scalability**
- System shall support at least 5,000 concurrent users through horizontal and/or vertical scaling strategy on hosting tier.
- API and DB access shall use connection pooling and controlled query limits.

**NFR-04 — Maintainability**
- Frontend shall remain framework-free and modular via reusable vanilla-JS modules and shared CSS design system.
- Backend routes, middleware, and services shall be organized by domain (`auth`, `barangays`, `schedules`, `reports`, etc.).

**NFR-05 — Reliability and Data Integrity**
- Critical writes (eco-points, report status transitions, schedule changes) shall be transactional where applicable.
- Exported documents shall map to source records with deterministic filters and timestamps.

**NFR-06 — Compliance and Privacy**
- Personal data handling shall align with RA 10173 principles (data minimization, purpose limitation, access controls).
- Waste governance features shall support RA 9003 compliance workflows and evidence tracking.

### 2.2 System Features Table

| ID | Feature Name | Description | Primary Users |
|---|---|---|---|
| F-01 | Authentication and Role Access | JWT-based login and role routing for resident, collector, and LGU officer users | All |
| F-02 | Dashboard Overview | Live operations snapshots for each role with role-specific widgets and data cards | All |
| F-03 | Schedule Management | Create/update/cancel collection schedules with barangay targeting and status controls | LGU Officer |
| F-04 | Waste Report Console | Resident report intake, assignment, status updates, and resolution timeline | Resident, Collector, LGU Officer |
| F-05 | Collector Route Management (Web) | Browser-based collector route page with task progression, scan-status markers, and completion tracking | Collector, LGU Officer |
| F-06 | Compliance Analytics | Barangay and waste-type compliance indicators, trend views, and alert flags | LGU Officer, DENR Reviewer |
| F-07 | Eco-Points Program Management | Points earning/redeem ledger views, wallet summaries, and admin oversight tools | Resident, LGU Officer |
| F-08 | XML/XSLT Data Editors and Export | Schedule and barangay XML editors with filter, sort, CRUD, and XSL-driven HTML/PDF export pipeline | LGU Officer, Admin |
| F-09 | DENR Report Generator | Regulatory summary generation with PDF/CSV outputs based on validated records | LGU Officer, DENR Reviewer |
| F-10 | User and QR Audit Management | Account lifecycle control, QR verification logs, and fraud/abuse flags | LGU Officer, Admin |

### 2.3 Hardware Requirements

| Layer | Minimum Requirement |
|---|---|
| End User Device | Any modern desktop/laptop or mobile device capable of running latest Chrome, Edge, Firefox, or Safari |
| End User Connectivity | Stable internet connection (broadband recommended for media uploads and dashboard refresh) |
| Server Runtime | Render web service tier with minimum 512MB RAM |
| Database Hosting | Aiven MySQL managed instance with SSL enabled |
| Admin Workstation | Desktop/laptop capable of running MySQL Workbench and browser-based admin portals |

### 2.4 Software Requirements

| Category | Requirement |
|---|---|
| Frontend | HTML5, CSS3, vanilla JavaScript (no framework, no build step) |
| Structured Data Layer | XML 1.0 + XSLT 1.0 (browser transform and export formatting) |
| Backend Runtime | Node.js 20+ |
| Web Framework | Express 5 |
| Database Driver | mysql2 |
| Authentication | bcryptjs + jsonwebtoken (JWT) |
| Database | Aiven MySQL (SSL required) |
| Hosting | Render web service |
| Development Tools | VS Code, GitHub, MySQL Workbench, Figma |
| Testing Tools | Browser devtools, API test clients, automated test runner (project-selected) |

### 2.5 Performance Requirements

| Metric ID | Performance Target | Condition |
|---|---|---|
| PERF-01 | Schedule page time-to-interactive < 2s | Broadband, warm cache, standard payload |
| PERF-02 | Photo upload <= 8s for <=500KB image | Broadband, normal service load |
| PERF-03 | Login completion < 1.5s | Valid credentials, normal load |
| PERF-04 | Dashboard refresh < 3s | LGU dashboard default filter |
| PERF-05 | XML export < 4s for 1,000 rows | Filtered export request |
| PERF-06 | Service uptime >= 99.5% monthly | Production Render deployment |
| PERF-07 | Concurrent usage >= 5,000 users | Scaled runtime + pooled DB connections |

### 2.6 Safety Requirements

**SR-01 — Controlled Media Capture**
- Report submission shall support camera/file input through browser `<input type="file" capture>`.
- Capture action shall occur only when user explicitly submits media.

**SR-02 — Controlled Location Collection**
- Geolocation API shall request permission per report submission.
- System shall not continuously track location in background.

**SR-03 — Upload Size Guardrail**
- Client-side image compression shall reduce report image size to <500KB prior to upload when feasible.
- System shall reject oversize uploads with clear user feedback.

**SR-04 — Eco-Point Idempotency**
- Eco-point credit/debit writes shall enforce idempotency keys or equivalent dedup controls.
- Duplicate scan/credit events shall not produce double ledger writes.

**SR-05 — Eco-Point Grace Policy**
- Reward-related eco-point eligibility windows shall include 30-day grace handling for valid delayed reconciliations.
- Grace adjustments shall be auditable and role-restricted.

**SR-06 — LGU Session Safety Timeout**
- LGU administrative sessions shall auto-expire after 30 minutes idle time.
- Re-authentication shall be required for resumed privileged actions.

### 2.7 Security Requirements

**SEC-01 — Transport Security**
- All production traffic shall use TLS 1.2+ over HTTPS.
- Plain HTTP shall redirect or be blocked except approved local-development use.

**SEC-02 — Credential and Session Protection**
- Passwords and PINs shall be stored as bcrypt hashes only.
- JWT shall be signed with strong secret key from environment variables and include expiration.

**SEC-03 — Authorization Enforcement**
- Server-side role middleware shall enforce protected-route permissions for all non-public endpoints.
- Data access shall use parameterized SQL queries to prevent injection.

**SEC-04 — QR Token Security**
- QR tokens shall use UUIDv4 or equivalent high-entropy identifiers.
- Invalid, replaced, or expired tokens shall fail verification and log attempt metadata.

**SEC-05 — Immutable Eco-Points Ledger**
- Eco-points transaction records shall be append-only.
- Reversals shall use compensating entries, not destructive updates.

**SEC-06 — Report Media Access Control**
- Report image access shall use signed URLs with expiration or equivalent controlled-delivery mechanism.
- Access shall be role-limited and auditable.

**SEC-07 — Privacy and Regulatory Compliance**
- Personal data usage shall comply with RA 10173 requirements.
- System shall enforce minimum necessary data exposure per role.

**SEC-08 — Secrets Management**
- All credentials, keys, and DB connection details shall be stored in environment variables only.
- No plaintext secrets shall be committed to repository.

### 2.8 Quality Attributes

| Attribute | Requirement |
|---|---|
| Usability | Clear role-based navigation and consistent interaction patterns across all pages |
| Accessibility | WCAG 2.1 AA target; keyboard navigation support; contrast compliance; NVDA/JAWS screen-reader testing |
| Modularity | Modular vanilla-JS modules with shared CSS design system for reuse and maintainability |
| Interoperability | XML/XSLT output compatibility for browser viewing and standards-based data interchange |
| Scalability | API and DB layers support growth through pooled connections and hosting tier upgrades |
| Reliability | Critical workflows include validation, retries, and transaction-safe writes |
| Auditability | Administrative writes, status changes, and ledger events persist with actor and timestamp metadata |
| Portability | Browser-based client works across modern desktop and mobile browsers without install |
| Maintainability | Domain-structured backend and documented schema/migrations for controlled evolution |

---

## 3. Software Analysis Design Model

### 3.1 Flowchart (Placeholder)

**Existing Process (Stub)**
Current barangay waste workflows rely on mixed manual advisories, paper logs, and disconnected channels.
Schedule changes, report follow-ups, and compliance summaries often require manual reconciliation.

**Proposed Process (Stub)**
BAGO.PH centralizes schedule, reporting, enforcement, and export workflows into role-based web platform.
Data enters once, flows through authenticated services, and exits as dashboards plus regulatory outputs.

### 3.2 Use Case (Placeholder)

**Actors**
- Resident
- Garbage Collector
- LGU Officer
- DENR/Compliance Reviewer
- System Administrator

**Primary Use Cases**
- UC-01 Register/Login with role credentials
- UC-02 View and acknowledge collection schedules
- UC-03 Submit waste issue report with photo + location
- UC-04 Assign/update report status and resolution notes
- UC-05 Update collector route completion state
- UC-06 Verify QR event and record eco-point transaction
- UC-07 Publish in-app announcement banner
- UC-08 Generate XML/XSLT-based exports (HTML/PDF/CSV)
- UC-09 Review compliance analytics and DENR report summaries
- UC-10 Manage users, permissions, and audit records

### 3.3 Data Flow Diagram (Placeholder)

**DFD Level 0 (Context)**
- External entities: Resident, Collector, LGU Officer, DENR Reviewer.
- Core process: BAGO.PH Web Platform.
- Data stores: Aiven MySQL, report media storage, export artifacts.
- Main flows: auth credentials, schedules, reports, eco-points events, announcements, compliance exports.

**DFD Level 1 (Major Subsystems)**
- Process A: Identity and Access Management (JWT issuance and validation).
- Process B: Schedule and Route Operations.
- Process C: Report Intake and Resolution Tracking.
- Process D: Eco-Points Ledger and Reward Events.
- Process E: Analytics and Compliance Export Services.

**DFD Level 2 (Selected Expanded Flow Stubs)**
- Process C.1 Report Submission validation -> media handling -> report table write -> notification event.
- Process B.2 Schedule update -> role check -> DB update -> banner/communication event.
- Process E.1 Filtered XML query -> XML response -> XSL transform -> HTML/PDF-ready output.

### 3.4 Entity Relationship Diagram (Placeholder)

**Core Tables (8)**
1. `residents`
2. `collectors`
3. `lgu_admins`
4. `app_identity`
5. `barangays`
6. `schedules`
7. `reports`
8. `eco_points_ledger`

**Key Relationships (Stub)**
- `app_identity` has 1:1 auth linkage with `residents`, `collectors`, or `lgu_admins` based on role.
- `barangays` has 1:N relationship with `residents`, `collectors`, `schedules`, and `reports`.
- `schedules` entries belong to `barangays` and are created/updated by LGU officers.
- `reports` entries are submitted by `residents`, optionally assigned to `collectors`, and reviewed by `lgu_admins`.
- `eco_points_ledger` references resident identity and source event (e.g., validated report, QR verification, redemption).

---

## Appendix A — Compliance and Policy Alignment Notes

### A.1 RA 9003 Alignment
- Schedule visibility and collection tracking support LGU operational responsibilities under Ecological Solid Waste Management Act.
- Segregation verification and analytics support source-segregation enforcement and monitoring.
- DENR-ready exports support periodic reporting discipline.

### A.2 RA 10173 Alignment
- Role-scoped data access, masked displays, and auditable access events reduce privacy risk.
- Credentials, tokens, and secrets are managed in environment variables only.
- Data minimization applied to resident-facing and officer-facing views.

### A.3 International Context References
- UNEP guidance on urban waste governance emphasizes data-driven monitoring and citizen participation.
- World Bank municipal solid-waste analyses highlight need for operational transparency and service-performance metrics.
- PNA 2025 local reporting underscores urgency of resilient LGU waste operations and compliant reporting.

---

## Appendix B — Deployment and Environment Baseline

### B.1 Render Service Baseline
- Single Render web service hosts Express API and static HTML frontend.
- Health route: `/health`.
- Build command: `npm install`.
- Start command: `npm start` (or equivalent production script).

### B.2 Environment Variables (Minimum)
- `NODE_ENV=production`
- `JWT_SECRET`
- `DATABASE_URL` (with `?ssl-mode=REQUIRED`) or equivalent `DB_*` variables
- `DB_SSL_CA` (if CA pinning used)

### B.3 Aiven MySQL Baseline
- Managed MySQL instance over SSL required.
- Connection pooling enabled in API.
- Schema source and migration scripts versioned in repository.
- Administrative SQL operations performed through MySQL Workbench.

---

## Appendix C — Explicit Scope Exclusions
- No Flutter client implementation requirements.
- No Supabase/PostgreSQL-specific features or RLS policies.
- No Firebase Cloud Messaging dependency.
- No PWA install/offline service-worker specification.
- No direct payment gateway integration (GCash/Maya remain future integration hooks only).

