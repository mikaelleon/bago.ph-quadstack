# i18n Hardcoded Text Scan

Date: 2026-04-27

## Command Set

- `rg "alert\\(|confirm\\(|prompt\\(" html/js`
- `rg "err\\(res,\\s*\\d+,\\s*\"[A-Z0-9_]+\"" server/routes`
- `rg "errorJson\\(res,\\s*\\d+,\\s*\"[A-Z0-9_]+\"" server/routes/auth.js`

## Results

### 1) Dynamic UI hardcoded prompts/alerts (remaining)

- `html/js/prototype-page-loader.js`: 37
- `html/js/xml-schedules-app.js`: 5
- `html/js/xml-barangays-app.js`: 2
- `html/js/schedule-lgu.js`: 3

Interpretation:
- Majority routed through `t(...)` already.
- Remaining direct prompt/confirm copies are narrow legacy edit flows (XML + schedule editor prompts). Low-risk but still technical debt.

### 2) API stable error code usage

- `server/routes/*.js` using `err(...)` with stable code: 9 route files
- `server/routes/auth.js` using `errorJson(...)` with stable code: present

Interpretation:
- API emits machine-stable codes; client mapping path available (`bago-api.js` + `errors.*` keys).

## Fail List / Follow-ups

- Remaining prompt/confirm literals in legacy editor flows should be replaced with modal-based localized UX in future cleanup pass.
