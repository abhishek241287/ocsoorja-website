import { Seo } from "@/components/Seo";
import { SITE } from "@/data/site";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2, Leaf, ShieldCheck, Cpu, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { BRAND, HEADLINES, CTAS } from "@/data/brand";

export default function AboutPage() {
  return (
    <div className="py-12 md:py-16">
      <Seo
        title="About OCS OORJA"
        description={`${BRAND.positioning} Learn about our engineering expertise, capabilities, and commitment to safe, reliable clean-energy systems.`}
        canonical={`${SITE.url}/about`}
      />
      <Container>
        <SectionHeading
          title={HEADLINES.about.title}
          subtitle={HEADLINES.about.subtitle}
          align="left"
        />

        {/* Intro card */}
        <div className="mt-8 rounded-2xl border border-foreground/10 bg-foreground/[0.02] supports-[backdrop-filter]:bg-foreground/5 supports-[backdrop-filter]:backdrop-blur-md p-6 sm:p-8">
          <p className="text-base leading-7 text-foreground/80">
            <strong>{BRAND.positioningLead}</strong>
            {" "}{BRAND.positioningBody}
          </p>
        </div>

        {/* Values */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ValueCard icon={<ShieldCheck className="h-5 w-5" />} title="Safety first" desc="Fail‑safe design, rigorous validation and reliable field performance." />
          <ValueCard icon={<Cpu className="h-5 w-5" />} title="Engineering depth" desc="From cell to system — BMS, thermal design and pack architecture." />
          <ValueCard icon={<Leaf className="h-5 w-5" />} title="Sustainable choices" desc="Long cycle life and chemistry selection for real‑world duty cycles." />
        </div>

        {/* Capabilities */}
        <div className="mt-10 rounded-2xl border border-foreground/10 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2"><Sparkles className="h-5 w-5" /> Capabilities</h3>
          <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-foreground/80 sm:grid-cols-2">
            {[
              "Application‑driven pack engineering and customization",
              "Quality systems and process discipline",
              "Rapid prototyping to scalable production",
              "Communication protocols: CAN / RS485",
              "Data‑driven diagnostics and service",
              "Thermal design for harsh environments",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-10 flex items-center justify-between rounded-2xl border border-foreground/10 p-6 sm:p-8">
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-foreground">Want to discuss a project?</h4>
            <p className="mt-1 text-sm text-foreground/70">Tell us your application and requirements — we’ll respond within one business day.</p>
          </div>
          <Link href={CTAS.contactUs.href} className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground hover:bg-foreground/10 transition-colors">
            {CTAS.contactUs.label} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] supports-[backdrop-filter]:bg-foreground/5 supports-[backdrop-filter]:backdrop-blur-md p-5">
      <div className="flex items-center gap-2 text-foreground">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-background/60">{icon}</span>
        <h4 className="text-base font-semibold">{title}</h4>
      </div>
      <p className="mt-2 text-sm text-foreground/70">{desc}</p>
    </div>
  );
}
