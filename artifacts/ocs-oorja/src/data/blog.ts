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
//   • image           — a path under public/ (e.g. "/images/articles/foo.webp").
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
    "slug": "how-much-can-a-home-solar-battery-system-save-on-electricity-bills",
    "title": "How Much Can a Home Solar + Battery System Save on Electricity Bills?",
    "excerpt": "Learn how a rooftop solar system with LiFePO₄ battery storage can reduce household electricity bills by up to 90%.",
    "category": "Solar",
    "image": "/images/articles/how-much-can-a-home-solar-battery-system-save-on-electricity-bills.png",
    "author": "OCS OORJA Green Pvt. Ltd.",
    "publishDate": "2026-07-07",
    "readingTime": "4 min read",
    "seoTitle": "How Much Can a Home Solar + Battery System Save on… | OCS OORJA",
    "seoDescription": "Learn how a rooftop solar system with LiFePO₄ battery storage can reduce household electricity bills by up to 90%.",
    "content": [
      {
        "paragraphs": [
          "Published by OCS OORJA Green Pvt. Ltd."
        ]
      },
      {
        "paragraphs": [
          "Electricity tariffs across India continue to rise due to increasing fuel costs, infrastructure upgrades, and growing energy demand. For many homeowners, monthly electricity bills have become a significant household expense.",
          "Whether it's running air conditioners during summer, powering home appliances, or charging electric vehicles, electricity consumption is increasing every year.",
          "Fortunately, modern rooftop solar systems combined with lithium battery storage offer homeowners a practical way to reduce electricity bills while ensuring uninterrupted power during outages."
        ],
        "heading": "Rising Electricity Bills Are Becoming a Household Challenge"
      },
      {
        "paragraphs": [
          "A home energy system typically consists of:",
          "• Rooftop solar panels",
          "• Hybrid solar inverter",
          "• LiFePO₄ lithium battery bank",
          "• Battery Management System (BMS)",
          "• Smart monitoring through a mobile app",
          "During the day, solar panels generate electricity to power your home. Any excess energy charges the battery. At night or during power cuts, the battery supplies stored energy to your home automatically.",
          "The result is lower dependence on the electricity grid and greater energy independence."
        ],
        "heading": "What Is a Home Solar + Battery System?"
      },
      {
        "paragraphs": [
          "The amount you save depends on:",
          "• Your monthly electricity consumption",
          "• Local electricity tariff",
          "• Size of your solar system",
          "• Battery capacity",
          "• Roof space",
          "• Sunlight available in your location",
          "Let's look at a practical example."
        ],
        "heading": "How Much Can You Save?"
      },
      {
        "paragraphs": [
          "4–5 Members"
        ],
        "heading": "Family Size"
      },
      {
        "paragraphs": [
          "700 Units (kWh)"
        ],
        "heading": "Monthly Electricity Consumption"
      },
      {
        "paragraphs": [
          "₹8 per Unit"
        ],
        "heading": "Average Electricity Tariff"
      },
      {
        "paragraphs": [
          "700 × ₹8 = ₹5,600"
        ],
        "heading": "Monthly Electricity Bill"
      },
      {
        "paragraphs": [
          "₹5,600 × 12 = ₹67,200"
        ],
        "heading": "Annual Electricity Cost"
      },
      {
        "paragraphs": [
          "• 5 kW Rooftop Solar",
          "• 10 kWh LiFePO₄ Battery",
          "• Hybrid Solar Inverter",
          "Under good sunlight conditions, this system can generate approximately 18–22 units of electricity per day, depending on location, season, and system efficiency.",
          "This significantly offsets grid electricity consumption while providing backup power during outages."
        ],
        "heading": "Recommended System"
      },
      {
        "paragraphs": [
          "With efficient energy usage, many homeowners can reduce their grid electricity consumption by 60% to 90%."
        ],
        "heading": "Estimated Savings"
      },
      {
        "paragraphs": [
          "• Monthly Electricity Bill: ₹5,600"
        ],
        "heading": "Before Installing Solar"
      },
      {
        "paragraphs": [
          "• Remaining Grid Bill: ₹800–₹2,000"
        ],
        "heading": "After Installing Solar + Battery"
      },
      {
        "paragraphs": [
          "• ₹3,600–₹4,800"
        ],
        "heading": "Estimated Monthly Savings"
      },
      {
        "paragraphs": [
          "• ₹43,000–₹58,000",
          "> Note: Actual savings vary depending on electricity usage, weather conditions, system size, battery capacity, and local electricity tariffs."
        ],
        "heading": "Estimated Annual Savings"
      },
      {
        "paragraphs": [
          "Unlike conventional rooftop solar systems that shut down during a power outage for safety reasons, a hybrid solar system with battery storage can continue powering essential household loads.",
          "Typical appliances that can continue operating include:",
          "• Lights",
          "• Ceiling Fans",
          "• Wi-Fi Router",
          "• Television",
          "• Refrigerator",
          "• Laptops",
          "• CCTV & Security Systems",
          "• Selected Air Conditioners (depending on inverter capacity)",
          "For areas with frequent power cuts, battery backup provides significant value beyond electricity bill savings."
        ],
        "heading": "Backup Power During Electricity Outages"
      },
      {
        "paragraphs": [
          "Modern Lithium Iron Phosphate (LiFePO₄) batteries offer several advantages over traditional lead-acid batteries."
        ],
        "heading": "Why Choose LiFePO₄ Batteries?"
      },
      {
        "paragraphs": [
          "• Longer service life",
          "• Faster charging",
          "• Higher usable capacity",
          "• Maintenance-free operation",
          "• Better energy efficiency",
          "• Lightweight design",
          "• Enhanced safety and thermal stability",
          "These advantages make LiFePO₄ batteries an ideal choice for residential solar energy storage."
        ],
        "heading": "Benefits"
      },
      {
        "paragraphs": [
          "Yes.",
          "A properly designed residential solar + battery system can also support EV charging.",
          "Whether you own:",
          "• Electric Scooter",
          "• Electric Car",
          "• E-rickshaw",
          "solar energy can significantly reduce charging costs while increasing the overall return on investment."
        ],
        "heading": "Can You Charge an Electric Vehicle Too?"
      },
      {
        "paragraphs": [
          "For many homeowners, the benefits include:",
          "• Lower monthly electricity bills",
          "• Protection against rising electricity tariffs",
          "• Reliable backup power",
          "• Greater energy independence",
          "• Reduced carbon footprint",
          "• Increased property value",
          "• Better long-term return on investment (ROI)",
          "Where government incentives or subsidies are available, the financial benefits can become even more attractive."
        ],
        "heading": "Is It Worth the Investment?"
      },
      {
        "paragraphs": [
          "Every home has unique energy requirements.",
          "A professional assessment should consider:",
          "• Monthly electricity consumption",
          "• Peak load requirements",
          "• Roof area available",
          "• Desired backup duration",
          "• Future plans such as EV charging or additional appliances",
          "Choosing the correct system size ensures maximum efficiency and long-term savings."
        ],
        "heading": "Choosing the Right System Size"
      },
      {
        "paragraphs": [
          "A home solar + battery system is much more than a way to reduce electricity bills—it is an investment in energy security, sustainability, and long-term financial savings.",
          "As electricity costs continue to rise and renewable energy becomes increasingly accessible, homeowners who adopt solar with battery storage gain lower operating costs, dependable backup power, and greater control over their energy future.",
          "Whether you're building a new home or upgrading an existing one, now is an excellent time to explore how solar and lithium battery technology can work for you."
        ],
        "heading": "Conclusion"
      },
      {
        "paragraphs": [
          "OCS OORJA Green Pvt. Ltd. provides advanced clean-energy solutions including:",
          "• Hybrid Solar Inverters",
          "• LiFePO₄ Lithium Battery Systems",
          "• Battery Management Systems (BMS)",
          "• EV Charging Solutions",
          "• Smart Energy Monitoring Platforms",
          "We help homeowners, businesses, industries, and institutions transition to reliable, efficient, and sustainable energy solutions."
        ],
        "heading": "About OCS OORJA"
      }
    ]
  },
  {
    slug: "delhi-ev-policy-2026",
    title:
      "Delhi EV Policy 2026: Why the Shift to Electric Vehicles Is No Longer Optional",
    excerpt:
      "Delhi's new EV policy, the road from BS6 to E20, and why consumers, businesses and fleet operators should plan their electric transition now.",
    category: "EV Policy",
    image: "/images/articles/delhi-ev-policy-2026.webp",
    author: "OCS OORJA Green Pvt. Ltd.",
    publishDate: "2026-07-07",
    readingTime: "6 min read",
    seoTitle:
      "Delhi EV Policy 2026: Why EVs Are No Longer Optional | OCS OORJA",
    seoDescription:
      "Delhi's EV Policy 2026 explained — incentives, charging infrastructure and phase-out timelines, plus why businesses and fleets should plan their EV transition now.",
    content: [
      {
        heading: "A new chapter in India's clean mobility journey",
        paragraphs: [
          "Delhi has once again taken a bold step toward cleaner transportation with the implementation of its new EV Policy 2026. The policy aims to accelerate electric vehicle adoption, reduce air pollution, and make electric mobility more affordable through incentives, tax benefits, and expanded charging infrastructure. It also introduces timelines that will gradually phase out new registrations of certain petrol and CNG vehicles in favor of electric alternatives. The policy is effective from July 1, 2026, and is expected to remain in force until March 31, 2030.",
          "For consumers and businesses, the message is clear: the future of mobility is electric.",
        ],
      },
      {
        heading: "From BS6 to E20: a pattern of change",
        paragraphs: [
          "India's automobile industry has undergone rapid transformation over the past decade. BS4 vehicles were replaced by BS6, ethanol-blended E10 fuel became common, and E20 petrol is now being introduced across India — with manufacturers redesigning engines to support higher ethanol blends. Now, major cities are actively encouraging electric mobility. Each policy has pushed the market toward cleaner transportation.",
          "The transition from conventional petrol to E20 was not merely a fuel change — it required automobile manufacturers to redesign engines, fuel systems, and calibration to ensure compatibility with higher ethanol content. This demonstrated how government policy can reshape an entire industry.",
        ],
      },
      {
        heading: "Understanding E20 petrol",
        paragraphs: [
          "E20 petrol contains 20% ethanol blended with conventional petrol. The government's objectives include reducing crude oil imports, supporting Indian farmers through ethanol production, lowering carbon emissions, and improving national energy security.",
          "However, E20 is still an internal combustion fuel. While it reduces emissions compared to conventional petrol, it does not eliminate tailpipe emissions. Electric vehicles represent the next step in this evolution by removing tailpipe emissions entirely.",
        ],
      },
      {
        heading: "Delhi EV Policy 2026: what has changed?",
        paragraphs: [
          "Key highlights include road tax and registration benefits for eligible electric vehicles, purchase incentives for various EV categories, scrappage incentives for replacing older vehicles with EVs, expansion of public charging infrastructure, and a progressive transition of new registrations toward electric two-wheelers, three-wheelers, and commercial vehicles over the coming years.",
          "The policy signals that electric mobility is becoming a long-term strategic direction rather than a short-term incentive program.",
        ],
      },
      {
        heading: "The evolution of Indian mobility",
        paragraphs: [
          "Phase 1 — the conventional petrol era. For decades, petrol and diesel vehicles dominated Indian roads, bringing rising fuel prices, urban air pollution, and heavy dependence on imported crude oil.",
          "Phase 2 — cleaner fuels. Government initiatives introduced BS6 emission standards, ethanol blending (E10 and E20), and improved engine efficiency. These measures significantly reduced emissions but still relied on fossil-fuel-based transportation.",
          "Phase 3 — electric mobility. Electric vehicles eliminate many of the traditional challenges: no tailpipe emissions, lower running costs, reduced maintenance due to fewer moving parts, higher energy efficiency, and compatibility with renewable energy sources such as rooftop solar. As battery technology improves and charging infrastructure expands, EVs are becoming a practical choice for both personal and commercial transportation.",
        ],
      },
      {
        heading: "Why businesses should prepare now",
        paragraphs: [
          "Companies operating fleets, delivery vehicles, commercial transport, or e-rickshaws should begin planning for electrification. The advantages include lower operating costs, reduced maintenance expenses, better compliance with future environmental regulations, improved ESG and sustainability credentials, and greater protection from fuel price volatility.",
          "Waiting until regulations become mandatory may increase transition costs.",
        ],
      },
      {
        heading: "The opportunity for renewable energy",
        paragraphs: [
          "Electric mobility creates new opportunities beyond transportation. Businesses can integrate solar power generation, lithium battery energy storage, smart battery management systems (BMS), EV charging infrastructure, and energy monitoring platforms. Together, these technologies reduce dependence on conventional fuels while improving operational efficiency.",
        ],
      },
      {
        heading: "The road ahead",
        paragraphs: [
          "The journey from BS4 to BS6, from conventional petrol to E20, and now toward electric mobility illustrates a consistent direction in India's energy policy. Electric vehicles are no longer just an environmental choice — they are becoming an economic and strategic one.",
          "For consumers, businesses, and fleet operators, the question is shifting from \u201cShould we adopt EVs?\u201d to \u201cWhen should we begin the transition?\u201d Those who plan early will be better positioned to benefit from lower operating costs, supportive policies, and the growing clean-energy ecosystem.",
          "OCS OORJA Green Pvt. Ltd. develops clean-energy solutions including LiFePO\u2084 lithium battery systems, hybrid solar inverters, battery management systems, and EV charging solutions — helping individuals and businesses transition to a smarter, cleaner, and more sustainable energy future.",
        ],
      },
    ],
  },
  {
    slug: "how-to-size-a-solar-inverter",
    title: "How to Size a Hybrid Solar Inverter for Indian Homes",
    excerpt:
      "A practical guide to matching inverter capacity, solar array size and battery bank for reliable day-and-night backup.",
    category: "Solar",
    image: "/images/articles/hybrid-solar-inverter.webp",
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
    image: "/images/articles/lifepo4-vs-lead-acid.webp",
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
    image: "/images/articles/ac-vs-dc-ev-chargers.webp",
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
