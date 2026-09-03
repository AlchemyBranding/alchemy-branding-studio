<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:alchemy-house-rules -->
# Working on this repo

Written 2 September 2026 from things that had to be rediscovered by reading
the code. Everything below is either a constraint someone decided, or a fact
checked against the running system on that date. If you find a claim here that
the code contradicts, the code wins and this file is a defect. Fix it.

## The reference layer lives in a different repo

Cadence, pillars, brand voice, banned phrases, the publish checklist and the
hero build procedure live in `alchemy-content-engine`, alongside this one in
`CLAUDE_CODE/`. That repo's rule is **one fact, one place**. Do not restate a
number from it here. Link to it.

The ones that touch this repo:

- `core/featured-image-procedure.md` — how blog heroes and page imagery are
  built and treated
- `core/publish-checklist.md` — the gate before an article goes live
- `decisions/OPEN.md` — the single list of unsettled questions

## Service pages must not converge on one hero shape

Three service pages, three shapes, on purpose. This is written in a comment in
`app/brand-identity/page.tsx` and is easy to break by copying the nearest page.

| Page | Hero shape |
|---|---|
| `/brand-identity` | Copy in a 56% column, full-height media column flush right, masked with a left-to-right gradient |
| `/website-design` | Copy in a 56% column, floating laptop object bleeding off the right edge |
| `/brand-strategy-workshop` | Full-bleed photograph behind the whole hero, copy in a right-hand 62% column over a directional scrim. The only one of the three with the copy on the right, and that is the point |

Before adding a hero to a fourth page, look at all three and pick something
none of them does.

## Photography

Treat imagery the way `core/featured-image-procedure.md` does: **desaturate to
knock competing colour back, do not underexpose.** Underexposing a bright
source turns it grey and muddy. The workshop hero runs at `saturate-[0.82]`
because the teal screen in it fights Dragon Fire.

**Verify every crop at 390, 768, 1440 and 1920 before shipping.** Not by eye on
one monitor. `object-cover` with a fixed band height crops differently at every
width, and the first version of the workshop hero cut the top of the subject's
head off at 1920 while looking correct at 1440. Simulating the object-cover
maths is enough; a browser is better.

`[verified 2 Sep]` A fixed band height also means the crop keeps tightening as
the viewport grows past the last breakpoint, because the image scales with
width while the band does not. The workshop hero clears the subject's head at
all four widths above but clips it past roughly 2985px, which is real on a
3440-wide monitor. A band that must survive arbitrary width needs its height in
`vw` above the last breakpoint, not a fixed pixel value.

The Browser pane's screenshots on this machine come back black once the page is
scrolled, whatever the emulated size. Playwright is the reliable way to see a
crop: set the viewport, then screenshot the `img` element itself, which returns
exactly the rendered band.

### What is usable in `public/workshop/`

- `workshop-hero.webp` — the current hero. BATCH 3-106 with a second person
  erased at her request. `[verified 2 Sep]` The erase left the rebuilt wall in
  two tinted blocks, warm above and cool below, with a hard seam between them
  and a blue fringe against the TV. **Fixed 2 September 2026**: the wall's real
  colour was measured off the untouched parts of the same frame (neutral, with
  blue about 2 levels under red, darkening roughly 12 levels top to bottom) and
  the repair's low-frequency colour replaced with it, keeping the grain. The
  wall now reads as one surface. `workshop-hero-dave.jpg` is the same corrected
  render, and only the webp is referenced by the page.
- `workshop-whiteboard.webp` — the word-association exercise. Real proof that
  the session produces written decisions.
- `TW_CANDID_*` and `BATCH 3-*` — usable, but they are Tiny Wizard era, 2021
  and 2022, from the previous business.
- `1779*.jpg` — **not usable as they stand.** All four are from a Zokit
  networking event and the frame is dominated by other companies' branding,
  phone numbers and accreditation logos. `[verified 2 Sep]` One sanctioned
  exception exists, `workshop-audience.webp` below. Anything else cut from
  these four needs the same test: every third-party wordmark, QR code and URL
  outside the frame, and no caption or alt text calling it an Alchemy session.
- `workshop-audience.webp` — the background of "Who it suits". A 1090x580 crop
  of `1779791616888.jpg` at left 700, top 790, exported at saturation 0.55 with
  shadows lifted (linear 0.62/66) and blurred at sigma 2.6. The crop puts the
  Zokit banner, the MDSS wordmark, the National Business Show banner and its QR
  code, and the Zokit tote outside the frame; the treatment takes the small
  print left on the stand behind Jess from legible to under 2 levels of local
  contrast, while the room still reads. The treatment is baked into the file on
  purpose, so the branding is gone from the asset and not merely hidden under a
  CSS overlay. **Re-exporting without it puts the branding back.** And it is a
  Zokit event, not an Alchemy workshop: do not caption it as one.
- `workshop-accent.png` and `workshop-detail.png` — **gone, deliberately.**
  `[verified 3 Sep]` Both were deleted from disk by someone at some point and
  the deletions sat unstaged in the tree for weeks; they are now committed. An
  earlier version of this note claimed the files were still on disk, which was
  wrong. Nothing in the codebase referenced either.

  `workshop-accent.png` should not come back: it has AI artefacts, the signage
  text is mangled, and it carries a generative-AI badge and a carousel counter,
  because it is an upscaled screenshot. `workshop-detail.png` has no such
  objection recorded, so if it turns out to have been deleted by accident,
  recover it from `b6c1911` rather than assuming it was junk.

