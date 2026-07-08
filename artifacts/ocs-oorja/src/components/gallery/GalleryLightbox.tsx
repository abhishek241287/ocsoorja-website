import { useCallback, useEffect, useRef } from "react";
import { Link } from "wouter";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { getCategoryInfo, getProductsUsedLabels, type GalleryPhoto } from "@/data/gallery";

export type GalleryLightboxProps = {
  photo: GalleryPhoto;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function GalleryLightbox({ photo, index, total, onClose, onPrev, onNext }: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const category = getCategoryInfo(photo.category);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    dialogRef.current?.focus();
  }, [photo.id]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const focusable = root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose, onPrev, onNext],
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 motion-safe:animate-[fade-in_0.2s_ease-out_both]"
      onKeyDown={handleKeyDown}
      ref={dialogRef}
      tabIndex={-1}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
        <button
          type="button"
          onClick={onPrev}
          disabled={total <= 1}
          aria-label="Previous photo"
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
          onClick={onNext}
          disabled={total <= 1}
          aria-label="Next photo"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center overflow-hidden px-4 pb-2">
        <img
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          className="max-h-[70vh] max-w-full rounded-lg object-contain motion-safe:animate-[fade-in-up_0.3s_ease-out_both]"
        />
        <p className="mt-3 text-sm text-white/70">
          {index + 1} / {total}
        </p>
      </div>

      <div className="max-h-[35vh] overflow-y-auto border-t border-white/10 bg-black/40 px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {category && (
              <span className="text-[11px] font-semibold uppercase tracking-wide text-accent-energy">
                {category.label}
              </span>
            )}
            {photo.location && (
              <span className="inline-flex items-center gap-1 text-sm text-white/80">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {photo.location.city}, {photo.location.state}
              </span>
            )}
          </div>

          {photo.caption && <p className="mt-2 text-sm text-white/90 sm:text-base">{photo.caption}</p>}

          <dl className="mt-3 space-y-1 text-xs text-white/60 sm:text-sm">
            {photo.productsUsed?.length ? (
              <div className="flex flex-wrap gap-x-1.5">
                <dt className="font-medium text-white/80">Products:</dt>
                <dd>{getProductsUsedLabels(photo.productsUsed)}</dd>
              </div>
            ) : null}
            {photo.installationDate && (
              <div className="flex gap-1.5">
                <dt className="font-medium text-white/80">Installation:</dt>
                <dd>
                  {new Date(photo.installationDate).toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
                </dd>
              </div>
            )}
            {photo.photographer && (
              <div className="flex gap-1.5">
                <dt className="font-medium text-white/80">Photographer:</dt>
                <dd>{photo.photographer}</dd>
              </div>
            )}
          </dl>

          {(photo.relatedProjectSlug || photo.productsUsed?.length) && (
            <div className="mt-4 flex flex-wrap gap-3">
              {photo.relatedProjectSlug && (
                <Link
                  href={`/projects/${photo.relatedProjectSlug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
                >
                  View Related Project
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
              {photo.productsUsed?.[0] && (
                <Link
                  href={`/products/${photo.productsUsed[0]}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  View Product
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
