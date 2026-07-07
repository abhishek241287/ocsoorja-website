import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import fs from "fs";
import { SITE } from "./src/data/site";
import { products } from "./src/data/products";
import { blogPosts } from "./src/data/blog";

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
