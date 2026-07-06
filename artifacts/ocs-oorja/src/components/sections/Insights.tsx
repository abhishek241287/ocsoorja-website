import { Link } from "wouter";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_SECTIONS } from "@/data/home";
import { insights, type Insight } from "@/data/insights";

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function InsightCardBody({ insight }: { insight: Insight }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold uppercase tracking-wider text-primary-strong">
          {insight.category}
        </span>
        <span className="text-muted-foreground">
          {formatDate(insight.date)}
          {insight.readingTime ? ` · ${insight.readingTime}` : ""}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
        {insight.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {insight.excerpt}
      </p>
    </>
  );
}

export default function Insights() {
  return (
    <section className="border-y border-border bg-foreground/[0.02] py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={HOME_SECTIONS.insights.eyebrow}
          title={HOME_SECTIONS.insights.title}
          subtitle={HOME_SECTIONS.insights.subtitle}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {insights.map((insight) =>
            insight.href ? (
              <Link
                key={insight.id}
                href={insight.href}
                className="group flex flex-col rounded-2xl border border-card-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <InsightCardBody insight={insight} />
              </Link>
            ) : (
              <article
                key={insight.id}
                className="flex flex-col rounded-2xl border border-card-border bg-card p-6 shadow-sm"
              >
                <InsightCardBody insight={insight} />
              </article>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}
