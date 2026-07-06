import { Seo } from "@/components/Seo";
import Hero from "@/components/sections/Hero";
import WhyOcsOorja from "@/components/sections/WhyOcsOorja";
import Industries from "@/components/sections/Industries";
import ManufacturingExcellence from "@/components/sections/ManufacturingExcellence";
import CertificationsStrip from "@/components/sections/CertificationsStrip";
import Testimonials from "@/components/sections/Testimonials";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import LatestArticles from "@/components/sections/LatestArticles";
import FinalCta from "@/components/sections/FinalCta";
import { getOrganizationSchema, getLocalBusinessSchema, renderJsonLd } from "@/lib/seo";
import { SITE } from "@/data/site";

export default function Home() {
  const organizationSchema = getOrganizationSchema();
  const localBusinessSchema = getLocalBusinessSchema();

  return (
    <>
      <Seo
        title="OCS OORJA — LiFePO₄ Batteries, Inverters & EV Chargers | Lucknow"
        description="Indian manufacturer of LiFePO₄ batteries, hybrid inverters and EV chargers based in Lucknow. We supply lithium battery packs and solar energy storage systems across India."
        canonical={`${SITE.url}/`}
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

      {/* Company-first flow: who we are → who we serve → how we build →
          proof (certifications + customers) → products → expertise → CTA. */}
      <div>
        <Hero />
        <WhyOcsOorja />
        <Industries />
        <ManufacturingExcellence />
        <CertificationsStrip />
        <Testimonials />
        <FeaturedProducts />
        <LatestArticles />
        <FinalCta />
      </div>
    </>
  );
}
