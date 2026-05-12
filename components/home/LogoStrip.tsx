// Folder name has a space — URL-encode it once at the prefix.
const dir = "/Trusted%20Logos";

type ClientLogo = { name: string; file: string };

const clientLogos: ClientLogo[] = [
  { name: "Aqualogic", file: "Aqualogic-Master-Logo-White-Transparent.png" },
  { name: "BBF", file: "BBF__PRIMARY_OFFWHITE.png" },
  { name: "Enaid", file: "Enaid-Primary.png" },
  { name: "Primary Light", file: "Primary-Light.png" },
  { name: "S&S", file: "SS-Primary.png" },
  { name: "VI", file: "VI-Full-Logo.png" },
  { name: "Wickedfit", file: "WF_BADGE_DARK.png" },
  { name: "WMContact", file: "WMContact.jpg" },
  { name: "DS", file: "ds-logo-color.svg" },
  { name: "Client", file: "images.png" },
  { name: "Storicy", file: "storicyrmu_logo.jpg" },
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
                  className="h-8 w-auto max-w-[160px] object-contain opacity-50 hover:opacity-100 transition-opacity duration-200 [filter:brightness(0)_invert(1)]"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
