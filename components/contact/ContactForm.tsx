"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import Button from "@/components/Button";

const serviceOptions = [
  "Branding",
  "Animation",
  "Website",
  "Strategy",
  "Proposal Design",
  "Not sure yet",
] as const;

const budgetOptions = [
  "Under £10k",
  "£10k – £25k",
  "£25k – £50k",
  "£50k – £100k",
  "£100k+",
  "Prefer not to say",
] as const;

type FieldErrors = Partial<
  Record<"name" | "email" | "message", string>
>;

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-card bg-dawn-80 border border-dawn-60 px-4 py-3 text-white placeholder:text-white/35 " +
  "focus:outline-none focus:border-dragon-fire transition-colors duration-200";

const labelBase =
  "text-[0.8rem] font-medium uppercase tracking-[0.08em] text-white/60 mb-2 inline-block";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Capture the form node now: event.currentTarget is null after the await.
    const form = event.currentTarget;
    setStatus("submitting");
    setErrors({});
    setServerError(null);

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json()) as {
        ok?: boolean;
        error?: string;
        fields?: FieldErrors;
      };

      if (!res.ok || body.error) {
        setStatus("error");
        if (body.fields) setErrors(body.fields);
        setServerError(body.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error
          ? err.message
          : "Couldn't send the form. Please try again or email us.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-card bg-dawn-80 border border-dragon-fire/60 p-8 text-center"
      >
        <h3 className="font-display text-h3 text-white">
          Thanks, we&apos;ve got it.
        </h3>
        <p className="mt-3 text-white/70">
          We&apos;ll reply within one business day. If it&apos;s urgent,
          WhatsApp us. We&apos;re faster there.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[0.875rem] text-dragon-fire hover:underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelBase}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={inputBase}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? (
            <p id="name-error" className="mt-2 text-[0.8rem] text-dragon-fire">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="email" className={labelBase}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputBase}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" className="mt-2 text-[0.8rem] text-dragon-fire">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelBase}>
          Company <span className="text-white/35 normal-case">(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          className={inputBase}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="service" className={labelBase}>
            What are you looking for?
          </label>
          <select id="service" name="service" defaultValue="" className={inputBase}>
            <option value="">Choose one</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelBase}>
            Budget <span className="text-white/35 normal-case">(optional)</span>
          </label>
          <select id="budget" name="budget" defaultValue="" className={inputBase}>
            <option value="">Choose one</option>
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelBase}>
          Tell us about the project
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className={inputBase}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-[0.8rem] text-dragon-fire">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from humans, visible to naive bots. */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {serverError ? (
        <p
          role="alert"
          className="text-[0.875rem] text-dragon-fire bg-dawn-80 rounded-card p-3 border border-dragon-fire/40"
        >
          {serverError}
        </p>
      ) : null}

      <div className="flex items-center gap-4">
        <Button variant="primary" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
        <p className="text-[0.8rem] text-white/40">
          We&apos;ll reply within one business day.
        </p>
      </div>
    </form>
  );
}
