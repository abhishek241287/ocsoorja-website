/**
 * Video Publisher — production admin tool.
 *
 * Protected by a password login gate (ADMIN_PASSWORD env var).
 * Supports uploading video files to GCS or adding YouTube/Vimeo links,
 * with full metadata: title, description, category, thumbnail, publish date,
 * featured flag, and published toggle.
 */
import { type FormEvent, useCallback, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Film,
  GripVertical,
  Image as ImageIcon,
  Link2,
  Lock,
  LogOut,
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
  uploadVideoToGCS,
  type VideoEntry,
  type VideoListResponse,
} from "@/lib/video-utils";

// ── API helper ───────────────────────────────────────────────────────────────

async function apiJson<T>(url: string, init?: RequestInit): Promise<T> {
  const r = await fetch(url, init);
  const data = (await r.json()) as T & { error?: string };
  if (!r.ok) throw new Error((data as { error?: string }).error ?? "Request failed");
  return data;
}

// ── Supported formats list (informational) ───────────────────────────────────

const SUPPORTED_FORMATS =
  "MP4, M4V, MOV, AVI, MKV, WEBM, OGV, 3GP, WMV, FLV, TS, MTS, M2TS";

// ── Date helpers ─────────────────────────────────────────────────────────────

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return (
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
      `T${pad(d.getHours())}:${pad(d.getMinutes())}`
    );
  } catch {
    return "";
  }
}

// ── Login Gate ───────────────────────────────────────────────────────────────

function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await r.json()) as { ok?: boolean; error?: string };
      if (r.ok && data.ok) {
        onLogin();
      } else {
        setError(data.error ?? "Login failed");
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-5 w-5 text-primary-strong" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Video Publisher</h1>
            <p className="text-xs text-muted-foreground">Admin access required</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

// ── Shared form fields ────────────────────────────────────────────────────────

interface CommonFields {
  title: string;
  description: string;
  category: string;
  featured: boolean;
  published: boolean;
  publishedAt: string; // datetime-local string
}

function MetaFields({
  fields,
  onChange,
}: {
  fields: CommonFields;
  onChange: (f: Partial<CommonFields>) => void;
}) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <Input
        placeholder="Title *"
        value={fields.title}
        onChange={(e) => onChange({ title: e.target.value })}
        className="sm:col-span-2"
      />
      <textarea
        placeholder="Description (optional)"
        value={fields.description}
        onChange={(e) => onChange({ description: e.target.value })}
        rows={3}
        className="sm:col-span-2 rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
      />
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">
          Category
        </label>
        <select
          value={fields.category}
          onChange={(e) => onChange({ category: e.target.value })}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        >
          {VIDEO_CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">
          Publish date (optional)
        </label>
        <input
          type="datetime-local"
          value={fields.publishedAt}
          onChange={(e) => onChange({ publishedAt: e.target.value })}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
        />
      </div>
      <div className="sm:col-span-2 flex flex-wrap gap-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={fields.featured}
            onChange={(e) => onChange({ featured: e.target.checked })}
            className="accent-primary"
          />
          <span>Mark as featured</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={fields.published}
            onChange={(e) => onChange({ published: e.target.checked })}
            className="accent-primary"
          />
          <span>Publish immediately</span>
        </label>
      </div>
    </div>
  );
}

// ── Thumbnail picker ─────────────────────────────────────────────────────────

