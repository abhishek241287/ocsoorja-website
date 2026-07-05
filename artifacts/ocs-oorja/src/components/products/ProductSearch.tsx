

import { useState, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import { Search, X, Filter } from "lucide-react";
import { Product, ProductCategory, PRODUCT_CATEGORIES } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductSearchProps {
  products: Product[];
  onFilteredProducts: (products: Product[]) => void;
}

export default function ProductSearch({ products, onFilteredProducts }: ProductSearchProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const resolvedTheme = theme === "system" ? systemTheme ?? "light" : theme ?? "light";
  const isDarkMode = resolvedTheme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Prevent hydration mismatch with theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Extract all unique tags from products (filtered by category)
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    const categoryFilteredProducts = selectedCategory === "all" 
      ? products 
      : products.filter(p => p.category === selectedCategory);
    categoryFilteredProducts.forEach((product) => {
      product.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [products, selectedCategory]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter products based on category, search query, and selected tags
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply category filter first
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Apply search query filter
    if (debouncedQuery.trim()) {
      const query = debouncedQuery.toLowerCase();
      filtered = filtered.filter((product) => {
        // Search in name
        if (product.name.toLowerCase().includes(query)) return true;

        // Search in summary
        if (product.summary.toLowerCase().includes(query)) return true;

        // Search in tags
        if (product.tags.some((tag) => tag.toLowerCase().includes(query))) return true;

        // Search in specs
        if (
          product.specs.some(
            (spec) =>
              spec.key.toLowerCase().includes(query) ||
              spec.value.toLowerCase().includes(query)
          )
        )
          return true;

        // Search in features
        if (
          product.features?.some((feature) =>
            feature.toLowerCase().includes(query)
          )
        )
          return true;

        // Search in applications
        if (
          product.applications?.some((app) =>
            app.toLowerCase().includes(query)
          )
        )
          return true;

        return false;
      });
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter((product) =>
        selectedTags.every((selectedTag) => product.tags.includes(selectedTag))
      );
    }

    return filtered;
  }, [products, debouncedQuery, selectedTags, selectedCategory]);

  // Update parent component with filtered products whenever they change
  // Using direct call instead of useEffect to avoid infinite loop
  useEffect(() => {
    onFilteredProducts(filteredProducts);
  }, [filteredProducts, onFilteredProducts]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  const clearFilters = () => {
    setSelectedTags([]);
  };

  const clearAll = () => {
    clearSearch();
    clearFilters();
    setSelectedCategory("all");
  };

  // Handle category change - also clear tag filters since they're category-specific
  const handleCategoryChange = (category: ProductCategory | "all") => {
    setSelectedCategory(category);
    setSelectedTags([]); // Clear tag filters when switching categories
  };

  // Prevent hydration mismatch by waiting for client mount
  if (!mounted) {
    return null;
  }

  return (
    <div className="mb-8 space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={() => handleCategoryChange("all")}
          className={cn(
            "rounded-full px-5 py-2.5 text-sm font-semibold transition-all border-2",
            selectedCategory === "all"
              ? isDarkMode
                ? "border-primary bg-primary/15 text-primary-strong shadow-lg shadow-primary/20"
                : "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              : isDarkMode
                ? "border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 shadow-sm"
          )}
        >
          All Products
        </button>
        {PRODUCT_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-all border-2",
              selectedCategory === category.id
                ? isDarkMode
                  ? "border-primary bg-primary/15 text-primary-strong shadow-lg shadow-primary/20"
                  : "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : isDarkMode
                  ? "border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 shadow-sm"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search
            className={cn(
              "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2",
              isDarkMode ? "text-gray-500" : "text-gray-400"
            )}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name, specs, tags, features..."
            className={cn(
              "w-full rounded-2xl border py-3.5 pl-12 pr-12 text-sm outline-none transition-all focus:border-primary focus:ring-2",
              isDarkMode
                ? "border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus:ring-primary/40"
                : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-500 shadow-sm focus:ring-primary/25"
            )}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors",
                isDarkMode
                  ? "text-gray-500 hover:bg-gray-800 hover:text-gray-300"
                  : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              )}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 rounded-2xl border px-5 py-3.5 text-sm font-medium transition-all shadow-sm",
            isDarkMode
              ? "border-gray-700 bg-gray-900 text-gray-200 hover:bg-gray-800"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
            (showFilters || selectedTags.length > 0) &&
              (isDarkMode
                ? "border-primary bg-primary/10 text-primary-strong"
                : "border-primary bg-secondary text-primary-strong")
          )}
        >
          <Filter className="h-4 w-4" />
          Filters
          {selectedTags.length > 0 && (
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold text-primary-foreground",
                isDarkMode ? "bg-primary" : "bg-primary"
              )}
            >
              {selectedTags.length}
            </span>
          )}
        </button>
      </div>

      {/* Filter Tags */}
      {showFilters && (
        <div
          className={cn(
            "rounded-2xl border p-5",
            isDarkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white shadow-sm"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={cn("text-sm font-semibold", isDarkMode ? "text-white" : "text-gray-900")}>
              Filter by Tags
            </h3>
            {selectedTags.length > 0 && (
              <button
                onClick={clearFilters}
                className={cn(
                  "text-xs font-medium transition-colors",
                  isDarkMode
                    ? "text-primary-strong hover:text-primary-strong/80"
                    : "text-primary-strong hover:text-primary-strong/80"
                )}
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all border",
                  selectedTags.includes(tag)
                    ? isDarkMode
                      ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                    : isDarkMode
                      ? "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-600")}
        >
          {filteredProducts.length === products.length && selectedCategory === "all" ? (
            <>
              Showing all <span className={cn("font-semibold", isDarkMode ? "text-white" : "text-gray-900")}>{products.length}</span> products
            </>
          ) : (
            <>
              Found <span className={cn("font-semibold", isDarkMode ? "text-white" : "text-gray-900")}>{filteredProducts.length}</span> of <span className={cn("font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}>{products.length}</span> products
              {selectedCategory !== "all" && (
                <span className={cn("ml-1", isDarkMode ? "text-gray-500" : "text-gray-500")}>
                  in {PRODUCT_CATEGORIES.find(c => c.id === selectedCategory)?.label}
                </span>
              )}
            </>
          )}
        </p>
        {(searchQuery || selectedTags.length > 0 || selectedCategory !== "all") && (
          <button
            onClick={clearAll}
            className={cn(
              "text-sm font-medium transition-colors",
              isDarkMode
                ? "text-primary-strong hover:text-primary-strong/80"
                : "text-primary-strong hover:text-primary-strong/80"
            )}
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
