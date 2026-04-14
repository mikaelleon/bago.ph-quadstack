# BAGO.PH — Web Application Features
## Based on the Technopreneurship Proposal and Business Plan Documents
### IT3B | FreeElective 1 | University of Batangas — CITEC | 2025–2026

---

## OVERVIEW

The BAGO.PH web application is the **LGU-facing administrative interface**. It is accessed through any modern browser by barangay captains, City Environment and Natural Resources Officers (CENROs), and DENR-affiliated compliance officers. It is not a public-facing website. It is a restricted operations platform that only authorized LGU accounts can log into.

The web app is built as a **React web application** consuming the same Supabase backend used by the mobile app. All data displayed on the web dashboard is live and sourced directly from resident interactions on the mobile app — QR scan confirmations, photo reports, schedule updates, and eco-point redemptions.

---

## USER TYPES WITH WEB ACCESS

| Role | Access Level | Primary Use |
|---|---|---|
| CENRO Officer | Full access — all barangays in jurisdiction | Analytics, report export, system-wide oversight |
| Barangay Captain | Limited — their barangay only | Schedule management, report assignment, resident data |
| LGU Admin Staff | Configurable by CENRO | Schedule updates, report management |
| DENR/EMB Officer | Read-only — compliance reports only | Certificate verification, data review |

---

## FEATURE 1 — ADMINISTRATOR LOGIN AND AUTHENTICATION

### Description
The web app entry point. Only authorized LGU accounts can access the system. Unauthorized access attempts are logged and flagged.

### Functionality
- Email address and password login form
- Role-based access control — the dashboard displayed after login depends on the account's assigned role and jurisdiction
- Session management — sessions expire after a period of inactivity to protect government data
- Password reset via registered government email address
- Failed login attempt tracking — accounts lock after a configurable number of failed attempts
- All login events are logged with timestamp, IP address, and device information for audit purposes

### Data Requirements
- Admin email address
- Hashed password
- Assigned role (CENRO Chief, Barangay Captain, Environment Officer)
- Assigned barangay or city-wide jurisdiction

---

## FEATURE 2 — LIVE OPERATIONS OVERVIEW DASHBOARD

### Description
The home screen after login. Displays the current operational status of all barangays under the officer's jurisdiction in real time.

### Functionality
- **Six core metric cards** displayed prominently at the top of the screen:
  1. **Collection Completion Rate** — percentage of scheduled collections completed today, with trend indicator (up/down vs. yesterday)
  2. **Open Photo Reports** — count of unresolved resident waste reports, broken down by status (Open, Acknowledged, In Progress)
  3. **Registered Residents** — total BAGO.PH users in the jurisdiction, with monthly active user count
  4. **Active Collectors on Duty Today** — count of collectors currently on shift, completed, and with pending stops
  5. **Eco-Points Distributed This Month** — total points awarded to residents and the peso equivalent of rewards redeemed
  6. **Segregation Compliance Rate** — overall verified compliance percentage from QR scan data, compared to DENR target

- Status indicators: green dot for on target, orange for at risk, red for below target
- Recent activity feed showing the latest schedule changes, report submissions, and QR scan events
- Quick action buttons: Add Schedule, View Reports, Export Data, Send Announcement
- Last sync timestamp showing when the dashboard data was last updated

### Data Sources
- Collection schedules table (completion rate)
- Waste reports table (open report count)
- Residents table (registration count)
- Collectors table (duty status)
- Eco-points transactions table (distribution totals)
- QR codes table (compliance scan data)

---

## FEATURE 3 — COLLECTION SCHEDULE MANAGEMENT

### Description
The primary operational tool for LGU admins. Allows authorized officers to create, update, and cancel garbage collection schedules for any barangay under their jurisdiction. Every change made here triggers an instant push notification to all registered residents in the affected barangay.

### Functionality

**Schedule Calendar View**
- Monthly calendar showing all scheduled collections
- Color-coded by waste type: green for Biodegradable, blue for Non-Biodegradable, orange for Recyclable, grey for Residual
- Click any date to view a summary card with Edit and Delete options
- Week and day view options for detailed route planning

**Add New Schedule Form**
- Barangay selection — multi-select dropdown for batch scheduling across multiple barangays simultaneously
- Waste type selection — checkbox group (Biodegradable, Non-Biodegradable, Recyclable, Residual)
- Collection date — date picker with validation preventing past dates
- Time window — start time and end time pickers
- Special instructions — optional text field for holiday notices, route changes, or resident advisories
- Push notification toggle — default ON, sends alert to all registered residents in selected barangays upon saving
- Save Schedule button — commits the schedule and triggers the notification pipeline

