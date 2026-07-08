import {
  MapPin,
  Layers,
  Award,
  Wrench,
  Headphones,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_CHOOSE } from "@/data/about";

// Resolve an icon NAME (stored in data) to a lucide component here in the UI
// layer. When you add a new icon NAME in src/data/about.ts, add it here too.
const iconByName: Record<string, LucideIcon> = {
  MapPin,
  Layers,
  Award,
  Wrench,
  Headphones,
  Rocket,
};

// "Why OCS OORJA" — six differentiators, 3x2 grid, on a light neutral
// background to separate it from the surrounding white sections.
export default function WhyChooseSection() {
  return (
    <section className="bg-muted/60 py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={WHY_CHOOSE.eyebrow} title={WHY_CHOOSE.title} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.items.map((item) => {
            const Icon = iconByName[item.icon] ?? MapPin;
            return (
              <div
                key={item.title}
                className="flex flex-col gap-4 rounded-2xl border border-card-border bg-card p-6 shadow-sm transition-colors duration-300 hover:border-primary/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-card-border bg-primary/5">
                  <Icon className="h-6 w-6 text-primary-strong" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
