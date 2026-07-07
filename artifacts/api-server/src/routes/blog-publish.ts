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
//   2. inserts a new entry into  artifacts/ocs-oorja/src/data/blog.ts
//
// The website is statically built, so this endpoint is useless (and unsafe)
// in production: it fails closed unless NODE_ENV === "development" and the
// process is not a Replit deployment.
// ---------------------------------------------------------------------------

const router: IRouter = Router();

const IS_DEV_WORKSPACE =
  process.env.NODE_ENV === "development" && !process.env.REPLIT_DEPLOYMENT;

const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB decoded
const DEFAULT_AUTHOR = "OCS OORJA Green Pvt. Ltd.";
const BLOG_ARRAY_MARKER = "export const blogPosts: BlogPost[] = [";

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

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

// --- article text parsing ---------------------------------------------------

type ArticleSection = { heading?: string; paragraphs: string[] };

function cleanInline(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\(([^)]*)\)/g, "$1") // [text](url) -> text
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/`/g, "")
    .trim();
}

function normalizeForCompare(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function parseArticle(raw: string, title: string): ArticleSection[] {
  const lines = raw.replace(/\r\n?/g, "\n").split("\n");
  const sections: ArticleSection[] = [];
  let current: ArticleSection = { paragraphs: [] };
  let buffer: string[] = [];
  let sawContent = false;

  const flushParagraph = () => {
    if (buffer.length) {
      const p = cleanInline(buffer.join(" "));
      if (p) current.paragraphs.push(p);
      buffer = [];
    }
  };
  const flushSection = () => {
    flushParagraph();
    if (current.paragraphs.length) sections.push(current);
    current = { paragraphs: [] };
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      continue;
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line)) {
      flushParagraph();
      continue; // horizontal rule — ignore
    }
    const heading = /^#{1,6}\s+(.*)$/.exec(line);
    if (heading) {
      const text = cleanInline(heading[1]);
      // Skip a leading heading that just repeats the article title.
      const isTitleDup =
        !sawContent && normalizeForCompare(text) === normalizeForCompare(title);
      flushSection();
      if (!isTitleDup && text) current.heading = text;
      sawContent = true;
      continue;
    }
    const bullet = /^[-*•]\s+(.*)$/.exec(line);
    if (bullet) {
      flushParagraph();
      const b = cleanInline(bullet[1]);
      if (b) current.paragraphs.push(`• ${b}`);
      sawContent = true;
      continue;
    }
    const numbered = /^(\d+)[.)]\s+(.*)$/.exec(line);
    if (numbered) {
      flushParagraph();
      const b = cleanInline(numbered[2]);
      if (b) current.paragraphs.push(`${numbered[1]}. ${b}`);
      sawContent = true;
      continue;
    }
    buffer.push(line);
    sawContent = true;
  }
  flushSection();
  return sections;
}

// --- derived fields ---------------------------------------------------------

function truncateAtWord(s: string, max: number): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > max * 0.6 ? lastSpace : max).trimEnd()}…`;
}

function todayISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
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

  const sections = parseArticle(articleText, title);
  const totalParagraphs = sections.reduce((n, s) => n + s.paragraphs.length, 0);
  if (totalParagraphs === 0) {
    res.status(400).json({
      error: "The article text appears to be empty after formatting. Please paste the article content.",
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
  const blogFile = path.join(webRoot, "src", "data", "blog.ts");
  const imageDir = path.join(webRoot, "public", "images", "articles");
  const imageFile = path.join(imageDir, `${slug}.${image.ext}`);

  let blogSource: string;
  try {
    blogSource = await fs.promises.readFile(blogFile, "utf8");
  } catch (err) {
    req.log.error({ err }, "Blog publish: could not read blog.ts");
    res.status(500).json({
      error: "Server could not read the article list file.",
    } satisfies ErrorResponse);
    return;
  }

  if (!blogSource.includes(BLOG_ARRAY_MARKER)) {
    req.log.error("Blog publish: insertion marker missing in blog.ts");
    res.status(500).json({
      error: "The article list file has an unexpected format. Please ask for help in the chat.",
    } satisfies ErrorResponse);
    return;
  }

  const slugTaken =
    new RegExp(`"?slug"?:\\s*"${escapeRegExp(slug)}"`).test(blogSource) ||
    fs.existsSync(imageFile);
  if (slugTaken) {
    res.status(409).json({
      error: `An article with the address "${slug}" already exists. Please change the title slightly.`,
    } satisfies ErrorResponse);
    return;
  }

  const firstParagraph =
    sections.flatMap((s) => s.paragraphs).find((p) => !p.startsWith("• ")) ??
    sections[0].paragraphs[0];
  const finalExcerpt = (excerpt?.trim() || truncateAtWord(firstParagraph, 200)).trim();
  const words = articleText.split(/\s+/).filter(Boolean).length;

  const entry = {
    slug,
    title: title.trim(),
    excerpt: finalExcerpt,
    category: category.trim(),
    image: `/images/articles/${slug}.${image.ext}`,
    author: (author?.trim() || DEFAULT_AUTHOR).trim(),
    publishDate: todayISO(),
    readingTime: `${Math.max(2, Math.round(words / 200))} min read`,
    seoTitle: `${truncateAtWord(title.trim(), 55)} | OCS OORJA`,
    seoDescription: truncateAtWord(finalExcerpt, 155),
    content: sections,
  };

  // JSON.stringify output is valid TypeScript and injection-safe.
  const entryCode =
    JSON.stringify(entry, null, 2)
      .split("\n")
      .map((line) => `  ${line}`)
      .join("\n") + ",";

  try {
    // Image first: if the blog.ts write fails we don't end up with a broken entry.
    await fs.promises.writeFile(imageFile, image.bytes);
    // Splice via indexOf/slice — never String.replace with a plain replacement
    // string here, because user text containing $-patterns ($&, $', $$ …)
    // would be interpreted as special replacement patterns and corrupt blog.ts.
    const markerEnd = blogSource.indexOf(BLOG_ARRAY_MARKER) + BLOG_ARRAY_MARKER.length;
    const updated =
      blogSource.slice(0, markerEnd) + "\n" + entryCode + blogSource.slice(markerEnd);
    await fs.promises.writeFile(blogFile, updated, "utf8");
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

  req.log.info({ slug, category: entry.category }, "Blog article published");
  res.status(200).json({
    ok: true,
    slug,
    url: `/blog/${slug}`,
  } satisfies BlogPublishResponse);
});

export default router;
