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
| `/brand-strategy-workshop` | Full-width copy, then a full-bleed letterbox photograph band underneath |

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

### What is usable in `public/workshop/`

- `workshop-hero.webp` — the current hero. BATCH 3-106 with a second person
  erased at her request. **There is a faint cool cast where the wall behind her
  was rebuilt**, visible at hero width. Not yet fixed.
- `workshop-whiteboard.webp` — the word-association exercise. Real proof that
  the session produces written decisions.
- `TW_CANDID_*` and `BATCH 3-*` — usable, but they are Tiny Wizard era, 2021
  and 2022, from the previous business.
- `1779*.jpg` — **not usable.** All four are from a Zokit networking event and
  the frame is dominated by other companies' branding, phone numbers and
  accreditation logos.
- `workshop-accent.png` — **do not use.** It has AI artefacts: the signage text
  is mangled, and it carries a generative-AI badge and a carousel counter. It
  is an upscaled screenshot. Note that git currently reports this file and
  `workshop-detail.png` as deleted while they are still on disk. Nobody has
  explained that yet.

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
