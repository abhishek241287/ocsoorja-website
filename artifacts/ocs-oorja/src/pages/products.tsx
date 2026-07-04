import { useState, useCallback, useMemo } from "react";
import { Seo } from "@/components/Seo";
import { products, productsSortedByDateDesc, type Product } from "@/data/products";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import TiltedCard from "@/components/ui/TiltedCard";
import ProductCard from "@/components/ui/ProductCard";
import ProductSearch from "@/components/products/ProductSearch";

export default function Products() {
  const sortedProducts = useMemo(() => productsSortedByDateDesc(products), []);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sortedProducts);

  const handleFilteredProducts = useCallback((filtered: Product[]) => {
    setFilteredProducts(filtered);
  }, []);

  return (
    <div className="py-12 md:py-16">
      <Seo
        title="Products"
        description="Explore our range of LiFePO₄ batteries, hybrid inverters, and EV chargers."
      />
      <Container>
        <div className="mb-8">
          <SectionHeading title="Products" subtitle="Standard SKUs ready for deployment" align="left" />
        </div>

        <ProductSearch products={sortedProducts} onFilteredProducts={handleFilteredProducts} />

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {filteredProducts.map((p) => (
              <TiltedCard
                key={p.id}
                rotateAmplitude={8}
                scaleOnHover={1.03}
                showMobileWarning={false}
                showTooltip={false}
                containerHeight="100%"
                containerWidth="100%"
                contentClassName="h-full"
              >
                <ProductCard product={p} specsLimit={4} tagsLimit={3} showTags className="h-full" />
              </TiltedCard>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-6 mb-4">
              <svg
                className="h-16 w-16 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
