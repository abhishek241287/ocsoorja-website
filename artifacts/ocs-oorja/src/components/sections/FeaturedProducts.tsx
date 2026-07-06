import { Link } from "wouter";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import { getProductBySlug, type Product } from "@/data/products";
import { CTAS } from "@/data/brand";
import { HOME_SECTIONS, FEATURED_PRODUCT_SLUGS } from "@/data/home";

// Resolve the curated slugs to real products from the catalogue. If a slug is
// renamed/removed, warn loudly in development instead of silently dropping a card.
function useFeaturedProducts(): Product[] {
  const resolved: Product[] = [];
  for (const slug of FEATURED_PRODUCT_SLUGS) {
    const product = getProductBySlug(slug);
    if (product) {
      resolved.push(product);
    } else if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        `[FeaturedProducts] No product found for slug "${slug}" — update src/data/home.ts`,
      );
    }
  }
  return resolved;
}

export default function FeaturedProducts() {
  const products = useFeaturedProducts();

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={HOME_SECTIONS.featured.eyebrow}
          title={HOME_SECTIONS.featured.title}
          subtitle={HOME_SECTIONS.featured.subtitle}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} ctaLabel="View details" />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg">
            <Link href={CTAS.exploreProducts.href}>
              {HOME_SECTIONS.featured.ctaLabel}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
