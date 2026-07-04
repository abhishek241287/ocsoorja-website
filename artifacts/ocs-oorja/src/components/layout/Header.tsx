

import { Link } from "wouter";
import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { navItems } from "@/data/navigation";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/10 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <img
              src="/images/OCS_OORJA_logo_landscape.png"
              alt="OCS OORJA"
              width={240}
              height={70}
              className="h-16 w-auto"
               
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+917521803995" className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground">
            <Phone className="h-4 w-4" /> 7521803995
          </a>
          <a href="mailto:Ocsoorja@gmail.com" className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground">
            <Mail className="h-4 w-4" /> Ocsoorja@gmail.com
          </a>
          <ThemeToggle />
          <Button asChild>
            <Link href="/contact">Request Quote</Link>
          </Button>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded hover:bg-foreground/5"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>
      {open && (
        <div className="md:hidden border-t border-foreground/10 bg-background">
          <Container className="py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base text-foreground/80 hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center justify-between">
              <ThemeToggle />
              <Button asChild>
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Request Quote
                </Link>
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
