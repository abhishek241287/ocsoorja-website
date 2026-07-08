import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { CATEGORIES } from "@/data/gallery";
import { CheckCircle2, ImagePlus, Loader2, UploadCloud, X } from "lucide-react";

// ---------------------------------------------------------------------------
// Gallery Publisher — internal tool, development workspace only.
//
// Mirrors the Blog Publisher's architecture exactly: this page is NOT in
// navigation.ts and its route is only registered in development, so it never
// ships in the production build. It posts to the API server, which saves the
// photos and appends minimal entries directly into the matching category's
// existing data file in src/data/gallery/ — no separate uploads/JSON store.
// ---------------------------------------------------------------------------

const SUCCESS_KEY = "gallery-publisher-success";

type SuccessInfo = { category: string; count: number };
type PendingPhoto = { file: File; preview: string };

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_PHOTOS = 20;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read one of the image files."));
    reader.readAsDataURL(file);
  });
}

export default function GalleryPublisher() {
  const [category, setCategory] = useState("");
  const [photos, setPhotos] = useState<PendingPhoto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [success, setSuccess] = useState<SuccessInfo | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Publishing rewrites the category data file, which restarts the dev
  // server and reloads this page — so success state persists across reload.
  useEffect(() => {
    const raw = sessionStorage.getItem(SUCCESS_KEY);
    if (raw) {
      try {
        setSuccess(JSON.parse(raw) as SuccessInfo);
      } catch {
        sessionStorage.removeItem(SUCCESS_KEY);
      }
    }
  }, []);

  useEffect(() => {
    document.title = "Gallery Publisher | OCS OORJA";
  }, []);

  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      setError(null);
      const incoming = Array.from(fileList);
      const valid: PendingPhoto[] = [];
      for (const file of incoming) {
        if (!ACCEPTED_TYPES.includes(file.type)) {
          setError("Please choose only PNG, JPG or WebP images.");
          continue;
        }
        if (file.size > MAX_IMAGE_BYTES) {
          setError("One of the photos is larger than 8 MB. Please use smaller files.");
          continue;
        }
        valid.push({ file, preview: URL.createObjectURL(file) });
      }
      setPhotos((prev) => {
        const combined = [...prev, ...valid];
        if (combined.length > MAX_PHOTOS) {
          setError(`You can upload up to ${MAX_PHOTOS} photos at a time. Extra photos were not added.`);
          return combined.slice(0, MAX_PHOTOS);
        }
        return combined;
      });
    },
    [],
  );

  function removePhoto(index: number) {
    setPhotos((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  }

  async function onPublish() {
    setError(null);

    if (!category) {
      setError("Please choose a category.");
      return;
    }
    if (photos.length === 0) {
      setError("Please add at least one photo.");
      return;
    }

    setPublishing(true);
    try {
      const images = await Promise.all(photos.map((p) => fileToDataUrl(p.file)));
      const res = await fetch("/api/gallery/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, images }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; count?: number; error?: string }
        | null;
      if (!res.ok || !data?.ok || !data.count) {
        setError(
          data?.error ??
            "Publishing failed. Please try again, or ask for help in the chat.",
        );
        return;
      }
      const info: SuccessInfo = { category, count: data.count };
      sessionStorage.setItem(SUCCESS_KEY, JSON.stringify(info));
      setSuccess(info);
    } catch {
      setError("Publishing failed. Please try again, or ask for help in the chat.");
    } finally {
      setPublishing(false);
    }
  }

  function startOver() {
    sessionStorage.removeItem(SUCCESS_KEY);
    setSuccess(null);
    setCategory("");
    photos.forEach((p) => URL.revokeObjectURL(p.preview));
    setPhotos([]);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const categoryLabel = CATEGORIES.find((c) => c.id === success?.category)?.label ?? success?.category;

  if (success) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-16 md:py-24">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center md:p-12">
            <CheckCircle2 className="h-12 w-12 text-primary-strong" aria-hidden />
            <h1 className="text-2xl font-bold md:text-3xl">Photos published!</h1>
            <p className="text-muted-foreground">
              {success.count} photo{success.count === 1 ? "" : "s"} added to the{" "}
              <strong>{categoryLabel}</strong> category — they now appear under
              Projects → Installation Gallery.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/projects">View Installation Gallery</Link>
              </Button>
              <Button variant="outline" onClick={startOver}>
                Publish more photos
              </Button>
            </div>
            <p className="mt-4 rounded-md bg-muted px-4 py-3 text-sm text-muted-foreground">
              To put it on the <strong>live site</strong>, click Replit's{" "}
              <strong>Publish</strong> button when you're ready.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-strong">
          Internal tool
        </p>
        <h1 className="mt-1 text-3xl font-bold md:text-4xl">Gallery Publisher</h1>
        <p className="mt-2 text-muted-foreground">
          Choose a category and drop in photos — they're added to the
          Installation Gallery automatically. No code editing needed.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-6 p-6 md:p-8">
          {/* Category */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Choose a category…</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Photos */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="photos">
              Photos{" "}
              <span className="font-normal text-muted-foreground">
                (up to {MAX_PHOTOS})
              </span>
            </Label>
            <input
              ref={fileInputRef}
              id="photos"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              className="sr-only"
              onChange={(e) => {
                if (e.target.files?.length) addFiles(e.target.files);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              className={`flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 text-muted-foreground transition-colors hover:border-primary hover:text-foreground ${
                isDragging ? "border-primary bg-primary/5 text-foreground" : "border-border bg-muted/40"
              }`}
            >
              <ImagePlus className="h-8 w-8" aria-hidden />
              <span className="text-sm">
                Click to choose photos, or drag and drop here (PNG, JPG or WebP)
              </span>
            </button>

            {photos.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {photos.map((p, i) => (
                  <div key={p.preview} className="group relative aspect-square overflow-hidden rounded-md border border-border bg-muted">
                    <img src={p.preview} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      aria-label="Remove photo"
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black/90"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {photos.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {photos.length} of {MAX_PHOTOS} photos selected
              </p>
            )}
          </div>

          {error ? (
            <p
              role="alert"
              className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-3">
            <Button onClick={onPublish} disabled={publishing} size="lg">
              {publishing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                  Publishing…
                </>
              ) : (
                <>
                  <UploadCloud className="mr-2 h-4 w-4" aria-hidden />
                  Publish Photos
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              After publishing, the preview may refresh for a few seconds —
              that's normal. The live site updates when you click Replit's
              Publish button.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
