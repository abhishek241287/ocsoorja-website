import { Container } from "@/components/layout/Container";
import { VISION } from "@/data/about";

// "Our Vision" — centered single statement on a light, neutral background.
export default function VisionSection() {
  return (
    <section className="bg-muted/60 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary-strong">
            {VISION.eyebrow}
          </div>
          <p className="mt-4 text-xl font-medium leading-relaxed tracking-tight text-foreground text-balance sm:text-2xl">
            &ldquo;{VISION.statement}&rdquo;
          </p>
          <p className="mt-6 text-sm font-medium tracking-wide text-muted-foreground">
            {VISION.pillars.join(" · ")}
          </p>
        </div>
      </Container>
    </section>
  );
}
