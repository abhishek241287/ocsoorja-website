import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Search, X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SITE as siteConfig } from "@/data/site";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HEADLINES, CTAS } from "@/data/brand";
import { formatDate } from "@/lib/format";
import { getSortedPosts, getAllCategories, getFeaturedPost } from "@/data/blog";
import {
  getItemListSchema,
  getBreadcrumbSchema,
  renderJsonLd,
} from "@/lib/seo";
import { cn } from "@/lib/utils";
import ArticleCard from "@/components/blog/ArticleCard";

const SITE = siteConfig.url;
const PAGE_SIZE = 9;

export default function Blog() {
  const allPosts = useMemo(() => getSortedPosts(), []);
  const categories = useMemo(() => getAllCategories(), []);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [page, setPage] = useState(1);

  const featured = useMemo(() => getFeaturedPost(), []);
  const isFiltering = category !== "all" || query.trim() !== "";

  // Category → search filtering (client-side; no backend).
  const filtered = useMemo(() => {
    let list = allPosts;
    if (category !== "all") list = list.filter((p) => p.category === category);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => p.searchText.includes(q));
    }
    return list;
  }, [allPosts, category, query]);

  // With no active filter, the featured post is showcased as the hero, so the
  // grid shows the remaining posts (excluded by slug so it never duplicates,
  // even when the featured post isn't the newest). While filtering, the grid
  // shows all matches (featured hero is hidden) so nothing is missed.
  const gridPosts = isFiltering
    ? filtered
    : allPosts.filter((p) => p.slug !== featured?.slug);

  const totalPages = Math.max(1, Math.ceil(gridPosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = gridPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // Reset to the first page whenever the filters change.
  useEffect(() => {
    setPage(1);
  }, [category, query]);

  const itemListSchema = useMemo(
    () =>
      getItemListSchema(
        allPosts.map((p) => ({
          name: p.title,
          url: `${SITE}/blog/${p.slug}`,
        })),
      ),
    [allPosts],
  );
  const breadcrumbSchema = useMemo(
    () =>
      getBreadcrumbSchema([
        { name: "Home", url: `${SITE}/` },
        { name: "Blog", url: `${SITE}/blog` },
      ]),
    [],
  );

  const pill = (active: boolean) =>
    cn(
      "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
      active
        ? "border-primary bg-primary text-primary-foreground shadow-sm"
        : "border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground",
    );

  const clearAll = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <div className="py-12 md:py-16">
      <Seo
        title={HEADLINES.blog.metaTitle}
        description={HEADLINES.blog.metaDescription}
        canonical={`${SITE}/blog`}
      />
      <Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={renderJsonLd(itemListSchema)}
        />

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span className="font-medium text-foreground">Blog</span>
        </nav>

        {/* Header */}
        <div className="mb-8 mt-6">
          <SectionHeading
            eyebrow={HEADLINES.blog.pageEyebrow}
            title={HEADLINES.blog.pageTitle}
            subtitle={HEADLINES.blog.pageSubtitle}
            align="left"
          />
        </div>

        {/* Featured article (only when not filtering) */}
        {!isFiltering && featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mb-12 block overflow-hidden rounded-3xl border border-card-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg"
            aria-label={`Featured: ${featured.title}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[20rem]">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <span className="rounded-full bg-primary px-3 py-1 font-semibold uppercase tracking-wider text-primary-foreground">
                    Featured
                  </span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold uppercase tracking-wider text-primary-strong">
                    {featured.category}
                  </span>
                  <span className="text-muted-foreground">
                    {formatDate(featured.publishDate)} · {featured.readingTime}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {featured.title}
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-strong">
                  Read article
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Search + category filter */}
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={pill(category === "all")}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={pill(category === c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative sm:max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles by title, topic or author…"
              aria-label="Search articles"
              className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-11 text-sm text-foreground placeholder:text-muted-foreground shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {isFiltering ? (
                <>
                  Found{" "}
                  <span className="font-semibold text-foreground">
                    {filtered.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {allPosts.length}
                  </span>{" "}
                  articles
                </>
              ) : (
                <>
                  Showing all{" "}
                  <span className="font-semibold text-foreground">
                    {allPosts.length}
                  </span>{" "}
                  articles
                </>
              )}
            </p>
            {isFiltering && (
              <button
                type="button"
                onClick={clearAll}
                className="shrink-0 text-sm font-medium text-primary-strong hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-border bg-card py-16 text-center">
            <div className="mb-4 rounded-full bg-secondary p-6">
              <Search
                className="h-10 w-10 text-primary-strong"
                aria-hidden="true"
              />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              No articles found
            </h3>
            <p className="max-w-md text-muted-foreground">
              Try a different search term or category.
            </p>
          </div>
        ) : (
          <>
            {paginated.length > 0 && (
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginated.map((post) => (
                  <ArticleCard key={post.slug} post={post} className="h-full" />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <nav
                className="mt-12 flex items-center justify-center gap-2"
                aria-label="Blog pagination"
              >
                <button
                  type="button"
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i + 1)}
                    aria-current={currentPage === i + 1 ? "page" : undefined}
                    className={cn(
                      "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-medium transition-colors",
                      currentPage === i + 1
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            )}
          </>
        )}

        {/* Lead generation */}
        <section className="mt-16 rounded-3xl border border-border bg-secondary/60 px-6 py-10 sm:px-10 sm:py-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {HEADLINES.cta.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                {HEADLINES.cta.body}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={CTAS.requestQuote.href}>
                  {CTAS.requestQuote.label}
                </Link>
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
