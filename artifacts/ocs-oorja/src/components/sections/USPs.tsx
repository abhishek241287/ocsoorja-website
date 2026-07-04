import { ShieldCheck, BatteryCharging, BadgeCheck, Headphones } from "lucide-react";
import { Container } from "@/components/layout/Container";
import TiltedCard from "@/components/ui/TiltedCard";

const items = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    desc: "LFP chemistry options, robust BMS and thermal protections",
  },
  {
    icon: BatteryCharging,
    title: "High Performance",
    desc: "Fast charge capability and long cycle life",
  },
  { icon: BadgeCheck, title: "Certified", desc: "UN 38.3, IEC 62133, BIS and ISO systems" },
  { icon: Headphones, title: "Support", desc: "Engineering, installation and after‑sales" },
];

export default function USPs() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <TiltedCard
              key={it.title}
              rotateAmplitude={10}
              scaleOnHover={1.03}
              showMobileWarning={false}
              showTooltip={false}
              containerHeight="100%"
              containerWidth="100%"
              contentClassName="rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm"
            >
              <it.icon className="h-6 w-6 text-emerald-500" />
              <h3 className="mt-4 text-base font-semibold">{it.title}</h3>
              <p className="mt-1 text-sm text-foreground/70">{it.desc}</p>
            </TiltedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
