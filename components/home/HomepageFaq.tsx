/**
 * Workshop-anchored FAQ for the homepage. Uses native <details> for
 * keyboard accessibility and zero-JS correctness; chevron rotates on
 * open via Tailwind's group-open variant. Also emits a FAQPage
 * JSON-LD block so the questions can show as rich results in search.
 *
 * Answers from the go-live copy approved by Dave and Jess on 8 Oct 2026
 * (alchemy-marketing-plan/work/2026-10-website-copy/04-alchemy-home.md).
 * The price range appears here and on the workshop page only, never in
 * the hero or meta description.
 */

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "What is the Brand & Growth Workshop?",
    a: "A day with your team working out where the business wants to be in five to ten years, how it plans to get there and how it wins customers, so your brand, sales and marketing are built to support that growth. Within two weeks you get a full strategy: positioning, who you're for, messaging, tone of voice, and a plan for putting it to work.",
  },
  {
    q: "What does it cost?",
    a: "£2,000 to £5,000 plus VAT, including the strategy document. Where you land depends on the size and complexity of the business, and we confirm the figure on the Clarity Call.",
  },
  {
    q: "Who do you work with?",
    a: "Ambitious SMEs, usually somewhere between £500k and £15M turnover. Founders, marketing leads and operators who want their brand to match the quality of what they do.",
  },
  {
    q: "What happens after the workshop?",
    a: "The strategy ends with our recommendation. You take it from here, with a follow-up at 90 days. Or Jess guides your team. Or we deliver it. You decide once you've seen it.",
  },
  {
    q: "How long does it take?",
    a: "One day on site. The strategy follows within two weeks.",
  },
  {
    q: "Do you cap rounds of amends?",
    a: "No. We keep going until you're happy, because we only publish work we're proud of.",
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
