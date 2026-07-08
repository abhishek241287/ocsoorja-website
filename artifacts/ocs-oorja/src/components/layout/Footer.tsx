import { Link } from "wouter";
import { Container } from "./Container";
import { Mail, MapPin, Phone, Instagram, Youtube } from "lucide-react";
import { BRAND, CONTACT } from "@/data/brand";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-foreground/10 py-12">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))] lg:gap-x-16 lg:gap-y-10 items-start">
        <div className="space-y-5">
          <Link href="/" className="flex items-center">
            <img
              src="/images/OCS_OORJA_logo_landscape.png"
              alt="OCS OORJA"
              width={240}
              height={70}
              className="h-16 w-auto"
            />
          </Link>
          <p className="text-xs font-medium tracking-wide text-primary-strong">
            {BRAND.motto}
          </p>
          <p className="text-sm leading-relaxed text-foreground/70">
            {BRAND.positioning}
          </p>
          <div className="flex items-center gap-3 text-foreground/60">
            <a href="https://www.instagram.com/ocs_oorja" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-foreground"><Instagram className="h-5 w-5" /></a>
            <a href="https://www.youtube.com/@ocs_oorja" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-foreground"><Youtube className="h-5 w-5" /></a>
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="text-sm font-semibold">Quick Links</h3>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li><Link href="/products" className="hover:text-foreground">Products</Link></li>
            {/* <li><Link href="/industries" className="hover:text-foreground">Industries</Link></li> */}
            <li><Link href="/about" className="hover:text-foreground">About</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div className="space-y-5">
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li className="flex items-start gap-3"><Phone className="mt-1 h-4 w-4 flex-shrink-0" /> <a href="tel:+917521803995" className="hover:text-foreground">7521803995</a></li>
            <li className="flex items-start gap-3"><Mail className="mt-1 h-4 w-4 flex-shrink-0" /> <a href={CONTACT.emailHref} className="hover:text-foreground">{CONTACT.email}</a></li>
            <li className="flex items-start gap-3"><MapPin className="mt-1 h-4 w-4 flex-shrink-0" />
              <a href="https://www.google.com/maps/search/?api=1&query=Royal+Plaza+IT+Park-2+Sushant+Golf+City+Lucknow" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Commercial Unit No. 304 on 3rd Floor Royal Plaza, Block-3 in IT Park-2, at Sushant Golf City, Lucknow</a>
            </li>
          </ul>
        </div>

        <div className="space-y-5">
          <h3 className="text-sm font-semibold">Certifications</h3>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li>UN 38.3</li>
            <li>IEC 62133</li>
            <li>ISO 9001/14001/45001</li>
          </ul>
        </div>
      </Container>
      <Container className="mt-10 border-t border-foreground/10 pt-6 text-xs text-foreground/60 text-center md:text-left">
        © {new Date().getFullYear()} OCS OORJA. All rights reserved.
      </Container>
    </footer>
  );
}
