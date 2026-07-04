

import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "wouter";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { HeroCards } from "@/components/sections/HeroCards";
import { PRODUCT_CATEGORIES, getProductsByCategory, products, productsSortedByDateDesc, type Product } from "@/data/products";
import StarBorder from "@/components/ui/StarBorder";

// Base names for background videos. Actual sources provided as .webm and .mp4
const videoSlides = [
  "hero-background-1",
  "hero-background-2",
  "hero-background-3",
] as const;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextIndex, setNextIndex] = useState(1);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Professional transition with crossfade
  const transitionToNext = useCallback(() => {
    if (isTransitioning) return;
    
    const next = (index + 1) % videoSlides.length;
    setNextIndex(next);
    setIsTransitioning(true);

    // Pre-load and prepare next video
    const nextVideo = videoRefs.current[next];
    if (nextVideo) {
      nextVideo.currentTime = 0;
      const playPromise = nextVideo.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    }

    // Complete transition after crossfade duration
    transitionTimeoutRef.current = setTimeout(() => {
      setIndex(next);
      setIsTransitioning(false);
      
      // Pause the previous video after transition
      const prevVideo = videoRefs.current[index];
      if (prevVideo) {
        prevVideo.pause();
        prevVideo.currentTime = 0;
      }
    }, 1500); // Longer crossfade duration for smoother effect
  }, [index, isTransitioning]);

  // Auto-cycle videos when current video ends
  const handleVideoEnd = useCallback(() => {
    transitionToNext();
  }, [transitionToNext]);

  // Manage video playback states
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      try {
        if (i === index && !isTransitioning) {
          // Main video should always be playing
          if (v.paused) {
            v.currentTime = 0;
            const p = v.play();
            if (p && typeof p.catch === "function") p.catch(() => {});
          }
        } else if (i === nextIndex && isTransitioning) {
          // Next video should play during transition
          // Already handled in transitionToNext
        } else {
          // All other videos should be paused
          if (!v.paused) {
            v.pause();
            v.currentTime = 0;
          }
        }
      } catch {
        // no-op; keep UI resilient even if a browser blocks autoplay
      }
    });
  }, [index, nextIndex, isTransitioning]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="relative isolate min-h-screen flex items-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {videoSlides.map((baseName: string, i: number) => {
          // Calculate opacity for professional crossfade effect
          let opacity = "opacity-0";
          let zIndex = "z-0";
          
          if (i === index && !isTransitioning) {
            // Current video - fully visible
            opacity = "opacity-100";
            zIndex = "z-10";
          } else if (i === index && isTransitioning) {
            // Current video during transition - fading out
            opacity = "opacity-0";
            zIndex = "z-10";
          } else if (i === nextIndex && isTransitioning) {
            // Next video during transition - fading in
            opacity = "opacity-100";
            zIndex = "z-20";
          }

          return (
            <div
              key={baseName}
              className={`absolute inset-0 transition-all duration-[1500ms] ease-out ${opacity} ${zIndex}`}
              aria-hidden={i !== index && (!isTransitioning || i !== nextIndex)}
            >
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[1500ms] ease-out"
                style={{
                  transform: i === nextIndex && isTransitioning 
                    ? 'scale(1)' 
                    : i === index && isTransitioning 
                    ? 'scale(1.05)' 
                    : 'scale(1.02)'
                }}
                muted
                autoPlay
                playsInline
                preload="auto"
                poster={`/images/hero/hero-${i + 1}.svg`}
                onLoadedMetadata={(e) => {
                  try {
                    const v = e.currentTarget;
                    v.muted = true;
                    const p = v.play();
                    if (p && typeof p.catch === 'function') p.catch(() => {});
                  } catch {}
                }}
                onCanPlay={(e) => {
                  try {
                    const v = e.currentTarget;
                    if (v.paused) {
                      const p = v.play();
                      if (p && typeof p.catch === 'function') p.catch(() => {});
                    }
                  } catch {}
                }}
                onEnded={i === index ? handleVideoEnd : undefined}
                loop={false}
              >
                <source src={`/videos/${baseName}.webm`} type="video/webm" />
                <source src={`/videos/${baseName}.mp4`} type="video/mp4" />
              </video>
            </div>
          );
        })}
        
        {/* Enhanced gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40 transition-opacity duration-1000" />
        
        {/* Left-side text area overlay for maximum readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent lg:to-black/20" />
        
        {/* Additional cinematic vignette effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.7) 100%)'
          }}
        />
      </div>
      <Container className="py-20 md:py-28 relative z-30">
        <div className="grid items-center gap-8 lg:gap-10 lg:grid-cols-2">
          <div className="max-w-3xl relative">
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/20 shadow-lg motion-reduce:animate-none animate-[fade-in-up_600ms_ease-out_0ms_both]">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Trusted Indian Manufacturer | Lucknow, U.P.
                </div>
              </div>
              <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white text-balance whitespace-normal leading-[1.05] motion-reduce:animate-none animate-[fade-in-up_650ms_ease-out_100ms_both]">
                <GradientHeadline text="LiFePO₄ Batteries, Hybrid Inverters & EV Charging Solutions" />
              </h1>
              <p className="mt-4 text-lg text-white/90 max-w-2xl drop-shadow-lg motion-reduce:animate-none animate-[fade-in-up_700ms_ease-out_180ms_both]" 
                 style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                OCS OORJA – Trusted Indian manufacturer of advanced lithium-ion battery packs, solar hybrid inverters, and AC/DC EV chargers for e-mobility, telecom, and industrial applications. Based in Lucknow (Uttar Pradesh), we deliver home storage (12V/24V LFP), e‑rickshaw/e‑bike batteries with smart BMS technology.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 motion-reduce:animate-none animate-[fade-in-up_750ms_ease-out_260ms_both]">
                <Button asChild className="shadow-2xl !rounded-[20px] !py-[16px] !px-[26px] !text-[16px] !h-auto">
                  <Link href="/products">Explore Products</Link>
                </Button>
                <StarBorder
                  as={Link}
                  href="/contact"
                  className="shadow-2xl"
                  color="cyan"
                  speed="5s"
                  thickness={1}
                >
                  Request Quote
                </StarBorder>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end px-4 sm:px-0">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
              {(() => {
                // Pick the newest product in each category for variety, then top up to 5 with next-most-recent overall
                const latestByCategory = PRODUCT_CATEGORIES.map((category) => {
                  const sorted = productsSortedByDateDesc(getProductsByCategory(category.id, products));
                  return sorted[0];
                }).filter(Boolean) as Product[];

                const sortedAll = productsSortedByDateDesc(products);
                const targetCount = Math.min(5, sortedAll.length);
                const picked: Product[] = [];
                const seen = new Set<string>();

                // Seed with per-category picks
                latestByCategory.forEach((p) => {
                  if (p && !seen.has(p.id) && picked.length < targetCount) {
                    picked.push(p);
                    seen.add(p.id);
                  }
                });

                // Top up to target count with the next most recent products
                for (const p of sortedAll) {
                  if (picked.length >= targetCount) break;
                  if (seen.has(p.id)) continue;
                  picked.push(p);
                  seen.add(p.id);
                }

                const items = picked.map((p) => ({
                  title: p.name,
                  image: p.image,
                  href: `/products/${p.slug}`,
                  cta: "Learn more",
                }));

                return <HeroCards items={items.length ? items : undefined} />;
              })()}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function GradientHeadline({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-[0.35ch] md:gap-x-[0.45ch]">
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="relative inline-block group align-baseline">
          {/* Base word */}
          <span className="relative transition-opacity duration-500 ease-in-out md:group-hover:opacity-0">
            {w}
          </span>
          {/* Light green gradient   (no blend modes) */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-200 via-emerald-100 to-emerald-50 bg-clip-text text-transparent opacity-0
                       transition-opacity duration-500 ease-in-out md:group-hover:opacity-100"
          >
            {w}
          </span>
        </span>
      ))}
    </span>
  );
}
