# i18n API Error Map Check

Date: 2026-04-27

## Goal

Verify backend error `code` values can map to localized `errors.*` keys in client runtime.

## Verified Client Mapping Path

- Source: `html/js/bago-api.js`
- Behavior:
  - on non-2xx response, reads `body.code`
  - resolves `errors.<CODE>` via `BAGO.i18n.t(...)`
  - falls back to `errors.unknown`

## Sample Codes Checked

- `AUTH_INVALID_CREDENTIALS`
- `AUTH_INVALID_GOV_CREDENTIALS`
- `AUTH_MOBILE_PIN_REQUIRED`
- `AUTH_INVALID_PIN`
- `AUTH_MOBILE_EXISTS`
- `SCHEDULE_INVALID_WASTE`
- `SCHEDULE_NOT_FOUND`
- `REPORT_INVALID_STATUS`
- `REPORT_NOT_FOUND`
- `REWARD_INVALID_ID`
- `REWARD_REDEEM_FAILED`
- `ECO_IDEMPOTENCY_REQUIRED`
- `QR_TOKEN_INVALID`

## Catalog Coverage

- EN/TL entries added under `errors.*` in `html/js/i18n/strings.js`.

## Outcome

- Mapping layer implemented and wired.
- Unknown/unmapped code path safely falls back to `errors.unknown`.
