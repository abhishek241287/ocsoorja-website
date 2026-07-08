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
//
// `HelpCTA` is the one exception: it is the standard educational footer
// shown at the END of every article (not conditional on a data field). Its
// heading topic comes from the OPTIONAL `ctaTopic` frontmatter field.
// =============================================================================
import type { ReactNode } from "react";
import { Link } from "wouter";
import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CTAS, CONTACT } from "@/data/brand";

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

const DEFAULT_CTA_TOPIC = "the right system for your needs";

/**
 * Standard educational footer shown at the end of every article — NOT
 * conditional on a data field like the other extras above. `topic`
 * (optional `ctaTopic` frontmatter) completes the heading; everything else
 * (wording, links, phone number) is sourced from data/brand.ts.
 */
export function HelpCTA({ topic }: { topic?: string }) {
  const whatsappHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello OCS OORJA, I read one of your blog articles and would like help choosing the right product for my needs.",
  )}`;
  const checklist = [
    { label: CTAS.freeConsultation.label, href: CTAS.freeConsultation.href },
    { label: "WhatsApp OCS OORJA", href: whatsappHref },
    { label: CTAS.requestQuote.label, href: CTAS.requestQuote.href },
  ];

  return (
    <section className="mt-16 rounded-3xl border border-border bg-secondary/60 px-6 py-10 sm:px-10 sm:py-12">
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        Need help choosing {topic ?? DEFAULT_CTA_TOPIC}?
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Every home and business has different energy requirements. The right
        choice depends on your electricity consumption, backup needs, and
        future expansion plans — our engineers are happy to help you think it
        through, no pressure.
      </p>
      <ul className="mt-6 flex flex-col flex-wrap gap-x-8 gap-y-3 sm:flex-row">
        {checklist.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary-strong"
            >
              <Check
                className="h-4 w-4 flex-shrink-0 text-primary-strong"
                aria-hidden="true"
              />
              <span className="group-hover:underline">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-7">
        <Button asChild size="lg">
          <Link href={CTAS.requestQuote.href}>{CTAS.requestQuote.label}</Link>
        </Button>
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
