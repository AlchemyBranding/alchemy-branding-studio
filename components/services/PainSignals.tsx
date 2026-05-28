const signals = [
  "Your team can say what you do. None of them can quite say why it matters.",
  "There's no shortage of activity (campaigns, content, posts), but it isn't turning into leads, and \"do more\" isn't the answer.",
  "Referrals still come in. Cold inbound has gone quiet.",
  "Ask two people in the same meeting what you do, and you'll get two different answers.",
  "Every sales call starts from scratch, because nothing's done the convincing before you arrive.",
  "The business has grown up. The language hasn't caught up.",
];

export default function PainSignals() {
  return (
    <section
      aria-labelledby="signals-heading"
      className="bg-dawn py-[120px] border-t border-dawn-80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          You might recognise this
        </p>
        <h2
          id="signals-heading"
          className="font-display text-h2 mt-4 max-w-3xl text-white"
        >
          The signals are usually small, until they aren&apos;t.
        </h2>
        <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-white/65">
          By the time the brand becomes the problem, it&apos;s already
          costing you in close rates, hiring and confidence. Here&apos;s
          what we hear most:
        </p>

        <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {signals.map((signal, i) => (
            <li
              key={signal}
              className="flex gap-5 border-t border-dawn-80 pt-6"
            >
              <span
                aria-hidden="true"
                className="text-dragon-fire font-bold text-[1rem] leading-relaxed shrink-0 w-6"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[1.0625rem] leading-[1.6] text-white/80">
                {signal}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