function ThumbnailPicker({
  preview,
  onFile,
  onClear,
  label = "Upload thumbnail",
}: {
  preview: string | null;
  onFile: (file: File) => void;
  onClear: () => void;
  label?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-3">
      <input
        ref={ref}
        type="file"
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-secondary"
      >
        <ImageIcon className="h-4 w-4" />
        {label}
      </button>
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Thumbnail preview"
            className="h-16 w-28 rounded-md object-cover ring-1 ring-border"
          />
          <button
            type="button"
            onClick={onClear}
            className="absolute -right-1.5 -top-1.5 rounded-full bg-foreground p-0.5 text-background"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function VideoPublisher() {
  const qc = useQueryClient();

  // Check admin auth
  const { data: authData, refetch: refetchAuth } = useQuery<{
    authenticated: boolean;
  }>({
    queryKey: ["admin-me"],
    queryFn: () =>
      fetch("/api/admin/me").then((r) => r.json()) as Promise<{
        authenticated: boolean;
      }>,
    retry: false,
  });

  const isAuthenticated = authData?.authenticated ?? false;

  // Video list (all videos for admin, including drafts)
  const { data, isLoading } = useQuery<VideoListResponse>({
    queryKey: ["admin-videos"],
    queryFn: () => apiJson<VideoListResponse>("/api/videos?limit=50"),
    enabled: isAuthenticated,
  });
  const videos = data?.videos ?? [];

  const invalidate = useCallback(() => {
    void qc.invalidateQueries({ queryKey: ["admin-videos"] });
    void qc.invalidateQueries({ queryKey: ["videos"] });
  }, [qc]);

  // ── Upload state ──────────────────────────────────────────────────────────

  const defaultFields: CommonFields = {
    title: "",
    description: "",
    category: "General",
    featured: false,
    published: false,
    publishedAt: "",
  };

  const [uploadFields, setUploadFields] = useState<CommonFields>({
    ...defaultFields,
  });
  const [uploadThumbMode, setUploadThumbMode] = useState<"auto" | "custom">(
    "auto",
  );
  const [uploadThumbPreview, setUploadThumbPreview] = useState<string | null>(
    null,
  );
  const [uploadThumbUrl, setUploadThumbUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const videoFileRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      setUploadStatus("Reading video…");
      setUploadProgress(null);
      const duration = await getVideoDuration(file);

      let thumbUrl = uploadThumbUrl;
      if (!thumbUrl && uploadThumbMode === "auto") {
        setUploadStatus("Capturing thumbnail…");
        const blob = await captureVideoThumbnail(file);
        if (blob) {
          setUploadStatus("Uploading thumbnail…");
          thumbUrl = await uploadThumbnail(blob, "auto-thumb.jpg");
        }
      }

      setUploadStatus("Uploading video…");
      const { servingUrl } = await uploadVideoToGCS(file, (pct) => {
        setUploadProgress(pct);
        setUploadStatus(`Uploading… ${pct}%`);
      });
      setUploadProgress(null);

      setUploadStatus("Saving…");
      return apiJson<VideoEntry>("/api/videos/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: uploadFields.title || file.name.replace(/\.[^.]+$/, ""),
          description: uploadFields.description,
          category: uploadFields.category,
          objectPath: servingUrl,
          thumbnailUrl: thumbUrl ?? "",
          duration,
          featured: uploadFields.featured,
          published: uploadFields.published,
          publishedAt: uploadFields.publishedAt
            ? new Date(uploadFields.publishedAt).toISOString()
            : null,
        }),
      });
    },
    onSuccess: () => {
      invalidate();
      setUploadFields({ ...defaultFields });
      setUploadThumbPreview(null);
      setUploadThumbUrl(null);
      setUploadProgress(null);
      setUploadStatus("Uploaded!");
      if (videoFileRef.current) videoFileRef.current.value = "";
      setTimeout(() => setUploadStatus(""), 3000);
    },
    onError: (err: Error) => {
      setUploadProgress(null);
      setUploadStatus("");
      console.error(err);
    },
  });

  async function handleCustomThumbFile(file: File) {
    setUploadThumbPreview(URL.createObjectURL(file));
    setUploadStatus("Uploading thumbnail…");
    const url = await uploadThumbnail(file, file.name);
    setUploadStatus("");
    if (url) setUploadThumbUrl(url);
  }

  // ── Embed state ───────────────────────────────────────────────────────────

  const [embedFields, setEmbedFields] = useState<CommonFields>({
    ...defaultFields,
  });
  const [embedUrl, setEmbedUrl] = useState("");
  const [embedThumbUrl, setEmbedThumbUrl] = useState<string | null>(null);
  const [embedThumbPreview, setEmbedThumbPreview] = useState<string | null>(
    null,
  );
  const [embedStatus, setEmbedStatus] = useState("");

  const embedMutation = useMutation({
    mutationFn: () =>
      apiJson<VideoEntry>("/api/videos/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: embedFields.title,
          description: embedFields.description,
          category: embedFields.category,
          url: embedUrl,
          thumbnailUrl: embedThumbUrl ?? "",
          featured: embedFields.featured,
          published: embedFields.published,
          publishedAt: embedFields.publishedAt
            ? new Date(embedFields.publishedAt).toISOString()
            : null,
        }),
      }),
    onSuccess: () => {
      invalidate();
      setEmbedFields({ ...defaultFields });
      setEmbedUrl("");
      setEmbedThumbUrl(null);
      setEmbedThumbPreview(null);
      setEmbedStatus("Added!");
      setTimeout(() => setEmbedStatus(""), 3000);
    },
    onError: (err: Error) => setEmbedStatus(err.message),
  });

  async function handleEmbedThumbFile(file: File) {
    setEmbedThumbPreview(URL.createObjectURL(file));
    const url = await uploadThumbnail(file, file.name);
    if (url) setEmbedThumbUrl(url);
  }

  // ── List mutations ────────────────────────────────────────────────────────

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

  // ── Drag-drop reorder ─────────────────────────────────────────────────────

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

  // ── Edit dialog ───────────────────────────────────────────────────────────

  const [editing, setEditing] = useState<VideoEntry | null>(null);
  const [editThumbPreview, setEditThumbPreview] = useState<string | null>(null);

  async function handleEditThumbFile(file: File) {
    setEditThumbPreview(URL.createObjectURL(file));
    const url = await uploadThumbnail(file, file.name);
    if (url && editing) setEditing({ ...editing, thumbnail: url });
  }

  // ── Logout ────────────────────────────────────────────────────────────────

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    void refetchAuth();
  }

  // ── Render ────────────────────────────────────────────────────────────────

  if (!authData) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginGate onLogin={() => void refetchAuth()} />;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Video Publisher</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload videos or add YouTube / Vimeo links. Manage your video gallery.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void handleLogout()}
          title="Sign out"
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>

      {/* ── Upload video file ──────────────────────────────────────────── */}
      <section className="mt-8 rounded-xl border border-border bg-card p-5">
        <h2 className="flex items-center gap-2 font-semibold">
          <Upload className="h-4 w-4" /> Upload Video
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {SUPPORTED_FORMATS} · max 1 GB
        </p>

        <MetaFields
          fields={uploadFields}
          onChange={(f) => setUploadFields((prev) => ({ ...prev, ...f }))}
        />

        {/* Thumbnail mode */}
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Cover thumbnail
          </p>
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
            <div className="mt-3">
              <ThumbnailPicker
                preview={uploadThumbPreview}
                onFile={handleCustomThumbFile}
                onClear={() => {
                  setUploadThumbPreview(null);
                  setUploadThumbUrl(null);
                }}
              />
            </div>
          )}
        </div>

        {/* Upload progress bar */}
        {uploadProgress !== null && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">
                Uploading to cloud storage…
              </span>
              <span className="text-xs font-medium">{uploadProgress}%</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-200 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* File picker */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            ref={videoFileRef}
            type="file"
            accept=".mp4,.m4v,.mov,.avi,.mkv,.webm,.ogv,.3gp,.3g2,.wmv,.flv,.f4v,.ts,.m2ts,.mts,video/*"
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
            {uploadMutation.isPending
              ? uploadStatus || "Processing…"
              : "Choose & Upload File"}
          </Button>
          {uploadMutation.isError && (
            <p className="text-sm text-destructive">
              {String(uploadMutation.error)}
            </p>
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

        <div className="mt-4">
          <Input
            placeholder="https://youtube.com/watch?v=… or vimeo.com/…"
            value={embedUrl}
            onChange={(e) => setEmbedUrl(e.target.value)}
          />
        </div>

        <MetaFields
          fields={embedFields}
          onChange={(f) => setEmbedFields((prev) => ({ ...prev, ...f }))}
        />

        {/* Custom thumbnail override */}
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Custom thumbnail{" "}
            <span className="font-normal text-muted-foreground/70">
              (optional — YouTube thumbnail auto-fetched if not set)
            </span>
          </p>
          <ThumbnailPicker
            preview={embedThumbPreview}
            onFile={handleEmbedThumbFile}
            onClear={() => {
              setEmbedThumbPreview(null);
              setEmbedThumbUrl(null);
            }}
            label="Upload thumbnail"
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Button
            disabled={!embedFields.title || !embedUrl || embedMutation.isPending}
            onClick={() => embedMutation.mutate()}
          >
            {embedMutation.isPending ? "Adding…" : "Add Video"}
          </Button>
          {embedMutation.isError && (
            <p className="text-sm text-destructive">
              {String(embedMutation.error)}
            </p>
          )}
          {embedStatus && !embedMutation.isPending && (
            <p className="text-sm text-primary-strong">{embedStatus}</p>
          )}
        </div>
      </section>

      {/* ── Video list ─────────────────────────────────────────────────── */}
      <section className="mt-8">
        <h2 className="mb-3 font-semibold">
          All Videos ({list.length})
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            Drag to reorder · click ★ to feature · click eye to publish/unpublish
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
                    <Play className="h-4 w-4 fill-white text-white opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>

                {/* Meta */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium text-foreground">
                      {video.title}
                    </p>
                    {!video.published && (
                      <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {video.type} · {video.category}
                    {video.duration ? ` · ${video.duration}` : ""}
                    {video.publishedAt
                      ? ` · ${new Date(video.publishedAt).toLocaleDateString()}`
                      : ""}
                  </p>
                </div>

                {/* Publish toggle */}
                <button
                  type="button"
                  title={video.published ? "Unpublish" : "Publish"}
                  onClick={() =>
                    patchMutation.mutate({
                      id: video.id,
                      published: !video.published,
                    })
                  }
                  className={cn(
                    "rounded-md px-2 py-1.5 text-xs font-medium transition-colors border",
                    video.published
                      ? "border-primary/30 bg-primary/10 text-primary-strong hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                      : "border-border text-muted-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-primary-strong",
                  )}
                >
                  {video.published ? "Published" : "Publish"}
                </button>

                {/* Featured */}
                <button
                  type="button"
                  title={video.featured ? "Remove featured" : "Mark as featured"}
                  onClick={() =>
                    patchMutation.mutate({
                      id: video.id,
                      featured: !video.featured,
                    })
                  }
                  className={cn(
                    "rounded-md p-2 transition-colors",
                    video.featured
                      ? "text-primary-strong"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Star
                    className={cn("h-4 w-4", video.featured && "fill-current")}
                  />
                </button>

                {/* Edit */}
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

                {/* Delete */}
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

      {/* ── Edit dialog ─────────────────────────────────────────────────── */}
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

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <label className="block text-sm">
                <span className="text-muted-foreground">Title</span>
                <Input
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                  className="mt-1"
                />
              </label>

              <label className="block text-sm">
                <span className="text-muted-foreground">Description</span>
                <textarea
                  value={editing.description ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                  rows={3}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                />
              </label>

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

              <label className="block text-sm">
                <span className="text-muted-foreground">Publish date</span>
                <input
                  type="datetime-local"
                  value={toDatetimeLocal(editing.publishedAt)}
                  onChange={(e) =>
                    setEditing({ ...editing, publishedAt: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                />
              </label>

              <div className="flex flex-wrap gap-4 text-sm">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editing.featured}
                    onChange={(e) =>
                      setEditing({ ...editing, featured: e.target.checked })
                    }
                    className="accent-primary"
                  />
                  <span>Featured</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editing.published}
                    onChange={(e) =>
                      setEditing({ ...editing, published: e.target.checked })
                    }
                    className="accent-primary"
                  />
                  <span>Published</span>
                </label>
              </div>

              <div className="text-sm">
                <span className="text-muted-foreground">Cover thumbnail</span>
                <div className="mt-2">
                  <ThumbnailPicker
                    preview={editThumbPreview}
                    onFile={handleEditThumbFile}
                    onClear={() => {
                      setEditing({ ...editing, thumbnail: null });
                      setEditThumbPreview(null);
                    }}
                    label={editing.thumbnail ? "Replace thumbnail" : "Upload thumbnail"}
                  />
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
                  featured: editing.featured,
                  published: editing.published,
                  publishedAt: editing.publishedAt,
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
