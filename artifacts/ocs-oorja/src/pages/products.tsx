import { useState, useCallback, useMemo, useRef, useLayoutEffect } from "react";
import { Link, useSearch } from "wouter";
import { Search } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SITE as siteConfig } from "@/data/site";
import {
  products,
  productsSortedByDateDesc,
  getProductsGroupedByFamily,
  FAMILIES,
  type Product,
} from "@/data/products";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import ProductSearch from "@/components/products/ProductSearch";
import { HEADLINES, CTAS } from "@/data/brand";
import {
  getItemListSchema,
  getBreadcrumbSchema,
  renderJsonLd,
} from "@/lib/seo";

const SITE = siteConfig.url;

export default function Products() {
  const sortedProducts = useMemo(() => productsSortedByDateDesc(products), []);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sortedProducts);

  const handleFilteredProducts = useCallback((filtered: Product[]) => {
    setFilteredProducts(filtered);
  }, []);

  // Anchor for the results region so selecting a family can smooth-scroll to it.
  const resultsRef = useRef<HTMLDivElement>(null);

  // On family/category selection, bring the results into view just below the
  // sticky header — measured at runtime so the offset always matches the header.
  const scrollToResults = useCallback(() => {
    requestAnimationFrame(() => {
      const el = resultsRef.current;
      if (!el) return;
      const header = document.querySelector("header");
      const offset = (header?.offsetHeight ?? 0) + 16;
      const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
      window.scrollTo({ top, behavior: "smooth" });
    });
  }, []);

  // Header → Products dropdown deep-links here as `/products?family=<id>`. On the
  // first arrival at that entry, jump the chosen family's section to just below
  // the sticky header. This runs in useLayoutEffect (pre-paint) and AFTER
  // ScrollRestoration's own layout effect — it is mounted as our left sibling in
  // App, so its layout effect fires first, resetting a fresh entry to the top
  // before we position it (no flash, no smooth-animation timing races). The entry
  // is marked handled in history.state so returning via Back skips this and lets
  // ScrollRestoration restore the exact prior scroll position instead.
  const search = useSearch();
  useLayoutEffect(() => {
    const familyId = new URLSearchParams(search).get("family");
    if (!familyId || !FAMILIES.some((f) => f.id === familyId)) return;
    const state = (window.history.state ?? null) as Record<string, unknown> | null;
    if (state?.__familyScrolled) return;
    window.history.replaceState({ ...(state ?? {}), __familyScrolled: true }, "");
    const el = document.getElementById(`family-${familyId}`);
    if (!el) return;
    const header = document.querySelector("header");
    const offset = (header?.offsetHeight ?? 0) + 16;
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
    window.scrollTo(0, top);
  }, [search]);

  // Group the (filtered) catalogue by family in display order. Family section
  // headers only appear when more than one family is on screen; a single group
  // renders as a clean flat grid (no redundant heading).
  const groups = useMemo(() => getProductsGroupedByFamily(filteredProducts), [filteredProducts]);
  const showGroupHeaders = groups.length > 1;

  // Structured data for the catalogue (full product list, not the filtered view).
  const itemListSchema = useMemo(
    () =>
      getItemListSchema(
        sortedProducts.map((p) => ({ name: p.name, url: `${SITE}/products/${p.slug}` })),
      ),
    [sortedProducts],
  );
  const breadcrumbSchema = useMemo(
    () =>
      getBreadcrumbSchema([
        { name: "Home", url: `${SITE}/` },
        { name: "Products", url: `${SITE}/products` },
      ]),
    [],
  );

  return (
    <div className="py-12 md:py-16">
      <Seo
        title={HEADLINES.products.metaTitle}
        description={HEADLINES.products.metaDescription}
        canonical={`${SITE}/products`}
      />
      <Container>
        <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(itemListSchema)} />

        {/* Header */}
        <div className="mb-10">
          <SectionHeading
            eyebrow={HEADLINES.products.pageEyebrow}
            title={HEADLINES.products.pageTitle}
            subtitle={HEADLINES.products.pageSubtitle}
            align="left"
          />
        </div>

        <ProductSearch
          products={sortedProducts}
          onFilteredProducts={handleFilteredProducts}
          onCategoryChange={scrollToResults}
        />

        <div ref={resultsRef} aria-hidden="true" />

        {filteredProducts.length > 0 ? (
          <div className="mt-10 space-y-14">
            {groups.map((group) => (
              <section
                key={group.family.id}
                aria-labelledby={showGroupHeaders ? `family-${group.family.id}` : undefined}
              >
                {showGroupHeaders && (
                  <div className="mb-6 border-l-2 border-primary/60 pl-4">
                    <h2
                      id={`family-${group.family.id}`}
                      className="text-lg font-semibold tracking-tight text-foreground"
                    >
                      {group.family.label}
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                      {group.family.description}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.products.map((p) => (
                    <ProductCard key={p.id} product={p} specsLimit={4} tagsLimit={3} showTags className="h-full" />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-border bg-card py-16 text-center">
            <div className="mb-4 rounded-full bg-secondary p-6">
              <Search className="h-10 w-10 text-primary-strong" aria-hidden="true" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">No products found</h3>
            <p className="max-w-md text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}

        {/* Lead generation */}
        <section className="mt-16 rounded-3xl border border-border bg-secondary/60 px-6 py-10 sm:px-10 sm:py-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {HEADLINES.cta.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">{HEADLINES.cta.body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={CTAS.requestQuote.href}>{CTAS.requestQuote.label}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={CTAS.contactUs.href}>{CTAS.contactUs.label}</Link>
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
