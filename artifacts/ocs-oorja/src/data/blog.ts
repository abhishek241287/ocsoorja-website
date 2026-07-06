// =============================================================================
// OCS OORJA — Blog articles (SINGLE SOURCE for the blog + homepage teaser)
// =============================================================================
// Non-developers: to PUBLISH A NEW ARTICLE, add ONE entry to `blogPosts` below.
// Nothing else needs editing — the homepage automatically shows the latest
// three, the /blog page lists them all with search + category filters, each
// article gets its own page at /blog/<slug>, and the sitemap updates on the
// next build. The structure supports unlimited articles with zero code changes.
//
//   • slug            — the URL segment: /blog/<slug>. Lowercase words joined
//                       by hyphens; keep it unique and never change it once
//                       published (the old link would break).
//   • title           — the article headline.
//   • excerpt         — a 1–2 sentence summary shown on cards and previews.
//   • category        — a short label (e.g. "Solar"); also drives the filter.
//   • image           — a path under public/ (e.g. "/images/articles/foo.jpg").
//                       Replace the file at that path to change the picture.
//   • author          — who wrote it (shown on the article).
//   • publishDate     — ISO date (YYYY-MM-DD); newest dates appear first.
//   • readingTime     — a friendly estimate, e.g. "5 min read".
//   • seoTitle        — the browser-tab / search-result title.
//   • seoDescription  — the search-result summary (~150 characters).
//   • content         — the article body: an ordered list of sections, each
//                       with an optional `heading` and one or more `paragraphs`.
//   • featured        — OPTIONAL. Set `featured: true` on ONE article to always
//                       pin it as the big featured hero at the top of /blog,
//                       regardless of its date — handy when you publish weekly
//                       and want editorial control. If no article is marked, the
//                       newest one is featured automatically.
// =============================================================================

