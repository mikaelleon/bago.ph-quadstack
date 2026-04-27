# BAGO.PH UI Completeness Specification

Build target document for pure `HTML/CSS/JS` frontend (no framework, no build step), with `Node/Express + Aiven MySQL` backend integration.
Aligned with `srs.md`, `progress-and-flows.md`, and `i18n-spec.md`.

---

## 1. Goals & Non-Goals

BAGO.PH UI/UX is complete only when every role-reachable page is fully functional, dynamic (live API or live XML/XSL data), stateful, accessible, responsive, and role-correct; non-goals are redesign/rebrand, brand-new features beyond SRS scope, backend domain redesign, deployment changes, or re-specifying language system already covered in `i18n-spec.md`.

---

## 2. Definition of "Complete" (Per Screen)

Every screen must pass all gates.

### 2.1 Wired
- Uses live `/api/*` or `xml/*.xml` + `xsl/*.xsl`.
- No hardcoded demo table rows as default view.
- If fallback exists (example: XML editor local fallback), fallback activates only on source failure.

### 2.2 Stateful
- Explicit, visually distinct states:
  - Loading
  - Empty
  - Error
  - Loaded
- Retry path available from Error state.

### 2.3 Interactive
- Every visible button/link/input/toggle performs intended action.
- Decorative or dead controls removed.
- Export/download controls must produce expected output.

### 2.4 Validated
- Client-side validation on every form field.
- Inline field-level errors under field.
- Submit blocked while invalid or in-flight.
- No validation UX primarily through `alert()`.

### 2.5 Responsive
- Usable at:
  - 360
  - 768
  - 1024
  - 1440
- No clipped text/content.
- No unintended horizontal overflow.

### 2.6 Accessible
- Keyboard reachable interactive controls.
- Visible focus treatment.
- Semantic landmarks and labels.
- Contrast at WCAG AA target.

### 2.7 Role-Correct
- Client guard mirrors server guard.
- Disallowed actions hidden and server-rejected.
- Role matrix cannot drift between scripts.

### 2.8 Recoverable
- Actionable error copy (no stack trace dumps).
- User can retry without full page reload.

---

## 3. Design System Baseline

### 3.1 Tokens

Document and normalize existing tokens in `css/style.css` and `css/bento.css`.

| Token area | Existing values in repo | Completeness requirement |
|---|---|---|
| Primary | `--green-dark: #2E7D32` | Define primary scale 50-900 |
| Secondary | `--blue: #1565C0` | Define secondary scale 50-900 |
| Neutral | `--bg`, `--surface`, `--text-*` | Add neutral 50-900 scale |
| Status | `--error`, badge colors | Add success/warning/danger scale contract |
| Radius | `--radius`, `--radius-sm/md/lg/xl` | Keep and map to component tiers |
| Elevation | `--shadow`, `--shadow-sm/md/lg` | Map to elevation-1..4 |
| Motion | `--transition-fast/normal/slow` | Keep + reduced-motion rule |
| Typography | hardcoded sizes | Define shared type scale tokens |
| Spacing | ad hoc values | Standardize `4/8/12/16/24/32/48` |

### 3.2 Shared Components Required

All screens must consume shared components (class/module level), not page-specific one-off variants.

| Component | Required variants/states | Required accessibility |
|---|---|---|
| Button | primary/secondary/ghost/danger; sm/md/lg; disabled/loading | keyboard trigger; disabled semantics |
| Input | text/number/tel/email/password; default/focus/error/disabled | label + `aria-describedby` for errors |
| Select | default/focus/error/disabled | label association |
| Textarea | char counter + error states | label + `aria-describedby` |
| Checkbox/Radio | checked/unchecked/disabled | grouped with legend where applicable |
| Toggle | on/off/disabled | `aria-checked` semantics |
| Card | header/body/footer slots | heading hierarchy |
| Modal | open/close/loading | `role="dialog"`, focus trap, Esc close |
| Toast | success/info/warn/error | `aria-live="polite"` |
| Banner/Alert | success/info/warn/error + retry | region semantics |
| Tabs | active/inactive/disabled | APG tab semantics |
| Table | sortable/paginated/loading/empty | sortable header announce state |
| Badge/Chip | status variants | non-color indicators |
| Avatar | image/initial fallback | alt text or hidden decorative behavior |
| Skeleton | row/card variants | `aria-busy` region binding |
| Empty-state block | icon/title/body/primary action | clear CTA and focusability |
| Pagination | prev/next/page items | keyboard and current-page semantics |
| Breadcrumb | nested path navigation | `nav` + list semantics |
| Dropdown/Menu | open/close/select | keyboard Esc/arrow support |
| Date picker | native/custom consistent behavior | label + format hint |
| File upload | drag/select + preview + validation | file type/size errors announced |

