const steps = [
  {
    n: "01",
    title: "Brief & audit",
    duration: "Week 1",
    body: "30-minute kickoff. We review your current proposals, win/loss notes, and the platform you want to build in. You send us your brand assets.",
  },
  {
    n: "02",
    title: "Structure & content",
    duration: "Week 2",
    body: "We map the sections, draft the reusable content blocks (case studies, testimonials, scope, terms), and agree the pricing table format.",
  },
  {
    n: "03",
    title: "Design & build",
    duration: "Weeks 3–4",
    body: "Two design rounds. We build the template live in your platform, not a Figma file. You see it as your team will see it.",
  },
  {
    n: "04",
    title: "Hand-off",
    duration: "End of week 4",
    body: "Walk-through call with your sales team, written guide, and 30 days of post-launch support for edits and tweaks.",
  },
];

export default function Process() {
  return (
    <section
      aria-labelledby="process-heading"
      className="bg-dawn py-[120px] border-t border-dawn-80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          How it runs
        </p>
        <h2
          id="process-heading"
          className="font-display text-h2 mt-4 max-w-3xl text-white"
        >
          Four weeks, four steps.
        </h2>

        <ol className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-card bg-dawn-80 border border-dawn-60 p-7"
            >
              <p className="text-dragon-fire font-bold text-[1.5rem] leading-none">
                {s.n}
              </p>
              <p className="mt-3 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/40">
                {s.duration}
              </p>
              <h3 className="mt-2 font-bold text-[1.125rem] text-white">
                {s.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-white/65">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
