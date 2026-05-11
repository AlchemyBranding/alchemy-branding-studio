// Until real client SVGs land in /public/logos/clients/, render a stylised
// text marquee. The marquee scaffolding is what it'll be when images replace
// these tokens.
const placeholderClients = [
  "Northpoint",
  "Vortex Studio",
  "Forefront",
  "Atlas & Co.",
  "Lumen Labs",
  "Beacon Group",
  "Helix Capital",
  "Pivot",
];

export default function LogoStrip() {
  // Duplicate the list so the marquee loops seamlessly via translateX(-50%).
  const items = [...placeholderClients, ...placeholderClients];

  return (
    <section
      aria-label="Trusted by"
      className="bg-dawn-80 py-8 overflow-hidden"
    >
      <p className="text-center text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white/40 mb-6">
        Trusted by
      </p>
      <div
        className="relative w-full overflow-hidden"
        // Pause the marquee on hover via CSS.
        style={{ ["--marquee-state" as string]: "running" }}
      >
        <div className="group flex">
          <div className="flex shrink-0 items-center gap-14 pr-14 animate-marquee group-hover:[animation-play-state:paused]">
            {items.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-[1.25rem] font-bold whitespace-nowrap text-white/35 hover:text-white transition-colors duration-200 tracking-tight"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
