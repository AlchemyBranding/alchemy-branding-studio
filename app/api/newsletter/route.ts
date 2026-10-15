import { NextResponse } from "next/server";

import { NEWSLETTER_CONSENT } from "@/lib/newsletter";

/**
 * Newsletter and brand-checklist sign-up, for the three forms (inline section, footer, pop-up).
 *
 * Each sign-up goes to Opus (Alchemy's own system), server to server, with the shared key
 * NEWSLETTER_SIGNUP_KEY. Opus records the consent (the exact wording below, the page and the form),
 * emails the person to confirm their address (double opt-in), and sends the checklist once they do.
 * Opus is the only place sign-ups go.
 *
 * There is no fallback: if Opus can't be reached, the visitor is told to try again. In production a
 * missing key is the same error, never a pretend success. Only local development (no key) simulates.
 */

const OPUS_SIGNUP_URL = process.env.OPUS_NEWSLETTER_SIGNUP_URL || "https://opus.alchemybranding.studio/api/newsletter-signup";
const SIGNUP_KEY = process.env.NEWSLETTER_SIGNUP_KEY;
const TRY_AGAIN = "Couldn't sign you up just then. Please try again.";

type NewsletterPayload = {
  email?: string;
  consent?: boolean | string;
  /** Honeypot: must stay empty. */
  company?: string;
  /** The page the form was on, and which form (homepage, footer, popup...). */
  page?: string;
  form?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isConsented(value: NewsletterPayload["consent"]) {
  return value === true || value === "true" || value === "on";
}

/** The visitor's address, which Opus only ever stores as a keyed hash (for its sign-up limits). */
function visitorIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "";
}

const short = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: NewsletterPayload;
  try {
    body = (await request.json()) as NewsletterPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields, humans don't.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = body.email?.trim() ?? "";

  const errors: Record<string, string> = {};
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  if (!isConsented(body.consent)) {
    errors.consent = "Please tick the box so we can email you the checklist.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Invalid input", fields: errors }, { status: 422 });
  }

  if (!SIGNUP_KEY) {
    if (process.env.NODE_ENV !== "production") {
      // Local development only: pretend it worked so the forms can be worked on without Opus.
      console.info("[newsletter] NEWSLETTER_SIGNUP_KEY not set (development): not sent to Opus.");
      return NextResponse.json({ ok: true, simulated: true });
    }
    console.error("[newsletter] NEWSLETTER_SIGNUP_KEY is not set: sign-ups can't reach Opus.");
    return NextResponse.json({ error: TRY_AGAIN }, { status: 503 });
  }

  try {
    const res = await fetch(OPUS_SIGNUP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${SIGNUP_KEY}` },
      body: JSON.stringify({
        email,
        consent: true,
        consentText: NEWSLETTER_CONSENT,
        page: short(body.page, 500) || null,
        form: short(body.form, 60) || null,
        honeypot: "",
        ip: visitorIp(request),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (res.status === 422) {
      // Opus found something wrong with the address: show its words on the form.
      const detail = (await res.json().catch(() => ({}))) as { error?: string; fields?: Record<string, string> };
      return NextResponse.json({ error: detail.error ?? "Invalid input", fields: detail.fields ?? {} }, { status: 422 });
    }
    if (!res.ok) {
      console.error("[newsletter] Opus answered", res.status);
      return NextResponse.json({ error: TRY_AGAIN }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] couldn't reach Opus:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: TRY_AGAIN }, { status: 502 });
  }
}
