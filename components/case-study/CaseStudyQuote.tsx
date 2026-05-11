type Props = {
  quote: string;
  attribution: string | null;
};

export default function CaseStudyQuote({ quote, attribution }: Props) {
  return (
    <section
      aria-label="Client quote"
      className="bg-dusk text-dawn py-[120px]"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <span
          aria-hidden="true"
          className="font-display text-[5rem] leading-none text-dragon-fire/40 -mb-4 inline-block"
        >
          &ldquo;
        </span>
        <p className="font-display text-[1.625rem] leading-[1.5] text-dawn max-w-3xl mx-auto">
          {quote}
        </p>
        {attribution ? (
          <p className="mt-8 text-[0.875rem] font-bold uppercase tracking-[0.12em] text-dawn-40">
            {attribution}
          </p>
        ) : null}
      </div>
    </section>
  );
}
