// Shared, locale-aware formatting helpers used across the site.

/**
 * Format an ISO date (YYYY-MM-DD) into a friendly, India-locale string such as
 * "18 Jun 2026". Falls back to the raw string if the date can't be parsed.
 */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
