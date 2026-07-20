import { Router, type IRouter } from "express";
import fs from "node:fs";
import path from "node:path";
import { db, videosTable } from "@workspace/db";
import { eq, asc, desc, ilike, and, sql } from "drizzle-orm";
import { requireAdmin, isAdminAuthenticated } from "../lib/adminAuth";

// ---------------------------------------------------------------------------
// Video Gallery API
//
// Public:
//   GET  /videos          — paginated list (published only; all if admin cookie)
//   GET  /videos/stream/:filename — backward-compat streaming for old local files
//
// Admin-only (requireAdmin):
//   POST   /videos/upload    — register a GCS-uploaded video in the DB
//   POST   /videos/embed     — add a YouTube / Vimeo link
//   PATCH  /videos/:id       — edit metadata
//   PUT    /videos/reorder   — drag-drop reorder
//   DELETE /videos/:id       — remove DB row + local/GCS cleanup
// ---------------------------------------------------------------------------

// ── Supported video formats (informational) ──────────────────────────────────
export const ALLOWED_VIDEO_FORMATS = [
  ".mp4",
  ".m4v",
  ".mov",
  ".avi",
  ".mkv",
  ".webm",
  ".ogv",
  ".3gp",
  ".3g2",
  ".wmv",
  ".flv",
  ".f4v",
  ".ts",
  ".m2ts",
  ".mts",
  ".mxf",
];

// Legacy local-disk support (kept for backward compat only)
function findWorkspaceRoot(): string {
  let dir = process.cwd();
  for (let i = 0; i < 10; i++) {
    if (fs.existsSync(path.join(dir, "pnpm-workspace.yaml"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error("Could not locate workspace root (pnpm-workspace.yaml)");
}

const VIDEO_MIME: Record<string, string> = {
  ".mp4": "video/mp4",
  ".m4v": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".avi": "video/x-msvideo",
  ".mkv": "video/x-matroska",
  ".ogv": "video/ogg",
  ".3gp": "video/3gpp",
  ".3g2": "video/3gpp2",
  ".wmv": "video/x-ms-wmv",
  ".flv": "video/x-flv",
  ".ts": "video/mp2t",
  ".m2ts": "video/mp2t",
  ".mts": "video/mp2t",
};

function parseVideoUrl(url: string): {
  type: "youtube" | "vimeo" | null;
  embedUrl: string | null;
  id: string | null;
} {
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/,
  );
  if (yt)
    return {
      type: "youtube",
      id: yt[1]!,
      embedUrl: `https://www.youtube.com/embed/${yt[1]}`,
    };

  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm)
    return {
      type: "vimeo",
      id: vm[1]!,
      embedUrl: `https://player.vimeo.com/video/${vm[1]}`,
    };

  return { type: null, id: null, embedUrl: null };
}

async function fetchVimeoThumbnail(url: string): Promise<string> {
  try {
    const r = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`,
    );
    if (r.ok) {
      const data = (await r.json()) as { thumbnail_url?: string };
      return data.thumbnail_url ?? "";
    }
  } catch {
    /* thumbnail is optional */
  }
  return "";
}

async function nextSortOrder(): Promise<number> {
  const [row] = await db
    .select({ max: sql<number>`coalesce(max(sort_order), -1)` })
    .from(videosTable);
  return (row?.max ?? -1) + 1;
}

const router: IRouter = Router();

// ── GET /videos ──────────────────────────────────────────────────────────────
// Returns published videos to the public; returns ALL videos to admins.
router.get("/", async (req, res): Promise<void> => {
  const {
    search = "",
    category = "",
    page = "1",
    limit = "12",
  } = req.query as Record<string, string>;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
  const isAdmin = isAdminAuthenticated(req);

  const conditions = [];
  if (search) conditions.push(ilike(videosTable.title, `%${search}%`));
  if (category && category !== "All")
    conditions.push(eq(videosTable.category, category));
  // Non-admins only see published videos
  if (!isAdmin) conditions.push(eq(videosTable.published, true));

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [rows, countRows] = await Promise.all([
    db
      .select()
      .from(videosTable)
      .where(where)
      .orderBy(
        desc(videosTable.featured),
        asc(videosTable.sortOrder),
        desc(videosTable.createdAt),
      )
      .limit(limitNum)
      .offset((pageNum - 1) * limitNum),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(videosTable)
      .where(where),
  ]);

  const total = countRows[0]?.count ?? 0;
  res.json({
    videos: rows,
    total,
    page: pageNum,
    hasMore: pageNum * limitNum < total,
  });
});

// ── GET /videos/stream/:filename — legacy local-disk streaming ───────────────
// Kept for backward compat. New uploads go to GCS and are served via
// GET /api/storage/objects/*.
router.get("/stream/:filename", (req, res): void => {
  try {
    const WORKSPACE = findWorkspaceRoot();
    const VIDEO_DIR = path.join(
      WORKSPACE,
      "artifacts/api-server/uploads/videos",
    );
    const filename = path.basename(req.params.filename);
    const filePath = path.join(VIDEO_DIR, filename);

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: "Video not found" });
      return;
    }

    const stat = fs.statSync(filePath);
    const ext = path.extname(filename).toLowerCase();
    const contentType = VIDEO_MIME[ext] ?? "application/octet-stream";
    const range = req.headers.range;

    if (!range) {
      res.writeHead(200, {
        "Content-Length": stat.size,
        "Content-Type": contentType,
        "Accept-Ranges": "bytes",
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
    const start = parseInt(startStr!, 10);
    const end = endStr ? parseInt(endStr, 10) : stat.size - 1;

    if (start >= stat.size) {
      res.status(416).set("Content-Range", `bytes */${stat.size}`).end();
      return;
    }

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${stat.size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": contentType,
    });
    fs.createReadStream(filePath, { start, end }).pipe(res);
  } catch {
    res.status(500).json({ error: "Stream error" });
  }
});

// ── POST /videos/upload ──────────────────────────────────────────────────────
// Registers a video that was already uploaded to GCS via presigned URL.
// Body: { title, description, category, objectPath, thumbnailUrl, duration,
//         featured, published, publishedAt }
router.post("/upload", requireAdmin, async (req, res): Promise<void> => {
  const {
    title,
    description = "",
    category = "General",
    objectPath,
    thumbnailUrl = "",
    duration = "",
    featured = false,
    published = false,
    publishedAt,
  } = req.body as Record<string, string | boolean | undefined>;

  if (!title || !objectPath) {
    res.status(400).json({ error: "title and objectPath are required" });
    return;
  }

  const sortOrder = await nextSortOrder();

  const [video] = await db
    .insert(videosTable)
    .values({
      title: String(title),
      description: description ? String(description) : null,
      category: String(category),
      type: "upload",
      url: String(objectPath),
      thumbnail: thumbnailUrl ? String(thumbnailUrl) : null,
      duration: duration ? String(duration) : null,
      featured: featured === true || featured === "true",
      published: published === true || published === "true",
      publishedAt: publishedAt ? new Date(String(publishedAt)) : null,
      sortOrder,
    })
    .returning();

  req.log.info({ id: video?.id }, "Video registered from GCS upload");
  res.json(video);
});

// ── POST /videos/embed ───────────────────────────────────────────────────────
router.post("/embed", requireAdmin, async (req, res): Promise<void> => {
  const {
    title,
    description = "",
    category = "General",
    url,
    thumbnailUrl = "",
    featured = false,
    published = false,
    publishedAt,
  } = req.body as Record<string, string | boolean | undefined>;

  if (!title || !url) {
    res.status(400).json({ error: "title and url are required" });
    return;
  }

  const parsed = parseVideoUrl(String(url));
  if (!parsed.type || !parsed.id) {
    res.status(400).json({ error: "Not a valid YouTube or Vimeo URL" });
    return;
  }

  let thumbnail = String(thumbnailUrl);
  if (!thumbnail) {
    if (parsed.type === "youtube") {
      thumbnail = `https://img.youtube.com/vi/${parsed.id}/hqdefault.jpg`;
    } else {
      thumbnail = await fetchVimeoThumbnail(String(url));
    }
  }

  const sortOrder = await nextSortOrder();
  const [video] = await db
    .insert(videosTable)
    .values({
      title: String(title),
      description: description ? String(description) : null,
      category: String(category),
      type: parsed.type,
      url: String(url),
      thumbnail: thumbnail || null,
      duration: null,
      featured: featured === true || featured === "true",
      published: published === true || published === "true",
      publishedAt: publishedAt ? new Date(String(publishedAt)) : null,
      sortOrder,
    })
    .returning();

  req.log.info({ id: video?.id, type: parsed.type }, "Video embed added");
  res.json(video);
});

