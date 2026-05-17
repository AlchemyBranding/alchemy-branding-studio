const items = [
  "A custom-designed proposal template in your platform, on-brand and signed off",
  "Cover, intro, problem/solution, scope, pricing, timeline, terms, signature: every section your sales process needs",
  "Image and icon library matched to your brand",
  "Reusable content blocks (case studies, testimonials, team bios) so future proposals come together in minutes",
  "Pricing tables built for the way you sell (fixed, tiered, optional add-ons)",
  "Hand-off session for the sales team, so they can run it themselves",
  "30 days of post-launch support: small tweaks, edits, fixes",
];

export default function Included() {
  return (
    <section
      aria-labelledby="included-heading"
      className="bg-dusk text-dawn py-[120px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
        <div>
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            What you get
          </p>
          <h2
            id="included-heading"
            className="font-display text-h2 mt-4 text-dawn"
          >
            A complete proposal system. Not just a pretty cover.
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-[1.7] text-dawn/70 max-w-md">
            Designed so your team can spin up new proposals fast, and every
            one of them looks like it came from the same business.
          </p>
        </div>

        <ul className="space-y-4">
          {items.map((item, i) => (
            <li
              key={item}
              className="flex gap-5 rounded-card bg-white/60 border border-dawn/10 p-5"
            >
              <span
                aria-hidden="true"
                className="text-dragon-fire font-bold shrink-0 w-7"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[1rem] leading-[1.6] text-dawn/80">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
