

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

export function InfiniteProductCards({
  products,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  products: Product[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);
  const [paused, setPaused] = useState(false);
  const resumeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        // Make clones silent for screen readers and remove duplicate IDs
        if (duplicatedItem instanceof HTMLElement) {
          duplicatedItem.setAttribute("aria-hidden", "true");
          duplicatedItem.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
          // Keep anchors/buttons focusable and clickable; we already pause marquee on focus/touch
        }
        scrollerRef.current?.appendChild(duplicatedItem as Node);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  // Helpers to pause/resume animation safely
  function safePause() {
    if (!paused) setPaused(true);
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  }

  function delayedResume(delay = 700) {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), delay);
  }

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-20 mx-auto max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]",
        className,
      )}
      // Pause when user interacts (mouse or touch) so links/buttons are reliably clickable
      onMouseEnter={() => safePause()}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={() => safePause()}
      onPointerUp={() => delayedResume(800)}
      onTouchStart={() => safePause()}
      onTouchEnd={() => delayedResume(1000)}
      onFocusCapture={() => safePause()}
      onBlurCapture={() => {
        // Resume only if focus has left the container entirely
        const el = containerRef.current;
        if (el && !el.contains(document.activeElement)) setPaused(false);
      }}
    >
      <ul
        ref={scrollerRef}
        data-paused={paused || undefined}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-3 touch-pan-y",
          start && "animate-scroll motion-reduce:animate-none",
          pauseOnHover && "hover:[animation-play-state:paused]",
          "data-[paused=true]:[animation-play-state:paused]",
        )}
      >
        {products.map((p) => (
          <li
            key={p.id}
            className="w-[320px] sm:w-[360px] md:w-[380px] lg:w-[400px] shrink-0"
          >
            <ProductCard product={p} specsLimit={4} tagsLimit={3} className="h-full" />
          </li>
        ))}
      </ul>
    </div>
  );
}
