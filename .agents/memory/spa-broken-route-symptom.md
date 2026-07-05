---
name: SPA "dead link" usually means the destination route won't compile
description: In the wouter SPA, a click that "does nothing" or a card that only toggles/expands is often the DESTINATION route failing to compile, not the trigger component.
---

# "Clicking does nothing" is often a broken destination, not a broken link

In this client-routed SPA (wouter), when a link/card appears to "not navigate" or
"only toggle/expand," the trigger component is frequently fine — the real fault is
that the TARGET route's page module fails to compile, so navigation occurs but the
route renders a Vite error overlay / blank page.

A classic cause: a leftover duplicate `import` (e.g. a default import repeated at the
bottom of a page file) → Vite react-babel throws `VarRedeclaration` and crashes only
that one route's module. `tsc --noEmit` can pass at a moment when the running dev
bundle is still broken, so trust the web workflow's Vite dev-server error log, not
just typecheck output.

**Why:** the OCS OORJA product cards and the `/products/:slug` detail page use the
same stretched-link overlay in both the "working" and "broken" versions — the click
mechanism never changed; the detail page had simply stopped compiling.

**How to apply:** when a navigation "regression" is reported, first verify the
DESTINATION page compiles and renders (grep the web workflow Vite logs for a
syntax/parse error on that page) before touching the clicked component. Click-verify
with the testing skill using coordinate clicks on desktop + mobile — the stretched
overlay intercepts element-locator clicks by design, so a locator-click timeout is
expected and is NOT a navigation failure.
