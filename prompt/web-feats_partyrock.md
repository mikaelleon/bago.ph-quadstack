# BAGO.PH — Web Application Features
## Based on the AWS PartyRock Interactive Demo Prototype
### IT3B | FreeElective 1 | University of Batangas — CITEC | 2025–2026

---

## OVERVIEW

The **BAGO.PH AWS PartyRock Prototype** is an interactive AI-powered demo built to simulate the core features of the BAGO.PH platform. It was built using AWS PartyRock's no-code AI app builder and serves as a functional proof-of-concept that demonstrates how the system behaves across all three user roles — residents, garbage collectors, and LGU administrators.

Each widget in the prototype is an AI-powered component that accepts user text inputs and generates realistic, Philippine-context outputs simulating real system behavior. The prototype does not connect to a live database but generates outputs that are internally consistent, contextually accurate, and operationally realistic.

---

## WIDGET 1 — USER ROLE AND BARANGAY SETUP

### Widget Type
Two side-by-side user text input fields (entry point — feeds all other widgets)

### Purpose
Establishes the user's role and location so that every subsequent widget personalizes its output accordingly.

### Inputs
| Field | Placeholder Example |
|---|---|
| Your Role | "Resident", "Collector", or "LGU Admin" |
| Barangay and City | "Barangay Marawoy, Lipa City, Batangas" |

### Output
A welcome card that confirms the selected role and barangay, briefly describes what features are available for that role, and directs the user to the next relevant widget.

### How It Feeds Other Widgets
- All subsequent AI generation widgets reference both inputs
- Role determines what perspective the output is written from
- Barangay determines the specific location used in all generated data (schedule dates, barangay names, collector names, compliance rates)

### Personalization Behavior
- If role is **Resident** — widgets show schedules, report forms, eco-points wallet, and leaderboard
- If role is **Collector** — widgets show route assignments, QR scan confirmations, and assigned reports
- If role is **LGU Admin** — widgets show the analytics dashboard, report management console, and DENR report generator

---

## WIDGET 2 — REAL-TIME COLLECTION SCHEDULE VIEWER

### Widget Type
AI Text Generation connected to Widget 1 (Role and Barangay inputs)

### Purpose
Simulates the BAGO.PH collection schedule feature. Shows what a resident, collector, or LGU admin would see when they open the schedule section of the app.

### Output by Role

**Resident View**
- 7-day schedule table with columns: Day, Date, Waste Type (with emoji color codes), Time Window, Status Badge
- Today's row is bold
- One push notification card showing a recent schedule alert sent in the last 24 hours (notification title, body, timestamp, officer who made the change)
- 2 segregation reminders specific to the entered barangay

**Collector View**
- Route assignment card for today
- List of assigned barangay stops with waste type per stop
- Estimated time per stop
- QR scan count tracker showing progress

**LGU Admin View**
- Week summary table for 5 barangays
- Columns: Barangay Name, Scheduled, Completed, Updated, Cancelled, Completion Rate
- Total completion percentage across all barangays

### Status Values Shown
- 🟢 Scheduled
- 🟡 Updated
- 🔴 Cancelled

---

## WIDGET 3 — WASTE ISSUE DESCRIPTION INPUT

### Widget Type
User text input field

### Purpose
Collects the resident's description of a waste problem for the issue reporting simulation.

### Input
| Field | Details |
|---|---|
| Issue Description | Max 300 characters. Resident describes the waste problem including street name, type of issue, and how long it has been there. |
| Reporter Name (Optional) | First name and last name for the ticket. |

### Placeholder Example
"There is an overflowing garbage bin on Rizal Street corner Mabini Street, Barangay Marawoy, Lipa City. The bin has not been collected in 3 days and is attracting flies near a school."

### Feeds Into
Widget 4 — Issue Report Confirmation Card

---

## WIDGET 4 — ISSUE REPORT CONFIRMATION CARD

### Widget Type
AI Text Generation connected to Widget 3 (Waste Description) and the Reporter Name input

### Purpose
Simulates the official ticket confirmation that BAGO.PH generates after a resident submits a waste report.

### Output Structure