## Scrims go over the photograph, never into the file

`[verified 2 Sep]` Two sections now run text over a photograph, and both do the
legibility work with a CSS overlay rather than by darkening the asset. That is
what keeps `core/featured-image-procedure.md`'s "desaturate, do not
underexpose" true: the file is served at full exposure and only the composite
under the text moves.

Both scrims are directional, heaviest where the copy is and easing off where
the picture has to carry, and both are keyed to their section's ground:

| Section | Scrim colour | Because |
|---|---|---|
| `/brand-strategy-workshop` hero | dawn `rgba(25,25,25,…)`, 0.96 right to 0.08 left | white text on dark, copy on the right |
| "Who it suits" | dusk `rgba(250,248,247,…)`, 0.86 left to 0.62 right | dark text on light |

Mobile gets an even veil instead of a horizontal gradient, because the copy
runs the full width and there is no clear side to ease towards.

Check the numbers, not the look. Estimating the composite by eye is what goes
wrong: the hero's copy looked like it was sitting on a bright wall, so the body
paragraph was raised to white/80, and measuring the actual composite showed the
ground behind it is 35 out of 255 and white/65 already gives 7.4:1. It went
back to white/65. Composite the gradients onto the real image and sample the
regions the text occupies, rather than reasoning from the photograph's own
brightness.

`[verified 2 Sep]` Measured on the built composite at 1440x954, copy right:
hero eyebrow 5.1:1, h1 16.0:1, body 7.8:1. At 390 the body is 6.3:1.

The hero's stops were not chosen by eye. They came out of a grid search over
the knee position, the depth of the drop, the far-side floor and the vertical
gradient's mid value, scored on three contrast ratios and on how bright the
subject ends up. Two things worth keeping from that: every combination tried
cleared 4.5:1, so contrast was never the binding constraint, and the binding
constraint was the Dragon Fire eyebrow, which needs its ground at 51 or darker
to reach 4.5:1 and therefore sets how far right the scrim has to stay heavy.
Re-tune with the harness rather than by hand if the copy or the crop moves.

One known failure, and it predates any of this: `text-dragon-fire` on a light
ground is 2.6:1, under the 4.5:1 that 0.8rem text needs. Every eyebrow on every
`bg-dusk` section is affected, so it is a site-wide decision rather than a
page-level fix. Adding a photograph behind "Who it suits" moved it to 2.5:1,
which is to say it changed nothing.

### `text-display` assumes a full-width headline

`[verified 2 Sep]` `--text-display` is `clamp(3rem, 6vw, 7rem)`, which is sized
for a headline that gets the whole container. Drop it into a narrower column
and it does not know: at 1920 in the workshop hero's 62% column it set 112px
type in 794px, six lines, a 1383px hero, and put the CTA 1192px down, below the
fold on a 1080 screen. The hero now uses `clamp(2.75rem,5.2vw,5.25rem)`, the
largest that still sets in four lines there. Any hero with copy in a column
wants its own clamp, and the test is where the CTA lands, not how the type
looks.

## Design tokens are in CSS, not a Tailwind theme

`app/globals.css` holds them as custom properties: `--color-dawn` `#191919`,
`--color-dusk`, `--color-dragon-fire` `#FE6D4C`, `--color-dawn-60`,
`--radius-card` `12px`, `--text-h2`, `--text-display`. Check there before
inventing a class. `rounded-card`, `bg-dawn`, `text-dragon-fire` and
`border-dawn-60` are all real and already in use.

## Sanity

Project `kr13x7nd`, dataset `production`, workspace `alchemy-branding-studio`.

`blogPost` requires `title`, `slug`, `category`, `publishedAt` and
`featuredImage`. The `seo` object holds exactly five fields: `metaTitle`,
`metaDescription`, `ogImage`, `noIndex`, `canonicalUrl`. **There is no
`focusKeyphrase`.** A publish-checklist item gated on it for weeks and passed
every article by passing everything.

### The hero upload scripts, and the trap

- `scripts/upload-hero-draft.mjs` — **use this one.** Patches `drafts.<id>` and
  stops. Prints `still unpublished: YES`.
- `scripts/upload-hero.mjs` — **publishes the article as a side effect.** Its
  last step copies the draft over the published id and deletes the draft. It
  also fails outright when no published version exists. Only for replacing the
  hero on an article that is already live.

Passing a `drafts.` prefix to `upload-hero.mjs` does not make it safe. It
prints `Published.` either way.

## State of this working tree

`[verified 2 Sep]` The tree carries modified files that predate any current
work, including `middleware.ts`, `app/layout.tsx`, `lib/site.ts`,
`tsconfig.json`, `.gitignore`, `components/NewsletterPopup.tsx`,
`components/home/WorkGrid.tsx`, both Stori Cymru login files and
`scripts/upload-hero.mjs`. **Commit by path, never `git add -A`**, or you will
sweep somebody's unfinished work into your commit.

## Verifying a change

Vercel builds a preview for every pushed branch, and the branch alias is the
fastest honest check. `npm run dev` is fine locally. TypeScript passing is not
evidence that a layout is right; look at the rendered page.
<!-- END:alchemy-house-rules -->
