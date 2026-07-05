import { useState, useEffect, useMemo } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Product, ProductFamily, FAMILIES } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductSearchProps {
  products: Product[];
  onFilteredProducts: (products: Product[]) => void;
}

export default function ProductSearch({ products, onFilteredProducts }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductFamily | "all">("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Unique tags scoped to the current category (drives the tag filter panel).
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    const scoped =
      selectedCategory === "all" ? products : products.filter((p) => p.family === selectedCategory);
    scoped.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [products, selectedCategory]);

  // Debounce the search query.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter by category, then search query, then tags.
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.family === selectedCategory);
    }

    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.specs.some((s) => s.key.toLowerCase().includes(q) || s.value.toLowerCase().includes(q)) ||
          (p.features?.some((f) => f.toLowerCase().includes(q)) ?? false) ||
          (p.applications?.some((a) => a.toLowerCase().includes(q)) ?? false),
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((p) => selectedTags.every((t) => p.tags.includes(t)));
    }

    return filtered;
  }, [products, debouncedQuery, selectedTags, selectedCategory]);

  // Push results up to the page (direct effect avoids a render loop).
  useEffect(() => {
    onFilteredProducts(filteredProducts);
  }, [filteredProducts, onFilteredProducts]);

  const handleTagToggle = (tag: string) =>
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };
  const clearFilters = () => setSelectedTags([]);
  const clearAll = () => {
    clearSearch();
    clearFilters();
    setSelectedCategory("all");
  };
  // Category tags are category-specific, so reset them when the category changes.
  const handleCategoryChange = (category: ProductFamily | "all") => {
    setSelectedCategory(category);
    setSelectedTags([]);
  };

  const pill = (active: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-medium transition-colors border",
      active
        ? "border-primary bg-primary text-primary-foreground shadow-sm"
        : "border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground",
    );

  return (
    <div className="space-y-5">
      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button type="button" onClick={() => handleCategoryChange("all")} className={pill(selectedCategory === "all")}>
          All Products
        </button>
        {FAMILIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => handleCategoryChange(c.id)}
            className={pill(selectedCategory === c.id)}
          >
            {c.shortLabel}
          </button>
        ))}
      </div>

      {/* Search + filter toggle */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name, specs, tags, features…"
            aria-label="Search products"
            className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-11 text-sm text-foreground placeholder:text-muted-foreground shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium shadow-sm transition-colors",
            showFilters || selectedTags.length > 0
              ? "border-primary bg-secondary text-primary-strong"
              : "border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground",
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {selectedTags.length > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">
              {selectedTags.length}
            </span>
          )}
        </button>
      </div>

      {/* Tag filter panel */}
      {showFilters && (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Filter by tags</h3>
            {selectedTags.length > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-medium text-primary-strong hover:underline"
              >
                Clear tags
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Results summary */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length === products.length && selectedCategory === "all" ? (
            <>
              Showing all <span className="font-semibold text-foreground">{products.length}</span> products
            </>
          ) : (
            <>
              Found <span className="font-semibold text-foreground">{filteredProducts.length}</span> of{" "}
              <span className="font-medium text-foreground">{products.length}</span> products
              {selectedCategory !== "all" && (
                <span className="ml-1">in {FAMILIES.find((c) => c.id === selectedCategory)?.shortLabel}</span>
              )}
            </>
          )}
        </p>
        {(searchQuery || selectedTags.length > 0 || selectedCategory !== "all") && (
          <button
            type="button"
            onClick={clearAll}
            className="shrink-0 text-sm font-medium text-primary-strong hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
