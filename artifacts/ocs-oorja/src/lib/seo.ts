/**
 * SEO Utility - Structured Data and Schema.org markup for better search engine visibility
 */

import { BRAND, CONTACT } from "@/data/brand";
import { SITE } from "@/data/site";

interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  alternateName?: string;
  url: string;
  logo: string;
  description: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  contactPoint: {
    "@type": string;
    telephone: string;
    contactType: string;
    email: string;
    areaServed: string;
    availableLanguage: string[];
  };
  sameAs: string[];
  foundingLocation?: {
    "@type": string;
    address: {
      "@type": string;
      addressLocality: string;
      addressRegion: string;
      addressCountry: string;
    };
  };
  areaServed?: {
    "@type": string;
    name: string;
  };
}

interface LocalBusinessSchema extends OrganizationSchema {
  "@type": "LocalBusiness";
  priceRange?: string;
  openingHours?: string;
}

interface ProductSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image?: string;
  brand: {
    "@type": string;
    name: string;
  };
  manufacturer: {
    "@type": string;
    name: string;
  };
  offers?: {
    "@type": string;
    availability: string;
    priceCurrency: string;
    url: string;
  };
}

/**
 * Generate Organization Schema for OCS OORJA
 */
export function getOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OCS OORJA",
    alternateName: "OCS OORJA Green Energy Solutions",
    url: SITE.url,
    logo: `${SITE.url}/images/OCS_OORJA_logo_landscape.png`,
    description: BRAND.positioning,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Commercial Unit No. 304 on 3rd Floor Royal Plaza, Block-3 in IT Park-2, at Sushant Golf City",
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-75218-03995",
      contactType: "Sales",
      email: CONTACT.email,
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.instagram.com/ocs_oorja",
      "https://www.youtube.com/@ocs_oorja",
    ],
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };
}

/**
 * Generate LocalBusiness Schema for better local SEO
 */
export function getLocalBusinessSchema(): LocalBusinessSchema {
  return {
    ...getOrganizationSchema(),
    "@type": "LocalBusiness",
    priceRange: "₹₹₹",
  };
}

/**
 * Generate Product Schema for a specific product
 */
export function getProductSchema(product: {
  name: string;
  description: string;
  url: string;
  image?: string;
}): ProductSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(product.image ? { image: product.image } : {}),
    brand: {
      "@type": "Brand",
      name: "OCS OORJA",
    },
    manufacturer: {
      "@type": "Organization",
      name: "OCS OORJA",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      url: product.url,
    },
  };
}

/**
 * Generate BreadcrumbList Schema for better navigation understanding
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
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
 * Generate FAQ Schema for FAQ pages
 */
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
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
 * Generate ItemList Schema for a catalogue / listing page
 */
export function getItemListSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
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
 * Generate Article Schema for a blog post
 */
export function getArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  author: string;
  datePublished: string; // ISO date (YYYY-MM-DD)
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    ...(article.image ? { image: article.image } : {}),
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "OCS OORJA",
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/images/OCS_OORJA_logo_landscape.png`,
      },
    },
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    url: article.url,
  };
}

/**
 * Utility to render JSON-LD script tag
 */
export function renderJsonLd(data: object) {
  return {
    __html: JSON.stringify(data),
  };
}
