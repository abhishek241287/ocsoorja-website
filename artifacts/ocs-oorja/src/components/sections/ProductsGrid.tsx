import { Link } from "wouter";
import { products, FAMILIES, getProductsByFamily, productsSortedByDateDesc } from "@/data/products";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InfiniteProductCards } from "@/components/ui/InfiniteProductCards";
import { Button } from "@/components/ui/Button";
import { Zap, Sun, Home, BatteryCharging, Battery, type LucideIcon } from "lucide-react";

// Resolve a family's icon NAME (stored in data) to a lucide component here in the
// UI layer. Components are never stored in the data files.
const iconByName: Record<string, LucideIcon> = {
  Zap,
  Sun,
  Home,
  BatteryCharging,
  Battery,
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

        {/* Family-wise product carousels */}
        <div className="mt-8 space-y-12">
          {FAMILIES.map((family) => {
            const familyProducts = productsSortedByDateDesc(getProductsByFamily(family.id, products));
            if (familyProducts.length === 0) return null;

            const IconComponent = iconByName[family.icon] ?? BatteryCharging;

            return (
              <div key={family.id} className="space-y-4">
                {/* Family Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-white shadow-sm dark:border-foreground/20 dark:bg-transparent">
                      <IconComponent className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {family.label}
                      </h3>
                      <p className="text-sm text-foreground/60">
                        {family.description}
                      </p>
                    </div>
                  </div>
                  <span className="ml-13 sm:ml-auto w-fit rounded-full bg-foreground/10 px-3 py-1 text-sm font-medium text-foreground/80">
                    {familyProducts.length} {familyProducts.length === 1 ? "product" : "products"}
                  </span>
                </div>

                {/* Family Products Carousel */}
                <InfiniteProductCards
                  products={familyProducts}
                  direction={family.order % 2 === 0 ? "right" : "left"}
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
