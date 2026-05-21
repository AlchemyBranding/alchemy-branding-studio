"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";

/**
 * Subtle 3D tilt that follows the cursor across the card. Max rotation
 * capped at ~6 degrees so it reads as "depth" not "flip toy". Resets
 * smoothly on mouse leave.
 *
 * Fits portfolio cards, services cards, deliverable callouts.
 */
type Props = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. Default 6. */
  strength?: number;
};

export default function TiltCard({
  children,
  className = "",
  strength = 6,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(1200px) rotateX(0deg) rotateY(0deg)",
  );

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 → 1
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 2 * strength; // -strength → +strength
    const rotateX = (0.5 - y) * 2 * strength;
    setTransform(
      `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
    );
  };

  const onLeave = () => {
    setTransform("perspective(1200px) rotateX(0deg) rotateY(0deg)");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
      className={`transition-transform duration-[400ms] ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
