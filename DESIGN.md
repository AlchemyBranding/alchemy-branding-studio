---
name: Alchemy Branding Studio
description: Workshop-led brand studio site, dark ground with one hot accent
colors:
  dusk: "#191919"
  dusk-80: "#303030"
  dusk-60: "#474747"
  dusk-40: "#5E5E5E"
  dusk-20: "#757575"
  dragon-fire: "#FE6D4C"
  fire-80: "#FE7C5E"
  fire-60: "#FE8A70"
  fire-40: "#FE9982"
  fire-20: "#FFB6A6"
  dawn: "#F6F1EB"
  pixie-pink: "#FE86F6"
  curious-blue: "#3052F9"
  mindaro: "#C4FE79"
  space-green: "#00524D"
  ultra-violet: "#9A4EFF"
typography:
  display:
    fontFamily: "p22-mackinac-pro, Georgia, Times New Roman, serif"
    fontSize: "clamp(3rem, 6vw, 7rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  h2:
    fontFamily: "p22-mackinac-pro, Georgia, Times New Roman, serif"
    fontSize: "clamp(2rem, 4vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  h3:
    fontFamily: "p22-mackinac-pro, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-lg:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  eyebrow:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.15em"
rounded:
  sm: "6px"
  card: "12px"
  pill: "9999px"
spacing:
  gutter-sm: "24px"
  gutter-lg: "40px"
  section-tight: "120px"
  section-loose: "140px"
  hero-top: "200px"
components:
  button-primary:
    backgroundColor: "{colors.dragon-fire}"
    textColor: "{colors.dusk}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
    typography: "{typography.eyebrow}"
  button-primary-hover:
    backgroundColor: "{colors.fire-80}"
  button-secondary:
    backgroundColor: "{colors.dusk}"
    textColor: "{colors.dawn}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-secondary-hover:
    textColor: "{colors.dragon-fire}"
  card:
    backgroundColor: "{colors.dusk-80}"
    textColor: "{colors.dawn}"
    rounded: "{rounded.card}"
    padding: "28px"
  section-dark:
    backgroundColor: "{colors.dusk}"
    textColor: "{colors.dawn}"
  section-light:
    backgroundColor: "{colors.dawn}"
    textColor: "{colors.dusk}"
  section-raised:
    backgroundColor: "{colors.dusk-80}"
    textColor: "{colors.dawn}"
---

> **Renamed 12 Oct 2026** to match the brand guidelines (slides 19 and 46). Dusk `#191919` is the near-black ground; Dawn `#F6F1EB` is the warm off-white (was `#FAF8F7`, named dusk). No pure white: text that was white is Dawn. Body text on Dusk runs at `dawn/65` or above.


# Design

## Overview

A dark studio site carrying one hot accent. The ground is Dusk, a warm
near-black at `#191919`, and almost everything sits on it. Dawn, an off-white at
`#F6F1EB`, inverts whole sections rather than appearing as panels inside dark
ones. Dragon Fire, a coral orange at `#FE6D4C`, is the only accent in regular
use.

The colour strategy is **restrained**: tinted neutrals plus one accent well
under 10% of any surface. Dragon Fire appears on eyebrows, links, buttons,
markers and the focus ring. It is never a background field except on the final
call to action.

Structure is section-rhythmic rather than card-driven. Pages alternate Dusk and
Dawn in long vertical bands, most of them a two-column grid with a sticky label
column on the left and the argument on the right. The type does the work: a
serif display against a sans body, at a scale ratio wide enough that hierarchy
never depends on colour.

## Colors

**Neutrals.** Dusk `#191919` is the base. The `dusk-80` through `dusk-20` ramp
(`#303030`, `#474747`, `#5E5E5E`, `#757575`) supplies raised surfaces, borders
and muted text. `dusk-80` is the standard card and raised-band fill; `dusk-60`
is the standard hairline border. Neutrals are warm rather than pure grey, which
keeps them related to the accent.

**Accent.** Dragon Fire `#FE6D4C` with a lightening ramp to `fire-20`
`#FFB6A6`. `fire-80` is the button hover. `fire-60` is the link hover on dark.
Dragon Fire on Dusk is the signature pairing and is also the focus-ring colour.

**Inversion.** Dawn `#F6F1EB` is a full-section background, not a surface. When
a section is Dawn, body copy flips to Dusk at around 70 to 80% opacity and the
accent stays Dragon Fire.

**Secondary palette.** Pixie Pink, Curious Blue, Mindaro, Space Green and Ultra
Violet exist in the tokens and are currently unused on service pages. Treat them
as a deliberate reserve for editorial or data moments. Introducing one is a
decision to make on purpose, not a way to add variety.

