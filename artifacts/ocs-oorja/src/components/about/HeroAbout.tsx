import { Link } from "wouter";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { BRAND, CTAS, HEADLINES } from "@/data/brand";

// About page hero: dark brand-green gradient with a subtle geometric pattern,
// the page H1, the official brand motto, a supporting subtitle, and two CTAs.
export default function HeroAbout() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[hsl(var(--brand-green-900))] via-[hsl(var(--brand-green-800))] to-[hsl(var(--brand-green-700))] py-24 md:py-28 lg:min-h-[60vh] lg:flex lg:items-center">
      <div
        className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]"
        aria-hidden="true"
      />
      <Container className="relative z-10 max-w-3xl">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl motion-reduce:animate-none animate-[fade-in-up_600ms_ease-out_0ms_both]">
          {HEADLINES.about.title}
        </h1>
        <p className="mt-4 text-lg tracking-[0.02em] text-white/80 motion-reduce:animate-none animate-[fade-in-up_650ms_ease-out_100ms_both]">
          {BRAND.motto}
        </p>
        <p className="mt-6 max-w-[52ch] text-base text-white/70 sm:text-lg motion-reduce:animate-none animate-[fade-in-up_700ms_ease-out_180ms_both]">
          {HEADLINES.about.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4 motion-reduce:animate-none animate-[fade-in-up_750ms_ease-out_260ms_both]">
          <Button asChild size="lg" className="bg-white text-[hsl(var(--brand-green-800))] hover:bg-white/90">
            <Link href={CTAS.freeConsultation.href}>{CTAS.freeConsultation.label}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 focus-visible:ring-white/60 focus-visible:ring-offset-transparent"
          >
            <Link href={CTAS.exploreProducts.href}>{CTAS.exploreProducts.label}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
