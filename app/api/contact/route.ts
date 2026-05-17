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
  budget?: string;
  message?: string;
  /** Honeypot — must stay empty. */
  website?: string;
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
  const budget = body.budget?.trim() ?? "";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  if (message.length < 10) errors.message = "Tell us a little more about the project.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Invalid input", fields: errors }, { status: 422 });
  }

  const subject = `New enquiry: ${name}${company ? ` (${company})` : ""}`;
  const lines: string[] = [
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
  ];
  if (company) lines.push(`<p><strong>Company:</strong> ${escapeHtml(company)}</p>`);
  if (service) lines.push(`<p><strong>Service interest:</strong> ${escapeHtml(service)}</p>`);
  if (budget) lines.push(`<p><strong>Budget:</strong> ${escapeHtml(budget)}</p>`);
  lines.push(`<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`);
  const html = lines.join("");

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
