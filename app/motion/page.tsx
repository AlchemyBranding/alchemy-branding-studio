import type { Metadata } from "next";

import Link from "next/link";

import AnimatedLink from "@/components/motion/AnimatedLink";
import BeforeAfter from "@/components/motion/BeforeAfter";
import Counter from "@/components/motion/Counter";
import MagneticButton from "@/components/motion/MagneticButton";
import Reveal from "@/components/motion/Reveal";
import Spotlight from "@/components/motion/Spotlight";
import StaggeredList from "@/components/motion/StaggeredList";
import TextReveal from "@/components/motion/TextReveal";
import TiltCard from "@/components/motion/TiltCard";

export const metadata: Metadata = {
  title: "Motion playground",
  description:
    "Internal page demonstrating motion effects we could roll out across the site.",
  robots: { index: false, follow: false },
};

export default function MotionPage() {
  return (
    <>
      <section className="bg-dawn pt-[160px] md:pt-[200px] pb-[80px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
            Motion playground
          </p>
          <h1 className="font-display text-display mt-4 max-w-5xl leading-[1.04]">
            <span className="text-white">Effects we could add,</span>{" "}
            <span className="text-dusk italic">in context.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[1.125rem] leading-[1.7] text-white/65">
            Six self-contained motion patterns that fit the existing
            vocabulary of the site. Each one is shown here in isolation
            with a note on where it would fit. Pick the ones you want
            to roll out and we&apos;ll wire them in.
          </p>
        </div>
      </section>

      {/* 1. Scroll-triggered reveal */}
      <Demo
        number="01"
        title="Scroll-triggered reveal"
        kicker="The foundation"
        notes="Subtle fade + 24px upward translate as content enters the viewport. Same easing as the homepage hero on first load, just triggered by scroll instead of mount. Fits every long-form page: case study sections, blog body, services page sub-sections, about page principles."
      >
        <Reveal>
          <div className="rounded-card bg-dawn-80 border border-dawn-60 p-10 md:p-16">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-dragon-fire">
              How it lands
            </p>
            <h3 className="font-display text-h2 mt-4 text-white">
              Scroll down. This block fades up.
            </h3>
            <p className="mt-6 text-[1.0625rem] leading-[1.7] text-white/65 max-w-2xl">
              Used sparingly across page sections, this is the single most
              valuable upgrade for the site&apos;s perceived polish.
              Cumulative cost: about ten lines of code, zero external
              dependencies.
            </p>
          </div>
        </Reveal>
      </Demo>

      {/* 2. Staggered list */}
      <Demo
        number="02"
        title="Staggered list reveal"
        kicker="Sequential, not all at once"
        notes="Each item appears 80ms after the previous one. Reads as a deliberate sequence rather than a wall of content arriving at once. Where it'd fit: the four Principles on /about, the six Capabilities on /services, the seven Pain Signals on /services, the deliverables list on every case study."
      >
        <StaggeredList
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          itemClassName="rounded-card bg-dawn-80 border border-dawn-60 p-8"
        >
          <div>
            <p className="text-dragon-fire font-bold">01</p>
            <h4 className="font-display text-h4 text-white mt-3">
              Strategy comes first
            </h4>
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-white/70">
              Positioning, audience, voice, messaging — settled before a
              pixel moves.
            </p>
          </div>
          <div>
            <p className="text-dragon-fire font-bold">02</p>
            <h4 className="font-display text-h4 text-white mt-3">
              Craft is non-negotiable
            </h4>
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-white/70">
              Type, motion, layout, code held to a high standard
              everywhere, not just the hero.
            </p>
          </div>
          <div>
            <p className="text-dragon-fire font-bold">03</p>
            <h4 className="font-display text-h4 text-white mt-3">
              Built to scale
            </h4>
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-white/70">
              Brand systems, not one-off artefacts.
            </p>
          </div>
          <div>
            <p className="text-dragon-fire font-bold">04</p>
            <h4 className="font-display text-h4 text-white mt-3">
              Run as a partnership
            </h4>
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-white/70">
              Embedded with your team. Async-friendly. We ship in the
              open and defend our calls.
            </p>
          </div>
        </StaggeredList>
      </Demo>

      {/* 3. Counter */}
      <Demo
        number="03"
        title="Animated number counter"
        kicker="For outcomes that need to land"
        notes="Counts from zero to the target when scrolled into view. Where it'd fit: a stats strip on case studies (%uplift in CTR, time saved, customers reached). Useful sparingly — needs real numbers to anchor it, otherwise it reads as theatre."
      >
        <Reveal>
          <div className="rounded-card bg-dawn-80 border border-dawn-60 p-10 md:p-16">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-dragon-fire">
              After three months
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <div className="font-display text-[clamp(3rem,5vw,5rem)] leading-none text-white">
                  <Counter to={47} suffix="%" />
                </div>
                <p className="mt-4 text-[0.9375rem] text-white/65 leading-[1.5]">
                  Increase in inbound qualified leads
                </p>
              </div>
              <div>
                <div className="font-display text-[clamp(3rem,5vw,5rem)] leading-none text-white">
                  <Counter to={12} suffix="x" />
                </div>
                <p className="mt-4 text-[0.9375rem] text-white/65 leading-[1.5]">
                  Faster sales-cycle to first call
                </p>
              </div>
              <div>
                <div className="font-display text-[clamp(3rem,5vw,5rem)] leading-none text-white">
                  <Counter to={3.2} decimals={1} suffix="m" />
                </div>
                <p className="mt-4 text-[0.9375rem] text-white/65 leading-[1.5]">
                  Total views across all channels
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Demo>

      {/* 4. Sticky scroll-pin */}
      <Demo
        number="04"
        title="Sticky scroll-pin"
        kicker="Headings hold while content moves"
        notes="The heading on the left stays in place while the content on the right scrolls past. Adds reading rhythm to long case studies and the services page. CSS-only — no JavaScript. Scroll within the block below to see it."
      >
        <div className="rounded-card border border-dawn-60 bg-dawn-80 p-10 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
            <div className="md:sticky md:top-32 self-start">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-dragon-fire">
                Approach
              </p>
              <h3 className="font-display text-h3 mt-3 text-white">
                Workshop first. Pixels last.
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-[1.6] text-white/65">
                The heading pins. The body keeps moving.
              </p>
            </div>
            <div className="space-y-6 text-[1.0625rem] leading-[1.75] text-white/80">
              <p>
                Brand strategy is the long game. Identity, story,
                positioning, voice. The decisions that shape how a
                business shows up across every touchpoint for the next
                five years.
              </p>
              <p>
                Most strategy projects fail by being too abstract.
                Boards full of values nobody can recall, decks nobody
                opens twice. We treat the workshop as a working session,
                not a presentation.
              </p>
              <p>
                The output isn&apos;t a doc. It&apos;s a sharper version
                of the team that walked in. A team that can repeat the
                positioning under pressure, brief copywriters, hire to
                fit, and turn down the work that doesn&apos;t match.
              </p>
              <p>
                Everything downstream of the workshop — identity,
                website, content, sales collateral — runs faster
                because the strategic decisions are already made and
                defensible.
              </p>
              <p>
                That&apos;s the case for putting the workshop first.
                You can buy logos cheaper. You can&apos;t buy clarity
                cheaper.
              </p>
            </div>
          </div>
        </div>
      </Demo>

      {/* 5. Magnetic button */}
      <Demo
        number="05"
        title="Magnetic button"
        kicker="Premium feel, on the moments that matter"
        notes="Hover the button below. It drifts a few pixels toward the cursor. Reserved for the one or two highest-intent CTAs per page (Book a call, Send a brief). Overusing the effect dilutes it — most buttons should be the plain version."
      >
        <Reveal>
          <div className="rounded-card bg-dawn-80 border border-dawn-60 p-10 md:p-20 flex items-center justify-center">
            <MagneticButton href="/contact">Book a discovery call</MagneticButton>
          </div>
        </Reveal>
      </Demo>

      {/* 6. Tilt card */}
      <Demo
        number="06"
        title="Tilt card"
        kicker="Tactile depth without being a toy"
        notes="Tilt follows the cursor across the card. Max 6 degrees in any direction. Tasteful — feels like the card has weight and physicality. Where it'd fit: featured portfolio cards on the homepage, services callouts. Avoid on text-heavy cards where the tilt would make the copy hard to read."
      >
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TiltCard className="rounded-card bg-dawn-80 border border-dawn-60 p-10 md:p-12">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-dragon-fire">
                Case study
              </p>
              <h4 className="font-display text-h3 text-white mt-4">
                DS Smith
              </h4>
              <p className="mt-4 text-[0.9375rem] leading-[1.6] text-white/65">
                Animated explainer for EUDR compliance. Move your cursor
                across this card.
              </p>
            </TiltCard>
            <TiltCard className="rounded-card bg-dawn-80 border border-dawn-60 p-10 md:p-12">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-dragon-fire">
                Case study
              </p>
              <h4 className="font-display text-h3 text-white mt-4">
                Welch Fitness
              </h4>
              <p className="mt-4 text-[0.9375rem] leading-[1.6] text-white/65">
                Rebrand built around &quot;leave your ego at the door&quot;.
              </p>
            </TiltCard>
          </div>
        </Reveal>
      </Demo>

      {/* 7. Text reveal word-by-word */}
      <Demo
        number="07"
        title="Text reveal, word-by-word"
        kicker="Headline as a sequence, not a wall"
        notes="Each word fades up 60ms after the previous one when the block enters the viewport. Best reserved for the one hero headline per page. Overusing it on every heading dilutes the moment."
      >
        <div className="rounded-card bg-dawn-80 border border-dawn-60 p-10 md:p-16">
          <TextReveal
            text="Brand strategy, design and animation for ambitious businesses."
            className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-white"
          />
        </div>
      </Demo>

      {/* 8. Before / after */}
      <Demo
        number="08"
        title="Before / after on hover"
        kicker="The rebrand reveal"
        notes="Default frame is the new identity. Hover to see what came before. A small badge tells the visitor which one they're looking at. Best fit: rebrand case studies (Welch Fitness, Christie Residential, Web Marketer), site redesigns, anywhere the contrast is the story. Needs a real before image per study."
      >
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BeforeAfter
              afterSrc="https://cdn.sanity.io/images/kr13x7nd/production/5dc5112c40582212af28e05fcede8bcc725116a6-2560x1440.png"
              beforeSrc="https://cdn.sanity.io/images/kr13x7nd/production/8c951e9efa22056053374719188a4b829cb1e830-1920x1080.png"
              afterAlt="DS Smith hero (illustrative after)"
              beforeAlt="Welch Fitness hero (illustrative before)"
            />
            <div className="self-center">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-dragon-fire">
                Illustrative
              </p>
              <h4 className="font-display text-h3 text-white mt-3">
                Hover to swap.
              </h4>
              <p className="mt-4 text-[0.9375rem] leading-[1.6] text-white/65">
                The two frames here aren&apos;t a real before/after pair —
                they&apos;re standing in to show the mechanic. In real
                use the studio would shoot or recreate the prior
                identity to make the contrast land.
              </p>
            </div>
          </div>
        </Reveal>
      </Demo>

      {/* 9. Animated underline link */}
      <Demo
        number="09"
        title="Animated underline link"
        kicker="Inline restraint"
        notes="The underline draws in from left to right on hover instead of being always-on. Subtle, but it gives editorial links a touch of motion craft. Slot into the PortableText link mark in blog posts and case studies. Hover the link to see it."
      >
        <div className="rounded-card bg-dawn-80 border border-dawn-60 p-10 md:p-16">
          <p className="text-[1.125rem] leading-[1.75] text-white/80 max-w-2xl">
            When the marketing isn&apos;t landing, the diagnosis is
            usually upstream of the campaigns. That&apos;s the case
            for the{" "}
            <AnimatedLink href="/services">Brand Strategy Workshop</AnimatedLink>.{" "}
            Hover the link to see the underline draw in. Compare with
            a regular link:{" "}
            <Link
              href="/services"
              className="text-dragon-fire underline underline-offset-4"
            >
              Brand Strategy Workshop
            </Link>
            .
          </p>
        </div>
      </Demo>

      {/* 10. Cursor spotlight */}
      <Demo
        number="10"
        title="Cursor-tracked spotlight"
        kicker="Light follows the visitor"
        notes="A soft dragon-fire glow follows the cursor across the block. CSS-only effect, mouse position piped through state. Best on hero CTAs and feature blocks where interactivity needs to feel discoverable but never showy. Move your cursor across the block below."
      >
        <Spotlight className="rounded-card bg-dawn-80 border border-dawn-60 p-10 md:p-16">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-dragon-fire">
            Try it
          </p>
          <h3 className="font-display text-h2 mt-4 max-w-2xl text-white">
            Glide your cursor across this block.
          </h3>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-white/65">
            The light follows the cursor at full size on hover, fades
            out cleanly on leave. The block underneath stays still and
            readable. Subtle, but the page feels alive.
          </p>
        </Spotlight>
      </Demo>

      <section className="bg-dawn py-[120px]">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-dragon-fire">
            Next step
          </p>
          <h2 className="font-display text-h2 mt-4 text-white">
            Pick the ones you want and we&apos;ll roll them in.
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-[1.7] text-white/65">
            All six effects are self-contained components living under
            <code className="text-dusk px-1.5">components/motion/</code>.
            Adopting one means dropping the component into the page
            section it suits, no new dependencies.
          </p>
        </div>
      </section>
    </>
  );
}

function Demo({
  number,
  title,
  kicker,
  notes,
  children,
}: {
  number: string;
  title: string;
  kicker: string;
  notes: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-dawn border-t border-dawn-80 py-[100px] md:py-[140px]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 mb-16">
          <div className="lg:sticky lg:top-32 self-start">
            <p className="text-dragon-fire font-bold text-[0.875rem]">
              {number}
            </p>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-dragon-fire mt-3">
              {kicker}
            </p>
            <h2 className="font-display text-h2 mt-3 text-white">{title}</h2>
            <p className="mt-6 text-[0.9375rem] leading-[1.7] text-white/65">
              {notes}
            </p>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
