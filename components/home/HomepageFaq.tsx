/**
 * Workshop-anchored FAQ for the homepage. Uses native <details> for
 * keyboard accessibility and zero-JS correctness; chevron rotates on
 * open via Tailwind's group-open variant. Also emits a FAQPage
 * JSON-LD block so the questions can show as rich results in search.
 *
 * Decisions baked in from the brief + user notes:
 *  - No cost mentioned anywhere on the page (price stays a discovery
 *    call conversation).
 *  - Workshop length defaults to "typically half a day".
 */

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "What is the Brand Strategy Workshop?",
    a: "A focused working session where we get clear on who you are for, what you stand for, and how you are different. You leave with a defined brand strategy that guides your identity, website and content.",
  },
  {
    q: "What does it cost?",
    a: "Scope and pricing depend on what your business needs. We talk through the work in a discovery call and confirm everything with you before any work begins.",
  },
  {
    q: "Who do you work with?",
    a: "Ambitious SMEs, usually somewhere between £500k and £15M turnover. Founders, marketing leads and operators who want their brand to match the quality of what they do.",
  },
  {
    q: "What happens after the workshop?",
    a: "You leave with a defined brand strategy. We deliver it either as a standalone document or as a brand portal that keeps your strategy and guidelines in one place, ready for your marketing and sales team to work from. Identity, website and content then flow from it, built in-house, with us, or both.",
  },
  {
    q: "How long does it take?",
    a: "Typically half a day, scaling to a full day or more depending on the size of your team and the complexity of your business. We confirm the shape with you before we begin.",
  },
];

export default function HomepageFaq() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <section
        aria-labelledby="faq-heading"
        className="bg-dawn-80 py-[140px] border-t border-dawn-60"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Common questions
          </p>
          <h2
            id="faq-heading"
            className="font-display text-h2 mt-4 text-white"
          >
            What people ask{" "}
            <span className="italic text-dusk">before the call.</span>
          </h2>

          <ul className="mt-14 border-t border-dawn-60">
            {faqs.map((f) => (
              <li key={f.q} className="border-b border-dawn-60">
                <details className="group">
                  <summary className="flex items-start justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:text-dragon-fire transition-colors duration-200">
                    <span className="font-display text-[1.25rem] leading-[1.35] text-white group-hover:text-dragon-fire transition-colors duration-200">
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 mt-1 text-dragon-fire text-[1.5rem] leading-none transition-transform duration-300 ease-out group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="pb-7 -mt-1 max-w-3xl">
                    <p className="text-[1rem] leading-[1.7] text-white/70">
                      {f.a}
                    </p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
