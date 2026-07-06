import { Link } from "wouter";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { CTAS } from "@/data/brand";
import { HOME_FINAL_CTA } from "@/data/home";

export default function FinalCta() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="rounded-3xl border border-card-border bg-card px-6 py-12 text-center shadow-sm md:px-12 md:py-16">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary-strong">
            {HOME_FINAL_CTA.eyebrow}
          </div>
          <h2 className="mx-auto max-w-2xl text-2xl font-semibold tracking-tight text-foreground text-balance md:text-3xl lg:text-4xl">
            {HOME_FINAL_CTA.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            {HOME_FINAL_CTA.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href={CTAS.requestQuote.href}>{CTAS.requestQuote.label}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={CTAS.contactUs.href}>{CTAS.contactUs.label}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
