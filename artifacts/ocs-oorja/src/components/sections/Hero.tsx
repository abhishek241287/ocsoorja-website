import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "wouter";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import HeroEcosystem from "@/components/sections/HeroEcosystem";
import { BRAND, HEADLINES, CTAS } from "@/data/brand";

// Auto-cycling background videos. To swap a clip, replace the matching files in
// public/videos/ keeping the SAME names — each slide needs BOTH a .webm and a
// .mp4 (browsers pick whichever they support):
//   public/videos/hero-background-1.webm  +  hero-background-1.mp4
//   public/videos/hero-background-2.webm  +  hero-background-2.mp4
//   public/videos/hero-background-3.webm  +  hero-background-3.mp4
// The first frame shown before video 1 loads is public/images/home/hero-background.webp.
const videoSlides = [
  "hero-background-1",
  "hero-background-2",
  "hero-background-3",
] as const;

// Still image shown instantly (and as the video poster) before the first clip
// starts — keeps the hero from flashing black on load.
const HERO_POSTER = "/images/home/hero-background.webp";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextIndex, setNextIndex] = useState(1);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    <section className="relative isolate min-h-[100svh] flex items-center overflow-hidden bg-neutral-950">
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
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-out ${opacity} ${zIndex}`}
              aria-hidden={i !== index && (!isTransitioning || i !== nextIndex)}
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                className="absolute inset-0 h-full w-full object-cover"
                muted
                autoPlay
                playsInline
                preload={i === 0 ? "auto" : "metadata"}
                poster={i === 0 ? HERO_POSTER : undefined}
                onLoadedMetadata={(e) => {
                  try {
                    const v = e.currentTarget;
                    v.muted = true;
                    const p = v.play();
                    if (p && typeof p.catch === "function") p.catch(() => {});
                  } catch {}
                }}
                onCanPlay={(e) => {
                  try {
                    const v = e.currentTarget;
                    if (v.paused) {
                      const p = v.play();
                      if (p && typeof p.catch === "function") p.catch(() => {});
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

        {/* Single, purposeful scrim: darkens the left/bottom for text legibility
            without the layered "generic AI gradient" look. */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20 lg:to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      <Container className="relative z-30 py-24 md:py-28 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className="max-w-[20ch] text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:max-w-[22ch] lg:text-6xl motion-reduce:animate-none animate-[fade-in-up_650ms_ease-out_100ms_both]">
              <span className="block">{HEADLINES.home.title[0]}</span>
              <span className="block text-emerald-300">
                {HEADLINES.home.title[1]}
              </span>
            </h1>

            <p className="mt-4 text-sm font-medium tracking-[0.03em] text-emerald-200/80 motion-reduce:animate-none animate-[fade-in-up_680ms_ease-out_140ms_both]">
              {BRAND.motto}
            </p>

            <p className="mt-6 max-w-[46ch] text-base text-white/80 sm:text-lg motion-reduce:animate-none animate-[fade-in-up_700ms_ease-out_180ms_both]">
              {HEADLINES.home.subhead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4 motion-reduce:animate-none animate-[fade-in-up_750ms_ease-out_260ms_both]">
              <Button asChild size="lg" className="rounded-full">
                <Link href={CTAS.requestQuote.href}>{CTAS.requestQuote.label}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-white/30 text-white hover:bg-white/10 focus-visible:ring-white/60 focus-visible:ring-offset-transparent"
              >
                <Link href={CTAS.exploreProducts.href}>{CTAS.exploreProducts.label}</Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-white/60 motion-reduce:animate-none animate-[fade-in-up_800ms_ease-out_340ms_both]">
              {HEADLINES.home.highlights}
            </p>
          </div>

          <div className="lg:col-span-5 motion-reduce:animate-none animate-[fade-in-up_850ms_ease-out_300ms_both]">
            <div className="mx-auto w-full max-w-sm sm:max-w-md lg:ml-auto lg:mr-0">
              <HeroEcosystem />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
