import Link from "next/link";

import Button from "@/components/Button";
import { motionHref } from "@/lib/site";

/**
 * The direct route. Added 9 September 2026, from
 * alchemy-content-engine/seo/briefs/services-direct-route.md.
 *
 * Why this exists: the rest of /services described the workshop as a
 * precondition of working with the studio ("before we touch a logo, a website
 * or a campaign"), and that was not true. Three animations were in production
 * at the time with no wider engagement behind them. The page was turning away
 * work the studio takes.
 *
 * Why it sits HERE, after Capabilities and before WhoWeWorkWith: this is a
 * second door, not a fork. The reading order still puts the workshop argument
 * first and this follows it. If a later edit moves it above Workshop, or gives
 * it equal visual weight, the page becomes a menu and the positioning goes
 * with it. Don't.
 *
 * The list is four, not nine. Dave named nine things sold standalone; five are
 * not here on purpose. Social media marketing, report design, content
 * marketing and marketing strategy have no page to land on (social media
 * marketing 301s back to /services, so linking it would loop). Brand strategy
 * is the workshop, and listing it as an off-the-shelf purchase contradicts the
 * section above. Pages for social media marketing and report design are on the
 * October list; add them here when they exist, and nowhere else.
 *
 * The second paragraph is the load-bearing one. It is what lets the direct
 * route exist without the strategy-first positioning going with it, and Dave
 * has taken it as a commitment in writing. If anything in this section gets
 * cut later, it is not that.
 */
const standalone = [
  { title: "Animation and motion", href: "/animation" },
  { title: "Brand identity", href: "/brand-identity" },
  { title: "Website design", href: "/website-design" },
  { title: "Sales and proposal design", href: "/custom-proposal-design" },
];

export default function DirectRoute() {
  return (
    <section
      aria-labelledby="direct-route-heading"
      className="bg-dawn-80 py-[120px] border-y border-dawn-60"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-dragon-fire">
          The other way in
        </p>
        <h2
          id="direct-route-heading"
          className="font-display text-h2 mt-3 text-white"
        >
          If you already know{" "}
          <span className="italic text-dusk">what you need.</span>
        </h2>

        <p className="mt-8 text-[1.0625rem] leading-[1.75] text-white/70">
          Plenty of people arrive with the decision already made. A video with a
          date on it. A rebrand the board signed off months ago. A site that has
          to be live before the launch. A report that has to look like it came
          from a serious business. We take that work on its own, and we are good
          at it.
        </p>
        <p className="mt-6 text-[1.0625rem] leading-[1.75] text-white/70">
          One condition, and it is the only one. If we think the thing
          underneath is the actual problem, we will say so before you commission
          anything, not halfway through. A logo will not fix a proposition
          nobody can repeat, and we would rather lose the job than take it
          knowing that.
        </p>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
          {standalone.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="text-[1rem] font-bold text-dragon-fire underline underline-offset-4 hover:text-fire-60 transition-colors"
              >
                {s.title}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-[1.0625rem] leading-[1.75] text-white/70">
          We also build reports, run social and content, and take on the odd
          thing that does not fit a list. If you are not sure which of these you
          are after, that is what the call is for.
        </p>

        <div className="mt-10">
          <Button variant="secondary" href={motionHref} external>
            Book a call
          </Button>
        </div>
      </div>
    </section>
  );
}
