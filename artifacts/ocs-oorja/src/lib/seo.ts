/**
 * SEO Utility — Structured Data (JSON-LD / Schema.org) for search engines.
 *
 * ALL company data comes from src/data/brand.ts (BRAND, CONTACT, COMPANY)
 * and src/data/site.ts (SITE). Never hardcode company facts here — edit the
 * data files instead and every schema updates automatically.
 */

import { BRAND, CONTACT, COMPANY } from "@/data/brand";
import { SITE } from "@/data/site";

const SCHEMA_CONTEXT = "https://schema.org";
const LOGO_URL = `${SITE.url}/images/OCS_OORJA_logo_landscape.png`;

/** E.164-style phone derived from the single source in CONTACT. */
const PHONE = CONTACT.phoneHref.replace("tel:", "");

type Schema = Record<string, unknown>;

function getPostalAddress(): Schema {
  return {
    "@type": "PostalAddress",
    streetAddress: `${COMPANY.address.street}, ${COMPANY.address.locality}`,
    addressLocality: COMPANY.address.city,
    addressRegion: COMPANY.address.state,
    postalCode: COMPANY.address.postalCode,
    addressCountry: COMPANY.address.countryCode,
  };
}

function getContactPoints(): Schema[] {
  return COMPANY.contactTypes.map((contactType) => ({
    "@type": "ContactPoint",
    contactType,
    telephone: PHONE,
    email: CONTACT.email,
    areaServed: COMPANY.address.countryCode,
    availableLanguage: ["English", "Hindi"],
  }));
}

/**
 * Organization schema — rendered on the homepage (site-wide identity).
 */
export function getOrganizationSchema(): Schema {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: BRAND.name,
    legalName: COMPANY.legalName,
    url: SITE.url,
    logo: LOGO_URL,
    description: BRAND.positioning,
    telephone: PHONE,
    email: CONTACT.email,
    address: getPostalAddress(),
    contactPoint: getContactPoints(),
    sameAs: [...COMPANY.social],
    areaServed: {
      "@type": "Country",
      name: COMPANY.address.countryName,
    },
  };
}

/**
 * LocalBusiness schema — homepage only. Adds map coordinates and opening
 * hours so the business can appear in local search / maps results.
 */
export function getLocalBusinessSchema(): Schema {
  return {
    ...getOrganizationSchema(),
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#localbusiness`,
    image: `${SITE.url}/opengraph.jpg`, // required by Google for LocalBusiness results
    priceRange: "₹₹₹",
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.latitude,
      longitude: COMPANY.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...COMPANY.openingHours.dayOfWeek],
        opens: COMPANY.openingHours.opens,
        closes: COMPANY.openingHours.closes,
      },
    ],
  };
}

/**
 * Product schema for a specific product page.
 */
export function getProductSchema(product: {
  name: string;
  description: string;
  url: string;
  image?: string;
}): Schema {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Product",
    "@id": `${product.url}#product`,
    name: product.name,
    description: product.description,
    ...(product.image ? { image: product.image } : {}),
    brand: {
      "@type": "Brand",
      name: BRAND.name,
    },
    manufacturer: {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: BRAND.name,
      url: SITE.url,
    },
    countryOfOrigin: {
      "@type": "Country",
      name: COMPANY.address.countryName,
    },
    // NOTE: deliberately NO "offers" block. Pricing is quote-based and no
    // product has a published price. Google requires offers.price — an Offer
    // without a price is a validation error, and inventing prices is worse.
  };
}

/**
 * BreadcrumbList schema — helps search engines display navigation trails.
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>): Schema {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * FAQ schema for pages with question/answer content.
 */
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>): Schema {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * ItemList schema for a catalogue / listing page.
 */
export function getItemListSchema(items: Array<{ name: string; url: string }>): Schema {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

/**
 * Article (BlogPosting) schema for a blog post.
 */
export function getArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  author: string;
  datePublished: string; // ISO date (YYYY-MM-DD)
  dateModified?: string; // ISO date; falls back to datePublished
}): Schema {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BlogPosting",
    "@id": `${article.url}#article`,
    headline: article.title,
    description: article.description,
    ...(article.image ? { image: article.image } : {}),
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: BRAND.name,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    url: article.url,
  };
}

/**
 * Utility to render a JSON-LD script tag.
 */
export function renderJsonLd(data: object) {
  return {
    __html: JSON.stringify(data),
  };
}
