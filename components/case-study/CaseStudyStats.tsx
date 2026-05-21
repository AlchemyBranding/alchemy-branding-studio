import Counter from "@/components/motion/Counter";
import type { CaseStudyStat } from "@/sanity/lib/queries";

type Props = {
  stats: CaseStudyStat[];
};

export default function CaseStudyStats({ stats }: Props) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="bg-dawn border-b border-dawn-80 py-[80px] md:py-[100px]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-dragon-fire">
          The numbers
        </p>
        <div
          className={`mt-10 grid gap-12 ${
            stats.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : stats.length === 3
                ? "grid-cols-1 md:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {stats.map((s, i) => (
            <div key={`${s.label}-${i}`}>
              <div className="font-display text-[clamp(2.75rem,5vw,5rem)] leading-none text-white">
                <Counter
                  to={s.value}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                  decimals={s.decimals ?? 0}
                />
              </div>
              <p className="mt-4 text-[0.9375rem] text-white/65 leading-[1.5] max-w-xs">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
