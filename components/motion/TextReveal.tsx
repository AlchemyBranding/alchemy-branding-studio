"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals a piece of copy word-by-word as the block scrolls into view.
 * Each word fades + rises in 60ms after the previous one. Best for
 * single-line eyebrow phrases or headline body — avoid on long body
 * paragraphs where the effect becomes a distraction.
 */
type Props = {
  text: string;
  /** Delay between words, in ms. Default 60. */
  stepMs?: number;
  /** Tailwind classes for the parent block (e.g. font sizing, colour). */
  className?: string;
};

export default function TextReveal({ text, stepMs = 60, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const words = text.split(/(\s+)/); // keep whitespace tokens

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
      { threshold: 0.3 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  let wordIndex = -1;
  return (
    <div ref={ref} className={className}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) {
          return <span key={i}>{w}</span>;
        }
        wordIndex += 1;
        const delay = wordIndex * stepMs;
        return (
          <span
            key={i}
            style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
            className={`inline-block transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
}
