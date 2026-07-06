import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/data/certifications";
import { HOME_SECTIONS } from "@/data/home";

export default function CertificationsStrip() {
  return (
    <section className="border-y border-border bg-foreground/[0.02] py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={HOME_SECTIONS.certifications.eyebrow}
          title={HOME_SECTIONS.certifications.title}
          subtitle={HOME_SECTIONS.certifications.subtitle}
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {certifications.map((c) => (
            <div
              key={c.name}
              className="flex flex-col items-center rounded-2xl border border-card-border bg-card p-6 text-center shadow-sm"
            >
              {c.logo ? (
                <img
                  src={c.logo}
                  alt={c.name}
                  loading="lazy"
                  className="h-16 w-auto object-contain"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/5">
                  <span className="px-1 text-sm font-bold leading-tight tracking-tight text-primary-strong">
                    {c.name}
                  </span>
                </div>
              )}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
