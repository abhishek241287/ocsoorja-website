// =============================================================================
// OCS OORJA — Blog articles (SINGLE SOURCE for the blog + homepage teaser)
// =============================================================================
// Non-developers: to PUBLISH A NEW ARTICLE, add ONE Markdown file to
// `content/blog/<url-slug>.md`. Nothing else needs editing — the homepage
// automatically shows the latest three, the /blog page lists them all with
// search + category filters, each article gets its own page at
// /blog/<slug>, and the sitemap/RSS feed update on the next build. The
// easiest way to add an article is the Blog Publisher form (dev workspace
// only, at /blog-publisher), which writes this file for you.
//
// The FILENAME (without .md) becomes the URL slug — keep it unique and never
// rename it once published, or the old link breaks.
//
// Each file starts with a `---` frontmatter block, then the article body in
// Markdown. Frontmatter fields:
//   • title           — the article headline. (required)
//   • category        — a short label (e.g. "Solar"); also drives the filter. (required)
//   • image           — a path under public/ (e.g. "/images/articles/foo.webp"). (required)
//                       Replace the file at that path to change the picture.
//   • author          — who wrote it (shown on the article). (required)
//   • publishDate     — ISO date (YYYY-MM-DD); newest dates appear first. (required)
//   • excerpt         — OPTIONAL 1–2 sentence summary for cards/search results.
//                       Auto-derived from the article's first paragraph if omitted.
//   • seoTitle        — OPTIONAL browser-tab / search-result title.
//                       Auto-derived from the title if omitted.
//   • seoDescription  — OPTIONAL search-result summary (~150 characters).
//                       Auto-derived from the excerpt if omitted.
//   • featured        — OPTIONAL. Set `featured: true` on ONE article to always
//                       pin it as the big featured hero at the top of /blog,
//                       regardless of its date. If no article is marked, the
//                       newest one is featured automatically.
//   • summary         — OPTIONAL 1–3 sentences shown in a highlighted "At a
//                       glance" box near the top of the article.
//   • tags            — OPTIONAL `[tag-one, tag-two]` list used to improve the
//                       automatic "Related articles" picks.
//   • relatedProducts — OPTIONAL `[slug-one, slug-two]` from src/data/products/
//                       shown as "Related products" links inside the article.
//   • relatedArticles — OPTIONAL `[slug-one, slug-two]` to HAND-PICK the
//                       "Related articles" grid (otherwise chosen automatically
//                       by category + shared tags).
//
// Reading time, table of contents, word count and search text are ALL
// computed automatically from the body — never set by hand.
//
// Two heading conventions in the body are auto-extracted into their own
// sections instead of rendering inline (see src/lib/markdown.ts):
//   "## Key Takeaways"                — its bullet list becomes the
//                                        highlighted key-takeaways box.
//   "## FAQ" / "## Frequently Asked…" — **bold** lines are treated as
//                                        questions, the text below each as
//                                        the answer; also emitted as FAQ
//                                        structured data for Google.
// =============================================================================

import {
  parseMarkdownBody,
  deriveExcerpt,
  truncateAtWord,
  type ArticleSection,
  type ArticleFaq,
} from "@/lib/markdown";
import {
  parseFrontmatter,
  getString,
  getBoolean,
  getStringArray,
} from "@/lib/frontmatter";

export type { ArticleSection, ContentBlock } from "@/lib/markdown";
export type BlogFaq = ArticleFaq;

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  publishDate: string; // ISO date (YYYY-MM-DD)
  readingTime: string;
  seoTitle: string;
  seoDescription: string;
  content: ArticleSection[];
  toc: { id: string; text: string }[];
  wordCount: number;
  /** Flattened lowercase text used by the /blog search box. */
  searchText: string;
  featured?: boolean;

  // --- Optional article extras (each renders only when present) -------------
  summary?: string;
  keyTakeaways?: string[];
  faqs?: BlogFaq[];
  relatedProducts?: string[];
  relatedArticles?: string[];
  tags?: string[];
};

const DEFAULT_AUTHOR = "OCS OORJA Green Pvt. Ltd.";
const REQUIRED_FIELDS = ["title", "category", "image", "author", "publishDate"] as const;

