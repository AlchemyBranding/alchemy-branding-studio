const dir = "/trusted-logos";

type ClientLogo = {
  name: string;
  file: string;
  /** "lg" bumps the rendered size for logos whose mark is small inside
   *  a generous canvas, so they don't look tiny next to the rest. */
  emphasis?: "lg";
};

// Only logos with transparent backgrounds work with the white-monochrome
// filter below — JPGs and PNGs with solid backgrounds render as flat
// white rectangles instead of just the mark. Dropped:
//   - WMContact.jpg, storicyrmu_logo.jpg (JPG = no alpha channel)
//   - images.png (couldn't ID the brand from the filename — re-add when
//     a properly-named transparent version arrives)
//   - Primary-Light.png (ditto)
const clientLogos: ClientLogo[] = [
  { name: "Aqualogic", file: "Aqualogic-Master-Logo-White-Transparent.png" },
  { name: "Be Business Fit", file: "BBF__PRIMARY_OFFWHITE.png", emphasis: "lg" },
  { name: "Enaid", file: "Enaid-Primary.png" },
  { name: "Smoke & Slaw", file: "SS-Primary.png", emphasis: "lg" },
  { name: "VI", file: "VI-Full-Logo.png" },
  { name: "Wickedfit", file: "WF_BADGE_DARK.png" },
  { name: "DS Smith", file: "ds-logo-color.svg" },
  { name: "The Nest", file: "thenest-_primary-teal-transparent.svg" },
];

export default function LogoStrip() {
  // Duplicate so the marquee loops seamlessly via translateX(-50%).
  const items = [...clientLogos, ...clientLogos];

  return (
    <section
      aria-label="Trusted by"
      className="bg-dawn-80 py-10 overflow-hidden"
    >
      <p className="text-center text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white/40 mb-8">
        Trusted by
      </p>
      <div className="relative w-full overflow-hidden">
        <div className="group flex">
          <ul className="flex shrink-0 items-center gap-16 pr-16 animate-marquee group-hover:[animation-play-state:paused]">
            {items.map((logo, i) => (
              <li
                key={`${logo.name}-${i}`}
                className="shrink-0 flex items-center"
              >
                {/* Force every logo to white so the marquee feels cohesive
                    regardless of each brand's original mark colour. */}
                <img
                  src={`${dir}/${logo.file}`}
                  alt={logo.name}
                  loading="lazy"
                  className={`w-auto object-contain opacity-50 hover:opacity-100 transition-opacity duration-200 [filter:brightness(0)_invert(1)] ${
                    logo.emphasis === "lg"
                      ? "h-14 max-w-[240px]"
                      : "h-8 max-w-[160px]"
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
