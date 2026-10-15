/**
 * The brand checklist and newsletter sign-up, shared by the three forms (homepage-style inline section,
 * footer, pop-up) and by /api/newsletter, which forwards each sign-up to Opus.
 *
 * Opus records the exact wording below as the person's consent, so the forms and the route must use
 * this one string. Change it here, nowhere else.
 */
export const NEWSLETTER_CONSENT =
  "Email me the checklist and the occasional brand note. No spam, unsubscribe anytime.";

/** What the visitor sees once they've signed up: Opus emails them to confirm, then sends the checklist. */
export const NEWSLETTER_CONFIRM_HEADING = "Check your inbox.";
export const NEWSLETTER_CONFIRM_TEXT =
  "We've sent you an email to confirm your address. Confirm it and the checklist follows straight away.";

/** Which form a sign-up came from (also the GTM form_location). */
export type NewsletterForm =
  | "homepage"
  | "brand-identity"
  | "brand-strategy-workshop"
  | "website-design"
  | "footer"
  | "popup";
