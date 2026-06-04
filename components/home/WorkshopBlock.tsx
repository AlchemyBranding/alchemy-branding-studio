import Image from "next/image";

import Button from "@/components/Button";
import Reveal from "@/components/motion/Reveal";

const capabilities = [
  {
    title: "Branding and identity",
    body: "A look and voice that match the quality of your work.",
  },
  {
    title: "Websites",
    body: "Fast, clear sites that turn visitors into enquiries.",
  },
  {
    title: "Animation and motion",
    body: "Explaining the complicated in seconds.",
  },
  {
    title: "Content and social",
    body: "Keeping the brand alive after launch.",
  },
];

/**
 * Workshop-led foundation block. The brief says no service catalogue,
 * so capabilities sit BENEATH the main story rather than as the lead.
 * Visual treatment: left-column copy + a stacked image collage on the
 * right (workshop in action), with subtle stagger reveal on scroll.
 *
 * Replace the three image src paths with real workshop photography
 * once available. Until then, the dawn-80 placeholder cards read as
 * a designed empty state, not a broken one.
 */
export default function WorkshopBlock() {
  return (
    <section
      id="workshop"
      aria-labelledby="workshop-heading"
      className="bg-dawn py-[140px] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Left column — copy + capabilities */}
          <div>
            <Reveal>
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
                Where every project starts
              </p>
              <h2
                id="workshop-heading"
                className="font-display text-h2 mt-4 text-white"
              >
                Every project starts with{" "}
                <span className="italic text-dusk">the workshop.</span>
              </h2>
              <p className="mt-8 text-[1.0625rem] leading-[1.75] text-white/75 max-w-xl">
                The Brand Strategy Workshop is where we get clear on
                who you are for, what you stand for, and why anyone
                should choose you. It is the foundation everything
                else is built on: identity, website, animation and
                content all flow from it.
              </p>
            </Reveal>

            <Reveal delayMs={150}>
              <ul
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6"
                aria-label="Capabilities"
              >
                {capabilities.map((c) => (
                  <li key={c.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-2 block w-5 h-px shrink-0 bg-dragon-fire"
                    />
                    <div>
                      <p className="text-[1rem] font-bold text-white">
                        {c.title}
                      </p>
                      <p className="mt-1 text-[0.875rem] leading-[1.55] text-white/60">
                        {c.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delayMs={300}>
              <div className="mt-10">
                <Button variant="primary" href="/services">
                  Explore the workshop
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right column — image collage */}
          <Reveal delayMs={200}>
            <WorkshopCollage />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Three-image collage. Top image is the hero shot; two smaller frames
 * stack below offset and at slight rotation for visual depth.
 *
 * Each image slot has a fallback styled empty state so the layout
 * still reads as designed before real photography lands.
 */
function WorkshopCollage() {
  const images: Array<{ src: string | null; alt: string }> = [
    {
      src: "/827A3629.jpg",
      alt: "Alchemy brand strategy session in the studio",
    },
    {
      src: "/827A3684.jpg",
      alt: "Working through brand strategy with the Alchemy team",
    },
    {
      src: "/workshop/workshop-main.jpg",
      alt: "Jess Morgan facilitating a brand strategy session with the leadership team in the studio",
    },
  ];
  const [main, secondary, tertiary] = images;

  return (
    <div className="relative aspect-square w-full max-w-[560px] mx-auto">
      {/* Main image, top right */}
      <Frame
        src={main.src}
        alt={main.alt}
        className="absolute top-0 right-0 w-[78%] aspect-[4/5] rotate-[1.5deg]"
      />
      {/* Secondary, lower left, larger overlap */}
      <Frame
        src={secondary.src}
        alt={secondary.alt}
        className="absolute bottom-[8%] left-0 w-[60%] aspect-[4/5] -rotate-[2deg] shadow-2xl"
      />
      {/* Small accent tile, bottom right */}
      <Frame
        src={tertiary.src}
        alt={tertiary.alt}
        className="absolute bottom-0 right-[6%] w-[42%] aspect-square rotate-[3deg] shadow-xl"
      />

      {/* Soft dragon-fire glow behind the stack */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,110,73,0.18),transparent_60%)] blur-2xl"
      />
    </div>
  );
}

function Frame({
  src,
  alt,
  className,
}: {
  src: string | null;
  alt: string;
  className: string;
}) {
  return (
    <div
      className={`${className} rounded-card overflow-hidden bg-dawn-80 border border-dawn-60`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 280px, 50vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dawn-60 via-dawn-80 to-dawn">
          <span className="text-[0.625rem] uppercase tracking-[0.2em] text-white/30 text-center px-4">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}
