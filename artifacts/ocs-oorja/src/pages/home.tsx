import { Seo } from "@/components/Seo";
import Hero from "@/components/sections/Hero";
import USPs from "@/components/sections/USPs";
import ProductsGrid from "@/components/sections/ProductsGrid";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import { getOrganizationSchema, getLocalBusinessSchema, renderJsonLd } from "@/lib/seo";

export default function Home() {
  const organizationSchema = getOrganizationSchema();
  const localBusinessSchema = getLocalBusinessSchema();

  return (
    <>
      <Seo
        title="OCS OORJA — LiFePO₄ Batteries, Inverters & EV Chargers | Lucknow"
        description="Indian manufacturer of LiFePO₄ batteries, hybrid inverters and EV chargers based in Lucknow. We supply lithium battery packs and solar energy storage systems across India."
        canonical="https://www.ocsoorja.com/"
      />
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(organizationSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(localBusinessSchema)}
      />
      
      <div>
        <Hero />
        <USPs />
        <ProductsGrid />
        <Stats />
        <Testimonials />
        <FAQ />
        <CTA />
      </div>
    </>
  );
}
