import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

export default function LegalLayout({
  eyebrow,
  title,
  lastUpdated,
  children,
}: Props) {
  return (
    <>
      <section className="bg-dawn pt-[140px] md:pt-[180px] pb-12 border-b border-dawn-80">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          {eyebrow ? (
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.1] mt-4 text-white">
            {title}
          </h1>
          <p className="mt-6 text-[0.875rem] text-white/50">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="bg-dawn py-16">
        <div className="max-w-3xl mx-auto px-6 md:px-10 legal-prose">
          {children}
        </div>
      </section>
    </>
  );
}
