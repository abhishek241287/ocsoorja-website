

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
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/10 cursor-pointer",
        // Glass / translucent background with graceful fallback
        "bg-foreground/[0.02] dark:bg-foreground/[0.03] supports-[backdrop-filter]:bg-foreground/5 supports-[backdrop-filter]:backdrop-blur-md",
        // Subtle lift and shadow on hover, respect reduced motion
        "transition-all duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none hover:-translate-y-0.5 hover:shadow-xl",
        // Rings and subtle outline on hover
        "hover:ring-1 hover:ring-emerald-400/20",
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

      {/* Accent glow frame (hover) */}
      <div
        aria-hidden
        className={
          "pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          + " bg-[radial-gradient(120%_60%_at_0%_0%,rgba(16,185,129,0.12),transparent_60%),radial-gradient(120%_60%_at_100%_0%,rgba(6,182,212,0.12),transparent_60%)]"
        }
      />

      {/* Image */}
      <div className="relative h-44 sm:h-52">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
        {/* Soft gradient for better contrast over busy images (safe for SVGs too) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/10 dark:from-black/0 dark:via-black/0 dark:to-black/20" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 id={titleId} className="text-base sm:text-lg font-semibold tracking-tight text-foreground line-clamp-2 min-h-[44px] sm:min-h-[48px]">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm text-foreground/70 line-clamp-2 min-h-10">{product.summary}</p>

        {/* Specs */}
        {specs?.length ? (
          <ul className="mt-3 grid grid-cols-2 gap-2 text-xs text-foreground/80 sm:text-[13px] min-h-[64px]">
            {specs.map((s) => (
              <li
                key={s.key}
                className={
                  "rounded-md border border-foreground/10 [background:linear-gradient(to_bottom_right,rgba(255,255,255,0.06),rgba(255,255,255,0)_60%)]"
                  + " dark:[background:linear-gradient(to_bottom_right,rgba(255,255,255,0.04),rgba(255,255,255,0)_60%)] px-2 py-1 truncate"
                }
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
                className={
                  "text-[11px] leading-5 rounded-full border border-foreground/10 px-2 py-0.5 text-foreground/70"
                  + " bg-foreground/[0.03] dark:bg-foreground/[0.06]"
                }
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
