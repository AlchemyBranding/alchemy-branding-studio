import { NextResponse } from "next/server";
import { Resend } from "resend";

import { siteConfig } from "@/lib/site";

const FROM_ADDRESS =
  process.env.RESEND_FROM_EMAIL || "Alchemy Web <onboarding@resend.dev>";
const TO_ADDRESS =
  process.env.RESEND_AUDIT_TO_EMAIL ||
  process.env.RESEND_TO_EMAIL ||
  siteConfig.email;

type AuditPayload = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  revenue?: string;
  challenge?: string;
  /** Honeypot — must stay empty. */
  trap?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: AuditPayload;
  try {
    body = (await request.json()) as AuditPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.trap && body.trap.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const website = body.website?.trim() ?? "";
  const revenue = body.revenue?.trim() ?? "";
  const challenge = body.challenge?.trim() ?? "";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  if (company.length < 2) errors.company = "Which company is this for?";
  if (website.length < 3) errors.website = "Drop your website URL so we can take a look.";
  if (challenge.length < 10) errors.challenge = "Tell us a little more about what's not working.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Invalid input", fields: errors }, { status: 422 });
  }

  const subject = `Brand audit request: ${name} (${company})`;
  const lines = [
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    `<p><strong>Company:</strong> ${escapeHtml(company)}</p>`,
    `<p><strong>Website:</strong> ${escapeHtml(website)}</p>`,
  ];
  if (revenue) lines.push(`<p><strong>Annual revenue:</strong> ${escapeHtml(revenue)}</p>`);
  lines.push(
    `<p><strong>Biggest brand or marketing challenge:</strong></p><p>${escapeHtml(challenge).replace(/\n/g, "<br />")}</p>`,
  );
  const html = lines.join("");

  if (!process.env.RESEND_API_KEY) {
    console.info("[audit] RESEND_API_KEY not set, skipping email send:", {
      subject,
      to: TO_ADDRESS,
      from: FROM_ADDRESS,
      name,
      email,
      company,
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
    console.error("[audit] resend error:", result.error);
    return NextResponse.json(
      { error: "Failed to send. Please try again, or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: result.data?.id });
}
