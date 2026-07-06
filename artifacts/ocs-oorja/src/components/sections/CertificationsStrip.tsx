import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/data/certifications";
import { HOME_SECTIONS } from "@/data/home";

export default function CertificationsStrip() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={HOME_SECTIONS.certifications.eyebrow}
          title={HOME_SECTIONS.certifications.title}
          subtitle={HOME_SECTIONS.certifications.subtitle}
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c) => (
            <div
              key={c.name}
              className="flex items-start gap-4 rounded-2xl border border-card-border bg-card p-5 shadow-sm"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-card-border bg-primary/5">
                <BadgeCheck className="h-6 w-6 text-primary-strong" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {c.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
