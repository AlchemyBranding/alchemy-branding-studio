/**
 * Slugs of blog posts that existed on the WordPress alchemybranding.studio
 * but aren't being migrated to the new Sanity-backed site. Each gets a 301
 * redirect to /news to preserve any inbound link equity. Used by
 * next.config.ts.
 *
 * Curation principles:
 *  - Posts with significant external backlinks are preserved (kept off
 *    this list) and re-created in Sanity at the same slug.
 *  - Posts with meaningful organic traffic (>= 10 clicks / 12 months
 *    in GSC) are preserved likewise — redirecting them to /news would
 *    drop actual visitors arriving on topical pages.
 *
 * 17 posts are NOT in this list (re-create them in Sanity at their
 * exact slug to keep the URL working).
 *
 * Backlink-driven (per SEO team's backlink report):
 *  - /quality-over-cost-the-smart-investment-in-animated-explainer-videos
 *  - /5-reasons-brand-identity-guidelines-are-so-important
 *  - /why-we-dogs-are-the-best-office-companions
 *
 * Traffic-driven (>= 10 clicks / 12 months per GSC):
 *  - /5-examples-of-tech-firms-killing-it-with-brand-driven-animated-storytelling   (133 clicks)
 *  - /5-brand-strategy-exercises-you-can-do-for-free                                (130)
 *  - /your-logo-cheat-sheet-how-to-use-logo-file-formats                            (88)
 *  - /the-10-best-brand-storytelling-examples                                       (70)
 *  - /discover-the-key-differences-between-brand-identity-strategy-...              (67)
 *  - /a-complete-guide-to-designing-an-effective-brand-identity-...                 (65)
 *  - /amazing-2d-animation-styles-with-examples-and-why-they-work                   (51)
 *  - /five-reasons-no-one-will-read-your-annual-report-...                          (20)
 *  - /the-power-and-necessity-of-brand-discovery-workshops                          (18)
 *  - /the-importance-of-sme-brand-strategy-for-growth-and-loyalty                   (14)
 *  - /your-logo-cheat-sheet                                                         (14)
 *  - /how-style-frames-can-help-you-meet-your-video-deadline                        (13)
 *  - /master-brand-identity-vs-image-actionable-tips                                (12)
 *  - /our-work-for-the-tom-channon-safety-campaign-...                              (10)
 *
 * To preserve another post in future: remove its slug from this array
 * AND create the matching blogPost document in Sanity Studio at the
 * exact same slug. The Sanity route will start serving instead.
 */
export const legacyBlogSlugs: readonly string[] = [
  "how-i-use-adobe-express-to-help-sales-and-marketing-teams-create-consistent-content-faster",
  "how-to-scale-a-business",
  "everyone-wants-growth-hardly-anyone-builds-the-conditions-for-it",
  "high-converting-proposals-stop-following-up",
  "how-sales-listening-skills-win-more-deals-than-logic",
  "brand-inconsistency-internal-confusion",
  "brand-inconsistency-trust-erosion",
  "brand-inconsistency-lost-momentum",
  "rebrand-your-business-with-a-strong-branding-strategy",
  "alchemy-this-is-how-we-work-july-edition",
  "alchemy-this-is-how-we-work-june-edition",
  "beyond-the-logo-what-brand-strategy-actually-means-for-scaling",
  "business-growth-strategies-podcast",
  "brand-strategy-scaling",
  "a-fresh-coat-of-alchemy-paint",
  "why-and-how-to-leverage-ai-in-marketing-to-empower-your-team",
  "building-a-business-culture-that-lasts-its-more-than-bean-bags-and-pizza-fridays",
  "5-ways-to-utilise-animated-explainer-videos-in-your-marketing-strategy",
  "set-your-marketers-up-for-success-strong-brand-foundations-drive-growth",
  "effortless-social-media-planning-time-saving-strategies-for-the-inspirationally-challenged",
  "discover-the-secrets-to-crafting-a-brand-identity-that-captivates-and-retains-loyal-customers",
  "10-years-in-business-8-things-i-have-learned",
  "discover-how-to-make-a-splash-with-your-new-brand-identity-and-captivate-your-target-audience-effectively",
  "six-new-businesses-with-brands-that-bang-2",
  "what-is-branding-why-even-a-one-man-band-cant-afford-to-skip-it",
  "our-6-step-process-for-developing-your-brand-identity",
  "four-reasons-tv-advertising-should-be-part-of-your-marketing-strategy",
  "how-videos-reduce-support-times-and-save-money",
  "how-animated-explainer-videos-drive-software-and-app-sales",
  "colour-theory-in-branding-how-to-choose-your-brand-colours",
  "navigating-the-temptations-consistency-vs-fickle-trends",
  "how-to-conquer-inconsistent-branding",
  "how-animation-changed-the-game-for-dairypower",
  "simplifying_healthcare_tech_with_animation",
  "brilliant-benefits-of-animated-explainer-videos",
  "if-youre-commissioning-an-animated-explainer-these-are-five-of-the-most-important-dos-and-donts",
  "16-animated-explainer-video-facts",
  "welcome-to-the-storyboard-stage",
  "self-censorship-and-why-it-makes-us-miserable",
  "why-are-discovery-workshops-so-important",
  "lets-talk-about-ego-in-business",
  "why-putting-a-cap-on-amendments-is-so-outdated-and-curbs-creativity",
  "how-many-wizards-does-it-take-to-create-an-animated-video",
  "maximise-your-marketing-efforts-with-animated-explainer-videos",
  "how-to-tell-your-story-through-animation-without-walking-talking-characters",
  "why-animation-can-help-you-connect-with-your-audience-in-uncertain-times",
  "an-animated-christmas-video-the-present-your-audience-always-wanted",
  "why-every-brand-needs-an-animated-christmas-video",
  "tiny-wizard-studio-on-amazon-prime-video-surely-not",
  "how-long-should-an-explainer-video-be",
  "who-needs-to-read-a-headline-when-you-can-watch-an-animated-video",
  "why-can-i-hear-an-audio-watermark-on-my-explainer-video",
  "5-reasons-brand-identity-guidelines-are-so-important-for-brands",
  "how-to-create-animated-explainer-videos",
  "what-is-a-better-question-for-your-creative-agency-than-do-you-have-something-similar-we-can-see",
  "our-5-step-process-for-developing-your-brand-identity",
  "our-6-step-process-for-creating-spellbinding-animated-videos",
  "why-we-chose-to-build-our-agency-in-house-and-come-back-into-the-office",
  "animated-explainer-videos-what-you-need-to-know-and-why-you-cant-do-without-one",
  "why-animation-doesnt-come-cheap",
  "why-brand-storytelling-is-important",
  "5-ways-you-can-use-animated-video",
  "5-things-to-consider-when-choosing-a-creative-agency",
  "why-animated-video-is-the-best-way",
  "6-biggest-mistakes-made-by-businesses-when-dipping-their-toes-into-the-world-of-video-marketing",
  "introducing-the-welsh-creative-industries-entrepreneurs-of-the-year",
];
