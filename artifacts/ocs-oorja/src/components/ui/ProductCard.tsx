import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { getFamilyInfo, type Product } from "@/data/products";
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
  const family = getFamilyInfo(product.family);
  const isPlaceholder = product.status === "placeholder";
  const titleId = `product-${product.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-card cursor-pointer",
        // Restrained lift + shadow on hover; respect reduced motion
        "transition-all duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none hover:-translate-y-1 hover:shadow-lg",
        // Brand-token hover accent (no glassmorphism / glow)
        "hover:border-primary/40 hover:ring-1 hover:ring-primary/20",
        // Enforce near-uniform height across cards
        "min-h-[440px] sm:min-h-[480px]",
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

      {/* Image well — light neutral in both themes so photos with baked-in
          backgrounds read cleanly and never glare in dark mode. */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-card-border bg-neutral-50">
        {isPlaceholder && (
          <span className="absolute left-3 top-3 z-[2] inline-flex items-center rounded-full border border-black/10 bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600">
            Coming soon
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.04]"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {family && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-strong">
            {family.shortLabel}
          </span>
        )}
        <h3
          id={titleId}
          className="mt-1.5 text-base sm:text-lg font-semibold tracking-tight text-foreground line-clamp-2 min-h-[44px] sm:min-h-[48px]"
        >
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 min-h-10">{product.summary}</p>

        {/* Specs — spec-sheet style rows (label / value) avoid mid-word truncation */}
        {specs?.length ? (
          <dl className="mt-4 divide-y divide-border border-y border-border">
            {specs.map((s) => (
              <div key={s.key} className="flex items-baseline justify-between gap-4 py-1.5">
                <dt className="shrink-0 text-xs text-muted-foreground">{s.key}</dt>
                <dd className="min-w-0 truncate text-right text-[13px] font-medium text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className="mt-4" aria-hidden="true" />
        )}

        {/* Tags */}
        {showTags && product.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-1.5 overflow-hidden">
            {product.tags.slice(0, tagsLimit).map((t) => (
              <span
                key={t}
                className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {/* CTA */}
        <div className="pt-5 mt-auto relative z-[2]">
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
