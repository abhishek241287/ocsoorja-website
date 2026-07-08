import { Link } from "wouter";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { CTAS } from "@/data/brand";
import { ABOUT_CTA } from "@/data/about";

// Full-width, dark brand-green CTA banner closing out the About page.
export default function AboutCTA() {
  return (
    <section className="bg-gradient-to-br from-[hsl(var(--brand-green-900))] via-[hsl(var(--brand-green-800))] to-[hsl(var(--brand-green-700))] py-16 md:py-24">
      <Container className="text-center">
        <h2 className="mx-auto max-w-2xl text-2xl font-semibold tracking-tight text-balance text-white md:text-3xl lg:text-4xl">
          {ABOUT_CTA.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
          {ABOUT_CTA.body}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-[hsl(var(--brand-green-800))] hover:bg-white/90">
            <Link href={CTAS.freeConsultation.href}>{CTAS.freeConsultation.label}</Link>
          </Button>
          <Button
            asChild
            variant="link"
            size="lg"
            className="text-white underline-offset-4 hover:text-white/90"
          >
            <Link href={CTAS.exploreProducts.href}>View Our Products</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
