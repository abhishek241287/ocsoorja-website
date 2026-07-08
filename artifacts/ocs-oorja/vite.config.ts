import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import fs from "fs";
import { SITE } from "./src/data/site";
import { products, FAMILIES } from "./src/data/products";
import { blogPosts } from "./src/data/blog";
import { BRAND, COMPANY, CONTACT, COMPANY_ADDRESS_LINE } from "./src/data/brand";

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
