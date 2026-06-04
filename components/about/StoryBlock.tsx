import Image from "next/image";

export default function StoryBlock() {
  return (
    <section
      aria-labelledby="story-heading"
      className="bg-dawn py-[120px] border-t border-dawn-80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
        <div>
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Our story
          </p>
          <h2
            id="story-heading"
            className="font-display text-h2 mt-4 text-white"
          >
            We work with businesses whose brand hasn&apos;t caught up to the company they&apos;ve become.
          </h2>
        </div>
        <div className="text-[1.0625rem] leading-[1.7] text-white/75 space-y-5 max-w-2xl">
          <p>
            Most of the businesses we work with are in the same spot. The
            company has grown up. The brand hasn&apos;t. Marketing feels
            stuck. The website looks fine but isn&apos;t doing the work it
            should. The team can see something is off and can&apos;t quite
            name what.
          </p>
          <p>
            They&apos;re usually not ready to hire an in-house marketing
            team, and don&apos;t want one. What they actually need is
            strategic direction without a senior salary attached to it, and
            a way to keep the brand, content and creative ticking over
            without putting a job ad out.
          </p>
          <p>
            That&apos;s the gap we fill. Senior brand and marketing
            thinking, the work to back it up, and a steady hand on the
            day-to-day so the business stops losing momentum between the
            big projects.
          </p>

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-card border border-dawn-80">
            <Image
              src="/dave-jess-talk.jpg"
              alt="Jess and Dave in conversation during a brand talk"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
