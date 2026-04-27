# i18n Screen Reader Spot Check

Date: 2026-04-27  
Target: EN/TL toggle semantics + locale change announcement

## Checklist

- [x] Toggle wrapper has `role="group"` and localized `aria-label`
- [x] Toggle buttons expose `aria-pressed` active state
- [x] `aria-live="polite"` region exists (`#bago-locale-live`)
- [x] Locale-change announcement text updates per locale
- [x] Focus returns to locale toggle button after switch

## Manual Screen Reader Runbook

1. Open any auth page (`index.html`) and any in-app page (`schedule.html`).
2. Start screen reader (NVDA or Narrator).
3. Tab to locale toggle.
4. Switch EN <-> TL with keyboard arrows and Enter.
5. Confirm:
   - pressed state changes
   - live announcement is read
   - focus remains on toggle.

## Notes

- Structural and behavior checks complete in code.
- Manual SR audio output verification should be executed by QA operator on target OS/browser stack.