```
BAGO.PH WASTE REPORT TICKET
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Report Reference:   RPT-2025-XXXXX
Reported By:        [Name or Anonymous Resident]
Location:           [Street and Barangay from description]
GPS Coordinates:    [Realistic coordinates]
Issue Type:         [Determined from description]
Date and Time:      [Realistic PST timestamp]
Current Status:     OPEN
━━━━━━━━━━━━━━━━━━━━━━━━━━━
ISSUE DESCRIPTION:  [Restated cleanly]
━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT HAPPENS NEXT:
Step 1 — Report sent to barangay CENRO officer
Step 2 — Collector assigned within 24 hours
Step 3 — Push notification when status changes
Expected Resolution: 24 to 48 hours
━━━━━━━━━━━━━━━━━━━━━━━━━━━
ECO-POINTS REWARD: +15 points upon validation
━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Issue Types Auto-Detected from Description
- Missed Pickup
- Overflowing Bin
- Illegal Dumping
- Blocked Road
- Other

---

## WIDGET 5 — ECO-POINTS WALLET ENTRY POINT SELECTOR

### Widget Type
User text input

### Purpose
Determines whether the user is a new resident registering for the first time or a returning user logging in. Routes to the correct next widget.

### Input
| Input | Options |
|---|---|
| New or Returning | Type "NEW" to register or "RETURNING" to log in |

### Output

**If NEW** — Displays a welcome card listing what the user needs for registration (full name, mobile number, barangay, street address, 4-digit PIN) and what they will receive (Household ID, QR code card, 3 welcome missions, starting balance of 0 points).

**If RETURNING** — Displays a login prompt directing the user to enter their mobile number and 4-digit PIN in the next widget.

---

## WIDGET 6 — NEW RESIDENT WALLET REGISTRATION

### Widget Type
Five separate user text input fields

### Purpose
Simulates the one-time wallet registration process for new BAGO.PH residents. Collects all the information needed to create a unique, fraud-resistant account.

### Input Fields
| Field | Placeholder Example |
|---|---|
| Full Name | "Maria Clara Santos" |
| Mobile Number | "09171234567" |
| Barangay and City | "Barangay Marawoy, Lipa City, Batangas" |
| Street Address | "12 Rizal Street, Purok 3, Barangay Marawoy" |
| 4-Digit PIN | "4872 (choose any 4 digits you will remember)" |

### Feeds Into
Widget 7 — Registration Confirmation and Household ID Generator

---

## WIDGET 7 — REGISTRATION CONFIRMATION AND HOUSEHOLD ID GENERATOR

### Widget Type
AI Text Generation connected to all 5 inputs from Widget 6

### Purpose
Simulates the BAGO.PH system generating a unique Household ID, QR code card, and welcome package for a newly registered resident.

### Output Structure

**Output 1 — Registration Confirmation Card**
- Household ID (format: BAGO-[4-LETTER BARANGAY CODE]-[YEAR]-[5-DIGIT NUMBER])
- Primary account holder name
- Registered mobile (masked — last 4 digits only)
- Registered barangay and address
- PIN display (shown as ●●●●)
- Registration date
- Starting balance: 0 Eco-Points

**Output 2 — QR Code Card Layout**
- Text-based representation of the physical household QR card
- Shows: Household ID, account holder first name, barangay, address, secure token (format: BAGO-[6-char alphanumeric])
- Warning notice to keep the card on the waste bin
- Instructions for what to do if the card is lost

**Output 3 — Welcome Missions (3 missions)**
- Mission 1: Welcome Aboard (+30 pts) — show QR card to collector on next collection day
- Mission 2: First Report (+15 pts) — submit first photo report through the app
- Mission 3: First Segregation Confirmation (+10 pts) — have waste verified by collector QR scan

**Output 4 — Push Notification Preview**
- Simulated phone notification confirming registration, showing the generated Household ID

**Output 5 — Important Reminders**
- Print and attach the QR card to the waste bin
- Save the Household ID
- Keep the registered mobile number active
- Never share PIN or Household ID

---

## WIDGET 8 — RETURNING USER LOGIN AND WALLET DASHBOARD

### Widget Type
Two user text inputs + AI Text Generation

### Purpose
Simulates the login process for a returning resident and displays their full eco-points wallet dashboard.

### Input Fields
| Field | Placeholder Example |
|---|---|
| Registered Mobile Number | "09171234567" |
| 4-Digit PIN | "4872" |

### Authentication Simulation
- If both inputs are valid format (11-digit mobile starting with 09, exactly 4-digit PIN) → LOGIN SUCCESSFUL
- If either input is invalid or missing → LOGIN FAILED card with guidance to check details or contact barangay hall

### Wallet Dashboard Output (7 Sections)

**Section 1 — Account Header**
- Generated Filipino name
- Household ID
- Barangay
- Masked mobile number
- Member since date
- Tier status: SEEDLING (0–99 pts), ECO-SAVER (100–299 pts), GREEN GUARDIAN (300–599 pts), ECO-CHAMPION (600+ pts)

**Section 2 — Current Balance**
- Large bold point total
- Peso equivalent (1:1 ratio)
- Points to next tier
- Text-based progress bar (e.g., ████████░░ 80%)

**Section 3 — Transaction History (7 entries)**
- Table: Date | Action | Points | Balance After
- Includes: Segregation Mission (+10), Photo Report (+15), Streak Bonus (+25), GCash redemption (−30), Community mission (+10), Referral (+20), Welcome mission (+30)
- Green rows for earned, red rows for redeemed

**Section 4 — Active Missions This Week**
- 4 mission cards: Weekly Segregation, Photo Report This Week, 4-Week Streak, Refer a Neighbor
- Each shows: mission name, points value, progress, status badge (ACTIVE/COMPLETED/LOCKED)

**Section 5 — Rewards Catalog**
- Table: Reward | Partner | Points Required | Peso Value | Can Redeem (YES/NO)
- All real Philippine partners: GCash (30 pts, ₱25), Maya (30 pts, ₱25), DITO 5GB (50 pts), Puregold ₱50 (55 pts), Mercury Drug ₱100 (100 pts), Jollibee ₱100 (100 pts), BATELEC ₱25 (30 pts), Water District ₱25 (30 pts), BAGO.PH Premium (80 pts, ₱99 value)
- For unaffordable rewards: shows points gap ("Need X more points")

**Section 6 — Leaderboard Standing**
- Resident's rank in barangay leaderboard
- Points vs. top resident
- Barangay rank among all barangays in the city
- Compliance rate and trend

**Section 7 — Account Security Summary**
- Last login timestamp and location
- Last PIN change date
- Linked mobile (masked)
- Household ID
- Security reminder

---

## WIDGET 9 — QR CODE SYSTEM (6 SUB-WIDGETS)

The QR Code System is split into 6 separate widgets, each handling a distinct function.

---

### Widget 9A — Household Collection QR Scanner
**Role:** 🚛 Collector Interface

**Input:** Household bin QR code (format: BAGO-HH-[4 letters]-[5 digits])

**Output:**
- Security status badge: VALID AND ACTIVE / UNRECOGNIZED
- Household name, address, Household ID
- Waste type confirmed today
- Scan timestamp (PST)
- Collector name and route progress (households scanned vs. remaining, completion percentage)
- +10 eco-points credited confirmation
- Push notification preview sent to resident
- Compliance log entry (LGU dashboard and DENR data updated)
- Action buttons: CONFIRM AND SCAN NEXT / FLAG THIS HOUSEHOLD / REPORT ISSUE

---

### Widget 9B — Reward Redemption QR Generator
**Role:** 🏠 Resident Interface

**Inputs:**
- Household ID and reward selected (e.g., "BAGO-MARA-2025-00142 | GCash ₱25 credit (30 points)")
- Registered mobile number for verification

**Output:**
- REDEMPTION CODE GENERATED card with:
  - Transaction code (format: BAGO-RX-[HOUSEHOLD ID]-[6-char alphanumeric]-[expiry timestamp])
  - Reward name, peso value, points deducted
  - Partner merchant name
  - 24-hour expiry timestamp
  - Visual QR card layout
  - Security notices (single-use, do not share, expires in 24 hours)
  - Push notification preview to resident
- VERIFICATION FAILED card if inputs are invalid

---

### Widget 9C — DENR Compliance Certificate QR Verifier
**Role:** 🏛️ DENR/EMB Officer Interface

**Input:** Compliance certificate QR code (format: BAGO-CC-[LGU CODE]-[PERIOD CODE]-[8-char hash])

**Output:**
- VERIFIED or UNRECOGNIZED status
- If VERIFIED: LGU name, reporting period, certifying officer, digital signature status, report summary (collection rate, waste diversion rate, MRF count, segregation compliance), RA 10173 compliance note
- If UNRECOGNIZED: rejection instruction and guidance to request re-generation from LGU

---

### Widget 9D — Universal QR Scanner
**Role:** 👥 All Users

**Input:** Any BAGO.PH QR code

**Output:**
- Auto-detects code type by identifier (-HH-, -RX-, -CC-)
- Assigns one of 5 security statuses:
  - 🟢 VALID AND ACTIVE
  - 🟡 ALREADY REDEEMED (shows original redemption timestamp and location)
  - 🔴 EXPIRED (confirms points NOT deducted, prompts to generate new code)
  - 🔴 SUSPENDED (shows suspension reason, directs to barangay hall)
  - 🔴 UNRECOGNIZED (counterfeit warning)
- Generates full result card for the detected code type

---

### Widget 9E — Lost QR Card Replacement
**Role:** 🏛️ LGU Admin Interface Only

**Inputs:**
- Household ID of resident requesting replacement
- LGU administrator name and position
- Reason for replacement

**Output — 5 Sequential Steps:**
1. Identity verification — shows household details, confirms balance will be preserved, checks replacement count (limit: 2/year)
2. Old code invalidation — shows old token marked PERMANENTLY INVALIDATED with timestamp
3. New QR code generation — shows new BAGO-[6-char token], new card layout with issuance details
4. Audit trail entry — generates permanent BAGO-AUDIT-[8-digit] record (cannot be modified)
5. Resident push notification — confirms card replaced and points are safe

---

### Widget 9F — QR Scan History Log
**Role:** 🏠 Resident + 🏛️ LGU Admin

**Inputs:**
- Household ID (for individual history) OR barangay name (for full barangay audit)
- Date range

**Output — Resident View:**
- Scan summary: total confirmations, missed days, total eco-points earned, compliance rate
- 12-row scan log table (Date, Day, Waste Type, Collector, Scan Time, Points, Status)
- FILE ECO-POINTS DISPUTE button for missing credits

**Output — LGU Admin View:**
- Barangay scan summary (registered households, scanned vs. missed, compliance rate, eco-points distributed)
- 4-collector performance table with badges (TOP PERFORMER / ON TARGET / MONITOR / UNDERPERFORMING)
- Missed households table with recommended actions
- 2 specific alert flags for the CENRO officer
- Export buttons: PDF, CSV for DENR, Email to CENRO

---

## WIDGET 10 — LGU ANALYTICS DASHBOARD

### Widget Type
Two user text inputs + AI Text Generation

### Inputs
| Field | Placeholder Example |
|---|---|
| LGU City or Municipality | "Lipa City, Batangas" |
| Reporting Period | "September 2025 or Q3 2025 (July to September)" |

### Output (6 Sections)

**Section 1 — Operations Overview**
6 metric cards in two rows of three:
- Collection Completion Rate (%)
- Open Photo Reports (count)
- Registered Residents (count)
- Active Collectors Today (count)
- Eco-Points Distributed (total points)
- Segregation Compliance Rate (%)

Each card: bold number, label, green/orange/red status dot

**Section 2 — Barangay Performance Table**
6 barangays with columns: Barangay Name, Collection Rate, Compliance Rate, Open Reports, Eco-Points Awarded, Status Flag (ON TRACK / MONITOR / URGENT)

**Section 3 — Segregation Compliance Breakdown**
- Rates for Biodegradable, Non-Biodegradable, Recyclable
- Trend indicators and explanatory notes

**Section 4 — Report Resolution Summary**
- Total reports, resolved count, average resolution time, top 2 issue types, barangay with most unresolved reports

**Section 5 — Recommendations**
3 specific, data-driven actions the CENRO officer should take this month

**Section 6 — Export Options**
- EXPORT AS PDF FOR DENR SUBMISSION
- EXPORT AS CSV
- EMAIL REPORT TO CENRO OFFICER

---

## WIDGET 11 — PUSH NOTIFICATION FEED

### Widget Type
AI Text Generation connected to Widget 1 (Barangay input)

### Purpose
Simulates the live notification feed showing recent alerts sent to residents, collectors, and LGU admins in the selected barangay.

### Output
7 notification cards in reverse chronological order. Each card shows:
- App icon (🗑️ BAGO.PH)
- Notification title (bold, max 50 characters)
- Notification body (max 120 characters)
- Timestamp in PST
- Category badge: SCHEDULE / REPORT UPDATE / ECO-POINTS / ANNOUNCEMENT / COMMUNITY

**Notification Types Included:**
1. Schedule change alert for next day's collection
2. Photo report status update (Open → Resolved)
3. Eco-points credit after QR scan confirmation
4. Community mission achievement (barangay reached 80% compliance)
5. Special collection announcement for holiday weekend
6. Monthly leaderboard update
7. DENR compliance reminder from CENRO office

---

## WIDGET 12 — BARANGAY LEADERBOARD

### Widget Type
User text input + AI Text Generation

### Input
Region or city for leaderboard (e.g., "Lipa City, Batangas" or "CALABARZON Region")

### Output

**Leaderboard 1 — Top 5 Barangays**
Ranked table: Rank | Barangay Name | Compliance Rate | Eco-Points Distributed | Trend | Badge
- Badges: 🏆 CHAMPION (top), ✅ RISING, ➡️ STABLE, 🔽 DECLINING

**Leaderboard 2 — Top 5 Residents This Month**
Privacy-protected table: Rank | First Name + Last Initial | Barangay | Eco-Points | Top Mission
- Top resident badge: 🌟 ECO-CHAMPION

**Motivational Message**
System-generated message encouraging continued community participation.

---

## WIDGET 13 — DENR COMPLIANCE REPORT GENERATOR

### Widget Type
Two user text inputs + AI Text Generation

### Inputs
| Field | Placeholder Example |
|---|---|
| Reporting Quarter | "Q1 2025 (January to March 2025)" |
| Certifying Officer Name | "Engr. Juan dela Cruz, CENRO Chief, Lipa City" |

### Output — Formal Government Report Format

```
REPUBLIC OF THE PHILIPPINES
DEPARTMENT OF ENVIRONMENT AND NATURAL RESOURCES
NATIONAL SOLID WASTE MANAGEMENT COMMISSION
RA 9003 COMPLIANCE REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LGU:               [City from Barangay Input]
Reporting Period:  [Quarter Input]
Certifying Officer:[Officer Name Input]
Date Generated:    [Today's date]
```

**Report Sections:**
1. Solid Waste Generation Summary (waste generated, collected, collection rate vs. RA 9003 target)
2. Waste Diversion Accomplishments (recycled, composted, MRF-recovered, total diversion vs. 25% minimum)
3. MRF Status (operational count, needing repair, barangays without access)
4. Public Participation Data (registered households, reports submitted/resolved, QR compliance rate)
5. Identified Gaps and Action Plans (3 gaps with target resolution dates)
6. Certification Statement (officer signature and date)

**Footer:**
"This report was digitally prepared using BAGO.PH — in compliance with RA 9003 and DENR EMB reporting requirements. All data sourced from verified QR scan records and BAGO.PH Supabase database, compliant with RA 10173."

**Export Simulations:**
- DOWNLOAD PDF
- DOWNLOAD CSV
- SUBMIT TO DENR EMB

---

## PROTOTYPE LIMITATIONS vs. REAL SYSTEM

| Feature | PartyRock Prototype | Real BAGO.PH System |
|---|---|---|
| Data persistence | AI-generated per session, no database | Real PostgreSQL database via Supabase |
| Authentication | Simulated (format validation only) | Real mobile number + PIN + session management |
| Push notifications | Preview shown as text | Actual FCM push to Android/iOS devices |
| QR code scanning | Text input simulation | Camera-based QR scan via device |
| GPS tagging | Coordinates generated by AI | Actual device GPS coordinates |
| Eco-points | Simulated balance | Real wallet with immutable transaction log |
| DENR export | Formatted text output | Real PDF with embedded compliance certificate QR |
| LGU login | Open access for demo | Restricted to authorized government accounts |

---

## WIDGET FLOW SUMMARY

```
Widget 1  → Role + Barangay Setup (feeds everything)
Widget 2  → Collection Schedule Viewer
Widget 3  → Issue Description Input
Widget 4  → Report Ticket Confirmation
Widget 5  → Wallet Entry Point (NEW or RETURNING)
Widget 6  → New Resident Registration Form
Widget 7  → Registration Confirmation + Household ID
Widget 8  → Returning User Login + Wallet Dashboard
Widget 9A → Household Collection QR Scanner
Widget 9B → Reward Redemption QR Generator
Widget 9C → DENR Certificate QR Verifier
Widget 9D → Universal QR Scanner
Widget 9E → Lost QR Card Replacement
Widget 9F → QR Scan History Log
Widget 10 → LGU Analytics Dashboard
Widget 11 → Push Notification Feed
Widget 12 → Barangay Leaderboard
Widget 13 → DENR Compliance Report Generator
```