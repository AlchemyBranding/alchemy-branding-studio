"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { urlFor } from "@/sanity/lib/image";
import type { FeaturedTestimonial } from "@/sanity/lib/queries";

const placeholderTestimonials: FeaturedTestimonial[] = [
  {
    _id: "placeholder",
    quote:
      "Mark testimonials as 'Featured' in Sanity and they'll appear here, ordered by the order field. Add a photo, name, job title and company for the attribution row.",
    photo: null,
    name: "Add a testimonial",
    jobTitle: "in Sanity Studio",
    company: null,
  },
];

const ADVANCE_MS = 6000;
const TRANSITION_MS = 400;

export default function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: FeaturedTestimonial[];
}) {
  const items =
    testimonials.length > 0 ? testimonials : placeholderTestimonials;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (items.length <= 1 || paused) return;
    timeoutRef.current = setTimeout(
      () => setIndex((i) => (i + 1) % items.length),
      ADVANCE_MS,
    );
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, paused, items.length]);

  const current = items[index];
  const attribution = [current?.jobTitle, current?.company]
    .filter(Boolean)
    .join(", ");

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-dusk text-dawn pt-[72px] pb-[120px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          What clients say
        </p>
        <h2
          id="testimonials-heading"
          className="font-display text-h2 mt-3 text-dawn"
        >
          People we&apos;ve worked with.
        </h2>

        <div className="mt-12 grid">
          {items.map((t, i) => (
            <article
              key={t._id}
              aria-hidden={i !== index}
              className={`col-start-1 row-start-1 flex flex-col items-center transition-opacity ease-out ${
                i === index
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
              style={{ transitionDuration: `${TRANSITION_MS}ms` }}
            >
              <span
                aria-hidden="true"
                className="font-display text-[5rem] leading-none text-dragon-fire/40 -mb-6"
              >
                &ldquo;
              </span>
              <p className="font-display text-[1.5rem] leading-[1.5] text-dawn max-w-2xl">
                {t.quote}
              </p>
              <div className="mt-8 flex items-center gap-4">
                {t.photo?.asset ? (
                  <Image
                    src={urlFor(t.photo).width(104).height(104).auto("format").url()}
                    alt={t.photo.alt || t.name}
                    width={52}
                    height={52}
                    className="rounded-full border-2 border-dragon-fire object-cover"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="w-[52px] h-[52px] rounded-full border-2 border-dragon-fire bg-dawn-20"
                  />
                )}
                <div className="text-left">
                  <p className="font-bold text-dawn text-[1rem] leading-tight">
                    {t.name}
                  </p>
                  {attribution ? (
                    <p className="text-[0.875rem] text-dawn-40">
                      {attribution}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        {items.length > 1 ? (
          <div
            className="mt-8 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Testimonial pagination"
          >
            {items.map((t, i) => (
              <button
                key={t._id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  i === index ? "bg-dragon-fire" : "bg-dawn-20 hover:bg-dawn-40"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
