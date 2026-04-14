# BAGO.PH — Mobile Application Features
## Based on the Technopreneurship Proposal and Business Plan Documents
### IT3B | FreeElective 1 | University of Batangas — CITEC | 2025–2026

---

## OVERVIEW

The BAGO.PH mobile application is the **resident-facing and collector-facing** component of the platform. It is available on Android and iOS, with a Progressive Web App (PWA) fallback for older or lower-end devices. The mobile app is the primary touchpoint between the community and the waste management system. It is what residents install, use daily, and earn rewards through. It is also what garbage collectors use to manage their routes and verify household segregation.

The app is built using **React Native** with NativeWind (Tailwind CSS) for styling. It shares the same Supabase backend as the LGU web dashboard, meaning all data is synchronized in real time. A change made by an LGU admin on the web dashboard appears on residents' phones within seconds.

---

## USER TYPES ON THE MOBILE APP

| User Type | App Interface | Primary Actions |
|---|---|---|
| Barangay Resident | Resident Interface | Check schedules, report issues, earn and redeem eco-points |
| Garbage Collector | Collector Interface | View routes, scan household QR codes, update report statuses |

LGU administrators access the system through the web-based dashboard, not the mobile app.

---

## SCREEN SET 1 — ONBOARDING AND AUTHENTICATION

### Screen 1 — Splash Screen
- BAGO.PH logo centered on white background
- Tagline: "Barangay App for Garbage Operations in the Philippines"
- Short loading animation at the bottom
- Automatically transitions to Language Selection after 2 seconds

### Screen 2 — Language Selection
- Heading: "Choose Your Language"
- Two selectable card buttons: English and Filipino (Tagalog)
- Selected language card has a green border
- Continue button at the bottom
- Language preference is saved to device settings

### Screen 3 — Role Selection
- Heading: "Who are you?"
- Three role cards stacked vertically with icons:
  - 🏠 Resident — "Check schedules, report issues, earn rewards"
  - 🚛 Garbage Collector — "View routes, scan QR codes, update reports"
  - 🏛️ LGU Administrator — "Redirects to web dashboard on desktop browser"
- Continue button below the cards

### Screen 4 — Resident Registration
Form fields in order:
1. Full Name
2. Mobile Number (PH +63 prefix)
3. Barangay (dropdown selector)
4. Municipality/City (auto-filled based on barangay selection)
5. Home Street Address
6. Create 4-Digit PIN
7. Confirm PIN

- Register button at the bottom
- "Already have an account? Log in" link below

**Account Creation Logic:**
- Mobile number is the unique identifier — no two accounts can share the same number
- Household ID is auto-generated on registration in the format: BAGO-[4-LETTER BARANGAY CODE]-[YEAR]-[5-DIGIT NUMBER]
- A physical QR code card is issued by the barangay hall upon registration verification

### Screen 5 — Collector Registration
- Same structure as Resident registration with two additional fields:
  - Assigned Barangay/Route (dropdown)
  - Employee ID Number
- Note below the form: "Your account requires LGU admin approval before activation."

### Screen 6 — Login Screen
- Mobile Number field
- PIN field (4-digit, masked)
- Login button
- Forgot PIN link (redirects to barangay hall contact)
- Register Now link

### Screen 7 — OTP Verification
- Heading: "Verify Your Number"
- Subtext: "A 6-digit code was sent to [masked number]"
- Six individual digit input boxes
- Resend Code link with 60-second countdown timer
- Verify button

### Screen 8 — Barangay Confirmation
- Green checkmark icon
- Confirmed barangay name and city
- Text: "You are now registered under [Barangay Name], [City]"
- Go to Home button

---

## SCREEN SET 2 — RESIDENT INTERFACE

### Screen 1 — Resident Home Screen

**Top Bar:**
- BAGO.PH logo (left)
- Notification bell with unread badge count (right)

**Greeting Section:**
- "Hello, [First Name]!" personalized greeting
- Registered barangay name below

**Feature Cards (2x2 grid):**
| Card | Icon | Color | Function |
|---|---|---|---|
| Schedule | 📅 | Green | View weekly collection schedule |
| Report Issue | 📸 | Blue | Submit a waste photo report |
| Eco-Points | 🌿 | Green | View wallet and missions |
| Leaderboard | 🏆 | Blue | View barangay rankings |

