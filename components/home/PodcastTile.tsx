import Button from "@/components/Button";

/**
 * Owned-media partner to InsightsPreview. Sits directly under the
 * blog grid as a paired "Podcast" tile — same hierarchy weight as
 * the blog index button, but distinct enough not to read as a
 * single grid item. External link, new tab.
 */
export default function PodcastTile() {
  return (
    <section
      aria-labelledby="podcast-heading"
      className="bg-dawn pb-[140px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="rounded-card bg-dawn-80 border border-dawn-60 p-10 md:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start lg:items-center">
            <div>
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
                The podcast
              </p>
              <h2
                id="podcast-heading"
                className="font-display text-h3 mt-3 text-white"
              >
                Brand to Scale,{" "}
                <span className="italic text-dusk">the podcast.</span>
              </h2>
              <p className="mt-4 max-w-xl text-[1rem] leading-[1.6] text-white/65">
                Conversations with founders, marketers and operators on
                what it actually takes to build a brand that scales.
              </p>
            </div>
            <div className="shrink-0">
              <Button
                href="https://www.brandtoscale.co.uk"
                variant="secondary"
                external
              >
                Listen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