const modules = import.meta.glob("/content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function loadPost(filePath: string, raw: string): BlogPost {
  const slug = filePath.replace(/^.*\//, "").replace(/\.md$/, "");
  const { data, body } = parseFrontmatter(raw);

  for (const field of REQUIRED_FIELDS) {
    if (!getString(data, field)) {
      throw new Error(
        `Blog article "content/blog/${slug}.md" is missing required frontmatter field "${field}".`,
      );
    }
  }

  const title = getString(data, "title")!;
  const parsed = parseMarkdownBody(body);
  const excerpt = getString(data, "excerpt") ?? deriveExcerpt(parsed.sections) ?? title;
  const seoTitle = getString(data, "seoTitle") ?? `${truncateAtWord(title, 55)} | OCS OORJA`;
  const seoDescription = getString(data, "seoDescription") ?? truncateAtWord(excerpt, 155);

  const searchText = [
    title,
    excerpt,
    getString(data, "category") ?? "",
    getString(data, "author") ?? "",
    parsed.plainText,
  ]
    .join(" ")
    .toLowerCase();

  return {
    slug,
    title,
    excerpt,
    category: getString(data, "category")!,
    image: getString(data, "image")!,
    author: getString(data, "author") ?? DEFAULT_AUTHOR,
    publishDate: getString(data, "publishDate")!,
    readingTime: parsed.readingTime,
    seoTitle,
    seoDescription,
    content: parsed.sections,
    toc: parsed.toc,
    wordCount: parsed.wordCount,
    searchText,
    featured: getBoolean(data, "featured"),
    summary: getString(data, "summary"),
    keyTakeaways: parsed.keyTakeaways.length > 0 ? parsed.keyTakeaways : undefined,
    faqs: parsed.faqs.length > 0 ? parsed.faqs : undefined,
    relatedProducts: getStringArray(data, "relatedProducts"),
    relatedArticles: getStringArray(data, "relatedArticles"),
    tags: getStringArray(data, "tags"),
  };
}

// Duplicate slugs are impossible by construction: the slug IS the filename,
// and filenames are unique on the filesystem — no runtime check needed.
export const blogPosts: BlogPost[] = Object.entries(modules).map(([filePath, raw]) =>
  loadPost(filePath, raw),
);

// --- Helpers -----------------------------------------------------------------
// Consumers import these; you do NOT need to touch them to add an article.

/** All posts, newest first (by publishDate). */
export function getSortedPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  );
}

/** The newest `count` posts (for the homepage teaser). */
export function getLatestPosts(count: number): BlogPost[] {
  return getSortedPosts().slice(0, count);
}

/** Find a single post by its slug. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/**
 * The article to showcase as the /blog featured hero: the newest post explicitly
 * marked `featured: true`, or — if none is marked — the newest post overall.
 */
export function getFeaturedPost(): BlogPost | undefined {
  const sorted = getSortedPosts();
  return sorted.find((p) => p.featured) ?? sorted[0];
}

/** Unique category labels, in newest-first order of first appearance. */
export function getAllCategories(): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of getSortedPosts()) {
    if (!seen.has(p.category)) {
      seen.add(p.category);
      out.push(p.category);
    }
  }
  return out;
}

/**
 * Related posts, scored by same category (+2) and each shared tag (+1),
 * then most-recent others (relies on stable sort over newest-first input).
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const currentTags = new Set(current.tags ?? []);
  return getSortedPosts()
    .filter((p) => p.slug !== slug)
    .map((post) => {
      let score = post.category === current.category ? 2 : 0;
      score += (post.tags ?? []).filter((t) => currentTags.has(t)).length;
      return { post, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

/** Neighbours in chronological order: `previous` is older, `next` is newer. */
export function getAdjacentPosts(slug: string): {
  previous?: BlogPost;
  next?: BlogPost;
} {
  const sorted = getSortedPosts(); // newest first
  const i = sorted.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return {
    next: i > 0 ? sorted[i - 1] : undefined,
    previous: i < sorted.length - 1 ? sorted[i + 1] : undefined,
  };
}
