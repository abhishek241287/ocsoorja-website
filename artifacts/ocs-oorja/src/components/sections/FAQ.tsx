

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/faqs";
import { BlurredStagger } from "@/components/ui/text-reveal-faqs";

export default function FAQ() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Answers to common questions" />
        {/* Card-style items with spacing; no inner dividers */}
        <Accordion type="single" collapsible className="mt-6 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="overflow-hidden rounded-xl bg-background shadow-sm ring-1 ring-black/5 transition hover:shadow-md dark:ring-white/10"
            >
              <AccordionTrigger className="px-5 py-4 text-left text-sm font-medium hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pt-0 text-sm text-foreground/75">
                <BlurredStagger text={f.a} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}

