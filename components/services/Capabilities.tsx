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
      "Logo, type, colour and the brand language that ties it together, with guidelines that keep it consistent as the team grows and more people start using it.",
  },
  {
    title: "Website",
    body:
      "Strategic design and build: fast, accessible, and easy for your team to keep updated once we hand it over. Built to do a job, not just to look new for a year.",
  },
  {
    title: "Animation & motion",
    body:
      "Explainer videos, motion identity, social cuts and campaign work; the message brought to life for the moments when words on a page aren't enough.",
  },
  {
    title: "Sales & proposal design",
    body:
      "Decks, proposals and one-pagers built to close: on-brand, on-message, and set up inside the tools you already use (Better Proposals, Proposify, Qwilr).",
  },
  {
    title: "Content & social",
    body:
      "Content systems and social design retainers; the day-to-day craft that keeps the brand showing up properly, instead of going quiet between the big projects.",
  },
  {
    title: "Ongoing partnership",
    body:
      "Your design and brand team for the long stretch: embedded, on hand, with retainers shaped around the work that actually needs doing rather than a fixed package you have to grow into.",
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
          Then we build what{" "}
          <span className="italic text-dusk">the roadmap calls for.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-white/65">
          You don&apos;t need to know what you need yet. The workshop
          tells us. Most teams go on to use some combination of the
          below.
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