### 3.3 Shared Patterns Required
- Form layout pattern (single column mobile, grid desktop).
- Authenticated page shell pattern (nav/sidebar + content).
- Page header pattern (title, subtext, action row).
- Confirmation pattern for destructive actions.
- Inline edit pattern in tables.
- Bulk select pattern where multi-row operations exist.

---

## 4. Page Inventory & Required States

Minimum required inventory from SRS + current implementation.

| Page | Role(s) | Primary actions | States required (Load/Empty/Error/Loaded) | Dynamic data source |
|---|---|---|---|---|
| `html/index.html` | guest | Login shell and auth entry | required | prototype render + auth API fallback in `html/js/prototype-page-loader.js` |
| `html/auth-web-login.html` | guest | Web login | required | prototype render + auth API |
| `html/register.html` | guest | Resident registration | required | prototype render + auth API |
| `html/auth-web-register-collector.html` | guest | Collector registration | required | prototype render |
| `html/auth-web-register-lgu.html` | guest | LGU registration | required | prototype render |
| `html/dashboard-resident.html` | user | Resident dashboard | required | prototype render (`ResidentWebHome`) |
| `html/schedule.html` | user/collector/lgu_officer | list schedules; LGU CRUD | required | `/api/schedules`, `/api/barangays`, `/api/notifications/schedule` |
| `html/report.html` | user/collector/lgu_officer | submit report, timeline, map, status update | required | `/api/reports`, `/api/reports/:id/status`, `/api/notifications/reports` |
| `html/eco-points.html` | user (+ auth view) | wallet, redeem, ledger | required | `/api/eco-points/ledger`, `/api/rewards/catalog`, `/api/rewards/redeem` |
| `html/announcements.html` | user/collector/lgu_officer | publish and view announcements | required | `/api/announcements`, `/api/notifications` |
| `html/dashboard-collector.html` | collector | collector dashboard | required | prototype render |
| `html/collectors.html` | collector/lgu_officer | collector/admin collector views | required | prototype render (`CollectorReports` / `AdminCollectors`) |
| `html/qr-audit.html` | collector/lgu_officer | validate QR token + credit | required | `/api/qr/scan` |
| `html/dashboard-lgu.html` | lgu_officer | analytics/charts/exports | required | `/api/analytics/overview`, `/api/exports/*` |
| `html/compliance.html` | lgu_officer | compliance metric table | required | `/api/analytics/overview` |
| `html/denr-reports.html` | lgu_officer | DENR report page | required | currently prototype shell; exports exist in `/api/exports/denr-*` |
| `html/users.html` | lgu_officer | user management | required | currently prototype shell (`AdminResidents`) |
| `html/xml-schedules-editor.html` | lgu_officer (+collector access list) | XML edit/filter/sort/export/preview | required | `xml/schedules.xml`, `xsl/ecolinisph-schedules.xsl`, browser fallback |
| `html/xml-barangays-editor.html` | lgu_officer | XML edit/filter/sort/export/preview | required | `xml/barangays.xml`, `xsl/barangays.xsl`, browser fallback |

### 4.1 Current Gap Snapshot
- Mostly live: `schedule`, `report`, `eco-points`, `announcements`, `dashboard-lgu`, `compliance`, `qr-audit`, XML editors.
- Mostly prototype-only: many auth/resident/collector/admin pages including `denr-reports` and `users`.
- XML editors are feature-rich UI but persist only in browser/download flow (`html/js/xml-data-core.js`), not server-side write-back.

---

## 5. Forms & Validation Rules

### 5.1 Canonical Validation Contract
- Mobile format: `09XXXXXXXXX` (11 digits).
- PIN: exactly 4 digits.
- LGU email: lowercase, must end `.gov.ph`.
- LGU password: >=10 chars and mixed character classes.
- Barangay: must match canonical whitelist (72 Lipa barangays from data source).
- Photo upload: JPEG/PNG only; <=500KB after compression.
- Coordinates: from Geolocation API, rendered read-only once captured.
- Required + max-length on all fields.
- Debounce async checks (example uniqueness): 300-500ms.
- Inline errors directly below fields; summary optional.
- Submit reflects validity and pending state.

