const dir = "/trusted-logos";

type ClientLogo = { name: string; file: string };

// All logos are transparent, so the white-monochrome filter below renders
// each mark in clean white on the dark strip. To add one, drop a
// transparent PNG/SVG into /public/trusted-logos and add a row here.
const clientLogos: ClientLogo[] = [
  { name: "DS Smith", file: "ds-logo-color.svg" },
  { name: "Haydale", file: "haydale.png" },
  { name: "Cegedim", file: "cegedim.webp" },
  { name: "Gwent Police", file: "gwent-police.png" },
  { name: "Medac", file: "medac.svg" },
  { name: "Practice Toolkit", file: "practice-toolkit.svg" },
  { name: "Be Business Fit", file: "be-business-fit.svg" },
  { name: "Healthy HR", file: "healthy-hr.svg" },
  { name: "The Clarified Company", file: "clarified-company.png" },
  { name: "Web Marketer", file: "web-marketer.svg" },
  { name: "Welch Fitness", file: "welch-fitness.svg" },
  { name: "Belle Vitale", file: "belle-vitale.png" },
  { name: "Christie Residential", file: "christie-residential.svg" },
  { name: "Smoke & Slaw", file: "smoke-slaw.png" },
  { name: "Lavender & Lemon", file: "lavender-and-lemon.svg" },
  { name: "Body Talk", file: "body-talk.png" },
  { name: "Femmely", file: "femmely.png" },
  { name: "The Nest", file: "thenest-_primary-teal-transparent.svg" },
  { name: "Bean & Bread", file: "bean-and-bread.png" },
  { name: "Sales Made Easy", file: "sales-made-easy.svg" },
  { name: "3 Sheds", file: "3-sheds.svg" },
  { name: "Aqualogic", file: "Aqualogic-Master-Logo-White-Transparent.png" },
];

export default function LogoStrip() {
  // Duplicate so the marquee loops seamlessly via translateX(-50%).
  const items = [...clientLogos, ...clientLogos];

  return (
    <section
      aria-label="Trusted by"
      className="bg-dawn-80 py-12 overflow-hidden border-y border-dawn-60"
    >
      <p className="text-center text-[0.75rem] font-bold uppercase tracking-[0.12em] text-dragon-fire mb-8">
        Trusted by
      </p>
      <div className="relative w-full overflow-hidden">
        <div className="group flex">
          <ul
            className="flex shrink-0 items-center gap-16 pr-16 animate-marquee group-hover:[animation-play-state:paused]"
            style={{ animationDuration: "90s" }}
          >
            {items.map((logo, i) => {
              const isClone = i >= clientLogos.length;
              return (
                <li
                  key={`${logo.file}-${i}`}
                  className="shrink-0 flex items-center"
                  aria-hidden={isClone || undefined}
                >
                  {/* Force every logo to white for a cohesive strip. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${dir}/${logo.file}`}
                    alt={isClone ? "" : logo.name}
                    loading="lazy"
                    className="h-10 w-auto max-w-[180px] object-contain opacity-50 hover:opacity-100 transition-opacity duration-200 [filter:brightness(0)_invert(1)]"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