**Latest Announcement Section:**
- Banner card showing the most recent LGU message
- Timestamp
- Tap to expand full announcement

**Bottom Navigation Bar:**
Home | Schedule | Report | Rewards | Profile

---

### Screen 2 — Collection Schedule Screen

**Week-View Calendar Strip:**
- Shows current week across the top
- Days with scheduled collection marked with a colored dot by waste type:
  - 🟢 Green dot = Biodegradable
  - 🔵 Blue dot = Non-Biodegradable
  - ♻️ Orange dot = Recyclable
  - ⚫ Grey dot = Residual

**Schedule List (below calendar):**
Each entry shows:
- Waste type icon and color
- Waste type label
- Collection date and time window
- Status badge: Scheduled / Updated / Cancelled

**Update Alert Banner:**
- Green banner at top if a schedule was recently changed
- Shows what changed and the timestamp of the change
- Auto-dismisses after 24 hours

---

### Screen 3 — Schedule Detail Screen
Tapping a schedule entry opens:
- Waste type (color-coded)
- Full date and time window
- Area covered
- Special instructions (if any entered by LGU admin)
- Share button — shares the schedule via SMS or messaging apps

---

### Screen 4 — Push Notification (Schedule Change Alert)
Lock screen and notification bar format:
- App icon: 🗑️ BAGO.PH
- Title: "Schedule Update"
- Body: Updated schedule details (max 120 characters)
- Timestamp

Notification triggers:
- Schedule created
- Schedule updated
- Schedule cancelled
- Advance reminder (configurable: 1 day before, morning of)

---

### Screen 5 — Photo Report Submission Screen

**Camera Section:**
- Large camera viewfinder area (tappable to open device camera)
- Thumbnail preview of captured photo below

**Form Fields:**
1. Issue Type dropdown: Missed Pickup / Overflowing Bin / Illegal Dumping / Blocked Road / Other
2. Description text field (optional, max 150 characters)
3. Location field — auto-filled from GPS, shows detected street address and barangay
4. Small map preview showing the tagged location

**Technical Details:**
- Photo is compressed client-side to under 500KB before upload
- GPS coordinates embedded automatically using device location
- Timestamp embedded automatically
- Submit Report button (blue, full-width)

**Post-Submission:**
- Confirmation screen with reference number
- Eco-points reward notice: "+15 points will be credited once validated"

---

### Screen 6 — Report Submitted Confirmation Screen
- Blue checkmark icon centered
- Heading: "Report Submitted"
- Subtext: "Your report has been logged. You will receive a notification when it is reviewed."
- Report Reference Number in a grey card (format: RPT-2025-XXXXX)
- View My Reports button
- Back to Home link

---

### Screen 7 — My Reports Screen
List of all reports submitted by the resident. Each card shows:
- Photo thumbnail (left)
- Issue type label
- Date submitted
- Status badge with color coding:
  - Open — grey
  - Acknowledged — blue
  - In Progress — orange
  - Resolved — green
  - Rejected — red
- Tap to open Report Detail Screen

---

### Screen 8 — Report Detail Screen
- Full photo display at top
- Issue Type
- Date and Time Submitted
- GPS Address
- Status progress bar showing all 5 stages: Open → Acknowledged → In Progress → Resolved
- Collector/admin notes (shown when available)
- Status change timeline at bottom (each status change with timestamp and officer name)

---

### Screen 9 — Eco-Points Wallet Screen

**Balance Display:**
- Large circular points balance in bold green
- Tier status badge: SEEDLING / ECO-SAVER / GREEN GUARDIAN / ECO-CHAMPION
- Progress bar to next tier

**Two action buttons:**
- Earn Points → opens Screen 10
- Redeem → opens Screen 11

**Transaction History:**
Table with columns: Action | Date | Points | Balance After
- Green rows for earned points
- Red rows for redeemed points
- Shows last 10 transactions by default with "View All" link

---

### Screen 10 — Earn Points Screen (Mission List)
Heading: "How to Earn"

Mission cards list:

