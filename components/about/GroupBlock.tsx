import { groupSites } from "@/lib/site";

export default function GroupBlock() {
  return (
    <section
      aria-labelledby="group-heading"
      className="bg-dawn py-[120px] border-t border-dawn-80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          The Alchemy Group
        </p>
        <h2
          id="group-heading"
          className="font-display text-h2 mt-4 max-w-3xl text-white"
        >
          Three brands. One operator.
        </h2>
        <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-white/65">
          Alchemy sits inside a small group focused on commercial brand work
          for ambitious businesses — studio, consultancy and podcast,
          each with its own surface area.
        </p>

        <ul className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {groupSites.map((site, i) => {
            const inner = (
              <>
                <p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-dragon-fire">
                  0{i + 1}
                </p>
                <h3 className="mt-3 font-display text-[1.5rem] leading-tight text-white">
                  {site.name}
                </h3>
                <p className="mt-2 text-[0.9375rem] text-white/60">
                  {site.descriptor}
                </p>
                {site.href ? (
                  <p className="mt-6 text-[0.875rem] font-medium text-dragon-fire group-hover:underline underline-offset-4">
                    Visit site →
                  </p>
                ) : (
                  <p className="mt-6 text-[0.875rem] font-medium text-white/40">
                    You are here
                  </p>
                )}
              </>
            );

            return (
              <li key={site.name}>
                {site.href ? (
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full rounded-card bg-dawn-80 border border-dawn-60 p-8 transition-all duration-300 ease-out hover:border-dragon-fire hover:-translate-y-1"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="h-full rounded-card bg-dawn-80 border border-dragon-fire/40 p-8">
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
