// =============================================================================
// OCS OORJA — Customer testimonials (SINGLE SOURCE)
// =============================================================================
// Non-developers: this ONE file controls the whole "Customer Success" section
// on the homepage — the review cards, the stats bar above them, and the trust
// badges below them.
//
// RULE (permanent): REAL customers only. Never add invented reviews.
//
// Review card fields:
//   • name             — the customer's name.                        (required)
//   • designation      — their job title / role.                     (required)
//   • company          — their organisation.                         (required)
//   • review           — the quote, in their words.                  (required)
//   • rating           — 1–5 stars. Defaults to 5 if omitted.        (optional)
//   • photo            — path under public/ (e.g. "/images/testimonials/
//                        ravi-kumar.jpg"). Omit → clean initials avatar.
//   • city / state     — shown with a map-pin icon when present.     (optional)
//   • productInstalled — e.g. "51.2V 100Ah LiFePO4 pack".            (optional)
//   • installDate      — e.g. "March 2025".                          (optional)
//   • verified         — true shows a "Verified Installation" badge. (optional)
//   • featured         — true makes the card span 2 columns on desktop.
//                        Use on AT MOST one strong testimonial.      (optional)
//
// Stats bar (testimonialStats): shown above the cards. Edit the values freely,
// but keep every claim accurate. Delete all entries to hide the bar.
//
// Trust badges (trustBadges): pills below the cards. `icon` is a lucide icon
// NAME string (currently supported: "CheckCircle" — ask a developer before
// using a new name). Delete all entries to hide the row.
// =============================================================================

export type Testimonial = {
  name: string;
  designation: string;
  company: string;
  review: string;
  photo?: string;
  rating?: number;
  city?: string;
  state?: string;
  productInstalled?: string;
  installDate?: string;
  verified?: boolean;
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Ravi Kumar",
    designation: "Operations Head",
    company: "RideGreen Mobility",
    review:
      "OCS OORJA delivered dependable packs for our e‑rickshaw fleet with excellent service support.",
    rating: 5,
    featured: true,
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

export type TestimonialStat = { value: string; label: string };

export const testimonialStats: TestimonialStat[] = [
  { value: "4.9★", label: "Average Rating" },
  { value: "1000+", label: "Installations" },
  { value: "28", label: "States Covered" },
];

export type TrustBadge = { label: string; icon: string };

export const trustBadges: TrustBadge[] = [
  { label: "ISO 9001 Certified", icon: "CheckCircle" },
  { label: "BIS Approved", icon: "CheckCircle" },
  { label: "MNRE Listed", icon: "CheckCircle" },
  { label: "5-Year Warranty", icon: "CheckCircle" },
];
