

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductImageGallery({
  images,
  alt,
  className,
}: {
  images: string[];
  alt: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  const safeImages = useMemo(() => {
    const uniq = Array.from(new Set(images.filter(Boolean)));
    return uniq.length ? uniq : ["/images/placeholder.svg"];
  }, [images]);

  const prev = () => setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  const next = () => setIndex((i) => (i + 1) % safeImages.length);
  const goTo = (i: number) => setIndex(((i % safeImages.length) + safeImages.length) % safeImages.length);

  return (
    <div className={cn("relative", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-card-border bg-neutral-50">
        <img
          key={safeImages[index]}
          src={safeImages[index]}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-opacity duration-300"
        />

        {safeImages.length > 1 && (
          <>
            <button
              aria-label="Previous image"
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next image"
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {safeImages.length > 1 && (
        <div className="mt-2 flex justify-center gap-2">
          {safeImages.map((src, i) => (
            <button
              key={src}
              aria-label={`Go to image ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                i === index ? "bg-primary" : "bg-foreground/30 hover:bg-foreground/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
