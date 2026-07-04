// NOTE: Industries section is currently disabled across the site.
// We keep this file to preserve history, but export a no-op component.
//
// Previous implementation (kept for reference):
// import { industries } from "@/data/industries";
// import { Container } from "@/components/layout/Container";
// import { SectionHeading } from "@/components/ui/SectionHeading";
// import TiltedCard from "@/components/ui/TiltedCard";
//
// export default function IndustriesGrid() {
//   return (
//     <section className="py-12 md:py-16">
//       <Container>
//         <SectionHeading
//           eyebrow="Industries"
//           title="Solutions for demanding applications"
//           subtitle="From e‑mobility to telecom and beyond"
//         />
//         <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {industries.map((i) => (
//             <TiltedCard
//               key={i.id}
//               rotateAmplitude={12}
//               scaleOnHover={1.03}
//               showMobileWarning={false}
//               showTooltip={false}
//               containerHeight="100%"
//               containerWidth="100%"
//               contentClassName="rounded-2xl overflow-hidden border border-foreground/10"
//             >
//               <div className="h-36 bg-slate-900/95 dark:bg-slate-800/90 flex items-center justify-center">
//                 {/* Decorative block in place of images */}
//                 <div className="h-8 w-24 rounded-md bg-slate-700/60" />
//               </div>
//               <div className="p-4">
//                 <h3 className="text-base font-semibold">{i.name}</h3>
//                 <p className="mt-1 text-sm text-foreground/70 line-clamp-2">{i.description}</p>
//               </div>
//             </TiltedCard>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }

export default function IndustriesGrid() {
  return null;
}
