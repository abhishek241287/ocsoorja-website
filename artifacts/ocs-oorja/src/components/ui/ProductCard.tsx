import { Link } from "wouter";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/Button";

export type ProductCardProps = {
  product: Product;
  href?: string;
  specsLimit?: number; // number of specs to show (undefined => all)
  showTags?: boolean;
  tagsLimit?: number; // cap to reduce height variance
  className?: string;
  ctaLabel?: string;
};

export default function ProductCard({
  product,
  href = `/products/${product.slug}`,
  specsLimit = 4,
  showTags = true,
  tagsLimit = 3,
  className,
  ctaLabel = "View details",
}: ProductCardProps) {
  const specs = typeof specsLimit === "number" ? product.specs.slice(0, specsLimit) : product.specs;

  const titleId = `product-${product.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-card cursor-pointer",
        // Restrained lift + shadow on hover; respect reduced motion
        "transition-all duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none hover:-translate-y-0.5 hover:shadow-lg",
        // Brand-token hover accent (no glassmorphism / glow)
        "hover:border-primary/40 hover:ring-1 hover:ring-primary/20",
        // Enforce near-uniform height across cards
        "min-h-[420px] sm:min-h-[460px]",
        className,
      )}
    >
      {/* Invisible stretched link overlay for reliable clicks (same href as CTA). */}
      {/* aria-hidden and tabIndex=-1 to avoid duplicate focus/announcements. */}
      <Link
        aria-hidden="true"
        tabIndex={-1}
        href={href}
        className="absolute inset-0 z-[1]"
      />

      {/* Image */}
      <div className="relative h-44 sm:h-52 bg-secondary">
        {product.status === "placeholder" && (
          <span className="absolute left-2 top-2 z-[2] rounded-full border border-foreground/15 bg-background/90 px-2 py-0.5 text-[11px] font-medium text-foreground/70">
            Coming soon
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 id={titleId} className="text-base sm:text-lg font-semibold tracking-tight text-foreground line-clamp-2 min-h-[44px] sm:min-h-[48px]">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 min-h-10">{product.summary}</p>

        {/* Specs */}
        {specs?.length ? (
          <ul className="mt-3 grid grid-cols-2 gap-2 text-xs text-foreground/80 sm:text-[13px] min-h-[64px]">
            {specs.map((s) => (
              <li
                key={s.key}
                className="rounded-md border border-border bg-secondary/50 px-2 py-1 truncate"
              >
                <span className="font-medium text-foreground">{s.key}</span>: {s.value}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-3 min-h-[64px]" aria-hidden="true" />
        )}

        {/* Tags */}
        {showTags && product.tags?.length ? (
          <div className="mt-3 h-7 flex flex-nowrap gap-2 overflow-hidden">
            {product.tags.slice(0, tagsLimit).map((t) => (
              <span
                key={t}
                className="text-[11px] leading-5 rounded-full border border-border px-2 py-0.5 text-muted-foreground bg-secondary/60"
              >
                {t}
              </span>
            ))}
          </div>
        ) : (
          // Reserve space so cards without tags don't get shorter
          <div className="mt-3 h-7" aria-hidden="true" />
        )}

        {/* CTA */}
        <div className="pt-1 mt-auto relative z-[2]">
          <Button asChild size="sm" variant="outline" className="group/btn">
            <Link href={href} aria-label={`${product.name} – ${ctaLabel}`}>
              {ctaLabel}
              <svg
                className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
