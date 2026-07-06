import { Seo } from "@/components/Seo";
import Hero from "@/components/sections/Hero";
import WhyOcsOorja from "@/components/sections/WhyOcsOorja";
import Industries from "@/components/sections/Industries";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Testimonials from "@/components/sections/Testimonials";
import ManufacturingExcellence from "@/components/sections/ManufacturingExcellence";
import CertificationsStrip from "@/components/sections/CertificationsStrip";
import Insights from "@/components/sections/Insights";
import FinalCta from "@/components/sections/FinalCta";
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
        <WhyOcsOorja />
        <Industries />
        <FeaturedProducts />
        <Testimonials />
        <ManufacturingExcellence />
        <CertificationsStrip />
        <Insights />
        <FinalCta />
      </div>
    </>
  );
}