### 5.2 Form Inventory (Must Be Complete)

| Form | Source page/module | Fields | Must validate |
|---|---|---|---|
| Resident/collector login | `html/index.html` flow | mobile, PIN | mobile format + PIN 4 digits |
| LGU login | `html/auth-web-login.html` flow | gov email, password | `.gov.ph` + password policy |
| Resident registration | `html/register.html` flow | name, mobile, city, barangay, PIN, confirm PIN | required + PIN match + barangay whitelist |
| Collector registration | `html/auth-web-register-collector.html` flow | invite + identity fields | invite format + required IDs |
| LGU registration | `html/auth-web-register-lgu.html` flow | gov email, office order, password | gov email + required docs + password |
| Report submit | `html/report.html` + `html/js/report-submit.js` | issue, barangay, street, photo, description | required + file + size + geolocation |
| Schedule create | `html/schedule.html` + `html/js/schedule-lgu.js` | barangay, waste type, date/time, status | required + time/date logic |
| Announcement publish | `html/announcements.html` | title, message, scope, urgency | required + max lengths |
| Report status update | `html/report.html` + map tools | report ID, status | numeric ID + allowed status set |
| QR audit submit | `html/qr-audit.html` | secure token | required format |
| XML schedule edit modal | `html/js/xml-schedules-app.js` | route/barangay/special/shift fields | inline modal validation |
| XML barangay edit modal | `html/js/xml-barangays-app.js` | name + metrics + status | inline modal validation |

---

## 6. Interaction & Feedback

### 6.1 Loading
- Use skeleton blocks for lists/tables.
- Use button spinner for action submits.
- Use progress bar for uploads.
- Avoid blocking full-screen loaders after initial bootstrap.

### 6.2 Empty
- Every data view needs standardized empty block:
  - icon/illustration
  - one-line explanation
  - primary action CTA

### 6.3 Error
- Show error banner at region top.
- Include retry action.
- Keep field errors inline.
- Map technical errors to user-safe messages.

### 6.4 Success
- Success toast duration: 3s.
- Auto-dismiss + close button.
- Avoid `alert()` for success.

### 6.5 Destructive Actions
- Replace all `confirm()` usage with shared modal.
- For multi-record destructive actions (>1 record), require typed confirmation.

### 6.6 Optimistic UI Policy
- Allowed for low-risk UI-only toggles/filters.
- Not allowed for:
  - eco-point credits/redeems,
  - QR credit actions,
  - report status transitions affecting compliance/audit.

### 6.7 Native Dialog Ban
- Remove remaining `prompt()/alert()/confirm()` from runtime flows.
- Known hotspots:
  - `html/js/prototype-page-loader.js`
  - `html/js/schedule-lgu.js`
  - `html/js/xml-schedules-app.js`
  - `html/js/xml-barangays-app.js`

---

## 7. Navigation & Layout

- Authenticated pages must have persistent nav frame.
- Collapses to hamburger below `768`.
- Active route indicator required.
- Breadcrumb required on nested LGU tools:
  - `html/denr-reports.html`
  - `html/users.html`
  - `html/xml-schedules-editor.html`
  - `html/xml-barangays-editor.html`
- Back behavior on detail pages must preserve filter/sort through querystring.
- Provide styled `403` and `404` pages.
- Client and server role guards must match:
  - `html/role-access.js`
  - `html/js/prototype-page-loader.js`
  - server auth/policy middleware.

---

## 8. Responsive Behavior

### 8.1 Breakpoint Contract
- `sm`: 360
- `md`: 768
- `lg`: 1024
- `xl`: 1440

### 8.2 Table Contract
Per table, pick one behavior and document:
- stacked cards under `768`, or
- horizontal scroll + sticky first column.

### 8.3 Modal Contract
- Full-screen modal below `480`.

### 8.4 Touch Contract
- Touch targets minimum `44x44`.

### 8.5 Current Baseline Note
- Existing CSS breakpoints are inconsistent (`1100`, `1200`, `768`); normalize to canonical contract above.

---

## 9. Accessibility (WCAG 2.1 AA Target)

### 9.1 Semantic HTML
- Use `header/nav/main/section/footer`.
- One meaningful `h1` per page.

### 9.2 Form Labels
- Every input has visible label or explicit `aria-label`.
- Error text bound with `aria-describedby`.

