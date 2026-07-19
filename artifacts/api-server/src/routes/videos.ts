import { Router, type IRouter } from "express";
import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import { db, videosTable } from "@workspace/db";
import { eq, asc, desc, ilike, and, sql } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Video Gallery API
//
// Public:  GET /videos          — paginated list (search, category, featured-first)
//          GET /videos/stream/:filename — HTTP-Range streaming for uploaded files
//
// Dev-only write operations (IS_DEV_WORKSPACE guard):
//          POST   /videos/upload            — multipart video + thumbnail
//          POST   /videos/upload-thumbnail  — multipart thumbnail only
//          POST   /videos/embed             — add YouTube / Vimeo link
//          PATCH  /videos/:id               — edit metadata / replace thumbnail
//          PUT    /videos/reorder           — drag-drop reorder
//          DELETE /videos/:id               — remove row + local file
// ---------------------------------------------------------------------------

const IS_DEV_WORKSPACE =
  process.env.NODE_ENV === "development" && !process.env.REPLIT_DEPLOYMENT;

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

const WORKSPACE = findWorkspaceRoot();
const VIDEO_DIR = path.join(WORKSPACE, "artifacts/api-server/uploads/videos");
const THUMB_DIR = path.join(WORKSPACE, "artifacts/ocs-oorja/public/images/videos");

for (const dir of [VIDEO_DIR, THUMB_DIR]) {
  fs.mkdirSync(dir, { recursive: true });
}

const ALLOWED_VIDEO_EXT = [".mp4", ".mov", ".avi", ".mkv", ".webm"];
const ALLOWED_THUMB_EXT = [".jpg", ".jpeg", ".png", ".webp"];

const VIDEO_MIME: Record<string, string> = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".avi": "video/x-msvideo",
  ".mkv": "video/x-matroska",
};

const videoUpload = multer({
  storage: multer.diskStorage({
    destination: VIDEO_DIR,
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${Date.now()}${ext}`);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1 GB
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_VIDEO_EXT.includes(ext)) cb(null, true);
    else cb(new Error(`Unsupported format. Allowed: ${ALLOWED_VIDEO_EXT.join(", ")}`));
  },
});

const thumbUpload = multer({
  storage: multer.diskStorage({
    destination: THUMB_DIR,
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
      cb(null, `${Date.now()}${ext}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype.toLowerCase();
    if (ALLOWED_THUMB_EXT.includes(ext) || mime.startsWith("image/")) cb(null, true);
    else cb(new Error("Thumbnail must be JPG, PNG, or WebP."));
  },
});

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
      id: yt[1],
      embedUrl: `https://www.youtube.com/embed/${yt[1]}`,
    };

  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm)
    return {
      type: "vimeo",
      id: vm[1],
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

// ── GET /videos ─────────────────────────────────────────────────────────────
router.get("/", async (req, res): Promise<void> => {
  const {
    search = "",
    category = "",
    page = "1",
    limit = "12",
  } = req.query as Record<string, string>;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));

  const conditions = [];
  if (search) conditions.push(ilike(videosTable.title, `%${search}%`));
  if (category && category !== "All")
    conditions.push(eq(videosTable.category, category));

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
  res.json({ videos: rows, total, page: pageNum, hasMore: pageNum * limitNum < total });
});

// ── GET /videos/stream/:filename ─────────────────────────────────────────────
router.get("/stream/:filename", (req, res): void => {
  const filename = path.basename(req.params.filename); // prevent path traversal
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
  const start = parseInt(startStr, 10);
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
});

// ── POST /videos/upload-thumbnail ────────────────────────────────────────────
router.post(
  "/upload-thumbnail",
  (req, res, next) => {
    if (!IS_DEV_WORKSPACE) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    next();
  },
  thumbUpload.single("thumbnail"),
  (req, res): void => {
    if (!req.file) {
      res.status(400).json({ error: "No thumbnail provided" });
      return;
    }
    res.json({ url: `/images/videos/${req.file.filename}` });
  },
);

