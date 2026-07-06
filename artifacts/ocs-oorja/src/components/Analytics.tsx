import { useEffect } from "react";
import { useLocation } from "wouter";
import { SITE } from "@/data/site";

// Loads Google Analytics 4 (gtag) and the Search Console verification meta tag
// ONLY when their values are filled in `src/data/site.ts`. Both stay OFF while
// the corresponding config value is an empty string. Also records a page view
// on every in-app route change (single-page-app navigation).
export function Analytics() {
  const [location] = useLocation();

  // One-time: inject the Search Console "HTML tag" verification meta.
  useEffect(() => {
    const token = SITE.googleSiteVerification;
    if (!token) return;
    if (document.querySelector('meta[name="google-site-verification"]')) return;
    const meta = document.createElement("meta");
    meta.setAttribute("name", "google-site-verification");
    meta.setAttribute("content", token);
    document.head.appendChild(meta);
  }, []);

  // One-time: load and initialise GA4.
  useEffect(() => {
    const id = SITE.ga4MeasurementId;
    if (!id || document.getElementById("ga4-src")) return;

    const lib = document.createElement("script");
    lib.id = "ga4-src";
    lib.async = true;
    lib.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(lib);

    const init = document.createElement("script");
    init.id = "ga4-init";
    init.innerHTML =
      `window.dataLayer=window.dataLayer||[];` +
      `function gtag(){dataLayer.push(arguments);}` +
      `gtag('js',new Date());` +
      `gtag('config','${id}',{send_page_view:false});`;
    document.head.appendChild(init);
  }, []);

  // Track a page view on each route change (initial load included).
  useEffect(() => {
    if (!SITE.ga4MeasurementId) return;
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag !== "function") return;
    w.gtag("event", "page_view", {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);

  return null;
}
