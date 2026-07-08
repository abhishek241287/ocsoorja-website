import {
  Shield,
  CheckCircle,
  Lightbulb,
  Heart,
  Scale,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CORE_VALUES } from "@/data/about";

// Resolve an icon NAME (stored in data) to a lucide component here in the UI
// layer. When you add a new icon NAME in src/data/about.ts, add it here too.
const iconByName: Record<string, LucideIcon> = {
  Shield,
  CheckCircle,
  Lightbulb,
  Heart,
  Scale,
  Globe,
};

// "What We Stand For" — six core-value cards, 3x2 grid on desktop.
export default function ValuesSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={CORE_VALUES.eyebrow} title={CORE_VALUES.title} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.items.map((item) => {
            const Icon = iconByName[item.icon] ?? Shield;
            return (
              <div
                key={item.title}
                className="flex flex-col gap-4 rounded-2xl border border-card-border bg-card p-6 shadow-sm transition-colors duration-300 hover:border-primary/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-card-border bg-primary/5">
                  <Icon className="h-6 w-6 text-primary-strong" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
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
