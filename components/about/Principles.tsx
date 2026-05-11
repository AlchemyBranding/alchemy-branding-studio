type Principle = {
  number: string;
  title: string;
  description: string;
};

const principles: Principle[] = [
  {
    number: "01",
    title: "Strategy comes first",
    description:
      "Positioning, audience, voice, and messaging — settled before a pixel moves. Beautiful work without a sharp idea is decoration.",
  },
  {
    number: "02",
    title: "Craft is non-negotiable",
    description:
      "Type, motion, layout, code — held to a high standard everywhere, not just the hero. The difference shows on the third scroll.",
  },
  {
    number: "03",
    title: "Built to scale",
    description:
      "Brand systems, not one-off artefacts. Components, tokens, templates and guidelines so the brand holds together as the team grows.",
  },
  {
    number: "04",
    title: "Run as a partnership",
    description:
      "Embedded with your team. Async-friendly. No throwing decks over the wall — we ship in the open, iterate fast, defend our calls.",
  },
];

export default function Principles() {
  return (
    <section
      aria-labelledby="principles-heading"
      className="bg-dusk text-dawn py-[120px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          How we work
        </p>
        <h2
          id="principles-heading"
          className="font-display text-h2 mt-4 max-w-3xl text-dawn"
        >
          Four principles, applied to everything.
        </h2>

        <ul className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
          {principles.map((p) => (
            <li key={p.number} className="border-t border-dawn/15 pt-6">
              <p className="text-dragon-fire font-bold text-[1.5rem] leading-none">
                {p.number}
              </p>
              <h3 className="mt-4 font-bold text-[1.25rem] text-dawn">
                {p.title}
              </h3>
              <p className="mt-3 text-[1rem] leading-[1.7] text-dawn/70 max-w-md">
                {p.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
