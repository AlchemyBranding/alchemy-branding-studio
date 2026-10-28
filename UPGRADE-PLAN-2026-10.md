# Upgrade plan: Sanity 6, next-sanity 13, Next 16

Written 27 October 2026. Nothing has been changed yet. Every version below was read from the lockfile (current) or the npm registry (targets) on this date.

## In one screen

1. **The three upgrades are tied together.** The Sanity CLI security fix only exists in Sanity 6. Sanity 6 needs next-sanity 13. next-sanity 13 (and 12) only work with Next 16. So clearing the remaining audit items means moving all three.
2. **Size: small to medium.** The site already does the hard parts of Next 16 (all `params` and `draftMode()` calls are already awaited, no webpack config, no custom Sanity login, no custom Studio internals). About eight concrete edits in total.
3. **Plan: three steps on one branch (`upgrade/sanity6-next16`), one commit each, building and testing after each.** That way, if something breaks, we know which upgrade caused it.
4. **The one thing that would otherwise go wrong silently:** Sanity 5 turns on "smart typography" in the editor, so typing `--` becomes a dash and straight quotes become curly, written straight into the stored content. That breaks the no-em-dash rule. The plan switches it off on the body field.
5. **Nothing reaches the live site until you approve the merge.** Vercel builds a preview of the branch, and we test there first.

| Package | Now | Target |
| --- | --- | --- |
| next | 15.5.28 | 16.4.3 |
| eslint-config-next | 15.5.28 | 16.4.3 |
| react, react-dom | 19.2.9 | 19.2.9 (already fine) |
| sanity | 4.22.0 | 6.20.0 (published 19 Oct 2026) |
| @sanity/vision | 4.22.0 | 6.20.0 |
| next-sanity | 11.6.13 | 13.4.0 |

Node: Sanity 6 needs 22.12 or newer, Next 16 needs 20.9 or newer. This machine runs 24.15 and Vercel builds on 24.x, so nothing to change.

## Step 1: Next 16 (Sanity stays on 4)

next-sanity 11.6.13 accepts Next 16, so this step stands alone.

Edits:

1. `package.json`: next and eslint-config-next to 16.4.3.
2. `middleware.ts` (the Stori Cymru password gate): rename to `proxy.ts` and rename the function `middleware` to `proxy`. The old name still works in 16 but is deprecated. This moves the gate from the Edge runtime to Node, which is fine: it only reads a cookie and redirects.
3. Linting: `next lint` no longer exists. Replace the `lint` script with `eslint .` and replace `.eslintrc.json` with an `eslint.config.mjs` flat config (Next ships a codemod for both: `npx @next/codemod@canary next-lint-to-eslint-cli .`). Note: `next build` no longer runs lint either, which only matters if anyone relied on that.
4. Builds now use Turbopack by default. There is no custom webpack config, so no change is expected. If the Studio fails to build under Turbopack, the fallback is `next build --webpack`.

Behaviour changes with no edit needed (checked against the code):

- Image optimiser now caches for 4 hours instead of 60 seconds. Sanity image URLs change when the image changes, so this is safe.
- Image quality is now limited to 75 by default. The site sets no other quality, so no change.
- Size 16px dropped from image `srcset`s. Not used.
- Smooth-scroll override: the site doesn't set smooth scrolling, so no change.
- `revalidatePath` in the Sanity webhook route is unchanged.
- The build log no longer shows page sizes.

Test: build, then home, contact, a case study, a blog post, /studio, contact and newsletter forms, Stori Cymru gate and login, the webhook route, draft preview.

## Step 2: Sanity 5.31.2 (the last v5 release)

Edits:

1. `package.json`: sanity and @sanity/vision to 5.31.2. next-sanity stays on 11 (it accepts Sanity 5).
2. `sanity/schemas/objects/blockContent.ts`: switch off smart typography on the body field, so `--` and quotes are stored exactly as typed. Done through the field's Portable Text `plugins` component, setting `typography: { enabled: false }` (option confirmed in the Sanity 6.20 type definitions).

Editor-visible changes in v5, no edit needed:

- Pasting a URL into body text now makes it a link automatically. The site already renders `link` marks, so this works.
- Lists in Studio show the document type's icon when a document has no image.

## Step 3: Sanity 6.20.0 and next-sanity 13.4.0

Edits:

1. `package.json`: sanity and @sanity/vision to 6.20.0, next-sanity to 13.4.0.
2. `sanity/actions/previewAction.ts` line 1: the "Open preview" button's eye icon. Icons v5 removed the shared import, so `import { EyeOpenIcon } from "@sanity/icons"` must become `import { EyeOpenIcon } from "@sanity/icons/EyeOpen"`. Without this the button loses its icon, with only a type error to warn us (confirmed in the @sanity/icons 5.2.3 package).
3. Add four packages the code imports but never listed, so they can't vanish when the dependency tree is rebuilt: `@sanity/icons` ^5.2.3, `@sanity/asset-utils` ^2.3.0, `@sanity/preview-url-secret` ^4.1.5, `styled-components` ^6.1.15. Versions match what Sanity 6.20 itself uses.

Checked and fine:

- Every next-sanity function the site uses (`createClient`, `defineQuery`, `defineEnableDraftMode`, `parseBody`, `NextStudio`) still exists in 13.4.0. The v12 and v13 breaking changes are all in the live-preview components (`SanityLive`, `defineLive`), which the site does not use.
- `createPreviewSecret` has the same signature in preview-url-secret 4.
- No custom login, no search settings, no `sanity.cli.ts`, no custom Vite config, no Studio internals, no `data-slate` styling. All the high-risk Sanity 6 items do not apply.
- Sanity changelog 6.13 to 6.20: nothing that affects this site.

Editor-visible changes in v6, no edit needed:

- Studio search uses a new engine. Results and ordering will shift a little. No previews rely on referenced fields, so nothing should disappear from search.
- React strict mode is on when running the Studio locally. That only affects local development, and only shows up if something has a bug.

## After each step

1. `npm install`, `npm run build`, `npm audit`.
2. Local tests as in step 1.
3. Commit on the branch and push. Vercel builds a preview URL; repeat the checks there, including logging into /studio, opening a case study, editing a draft, using "Open preview", and checking a pasted link and a typed `--` in the body field.

## Expected result

`npm audit` should drop from 13 to around 0 to 2. Treat this as a prediction until `npm install` and `npm audit` run on the branch; npm can't confirm the final dependency tree before then.

## Questions for you

1. When should it go live? The Studio changes touch editing for you and Jess, so a quiet day is better.
2. Is anyone else editing in Studio this week? After step 3, the deployed Studio and the editors' browsers should be refreshed.
3. Smart typography: switch it off everywhere (recommended, matches the no-em-dash rule) or only on the body field? Only the body field uses rich text today, so in practice both mean the same thing.

## Already in the tree today (not caused by this upgrade)

Duplicate copies already present: `@sanity/types` 3.99.0 (via `@sanity/import` and `@sanity/sdk`) and 5.24.0 (via next-sanity), `@sanity/client` 6.29.1 (via next-sanity). These cause no known problems. They should clear or change after step 3; we check with `npm ls` then.
