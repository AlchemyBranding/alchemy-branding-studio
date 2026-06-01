"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import Button from "@/components/Button";

const CHECKLIST_PATH = "/alchemy-brand-checklist.pdf";

type FieldErrors = Partial<Record<"email" | "consent", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-card bg-dawn-80 border border-dawn-60 px-4 py-3 text-[0.9rem] text-white " +
  "placeholder:text-white/35 focus:outline-none focus:border-dragon-fire transition-colors duration-200";

function pushDataLayer(event: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(event);
}

export default function FooterNewsletter() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setServerError(null);

    const data = new FormData(event.currentTarget);
    const payload = {
      email: String(data.get("email") ?? ""),
      consent: data.get("consent") === "on",
      company: String(data.get("company") ?? ""),
    };

    try {
      const res = await fetch("/api/newsletter", {
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
      pushDataLayer({ event: "newsletter_signup", form_location: "footer" });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error
          ? err.message
          : "Couldn't sign you up just then. Please try again.",
      );
    }
  }

  return (
    <div className="border-b border-dawn-80 pb-12 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div>
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-dragon-fire">
            The brand checklist
          </p>
          <h2 className="font-display text-h3 mt-3 text-white">
            Find the gaps before your buyers do.
          </h2>
          <p className="mt-3 text-[0.9rem] leading-[1.6] text-white/60 max-w-md">
            Twenty things we check before any brand build. Free, straight to
            your inbox.
          </p>
        </div>

        <div className="lg:pt-1">
          {status === "success" ? (
            <div role="status" className="text-[0.95rem] text-white/80">
              <p className="font-display text-[1.125rem] text-white">
                Check your inbox.
              </p>
              <p className="mt-2 text-white/60">
                The checklist is on its way.{" "}
                <a
                  href={CHECKLIST_PATH}
                  download
                  onClick={() =>
                    pushDataLayer({
                      event: "checklist_download",
                      form_location: "footer",
                    })
                  }
                  className="text-dragon-fire underline underline-offset-4 hover:text-fire-80 transition-colors"
                >
                  Download it now.
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                  className={inputBase}
                  aria-label="Email"
                  aria-invalid={Boolean(errors.email)}
                />
                <Button
                  variant="primary"
                  type="submit"
                  disabled={status === "submitting"}
                  className="shrink-0"
                >
                  {status === "submitting" ? "Sending…" : "Send it over"}
                </Button>
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-0.5 size-4 shrink-0 accent-dragon-fire"
                  aria-invalid={Boolean(errors.consent)}
                />
                <span className="text-[0.75rem] leading-[1.5] text-white/45">
                  Email me the checklist and the occasional brand note. No spam,
                  unsubscribe anytime.
                </span>
              </label>

              {/* Honeypot */}
              <div
                className="absolute -left-[9999px] w-px h-px overflow-hidden"
                aria-hidden="true"
              >
                <label>
                  Company
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              {(errors.email || errors.consent || serverError) && (
                <p role="alert" className="text-[0.8rem] text-dragon-fire">
                  {serverError ?? errors.email ?? errors.consent}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
