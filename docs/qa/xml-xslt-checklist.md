# XML/XSLT Regression Checklist

- Open `html/xml-schedules-editor.html` in Chrome and Firefox.
- Open `html/xml-barangays-editor.html` in Chrome and Firefox.
- Verify `?mode=view` hides CRUD actions and blocks save mutations.
- Edit one row in schedules editor via modal; save browser copy; confirm table refresh.
- Edit one row in barangays editor via modal; save browser copy; confirm table refresh.
- Use filter + sort on every table and verify deterministic row order.
- Click `Export XML` in both editors and verify downloaded XML has stylesheet PI.
- Click `XSL Preview` in both editors and verify raw XML opens with stylesheet transform in Firefox path.
- Clear browser copy then reload file; verify baseline XML restored.
