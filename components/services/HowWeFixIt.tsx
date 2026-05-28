const steps = [
  {
    title: "Get clear",
    body: "We dig into what you do, who it's really for and why it matters; the positioning and strategy that sit underneath everything else. So you can stop second-guessing and make decisions from a clear point of view, not a hunch.",
  },
  {
    title: "Say it properly",
    body: "We turn that clarity into language and a brand people actually understand: messaging, website copy, visual identity, the way it all sounds and looks. So your brand explains itself before you have to.",
  },
  {
    title: "Put it to work",
    body: "Then we make it show up, consistently: content, social, campaigns and a marketing structure that holds together instead of pulling in six directions. So your activity supports sales, rather than just keeping everyone busy.",
  },
];

/**
 * "Here's how we fix it" — the three-step process that follows
 * PainSignals on /services. Numbered, with a closing paragraph that
 * makes the senior-led / network promise explicit.
 */
export default function HowWeFixIt() {
  return (
    <section
      aria-labelledby="how-we-fix-heading"
      className="bg-dawn-80 py-[140px] border-t border-dawn-60"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          The approach
        </p>
        <h2
          id="how-we-fix-heading"
          className="font-display text-h2 mt-4 max-w-3xl text-white"
        >
          Here&apos;s how{" "}
          <span className="italic text-dusk">we fix it.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-white/65">
          We don&apos;t start with a logo, a content calendar or a list
          of things to post. We start by working out what you actually
          stand for, then build everything outward from there. Strategy
          first, then the useful stuff.
        </p>

        <ol className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="rounded-card bg-dawn border border-dawn-60 p-7"
            >
              <p className="text-dragon-fire font-bold text-[0.9rem] tracking-wider">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-bold text-[1.25rem] text-white">
                {s.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-white/65">
                {s.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-14 max-w-3xl text-[1.0625rem] leading-[1.75] text-white/75">
          All of it led by Dave and Jess, with specialists pulled in
          from our network only when a project genuinely needs them.
          No layers, no hand-offs to people you&apos;ve never met, just
          senior thinking and work that earns its keep.
        </p>
      </div>
    </section>
  );
}
