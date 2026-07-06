// =============================================================================
// OCS OORJA — Insights / articles (SINGLE SOURCE for the homepage Insights)
// =============================================================================
// Non-developers: edit the "Latest Insights" articles by editing THIS list.
// Each entry renders one card on the homepage; clicking "Read More" opens the
// full article in an on-page modal (no separate blog page required).
//
//   • image — a path under public/ (e.g. "/images/articles/…jpg"). Replace the
//             file at that path to change the featured picture — no code edit.
//   • body  — the full article, as an ordered list of sections. Each section has
//             an optional `heading` and one or more `paragraphs`.
//   • date  — ISO date (YYYY-MM-DD); shown to readers in a friendly format.
// =============================================================================

export type ArticleSection = { heading?: string; paragraphs: string[] };

export type Insight = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  date: string; // ISO date (YYYY-MM-DD)
  readingTime?: string;
  author?: string;
  body: ArticleSection[];
};

export const insights: Insight[] = [
  {
    id: "sizing-hybrid-solar-inverter",
    category: "Solar",
    title: "How to Size a Hybrid Solar Inverter for Indian Homes",
    excerpt:
      "A practical guide to matching inverter capacity, solar array size and battery bank for reliable day-and-night backup.",
    image: "/images/articles/hybrid-solar-inverter.jpg",
    date: "2026-06-18",
    readingTime: "5 min read",
    author: "OCS OORJA Engineering",
    body: [
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
    id: "lifepo4-vs-lead-acid",
    category: "Lithium",
    title: "Why LiFePO₄ Batteries Outlast Lead-Acid in Real Duty Cycles",
    excerpt:
      "Cycle life, depth of discharge, safety and total cost of ownership — how lithium iron phosphate compares for solar and backup.",
    image: "/images/articles/lifepo4-vs-lead-acid.jpg",
    date: "2026-06-02",
    readingTime: "6 min read",
    author: "OCS OORJA Engineering",
    body: [
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
    id: "ac-vs-dc-ev-charging",
    category: "EV Charging",
    title: "AC vs DC EV Charging: Choosing the Right Setup",
    excerpt:
      "Understand charging speeds, site requirements and use-cases to pick between AC and DC fast charging for your fleet or facility.",
    image: "/images/articles/ac-vs-dc-ev-chargers.jpg",
    date: "2026-05-20",
    readingTime: "4 min read",
    author: "OCS OORJA Engineering",
    body: [
      {
        paragraphs: [
          "\"AC or DC?\" is the first question for any EV charging project, and the answer shapes cost, speed and civil work. Both deliver energy to the vehicle — the difference is where the conversion from AC to DC happens.",
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
