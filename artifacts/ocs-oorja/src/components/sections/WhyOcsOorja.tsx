import {
  Factory,
  ShieldCheck,
  BatteryCharging,
  BadgeCheck,
  Headphones,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_SECTIONS, WHY_OCS_OORJA } from "@/data/home";

// Resolve an icon NAME (stored in data) to a lucide component here in the UI
// layer. Components are never stored in the data files.
const iconByName: Record<string, LucideIcon> = {
  Factory,
  ShieldCheck,
  BatteryCharging,
  BadgeCheck,
  Headphones,
  Settings2,
};

export default function WhyOcsOorja() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={HOME_SECTIONS.why.eyebrow}
          title={HOME_SECTIONS.why.title}
          subtitle={HOME_SECTIONS.why.subtitle}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_OCS_OORJA.map((feature) => {
            const Icon = iconByName[feature.icon] ?? ShieldCheck;
            return (
              <div
                key={feature.title}
                className="flex flex-col gap-4 rounded-2xl border border-card-border bg-card p-6 shadow-sm transition-colors duration-300 hover:border-primary/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-card-border bg-primary/5">
                  <Icon className="h-6 w-6 text-primary-strong" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
