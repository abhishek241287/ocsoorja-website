// Premium WhatsApp floating contact widget — OCS OORJA
// Extensible architecture for AI chat / CRM future integration.

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/data/brand";

// ─── Configuration ─────────────────────────────────────────────

const CONFIG = {
  phone: CONTACT.whatsapp,
  delayMs: 4000,
  footerSelector: "footer",
  footerThreshold: 0.1,
  footerRootMargin: "0px 0px -50px 0px",
} as const;

const PREFILLED_MESSAGE = `Hello OCS OORJA,

I visited your website and would like more information about:

☐ Hybrid Solar Inverter
☐ Lithium Battery
☐ EV Charger
☐ Battery Management System (BMS)
☐ Solar Power Solution
☐ OCS ONE Smart Monitoring
☐ Dealership / Distribution

Please contact me.

Thank you.`;

// ─── Analytics Hooks (Future Integration) ──────────────────────

interface WidgetAnalytics {
  onView?: () => void;
  onClick?: (meta: { device: string; pageUrl: string }) => void;
}

// Pass analytics hooks here when ready. Currently no-ops.
const analytics: WidgetAnalytics = {};

// ─── Component ─────────────────────────────────────────────────

export function WhatsAppWidget() {
  const [isReady, setIsReady] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasViewed = useRef(false);

  // 4-second entrance delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      if (analytics.onView && !hasViewed.current) {
        hasViewed.current = true;
        analytics.onView();
      }
    }, CONFIG.delayMs);
    return () => clearTimeout(timer);
  }, []);

  // Footer visibility observer — hide the widget while the footer is on screen
  useEffect(() => {
    const footer = document.querySelector(CONFIG.footerSelector);
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      {
        threshold: CONFIG.footerThreshold,
        rootMargin: CONFIG.footerRootMargin,
      },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // WhatsApp link handler
  const handleOpen = useCallback(() => {
    const url = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(
      PREFILLED_MESSAGE,
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");

    if (analytics.onClick) {
      analytics.onClick({
        device: window.innerWidth < 640 ? "mobile" : "desktop",
        pageUrl: window.location.href,
      });
    }
  }, []);

  // Keyboard handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleOpen();
      }
    },
    [handleOpen],
  );

  const isHidden = !isReady || isFooterVisible;

  return (
    <div
      role="button"
      tabIndex={isHidden ? -1 : 0}
      aria-hidden={isHidden}
      aria-label="Chat with OCS OORJA on WhatsApp"
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "fixed z-50 rounded-full",
        "bottom-5 right-5 sm:bottom-6 sm:right-6",
        "transition-all duration-300 ease-out motion-reduce:transition-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isHidden
          ? "pointer-events-none opacity-0 scale-[0.8] translate-y-2"
          : "pointer-events-auto opacity-100 scale-100 translate-y-0",
      )}
    >
      {/* Tooltip — desktop only */}
      <div
        className={cn(
          "absolute bottom-[calc(100%+14px)] right-0",
          "hidden sm:block",
          "rounded-xl border border-card-border bg-card",
          "px-4 py-2.5 shadow-lg",
          "transition-all duration-200 ease-out motion-reduce:transition-none",
          isHovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-1 pointer-events-none",
        )}
      >
        <p className="text-sm font-semibold text-foreground whitespace-nowrap">
          Chat with OCS OORJA
        </p>
        <p className="text-xs text-muted-foreground whitespace-nowrap mt-0.5">
          Usually replies within 10 minutes
        </p>
        {/* Arrow */}
        <span
          className={cn(
            "absolute -bottom-[6px] right-6",
            "h-3 w-3 rotate-45",
            "bg-card border-r border-b border-card-border",
          )}
        />
      </div>

      {/* Button */}
      <div
        className={cn(
          "group relative flex items-center justify-center",
          "h-14 rounded-full",
          "cursor-pointer overflow-hidden",
          "transition-all duration-300 ease-out motion-reduce:transition-none",
          // Collapsed: green circle
          "bg-[#25D366] hover:bg-card",
          "border-0 hover:border hover:border-card-border",
          "shadow-[0_4px_20px_rgba(37,211,102,0.22)]",
          "hover:shadow-[0_8px_32px_rgba(37,211,102,0.35),0_4px_16px_rgba(0,0,0,0.08)]",
          // Expanded pill on desktop hover
          "sm:hover:w-auto sm:hover:px-5 sm:hover:pl-2",
          "sm:hover:gap-3",
          // Width transition for pill expansion
          "w-14 sm:w-14",
          isHovered ? "sm:w-auto" : "",
        )}
      >
        {/* Icon — pulse lives here (not on the container) so the width
            expansion and the pulse never fight each other */}
        <div
          className={cn(
            "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full",
            "transition-transform duration-200 motion-reduce:transition-none",
            "group-hover:scale-90",
            "wa-pulse",
          )}
        >
          <WhatsAppIcon
            className={cn(
              "h-7 w-7 transition-colors duration-200",
              "fill-white group-hover:fill-[#25D366]",
            )}
          />
        </div>

        {/* Text — desktop hover only */}
        <span
          className={cn(
            "hidden sm:block",
            "whitespace-nowrap text-sm font-semibold text-foreground",
            "transition-all duration-300 ease-out motion-reduce:transition-none",
            isHovered
              ? "opacity-100 max-w-[200px] ml-0"
              : "opacity-0 max-w-0 ml-0 overflow-hidden",
          )}
        >
          Chat with OCS OORJA
        </span>
      </div>
    </div>
  );
}

// ─── WhatsApp SVG Icon ─────────────────────────────────────────

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
