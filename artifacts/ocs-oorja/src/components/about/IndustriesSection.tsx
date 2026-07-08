import {
  Home,
  Building,
  Factory,
  Tractor,
  Car,
  Signal,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ABOUT_INDUSTRIES_SECTION } from "@/data/about";
import { industries } from "@/data/industries";

// Resolve an icon NAME (stored in src/data/industries.ts) to a lucide
// component here in the UI layer. When you add a new icon NAME there, add it
// here too. Card data is shared with the homepage industries section — this
// component renders it as icon cards instead of photo cards.
const iconByName: Record<string, LucideIcon> = {
  Home,
  Building,
  Factory,
  Tractor,
  Car,
  Signal,
};

export default function IndustriesSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={ABOUT_INDUSTRIES_SECTION.eyebrow}
          title={ABOUT_INDUSTRIES_SECTION.title}
          subtitle={ABOUT_INDUSTRIES_SECTION.subtitle}
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const Icon = iconByName[industry.icon] ?? Home;
            return (
              <div
                key={industry.id}
                className="flex flex-col gap-4 rounded-2xl border border-card-border bg-card p-8 shadow-sm transition-colors duration-300 hover:border-primary/40"
              >
                <Icon className="h-6 w-6 text-primary-strong" aria-hidden="true" />
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {industry.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
