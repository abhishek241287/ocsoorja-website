import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import fs from "fs";
import { SITE } from "./src/data/site";
import { products, FAMILIES } from "./src/data/products";
import { BRAND, COMPANY, CONTACT, COMPANY_ADDRESS_LINE } from "./src/data/brand";
import { parseFrontmatter, getString } from "./src/lib/frontmatter";
import { parseMarkdownBody, deriveExcerpt, truncateAtWord } from "./src/lib/markdown";

// Reads content/blog/*.md the same way src/data/blog.ts does at runtime, but
// via plain `fs` — vite.config.ts runs in Node, outside Vite's own transform
// pipeline, so `import.meta.glob` (used by src/data/blog.ts in the app) isn't
// available here. Keep the two loaders in sync if the frontmatter contract
// changes; both ultimately call the same pure lib/frontmatter + lib/markdown
// parsers, so the only duplicated logic is "read the directory" + "derive
// title/excerpt/seoTitle/seoDescription fallbacks".
type BlogMeta = {
  slug: string;
  title: string;
  publishDate: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
};

const CONTENT_BLOG_DIR = path.resolve(import.meta.dirname, "content/blog");

function loadBlogMeta(): BlogMeta[] {
  if (!fs.existsSync(CONTENT_BLOG_DIR)) return [];
  return fs
    .readdirSync(CONTENT_BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_BLOG_DIR, file), "utf-8");
      const { data, body } = parseFrontmatter(raw);
      const title = getString(data, "title") ?? slug;
      const parsed = parseMarkdownBody(body);
      const excerpt = getString(data, "excerpt") ?? deriveExcerpt(parsed.sections) ?? title;
      return {
        slug,
        title,
        publishDate: getString(data, "publishDate") ?? "",
        excerpt,
        seoTitle: getString(data, "seoTitle") ?? `${truncateAtWord(title, 55)} | OCS OORJA`,
        seoDescription: getString(data, "seoDescription") ?? truncateAtWord(excerpt, 155),
        image: getString(data, "image") ?? "",
      };
    });
}

const blogPosts = loadBlogMeta();