**Edit Existing Schedule**
- Pull up any existing schedule entry
- Modify any field
- Changes are timestamped and attributed to the officer who made them
- Conflict checker — alerts the officer if the new schedule overlaps with an existing collection in the same barangay or creates a collector route conflict

**Cancel Schedule**
- Mark a schedule as Cancelled with a mandatory reason field
- Cancellation triggers a push notification to all affected residents
- Cancelled schedules remain visible in the calendar for audit purposes and are not deleted

**Schedule History Log**
- Full change history for every schedule entry
- Shows original schedule, all modifications, and who made each change with timestamps

### Business Rule
The push notification pipeline is automatic. An LGU admin cannot save a schedule change without it being sent to residents. This eliminates the manual step of posting on Facebook that the current system relies on.

---

## FEATURE 4 — WASTE REPORT MANAGEMENT CONSOLE

### Description
The ticketing system for managing all photo-based waste issue reports submitted by residents through the mobile app. Every report is a tracked ticket with a unique reference number, GPS coordinates, photo evidence, and a full status timeline.

### Functionality

**Report List View**
- Filter bar: All, Open, Acknowledged, In Progress, Resolved, Rejected
- Toggle between list view and map overlay view (all reports shown as pins on a barangay map)
- Sort by: Most Recent, Oldest, Priority Level, Barangay
- Search by reference number or resident name
- Priority color coding: white for Low, yellow for Medium, orange for High, red for Urgent

**Report Detail View**
Accessed by clicking any report card. Shows:
- Full photo uploaded by the resident
- Report reference number (format: RPT-YYYY-XXXXX)
- Resident name (first name and last initial only, per RA 10173)
- Barangay and street address
- GPS coordinates with map pin
- Issue type
- Full description text
- Submission date and time (PST)
- Current status with full status timeline from Open to current state
- Assigned collector name and contact
- Admin notes field — officer can add internal notes visible only to LGU staff

**Report Action Buttons**
- **Assign to Collector** — dropdown to select and assign an available collector
- **Update Status** — manually advance or change the status
- **Export as PDF** — generates a single-report PDF for physical filing
- **Reject Report** — marks report as invalid with a mandatory reason
- **Escalate to City CENRO** — for barangay-level admins who need city-level intervention

**Batch Actions**
- Select multiple open reports and assign them all to one collector in a single action
- Mark multiple resolved reports as closed simultaneously

### Status Flow
```
Open → Acknowledged → In Progress → Resolved
                                  → Rejected
```
Each status change is logged with a timestamp and the officer who made the change. Residents receive a push notification at every status change.

---

## FEATURE 5 — COLLECTOR DEPLOYMENT AND ROUTE MONITORING

### Description
Real-time visibility into the location and progress of all active garbage collectors assigned to barangays under the officer's jurisdiction.

### Functionality

**Deployment Summary**
- Total collectors deployed today
- Collectors currently active on route vs. completed vs. delayed or unresponsive
- Quick alert if any collector has not logged activity in more than 30 minutes

**Individual Collector Status Table**
One row per collector showing:
- Collector name and employee code
- Assigned barangay route and waste type for today
- Shift start time
- Current status: On Route, Completed, Delayed, Off Duty
- Number of households QR-scanned so far
- Number of households remaining
- Last GPS ping timestamp

**Route Completion Map**
- Visual map showing completed stops (green pins), in-progress stops (orange pins), and pending stops (grey pins)
- Identifies gaps where households have not been visited

**Alerts and Flags**
- Auto-flag: collector with no scan activity for 30+ minutes
- Auto-flag: route with QR scan rate below the barangay average (possible segregation issue)
- Auto-flag: barangay with 3 or more open reports filed in the same day (possible systemic collection failure)

---

## FEATURE 6 — SEGREGATION COMPLIANCE ANALYTICS

### Description
Data analytics module showing waste segregation behavior at the barangay level, powered by QR scan verification data collected by collectors in the field.

### Functionality

**Time Period Filter**
- This Week, This Month, Last Quarter, custom date range

**Overall Compliance Overview**
- Verified compliance rate across all barangays in jurisdiction
- Number of households with at least one verified correct segregation in the period
- Total QR scans completed
- Comparison to DENR target compliance rate
- Year-over-year trend

