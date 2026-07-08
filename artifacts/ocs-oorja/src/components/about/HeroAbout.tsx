import { Link } from "wouter";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { BRAND, CTAS, HEADLINES } from "@/data/brand";

// About page hero: bright clean-energy photo background (light sky, not the
// dark brand-green gradient) with a light scrim on the left for text
// legibility, the page H1, the official brand motto, a supporting subtitle,
// and two CTAs. To swap the photo, replace
// public/images/about/hero-background.jpg with a same-named file.
export default function HeroAbout() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-28 lg:min-h-[60vh] lg:flex lg:items-center">
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/about/hero-background.jpg"
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/40" />
      </div>
      <Container className="relative z-10 max-w-3xl">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl motion-reduce:animate-none animate-[fade-in-up_600ms_ease-out_0ms_both]">
          {HEADLINES.about.title}
        </h1>
        <p className="mt-4 text-lg tracking-[0.02em] text-primary-strong motion-reduce:animate-none animate-[fade-in-up_650ms_ease-out_100ms_both]">
          {BRAND.motto}
        </p>
        <p className="mt-6 max-w-[52ch] text-base text-muted-foreground sm:text-lg motion-reduce:animate-none animate-[fade-in-up_700ms_ease-out_180ms_both]">
          {HEADLINES.about.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4 motion-reduce:animate-none animate-[fade-in-up_750ms_ease-out_260ms_both]">
          <Button asChild size="lg">
            <Link href={CTAS.freeConsultation.href}>{CTAS.freeConsultation.label}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={CTAS.exploreProducts.href}>{CTAS.exploreProducts.label}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
