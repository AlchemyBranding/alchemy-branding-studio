const dir = "/trusted-logos";

type ClientLogo = {
  name: string;
  file: string;
  /** Bumps the rendered size for marks that read small in the strip. */
  size?: "lg";
  /** Render in grayscale (monochrome, detail preserved) instead of the flat
   *  white silhouette, e.g. a detailed crest that would otherwise be a blob. */
  textured?: boolean;
  /** Logo has no usable colour original (e.g. a dark-only wordmark). Stays
   *  white on hover instead of revealing colour, so it doesn't disappear on
   *  the dark strip. */
  monoOnly?: boolean;
};

// Logos are transparent, so the white-monochrome filter renders each mark in
// clean white on the dark strip. "textured" opts a logo out of that filter.
const clientLogos: ClientLogo[] = [
  { name: "DS Smith", file: "ds-logo-color.svg", size: "lg" },
  { name: "Haydale", file: "haydale.png" },
  { name: "Cegedim", file: "cegedim.webp" },
  { name: "Gwent Police", file: "gwent-police.png", textured: true, size: "lg" },
  { name: "Medac", file: "medac.svg" },
  { name: "Practice Toolkit", file: "practice-toolkit.svg" },
  { name: "Be Business Fit", file: "be-business-fit.svg", size: "lg", monoOnly: true },
  { name: "Healthy HR", file: "healthy-hr.svg" },
  { name: "The Clarified Company", file: "clarified-company.png", monoOnly: true },
  { name: "Web Marketer", file: "web-marketer.svg", monoOnly: true },
  { name: "Welch Fitness", file: "WF_WORDMARK_DARK.png", monoOnly: true },
  { name: "Belle Vitale", file: "belle-vitale.png", monoOnly: true },
  { name: "Christie Residential", file: "christie-residential.svg", monoOnly: true },
  { name: "Smoke & Slaw", file: "smoke-slaw.png" },
  { name: "Lavender & Lemon", file: "lavender-and-lemon.svg", monoOnly: true },
  { name: "Body Talk", file: "body-talk.png", monoOnly: true },
  { name: "Femmely", file: "femmely.png" },
  { name: "The Nest", file: "thenest-_primary-teal-transparent.svg" },
  { name: "Bean & Bread", file: "bean-and-bread.png", monoOnly: true },
  { name: "Sales Made Easy", file: "sales-made-easy.svg", size: "lg" },
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${dir}/${logo.file}`}
                    alt={isClone ? "" : logo.name}
                    loading="lazy"
                    className={`w-auto object-contain opacity-50 transition-all duration-300 hover:opacity-100 ${
                      logo.textured
                        ? "[filter:grayscale(1)_brightness(1.15)]"
                        : "[filter:brightness(0)_invert(1)]"
                    } ${logo.monoOnly ? "" : "hover:[filter:none]"} ${
                      logo.size === "lg"
                        ? "h-14 max-w-[240px]"
                        : "h-10 max-w-[180px]"
                    }`}
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
