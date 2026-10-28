"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

import Button from "@/components/Button";
import { NEWSLETTER_CONSENT } from "@/lib/newsletter";
import { ROLE_OPTIONS, ROUNDTABLE, TURNOVER_OPTIONS } from "@/lib/roundtable";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Record<string, string>;

const inputBase =
  "w-full rounded-card bg-dusk-80 border border-dusk-60 px-4 py-3 text-dawn placeholder:text-dawn/35 " +
  "focus:outline-none focus:border-dragon-fire transition-colors duration-200";
const labelBase = "text-[0.8rem] font-medium uppercase tracking-[0.08em] text-dawn/65 mb-2 inline-block";

const REQUIRED: Record<string, string> = {
  first_name: "Please enter your first name.",
  last_name: "Please enter your last name.",
  email: "Please enter your work email.",
  company: "Please enter your company.",
  role: "Please choose your role.",
  turnover: "Please choose your turnover band.",
  sector: "Please tell us your sector.",
};

function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={labelBase}>
        {label} {optional && <span className="text-dawn/65 normal-case">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[0.8rem] text-dragon-fire">
          {error}
        </p>
      )}
    </div>
  );
}

export default function RoundtableForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [role, setRole] = useState("");

  const a11y = (id: string) => ({ "aria-invalid": Boolean(errors[id]), "aria-describedby": errors[id] ? `${id}-error` : undefined });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const found: Errors = {};
    for (const [k, msg] of Object.entries(REQUIRED)) if (!data[k]?.trim()) found[k] = msg;
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) found.email = "Please enter a valid email.";
    if (data.role === "other" && !data.role_other?.trim()) found.role_other = "Please tell us your role.";
    setErrors(found);
    setServerError(null);
    if (Object.keys(found).length) {
      setStatus("idle");
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/roundtable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, event_updates: data.event_updates === "on", newsletter: data.newsletter === "on", page: window.location.href }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; fields?: Errors };
      if (!res.ok) {
        if (json.fields && Object.keys(json.fields).length) setErrors(json.fields);
        setServerError(json.error ?? "Couldn't send your request just then. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setServerError("Couldn't send your request just then. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-card bg-dusk-80 border border-dragon-fire/60 p-8 text-center">
        <h3 className="font-display text-h3 text-dawn">Thank you.</h3>
        <p className="mt-3 text-dawn/70">
          Jess will confirm your seat within two working days. If the table&apos;s already full, we&apos;ll keep you first in line for the next date.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="nickname">Leave this empty</label>
        <input id="nickname" name="nickname" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field id="first_name" label="First name" error={errors.first_name}>
          <input id="first_name" name="first_name" autoComplete="given-name" maxLength={80} className={inputBase} {...a11y("first_name")} />
        </Field>
        <Field id="last_name" label="Last name" error={errors.last_name}>
          <input id="last_name" name="last_name" autoComplete="family-name" maxLength={80} className={inputBase} {...a11y("last_name")} />
        </Field>
        <Field id="email" label="Work email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={320} className={inputBase} {...a11y("email")} />
        </Field>
        <Field id="phone" label="Phone" optional>
          <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} className={inputBase} />
        </Field>
        <Field id="company" label="Company" error={errors.company}>
          <input id="company" name="company" autoComplete="organization" maxLength={160} className={inputBase} {...a11y("company")} />
        </Field>
        <Field id="website" label="Website" optional>
          <input id="website" name="website" type="url" inputMode="url" placeholder="https://" maxLength={300} className={inputBase} />
        </Field>
        <Field id="role" label="Your role" error={errors.role}>
          <select id="role" name="role" defaultValue="" onChange={(e) => setRole(e.target.value)} className={inputBase} {...a11y("role")}>
            <option value="" disabled>
              Choose one
            </option>
            {ROLE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        {role === "other" ? (
          <Field id="role_other" label="Your role, in a few words" error={errors.role_other}>
            <input id="role_other" name="role_other" maxLength={80} className={inputBase} {...a11y("role_other")} />
          </Field>
        ) : (
          <div className="hidden md:block" aria-hidden="true" />
        )}
        <Field id="turnover" label="Annual turnover" error={errors.turnover}>
          <select id="turnover" name="turnover" defaultValue="" className={inputBase} {...a11y("turnover")}>
            <option value="" disabled>
              Choose a band
            </option>
            {TURNOVER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="sector" label="Sector" error={errors.sector}>
          <input id="sector" name="sector" maxLength={120} placeholder="For example, legal, engineering, charity" className={inputBase} {...a11y("sector")} />
        </Field>
      </div>

      <Field id="question" label="The one growth question on your mind" optional>
        <textarea id="question" name="question" rows={3} maxLength={500} className={inputBase} placeholder="We'll use it to shape the conversation on the day." />
      </Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field id="heard" label="Who invited you, or how you heard" optional>
          <input id="heard" name="heard" maxLength={300} className={inputBase} />
        </Field>
        <Field id="needs" label="Dietary or access needs" optional>
          <input id="needs" name="needs" maxLength={500} className={inputBase} />
        </Field>
      </div>

      <div className="space-y-3">
        <label className="flex gap-3 items-start text-dawn/80 text-[0.95rem]">
          <input type="checkbox" name="event_updates" className="mt-1 h-4 w-4 accent-[var(--color-dragon-fire)]" />
          <span>{ROUNDTABLE.updatesConsent}</span>
        </label>
        <label className="flex gap-3 items-start text-dawn/80 text-[0.95rem]">
          <input type="checkbox" name="newsletter" className="mt-1 h-4 w-4 accent-[var(--color-dragon-fire)]" />
          <span>{NEWSLETTER_CONSENT}</span>
        </label>
      </div>

      {serverError && (
        <p role="alert" className="text-[0.95rem] text-dragon-fire">
          {serverError}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Request your seat"}
        </Button>
        <p className="text-[0.85rem] text-dawn/55">Free. One seat per business. We use your details only for this event, as our privacy policy explains.</p>
      </div>
    </form>
  );
}