| Mission | Points | Frequency |
|---|---|---|
| Segregation Mission (QR scan verified) | +10 pts | Weekly per collection day |
| Photo Report (validated by LGU) | +15 pts | Per valid report (max 3/week) |
| 3-Week Streak Bonus | +25 pts | Once per streak milestone |
| 4-Week Streak (Monthly) Bonus | +50 pts | Once per month |
| Referral — neighbor registers | +20 pts | Per successful referral |
| Onboarding Module completion | +30 pts | One-time only |
| Community Mission (barangay goal) | +10 pts shared | Per completed community goal |

Each card shows:
- Mission icon
- Mission name
- Points value badge
- One-sentence instruction
- Progress indicator if mission is active

---

### Screen 11 — Rewards Catalog Screen
Heading: "Redeem Points"

**Filter Row:** All | Data | GCash | Groceries | Food | Utilities

**Reward Cards Grid:**

| Reward | Partner | Points | Value |
|---|---|---|---|
| GCash Credit ₱25 | GCash by Globe | 30 pts | ₱25 |
| Maya Credit ₱25 | Maya | 30 pts | ₱25 |
| DITO 5GB (3 days) | DITO Telecommunity | 50 pts | ~₱50 |
| Puregold Voucher ₱50 | Puregold Price Club | 55 pts | ₱50 |
| Mercury Drug Voucher ₱100 | Mercury Drug | 100 pts | ₱100 |
| Jollibee Meal Voucher ₱100 | Jollibee | 100 pts | ₱100 |
| BATELEC Bill Credit ₱25 | BATELEC I | 30 pts | ₱25 |
| Water District Credit ₱25 | Lipa City Water District | 30 pts | ₱25 |
| 1-Month Premium | BAGO.PH | 80 pts | ₱99 value |

- Cards for rewards the user cannot afford: greyed out with a lock icon and "Need X more points" label
- Tap any affordable card → opens Reward Redemption Confirmation (Screen 12)

---

### Screen 12 — Reward Redemption Confirmation Screen
Modal overlay showing:
- Reward name and partner logo
- Points to be deducted
- Current balance after deduction
- Confirm button (green)
- Cancel button (white/outline)

---

### Screen 13 — Redemption Success Screen
After confirming:
- Green checkmark icon
- Heading: "Points Redeemed!"
- Subtext describing reward delivery method:
  - GCash/Maya: "Your credit will be sent to [masked number] within 24 hours"
  - Data packs: "Your DITO data pack will be activated within 1 hour"
  - Vouchers: "Your redemption code is below. Show it at the cashier."
- Redemption Code box (for voucher-type rewards) with Copy button
- Expiry notice: "This code expires in 24 hours"
- Back to Wallet button

---

### Screen 14 — Barangay Leaderboard Screen
Heading: "Leaderboard"

**Toggle:** My Barangay | All Barangays

**My Barangay View:**
- Ranked list of top residents by eco-points
- Each row: rank number, name, points total
- Current user's row highlighted in light green
- User's rank shown even if outside top 10

**All Barangays View:**
- Ranked list of barangays by collective segregation compliance rate
- Each row: rank number, barangay name, compliance percentage, trend badge (Rising / Stable / Declining)

---

### Screen 15 — Resident Profile Screen

**Profile Header:**
- Profile photo placeholder (circular)
- Full name
- Registered barangay
- Member since date
- Household ID

**Stats Summary:**
- Total Eco-Points earned (all time)
- Total Reports submitted
- Current streak in days
- Tier status badge

**Settings List:**
- Edit Profile
- Change PIN
- Notification Preferences
- Language
- Help Center
- Privacy Policy
- Log Out

---

## SCREEN SET 3 — GARBAGE COLLECTOR INTERFACE

### Screen 1 — Collector Home Screen

**Top Bar:**
- BAGO.PH logo
- Notification bell

**Greeting and Shift Status:**
- "Hello, [Collector Name]"
- Status badge: ON DUTY / OFF DUTY with toggle

**Main Sections:**
- Today's Route card — assigned barangays and collection type
- Pending Reports card — count badge showing unresolved reports assigned to this collector

**Bottom Navigation:** Home | My Route | Reports | Profile

---

### Screen 2 — Route Screen
Heading: "My Route Today"

**Map View (top):**
- Shows assigned collection route with pins for each stop
- Color coding: green (completed), orange (in progress), grey (pending)

**Stop List (below map):**
Each stop shows:
- Barangay/Street name
- Waste type for that stop
- Status toggle: Pending → In Progress → Completed

**Bottom Button:**
- Mark All Complete button

