import { Link } from "wouter";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HOME_SECTIONS, MANUFACTURING_STEPS } from "@/data/home";
import { CTAS } from "@/data/brand";

// A professional five-stage manufacturing timeline: Engineering → Manufacturing
// → Testing → Quality Inspection → Delivery, each with a real process visual.
export default function ManufacturingExcellence() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={HOME_SECTIONS.manufacturing.eyebrow}
          title={HOME_SECTIONS.manufacturing.title}
          subtitle={HOME_SECTIONS.manufacturing.subtitle}
        />

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {MANUFACTURING_STEPS.map((step, i) => (
            <li key={step.title} className="flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-card-border">
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={step.objectPosition ? { objectPosition: step.objectPosition } : undefined}
                />
                <span
                  className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-md"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline">
            <Link href={CTAS.contactUs.href}>{CTAS.contactUs.label}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
