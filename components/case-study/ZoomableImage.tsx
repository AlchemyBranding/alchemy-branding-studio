"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  /** Full-resolution source used in the overlay. Falls back to `src`. */
  zoomSrc?: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  className?: string;
  captionClassName?: string;
};

/**
 * A body image that opens full screen on click.
 *
 * Case-study images are laid out at 768px in the article column, which is fine
 * for a photograph and useless for a screenshot of an interface: the text in it
 * is unreadable at that size. This lets the reader open the real thing.
 *
 * Deliberately simple: no zoom/pan, no gallery, no next/previous. It exists so
 * a dense image can be read, not to become a viewer.
 */
export default function ZoomableImage({
  src,
  zoomSrc,
  alt,
  width,
  height,
  caption,
  className = "",
  captionClassName = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    // Send focus back where it came from, or the reader loses their place.
    openerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    // Lock the page behind the overlay. Restore whatever was there before
    // rather than assuming it was "" — another component may own it.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <>
      <figure className="my-12">
        <button
          ref={openerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open larger: ${alt || caption || "image"}`}
          className="group relative block w-full cursor-zoom-in rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dragon-fire"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 1024px) 768px, 100vw"
            className={`w-full h-auto rounded-card ${className}`}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-dawn/75 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
          >
            Click to enlarge
          </span>
        </button>
        {caption ? (
          <figcaption className={`mt-3 text-[0.875rem] ${captionClassName}`}>
            {caption}
          </figcaption>
        ) : null}
      </figure>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt || caption || "Enlarged image"}
          onClick={close}
          className="fixed inset-0 z-[100] flex flex-col bg-dawn/95 p-4 md:p-8 backdrop-blur-sm"
        >
          <div className="flex justify-end">
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dragon-fire"
            >
              Close
            </button>
          </div>

          {/* Stop clicks on the image itself from closing, so a reader can
              lean in without the thing vanishing under the cursor. */}
          <div
            className="relative mt-4 flex-1 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={zoomSrc ?? src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {caption ? (
            <p className="mt-4 shrink-0 text-center text-[0.875rem] text-white/60">
              {caption}
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