### 9.3 Focus Behavior
- Focus order follows visual order.
- Focus ring visible on all actionable controls.
- No removed outlines without replacement.

### 9.4 Non-Color Communication
- Status uses text/icon plus color.

### 9.5 Contrast
- Body text >= 4.5:1.
- Large text >= 3:1.

### 9.6 ARIA
- Modal: `role="dialog"` + `aria-modal="true"` + focus trap + focus restore.
- Toast region: `aria-live="polite"`.
- Loading region: `aria-busy`.

### 9.7 Keyboard APG Behavior
- Tab / Shift+Tab traversal works.
- Enter/Space activate controls.
- Esc closes modal/menu/dialog contexts.

### 9.8 Charts/Maps
- Leaflet and Chart.js visuals must include equivalent textual summaries/tables.

---

## 10. Performance Budget

- Initial HTML: `<50KB` per page.
- CSS: `<80KB` per page (excluding CDN libraries).
- JS: `<120KB` per page (excluding CDN libraries).
- Core Web Vitals (4G target):
  - LCP `<2.5s`
  - CLS `<0.1`
  - INP `<200ms`
- Runtime rules:
  - defer non-critical JS
  - lazy-load non-critical images
  - enable gzip/brotli on Render
  - avoid font-layout shift (`font-display: swap` + tuned fallback metrics)

---

## 11. Quality Gates (Acceptance)

Per page, reviewer must pass all:

1. Logged-out access redirects correctly.
2. Every allowed role loads page with no console errors.
3. Offline/disconnect shows error state; reconnect retry succeeds.
4. Empty dataset shows empty state with functional primary action.
5. Full keyboard pass shows visible focus on each step.
6. Resize 360 -> 1440 produces no clipped/overflowed content.
7. Lighthouse:
   - Performance >= 85
   - Accessibility >= 95
   - Best Practices >= 90
8. No remaining `prompt()/alert()/confirm()` in user flows.

---

## Implementation Priority (Execution Order)

### P1: Completion Blockers
- Replace prototype-only pages in required role journeys with live wired pages.
- Add missing state handling (loading/empty/error/retry) to currently live pages.
- Remove native dialogs and migrate to shared modal/toast patterns.

### P2: Consistency
- Consolidate design system usage from `css/style.css` and `css/bento.css`.
- Normalize breakpoints and table responsiveness policy.
- Unify role access matrix between `html/role-access.js` and `html/js/prototype-page-loader.js`.

### P3: Compliance/Polish
- Full keyboard + ARIA semantics for modals/tables/menus.
- Add textual alternatives for charts/maps.
- Enforce performance budget through page-level checks.

---

## Source References

- `srs.md`
- `progress-and-flows.md`
- `i18n-spec.md`
- `css/style.css`
- `css/bento.css`
- `html/index.html`
- `html/auth-web-login.html`
- `html/register.html`
- `html/auth-web-register-collector.html`
- `html/auth-web-register-lgu.html`
- `html/dashboard-resident.html`
- `html/schedule.html`
- `html/report.html`
- `html/eco-points.html`
- `html/announcements.html`
- `html/dashboard-collector.html`
- `html/collectors.html`
- `html/qr-audit.html`
- `html/dashboard-lgu.html`
- `html/compliance.html`
- `html/denr-reports.html`
- `html/users.html`
- `html/xml-schedules-editor.html`
- `html/xml-barangays-editor.html`
- `html/role-access.js`
- `html/js/prototype-page-loader.js`
- `html/js/bago-api.js`
- `html/js/schedule-resident.js`
- `html/js/schedule-lgu.js`
- `html/js/report-submit.js`
- `html/js/report-detail.js`
- `html/js/report-map.js`
- `html/js/eco-wallet.js`
- `html/js/announcements-admin.js`
- `html/js/in-app-notifications.js`
- `html/js/dashboard-lgu.js`
- `html/js/compliance.js`
- `html/js/collector-scan.js`
- `html/js/xml-data-core.js`
- `html/js/xml-schedules-app.js`
- `html/js/xml-barangays-app.js`
- `html/js/components/xml-editor-modal.js`
- `xml/schedules.xml`
- `xml/barangays.xml`
- `xsl/ecolinisph-schedules.xsl`
- `xsl/barangays.xsl`
- `xsl/denr-report.xsl`
- `xsl/ecolinisph.xsl`
