import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useSearch } from "wouter";

// Scroll restoration for the wouter SPA (wouter has no built-in support, and the
// browser's native attempt fires before React re-renders the destination page,
// so it lands at the top).
//
// We give every history entry a stable key stored in history.state, record that
// entry's scroll position, and restore it exactly when the user returns via
// Back/Forward. A fresh navigation creates a new entry with no saved position,
// so it starts at the top. Keying off the history ENTRY (not the path, and not a
// pop flag) makes this immune to event-ordering races between wouter and React.
const scrollPositions = new Map<string, number>();
const KEY = "__scrollKey";

// Caveat: a *replace* navigation (history.replaceState with fresh state) would
// drop this key and lose that entry's saved position. The app currently uses no
// replace navigations; if one is added, carry the key through it.
function ensureKey(): string {
  const state = (window.history.state ?? null) as Record<string, unknown> | null;
  const existing = state?.[KEY];
  if (typeof existing === "string") return existing;
  const key = Math.random().toString(36).slice(2) + Date.now().toString(36);
  // Preserve any state wouter/others stored; just add our key.
  window.history.replaceState({ ...(state ?? {}), [KEY]: key }, "");
  return key;
}

export default function ScrollRestoration() {
  const [location] = useLocation();
  // Include the query string so search-only navigations (e.g. the header's
  // /products?family=<id> deep links) are treated as distinct history entries
  // and get their own recorded/restored scroll position.
  const search = useSearch();
  const currentKey = useRef<string>("");

  // Take over from the browser's native (mis-timed) restoration.
  useEffect(() => {
    const history = window.history;
    const previous = history.scrollRestoration;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    return () => {
      if ("scrollRestoration" in history) history.scrollRestoration = previous;
    };
  }, []);

  // Continuously record the live scroll position under the active entry's key.
  useEffect(() => {
    let frame = 0;
    const record = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (currentKey.current) scrollPositions.set(currentKey.current, window.scrollY);
      });
    };
    window.addEventListener("scroll", record, { passive: true });
    return () => {
      window.removeEventListener("scroll", record);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // On each navigation, adopt the destination entry's key and restore (or reset)
  // its scroll before paint. useLayoutEffect runs pre-paint so there is no flash.
  // Caveat handled below: on Back to the products page the grid reaches full
  // height a frame or two AFTER this commit, so a single scrollTo can clamp
  // against a still-short page — the re-apply loop re-issues it once tall enough.
  useLayoutEffect(() => {
    const key = ensureKey();
    currentKey.current = key;
    const restoreTo = scrollPositions.get(key) ?? 0;
    window.scrollTo(0, restoreTo);

    // The destination page may not have reached its full height yet at this
    // point: the products grid settles a frame or two after the route commit
    // (the filtered list is pushed up via a passive effect), so its final rows
    // don't exist when we restore. A single scrollTo would then clamp to the
    // (short) current maximum and the saved position would be lost as the page
    // grows. Re-apply across a few frames until the page can accommodate the
    // saved position, or a short best-effort budget elapses. When the page is
    // already tall enough (the common case) the first scrollTo lands exactly and
    // this loop exits immediately, so normal restoration is unchanged.
    if (restoreTo <= window.scrollY) return;
    let raf = 0;
    let frames = 0;
    const reapply = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll >= restoreTo && window.scrollY < restoreTo) {
        window.scrollTo(0, restoreTo);
      }
      frames += 1;
      if (window.scrollY >= restoreTo - 1 || frames >= 60) return;
      raf = window.requestAnimationFrame(reapply);
    };
    raf = window.requestAnimationFrame(reapply);
    return () => window.cancelAnimationFrame(raf);
  }, [location, search]);

  return null;
}
