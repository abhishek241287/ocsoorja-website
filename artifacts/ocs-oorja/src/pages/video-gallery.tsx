import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Film, Play, Search, Star, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { parseVideoUrl, VIDEO_CATEGORIES, type VideoEntry, type VideoListResponse } from "@/lib/video-utils";

const PAGE_SIZE = 12;

function useVideos(search: string, category: string) {
  return useInfiniteQuery<VideoListResponse>({
    queryKey: ["videos", search, category],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        page: String(pageParam ?? 1),
        limit: String(PAGE_SIZE),
      });
      if (search) params.set("search", search);
      if (category && category !== "All") params.set("category", category);
      const r = await fetch(`/api/videos?${params.toString()}`);
      if (!r.ok) throw new Error("Failed to load videos");
      return r.json() as Promise<VideoListResponse>;
    },
    getNextPageParam: (last, pages) => (last.hasMore ? pages.length + 1 : undefined),
    initialPageParam: 1,
  });
}

export default function VideoGalleryPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState<VideoEntry | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useVideos(
    search,
    category,
  );

  const videos = useMemo(
    () => data?.pages.flatMap((p) => p.videos) ?? [],
    [data],
  );

  // Infinite scroll sentinel
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage && fetchNextPage(),
      { rootMargin: "400px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <Seo
        title="Video Gallery | OCS OORJA"
        description="Watch OCS OORJA installation videos, project walkthroughs, and energy system demonstrations."
      />

      <Container className="py-12 sm:py-16">
        {/* Back nav */}
        <div className="mb-8 inline-flex flex-wrap gap-1 rounded-full border border-border bg-card p-1">
          <Link
            href="/projects"
            className="rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Case Studies
          </Link>
          <Link
            href="/projects"
            className="rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Installation Gallery
          </Link>
          <span className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm">
            Video Gallery
          </span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-strong">
            OCS OORJA
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Video Gallery
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Installations, project walkthroughs, and product demonstrations from across India.
          </p>
        </div>

        {/* Search + Category Filter */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search videos…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...VIDEO_CATEGORIES].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-video animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-24 text-center">
            <Film className="h-10 w-10 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium">No videos available</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {search ? "Try a different search term." : "Check back soon."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} onPlay={() => setActiveVideo(video)} />
            ))}
          </div>
        )}

        {/* Infinite scroll sentinel */}
        <div ref={loadMoreRef} className="h-1" />
        {isFetchingNextPage && (
          <p className="mt-6 text-center text-sm text-muted-foreground">Loading more…</p>
        )}
      </Container>

      {/* Lightbox */}
      {activeVideo && (
        <VideoLightbox
          video={activeVideo}
          videos={videos}
          onClose={() => setActiveVideo(null)}
          onNavigate={setActiveVideo}
        />
      )}
    </>
  );
}

// ── Video Card ──────────────────────────────────────────────────────────────

function VideoCard({ video, onPlay }: { video: VideoEntry; onPlay: () => void }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onPlay}
      className="group overflow-hidden rounded-xl border border-card-border bg-card text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {video.thumbnail ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Film className="h-10 w-10 text-muted-foreground/30" />
              </div>
            )}
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              className={cn(
                "h-full w-full object-cover transition-opacity duration-300",
                imgLoaded ? "opacity-100" : "opacity-0",
              )}
            />
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <Film className="h-10 w-10 text-muted-foreground/30" />
          </div>
        )}

        {/* Hover overlay + play button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/30">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground opacity-0 shadow-lg transition-all duration-200 group-hover:scale-105 group-hover:opacity-100">
            <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
          </div>
        </div>

        {/* Badges */}
        {video.featured && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
            <Star className="h-3 w-3 fill-current" /> Featured
          </span>
        )}
        {video.duration && (
          <span className="absolute bottom-3 right-3 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white">
            {video.duration}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="line-clamp-1 font-semibold text-foreground group-hover:text-primary-strong">
          {video.title}
        </h3>
        {video.description && (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{video.description}</p>
        )}
        <span className="mt-2 inline-block rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
          {video.category}
        </span>
      </div>
    </button>
  );
}

// ── Lightbox ────────────────────────────────────────────────────────────────

function VideoLightbox({
  video,
  videos,
  onClose,
  onNavigate,
}: {
  video: VideoEntry;
  videos: VideoEntry[];
  onClose: () => void;
  onNavigate: (v: VideoEntry) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const currentIndex = videos.findIndex((v) => v.id === video.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < videos.length - 1;

  const embed = video.type !== "upload" ? parseVideoUrl(video.url) : null;

  // Lock body scroll
  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
    };
  }, []);

  // Focus trap + keyboard nav
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(videos[currentIndex - 1]!);
      if (e.key === "ArrowRight" && hasNext) onNavigate(videos[currentIndex + 1]!);
    },
    [onClose, onNavigate, hasPrev, hasNext, videos, currentIndex],
  );

  useEffect(() => {
    dialogRef.current?.focus();
  }, [video.id]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between px-4 py-3 text-white sm:px-6">
        <button
          type="button"
          onClick={() => hasPrev && onNavigate(videos[currentIndex - 1]!)}
          disabled={!hasPrev}
          aria-label="Previous video"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => hasNext && onNavigate(videos[currentIndex + 1]!)}
          disabled={!hasNext}
          aria-label="Next video"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Video player */}
      <div className="flex flex-1 items-center justify-center overflow-hidden px-4 pb-2">
        <div className="w-full max-w-5xl">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
            {video.type === "upload" ? (
              <video
                key={video.id}
                src={video.url}
                controls
                autoPlay
                playsInline
                controlsList="nodownload"
                className="h-full w-full"
              />
            ) : (
              <iframe
                key={video.id}
                src={`${embed?.embedUrl ?? ""}?autoplay=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="h-full w-full border-0"
              />
            )}
          </div>

          {/* Meta */}
          <div className="mt-4 px-1">
            <h2 className="text-lg font-semibold text-white">{video.title}</h2>
            {video.description && (
              <p className="mt-1 text-sm text-white/70">{video.description}</p>
            )}
            <div className="mt-2 flex items-center gap-3 text-xs text-white/50">
              <span>{video.category}</span>
              {video.duration && <span>{video.duration}</span>}
              {video.featured && (
                <span className="flex items-center gap-1 text-primary-strong">
                  <Star className="h-3 w-3 fill-current" /> Featured
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
