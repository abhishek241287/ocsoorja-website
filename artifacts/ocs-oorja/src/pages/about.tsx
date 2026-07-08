import { Seo } from "@/components/Seo";
import { SITE } from "@/data/site";
import { HEADLINES } from "@/data/brand";
import { getBreadcrumbSchema, renderJsonLd } from "@/lib/seo";
import HeroAbout from "@/components/about/HeroAbout";
import StorySection from "@/components/about/StorySection";
import VisionSection from "@/components/about/VisionSection";
import MissionSection from "@/components/about/MissionSection";
import ValuesSection from "@/components/about/ValuesSection";
import CapabilitiesSection from "@/components/about/CapabilitiesSection";
import IndustriesSection from "@/components/about/IndustriesSection";
import WhyChooseSection from "@/components/about/WhyChooseSection";
import ExcellenceSection from "@/components/about/ExcellenceSection";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `${SITE.url}/` },
    { name: "About", url: `${SITE.url}/about` },
  ]);

  return (
    <div>
      <Seo
        title={HEADLINES.about.metaTitle}
        description={HEADLINES.about.metaDescription}
        canonical={`${SITE.url}/about`}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)} />

      <HeroAbout />
      <StorySection />
      <VisionSection />
      <MissionSection />
      <ValuesSection />
      <CapabilitiesSection />
      <IndustriesSection />
      <WhyChooseSection />
      <ExcellenceSection />
      <AboutCTA />
    </div>
  );
}
