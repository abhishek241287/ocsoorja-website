import { getProductBySlug } from "@/data/products";
import { HERO_ECOSYSTEM } from "@/data/home";

// The hero's single premium visual: a clean, engineered map of the complete
// OCS OORJA energy ecosystem, built from real product photography (resolved
// from the catalogue) plus one solar generation image. No outline icons.
export default function HeroEcosystem() {
  return (
    <div className="relative rounded-3xl border border-card-border bg-card p-6 shadow-2xl sm:p-8">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-strong">
        {HERO_ECOSYSTEM.eyebrow}
      </div>
      <h2 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
        {HERO_ECOSYSTEM.title}
      </h2>

      <ol className="relative mt-7 space-y-4">
        {/* Vertical connector line linking the ecosystem stages */}
        <span
          className="absolute left-7 top-7 bottom-7 w-px bg-border"
          aria-hidden="true"
        />
        {HERO_ECOSYSTEM.nodes.map((node) => {
          const image = node.productSlug
            ? getProductBySlug(node.productSlug)?.image ?? node.image
            : node.image;
          return (
            <li key={node.label} className="relative flex items-center gap-4">
              <div className="relative z-10 h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-card-border bg-background">
                {image ? (
                  <img
                    src={image}
                    alt={node.label}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {node.label}
                </div>
                <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {node.note}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {HERO_ECOSYSTEM.applications.map((app) => (
          <span
            key={app}
            className="rounded-full border border-card-border bg-primary/5 px-3 py-1 text-xs font-medium text-foreground"
          >
            {app}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-card-border bg-primary/5 px-4 py-3">
        <span
          className="h-2 w-2 flex-shrink-0 rounded-full bg-primary"
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-foreground">
          {HERO_ECOSYSTEM.badge}
        </span>
      </div>
    </div>
  );
}
