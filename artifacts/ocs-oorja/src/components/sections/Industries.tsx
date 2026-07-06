import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_SECTIONS } from "@/data/home";
import { industries } from "@/data/industries";

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
          {industries.map((industry) => (
            <Link
              key={industry.id}
              href={industry.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={industry.image}
                  alt={industry.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                  aria-hidden="true"
                />
                <h3 className="absolute inset-x-4 bottom-3 text-lg font-semibold tracking-tight text-white">
                  {industry.name}
                </h3>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-primary-strong">
                  Explore solutions
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
