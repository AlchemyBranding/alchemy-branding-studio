import TiltCard from "@/components/motion/TiltCard";

type Capability = {
  title: string;
  body: string;
};

// Deliberately not a service catalogue — these are the typical follow-on
// engagements that fall out of the workshop, not a tick-the-box menu.
const capabilities: Capability[] = [
  {
    title: "Visual identity",
    body:
      "Logo systems, type, colour, brand language and the guidelines to keep them consistent as the team grows.",
  },
  {
    title: "Website",
    body:
      "Strategic site design and build. Fast, accessible, easy for your team to update once we hand it back.",
  },
  {
    title: "Animation & motion",
    body:
      "Explainer videos, motion identity, social cuts and campaign work. Whatever the message needs in motion.",
  },
  {
    title: "Sales & proposal design",
    body:
      "Decks, proposals and one-pagers built inside Better Proposals, Proposify or Qwilr. On-brand, on-message, ready to close.",
  },
  {
    title: "Content & social",
    body:
      "Content systems, social design retainers and the day-to-day craft that keeps a brand showing up consistently.",
  },
  {
    title: "Ongoing partnership",
    body:
      "Embedded as your design and brand team for the long stretch. Retainers shaped to the work that needs doing.",
  },
];

export default function Capabilities() {
  return (
    <section
      aria-labelledby="capabilities-heading"
      className="bg-dawn py-[120px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          What flows from the workshop
        </p>
        <h2
          id="capabilities-heading"
          className="font-display text-h2 mt-4 max-w-3xl text-white"
        >
          We deliver everything you find on the roadmap.
        </h2>
        <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-white/65">
          You don&apos;t need to know what you need yet. The workshop tells
          us. Most teams continue with some combination of these.
        </p>

        <ul className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((c) => (
            <li key={c.title} className="h-full">
              <TiltCard
                strength={5}
                className="rounded-card bg-dawn-80 border border-dawn-60 p-7 h-full"
              >
                <h3 className="font-bold text-[1.125rem] text-white">
                  {c.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.65] text-white/65">
                  {c.body}
                </p>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
