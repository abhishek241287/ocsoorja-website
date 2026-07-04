import { Link } from "wouter";
import { products, PRODUCT_CATEGORIES, getProductsByCategory, productsSortedByDateDesc } from "@/data/products";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InfiniteProductCards } from "@/components/ui/InfiniteProductCards";
import { Button } from "@/components/ui/Button";
import { Zap, Sun, Home, BatteryCharging } from "lucide-react";

// Icon mapping for categories
const categoryIcons = {
  ev: Zap,
  solar: Sun,
  "home-inverter": Home,
  charger: BatteryCharging,
};

export default function ProductsGrid() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading
          eyebrow="Products"
          title="Proven battery packs and cells"
          subtitle="Standard SKUs for quick deployment and a strong base for customization"
        />

        {/* Category-wise product carousels */}
        <div className="mt-8 space-y-12">
          {PRODUCT_CATEGORIES.map((category) => {
            const categoryProducts = productsSortedByDateDesc(getProductsByCategory(category.id, products));
            if (categoryProducts.length === 0) return null;

            const IconComponent = categoryIcons[category.id];

            return (
              <div key={category.id} className="space-y-4">
                {/* Category Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-white shadow-sm dark:border-foreground/20 dark:bg-transparent">
                      <IconComponent className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {category.label}
                      </h3>
                      <p className="text-sm text-foreground/60">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <span className="ml-13 sm:ml-auto w-fit rounded-full bg-foreground/10 px-3 py-1 text-sm font-medium text-foreground/80">
                    {categoryProducts.length} {categoryProducts.length === 1 ? "product" : "products"}
                  </span>
                </div>

                {/* Category Products Carousel */}
                <InfiniteProductCards
                  products={categoryProducts}
                  direction={category.id === "solar" || category.id === "charger" ? "right" : "left"}
                  speed="slow"
                  pauseOnHover
                />
              </div>
            );
          })}
        </div>

        {/* See all products CTA */}
        <div className="mt-12 flex justify-center">
          <Button asChild size="lg">
            <Link href="/products">See all products</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

