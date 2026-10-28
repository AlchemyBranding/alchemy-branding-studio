import { NextResponse } from "next/server";

import { NEWSLETTER_CONSENT } from "@/lib/newsletter";
import { ROUNDTABLE } from "@/lib/roundtable";

/**
 * The Roundtable's "Request your seat" form (/roundtable).
 *
 * Each request goes to Opus, server to server, with the same shared key as the newsletter
 * (NEWSLETTER_SIGNUP_KEY). Opus saves it on the event, adds a task for Jess to confirm the seat, and
 * sends a ticked newsletter box through the normal double opt-in. Opus is the only place requests go.
 *
 * No fallback: if Opus can't be reached the visitor is told to try again. In production a missing key
 * is the same error. Only local development (no key) simulates success.
 */

const OPUS_URL = process.env.OPUS_EVENT_REQUEST_URL || "https://opus.alchemybranding.studio/api/event-request";
const SIGNUP_KEY = process.env.NEWSLETTER_SIGNUP_KEY;
const TRY_AGAIN = "Couldn't send your request just then. Please try again, or email hello@alchemybranding.studio.";

const short = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const ticked = (v: unknown) => v === true || v === "true" || v === "on";

function visitorIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields, humans don't.
  if (short(body.nickname, 200)) return NextResponse.json({ ok: true });

  if (!SIGNUP_KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[roundtable] NEWSLETTER_SIGNUP_KEY not set (development): not sent to Opus.");
      return NextResponse.json({ ok: true, simulated: true });
    }
    console.error("[roundtable] NEWSLETTER_SIGNUP_KEY is not set: requests can't reach Opus.");
    return NextResponse.json({ error: TRY_AGAIN }, { status: 503 });
  }

  const newsletter = ticked(body.newsletter);
  const eventUpdates = ticked(body.event_updates);
  try {
    const res = await fetch(OPUS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${SIGNUP_KEY}` },
      body: JSON.stringify({
        event: ROUNDTABLE.slug,
        first_name: short(body.first_name, 80),
        last_name: short(body.last_name, 80),
        email: short(body.email, 320),
        phone: short(body.phone, 40) || null,
        company: short(body.company, 160),
        website: short(body.website, 300) || null,
        role: short(body.role, 20),
        role_other: short(body.role_other, 80) || null,
        turnover: short(body.turnover, 20),
        sector: short(body.sector, 120),
        question: short(body.question, 500) || null,
        heard: short(body.heard, 300) || null,
        needs: short(body.needs, 500) || null,
        event_updates: eventUpdates,
        newsletter,
        consent_text: eventUpdates ? ROUNDTABLE.updatesConsent : null,
        newsletter_consent_text: newsletter ? NEWSLETTER_CONSENT : null,
        page: short(body.page, 500) || null,
        honeypot: "",
        ip: visitorIp(request),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (res.status === 422 || res.status === 409 || res.status === 429) {
      const detail = (await res.json().catch(() => ({}))) as { error?: string; fields?: Record<string, string> };
      return NextResponse.json({ error: detail.error ?? "Please check the form.", fields: detail.fields ?? {} }, { status: res.status });
    }
    if (!res.ok) {
      console.error("[roundtable] Opus answered", res.status);
      return NextResponse.json({ error: TRY_AGAIN }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[roundtable] couldn't reach Opus:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: TRY_AGAIN }, { status: 502 });
  }
}
