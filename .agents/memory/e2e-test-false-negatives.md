---
name: E2E hover/theme test false negatives
description: Why Playwright-subagent tests falsely fail on Tailwind v4 hover effects and how to verify styling claims directly from the dev server's compiled CSS.
---

# E2E test false negatives (Tailwind v4 + Playwright subagent)

**Rule:** Do not treat a failed hover-effect assertion from the testing subagent as a bug by itself. Verify the utility exists in compiled CSS before changing code, and never ask the tester to assert hover styles via computed `transform`.

**Why:** Two stacked false negatives observed:
1. Tailwind v4 wraps every `hover:` variant in `@media (hover: hover)`. The Playwright test browser reports a no-hover device, so hover styles NEVER apply there — hover lift/shadow checks always fail even when correct for real desktop users.
2. Tailwind v4 translate utilities set the CSS `translate` property, not `transform` — computed `transform` stays `none` even when translation is active.

**How to apply:**
- Verify utilities directly: `curl -s "http://localhost:80/src/index.css?direct" | grep "hover\\\\:-translate-y-1"` (the `?direct` query returns raw compiled CSS from the Vite dev server). If the rule exists inside `@media (hover: hover)`, hover works for real users; tell the tester to skip hover assertions.
- The same compiled-CSS check is the fast way to confirm a suspected "silent no-utility" (`:root` var without `@theme` mapping — colors AND animations).
- Theme-toggle e2e checks: a toggle click can hit the pre-mount placeholder button (mounted-gate pattern); have the test wait ~2s after load before clicking. Also, next-themes' localStorage trick only works if the ThemeProvider is actually mounted — an empty `<html class>` (not even "light") means the provider is missing entirely, not a test artifact.