// Generate public/sitemap.xml from the current routes + product catalog so it
// stays in sync automatically — adding a product never requires editing the
// sitemap. Runs on every `vite` / `vite build` invocation.
function generateSitemap() {
  try {
    type Entry = { path: string; lastmod?: string; changefreq: string; priority: string };
    const entries: Entry[] = [
      { path: "/", changefreq: "weekly", priority: "1.0" },
      { path: "/products", changefreq: "weekly", priority: "0.8" },
      { path: "/blog", changefreq: "weekly", priority: "0.8" },
      { path: "/about", changefreq: "monthly", priority: "0.8" },
      { path: "/contact", changefreq: "monthly", priority: "0.8" },
      ...products.map((p) => ({
        path: `/products/${p.slug}`,
        lastmod: p.dateAdded,
        changefreq: "monthly",
        priority: "0.7",
      })),
      ...blogPosts.map((p) => ({
        path: `/blog/${p.slug}`,
        lastmod: p.publishDate,
        changefreq: "monthly",
        priority: "0.7",
      })),
    ];
    const urls = entries
      .map(
        (e) =>
          `  <url>\n    <loc>${SITE.url}${e.path}</loc>\n${e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : ""}    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
      )
      .join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
    fs.writeFileSync(
      path.resolve(import.meta.dirname, "public/sitemap.xml"),
      xml,
    );
  } catch (err) {
    console.warn("[sitemap] generation skipped:", err);
  }
}

generateSitemap();

// Generate public/llms.txt — a plain-text company overview for AI systems
// (ChatGPT, Perplexity, Claude, Gemini…). Every value comes from the SAME data
// files that feed the website (brand.ts, products/families.ts, blog.ts), so it
// can never drift from the site content and needs zero manual upkeep. Runs on
// every `vite` / `vite build` invocation, exactly like the sitemap above.
function generateLlmsTxt() {
  try {
    // "Last updated" = newest real content date (avoids daily git churn).
    const contentDates = [
      ...products.map((p) => p.dateAdded),
      ...blogPosts.map((p) => p.publishDate),
    ]
      .filter(Boolean)
      .sort();
    const lastUpdated = contentDates[contentDates.length - 1] ?? "";

    const familyLines = [...FAMILIES]
      .sort((a, b) => a.order - b.order)
      .map((f, i) => `${i + 1}. ${f.label} — ${f.description}`)
      .join("\n");

    const socialLabel = (url: string) => {
      if (url.includes("instagram.")) return "Instagram";
      if (url.includes("youtube.")) return "YouTube";
      if (url.includes("linkedin.")) return "LinkedIn";
      if (url.includes("facebook.")) return "Facebook";
      if (url.includes("twitter.") || url.includes("x.com")) return "X (Twitter)";
      return new URL(url).hostname;
    };
    const socialLines = COMPANY.social
      .map((url) => `- ${socialLabel(url)}: ${url}`)
      .join("\n");

    const hours = COMPANY.openingHours;
    const hoursLine = `${hours.dayOfWeek[0]}–${hours.dayOfWeek[hours.dayOfWeek.length - 1]}, ${hours.opens}–${hours.closes} IST`;
    // E.164 phone derived from the single source in CONTACT (same as lib/seo.ts).
    const phone = CONTACT.phoneHref.replace("tel:", "");

    const text = `# ${BRAND.name} — LLM Context File
# Auto-generated from src/data/ (brand.ts, products/, blog.ts) — DO NOT EDIT MANUALLY
# Last updated: ${lastUpdated}

## What is ${BRAND.name}?

${BRAND.positioning}

Legal name: ${COMPANY.legalName}
Headquarters: ${COMPANY.address.city}, ${COMPANY.address.state}, ${COMPANY.address.countryName}
Phone: ${phone}
Email: ${CONTACT.email}
Website: ${SITE.url}

## Core Product Families

${familyLines}

Full catalog: ${SITE.url}/products

## Contact

Phone: ${phone}
Email: ${CONTACT.email}
Address: ${COMPANY_ADDRESS_LINE}
Business hours: ${hoursLine}
Contact page: ${SITE.url}/contact

## Key Pages

- Products: ${SITE.url}/products
- Blog / Knowledge Centre: ${SITE.url}/blog
- About: ${SITE.url}/about
- Contact & quotes: ${SITE.url}/contact

## Important Notes for AI Systems

- Product specifications and availability are subject to change. Always confirm current specifications on the product page or with our team before purchase.
- Pricing is quotation-based; no prices are published on the website. Direct users to the contact page for a quote.
- Installation must be performed by qualified technicians.
- Warranty terms vary by product — check the individual product page.
- EV charger compatibility depends on the vehicle model. Verify before ordering.

## Social Profiles

${socialLines}
`;
    fs.writeFileSync(path.resolve(import.meta.dirname, "public/llms.txt"), text);
  } catch (err) {
    console.warn("[llms.txt] generation skipped:", err);
  }
}

generateLlmsTxt();

// Generate public/rss.xml from content/blog/*.md so the feed can never drift
// from the site content — same pattern as the sitemap/llms.txt above.
function generateRss() {
  try {
    const sorted = [...blogPosts]
      .filter((p) => p.publishDate)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    const escapeXml = (s: string) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
    const items = sorted
      .map((p) => {
        const url = `${SITE.url}/blog/${p.slug}`;
        const pubDate = new Date(`${p.publishDate}T00:00:00Z`).toUTCString();
        return `  <item>\n    <title>${escapeXml(p.title)}</title>\n    <link>${url}</link>\n    <guid>${url}</guid>\n    <pubDate>${pubDate}</pubDate>\n    <description>${escapeXml(p.excerpt)}</description>\n  </item>`;
      })
      .join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel>\n  <title>${escapeXml(BRAND.name)} Blog</title>\n  <link>${SITE.url}/blog</link>\n  <description>${escapeXml(BRAND.positioning)}</description>\n${items}\n</channel></rss>\n`;
    fs.writeFileSync(path.resolve(import.meta.dirname, "public/rss.xml"), xml);
  } catch (err) {
    console.warn("[rss] generation skipped:", err);
  }
}

generateRss();

// Fail-fast validation of content/blog/*.md — catches broken articles at dev
// server start / build time instead of a blank page in the browser. Missing
// required frontmatter throws (build must not ship a broken article); missing
// referenced images and long SEO fields only warn, since they're recoverable.
function validateBlogContent() {
  if (!fs.existsSync(CONTENT_BLOG_DIR)) return;
  const publicDir = path.resolve(import.meta.dirname, "public");
  const files = fs.readdirSync(CONTENT_BLOG_DIR).filter((f) => f.endsWith(".md"));
  const REQUIRED = ["title", "category", "image", "author", "publishDate"];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_BLOG_DIR, file), "utf-8");
    const { data } = parseFrontmatter(raw);

    for (const field of REQUIRED) {
      if (!getString(data, field)) {
        throw new Error(
          `[blog validation] content/blog/${file} is missing required frontmatter field "${field}".`,
        );
      }
    }

    const image = getString(data, "image");
    if (image && !fs.existsSync(path.join(publicDir, image.replace(/^\//, "")))) {
      console.warn(`[blog validation] ${slug}: image "${image}" not found in public/.`);
    }

    const seoTitle = getString(data, "seoTitle");
    if (seoTitle && seoTitle.length > 60) {
      console.warn(
        `[blog validation] ${slug}: seoTitle is ${seoTitle.length} chars (recommended <= 60).`,
      );
    }
    const seoDescription = getString(data, "seoDescription");
    if (seoDescription && seoDescription.length > 160) {
      console.warn(
        `[blog validation] ${slug}: seoDescription is ${seoDescription.length} chars (recommended <= 160).`,
      );
    }

    const publishDate = getString(data, "publishDate");
    if (publishDate && Number.isNaN(new Date(publishDate).getTime())) {
      console.warn(`[blog validation] ${slug}: publishDate "${publishDate}" is not a valid date.`);
    }
  }
}

validateBlogContent();

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
