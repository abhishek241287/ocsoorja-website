export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  gender: "male" | "female";
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "OCS OORJA delivered dependable packs for our e‑rickshaw fleet with excellent service support.",
    author: "Ravi Kumar",
    role: "Operations Head",
    company: "RideGreen Mobility",
    gender: "male",
  },
  {
    quote:
      "Their ESS batteries have been rock‑solid through peak summers; cycle life exceeded expectations.",
    author: "Pooja Shah",
    role: "Project Manager",
    company: "SunPeak Renewables",
    gender: "female",
  },
  {
    quote:
      "Quick engineering turnaround and quality documentation made our OEM integration smooth.",
    author: "Anand Verma",
    role: "CTO",
    company: "Indus Robotics",
    gender: "male",
  },
];
