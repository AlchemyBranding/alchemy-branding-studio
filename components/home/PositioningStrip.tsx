/**
 * Positioning strip — the "why design matters" moment between the
 * logo proof and the workshop block. Kept conventional and quiet on
 * purpose: it's the brief's core argument distilled into one block,
 * not a place for motion or chrome.
 */
export default function PositioningStrip() {
  return (
    <section
      aria-labelledby="positioning-heading"
      className="bg-dawn-80 py-[120px] border-t border-b border-dawn-60"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          Why it matters
        </p>
        <h2
          id="positioning-heading"
          className="font-display text-h2 mt-4 text-white"
        >
          Design is the lever. <span className="italic text-dusk">Growth is the point.</span>
        </h2>
        <p className="mt-8 text-[1.125rem] leading-[1.7] text-white/75 max-w-3xl">
          Good design is not decoration. It is how you earn trust, charge
          what you are worth, and stop losing work to businesses that
          simply look more sorted than you. We start with strategy, then
          build the brand, website and content to match.
        </p>
      </div>
    </section>
  );
}
