# i18n Translator Handoff (EN <-> TL)

This handoff defines translation style and constraints for BAGO.PH UI strings.

## 1) Tone and Style

- Tone: practical, clear, municipal operations context.
- Prefer conversational Tagalog used in digital products.
- Keep commands imperative (button labels):
  - Submit -> Isumite
  - Save -> I-save
  - Cancel -> Kanselahin

## 2) Keep Untranslated

Do not translate:

- product and system names: `BAGO.PH`
- legal/policy refs: `RA 9003`, `RA 10173`
- org/acronyms: `LGU`, `DENR`, `CENRO`
- technical IDs/codes:
  - API error codes (`AUTH_INVALID_CREDENTIALS`, etc.)
  - report refs (`RPT-...`)
  - QR tokens (`BAGO-...`)

## 3) Placeholder and UI Limits

- Keep strings concise; avoid overflow in button-size controls.
- Preserve placeholders with same intent:
  - `Street address`
  - `Report ID`
  - `Date (YYYY-MM-DD)`
- Keep punctuation simple and consistent.

## 4) Variable Safety

Preserve interpolation tokens exactly:

- `{{name}}`
- `{{count}}`

Never translate token names or braces.

## 5) Error and Validation Voice

- Short corrective copy.
- No blame language.
- Keep meaning aligned with backend error code intent.

Examples:

- `Invalid mobile number or PIN.` -> `Maling mobile number o PIN.`
- `Schedule not found.` -> `Walang nahanap na iskedyul.`

## 6) Delivery Format

When delivering translations, provide:

- key
- EN value
- TL value
- note (optional context)

## 7) Consistency Checklist

- Same key always maps to same TL term.
- `status` family terms consistent across schedule/report/XML screens.
- Common actions (`save`, `delete`, `edit`) reuse `common.*` equivalents.
