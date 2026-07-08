import { Router, type IRouter } from "express";
import fs from "node:fs";
import path from "node:path";
import {
  PublishGalleryPhotosBody,
  type ErrorResponse,
  type GalleryPublishResponse,
} from "@workspace/api-zod";

// ---------------------------------------------------------------------------
// Gallery Publisher endpoint — DEVELOPMENT WORKSPACE ONLY.
//
// Saves each uploaded photo under
//   artifacts/ocs-oorja/public/images/gallery/<category>/
// and appends a minimal GalleryPhoto entry (category + auto id/slug/
// publishDate only — no other metadata is collected) directly into that
// category's EXISTING data file in artifacts/ocs-oorja/src/data/gallery/.
// Every category already has a file (see src/data/gallery/<category>.ts), so
// this route only ever appends — it never creates a new data file.
//
// This endpoint is useless (and unsafe) in production: it fails closed unless
// NODE_ENV === "development" and the process is not a Replit deployment.
// ---------------------------------------------------------------------------

const router: IRouter = Router();

const IS_DEV_WORKSPACE =
  process.env.NODE_ENV === "development" && !process.env.REPLIT_DEPLOYMENT;

const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB decoded per photo

// category id -> the exported array name in its data file
const CATEGORY_EXPORTS: Record<string, string> = {
  residential: "residential",
  commercial: "commercial",
  industrial: "industrial",
  solar: "solar",
  battery: "battery",
  ev: "ev",
  "hybrid-inverter": "hybridInverter",
  lifepo4: "lifepo4",
};

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

// --- image handling --------------------------------------------------------

const DATA_URL_RE = /^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/;

function decodeImage(
  dataUrl: string,
): { bytes: Buffer; ext: string } | { error: string } {
  const match = DATA_URL_RE.exec(dataUrl);
  if (!match) {
    return { error: "Each photo must be a PNG, JPEG or WebP file." };
  }
  const [, kind, base64] = match;
  let bytes: Buffer;
  try {
    bytes = Buffer.from(base64, "base64");
  } catch {
    return { error: "A photo's data could not be decoded." };
  }
  if (bytes.length === 0) return { error: "One of the photos is empty." };
  if (bytes.length > MAX_IMAGE_BYTES) {
    return { error: "One of the photos is larger than 8 MB. Please use smaller files." };
  }
  const okMagic =
    (kind === "png" &&
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47) ||
    (kind === "jpeg" && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) ||
    (kind === "webp" &&
      bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
      bytes.subarray(8, 12).toString("ascii") === "WEBP");
  if (!okMagic) {
    return { error: "One of the photos' file content does not match its type." };
  }
  const ext = kind === "jpeg" ? "jpg" : kind;
  return { bytes, ext };
}

function todayISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function randomSlugSuffix(): string {
  return Math.random().toString(36).slice(2, 8);
}

// --- route -------------------------------------------------------------------

router.post("/gallery/publish", async (req, res): Promise<void> => {
  if (!IS_DEV_WORKSPACE) {
    res.status(404).json({ error: "Not found" } satisfies ErrorResponse);
    return;
  }

  const parsed = PublishGalleryPhotosBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid gallery publish request");
    res.status(400).json({
      error: "Please choose a category and at least one photo (up to 20).",
    } satisfies ErrorResponse);
    return;
  }

  const { category, images } = parsed.data;
  const exportName = CATEGORY_EXPORTS[category];
  if (!exportName) {
    res.status(400).json({ error: "Unknown category." } satisfies ErrorResponse);
    return;
  }

  const decoded: { bytes: Buffer; ext: string }[] = [];
  for (const dataUrl of images) {
    const image = decodeImage(dataUrl);
    if ("error" in image) {
      res.status(400).json({ error: image.error } satisfies ErrorResponse);
      return;
    }
    decoded.push(image);
  }

  let workspaceRoot: string;
  try {
    workspaceRoot = findWorkspaceRoot();
  } catch (err) {
    req.log.error({ err }, "Gallery publish: workspace root not found");
    res.status(500).json({
      error: "Server could not locate the website source files.",
    } satisfies ErrorResponse);
    return;
  }

  const webRoot = path.join(workspaceRoot, "artifacts", "ocs-oorja");
  const imageDir = path.join(webRoot, "public", "images", "gallery", category);
  const dataFile = path.join(webRoot, "src", "data", "gallery", `${category}.ts`);

  if (!fs.existsSync(dataFile)) {
    req.log.error({ dataFile }, "Gallery publish: category data file missing");
    res.status(500).json({
      error: "Server could not find the data file for this category.",
    } satisfies ErrorResponse);
    return;
  }

  const publishDate = todayISO();
  const timestamp = Date.now();
  const savedFiles: string[] = [];
  const newEntries: string[] = [];

  try {
    await fs.promises.mkdir(imageDir, { recursive: true });

    decoded.forEach((image, i) => {
      const suffix = `${timestamp}-${i}-${randomSlugSuffix()}`;
      const filename = `${category}-${suffix}.${image.ext}`;
      const filePath = path.join(imageDir, filename);
      fs.writeFileSync(filePath, image.bytes);
      savedFiles.push(filePath);

      const id = `${category}-${suffix}`;
      const slug = `${category}-${suffix}`;
      const src = `/images/gallery/${category}/${filename}`;
      const alt = `${category} installation photo`;

      newEntries.push(
        `  {\n` +
          `    id: ${JSON.stringify(id)},\n` +
          `    slug: ${JSON.stringify(slug)},\n` +
          `    src: ${JSON.stringify(src)},\n` +
          `    alt: ${JSON.stringify(alt)},\n` +
          `    category: ${JSON.stringify(category)},\n` +
          `    publishDate: ${JSON.stringify(publishDate)},\n` +
          `  },`,
      );
    });

    const original = await fs.promises.readFile(dataFile, "utf8");
    const arrayRe = new RegExp(
      `(export const ${exportName}: GalleryPhoto\\[\\] = \\[)([\\s\\S]*?)(\\n?\\];)`,
    );
    const match = arrayRe.exec(original);
    if (!match) {
      throw new Error(`Could not find "${exportName}" array in ${dataFile}`);
    }
    const [, head, body, tail] = match;
    const trimmedBody = body.replace(/\s*$/, "");
    const updatedBody = `${trimmedBody}${trimmedBody.trim().length > 0 ? "\n" : ""}${newEntries.join("\n")}\n`;
    const updated = original.replace(arrayRe, `${head}${updatedBody}${tail}`);

    await fs.promises.writeFile(dataFile, updated, "utf8");
  } catch (err) {
    req.log.error({ err }, "Gallery publish: failed to save photos");
    for (const filePath of savedFiles) {
      await fs.promises.unlink(filePath).catch(() => {});
    }
    res.status(500).json({
      error: "Server could not save the photos.",
    } satisfies ErrorResponse);
    return;
  }

  req.log.info({ category, count: decoded.length }, "Gallery photos published");
  res.status(200).json({
    ok: true,
    count: decoded.length,
  } satisfies GalleryPublishResponse);
});

export default router;