**Compliance by Waste Type**
- Individual compliance rates for Biodegradable, Non-Biodegradable, and Recyclable
- Trend indicator per category: Improving, Stable, or Declining
- Short data-driven note explaining the trend

**Compliance by Barangay**
- Ranked table from highest to lowest compliance rate
- Columns: Barangay Name, Compliance Rate, Trend Badge, QR Scans Recorded, Status Flag
- Auto-flag for barangays that dropped more than 10 percentage points vs. the previous period

**Behavioral Insights**
- Time of day with highest correct segregation rates (based on QR scan timestamps)
- Most frequently mis-segregated waste type
- Correlation between eco-points earned and compliance rate improvement

**Recommended Actions**
- System-generated, data-driven recommendations for the 3 lowest-performing barangays
- Recommendations reference specific data points (e.g., "Barangay Tambo's Non-Biodegradable compliance dropped 14% since February — consider deploying additional signage and scheduling a community assembly")

---

## FEATURE 7 — ECO-POINTS PROGRAM MANAGEMENT

### Description
Administrative oversight of the BAGO.PH eco-points reward program. Allows CENRO officers to monitor program performance, audit point distributions, and identify engagement gaps.

### Functionality

**Program Overview Metrics**
- Total eco-points distributed in the selected period
- Total peso value of rewards redeemed
- Number of unique residents who earned points
- Average points per active resident
- Resident retention rate (percentage who earned points in both this period and the previous period)

**Points Distribution Breakdown**
Table showing points awarded by mission type:
- Segregation Mission (QR-verified)
- Photo Report Validated
- Streak Bonus
- Referral Mission
- Community Mission
- Onboarding Module

Each row shows: mission name, number of completions, total points distributed.

**Rewards Redemption Summary**
Ranked list of top 5 most redeemed rewards showing: reward name, number of redemptions, total points spent, estimated peso value disbursed. Covers all partner rewards: GCash, Maya, DITO, Puregold, Mercury Drug, Jollibee, BATELEC, Lipa City Water District.

**Program Health Indicators**
- Percentage of registered residents actively earning points
- Average days between first point earning and first redemption
- Barangays with the lowest program participation rates

**Recommended Adjustments**
- 2 to 3 system-generated suggestions for improving participation in low-engagement barangays

---

## FEATURE 8 — RESIDENT COMMUNICATION AND ANNOUNCEMENT CENTER

### Description
Broadcast tool for sending official announcements and alerts to all registered residents in one or more barangays simultaneously.

### Functionality

