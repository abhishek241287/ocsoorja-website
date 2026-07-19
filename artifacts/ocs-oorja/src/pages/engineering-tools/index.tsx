import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { Sun, Battery, Zap, Cable, TrendingUp, Car } from "lucide-react";

const CALCULATORS = [
  {
    id: "solar-sizing",
    title: "Solar Sizing Calculator",
    description:
      "Calculate the right solar capacity for your home or business based on electricity bill, tariff, and location.",
    icon: Sun,
    href: "/engineering-tools/solar-sizing",
  },
  {
    id: "battery-backup",
    title: "Battery Backup Calculator",
    description:
      "Size your battery bank for reliable backup power. Supports LiFePO₄ and lead-acid chemistry.",
    icon: Battery,
    href: "/engineering-tools/battery-backup",
  },
  {
    id: "inverter-sizing",
    title: "Inverter Sizing Calculator",
    description:
      "Select the right inverter capacity accounting for motor surge loads and future expansion.",
    icon: Zap,
    href: "/engineering-tools/inverter-sizing",
  },
  {
    id: "cable-sizing",
    title: "Cable Sizing Calculator",
    description:
      "Calculate the correct cable cross-section for copper or aluminium conductors based on voltage-drop limits.",
    icon: Cable,
    href: "/engineering-tools/cable-sizing",
  },
  {
    id: "roi-calculator",
    title: "Solar ROI Calculator",
    description:
      "Estimate payback period, 10-year savings, NPV, and ROI for a solar installation over its lifetime.",
    icon: TrendingUp,
    href: "/engineering-tools/roi-calculator",
  },
  {
    id: "ev-charging",
    title: "EV Charging Calculator",
    description:
      "Calculate charger capacity, charging time, range per hour, and daily running costs for electric vehicles.",
    icon: Car,
    href: "/engineering-tools/ev-charging",
  },
] as const;

export default function EngineeringToolsHub() {
  return (
    <>
      <Seo
        title="Engineering Tools — Solar, Battery, Inverter & EV Calculators"
        description="Free professional engineering calculators for solar sizing, battery backup, inverter sizing, cable sizing, ROI, and EV charging. Brand-independent reference tools."
        canonical="/engineering-tools"
      />

      <div className="container mx-auto px-4 py-14 sm:py-20">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-strong">
            Engineering Tools
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Professional Engineering Calculators
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Standard engineering reference tools for solar, storage, EV, and electrical system
            design. Brand-independent — results are based on your inputs and published engineering
            constants only.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CALCULATORS.map((calc) => (
            <Link
              key={calc.id}
              href={calc.href}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <calc.icon className="h-5 w-5 text-primary-strong" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary-strong">
                  {calc.title}
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{calc.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-border bg-muted/40 px-5 py-4 text-center text-xs text-muted-foreground">
          All calculators use standard engineering practices and configurable constants. Results are
          estimates and must be verified by a qualified engineer before installation.
        </div>
      </div>
    </>
  );
}
