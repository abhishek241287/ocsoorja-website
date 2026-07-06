// =============================================================================
// OCS OORJA — Customer testimonials (SINGLE SOURCE)
// =============================================================================
// Non-developers: add a new customer review by adding ONE entry below. Every
// entry becomes a card in the "Customer Success" section on the homepage — all
// cards are always shown, so nothing is hidden.
//
//   • name         — the customer's name.
//   • designation  — their job title / role.
//   • company      — their organisation.
//   • review       — the quote, in their words.
//   • photo        — OPTIONAL path under public/ (e.g. "/images/testimonials/
//                    ravi.jpg"). If omitted, a clean initials avatar is shown.
//   • rating       — OPTIONAL 1–5 star rating. Defaults to 5 if omitted.
// =============================================================================

export type Testimonial = {
  name: string;
  designation: string;
  company: string;
  review: string;
  photo?: string;
  rating?: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Ravi Kumar",
    designation: "Operations Head",
    company: "RideGreen Mobility",
    review:
      "OCS OORJA delivered dependable packs for our e‑rickshaw fleet with excellent service support.",
    rating: 5,
  },
  {
    name: "Pooja Shah",
    designation: "Project Manager",
    company: "SunPeak Renewables",
    review:
      "Their ESS batteries have been rock‑solid through peak summers; cycle life exceeded expectations.",
    rating: 5,
  },
  {
    name: "Anand Verma",
    designation: "CTO",
    company: "Indus Robotics",
    review:
      "Quick engineering turnaround and quality documentation made our OEM integration smooth.",
    rating: 5,
  },
];
