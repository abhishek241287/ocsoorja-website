import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { getAvailableCategories, sortPhotos, type GalleryCategory, type GalleryPhoto, type GallerySortOrder } from "@/data/gallery";
import { cn } from "@/lib/utils";

const SORT_OPTIONS: { id: GallerySortOrder; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "featured", label: "Featured First" },
];

type GalleryFiltersProps = {
  photos: GalleryPhoto[];
  onFilteredPhotos: (photos: GalleryPhoto[]) => void;
};

export default function GalleryFilters({ photos, onFilteredPhotos }: GalleryFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | "all">("all");
  const [sortOrder, setSortOrder] = useState<GallerySortOrder>("newest");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const availableCategories = useMemo(() => getAvailableCategories(photos), [photos]);

  const filtered = useMemo(() => {
    let list = photos;
    if (selectedCategory !== "all") list = list.filter((p) => p.category === selectedCategory);
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.location?.city.toLowerCase().includes(q) ||
          p.location?.state.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.caption?.toLowerCase().includes(q),
      );
    }
    return sortPhotos(list, sortOrder);
  }, [photos, selectedCategory, debouncedQuery, sortOrder]);

  useEffect(() => {
    onFilteredPhotos(filtered);
  }, [filtered, onFilteredPhotos]);

  const clearAll = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setSelectedCategory("all");
  };

  const pill = (active: boolean) =>
    cn(
      "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors border cursor-pointer",
      active
        ? "border-primary bg-primary text-primary-foreground shadow-sm"
        : "border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground",
    );

  return (
    <div className="sticky top-[var(--header-height,64px)] z-20 -mx-4 space-y-4 border-b border-border bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
      <div className="-mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]">
        <button type="button" onClick={() => setSelectedCategory("all")} className={pill(selectedCategory === "all")}>
          All
        </button>
        {availableCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedCategory(c.id)}
            className={pill(selectedCategory === c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, state, product, or project type..."
            aria-label="Search installations"
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-11 pr-9 text-sm text-foreground placeholder:text-muted-foreground shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="sr-only">Sort by</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as GallerySortOrder)}
            className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {(searchQuery || selectedCategory !== "all") && (
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Found <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
            <span className="font-medium text-foreground">{photos.length}</span> photos
          </p>
          <button type="button" onClick={clearAll} className="shrink-0 text-sm font-medium text-primary-strong hover:underline">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