---

### Screen 3 — QR Scan Screen
Accessible from the Route Screen when the collector arrives at a stop.

**Camera Interface:**
- Full-screen camera QR scanner
- Square targeting frame in center
- Heading: "Scan Household QR Code"
- Instructions: "Point the camera at the household QR code to confirm correct segregation"

**On Successful Scan:**
Green confirmation card slides up from the bottom showing:
- Household name
- Barangay
- Waste type confirmed
- Points awarded: "+10 pts credited to [Resident Name]"
- Done button to dismiss and scan next household

**On Invalid/Unrecognized Code:**
Red error card showing:
- UNRECOGNIZED QR CODE warning
- Instruction not to credit points
- Option to report to CENRO officer

**QR Code Formats Recognized:**
- BAGO-HH-[4-LETTER BARANGAY]-[5 DIGITS] — Household Collection QR (primary scan)

---

### Screen 4 — Assigned Reports Screen
Heading: "Assigned Reports"

List of waste issue reports assigned to this collector. Each card shows:
- Photo thumbnail
- Issue type
- Address
- Date reported
- Current status badge
- View and Update button

---

### Screen 5 — Report Update Screen
Full photo of the reported issue at top.
- Current status displayed
- Dropdown to update status: Acknowledged / In Progress / Resolved / Rejected
- Notes field for collector to add comments
- Update button at bottom

Status change triggers a push notification to the resident and updates the LGU dashboard.

---

## SCREEN SET 4 — SYSTEM AND UTILITY SCREENS

### Screen 1 — Notification Center
Heading: "Notifications"

List of all received notifications:
- Icon by type (schedule, report update, eco-points, announcement)
- Title and short message body
- Timestamp
- Unread notifications have a light green background
- Mark All as Read button (top right)

---

### Screen 2 — No Internet Connection Screen
- Broken signal illustration
- Heading: "No Connection"
- Subtext: "Check your internet connection and try again."
- Retry button
- Note: "Your last saved schedule is still available offline."

---

### Screen 3 — Offline Mode Screen
**For residents with no active connection:**
- Yellow banner at top: "You are offline. Showing last saved data."
- Schedule screen loads cached data
- Greyed-out dates beyond the last sync
- Last Updated timestamp shown

---

### Screen 4 — Empty State Screens

| Context | Illustration | Message | Action Button |
|---|---|---|---|
| No reports submitted | Camera icon | "No reports yet. Tap the camera to report a waste issue." | Report Now |
| No collection today | Calendar icon | "No collection scheduled today. Check back tomorrow." | View This Week |
| No rewards available | Gift icon | "No rewards available right now. Check back soon." | Earn More Points |
| No notifications | Bell icon | "You're all caught up. No new notifications." | Go to Home |

---

### Screen 5 — Error Screen
- Red warning icon
- Heading: "Something went wrong."
- Subtext: "We could not load this page. Please try again."
- Retry button
- Contact Support link

---

## FEATURE: PUSH NOTIFICATIONS

### Trigger Events and Recipients

| Event | Recipient | Message Content |
|---|---|---|
| Schedule created | All residents in barangay | New collection date, waste type, time window |
| Schedule updated | All residents in barangay | What changed, new date/time |
| Schedule cancelled | All residents in barangay | Which collection cancelled, reason if provided |
| Report status → Acknowledged | Reporting resident | "Your report [RPT-XXXXX] has been seen by your LGU officer" |
| Report status → In Progress | Reporting resident | Collector name assigned and estimated resolution time |
| Report status → Resolved | Reporting resident | "Your report has been resolved. Thank you for reporting." |
| QR scan confirmed | Scanned household resident | "+10 Eco-Points added to your wallet. Keep segregating correctly!" |
| Points redeemed | Redeeming resident | Reward name, delivery method, and estimated time |
| Streak bonus achieved | Resident | Streak milestone reached and bonus points awarded |
| Community mission completed | All barangay residents | Barangay goal achieved, bonus points distributed |
| New LGU announcement | Target barangay residents | Announcement title and shortened body |
| Monthly leaderboard update | All residents | Top barangay and top resident for the month |

### Notification Delivery Technology
- Firebase Cloud Messaging (FCM)
- Supports Android and iOS from a single API
- Delivers even when the app is running in background or is closed
- Free tier sufficient for MVP scale

