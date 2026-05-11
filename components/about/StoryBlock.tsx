export default function StoryBlock() {
  return (
    <section
      aria-labelledby="story-heading"
      className="bg-dawn py-[120px] border-t border-dawn-80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
        <div>
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Our story
          </p>
          <h2
            id="story-heading"
            className="font-display text-h2 mt-4 text-white"
          >
            We started Alchemy to do brand work that actually moves the business.
          </h2>
        </div>
        <div className="text-[1.0625rem] leading-[1.7] text-white/75 space-y-5 max-w-2xl">
          <p>
            We&apos;re a London-based creative studio working with ambitious
            founders, marketing teams and operators. We pair strategic clarity
            with craft — so the work doesn&apos;t just look the part, it earns
            its keep.
          </p>
          <p>
            We started Alchemy because too many brands look great in the deck
            and fall apart in the world. The polish stops at the homepage; the
            sales decks drift; the proposals show up flat. Brand should be
            consistent, scalable and useful — across every surface that
            customers actually touch.
          </p>
          <p>
            That&apos;s the work. Strategy, identity, animation, content,
            proposals — designed and produced together so it all moves in the
            same direction.
          </p>
        </div>
      </div>
    </section>
  );
}
