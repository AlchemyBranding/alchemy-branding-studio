# Product

## Register

brand

## Users

UK SME owners and leadership teams, typically turning over £500k to £15M, in
businesses that have outgrown the brand they started with. They arrive from
search or referral because something has stopped working: the website reads as
an expensive brochure, the identity falls apart once other people use it, or
nobody can say what the business argues.

They are sceptical of agencies, usually because they have bought from one
before. They skim on a laptop between other work. They are not designers and do
not want to be sold a process. They want to know whether these people
understand the problem, what it costs, and what happens first.

## Product Purpose

alchemybranding.studio is Alchemy's own marketing site. Its job is to qualify
and convert: to move the right prospects toward a booked call or the £5,000
brand strategy workshop, and to let the wrong ones leave quickly.

The site is workshop-led rather than service-catalogued. There is deliberately
no packages page and no menu of deliverables. Service pages exist to answer one
buying question honestly and hand the reader to the workshop or a call.

Success is booked calls and workshop enquiries from businesses that already
half-know their problem is positioning.

## Brand Personality

Plain. Certain. Unshowy.

Short declaratives. No hype, no hedging, no vocabulary that exists to sound
expensive. Willing to tell a prospect the thing they did not ask to hear: that
their problem is positioning rather than design, and that the site will be
cheaper and faster once the argument is settled.

The voice on the site is the reference:

- "Leaving things out is most of the job."
- "That is a real floor rather than a headline number."
- "We will say so if you come to us for a site and the positioning underneath
  it is not ready."

The design carries the same register. Confident enough to be quiet. The work is
the evidence, so the interface should get out of its way rather than perform
around it.

## Anti-references

All four were named explicitly. Any one of them showing up is a failure.

- **Generic SaaS landing page.** Icon-and-heading card grids, gradient blobs,
  big-number stat rows, three identical feature columns. The default shape of an
  AI-generated marketing page.
- **Agency portfolio cliché.** Scroll-jacking, cursor-following blobs, endless
  parallax, autoplaying showreels over everything. Style with nothing underneath
  it. Especially dangerous here, because this is a design studio's own site and
  the pull toward it is strong.
- **Corporate consultancy.** Stock handshakes and meeting rooms, navy and grey,
  safe symmetrical grids, copy that could belong to any firm.
- **Over-designed and illegible.** Low-contrast text on busy imagery,
  decorative type at body sizes, motion that gets between the reader and the
  argument.

## Design Principles

1. **The site is the proof.** A brand studio that cannot brand itself has no
   argument. Every page is a worked example of what the client is buying, which
   sets a floor on craft that ordinary marketing sites do not have.

2. **Show the work, do not describe it.** Real client builds, real identities,
   real frames. Never a floating device mockup standing in for evidence we do
   not have, and never an invented asset. If there is no real asset for a slot,
   the slot stays empty and that gets reported.

3. **Say the hard thing.** The pages that convert are the ones that rule people
   out: who this is not for, what it actually costs, what has to happen first.
   Design should give that copy room rather than soften it.

4. **Leaving things out is most of the job.** Restraint is the house style, not
   a budget constraint. Prefer one committed decision to three tentative ones.
   Decoration must earn its place against the argument it sits next to.

5. **Legibility outranks impression.** The reader is skimming, sceptical and
   mid-task. Nothing decorative may cost contrast, reading order or speed.

## Accessibility & Inclusion

WCAG 2.2 AA is the bar.

- Body text at 4.5:1 or better, large text and UI at 3:1 or better.
- Full keyboard operation with a visible focus state. The global focus ring is
  a 2px dragon-fire outline.
- `prefers-reduced-motion` is honoured globally. Reveal and StaggeredList both
  fall back to a plain render rather than a near-zero transition, and anything
  new must do the same.
- Decorative layers are `aria-hidden`. Meaningful images carry alt text that
  describes the image rather than repeating the nearest heading.