// ── POST /videos/upload ──────────────────────────────────────────────────────
router.post(
  "/upload",
  (req, res, next) => {
    if (!IS_DEV_WORKSPACE) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    next();
  },
  videoUpload.single("video"),
  async (req, res): Promise<void> => {
    if (!req.file) {
      res.status(400).json({ error: "No video file provided" });
      return;
    }

    const { title, description = "", category = "General", duration = "", thumbnailUrl = "" } =
      req.body as Record<string, string>;

    const filename = req.file.filename;
    const url = `/api/videos/stream/${filename}`;
    const sortOrder = await nextSortOrder();

    const [video] = await db
      .insert(videosTable)
      .values({
        title: title || filename.replace(/\.[^.]+$/, ""),
        description: description || null,
        category,
        type: "upload",
        url,
        thumbnail: thumbnailUrl || null,
        duration: duration || null,
        featured: false,
        sortOrder,
      })
      .returning();

    req.log.info({ id: video?.id, filename }, "Video uploaded");
    res.json(video);
  },
);

// ── POST /videos/embed ───────────────────────────────────────────────────────
router.post("/embed", async (req, res): Promise<void> => {
  if (!IS_DEV_WORKSPACE) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  const {
    title,
    description = "",
    category = "General",
    url,
    thumbnailUrl = "",
  } = req.body as Record<string, string>;

  if (!title || !url) {
    res.status(400).json({ error: "title and url are required" });
    return;
  }

  const parsed = parseVideoUrl(url);
  if (!parsed.type || !parsed.id) {
    res.status(400).json({ error: "Not a valid YouTube or Vimeo URL" });
    return;
  }

  let thumbnail = thumbnailUrl;
  if (!thumbnail) {
    if (parsed.type === "youtube") {
      thumbnail = `https://img.youtube.com/vi/${parsed.id}/hqdefault.jpg`;
    } else {
      thumbnail = await fetchVimeoThumbnail(url);
    }
  }

  const sortOrder = await nextSortOrder();
  const [video] = await db
    .insert(videosTable)
    .values({
      title,
      description: description || null,
      category,
      type: parsed.type,
      url,
      thumbnail: thumbnail || null,
      duration: null,
      featured: false,
      sortOrder,
    })
    .returning();

  req.log.info({ id: video?.id, type: parsed.type }, "Video embed added");
  res.json(video);
});

// ── PATCH /videos/:id ────────────────────────────────────────────────────────
router.patch("/:id", async (req, res): Promise<void> => {
  if (!IS_DEV_WORKSPACE) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  const id = parseInt(req.params.id, 10);
  const { title, description, category, featured, duration, thumbnail } = req.body as Record<
    string,
    string | boolean | undefined
  >;

  const patch: Record<string, unknown> = {};
  if (title !== undefined) patch.title = title;
  if (description !== undefined) patch.description = description || null;
  if (category !== undefined) patch.category = category;
  if (featured !== undefined) patch.featured = featured === true || featured === "true";
  if (duration !== undefined) patch.duration = duration || null;
  if (thumbnail !== undefined) patch.thumbnail = thumbnail || null;

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
router.put("/reorder", async (req, res): Promise<void> => {
  if (!IS_DEV_WORKSPACE) {
    res.status(404).json({ error: "Not found" });
    return;
  }

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
router.delete("/:id", async (req, res): Promise<void> => {
  if (!IS_DEV_WORKSPACE) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  const id = parseInt(req.params.id, 10);
  const [video] = await db
    .delete(videosTable)
    .where(eq(videosTable.id, id))
    .returning();

  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }

  // Delete local video file if it was an upload
  if (video.url.startsWith("/api/videos/stream/")) {
    const filename = path.basename(video.url);
    const filePath = path.join(VIDEO_DIR, filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  // Delete local thumbnail if it's in our images/videos dir
  if (video.thumbnail?.startsWith("/images/videos/")) {
    const filename = path.basename(video.thumbnail);
    const filePath = path.join(THUMB_DIR, filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  req.log.info({ id }, "Video deleted");
  res.json({ ok: true });
});

export default router;
