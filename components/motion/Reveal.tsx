"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

/**
 * Fades + translates the child up into place when it enters the viewport.
 * One-shot — once revealed it stays revealed, even after scrolling away.
 *
 * Pairs with the existing animate-fade-up vocabulary in globals.css but
 * triggered on scroll instead of on mount.
 */
type Props = {
  children: ReactNode;
  delayMs?: number;
  className?: string;
};

export default function Reveal({ children, delayMs = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delayMs}ms` : "0ms" }}
      className={`transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}