**Compose Announcement Form**
- Title field (max 50 characters — enforced for push notification compatibility)
- Message body (max 300 characters)
- Target barangay — All Barangays or specific selection via multi-select dropdown
- Notification type — General or Urgent (Urgent uses a different visual style on the resident's phone)
- Schedule for Later option — set a future date and time for the notification to send

**Preview Panel**
- Shows exactly how the push notification will appear on a resident's Android and iOS phone lock screen
- Shows the full announcement as it will appear in the BAGO.PH in-app announcement center

**SMS Broadcast Version**
- Auto-generates a shortened version of the announcement (max 160 characters) suitable for barangay text broadcast systems

**Reach Summary**
- Estimated number of residents who will receive the push notification
- Estimated number who will receive the SMS broadcast
- Total households covered
- Percentage of the total barangay population reached

**Announcement History**
- Full log of all announcements sent with timestamp, author, target barangay, and reach count

---

## FEATURE 9 — DENR COMPLIANCE REPORT GENERATOR

### Description
Automated generation of formal DENR and EMB compliance reports. Replaces the manual process of compiling data from paper logs and spreadsheets. Reports are generated from verified BAGO.PH system data and are exportable as PDF or CSV.

### Functionality

**Report Configuration**
- Date range picker for the reporting period
- Checkboxes for data sections to include:
  - Collection Completion Rates
  - Waste Volumes by Type
  - Segregation Compliance Rates
  - Report Resolution Times
  - Resident Participation Rates
  - MRF Status
- Certifying officer name field

**Report Sections Generated**
1. **Report Header** — Republic of the Philippines, DENR, NSWMC letterhead, LGU name, officer name, reporting period, date generated
2. **Solid Waste Generation Summary** — total waste generated, collected, uncollected estimate, collection rate vs. RA 9003 target
3. **Waste Diversion Accomplishments** — diversion by method (recycled, composted, MRF-recovered), total diversion rate vs. 25% minimum
4. **MRF Status** — operational MRF count, MRFs needing repair, barangays without MRF access
5. **Public Participation Data** — BAGO.PH registered households, reports submitted and resolved, QR-verified segregation rate, eco-points participation rate
6. **Challenges and Gaps** — system-identified implementation gaps with recommended action plans
7. **Certification Section** — formal certification statement with officer signature line

**Compliance Certificate QR Code**
- Automatically embedded in every exported PDF
- Format: BAGO-CC-[LGU CODE]-[PERIOD CODE]-[8-CHARACTER HASH]
- Allows DENR/EMB officers to scan and verify the report has not been altered
- Permanent archive record stored in BAGO.PH database

**Export Options**
- Export as PDF (formatted for DENR/EMB submission)
- Export as CSV (raw data for LGU internal use)
- Email report directly to DENR EMB regional office

---

## FEATURE 10 — USER MANAGEMENT

### Description
Administrative control over all user accounts within the LGU's jurisdiction. Allows admins to manage resident accounts, collector accounts, and admin accounts.

### Functionality

**Resident Account Management**
- Searchable list of all registered residents
- Filter by barangay, tier, active/inactive status
- View any resident's full registration details (with data privacy restrictions per RA 10173)
- Suspend or reactivate accounts
- Authorize QR card replacement requests (old token automatically invalidated, new token generated)

**Collector Account Management**
- List of all registered collectors with their assigned barangay routes
- Activate, deactivate, or reassign collectors
- View collector scan history and performance metrics

**Admin Account Management**
- Create new LGU admin accounts with role and jurisdiction assignment
- Edit existing admin roles and permissions
- Deactivate admin accounts when officers leave their position
- Full access log per admin account

---

## FEATURE 11 — QR CODE AUDIT AND MANAGEMENT

### Description
Administrative oversight of the QR code system. Allows LGU admins to manage household QR codes, authorize replacements, and audit the scan history for any household or barangay.

### Functionality

**QR Code Lookup**
- Search any household QR code by Household ID or secure token
- View full code details: type, status, issued date, last scan timestamp

**Replacement Authorization**
- Search resident by Household ID
- Review account details and replacement history (limit: 2 replacements per year)
- Authorize replacement — old token is permanently invalidated, new token generated
- Full audit record created (cannot be deleted)

**QR Scan Audit Log**
- Full chronological log of every QR scan for a selected household or barangay
- Shows: scan date, collector name, waste type confirmed, eco-points credited, GPS coordinates
- Identifies households with zero scans in the selected period
- Identifies collectors with unusually low scan rates

**Security Flags**
- Auto-flag: household QR code scanned more than 3 times in a single day (possible fraud)
- Auto-flag: scan attempt on a suspended or invalidated code
- All flagged events trigger an alert notification to the CENRO officer

---

## SUBSCRIPTION TIERS AND FEATURE ACCESS

| Feature | Starter ₱1,500/mo | Growth ₱2,500/mo | Enterprise ₱5,000/mo |
|---|---|---|---|
| Live Operations Dashboard | ✅ 1 barangay | ✅ Up to 5 barangays | ✅ Unlimited |
| Schedule Management | ✅ | ✅ | ✅ |
| Report Management | ✅ Basic | ✅ Full | ✅ Full + Escalation |
| Collector Monitoring | ❌ | ✅ | ✅ |
| Compliance Analytics | ❌ | ✅ | ✅ |
| Eco-Points Management | ❌ | ✅ | ✅ |
| DENR Report Export | ❌ | ✅ PDF | ✅ PDF + CSV + API |
| User Management | ❌ | ✅ | ✅ |
| QR Audit Log | ❌ | ✅ | ✅ |
| Dedicated Account Manager | ❌ | ❌ | ✅ |
| API Data Export | ❌ | ❌ | ✅ |

---

## TECHNICAL SPECIFICATIONS

| Item | Specification |
|---|---|
| Frontend | React.js web application |
| Backend | Node.js with Express, hosted on Render |
| Database | PostgreSQL via Supabase |
| Authentication | Supabase Auth with Row-Level Security (RLS) |
| Real-time data | Supabase real-time subscriptions |
| Push notifications | Firebase Cloud Messaging (FCM) |
| File exports | Server-side PDF generation, CSV download |
| Data privacy | Compliant with RA 10173 — Data Privacy Act of 2012 |
| Browser support | Chrome, Firefox, Edge (latest versions) |
| Hosting | Render (auto-scales based on traffic) |