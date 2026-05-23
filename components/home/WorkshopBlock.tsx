import Button from "@/components/Button";

const capabilities = [
  "Branding and identity",
  "Websites",
  "Animation and motion",
  "Content and social",
];

/**
 * Workshop-led foundation block — replaces the older ServicesOverview
 * grid (which presented services as a catalogue, explicitly out of
 * scope per the v3 brief). Workshop is named as THE starting point;
 * capabilities listed inline as a quiet rail rather than a tile grid.
 */
export default function WorkshopBlock() {
  return (
    <section
      id="workshop"
      aria-labelledby="workshop-heading"
      className="bg-dawn py-[140px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
              Where every project starts
            </p>
            <h2
              id="workshop-heading"
              className="font-display text-h2 mt-4 text-white"
            >
              Every project starts with{" "}
              <span className="italic text-dusk">the workshop.</span>
            </h2>
          </div>
          <div>
            <p className="text-[1.0625rem] leading-[1.75] text-white/75">
              The Brand Strategy Workshop is where we get clear on who
              you are for, what you stand for, and why anyone should
              choose you. It is the foundation everything else is built
              on: identity, website, animation and content all flow
              from it.
            </p>

            <ul className="mt-10 space-y-3" aria-label="Capabilities">
              {capabilities.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-4 text-[1rem] text-white/85"
                >
                  <span
                    aria-hidden="true"
                    className="block w-6 h-px bg-dragon-fire"
                  />
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button variant="primary" href="/services">
                Explore the workshop
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
