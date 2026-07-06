import {
  SunMedium,
  Cpu,
  BatteryCharging,
  PlugZap,
  Factory,
  type LucideIcon,
} from "lucide-react";
import { HERO_ECOSYSTEM } from "@/data/home";

// Resolve an icon NAME (stored in data) to a lucide component here in the UI
// layer. Components are never stored in the data files.
const iconByName: Record<string, LucideIcon> = {
  SunMedium,
  Cpu,
  BatteryCharging,
  PlugZap,
};

// The hero's single premium visual: a clean, engineered map of the complete
// OCS OORJA energy ecosystem. Pure iconography — no stock or placeholder photos.
export default function HeroEcosystem() {
  return (
    <div className="relative rounded-3xl border border-card-border bg-card p-6 shadow-2xl sm:p-8">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-strong">
        {HERO_ECOSYSTEM.eyebrow}
      </div>
      <h2 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
        {HERO_ECOSYSTEM.title}
      </h2>

      <ol className="relative mt-7 space-y-5">
        {/* Vertical connector line linking the ecosystem stages */}
        <span
          className="absolute left-6 top-6 bottom-6 w-px bg-border"
          aria-hidden="true"
        />
        {HERO_ECOSYSTEM.nodes.map((node) => {
          const Icon = iconByName[node.icon] ?? SunMedium;
          return (
            <li key={node.label} className="relative flex items-start gap-4">
              <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-card-border bg-primary/5">
                <Icon className="h-6 w-6 text-primary-strong" aria-hidden="true" />
              </div>
              <div className="pt-1">
                <div className="text-sm font-semibold text-foreground">
                  {node.label}
                </div>
                <div className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  {node.note}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-7 flex items-center gap-3 rounded-xl border border-card-border bg-primary/5 px-4 py-3">
        <Factory className="h-5 w-5 flex-shrink-0 text-primary-strong" aria-hidden="true" />
        <span className="text-sm font-medium text-foreground">
          {HERO_ECOSYSTEM.badge}
        </span>
      </div>
    </div>
  );
}
