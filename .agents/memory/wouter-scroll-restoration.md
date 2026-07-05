---
name: wouter scroll restoration
description: How to restore scroll position on Back/Forward in a wouter SPA, and why a pop flag fails.
---

# Scroll restoration in a wouter SPA

wouter has no built-in scroll restoration, and the browser's native attempt
fires before React re-renders the destination page, so it lands at the top.

**The working approach:** set `history.scrollRestoration = "manual"`, give every
history ENTRY a stable key stored in `history.state` (merge with existing state,
don't overwrite), continuously record `window.scrollY` under the active entry's
key, and on location change restore in a `useLayoutEffect` via
`window.scrollTo(0, saved ?? 0)`.

**Why not a pop flag:** the intuitive design — a `popstate` listener sets
`isPop = true`, and the effect restores only when `isPop` — is RACY and silently
fails (always restores to 0). wouter drives React through `useSyncExternalStore`;
its own popstate handling can drive the re-render + layout effect before your
`popstate` listener's flag is observed, so restore falls through to
`scrollTo(0, 0)`. Keying off the history entry needs no pop flag at all.

**Why the key approach is also correct for forward nav:** a fresh navigation
creates a new entry with no saved position, so it naturally starts at the top;
Back/Forward return to an existing entry key and restore exactly.

**How to apply:**
- Mount one component inside `<WouterRouter>` (sibling of the router).
- Restore in `useLayoutEffect` (pre-paint, no flash).
- **Restore-time clamp (the important gotcha):** deterministic card heights
  (fixed `min-h` + fixed-ratio image well) are NOT enough. On Back, the
  destination products grid is not at full height at this layout effect — it
  settles a frame or two later (the filtered list is pushed up from ProductSearch
  via a *passive* effect, so fewer rows exist at first commit). Measured: docH
  ~2522 at restore vs 10646 final, so `scrollTo(3000)` CLAMPS to ~1802 and the
  position is lost as the page then grows. Fix: after the initial
  `scrollTo(restoreTo)`, if it clamped (`restoreTo > window.scrollY`), re-apply on
  `requestAnimationFrame` each frame once `maxScroll >= restoreTo`, stopping when
  reached or after a ~60-frame cap. It no-ops when the page is already tall enough
  (forward nav has `restoreTo = 0`), so it never fights the deep-link scroll.
- Deep links (`/products?family=<id>`) scroll the family section to just below the
  sticky header on first arrival only, guarded by a `__familyScrolled` flag merged
  into `history.state` (alongside the entry `__scrollKey`); Back skips it so
  restoration wins. Forward paths (full load AND SPA nav from another route) render
  the grid full immediately, so that one-shot scroll does NOT need the re-apply loop
  — the late-settle is specific to the Back/popstate commit.
- Caveat: a *replace* navigation with fresh state drops the entry key and loses
  that entry's position. If you add replace-navigations, carry the key through.