// ── PATCH /videos/:id ────────────────────────────────────────────────────────
router.patch("/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  const {
    title,
    description,
    category,
    featured,
    duration,
    thumbnail,
    published,
    publishedAt,
  } = req.body as Record<string, string | boolean | undefined>;

  const patch: Record<string, unknown> = {};
  if (title !== undefined) patch.title = title;
  if (description !== undefined) patch.description = description || null;
  if (category !== undefined) patch.category = category;
  if (featured !== undefined)
    patch.featured = featured === true || featured === "true";
  if (duration !== undefined) patch.duration = duration || null;
  if (thumbnail !== undefined) patch.thumbnail = thumbnail || null;
  if (published !== undefined)
    patch.published = published === true || published === "true";
  if (publishedAt !== undefined)
    patch.publishedAt = publishedAt ? new Date(String(publishedAt)) : null;

  if (Object.keys(patch).length === 0) {
    res.status(400).json({ error: "No fields to update" });
    return;
  }

  const [video] = await db
    .update(videosTable)
    .set(patch)
    .where(eq(videosTable.id, id))
    .returning();

  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }
  res.json(video);
});

// ── PUT /videos/reorder ──────────────────────────────────────────────────────
router.put("/reorder", requireAdmin, async (req, res): Promise<void> => {
  const { orderedIds } = req.body as { orderedIds: number[] };
  if (!Array.isArray(orderedIds)) {
    res.status(400).json({ error: "orderedIds must be an array" });
    return;
  }

  await db.transaction(async (tx) => {
    for (let i = 0; i < orderedIds.length; i++) {
      await tx
        .update(videosTable)
        .set({ sortOrder: i })
        .where(eq(videosTable.id, orderedIds[i]!));
    }
  });

  res.json({ ok: true });
});

// ── DELETE /videos/:id ───────────────────────────────────────────────────────
router.delete("/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  const [video] = await db
    .delete(videosTable)
    .where(eq(videosTable.id, id))
    .returning();

  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }

  // Clean up legacy local video file if present
  if (video.url.startsWith("/api/videos/stream/")) {
    try {
      const WORKSPACE = findWorkspaceRoot();
      const VIDEO_DIR = path.join(
        WORKSPACE,
        "artifacts/api-server/uploads/videos",
      );
      const filename = path.basename(video.url);
      const filePath = path.join(VIDEO_DIR, filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch {
      /* non-fatal */
    }
  }

  req.log.info({ id }, "Video deleted");
  res.json({ ok: true });
});

export default router;
