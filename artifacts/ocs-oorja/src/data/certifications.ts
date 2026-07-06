// =============================================================================
// OCS OORJA — Certifications & standards (SINGLE SOURCE for the homepage strip)
// =============================================================================
// Non-developers: edit the certification cards by editing THIS list.
//   • name  — shown as the badge label and heading (e.g. "UN 38.3").
//   • logo  — OPTIONAL path under public/ to an official certification logo
//             (e.g. "/images/certifications/iso-9001.png"). When set, the card
//             shows the logo image; when omitted, it shows a typographic badge.
// =============================================================================

export type Certification = { name: string; description: string; logo?: string };

export const certifications: Certification[] = [
  {
    name: "UN 38.3",
    description: "Transport safety certification for lithium-ion cells and batteries.",
  },
  {
    name: "IEC 62133",
    description: "International safety standard for portable sealed secondary cells.",
  },
  {
    name: "ISO 9001",
    description: "Quality management system for consistent, repeatable production.",
  },
  {
    name: "BIS",
    description: "Compliance with Bureau of Indian Standards requirements.",
  },
];
