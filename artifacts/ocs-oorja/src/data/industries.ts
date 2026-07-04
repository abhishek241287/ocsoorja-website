export type Industry = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export const industries: Industry[] = [
  {
    id: "ev",
    name: "E‑Mobility",
    image: "/images/industries/emobility.svg",
    description:
      "Battery packs for e‑rickshaw, e‑scooter and light EVs with robust BMS and fast charging.",
  },
  {
    id: "solar-ess",
    name: "Solar & ESS",
    image: "/images/industries/solar-ess.svg",
    description:
      "Residential and C&I energy storage packs with long cycle life and high safety (LFP).",
  },
  {
    id: "telecom",
    name: "Telecom",
    image: "/images/industries/telecom.svg",
    description:
      "Reliable BTS backup solutions with remote monitoring and wide‑temperature performance.",
  },
  {
    id: "industrial",
    name: "Industrial OEM",
    image: "/images/industries/industrial.svg",
    description:
      "Custom battery engineering for AGVs, power tools, robotics and specialized machinery.",
  },
];
