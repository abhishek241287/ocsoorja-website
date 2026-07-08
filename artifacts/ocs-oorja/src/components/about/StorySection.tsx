import { Container } from "@/components/layout/Container";
import { OUR_STORY } from "@/data/about";

// "Our Story" — two-column on desktop (copy + visual), single column mobile.
export default function StorySection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary-strong">
              {OUR_STORY.eyebrow}
            </div>
            <h2 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-balance">
              {OUR_STORY.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
              {OUR_STORY.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-card-border bg-gradient-to-br from-[hsl(var(--brand-green-700))] to-[hsl(var(--brand-green-900))]">
              <img
                src="/images/home/industries-residential.webp"
                alt="Indian rooftop solar installation"
                loading="lazy"
                className="h-full w-full object-cover mix-blend-luminosity opacity-90"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
