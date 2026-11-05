"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A topic page carries every asset for every topic at once: on 5 November 2026
 * the Stori Cymru page held 14 video players and 15 audio players, all pointed
 * at the same CDN host, and the videos alone came to 425MB. With every player
 * asking for metadata on load, whichever request loses the race fails with
 * MEDIA_ERR_SRC_NOT_SUPPORTED and nothing retries it, so the player renders as
 * a blank box even though the file is sound. It showed up first on Consent
 * (CY), but reloads put it on a different player each time.
 *
 * Two things stop that here. The src is only attached once the player is near
 * the viewport, so a page load no longer fires a dozen requests at once, and a
 * player that does fail calls load() again, which is what recovered the broken
 * one by hand.
 */

type Props = {
  src: string;
  label: string;
  kind: "video" | "audio";
};

/** Two retries, backing off, then leave it alone. */
const MAX_RETRIES = 2;

export default function MediaPlayer({ src, label, kind }: Props) {
  const ref = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
  const retries = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visible, setVisible] = useState(false);

  // Attach the src only once the player is close to being looked at. Audio is
  // preload="none" so it costs nothing either way, but it keeps both paths the
  // same. Without IntersectionObserver, load everything as before.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleError = () => {
    const el = ref.current;
    if (!el || !visible) return;
    if (retries.current >= MAX_RETRIES) return;

    retries.current += 1;
    const wait = 500 * retries.current;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      // load() restarts the resource selection algorithm on the same src,
      // which is all a lost request needs.
      ref.current?.load();
    }, wait);
  };

  if (kind === "audio") {
    return (
      <audio
        ref={ref as React.RefObject<HTMLAudioElement>}
        controls
        preload="none"
        src={visible ? src : undefined}
        onError={handleError}
        className="mt-2 mb-3 w-full"
        aria-label={`${label} audio player`}
      />
    );
  }

  return (
    <video
      ref={ref as React.RefObject<HTMLVideoElement>}
      controls
      preload="metadata"
      playsInline
      src={visible ? src : undefined}
      onError={handleError}
      className="mt-2 mb-3 w-full rounded-card bg-black"
      aria-label={`${label} video player`}
    />
  );
}
