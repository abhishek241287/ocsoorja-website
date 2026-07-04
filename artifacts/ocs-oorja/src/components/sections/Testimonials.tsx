

import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialsColumn, type TestimonialItem } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";

export default function Testimonials() {
  // Map existing testimonials to gender-aware avatar metadata
  const base: TestimonialItem[] = testimonials.map((t) => ({
    text: t.quote,
    name: t.author,
    role: `${t.role} • ${t.company}`,
    gender: t.gender,
  }));

  // Add a few more items to create 9 entries total for 3 columns
  const extras: TestimonialItem[] = [
    {
      text:
        "Implementation was smooth and the team was responsive. We saw measurable efficiency gains in weeks.",
      name: "Ananya Gupta",
      role: "Program Manager • GridWorks",
      gender: "female",
    },
    {
      text:
        "Excellent cycle life and thermal performance. Documentation made compliance straightforward.",
      name: "Rahul Mehta",
      role: "Head of QA • ElectroFab",
      gender: "male",
    },
    {
      text:
        "Great support during our pilot. The packs integrated cleanly with our existing BMS tooling.",
      name: "Neha Sharma",
      role: "Engineering Lead • SwiftEV",
      gender: "female",
    },
    {
      text:
        "Their ESS deployment helped us ride out peak demand reliably—fantastic stability under load.",
      name: "Vikram Singh",
      role: "OPS Director • UrbanGrid",
      gender: "male",
    },
    {
      text:
        "We appreciated the fast iterations and willingness to co-design interfaces to our needs.",
      name: "Priya Nair",
      role: "Product Manager • RoboWorks",
      gender: "female",
    },
    {
      text:
        "From sampling to ramp, the experience was top-notch. Highly recommended team and tech.",
      name: "Arjun Desai",
      role: "Founder • VoltEdge Labs",
      gender: "male",
    },
  ];

  const all: TestimonialItem[] = [...base, ...extras].slice(0, 9);
  const firstColumn = all.slice(0, 3);
  const secondColumn = all.slice(3, 6);
  const thirdColumn = all.slice(6, 9);

  return (
    <section className="py-12 md:py-16 bg-background relative">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <SectionHeading
            eyebrow="Testimonials"
            title="What our users say"
            subtitle="See what our customers have to say about us."
          />
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </Container>
    </section>
  );
}

