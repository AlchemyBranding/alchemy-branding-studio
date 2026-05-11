const platforms = [
  {
    name: "Better Proposals",
    note: "Our most-requested platform — clean templates, e-signing, analytics out of the box.",
  },
  {
    name: "Proposify",
    note: "Pipeline-style proposal management for sales teams that need version control and approvals.",
  },
  {
    name: "Qwilr",
    note: "Interactive, web-style proposals that read more like a landing page than a PDF.",
  },
  {
    name: "Or whatever you use",
    note: "Keynote, Google Slides, PowerPoint, Notion, PandaDoc, DocuSign — we'll design inside the tool your team already runs.",
  },
];

export default function Platforms() {
  return (
    <section
      aria-labelledby="platforms-heading"
      className="bg-dawn py-[120px] border-t border-dawn-80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          Where we work
        </p>
        <h2
          id="platforms-heading"
          className="font-display text-h2 mt-4 max-w-3xl text-white"
        >
          Built inside the tool your team already runs.
        </h2>
        <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-white/65">
          We don&apos;t hand over flat PDFs. The deliverable is a live
          template in your platform of choice — your sales team can
          duplicate, edit and send without touching us.
        </p>

        <ul className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {platforms.map((p) => (
            <li
              key={p.name}
              className="rounded-card bg-dawn-80 border border-dawn-60 p-7"
            >
              <h3 className="font-bold text-[1.125rem] text-white">{p.name}</h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-white/65">
                {p.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
