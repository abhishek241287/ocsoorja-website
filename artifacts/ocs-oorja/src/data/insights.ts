// =============================================================================
// OCS OORJA — Insights / articles (SINGLE SOURCE for the homepage Insights)
// =============================================================================
// Non-developers: edit the "Latest Insights" cards by editing THIS list.
//
//   • These are placeholder editorial articles. When a real blog/article page
//     exists, set each item's `href` to its URL and the card automatically
//     becomes a link — no code changes required.
//   • date  — ISO date (YYYY-MM-DD); shown to readers in a friendly format.
// =============================================================================

export type Insight = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string; // ISO date (YYYY-MM-DD)
  readingTime?: string;
  href?: string; // set when a real article page exists; card becomes a link
};

export const insights: Insight[] = [
  {
    id: "sizing-hybrid-solar-inverter",
    category: "Solar",
    title: "How to Size a Hybrid Solar Inverter for Indian Homes",
    excerpt:
      "A practical guide to matching inverter capacity, solar array size and battery bank for reliable day-and-night backup.",
    date: "2026-06-18",
    readingTime: "5 min read",
  },
  {
    id: "lifepo4-vs-lead-acid",
    category: "Lithium",
    title: "Why LiFePO₄ Batteries Outlast Lead-Acid in Real Duty Cycles",
    excerpt:
      "Cycle life, depth of discharge, safety and total cost of ownership — how lithium iron phosphate compares for solar and backup.",
    date: "2026-06-02",
    readingTime: "6 min read",
  },
  {
    id: "ac-vs-dc-ev-charging",
    category: "EV Charging",
    title: "AC vs DC EV Charging: Choosing the Right Setup",
    excerpt:
      "Understand charging speeds, site requirements and use-cases to pick between AC and DC fast charging for your fleet or facility.",
    date: "2026-05-20",
    readingTime: "4 min read",
  },
];
