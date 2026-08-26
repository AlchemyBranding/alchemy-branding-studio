"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A short silent loop from a single client animation.
 *
 * `fill` runs it as a section background (the /animation page uses this, one
 * clip per section under the hero); without it you get a framed 16:9 box.
 *
 * Unlike the hero these are NOT eager: `preload="none"` plus an
 * IntersectionObserver means nothing downloads until the clip is near the
 * viewport, and playback pauses again once it leaves. Three autoplaying videos
 * below the fold would otherwise compete with the 3.9 MB hero for bandwidth on
 * first paint.
 *
 * Under prefers-reduced-motion nothing ever plays and the poster carries the
 * frame, same as HeroReel. The site-wide CSS backstop cannot do this for video.
 */
export default function LoopClip({
  src,
  poster,
  description,
  fill = false,
}: {
  src: string;
  poster: string;
  /** Describes the clip for screen readers. Not rendered visually. */
  description: string;
  fill?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(query.matches);
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // preload="none" means there is nothing buffered yet on first pass.
            if (video.readyState === 0) video.load();
            // Rejects when the tab is backgrounded or autoplay is blocked; the
            // poster stays up, which is the fallback we want anyway.
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: "200px 0px", threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

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
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        role="presentation"
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <span className="sr-only">{description}</span>
    </Frame>
  );
}
