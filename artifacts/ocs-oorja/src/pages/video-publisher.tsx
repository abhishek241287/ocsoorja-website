/**
 * Video Publisher — DEVELOPMENT WORKSPACE ONLY.
 *
 * Allows admins to upload videos, add YouTube/Vimeo links, edit metadata,
 * replace thumbnails, reorder, feature, and delete videos.
 *
 * Routes/page tree-shaken from production builds (lazy import gated on DEV).
 */
import { useCallback, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Film,
  GripVertical,
  Image as ImageIcon,
  Link2,
  Pencil,
  Play,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import {
  VIDEO_CATEGORIES,
  captureVideoThumbnail,
  getVideoDuration,
  uploadThumbnail,
  type VideoEntry,
  type VideoListResponse,
} from "@/lib/video-utils";

// ── API helpers ─────────────────────────────────────────────────────────────

async function apiJson<T>(url: string, init?: RequestInit): Promise<T> {
  const r = await fetch(url, init);
  const data = (await r.json()) as T & { error?: string };
  if (!r.ok) throw new Error((data as { error?: string }).error ?? "Request failed");
  return data;
}

// ── Thumbnail capture + upload helper ───────────────────────────────────────

async function autoCaptureThumbnail(file: File): Promise<string | null> {
  const blob = await captureVideoThumbnail(file);
  if (!blob) return null;
  return uploadThumbnail(blob, "auto-thumb.jpg");
}

async function uploadCustomThumbnail(file: File): Promise<string | null> {
  return uploadThumbnail(file, file.name);
}

// ── Main component ───────────────────────────────────────────────────────────

export default function VideoPublisher() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery<VideoListResponse>({
    queryKey: ["admin-videos"],
    queryFn: () =>
      apiJson<VideoListResponse>("/api/videos?limit=50"),
  });
  const videos = data?.videos ?? [];

  const invalidate = useCallback(() => {
    void qc.invalidateQueries({ queryKey: ["admin-videos"] });
    void qc.invalidateQueries({ queryKey: ["videos"] });
  }, [qc]);

  // ── Upload section state ──
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState("General");
  const [uploadThumbMode, setUploadThumbMode] = useState<"auto" | "custom">("auto");
  const [uploadThumbPreview, setUploadThumbPreview] = useState<string | null>(null);
  const [uploadThumbUrl, setUploadThumbUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const videoFileRef = useRef<HTMLInputElement>(null);
  const uploadThumbRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      setUploadStatus("Reading duration…");
      const duration = await getVideoDuration(file);

      let thumbUrl = uploadThumbUrl;

      if (!thumbUrl) {
        if (uploadThumbMode === "auto") {
          setUploadStatus("Capturing thumbnail…");
          thumbUrl = await autoCaptureThumbnail(file);
        }
      }

      setUploadStatus("Uploading video…");
      const fd = new FormData();
      fd.append("video", file);
      fd.append("title", uploadTitle || file.name.replace(/\.[^.]+$/, ""));
      fd.append("category", uploadCategory);
      fd.append("duration", duration);
      if (thumbUrl) fd.append("thumbnailUrl", thumbUrl);

      return apiJson<VideoEntry>("/api/videos/upload", { method: "POST", body: fd });
    },
    onSuccess: () => {
      invalidate();
      setUploadTitle("");
      setUploadThumbPreview(null);
      setUploadThumbUrl(null);
      setUploadStatus("Uploaded!");
      if (videoFileRef.current) videoFileRef.current.value = "";
      if (uploadThumbRef.current) uploadThumbRef.current.value = "";
      setTimeout(() => setUploadStatus(""), 3000);
    },
    onError: (err: Error) => {
      setUploadStatus("");
      console.error(err);
    },
  });

  async function handleCustomThumbFile(file: File) {
    const previewUrl = URL.createObjectURL(file);
    setUploadThumbPreview(previewUrl);
    setUploadStatus("Uploading thumbnail…");
    const url = await uploadCustomThumbnail(file);
    setUploadStatus("");
    if (url) setUploadThumbUrl(url);
  }

  // ── Embed section state ──
  const [embedUrl, setEmbedUrl] = useState("");
  const [embedTitle, setEmbedTitle] = useState("");
  const [embedCategory, setEmbedCategory] = useState("General");
  const [embedThumbUrl, setEmbedThumbUrl] = useState<string | null>(null);
  const [embedThumbPreview, setEmbedThumbPreview] = useState<string | null>(null);
  const [embedStatus, setEmbedStatus] = useState("");
  const embedThumbRef = useRef<HTMLInputElement>(null);

  const embedMutation = useMutation({
    mutationFn: () =>
      apiJson<VideoEntry>("/api/videos/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: embedTitle,
          url: embedUrl,
          category: embedCategory,
          thumbnailUrl: embedThumbUrl ?? "",
        }),
      }),
    onSuccess: () => {
      invalidate();
      setEmbedUrl("");
      setEmbedTitle("");
      setEmbedThumbUrl(null);
      setEmbedThumbPreview(null);
      setEmbedStatus("Added!");
      if (embedThumbRef.current) embedThumbRef.current.value = "";
      setTimeout(() => setEmbedStatus(""), 3000);
    },
    onError: (err: Error) => setEmbedStatus(err.message),
  });

  async function handleEmbedThumbFile(file: File) {
    const previewUrl = URL.createObjectURL(file);
    setEmbedThumbPreview(previewUrl);
    const url = await uploadCustomThumbnail(file);
    if (url) setEmbedThumbUrl(url);
  }

  // ── Mutations ──
  const patchMutation = useMutation({
    mutationFn: ({ id, ...patch }: Partial<VideoEntry> & { id: number }) =>
      apiJson<VideoEntry>(`/api/videos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      }),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiJson<{ ok: boolean }>(`/api/videos/${id}`, { method: "DELETE" }),
    onSuccess: invalidate,
  });

  // ── Drag-drop reorder ──
  const dragId = useRef<number | null>(null);
  const [ordered, setOrdered] = useState<VideoEntry[] | null>(null);
  const list = ordered ?? videos;

  const reorderMutation = useMutation({
    mutationFn: (orderedIds: number[]) =>
      apiJson<{ ok: boolean }>("/api/videos/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      }),
    onSuccess: () => {
      setOrdered(null);
      invalidate();
    },
  });

  function handleDrop(targetId: number) {
    if (dragId.current === null || dragId.current === targetId) return;
    const items = [...list];
    const from = items.findIndex((v) => v.id === dragId.current);
    const to = items.findIndex((v) => v.id === targetId);
    if (from === -1 || to === -1) return;
    const [moved] = items.splice(from, 1);
    if (moved) items.splice(to, 0, moved);
    setOrdered(items);
    dragId.current = null;
    reorderMutation.mutate(items.map((v) => v.id));
  }

  // ── Edit dialog ──
  const [editing, setEditing] = useState<VideoEntry | null>(null);
  const [editThumbPreview, setEditThumbPreview] = useState<string | null>(null);
  const editThumbRef = useRef<HTMLInputElement>(null);

  async function handleEditThumbFile(file: File) {
    const previewUrl = URL.createObjectURL(file);
    setEditThumbPreview(previewUrl);
    const url = await uploadCustomThumbnail(file);
    if (url && editing) setEditing({ ...editing, thumbnail: url });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground">Video Publisher</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Upload videos, add YouTube/Vimeo links, and manage your video gallery.
      </p>

      {/* ── Upload video file ─────────────────────────────────────────── */}
      <section className="mt-8 rounded-xl border border-border bg-card p-5">
        <h2 className="flex items-center gap-2 font-semibold">
          <Upload className="h-4 w-4" /> Upload Video
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          MP4, MOV, AVI, MKV, WEBM · max 1 GB
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Input
            placeholder="Title (defaults to filename)"
            value={uploadTitle}
            onChange={(e) => setUploadTitle(e.target.value)}
          />
          <select
            value={uploadCategory}
            onChange={(e) => setUploadCategory(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            {VIDEO_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Thumbnail mode */}
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Cover thumbnail</p>
          <div className="flex flex-wrap gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="uploadThumbMode"
                value="auto"
                checked={uploadThumbMode === "auto"}
                onChange={() => {
                  setUploadThumbMode("auto");
                  setUploadThumbPreview(null);
                  setUploadThumbUrl(null);
                }}
                className="accent-primary"
              />
              Auto-capture from video
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="uploadThumbMode"
                value="custom"
                checked={uploadThumbMode === "custom"}
                onChange={() => setUploadThumbMode("custom")}
                className="accent-primary"
              />
              Upload custom thumbnail
            </label>
          </div>

          {uploadThumbMode === "custom" && (
            <div className="mt-3 flex items-center gap-3">
              <input
                ref={uploadThumbRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={(e) =>
                  e.target.files?.[0] && handleCustomThumbFile(e.target.files[0])
                }
              />
              <button
                type="button"
                onClick={() => uploadThumbRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-secondary"
              >
                <ImageIcon className="h-4 w-4" />
                Choose image
              </button>
              {uploadThumbPreview && (
                <div className="relative">
                  <img
                    src={uploadThumbPreview}
                    alt="Thumbnail preview"
                    className="h-16 w-28 rounded-md object-cover ring-1 ring-border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setUploadThumbPreview(null);
                      setUploadThumbUrl(null);
                      if (uploadThumbRef.current) uploadThumbRef.current.value = "";
                    }}
                    className="absolute -right-1.5 -top-1.5 rounded-full bg-foreground p-0.5 text-background"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* File picker + upload button */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            ref={videoFileRef}
            type="file"
            accept=".mp4,.mov,.avi,.mkv,.webm,video/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadMutation.mutate(file);
            }}
          />
          <Button
            onClick={() => videoFileRef.current?.click()}
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? uploadStatus || "Uploading…" : "Choose & Upload"}
          </Button>
          {uploadMutation.isError && (
            <p className="text-sm text-destructive">{String(uploadMutation.error)}</p>
          )}
          {uploadStatus && !uploadMutation.isPending && (
            <p className="text-sm text-primary-strong">{uploadStatus}</p>
          )}
        </div>
      </section>

      {/* ── Add YouTube / Vimeo link ─────────────────────────────────── */}
      <section className="mt-6 rounded-xl border border-border bg-card p-5">
        <h2 className="flex items-center gap-2 font-semibold">
          <Link2 className="h-4 w-4" /> Add YouTube / Vimeo Link
        </h2>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Input
            placeholder="Video title *"
            value={embedTitle}
            onChange={(e) => setEmbedTitle(e.target.value)}
          />
          <Input
            placeholder="https://youtube.com/watch?v=… or vimeo.com/…"
            value={embedUrl}
            onChange={(e) => setEmbedUrl(e.target.value)}
          />
          <select
            value={embedCategory}
            onChange={(e) => setEmbedCategory(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            {VIDEO_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Custom thumbnail (optional override) */}
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Custom thumbnail{" "}
            <span className="font-normal text-muted-foreground/70">
              (optional — YouTube thumbnail auto-fetched if not set)
            </span>
          </p>
          <div className="flex items-center gap-3">
            <input
              ref={embedThumbRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleEmbedThumbFile(e.target.files[0])
              }
            />
            <button
              type="button"
              onClick={() => embedThumbRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-secondary"
            >
              <ImageIcon className="h-4 w-4" />
              Upload thumbnail
            </button>
            {embedThumbPreview && (
              <div className="relative">
                <img
                  src={embedThumbPreview}
                  alt="Thumbnail preview"
                  className="h-16 w-28 rounded-md object-cover ring-1 ring-border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setEmbedThumbPreview(null);
                    setEmbedThumbUrl(null);
                    if (embedThumbRef.current) embedThumbRef.current.value = "";
                  }}
                  className="absolute -right-1.5 -top-1.5 rounded-full bg-foreground p-0.5 text-background"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Button
            disabled={!embedTitle || !embedUrl || embedMutation.isPending}
            onClick={() => embedMutation.mutate()}
          >
            {embedMutation.isPending ? "Adding…" : "Add Video"}
          </Button>
          {embedMutation.isError && (
            <p className="text-sm text-destructive">{String(embedMutation.error)}</p>
          )}
          {embedStatus && !embedMutation.isPending && (
            <p className="text-sm text-primary-strong">{embedStatus}</p>
          )}
        </div>
      </section>

      {/* ── Video list ──────────────────────────────────────────────────── */}
      <section className="mt-8">
        <h2 className="mb-3 font-semibold">
          All Videos ({list.length})
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            Drag to reorder
          </span>
        </h2>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : list.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-border py-16 text-center">
            <Film className="h-8 w-8 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">
              No videos yet — upload your first one above.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {list.map((video) => (
              <li
                key={video.id}
                draggable
                onDragStart={() => (dragId.current = video.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(video.id)}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
              >
                <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-muted-foreground" />

                {/* Thumbnail */}
                <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Film className="h-5 w-5 text-muted-foreground/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/30">
                    <Play className="h-4 w-4 fill-white text-white opacity-0 transition-opacity hover:opacity-100" />
                  </div>
                </div>

                {/* Meta */}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">{video.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {video.type} · {video.category}
                    {video.duration ? ` · ${video.duration}` : ""}
                  </p>
                </div>

                {/* Actions */}
                <button
                  type="button"
                  title={video.featured ? "Remove featured" : "Mark as featured"}
                  onClick={() =>
                    patchMutation.mutate({ id: video.id, featured: !video.featured })
                  }
                  className={cn(
                    "rounded-md p-2 transition-colors",
                    video.featured
                      ? "text-primary-strong"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Star className={cn("h-4 w-4", video.featured && "fill-current")} />
                </button>

                <button
                  type="button"
                  title="Edit"
                  onClick={() => {
                    setEditing(video);
                    setEditThumbPreview(video.thumbnail ?? null);
                  }}
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Pencil className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  title="Delete"
                  onClick={() => {
                    if (confirm(`Delete "${video.title}"?`))
                      deleteMutation.mutate(video.id);
                  }}
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ── Edit dialog ──────────────────────────────────────────────────── */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setEditing(null)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Edit Video</h3>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <label className="block text-sm">
                <span className="text-muted-foreground">Title</span>
                <Input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="mt-1"
                />
              </label>

              {/* Description */}
              <label className="block text-sm">
                <span className="text-muted-foreground">Description</span>
                <textarea
                  value={editing.description ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                  rows={3}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>

              {/* Category */}
              <label className="block text-sm">
                <span className="text-muted-foreground">Category</span>
                <select
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  {VIDEO_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>

              {/* Replace thumbnail */}
              <div className="text-sm">
                <span className="text-muted-foreground">Cover thumbnail</span>
                <div className="mt-2 flex items-center gap-3">
                  {editThumbPreview && (
                    <div className="relative">
                      <img
                        src={editThumbPreview}
                        alt=""
                        className="h-16 w-28 rounded-md object-cover ring-1 ring-border"
                      />
                    </div>
                  )}
                  <input
                    ref={editThumbRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                    className="hidden"
                    onChange={(e) =>
                      e.target.files?.[0] && handleEditThumbFile(e.target.files[0])
                    }
                  />
                  <button
                    type="button"
                    onClick={() => editThumbRef.current?.click()}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-secondary"
                  >
                    <ImageIcon className="h-4 w-4" />
                    {editing.thumbnail ? "Replace thumbnail" : "Upload thumbnail"}
                  </button>
                  {editing.thumbnail && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditing({ ...editing, thumbnail: null });
                        setEditThumbPreview(null);
                      }}
                      className="text-xs text-muted-foreground hover:text-destructive"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            <Button
              className="mt-6 w-full"
              disabled={patchMutation.isPending}
              onClick={() => {
                patchMutation.mutate({
                  id: editing.id,
                  title: editing.title,
                  description: editing.description,
                  category: editing.category,
                  thumbnail: editing.thumbnail,
                });
                setEditing(null);
                setEditThumbPreview(null);
              }}
            >
              {patchMutation.isPending ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
