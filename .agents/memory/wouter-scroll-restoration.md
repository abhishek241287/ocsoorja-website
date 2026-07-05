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
- Restore in `useLayoutEffect` (pre-paint, no flash). It's exact only if page
  height is deterministic at commit — e.g. product cards use fixed `min-h` + a
  fixed-ratio image well, so lazy images don't shift layout.
- Caveat: a *replace* navigation with fresh state drops the entry key and loses
  that entry's position. If you add replace-navigations, carry the key through.
