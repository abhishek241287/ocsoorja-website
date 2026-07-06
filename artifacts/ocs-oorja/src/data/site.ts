// =============================================================================
// OCS OORJA — Site-wide technical configuration (SINGLE SOURCE)
// =============================================================================
// Non-developers: this file holds a few site-wide settings. Paste the values
// Google gives you and the features switch on automatically — no other edit is
// needed anywhere. Leave a value as an empty string ("") to keep it OFF.
// =============================================================================

export const SITE = {
  // The site's public address. Used for canonical URLs and the sitemap.
  // No trailing slash.
  url: "https://www.ocsoorja.com",

  // Google Analytics 4 Measurement ID, e.g. "G-XXXXXXXXXX".
  // Find it in Google Analytics → Admin → Data streams → your web stream.
  // Leave "" to keep analytics OFF.
  ga4MeasurementId: "",

  // Google Search Console verification token — the value inside the
  // <meta name="google-site-verification" content="…"> tag Google gives you
  // when you choose the "HTML tag" method. Leave "" if you verified another
  // way (e.g. through Google Analytics or a DNS record).
  googleSiteVerification: "",
} as const;
