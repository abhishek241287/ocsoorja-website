import { Link } from "wouter";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import HeroEcosystem from "@/components/sections/HeroEcosystem";
import { HEADLINES, CTAS } from "@/data/brand";

// Hero background image (the page's LCP). To change it, replace this ONE file:
//   public/images/home/hero-background.webp
// A smaller phone-sized copy (hero-background-768.webp) is served to small
// screens via srcSet — regenerate both if you swap the picture.
const HERO_IMAGE = "/images/home/hero-background.webp";
const HERO_IMAGE_MOBILE = "/images/home/hero-background-768.webp";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] flex items-center overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={HERO_IMAGE}
          srcSet={`${HERO_IMAGE_MOBILE} 768w, ${HERO_IMAGE} 1410w`}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Single, purposeful scrim: darkens the left/bottom for text legibility
            without the layered "generic AI gradient" look. */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20 lg:to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      <Container className="relative z-30 py-24 md:py-28 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 motion-reduce:animate-none animate-[fade-in-up_600ms_ease-out_0ms_both]">
              <span className="h-px w-8 bg-emerald-400" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                {HEADLINES.home.eyebrow}
              </span>
            </div>

            <h1 className="mt-6 max-w-[20ch] text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:max-w-[22ch] lg:text-6xl motion-reduce:animate-none animate-[fade-in-up_650ms_ease-out_100ms_both]">
              <span className="block">{HEADLINES.home.title[0]}</span>
              <span className="block text-emerald-300">
                {HEADLINES.home.title[1]}
              </span>
            </h1>

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
