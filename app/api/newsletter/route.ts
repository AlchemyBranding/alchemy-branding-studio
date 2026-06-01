import { NextResponse } from "next/server";

/**
 * Newsletter signup endpoint for the homepage brand-checklist lead magnet.
 *
 * Mirrors the simulated-until-configured pattern used by /api/contact:
 * until the HubSpot env vars are present it validates the input and
 * returns { ok: true, simulated: true } so the form can be iterated on
 * without provisioning HubSpot. Once HUBSPOT_PORTAL_ID and
 * HUBSPOT_NEWSLETTER_FORM_GUID are set in Vercel, it forwards the email
 * to the HubSpot Forms Submissions API.
 */

const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
const FORM_GUID = process.env.HUBSPOT_NEWSLETTER_FORM_GUID;
// Data-residency region. This portal is on EU (app-eu1), so default to eu1.
// na1 uses the global api.hsforms.com host; other regions use api-<region>.
const REGION = process.env.HUBSPOT_FORMS_REGION || "eu1";
const FORMS_HOST =
  REGION === "na1" ? "api.hsforms.com" : `api-${REGION}.hsforms.com`;

type NewsletterPayload = {
  email?: string;
  consent?: boolean | string;
  /** Honeypot — must stay empty. */
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isConsented(value: NewsletterPayload["consent"]) {
  return value === true || value === "true" || value === "on";
}

export async function POST(request: Request) {
  let body: NewsletterPayload;
  try {
    body = (await request.json()) as NewsletterPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields, humans don't.
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
    return NextResponse.json(
      { error: "Invalid input", fields: errors },
      { status: 422 },
    );
  }

  if (!PORTAL_ID || !FORM_GUID) {
    // Dev / unconfigured fallback — log and pretend it worked so the form
    // can be iterated on before HubSpot is provisioned.
    console.info("[newsletter] HubSpot env not set, skipping submission:", {
      email,
    });
    return NextResponse.json({ ok: true, simulated: true });
  }

  const endpoint = `https://${FORMS_HOST}/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: [{ objectTypeId: "0-1", name: "email", value: email }],
        // Only sent when HUBSPOT_CONSENT_TEXT is set. HubSpot rejects
        // legalConsentOptions on portals without the data-privacy feature
        // enabled, so this stays off by default and works on Starter plans.
        ...(process.env.HUBSPOT_CONSENT_TEXT
          ? {
              legalConsentOptions: {
                consent: {
                  consentToProcess: true,
                  text: process.env.HUBSPOT_CONSENT_TEXT,
                },
              },
            }
          : {}),
        context: {
          pageName: "Newsletter signup",
          pageUri: "/",
        },
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[newsletter] HubSpot error:", res.status, detail);
      return NextResponse.json(
        { error: "Couldn't sign you up just then. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] request failed:", err);
    return NextResponse.json(
      { error: "Couldn't sign you up just then. Please try again." },
      { status: 502 },
    );
  }
}
