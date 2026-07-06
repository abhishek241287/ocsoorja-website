import { Check } from "lucide-react";
import { HERO_ECOSYSTEM } from "@/data/home";

type EcosystemNode = (typeof HERO_ECOSYSTEM.nodes)[number];

// One tile: a large image on a clean white background. Product renders use
// object-contain so the whole unit is visible and never cropped; full-bleed
// scene photos (fit: "cover") fill the tile. Every image is loaded directly
// from public/images/home/ — see HERO_ECOSYSTEM in src/data/home.ts.
function Tile({ node }: { node: EcosystemNode }) {
  const isCover = node.fit === "cover";
  return (
    <div className="text-center">
      <div className="aspect-square w-full overflow-hidden rounded-2xl border border-card-border bg-white">
        <img
          src={node.image}
          alt={node.label}
          width={320}
          height={320}
          className={
            isCover
              ? "h-full w-full object-cover"
              : "h-full w-full object-contain p-2.5 sm:p-3"
          }
        />
      </div>
      <div className="mt-2.5 text-sm font-semibold leading-tight text-foreground">
        {node.label}
      </div>
      <div className="mt-0.5 text-xs leading-snug text-muted-foreground">
        {node.note}
      </div>
    </div>
  );
}

// The hero's single premium visual: a clean, engineered map of the complete
// OCS OORJA energy ecosystem built from real product photography. Four large
// renders — Solar, Inverter, Battery, EV — read as the full ecosystem at a
// glance. No tiny thumbnails, no outline icons.
export default function HeroEcosystem() {
  return (
    <div className="rounded-3xl border border-card-border bg-card p-5 shadow-lg sm:p-6">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-strong">
        {HERO_ECOSYSTEM.eyebrow}
      </div>
      <h2 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
        {HERO_ECOSYSTEM.title}
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
        {HERO_ECOSYSTEM.nodes.map((node) => (
          <Tile key={node.label} node={node} />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 border-t border-card-border pt-3.5">
        <Check
          className="h-4 w-4 shrink-0 text-primary-strong"
          strokeWidth={2.5}
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-foreground">
          {HERO_ECOSYSTEM.badge}
        </span>
      </div>
    </div>
  );
}
