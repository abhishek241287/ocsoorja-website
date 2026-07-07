import { useEffect } from "react";
import { SITE } from "@/data/site";

// -----------------------------------------------------------------------------
// Per-page SEO tags (title, description, canonical, robots, Open Graph).
//
// Every page renders <Seo …/>. On each navigation ALL managed tags are
// re-written — tags a page does not specify fall back to the site-wide
// defaults below, so a value from the previous page can never leak into the
// next one (e.g. a 404 must not keep the previous page's canonical URL).
//
// Defaults are captured once from index.html at startup, so index.html stays
// the single source of the fallback title/description/OG image.
// -----------------------------------------------------------------------------

const DEFAULTS = {
  title: document.title,
  description:
    document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
  robots: "index, follow",
  ogType: "website",
  ogImage:
    document.querySelector('meta[property="og:image"]')?.getAttribute("content") ??
    `${SITE.url}/opengraph.jpg`,
  ogSiteName:
    document.querySelector('meta[property="og:site_name"]')?.getAttribute("content") ??
    "OCS OORJA",
};

function setMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string | null) {
  const existing = document.querySelector('link[rel="canonical"]');
  if (href === null) {
    // noindex pages must not claim a canonical URL
    existing?.remove();
    return;
  }
  let link = existing;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export interface SeoProps {
  title?: string;
  description?: string;
  /** Absolute canonical URL. Defaults to SITE.url + current path. */
  canonical?: string;
  /** e.g. "noindex, nofollow" for 404 / not-found states. */
  robots?: string;
  /** Open Graph type: "website" (default), "article", "product"… */
  ogType?: string;
  /** Absolute URL of the share image. Defaults to the site-wide OG image. */
  ogImage?: string;
}

export function Seo({ title, description, canonical, robots, ogType, ogImage }: SeoProps) {
  useEffect(() => {
    const resolvedTitle = title ?? DEFAULTS.title;
    const resolvedDescription = description ?? DEFAULTS.description;
    const resolvedRobots = robots ?? DEFAULTS.robots;
    const noindex = resolvedRobots.includes("noindex");
    const resolvedCanonical = noindex
      ? null
      : (canonical ?? `${SITE.url}${window.location.pathname}`);
    const ogUrl = resolvedCanonical ?? `${SITE.url}${window.location.pathname}`;

    document.title = resolvedTitle;
    setMetaByName("description", resolvedDescription);
    setMetaByName("robots", resolvedRobots);
    setCanonical(resolvedCanonical);

    setMetaByProperty("og:site_name", DEFAULTS.ogSiteName);
    setMetaByProperty("og:title", resolvedTitle);
    setMetaByProperty("og:description", resolvedDescription);
    setMetaByProperty("og:type", ogType ?? DEFAULTS.ogType);
    setMetaByProperty("og:url", ogUrl);
    setMetaByProperty("og:image", ogImage ?? DEFAULTS.ogImage);
    setMetaByProperty("og:locale", "en_IN");
  }, [title, description, canonical, robots, ogType, ogImage]);

  return null;
}
