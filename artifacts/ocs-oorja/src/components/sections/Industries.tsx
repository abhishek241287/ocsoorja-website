import { Link } from "wouter";
import {
  Home,
  Building2,
  SunMedium,
  Zap,
  RadioTower,
  Wrench,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_SECTIONS } from "@/data/home";
import { industries } from "@/data/industries";

// Resolve an icon NAME (stored in data) to a lucide component here in the UI
// layer. Components are never stored in the data files.
const iconByName: Record<string, LucideIcon> = {
  Home,
  Building2,
  SunMedium,
  Zap,
  RadioTower,
  Wrench,
};

export default function Industries() {
  return (
    <section className="border-y border-border bg-foreground/[0.02] py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={HOME_SECTIONS.industries.eyebrow}
          title={HOME_SECTIONS.industries.title}
          subtitle={HOME_SECTIONS.industries.subtitle}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const Icon = iconByName[industry.icon] ?? Building2;
            return (
              <Link
                key={industry.id}
                href={industry.href}
                className="group flex flex-col gap-4 rounded-2xl border border-card-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-card-border bg-primary/5">
                  <Icon className="h-6 w-6 text-primary-strong" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {industry.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary-strong">
                  Explore solutions
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
