import { NextResponse } from "next/server";
import { Resend } from "resend";

import { siteConfig } from "@/lib/site";

const FROM_ADDRESS =
  process.env.RESEND_FROM_EMAIL || "Alchemy Web <onboarding@resend.dev>";
const TO_ADDRESS =
  process.env.RESEND_TO_EMAIL || siteConfig.email;

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  heardAbout?: string;
  message?: string;
  /** Honeypot — must stay empty. */
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// HubSpot copy of every enquiry, so each one lands as a contact with a source.
// Best effort: the email above is the enquiry; a HubSpot failure is logged and
// never fails the form. Off until both env vars are set in Vercel.
// The HubSpot form must carry the fields firstname, lastname, email, company,
// message and enquiry_source (a custom contact property whose dropdown options
// match heardAboutOptions in components/contact/ContactForm.tsx).
const HS_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
const HS_CONTACT_FORM_GUID = process.env.HUBSPOT_CONTACT_FORM_GUID;
const HS_REGION = process.env.HUBSPOT_FORMS_REGION || "eu1";
const HS_FORMS_HOST =
  HS_REGION === "na1" ? "api.hsforms.com" : `api-${HS_REGION}.hsforms.com`;

async function copyToHubSpot(
  request: Request,
  f: { name: string; email: string; company: string; message: string; heardAbout: string },
) {
  if (!HS_PORTAL_ID || !HS_CONTACT_FORM_GUID) return;
  const [firstname, ...rest] = f.name.split(/\s+/);
  const lastname = rest.join(" ");
  const cookie = request.headers.get("cookie") || "";
  const hutk = /(?:^|;\s*)hubspotutk=([^;]+)/.exec(cookie)?.[1];
  const fields = [
    { objectTypeId: "0-1", name: "firstname", value: firstname },
    ...(lastname ? [{ objectTypeId: "0-1", name: "lastname", value: lastname }] : []),
    { objectTypeId: "0-1", name: "email", value: f.email },
    ...(f.company ? [{ objectTypeId: "0-1", name: "company", value: f.company }] : []),
    { objectTypeId: "0-1", name: "message", value: f.message },
    { objectTypeId: "0-1", name: "enquiry_source", value: f.heardAbout },
  ];
  try {
    const res = await fetch(
      `https://${HS_FORMS_HOST}/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_CONTACT_FORM_GUID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields,
          context: {
            pageName: "Contact",
            pageUri: request.headers.get("referer") || "/contact",
            ...(hutk ? { hutk } : {}),
          },
        }),
      },
    );
    if (!res.ok) {
      console.error("[contact] HubSpot error:", res.status, await res.text().catch(() => ""));
    }
  } catch (err) {
    console.error("[contact] HubSpot request failed:", err);
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields, humans don't.
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const service = body.service?.trim() ?? "";
  const heardAbout = body.heardAbout?.trim() ?? "";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  if (message.length < 10) errors.message = "Tell us a little more about the project.";
  if (!heardAbout) errors.heardAbout = "Please tell us where you heard about us.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Invalid input", fields: errors }, { status: 422 });
  }

  const subject = `New enquiry: ${name}${company ? ` (${company})` : ""}, via ${heardAbout}`;
  const lines: string[] = [
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
  ];
  if (company) lines.push(`<p><strong>Company:</strong> ${escapeHtml(company)}</p>`);
  if (service) lines.push(`<p><strong>Service interest:</strong> ${escapeHtml(service)}</p>`);
  if (heardAbout) lines.push(`<p><strong>Heard about us:</strong> ${escapeHtml(heardAbout)}</p>`);
  lines.push(`<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`);
  const html = lines.join("");

  await copyToHubSpot(request, { name, email, company, message, heardAbout });

  if (!process.env.RESEND_API_KEY) {
    // Dev / unconfigured fallback — log and pretend it worked. Makes it
    // possible to iterate on the form without provisioning Resend.
    console.info("[contact] RESEND_API_KEY not set, skipping email send:", {
      subject,
      to: TO_ADDRESS,
      from: FROM_ADDRESS,
      name,
      email,
    });
    return NextResponse.json({ ok: true, simulated: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: FROM_ADDRESS,
    to: TO_ADDRESS,
    replyTo: email,
    subject,
    html,
  });

  if (result.error) {
    console.error("[contact] resend error:", result.error);
    return NextResponse.json(
      { error: "Failed to send. Please try again, or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: result.data?.id });
}
