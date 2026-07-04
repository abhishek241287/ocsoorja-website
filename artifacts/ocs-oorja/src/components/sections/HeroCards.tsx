

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type HeroCard = {
  title: string;
  image: string;
  href?: string;
  cta?: string;
};

const DEFAULT_ITEMS: HeroCard[] = [
  { title: "Lithium Inverter OCS-LI-1000", image: "/images/products/lithium-inverter-ad.jpeg", href: "/products/lithium-inverter-ocs-li-1000", cta: "Learn more" },
  { title: "Home Power 25.6V 100Ah", image: "/images/products/solar-24v-100ah.svg", href: "/products/24v-100ah-home-power-storage", cta: "Learn more" },
  { title: "E‑Rickshaw 51.2V 105Ah", image: "/images/products/e-rickshaw-48v-120ah.svg", href: "/products/e-rickshaw-51v2-100ah", cta: "Learn more" },
  { title: "E‑Bike 60V 40Ah", image: "/images/products/ess-48v-100ah.svg", href: "/products/e-bike-60v-40ah", cta: "Learn more" },
  { title: "Solar Inverter 48V 6kW", image: "/images/products/telecom-48v-200ah.svg", href: "/products/solar-hybrid-inverter-48v-6kw", cta: "Learn more" },
];

export function HeroCards({ items = DEFAULT_ITEMS, intervalMs = 2500 }: { items?: HeroCard[]; intervalMs?: number }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  // Cache per-image luminance and derived tint values
  const tintCacheRef = useRef<Record<string, { lum: number; L: number; a: number; vignette: number }>>({});
  // Trigger a single re-render once stats are computed
  const [, forceRender] = useState(0);

  const count = items.length;

  const next = () => setActive((i) => (i + 1) % count);
  const prev = () => setActive((i) => (i - 1 + count) % count);
  const goTo = (i: number) => setActive(((i % count) + count) % count);

  // Respect reduced motion
  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || prefersReduced || count <= 1) return; // pause on hover or interaction
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, intervalMs);
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [count, intervalMs, paused, prefersReduced]);

  // Pause when not visible (tab hidden)
  useEffect(() => {
    const handler = () => setPaused(document.visibilityState !== "visible");
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  // Add state for client-side rendering flag
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Compute position for up to 2 cards on each side
  const positions = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < count; i++) arr.push(i);
    return arr.map((i) => positionFor(i, active, count, isClient));
  }, [active, count, isClient]);

  return (
    <div
      className="relative w-full" 
      aria-roledescription="carousel" 
      aria-label="Featured products"
      onMouseEnter={() => setPaused(true)} 
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)} 
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative h-[240px] sm:h-[280px] md:h-[360px] lg:h-[420px] overflow-hidden">
        {items.map((item, i) => {
          const pos = positions[i];
          // Hide cards that are far from center for performance or mobile side cards
          const hidden = Math.abs(pos.order) > 2 || (isClient && typeof window !== 'undefined' && window.innerWidth < 640 && Math.abs(pos.order) > 1);
          const stats = tintCacheRef.current[item.image];
          const cardBg = stats
            ? `hsla(217, 54%, ${stats.L}%, ${stats.a})`
            : `hsla(217, 54%, 26%, 0.95)`; // stronger default to ensure title legibility
          const vignetteAlpha = stats ? stats.vignette : 0.08;
          const titleBg = stats
            ? `hsla(217, 54%, ${Math.max(18, Math.min(26, stats.L - 4))}%, 1)`
            : `hsla(217, 54%, 20%, 1)`;
          return (
            <article
              key={i}
              className={cn(
                "absolute w-[140px] sm:w-[180px] md:w-[240px] lg:w-[280px] select-none",
                hidden && "pointer-events-none opacity-0"
              )}
              style={{
                left: '50%',
                top: '50%',
                zIndex: 40 + (5 - Math.abs(pos.order)),
                transform:
                  `translate(-50%, -50%) translateX(${pos.translateX}px) translateY(${pos.translateY}px) scale(${pos.scale}) rotate(${pos.rotate}deg)`,
                transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1), filter 500ms, opacity 300ms",
                filter: `brightness(${pos.brightness})`,
              }}
              aria-hidden={hidden}
            >
              <div className="rounded-xl sm:rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden supports-[backdrop-filter]:backdrop-blur-[1.5px]"
                   style={{ backgroundColor: cardBg }}>
                <div className="relative h-[160px] sm:h-[200px] md:h-[260px] lg:h-[300px] bg-transparent">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                      
                     
                    className="object-contain p-2 sm:p-3 md:p-4 lg:p-5"
                    onLoad={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      const src = item.image;
                      if (!(src in tintCacheRef.current)) {
                        const lum = measureImageLuminance(img);
                        if (!Number.isNaN(lum)) {
                          const { L, a } = cardTintFromLum(lum);
                          const vignette = overlayAlphaFromLum(lum);
                          tintCacheRef.current[src] = { lum, L, a, vignette };
                          forceRender((v) => v + 1);
                        }
                      }
                    }} 
                  />
                  <div className="absolute inset-0 pointer-events-none rounded-xl sm:rounded-2xl"
                       style={{
                         boxShadow: "inset 0 1px 0 rgba(255,255,255,.06)",
                         background: `radial-gradient(120% 80% at 50% 10%, rgba(0,0,0,0) 58%, rgba(0,0,0,${vignetteAlpha.toFixed(2)}) 100%)`
                       }}
                  />
                </div>
                <div className="p-2 sm:p-3 md:p-4">
                  <div className="rounded-md ring-1 ring-black/20 shadow-sm px-2.5 py-2 sm:px-3 sm:py-2" style={{ backgroundColor: titleBg }}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                      <div className={cn("text-sm sm:text-base font-bold tracking-wide truncate text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]")}>{item.title}</div>
                      {item.href && (
                        <Link href={item.href} className={cn("text-xs sm:text-sm font-medium whitespace-nowrap self-start sm:self-auto flex-shrink-0 text-emerald-200 hover:text-emerald-100") }>
                          {item.cta ?? "Learn more"} →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Controls */}
      {count > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={prev}
            className="pointer-events-auto absolute left-1 sm:left-2 top-1/2 z-[60] -translate-y-1/2 inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg ring-1 ring-black/10 hover:bg-white hover:text-slate-900 active:bg-slate-50 transition-all duration-200 dark:bg-slate-800/90 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 stroke-[2.5]" />
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="pointer-events-auto absolute right-1 sm:right-2 top-1/2 z-[60] -translate-y-1/2 inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg ring-1 ring-black/10 hover:bg-white hover:text-slate-900 active:bg-slate-50 transition-all duration-200 dark:bg-slate-800/90 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 stroke-[2.5]" />
          </button>
        </>
      )}

      {/* Dots */}
      {count > 1 && (
        <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-colors",
                i === active ? "bg-emerald-500" : "bg-foreground/30 hover:bg-foreground/50 dark:bg-white/60 dark:hover:bg-white/80"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function positionFor(i: number, active: number, count: number, isClient: boolean = false) {
  // Distance from active with wrap-around, mapped to [-floor(n/2)..+]
  let diff = i - active;
  if (diff > count / 2) diff -= count;
  if (diff < -count / 2) diff += count;

  const order = Math.max(-2, Math.min(2, diff));
  
  // Mobile-first responsive spacing - use isClient to avoid hydration mismatch
  const isMobile = isClient && typeof window !== 'undefined' && window.innerWidth < 640;
  const base = isMobile ? 35 : 60; // Much smaller spacing for mobile

  const translateX = order * base;
  const translateY = Math.abs(order) * (isMobile ? 3 : 5);
  const scale = 1 - Math.abs(order) * (isMobile ? 0.12 : 0.08);
  const rotate = order * (isMobile ? -1 : -2); 
  const brightness = 1 - Math.abs(order) * 0.06;

  return { order, translateX, translateY, scale, rotate, brightness };
}

// ----- One-time color/luminance helpers (tiny, low-cost) -----
function clamp(n: number, min = 0, max = 1) { return Math.max(min, Math.min(max, n)); }

// Determine a navy-tinted card background based on luminance.
// We keep hue ~217 (subtle blue), adjust lightness and alpha to harmonize with hero videos.
function cardTintFromLum(lum: number): { L: number; a: number } {
  const L = Math.round(18 + clamp(lum) * 12); // 18%..30% (narrow range keeps consistency)
  // Higher alpha for brighter images to preserve readability over light assets
  const a = lum >= 0.85 ? 0.88
        : lum >= 0.7  ? 0.86
        : lum >= 0.5  ? 0.84
        : lum >= 0.35 ? 0.82
        :               0.8;
  return { L, a };
}

// Subtle vignette strength for the image stage based on luminance
function overlayAlphaFromLum(lum: number): number {
  const L = clamp(lum);
  if (L >= 0.85) return 0.14;
  if (L >= 0.7) return 0.12;
  if (L >= 0.5) return 0.1;
  if (L >= 0.35) return 0.085;
  return 0.06;
}

// Rough average luminance using tiny offscreen canvas (16x16). One-time per image.
function measureImageLuminance(img: HTMLImageElement): number {
  try {
    const w = 16, h = 16;
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return NaN;
    const { naturalWidth: iw, naturalHeight: ih } = img;
    if (!iw || !ih) return NaN;
    const scale = Math.min(w / iw, h / ih);
    const dw = iw * scale, dh = ih * scale;
    const dx = (w - dw) / 2, dy = (h - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
    const data = ctx.getImageData(0, 0, w, h).data;
    let sum = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
      sum += 0.2126 * r + 0.7152 * g + 0.0722 * b; // Rec.709
    }
    return clamp(sum / (w * h));
  } catch {
    return NaN;
  }
}