---

## FEATURE: HOUSEHOLD QR CODE SYSTEM

### What It Is
Each registered household receives a unique physical QR code card upon wallet registration. The card is attached to the household's waste bin and scanned by the garbage collector on collection day.

### QR Code Format
`BAGO-HH-[4-LETTER BARANGAY CODE]-[5-DIGIT HOUSEHOLD NUMBER]`

Example: `BAGO-HH-MARA-00142`

### Physical Card Layout
- BAGO.PH logo and app name
- QR code image (scannable)
- Household ID printed below QR
- Account holder first name
- Registered barangay and address
- Secure token (6-character alphanumeric, format: BAGO-XXXXXX)
- Warning: "Keep this card on your waste bin"
- Contact instruction for lost cards

### Scan Process
1. Collector arrives at household
2. Collector opens QR Scanner on their collector interface
3. Collector points camera at bin card QR
4. System validates code format and household barangay match
5. System confirms waste type for today
6. System credits +10 eco-points to resident wallet (automatic, no manual input required)
7. Scan logged as compliance data point in LGU dashboard
8. Push notification sent to resident within seconds

### Security
- Each QR token is unique and cryptographically tied to one household
- If a card is lost, the LGU admin must authorize a replacement
- Old token is permanently invalidated upon replacement
- Replacement attempts are limited to 2 per household per year
- All scan attempts are logged with collector ID, timestamp, and GPS coordinates

---

## TECHNOLOGY STACK (MOBILE APP)

| Component | Technology |
|---|---|
| Framework | React Native |
| Styling | NativeWind (Tailwind CSS for React Native) |
| Backend | Node.js with Express |
| Database | PostgreSQL via Supabase |
| Real-time | Supabase real-time subscriptions |
| Authentication | Supabase Auth |
| Push Notifications | Firebase Cloud Messaging (FCM) |
| GPS/Location | React Native Geolocator package |
| Camera/QR | React Native camera module |
| Image Compression | Client-side compression (target: under 500KB per upload) |
| File Storage | Supabase Storage (photo report images) |
| Payment APIs | GCash API, Maya API |
| Maps | Google Maps SDK (embedded in app) |
| App Distribution | Google Play Store (Android) + Apple App Store (iOS) |
| PWA Fallback | Progressive Web App for older/low-storage devices |

---

## MINIMUM DEVICE REQUIREMENTS

| Specification | Minimum |
|---|---|
| OS (Android) | Android 8.0 (API level 26) or newer |
| OS (iOS) | iOS 14 or newer |
| RAM | 2GB minimum (4GB recommended) |
| Storage | 150MB free space |
| Camera | Required for photo reporting and QR scanning |
| GPS | Required for report geo-tagging |
| Internet | Mobile data or WiFi (offline mode available for schedule viewing) |

---

## PREMIUM VS. FREE TIER (RESIDENT)

| Feature | Free Tier | Premium ₱99/month or ₱799/year |
|---|---|---|
| Collection schedule viewing | ✅ | ✅ |
| Push notification alerts | ✅ | ✅ |
| Photo issue reporting | ✅ | ✅ |
| Eco-points earning | ✅ | ✅ |
| Basic reward redemption | ✅ | ✅ |
| Priority report tracking | ❌ | ✅ |
| Advanced reward categories | ❌ | ✅ |
| Ad-free experience | ❌ | ✅ |
| Extended transaction history | ❌ | ✅ (unlimited) |

---

## ALIGNMENT WITH RA 9003 AND SDGS

| BAGO.PH Mobile Feature | RA 9003 Alignment | SDG Alignment |
|---|---|---|
| Real-time collection schedules | Supports LGU obligation to inform residents of collection days | SDG 11 — Sustainable Cities |
| Photo-based issue reporting | Enables public participation as mandated by RA 9003 Section 11 | SDG 16 — Strong Institutions |
| QR segregation verification | Directly enforces segregation-at-source requirement | SDG 12 — Responsible Consumption |
| Eco-points rewards system | Incentivizes compliance where enforcement alone has failed | SDG 12 — Responsible Consumption |
| Community leaderboard | Builds social accountability for waste management | SDG 11 — Sustainable Cities |
| Offline schedule caching | Ensures access even in low-connectivity barangay areas | SDG 10 — Reduced Inequalities |