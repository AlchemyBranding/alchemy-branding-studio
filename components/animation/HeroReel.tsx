"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Silent 20s animation showreel for the /animation hero.
 *
 * The homepage hero already runs a full-bleed autoplay loop, so this one sits
 * in a framed panel instead: same family, different shape, so the two pages do
 * not read as the same page.
 *
 * The site-wide prefers-reduced-motion backstop in globals.css only neutralises
 * CSS animation and transition. It cannot stop a video autoplaying, so that is
 * handled here: under reduce we never autoplay and the poster carries the frame.
 */
export default function HeroReel({ fill = false }: { fill?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduceMotion(query.matches);
      const video = videoRef.current;
      if (!video) return;
      if (query.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        // play() rejects when the tab is backgrounded or the browser blocks
        // autoplay. The poster stays up in that case, which is the fallback
        // we want anyway.
        void video.play().catch(() => {});
      }
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const Frame = fill ? "div" : "figure";

  return (
    <Frame
      className={
        fill
          ? "absolute inset-0"
          : "relative aspect-video overflow-hidden rounded-2xl border border-dawn-60 bg-dawn-80 shadow-2xl"
      }
    >
      <video
        ref={videoRef}
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        role="presentation"
        poster="/video/animation-showreel-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video/animation-showreel.mp4" type="video/mp4" />
      </video>
      <span className="sr-only">
        A showreel of Alchemy animation work, including DS Smith, Veeqo, Tate
        &amp; Lyle, RWE, BAM, Burges Salmon and Haydale.
      </span>
    </Frame>
  );
}
