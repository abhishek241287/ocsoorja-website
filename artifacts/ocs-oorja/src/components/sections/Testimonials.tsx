import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_SECTIONS } from "@/data/home";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={HOME_SECTIONS.testimonials.eyebrow}
          title={HOME_SECTIONS.testimonials.title}
          subtitle={HOME_SECTIONS.testimonials.subtitle}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="flex flex-col rounded-2xl border border-card-border bg-card p-8 shadow-sm"
            >
              <div
                className="flex gap-0.5 text-amber-400"
                aria-label="Rated 5 out of 5"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary-strong"
                  aria-hidden="true"
                >
                  {initials(t.author)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {t.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.role} · {t.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
