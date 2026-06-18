"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Button from "@/components/Button";

const STORAGE_KEY = "alchemy-cookie-consent";

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage unavailable (private mode, etc.) — show banner anyway
      setVisible(true);
    }
  }, []);

  function persist(value: "accepted" | "declined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // no-op
    }
    setVisible(false);

    // Google Consent Mode v2: GTM loaded with all consent denied by default;
    // flip to the visitor's choice here and signal GTM via the dataLayer.
    const consent = value === "accepted" ? "granted" : "denied";
    const w = window as typeof window & {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: Record<string, unknown>[];
    };
    w.gtag?.("consent", "update", {
      ad_storage: consent,
      analytics_storage: consent,
      ad_user_data: consent,
      ad_personalization: consent,
    });
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event: "cookie_consent_update", consent_state: consent });
  }

  if (!mounted || !visible) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center sm:p-6">
      {/* Dimming backdrop makes the choice prominent on landing. Not
          click-to-dismiss — a deliberate accept/decline is required. */}
      <div
        className="absolute inset-0 bg-dawn/80 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-desc"
        className="relative w-full max-w-xl rounded-card border border-dragon-fire/70 bg-dawn-80 p-7 shadow-2xl shadow-black/50 md:p-8"
      >
        <h2
          id="cookie-consent-title"
          className="font-display text-h3 text-white"
        >
          Before you explore
        </h2>
        <p
          id="cookie-consent-desc"
          className="mt-3 text-[0.95rem] leading-[1.6] text-white/75"
        >
          We use cookies to understand how people use this site and to make it
          better. Choose whether to allow them.{" "}
          <Link
            href="/cookie-policy"
            className="text-dragon-fire underline-offset-4 hover:underline"
          >
            Read our cookie policy
          </Link>
          .
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
          <button
            type="button"
            onClick={() => persist("declined")}
            className="px-2 py-2 text-[0.9rem] text-white/60 transition-colors duration-200 hover:text-white"
          >
            Decline
          </button>
          <Button variant="primary" onClick={() => persist("accepted")}>
            Accept cookies
          </Button>
        </div>
      </div>
    </div>
  );
}
