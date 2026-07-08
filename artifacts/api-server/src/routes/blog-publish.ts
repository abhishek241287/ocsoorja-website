import { Router, type IRouter } from "express";
import fs from "node:fs";
import path from "node:path";
import {
  PublishBlogArticleBody,
  type BlogPublishResponse,
  type ErrorResponse,
} from "@workspace/api-zod";

// ---------------------------------------------------------------------------
// Blog Publisher endpoint — DEVELOPMENT WORKSPACE ONLY.
//
// Writes a new article into the website source:
//   1. saves the cover image to  artifacts/ocs-oorja/public/images/articles/
//   2. writes a new Markdown file into artifacts/ocs-oorja/content/blog/
//
// The website loads content/blog/*.md via import.meta.glob at build time
// (see artifacts/ocs-oorja/src/data/blog.ts), so no other file needs editing.
// This route intentionally does NOT compute readingTime/keyTakeaways/faqs/toc
// — those are derived automatically from the Markdown body by the site's
// shared parser (src/lib/markdown.ts), never duplicated here.
//
// This endpoint is useless (and unsafe) in production: it fails closed unless
// NODE_ENV === "development" and the process is not a Replit deployment.
// ---------------------------------------------------------------------------

const router: IRouter = Router();

const IS_DEV_WORKSPACE =
  process.env.NODE_ENV === "development" && !process.env.REPLIT_DEPLOYMENT;

const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB decoded
const DEFAULT_AUTHOR = "OCS OORJA Green Pvt. Ltd.";

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

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

// --- image handling --------------------------------------------------------

const DATA_URL_RE = /^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/;

function decodeImage(
  dataUrl: string,
): { bytes: Buffer; ext: string } | { error: string } {
  const match = DATA_URL_RE.exec(dataUrl);
  if (!match) {
    return { error: "Cover image must be a PNG, JPEG or WebP file." };
  }
  const [, kind, base64] = match;
  let bytes: Buffer;
  try {
    bytes = Buffer.from(base64, "base64");
  } catch {
    return { error: "Cover image data could not be decoded." };
  }
  if (bytes.length === 0) return { error: "Cover image is empty." };
  if (bytes.length > MAX_IMAGE_BYTES) {
    return { error: "Cover image is larger than 8 MB. Please use a smaller file." };
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
    return { error: "Cover image file content does not match its type." };
  }
  const ext = kind === "jpeg" ? "jpg" : kind;
  return { bytes, ext };
}

// --- derived fields ---------------------------------------------------------

function truncateAtWord(s: string, max: number): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > max * 0.6 ? lastSpace : max).trimEnd()}…`;
}

/** First non-empty, non-heading, non-bullet line of the pasted text. */
function deriveFirstParagraph(articleText: string): string {
  const lines = articleText.replace(/\r\n?/g, "\n").split("\n");
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (/^#{1,6}\s+/.test(line)) continue;
    if (/^[-*•]\s+/.test(line)) continue;
    return line;
  }
  return "";
}

function todayISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Mirrors the flat frontmatter grammar parsed by src/lib/frontmatter.ts. */
function quoteFrontmatterValue(s: string): string {
  return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

// --- route -------------------------------------------------------------------

router.post("/blog/publish", async (req, res): Promise<void> => {
  if (!IS_DEV_WORKSPACE) {
    res.status(404).json({ error: "Not found" } satisfies ErrorResponse);
    return;
  }

  const parsed = PublishBlogArticleBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid blog publish request");
    res.status(400).json({
      error: "Please fill in all required fields (title, category, article text, cover image).",
    } satisfies ErrorResponse);
    return;
  }

  const { title, category, articleText, imageDataUrl, excerpt, author } = parsed.data;

  const slug = slugify(title);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    res.status(400).json({
      error: "Could not create a web address from this title. Please use a title with normal words.",
    } satisfies ErrorResponse);
    return;
  }

  const image = decodeImage(imageDataUrl);
  if ("error" in image) {
    res.status(400).json({ error: image.error } satisfies ErrorResponse);
    return;
  }

  const body = articleText.trim();
  if (!body) {
    res.status(400).json({
      error: "The article text appears to be empty. Please paste the article content.",
    } satisfies ErrorResponse);
    return;
  }

  let workspaceRoot: string;
  try {
    workspaceRoot = findWorkspaceRoot();
  } catch (err) {
    req.log.error({ err }, "Blog publish: workspace root not found");
    res.status(500).json({
      error: "Server could not locate the website source files.",
    } satisfies ErrorResponse);
    return;
  }

  const webRoot = path.join(workspaceRoot, "artifacts", "ocs-oorja");
  const contentDir = path.join(webRoot, "content", "blog");
  const imageDir = path.join(webRoot, "public", "images", "articles");
  const imageFile = path.join(imageDir, `${slug}.${image.ext}`);
  const mdFile = path.join(contentDir, `${slug}.md`);

  if (fs.existsSync(mdFile) || fs.existsSync(imageFile)) {
    res.status(409).json({
      error: `An article with the address "${slug}" already exists. Please change the title slightly.`,
    } satisfies ErrorResponse);
    return;
  }

  const finalExcerpt = (excerpt?.trim() || truncateAtWord(deriveFirstParagraph(body), 200)).trim();

  const frontmatterFields: [string, string][] = [
    ["title", title.trim()],
    ["category", category.trim()],
    ["image", `/images/articles/${slug}.${image.ext}`],
    ["author", (author?.trim() || DEFAULT_AUTHOR).trim()],
    ["publishDate", todayISO()],
    ["excerpt", finalExcerpt],
    ["seoTitle", `${truncateAtWord(title.trim(), 55)} | OCS OORJA`],
    ["seoDescription", truncateAtWord(finalExcerpt, 155)],
  ];
  const frontmatter = frontmatterFields
    .map(([key, value]) => `${key}: ${quoteFrontmatterValue(value)}`)
    .join("\n");
  const fileContents = `---\n${frontmatter}\n---\n\n${body}\n`;

  try {
    await fs.promises.mkdir(contentDir, { recursive: true });
    // Image first: if the Markdown write fails we don't end up with a broken entry.
    await fs.promises.writeFile(imageFile, image.bytes);
    await fs.promises.writeFile(mdFile, fileContents, "utf8");
  } catch (err) {
    req.log.error({ err }, "Blog publish: failed to write files");
    // Remove the just-written image so a retry of the same title isn't
    // blocked by the orphan-image duplicate check.
    await fs.promises.unlink(imageFile).catch(() => {});
    res.status(500).json({
      error: "Server could not save the article files.",
    } satisfies ErrorResponse);
    return;
  }

  req.log.info({ slug, category: category.trim() }, "Blog article published");
  res.status(200).json({
    ok: true,
    slug,
    url: `/blog/${slug}`,
  } satisfies BlogPublishResponse);
});

export default router;
