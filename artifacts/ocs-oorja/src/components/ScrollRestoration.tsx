import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "wouter";

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
  // its scroll before paint. useLayoutEffect runs pre-paint so there is no flash;
  // card heights are deterministic, so restoration is exact.
  useLayoutEffect(() => {
    const key = ensureKey();
    currentKey.current = key;
    window.scrollTo(0, scrollPositions.get(key) ?? 0);
  }, [location]);

  return null;
}
