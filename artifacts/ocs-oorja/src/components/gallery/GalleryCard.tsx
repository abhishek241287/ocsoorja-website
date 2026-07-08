import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCategoryInfo, type GalleryPhoto } from "@/data/gallery";

export type GalleryCardProps = {
  photo: GalleryPhoto;
  onOpen: (photo: GalleryPhoto) => void;
  className?: string;
};

export default function GalleryCard({ photo, onOpen, className }: GalleryCardProps) {
  const category = getCategoryInfo(photo.category);
  const labelId = `gallery-photo-${photo.id}-label`;

  return (
    <button
      type="button"
      onClick={() => onOpen(photo)}
      aria-labelledby={labelId}
      className={cn(
        "group relative block aspect-[4/3] overflow-hidden rounded-lg border border-card-border bg-neutral-50",
        "shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-200 ease-out motion-reduce:transition-none",
        "hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] motion-reduce:hover:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="h-full w-full object-cover"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-80 transition-opacity duration-200 group-hover:opacity-95"
      />

      <div id={labelId} className="absolute inset-x-0 bottom-0 p-3">
        {category && (
          <span className="text-[11px] font-semibold uppercase tracking-wide text-accent-energy">
            {category.label}
          </span>
        )}
        {photo.location && (
          <div className="mt-0.5 flex items-center gap-1 text-[13px] text-white">
            <MapPin className="h-3 w-3 flex-none" aria-hidden="true" />
            <span>
              {photo.location.city}, {photo.location.state}
            </span>
          </div>
        )}
        {photo.caption && (
          <p className="mt-0.5 line-clamp-2 text-[13px] text-white/80">{photo.caption}</p>
        )}
      </div>
    </button>
  );
}
