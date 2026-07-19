import { Seo } from "@/components/Seo";
import { SITE } from "@/data/site";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";
import { FindUs } from "@/components/contact/FindUs";
import { Phone, Mail, MapPin } from "lucide-react";
import { BRAND, HEADLINES, CONTACT } from "@/data/brand";
import { getBreadcrumbSchema, renderJsonLd } from "@/lib/seo";

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Contact", url: `${SITE.url}/contact` },
  ]);
  return (
    <div className="py-12 md:py-16">
      <Seo
        title="Contact Us - OCS OORJA | LiFePO₄ Battery Manufacturer Lucknow"
        description={`${BRAND.positioning} Request a quote for hybrid solar inverters, LiFePO₄ batteries, energy storage, or EV chargers — Phone: 7521803995 | Email: ${CONTACT.email}`}
        canonical={`${SITE.url}/contact`}
      />
      <Container>
        <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)} />
        <SectionHeading
          title={HEADLINES.contact.title}
          subtitle={HEADLINES.contact.subtitle}
          align="left"
        />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Info column */}
          <div className="space-y-5 md:col-span-1">
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] supports-[backdrop-filter]:bg-foreground/5 supports-[backdrop-filter]:backdrop-blur-md p-5 sm:p-6">
              <h3 className="text-base font-semibold text-foreground">Talk to us</h3>
              <p className="mt-1 text-sm text-foreground/70">We typically reply within one business day.</p>
              <ul className="mt-4 space-y-3 text-sm text-foreground/80">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+917521803995" className="hover:underline">7521803995</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href={CONTACT.emailHref} className="hover:underline">{CONTACT.email}</a>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-foreground/10 p-5 sm:p-6">
              <h3 className="text-base font-semibold text-foreground">Office</h3>
              <div className="mt-3 flex items-start gap-2 text-sm text-foreground/80">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <p>Commercial Unit No. 304 on 3rd Floor Royal Plaza, Block-3 in IT Park-2, at Sushant Golf City, Lucknow</p>
              </div>
            </div>

            <FindUs />
          </div>

          {/* Form column */}
          <div className="md:col-span-2">
            <div className="rounded-2xl border border-foreground/10 bg-background p-6 sm:p-8">
              <h3 className="sr-only">Contact form</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
