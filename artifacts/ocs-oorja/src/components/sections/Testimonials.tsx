import { useEffect, useRef, useState } from "react";
import { Calendar, CheckCircle, MapPin, Star, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  testimonials,
  testimonialStats,
  trustBadges,
  type Testimonial,
} from "@/data/testimonials";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_SECTIONS } from "@/data/home";

const iconByName: Record<string, LucideIcon> = {
  CheckCircle,
};

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Reveals an element with the shared fade-in-up animation when scrolled into
 *  view. Falls back to "always visible" when reduced motion is preferred or
 *  IntersectionObserver is unavailable, so cards can never stay hidden. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function StarRating({ rating }: { rating: number }) {
  const clamped = Math.max(0, Math.min(5, rating));
  const fullStars = Math.round(clamped);
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Rated ${clamped.toFixed(1)} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < fullStars
              ? "fill-current text-amber-500"
              : "fill-none text-muted-foreground/30",
          )}
          aria-hidden="true"
        />
      ))}
      <span className="ml-2 text-sm font-medium text-muted-foreground">
        {clamped.toFixed(1)}/5
      </span>
    </div>
  );
}

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  const [failed, setFailed] = useState(false);
  const sizeClasses = testimonial.featured
    ? "h-[72px] w-[72px] text-xl"
    : "h-14 w-14 text-base";

  if (!testimonial.photo || failed) {
    return (
      <div
        className={cn(
          "flex flex-shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 font-bold text-primary-strong",
          sizeClasses,
        )}
        aria-hidden="true"
      >
        {initials(testimonial.name)}
      </div>
    );
  }

  return (
    <img
      src={testimonial.photo}
      alt={testimonial.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn(
        "flex-shrink-0 rounded-full border-2 border-primary object-cover shadow-sm transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none",
        sizeClasses,
      )}
    />
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLElement>();
  const location = [testimonial.city, testimonial.state]
    .filter(Boolean)
    .join(", ");
  const hasMeta =
    Boolean(location) ||
    Boolean(testimonial.productInstalled) ||
    Boolean(testimonial.installDate);

  return (
    <article
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-card-border bg-card p-7",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg dark:hover:border-primary/30",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        visible
          ? "animate-[fade-in-up_0.5s_ease-out_both] motion-reduce:animate-none"
          : "opacity-0",
        testimonial.featured && "md:col-span-2",
      )}
      style={visible ? { animationDelay: `${index * 80}ms` } : undefined}
    >
      {/* Left accent border */}
      <div
        aria-hidden="true"
        className="absolute bottom-7 left-0 top-7 w-[3px] rounded-r-sm bg-primary/50 transition-all duration-300 group-hover:w-1 group-hover:bg-primary"
      />

      {/* Verified badge */}
      {testimonial.verified && (
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-primary-strong">
          <CheckCircle className="h-3 w-3" aria-hidden="true" />
          Verified Installation
        </div>
      )}

      {/* Header: avatar + rating */}
      <div className="mb-5 flex items-center gap-4">
        <Avatar testimonial={testimonial} />
        <div className="min-w-0">
          <StarRating rating={testimonial.rating ?? 5} />
        </div>
      </div>

      {/* Quote */}
      <blockquote
        className={cn(
          "relative z-10 mb-6 leading-relaxed text-foreground",
          testimonial.featured ? "text-lg" : "text-[15px]",
        )}
      >
        “{testimonial.review}”
      </blockquote>

      {/* Decorative quote mark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-4 select-none font-serif text-7xl leading-none text-primary/[0.06] dark:text-primary/10"
      >
        ”
      </span>

      {/* Footer */}
      <div className="border-t border-card-border pt-5">
        <div className={cn(hasMeta && "mb-3")}>
          <strong className="block text-[15px] font-semibold text-foreground">
            {testimonial.name}
          </strong>
          <span className="text-[13px] text-muted-foreground">
            {testimonial.designation}
            {testimonial.company && (
              <>
                {" · "}
                <span className="font-medium text-primary-strong">
                  {testimonial.company}
                </span>
              </>
            )}
          </span>
        </div>
        {hasMeta && (
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {location && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                {location}
              </span>
            )}
            {testimonial.productInstalled && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Wrench className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                {testimonial.productInstalled}
              </span>
            )}
            {testimonial.installDate && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar
                  className="h-3.5 w-3.5 opacity-70"
                  aria-hidden="true"
                />
                {testimonial.installDate}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-secondary/30 py-16 dark:bg-transparent md:py-24">
      <Container>
        <SectionHeading
          eyebrow={HOME_SECTIONS.testimonials.eyebrow}
          title={HOME_SECTIONS.testimonials.title}
          subtitle={HOME_SECTIONS.testimonials.subtitle}
        />

        {/* Stats bar — controlled by testimonialStats in src/data/testimonials.ts */}
        {testimonialStats.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-8 md:gap-12">
            {testimonialStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block text-3xl font-bold text-primary-strong">
                  {stat.value}
                </span>
                <span className="mt-2 block text-[13px] font-medium text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Grid: 1 col mobile · 2 cols tablet · 3 cols desktop. Every entry is
            always rendered — no carousel, no hidden cards. */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={`${t.name}-${t.company}`}
              testimonial={t}
              index={i}
            />
          ))}
        </div>

        {/* Trust badges — controlled by trustBadges in src/data/testimonials.ts */}
        {trustBadges.length > 0 && (
          <div className="mt-14 flex flex-wrap justify-center gap-4">
            {trustBadges.map((badge) => {
              const Icon = iconByName[badge.icon] ?? CheckCircle;
              return (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground"
                >
                  <Icon
                    className="h-4 w-4 text-primary-strong"
                    aria-hidden="true"
                  />
                  {badge.label}
                </span>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
