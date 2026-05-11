const traits = [
  {
    label: "Revenue",
    detail: "£500k – £15M",
  },
  {
    label: "Team",
    detail: "Founders, ops leads or a small in-house marketing team",
  },
  {
    label: "Stage",
    detail: "Growing, hiring, scaling — and feeling the limits of the brand they started with",
  },
  {
    label: "Mindset",
    detail: "Ambitious enough to invest in the foundations before scaling the spend",
  },
];

export default function WhoWeWorkWith() {
  return (
    <section
      aria-labelledby="who-heading"
      className="bg-dawn py-[120px] border-t border-dawn-80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
        <div>
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Who we work with
          </p>
          <h2
            id="who-heading"
            className="font-display text-h2 mt-4 text-white"
          >
            Ambitious, growing, ready to fix the foundations.
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-[1.7] text-white/65 max-w-md">
            We&apos;re not the right fit for everyone. The businesses we
            do our best work with usually look like this:
          </p>
        </div>

        <dl className="space-y-6">
          {traits.map((t) => (
            <div
              key={t.label}
              className="grid grid-cols-[120px_1fr] gap-6 border-t border-dawn-80 pt-6"
            >
              <dt className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-dragon-fire">
                {t.label}
              </dt>
              <dd className="text-[1.0625rem] leading-[1.6] text-white/80">
                {t.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
