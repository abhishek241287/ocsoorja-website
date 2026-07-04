import { Container } from "@/components/layout/Container";
import { certifications } from "@/data/certifications";

export default function CertificationsStrip() {
  return (
    <section className="py-8 border-y border-foreground/10 bg-foreground/[0.03]">
      <Container className="flex flex-wrap items-center gap-3">
        {certifications.map((c) => (
          <span key={c.name} className="rounded-full border border-foreground/15 bg-background px-3 py-1 text-xs font-medium text-foreground/80">
            {c.name}
          </span>
        ))}
      </Container>
    </section>
  );
}
