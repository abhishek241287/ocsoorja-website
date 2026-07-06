import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_SECTIONS } from "@/data/home";
import { cn } from "@/lib/utils";

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

        {/* Responsive grid: 1 col mobile · 2 cols tablet · 3 cols desktop.
            Every testimonial is always rendered — no carousel, no hidden cards. */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => {
            const rating = Math.max(0, Math.min(5, Math.round(t.rating ?? 5)));
            return (
              <figure
                key={`${t.name}-${t.company}`}
                className="flex flex-col rounded-2xl border border-card-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div
                  className="flex gap-0.5 text-amber-400"
                  role="img"
                  aria-label={`Rated ${rating} out of 5`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < rating
                          ? "fill-current"
                          : "fill-none text-muted-foreground/30",
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground">
                  “{t.review}”
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={t.name}
                      loading="lazy"
                      className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary-strong"
                      aria-hidden="true"
                    >
                      {initials(t.name)}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {t.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t.designation} · {t.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
