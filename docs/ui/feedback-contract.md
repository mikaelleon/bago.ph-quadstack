# UI Feedback Contract

## Scope
- Applies to page modules under `html/js/`.
- Shared feedback primitives:
  - `window.BAGOToast.show(message, { type, duration_ms })`
  - `window.BAGOErrorBanner.render(targetId, { title, message, retryLabel, onRetry })`
  - `window.BAGOErrorBanner.clear(targetId)`
  - `window.BAGOSkeleton.rows(targetId, count)`
  - `window.BAGOSkeleton.tableBody(targetId, columns, rowsCount)`
  - `window.BAGOUploadProgress.set(targetId, pct)`

## Rules
- Use toast for success, non-blocking info.
- Use error banner for recoverable errors with retry action.
- Use skeleton for list/table loading placeholders.
- Use upload progress helper for submit/upload paths.
- Do not use `alert()`, `prompt()`, `confirm()` in page feedback flows.

## Placement
- Toast region: fixed lower-right, managed by `toast.js`.
- Error banners: rendered in existing status containers:
  - `report-submit-status`
  - `redeem-status`
  - `ann-status`
- Skeleton targets must be existing DOM containers.

## Retry behavior
- Retry callback must be idempotent-safe.
- Retry callback must not force full page reload.

## Accessibility
- Toast region includes `aria-live="polite"`.
- Error banner actions are keyboard focusable buttons.
