

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, type SpringOptions } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltedCardProps {
  imageSrc?: React.ComponentProps<'img'>['src'];
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties['height'];
  containerWidth?: React.CSSProperties['width'];
  imageHeight?: React.CSSProperties['height'];
  imageWidth?: React.CSSProperties['width'];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  children?: React.ReactNode;
  className?: string; // extra classes on outer figure
  contentClassName?: string; // classes for inner content wrapper when no image provided
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "auto",
  containerWidth = "100%",
  imageHeight = "100%",
  imageWidth = "100%",
  scaleOnHover = 1.04,
  rotateAmplitude = 12,
  showMobileWarning = false,
  showTooltip = false,
  overlayContent = null,
  displayOverlayContent = false,
  children,
  className,
  contentClassName,
}: TiltedCardProps) {
  const hasImage = Boolean(imageSrc);
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  // Subtle gradient glow overlay opacity
  const glowOpacity = useSpring(0, springValues);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);
  // Theme-aware radial glow that follows the pointer
  const glowBackground = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(56,189,248,0.18), rgba(16,185,129,0.12) 35%, transparent 65%)`;

  function updateFromPoint(clientX: number, clientY: number) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = clientX - rect.left - rect.width / 2;
    const offsetY = clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(clientX - rect.left);
    y.set(clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    updateFromPoint(e.clientX, e.clientY);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    updateFromPoint(e.clientX, e.clientY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
    glowOpacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
    glowOpacity.set(0);
  }

  return (
    <figure
      ref={ref}
      className={cn(
        "relative w-full h-full [perspective:800px] flex flex-col items-center justify-center",
        className,
      )}
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerMove={handlePointerMove}
      onPointerDown={() => glowOpacity.set(1)}
      onPointerUp={() => glowOpacity.set(0)}
      onPointerCancel={() => glowOpacity.set(0)}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{
          width: hasImage ? imageWidth : "100%",
          height: hasImage ? imageHeight : undefined,
          rotateX,
          rotateY,
          scale,
        }}
      >
        {hasImage ? (
          <motion.img
            src={imageSrc}
            alt={altText}
            className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          />
        ) : (
          <div
            className={cn(
              "will-change-transform [transform:translateZ(0)]",
              contentClassName,
            )}
          >
            {children}
          </div>
        )}

        {/* Gradient glow overlay (professional, minimal, theme-aware) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] rounded-[15px]"
          style={{
            opacity: glowOpacity,
            background: glowBackground,
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
