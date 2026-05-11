import Link from "next/link";

type Service = {
  number: string;
  title: string;
  description: string;
  href: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Brand Strategy",
    description:
      "Positioning, messaging and market clarity for ambitious businesses.",
    href: "/services",
  },
  {
    number: "02",
    title: "Visual Identity",
    description:
      "Logo systems, brand guidelines and design assets built to last.",
    href: "/services",
  },
  {
    number: "03",
    title: "Animation",
    description:
      "Explainer videos, motion graphics and animated campaigns that convert.",
    href: "/services",
  },
  {
    number: "04",
    title: "Proposal Design",
    description:
      "On-brand proposal templates built inside Better Proposals, Proposify and Qwilr.",
    href: "/custom-proposal-design",
  },
];

export default function ServicesOverview() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-dawn py-[120px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          What we do
        </p>
        <h2
          id="services-heading"
          className="font-display text-h2 mt-3 max-w-3xl text-white"
        >
          Strategy and craft, built to scale.
        </h2>
        <p className="mt-6 max-w-xl text-[1.125rem] leading-[1.7] text-white/65">
          We help founders, marketing leaders and operators ship brands that
          look, sound and feel like the businesses they want to become.
        </p>

        <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <li key={service.title}>
              <Link
                href={service.href}
                className="group block h-full rounded-card bg-dawn-80 border border-dawn-60 p-8 transition-all duration-300 ease-out hover:border-dragon-fire hover:-translate-y-1"
              >
                <p className="text-dragon-fire font-bold text-[1.5rem] leading-none">
                  {service.number}
                </p>
                <h3 className="mt-4 font-bold text-[1.125rem] text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-[1.6] text-white/60">
                  {service.description}
                </p>
                <p className="mt-6 text-[0.875rem] font-medium text-dragon-fire group-hover:underline underline-offset-4">
                  Learn more →
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center text-[1rem] font-medium text-dragon-fire hover:underline underline-offset-4"
          >
            Explore all services →
          </Link>
        </div>
      </div>
    </section>
  );
}