**Contrast.** Body text on Dusk runs at `dawn/65` to `dawn/75`. That clears
4.5:1 and must not be lowered. Anything below `dawn/65` on Dusk is out (brand guidelines, 12 Oct 2026) and is
not allowed for text.

## Typography

Two families. **P22 Mackinac Pro** is the serif display face, used through the
`font-display` utility at weight 400 with a 1.1 line height. Italic Mackinac
carries the second half of most headlines, which is the site's most recognisable
typographic move: a roman first clause, an italic close.

**Satoshi** is the sans, and the body default at 16px / 1.6.

The scale is fluid and wide. Display runs `clamp(3rem, 6vw, 7rem)`, h2 runs
`clamp(2rem, 4vw, 3.5rem)`, h3 runs `clamp(1.25rem, 2.5vw, 1.75rem)`. The steps
sit well beyond a 1.25 ratio, so hierarchy survives at any width.

Eyebrows are the third voice: 0.8rem Satoshi at weight 500, uppercase, letter
spaced 0.12em to 0.15em, always Dragon Fire. Every major section opens with one.
They are the navigational spine of a long page.

Measure is held by `max-w-2xl` on body copy, roughly 65 to 70 characters.
Headlines run wider, to `max-w-3xl` or `max-w-5xl`.

## Elevation

Elevation is expressed through background steps and hairlines, not shadows.
There is no shadow scale.

The four levels, in order: Dusk `#191919` for base sections; `dusk-80`
`#303030` for raised bands and cards; a `dusk-60` `#474747` 1px border for
definition; and Dawn `#F6F1EB` for full inversion.

A raised band is `bg-dusk-80` with `border-y border-dusk-60`. A card is
`bg-dusk-80` with `border border-dusk-60` and a 12px radius. Cards never nest.

Depth in hero areas comes from a soft radial glow rather than a shadow: a
Dragon Fire radial gradient at 0.16 to 0.18 alpha, spanning the full section so
no element edge shows, with no blur filter. Images that sit on Dusk should carry
their own transparency rather than a baked background, so anything behind them
shows through.

## Components

**Buttons** are full pills, uppercase Satoshi at 0.875rem, tracked 0.08em, with
a 200ms ease-out transform on hover (`scale-[1.02]`) and active
(`scale-[0.99]`). Primary is Dragon Fire on Dusk text. Secondary is Dusk with a
`dusk-80` border that turns Dragon Fire on hover. Two further variants,
`primary-on-fire` and `secondary-on-fire`, exist for the Dragon Fire final CTA
band.

**Section shell.** `max-w-7xl mx-auto px-6 md:px-10`, with vertical padding of
120px on tight sections and 140px on loose ones. Heroes take `pt-[160px]` rising
to `pt-[200px]` from md.

**Two-column argument block.** `grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20
items-start`, with the eyebrow and h2 in a `lg:sticky lg:top-32` left column and
the prose in the right. This is the workhorse layout for any section making a
case.

**Links in prose** are Dragon Fire, underlined at `underline-offset-4`, hovering
to `fire-60`.

**Reveal and StaggeredList** are the two scroll-reveal primitives. Both use a
700ms `cubic-bezier(0.16, 1, 0.3, 1)` translate-and-fade, StaggeredList
offsetting children by 80ms. Both check `prefers-reduced-motion` and skip
straight to the visible state rather than running a near-zero transition.

**Work grid.** One large tile plus two small, the large one `lg:row-span-2`,
with the flagship pulled by a `featuredHero` flag so it matches the homepage.

## Do's and Don'ts

**Do** open every section with a Dragon Fire eyebrow. It is the spine readers
skim by.

**Do** split headlines into a roman clause and an italic close. It is the
strongest piece of brand equity in the type.

**Do** invert whole sections to Dawn for rhythm. Roughly one tonal inversion per
page, so it stays an event.

**Do** express depth with background steps and hairlines. `dusk-80` fills,
`dusk-60` borders.

**Do** give any new motion a `prefers-reduced-motion` fallback that lands on the
visible state.

**Don't** use shadows for elevation. There is no shadow scale and adding one
would break the flat, printed feel.

**Don't** drop body text below `dawn/65` on Dusk. It fails AA.

**Don't** reach for card grids. Three identical icon-and-heading cards is the
generic-SaaS failure this brand is explicitly defined against. The two-column
argument block is almost always the better answer.

**Don't** introduce a secondary palette colour casually. They are held in
reserve; using one is a deliberate editorial decision.

**Don't** use gradient text, glassmorphism, side-stripe accent borders, or a
big-number stat row. All four are house-banned.

**Don't** write an em dash anywhere in copy or comments. Commas, colons,
semicolons, full stops or parentheses instead.
