// =============================================================================
// Optional article sections ("extras") for the blog detail page.
//
// Each section renders ONLY when the matching OPTIONAL field exists on the
// article in src/data/blog.ts — non-developers add or remove content there,
// never in this file:
//   summary          → <AtAGlance>
//   keyTakeaways     → <KeyTakeaways>
//   faqs             → <FAQSection> (the page also emits FAQ structured data)
//   relatedProducts  → <RelatedContent> (product links)
// `DirectAnswer` is provided for future editorial use (question + boxed
// answer) and is not wired to a data field yet.
// =============================================================================
import type { ReactNode } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";

/** Highlighted 2–3 sentence overview box shown near the top of an article. */
export function AtAGlance({ children }: { children: ReactNode }) {
  return (
    <aside className="mt-8 rounded-2xl border border-border bg-secondary/60 p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary-strong">
        At a glance
      </p>
      <div className="mt-2 text-base leading-relaxed text-foreground">
        {children}
      </div>
    </aside>
  );
}

/** A question heading with a visually boxed direct answer. */
export function DirectAnswer({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {question}
      </h2>
      <div className="mt-3 rounded-2xl border border-border bg-card p-5 leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

/** Bullet-point list of the article's key takeaways. */
export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <aside className="mt-10 rounded-2xl bg-primary/5 p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary-strong">
        Key takeaways
      </p>
      <ul className="mt-3 space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"
              aria-hidden="true"
            />
            <span className="leading-relaxed text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Expandable FAQ list (semantic details/summary). */
export function FAQSection({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  return (
    <section className="mt-10" aria-labelledby="article-faq-heading">
      <h2
        id="article-faq-heading"
        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
      >
        Frequently asked questions
      </h2>
      <div className="mt-4 space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-border bg-card"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 p-4 font-medium text-foreground [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown
                className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="border-t border-border p-4 leading-relaxed text-muted-foreground">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Curated list of internal links (e.g. related products). */
export function RelatedContent({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string; description?: string }>;
}) {
  return (
    <nav
      className="mt-10 rounded-2xl border border-border bg-secondary/60 p-6"
      aria-label={title}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <ul className="mt-3 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="group block">
              <span className="font-medium text-primary-strong group-hover:underline">
                {link.label}
              </span>
              {link.description && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {link.description}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
