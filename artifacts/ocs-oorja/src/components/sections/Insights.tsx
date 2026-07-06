import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_SECTIONS } from "@/data/home";
import { insights } from "@/data/insights";

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Insights() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={HOME_SECTIONS.insights.eyebrow}
          title={HOME_SECTIONS.insights.title}
          subtitle={HOME_SECTIONS.insights.subtitle}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {insights.map((insight) => (
            <Dialog.Root key={insight.id}>
              <article className="group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={insight.image}
                    alt={insight.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
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
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {insight.excerpt}
                  </p>
                  <Dialog.Trigger className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary-strong transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card">
                    Read More
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Dialog.Trigger>
                </div>
              </article>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[88vh] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-card-border bg-card shadow-2xl focus:outline-none">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl">
                    <img
                      src={insight.image}
                      alt={insight.title}
                      className="h-full w-full object-cover"
                    />
                    <Dialog.Close
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      aria-label="Close article"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </Dialog.Close>
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                      <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold uppercase tracking-wider text-primary-strong">
                        {insight.category}
                      </span>
                      <span className="text-muted-foreground">
                        {formatDate(insight.date)}
                        {insight.readingTime ? ` · ${insight.readingTime}` : ""}
                      </span>
                    </div>
                    <Dialog.Title className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                      {insight.title}
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {insight.excerpt}
                    </Dialog.Description>
                    <div className="mt-6 border-t border-border pt-6">
                      {insight.body.map((sectionBlock, i) => (
                        <div key={i} className={i === 0 ? "" : "mt-6"}>
                          {sectionBlock.heading ? (
                            <h4 className="text-lg font-semibold tracking-tight text-foreground">
                              {sectionBlock.heading}
                            </h4>
                          ) : null}
                          {sectionBlock.paragraphs.map((paragraph, j) => (
                            <p
                              key={j}
                              className="mt-2 text-sm leading-relaxed text-muted-foreground"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                    {insight.author ? (
                      <p className="mt-8 text-xs uppercase tracking-wider text-muted-foreground">
                        By {insight.author}
                      </p>
                    ) : null}
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          ))}
        </div>
      </Container>
    </section>
  );
}
