import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ENGINEERING_EXCELLENCE } from "@/data/about";

// "How We Engineer" — philosophy, validation and quality topics, two-column
// on desktop (topics + visual), single column mobile.
export default function ExcellenceSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={ENGINEERING_EXCELLENCE.eyebrow}
          title={ENGINEERING_EXCELLENCE.title}
          align="left"
        />
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-8 lg:col-span-7">
            {ENGINEERING_EXCELLENCE.topics.map((topic) => (
              <div key={topic.title}>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {topic.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {topic.body}
                </p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-24 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-card-border bg-gradient-to-br from-[hsl(var(--brand-green-700))] to-[hsl(var(--brand-green-900))]">
              <img
                src="/images/home/manufacturing-testing.webp"
                alt="Engineering validation and testing at OCS OORJA"
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