export type ArticleSection = { heading?: string; paragraphs: string[] };

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
  featured?: boolean; // pin as the /blog featured hero (overrides date order)
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-size-a-solar-inverter",
    title: "How to Size a Hybrid Solar Inverter for Indian Homes",
    excerpt:
      "A practical guide to matching inverter capacity, solar array size and battery bank for reliable day-and-night backup.",
    category: "Solar",
    image: "/images/articles/hybrid-solar-inverter.jpg",
    author: "OCS OORJA Engineering",
    publishDate: "2026-06-18",
    readingTime: "5 min read",
    seoTitle:
      "How to Size a Hybrid Solar Inverter for Indian Homes | OCS OORJA",
    seoDescription:
      "Size a hybrid solar inverter the right way: match inverter capacity, solar array and battery bank for reliable day-and-night backup in Indian homes.",
    content: [
      {
        paragraphs: [
          "A hybrid solar inverter sits at the centre of a modern home power system — it converts DC from your panels and battery into usable AC, charges the battery from solar or the grid, and switches to backup instantly when the mains fail. Get the sizing right and the system runs quietly for years; get it wrong and you either overpay or trip the inverter every time the air-conditioner starts.",
          "The trick is to size in the right order: loads first, then the inverter, then the solar array, and finally the battery.",
        ],
      },
      {
        heading: "1. Start with your load, not the panels",
        paragraphs: [
          "Add up the appliances you actually want to run at the same time during an outage — lights, fans, refrigerator, TV, pump, and any air-conditioners. Note both the continuous wattage and the surge (starting) wattage, because motors and compressors can draw two to three times their rated power for a moment at start-up.",
          "Choose an inverter whose continuous rating comfortably exceeds your simultaneous load, with headroom for surges. A common mistake is sizing to the average load and then being surprised when the fridge and pump start together.",
        ],
      },
      {
        heading: "2. Match the solar array to the MPPT window",
        paragraphs: [
          "Every hybrid inverter has an MPPT (maximum power point tracking) input with a defined voltage and current range. Your panel string must stay inside that window across the full temperature range — panel voltage rises in the cold and falls in the heat.",
          "Size the array to cover your daily energy use plus charging losses, but never exceed the inverter's rated PV input. In most Indian conditions, an array 1.1–1.3× the inverter's AC rating gives a good balance of fast charging and full daytime use.",
        ],
      },
      {
        heading: "3. Right-size the battery bank",
        paragraphs: [
          "Battery capacity decides how long you can run without sun or grid. Multiply the load you want to back up by the number of backup hours, then add margin for inverter efficiency and depth-of-discharge limits.",
          "LiFePO₄ batteries allow deep, repeated discharge without the lifespan penalty of lead-acid, so you get far more usable capacity from the same nameplate rating — which usually means a smaller, lighter bank for the same runtime.",
        ],
      },
      {
        heading: "4. Plan for Indian grid realities",
        paragraphs: [
          "Look for a wide AC input voltage window so the inverter keeps charging during brown-outs instead of dropping to battery. Fast, automatic transfer keeps sensitive electronics from rebooting during a cut, and good thermal design keeps performance stable through peak-summer heat.",
          "When in doubt, talk to an engineer with your load list and location — a ten-minute sizing conversation prevents the most common and expensive mistakes.",
        ],
      },
    ],
  },
  {
    slug: "lifepo4-vs-lead-acid",
    title: "Why LiFePO₄ Batteries Outlast Lead-Acid in Real Duty Cycles",
    excerpt:
      "Cycle life, depth of discharge, safety and total cost of ownership — how lithium iron phosphate compares for solar and backup.",
    category: "Lithium",
    image: "/images/articles/lifepo4-vs-lead-acid.jpg",
    author: "OCS OORJA Engineering",
    publishDate: "2026-06-02",
    readingTime: "6 min read",
    seoTitle:
      "LiFePO₄ vs Lead-Acid: Which Battery Really Costs Less? | OCS OORJA",
    seoDescription:
      "Cycle life, usable capacity, safety and total cost of ownership compared — why LiFePO₄ usually beats lead-acid for solar and backup duty cycles.",
    content: [
      {
        paragraphs: [
          "On the shop floor, lead-acid still looks cheaper per kilowatt-hour. But batteries are bought for the energy they deliver over their life, not their price on day one. Measured that way, lithium iron phosphate (LiFePO₄) is usually the lower-cost and more dependable choice for solar and backup duty.",
        ],
      },
      {
        heading: "Cycle life is the real cost driver",
        paragraphs: [
          "A typical lead-acid battery delivers a few hundred to around a thousand cycles before capacity fades. A quality LiFePO₄ pack delivers several thousand cycles at deeper discharge. Over the life of an installation, one lithium bank often outlasts three or more lead-acid replacements — along with the labour and downtime each swap involves.",
        ],
      },
      {
        heading: "Usable capacity and depth of discharge",
        paragraphs: [
          "Lead-acid should not be discharged much below 50% if you want reasonable life, so half the nameplate capacity is effectively off-limits. LiFePO₄ can be discharged to 80–90% routinely, so a smaller lithium pack can deliver the same usable energy as a much larger lead-acid bank — while weighing a fraction as much.",
        ],
      },
      {
        heading: "Safety and thermal stability",
        paragraphs: [
          "LiFePO₄ chemistry is inherently stable and far more tolerant of heat than other lithium chemistries, which matters in Indian summers. Paired with a proper battery management system (BMS), it protects against over-charge, over-discharge, short circuit and cell imbalance — the failure modes that shorten battery life.",
        ],
      },
      {
        heading: "Total cost of ownership",
        paragraphs: [
          "Add up replacements, maintenance, wasted capacity and efficiency losses and the picture is clear: lead-acid wins on the sticker, LiFePO₄ wins on the invoice you actually pay over five to ten years.",
          "For any application that cycles daily — solar self-consumption, telecom backup, e-mobility — lithium is the pragmatic choice, not just the premium one.",
        ],
      },
    ],
  },
  {
    slug: "ac-vs-dc-ev-charging",
    title: "AC vs DC EV Charging: Choosing the Right Setup",
    excerpt:
      "Understand charging speeds, site requirements and use-cases to pick between AC and DC fast charging for your fleet or facility.",
    category: "EV Charging",
    image: "/images/articles/ac-vs-dc-ev-chargers.jpg",
    author: "OCS OORJA Engineering",
    publishDate: "2026-05-20",
    readingTime: "4 min read",
    seoTitle: "AC vs DC EV Charging: How to Choose the Right Setup | OCS OORJA",
    seoDescription:
      "Compare AC and DC EV charging on speed, cost and site requirements to choose the right charger mix for your home, workplace, fleet or facility.",
    content: [
      {
        paragraphs: [
          '"AC or DC?" is the first question for any EV charging project, and the answer shapes cost, speed and civil work. Both deliver energy to the vehicle — the difference is where the conversion from AC to DC happens.',
        ],
      },
      {
        heading: "How AC and DC charging differ",
        paragraphs: [
          "With AC charging, the charger supplies alternating current and the car's onboard charger converts it to DC for the battery — so speed is capped by the vehicle's onboard charger. With DC fast charging, the conversion happens inside the charger itself, which pushes DC straight into the battery and enables much higher power.",
        ],
      },
      {
        heading: "When AC charging is the right fit",
        paragraphs: [
          "AC chargers are compact, affordable and ideal wherever vehicles park for a while — homes, workplaces, hotels, apartments and overnight fleet depots. They place a modest load on the site's electrical supply and are the most cost-effective way to add many charging points.",
        ],
      },
      {
        heading: "When DC fast charging makes sense",
        paragraphs: [
          "DC fast chargers suit highway corridors, public charging hubs and commercial fleets that need to top up quickly and get moving. They cost more and demand a stronger electrical connection, but they turn a multi-hour charge into a short stop.",
        ],
      },
      {
        heading: "Site and electrical requirements",
        paragraphs: [
          "Before choosing, check your available power, transformer capacity and how long vehicles actually dwell on site. Many locations use a mix — AC for routine top-ups and one or two DC units for quick turnaround.",
          "Sizing the connection correctly from the start avoids expensive upgrades later; our engineers can help match charger type and count to your load and dwell time.",
        ],
      },
    ],
  },
];

// --- Helpers -----------------------------------------------------------------
// Consumers import these; you do NOT need to touch them to add an article.

/** All posts, newest first (by publishDate). */
export function getSortedPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
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

/** Related posts: same category first, then most-recent others. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const others = getSortedPosts().filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const seen = new Set(sameCategory.map((p) => p.slug));
  return [...sameCategory, ...others.filter((p) => !seen.has(p.slug))].slice(
    0,
    limit,
  );
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
