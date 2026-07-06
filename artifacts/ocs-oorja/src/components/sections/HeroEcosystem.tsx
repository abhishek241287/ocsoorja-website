import type { ReactNode } from "react";
import { ArrowRight, ArrowLeft, ArrowDown, Check } from "lucide-react";
import { getProductBySlug } from "@/data/products";
import { HERO_ECOSYSTEM } from "@/data/home";

type EcosystemNode = (typeof HERO_ECOSYSTEM.nodes)[number];

// Resolve a node's image from the product catalogue (single source) with a fallback.
function nodeImage(node: EcosystemNode): string | undefined {
  return node.productSlug
    ? getProductBySlug(node.productSlug)?.image ?? node.image
    : node.image;
}

function Tile({ node }: { node: EcosystemNode }) {
  const image = nodeImage(node);
  return (
    <div className="flex-1 text-center">
      <div className="mx-auto h-20 w-20 overflow-hidden rounded-2xl border border-card-border bg-background">
        {image ? (
          <img
            src={image}
            alt={node.label}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="mt-2 text-sm font-semibold leading-tight text-foreground">
        {node.label}
      </div>
      <div className="mt-0.5 text-xs leading-snug text-muted-foreground">
        {node.note}
      </div>
    </div>
  );
}

// Small, subtle flow arrow aligned to the vertical center of the 80px images.
function FlowArrow({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex w-6 shrink-0 justify-center pt-8 text-primary-strong/50"
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

// The hero's single premium visual: a clean, engineered map of the complete
// OCS OORJA energy ecosystem built from real product photography. The four
// stages read as an energy flow — Solar → Inverter ↓ Battery ← EV — so the
// full ecosystem is legible at a glance. No outline icons.
export default function HeroEcosystem() {
  const [solar, inverter, battery, ev] = HERO_ECOSYSTEM.nodes;
  return (
    <div className="rounded-3xl border border-card-border bg-card p-6 shadow-lg">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-strong">
        {HERO_ECOSYSTEM.eyebrow}
      </div>
      <h2 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
        {HERO_ECOSYSTEM.title}
      </h2>

      <div className="mt-5">
        {/* Top row: Solar → Inverter */}
        <div className="flex items-start">
          <Tile node={solar} />
          <FlowArrow>
            <ArrowRight className="h-4 w-4" />
          </FlowArrow>
          <Tile node={inverter} />
        </div>

        {/* Down connector, aligned under the right column */}
        <div className="flex py-1" aria-hidden="true">
          <div className="flex-1" />
          <div className="w-6 shrink-0" />
          <div className="flex flex-1 justify-center text-primary-strong/50">
            <ArrowDown className="h-4 w-4" />
          </div>
        </div>

        {/* Bottom row: EV ← Battery */}
        <div className="flex items-start">
          <Tile node={ev} />
          <FlowArrow>
            <ArrowLeft className="h-4 w-4" />
          </FlowArrow>
          <Tile node={battery} />
        </div>
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
