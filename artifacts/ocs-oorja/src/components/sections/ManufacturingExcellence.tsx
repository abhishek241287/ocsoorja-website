import { Link } from "wouter";
import {
  Factory,
  BatteryCharging,
  ClipboardCheck,
  Ruler,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HOME_SECTIONS, MANUFACTURING_STEPS } from "@/data/home";
import { CTAS } from "@/data/brand";

// Resolve an icon NAME (stored in data) to a lucide component here in the UI
// layer. Components are never stored in the data files.
const iconByName: Record<string, LucideIcon> = {
  Factory,
  BatteryCharging,
  ClipboardCheck,
  Ruler,
  Wrench,
};

export default function ManufacturingExcellence() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow={HOME_SECTIONS.manufacturing.eyebrow}
              title={HOME_SECTIONS.manufacturing.title}
              subtitle={HOME_SECTIONS.manufacturing.subtitle}
            />
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link href={CTAS.contactUs.href}>{CTAS.contactUs.label}</Link>
              </Button>
            </div>
          </div>

          <ol className="space-y-8">
            {MANUFACTURING_STEPS.map((step, i) => {
              const Icon = iconByName[step.icon] ?? Factory;
              return (
                <li key={step.title} className="flex gap-5">
                  <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-card-border bg-primary/5">
                    <Icon className="h-6 w-6 text-primary-strong" aria-hidden="true" />
                    <span
                      className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
