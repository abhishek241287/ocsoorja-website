import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { navItems } from "@/data/navigation";
import { FAMILIES } from "@/data/products";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { CTAS } from "@/data/brand";
import { cn } from "@/lib/utils";

// Contact details shown in the header. Kept alongside the component (header-only
// scope); the rest of the site sources contact info from the footer/contact page.
const PHONE_DISPLAY = "7521803995";
const PHONE_HREF = "tel:+917521803995";
const EMAIL_DISPLAY = "Ocsoorja@gmail.com";
const EMAIL_HREF = "mailto:Ocsoorja@gmail.com";

function isActiveHref(href: string, location: string): boolean {
  if (href === "/") return location === "/";
  return location === href || location.startsWith(href + "/");
}

export default function Header() {
  const [location] = useLocation();
  const isHome = location === "/";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const productsTriggerRef = useRef<HTMLButtonElement>(null);

  // The header is only transparent while sitting at the very top of the homepage
  // hero. Any scroll, or opening the mobile menu, switches it to the solid state.
  const transparent = isHome && !scrolled && !mobileOpen;

  // Track scroll to toggle the solid/transparent treatment.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on route change.
  useEffect(() => {
    setMobileOpen(false);
    setMobileProductsOpen(false);
    setProductsOpen(false);
  }, [location]);

  // Desktop Products dropdown: close on Escape or outside click.
  useEffect(() => {
    if (!productsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setProductsOpen(false);
        productsTriggerRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [productsOpen]);

  // Mobile menu: close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-0 rounded-md";

  const navLinkClass = (active: boolean) =>
    cn(
      "relative py-2 text-sm font-medium tracking-tight transition-colors",
      focusRing,
      "after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-300",
      transparent ? "after:bg-white" : "after:bg-primary",
      active
        ? cn(transparent ? "text-white" : "text-foreground", "after:scale-x-100")
        : transparent
          ? "text-white/80 hover:text-white hover:after:scale-x-100"
          : "text-foreground/70 hover:text-foreground hover:after:scale-x-100",
    );

  const iconLinkClass = cn(
    "inline-flex items-center gap-2 px-2 py-1 text-sm transition-colors",
    focusRing,
    transparent
      ? "text-white/80 hover:text-white"
      : "text-foreground/70 hover:text-foreground",
  );

  return (
    <header
      className={cn(
        "top-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-300 ease-out",
        isHome ? "fixed" : "sticky",
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border bg-background shadow-sm",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        {/* Logo → Home */}
        <Link href="/" aria-label="OCS OORJA — Home" className={cn("flex items-center", focusRing)}>
          <img
            src="/images/OCS_OORJA_logo_landscape.png"
            alt="OCS OORJA"
            width={240}
            height={70}
            className={cn(
              "h-10 w-auto transition-[filter] duration-300 lg:h-12",
              transparent ? "brightness-0 invert" : "dark:brightness-0 dark:invert",
            )}
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = isActiveHref(item.href, location);

            if (item.href === "/products") {
              return (
                <div
                  key={item.name}
                  ref={productsRef}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <button
                    ref={productsTriggerRef}
                    type="button"
                    aria-expanded={productsOpen}
                    aria-controls="products-menu"
                    onClick={() => setProductsOpen((v) => !v)}
                    className={cn(navLinkClass(active), "inline-flex items-center gap-1")}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        productsOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {productsOpen && (
                    <div className="absolute left-0 top-full pt-3">
                      <div
                        id="products-menu"
                        className="w-96 rounded-xl border border-border bg-background p-2 shadow-lg"
                      >
                        <Link
                          href="/products"
                          onClick={() => setProductsOpen(false)}
                          className={cn(
                            "block rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5",
                            focusRing,
                          )}
                        >
                          All Products
                        </Link>
                        <div className="my-1 h-px bg-border" />
                        <ul>
                          {FAMILIES.map((family) => (
                            <li key={family.id}>
                              <Link
                                href={`/products?family=${family.id}`}
                                onClick={() => setProductsOpen(false)}
                                className={cn(
                                  "block rounded-lg px-3 py-2 transition-colors hover:bg-foreground/5",
                                  focusRing,
                                )}
                              >
                                <span className="block text-sm font-medium text-foreground">
                                  {family.shortLabel}
                                </span>
                                <span className="mt-0.5 block text-xs text-foreground/55">
                                  {family.description}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={navLinkClass(active)}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop right cluster */}
        <div className="hidden items-center gap-2 lg:flex">
          <a href={PHONE_HREF} className={iconLinkClass}>
            <Phone className="h-4 w-4" aria-hidden="true" /> {PHONE_DISPLAY}
          </a>
          <a href={EMAIL_HREF} className={cn(iconLinkClass, "hidden xl:inline-flex")}>
            <Mail className="h-4 w-4" aria-hidden="true" /> {EMAIL_DISPLAY}
          </a>
          <span className={transparent ? "text-white" : "text-foreground"}>
            <ThemeToggle />
          </span>
          <Button asChild size="sm" className="ml-1">
            <Link href={CTAS.requestQuote.href}>{CTAS.requestQuote.label}</Link>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <span className={transparent ? "text-white" : "text-foreground"}>
            <ThemeToggle />
          </span>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
              focusRing,
              transparent
                ? "text-white hover:bg-white/10"
                : "text-foreground hover:bg-foreground/5",
            )}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-border bg-background shadow-lg lg:hidden"
        >
          <Container className="py-4">
            <nav className="flex flex-col" aria-label="Mobile">
              {/* Products with expandable families */}
              <div className="border-b border-border/60">
                <div className="flex items-center">
                  <Link
                    href="/products"
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActiveHref("/products", location) ? "page" : undefined}
                    className={cn(
                      "flex-1 py-3 text-base font-medium transition-colors",
                      isActiveHref("/products", location)
                        ? "text-primary-strong"
                        : "text-foreground",
                    )}
                  >
                    Products
                  </Link>
                  <button
                    type="button"
                    aria-expanded={mobileProductsOpen}
                    aria-controls="mobile-products"
                    aria-label="Toggle product categories"
                    onClick={() => setMobileProductsOpen((v) => !v)}
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-foreground/5",
                      focusRing,
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        mobileProductsOpen && "rotate-180",
                      )}
                    />
                  </button>
                </div>
                {mobileProductsOpen && (
                  <ul id="mobile-products" className="pb-2">
                    {FAMILIES.map((family) => (
                      <li key={family.id}>
                        <Link
                          href={`/products?family=${family.id}`}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground",
                            focusRing,
                          )}
                        >
                          {family.shortLabel}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {navItems
                .filter((item) => item.href !== "/products")
                .map((item) => {
                  const active = isActiveHref(item.href, location);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "border-b border-border/60 py-3 text-base font-medium transition-colors",
                        active ? "text-primary-strong" : "text-foreground",
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
            </nav>

            <div className="mt-4 space-y-3">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> {PHONE_DISPLAY}
              </a>
              <a
                href={EMAIL_HREF}
                className="flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> {EMAIL_DISPLAY}
              </a>
              <Button asChild className="w-full">
                <Link href={CTAS.requestQuote.href} onClick={() => setMobileOpen(false)}>
                  {CTAS.requestQuote.label}
                </Link>
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
