"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Button from "@/components/Button";

const STORAGE_KEY = "alchemy-cookie-consent";

/** Window event that reopens the banner (fired by CookieSettingsLink). */
export const OPEN_COOKIE_SETTINGS_EVENT = "alchemy:open-cookie-settings";

/** Analytics/ads cookies listed in the cookie policy. */
const TRACKING_COOKIE = /^(_ga|_ga_.*|_gid|_gat|_gat_.*|_gcl_au)$/;

/**
 * Delete analytics/ads cookies already set. Consent Mode stops new tracking
 * on decline but does not remove existing cookies, so a visitor who
 * withdraws consent needs them cleared. GA sets them on the root domain, so
 * try the bare host, the dotted host and each parent domain.
 */
function clearTrackingCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0]?.trim())
    .filter((n): n is string => !!n && TRACKING_COOKIE.test(n));
  if (names.length === 0) return;

  const parts = window.location.hostname.split(".");
  const domains: (string | null)[] = [null];
  for (let i = 0; i < parts.length - 1; i++) {
    domains.push("." + parts.slice(i).join("."));
  }
  const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = domain
        ? `${name}=; ${expired}; domain=${domain}`
        : `${name}=; ${expired}`;
    }
  }
}

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) return;
      // Honour a Global Privacy Control browser signal as an opt-out:
      // record a decline and don't prompt at all.
      const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
      if (nav.globalPrivacyControl === true) {
        persist("declined");
        return;
      }
      setVisible(true);
    } catch {
      // localStorage unavailable (private mode, etc.) — show banner anyway
      setVisible(true);
    }
    // persist is stable for the component's lifetime; safe to omit from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Let visitors reopen the banner to change their choice at any time
  // (PECR: withdrawing consent must be as easy as giving it).
  useEffect(() => {
    const open = () => setVisible(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
  }, []);

  function persist(value: "accepted" | "declined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // no-op
    }
    setVisible(false);
    if (value === "declined") clearTrackingCookies();

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
        className="absolute inset-0 bg-dusk/80 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-desc"
        className="relative w-full max-w-xl rounded-card border border-dragon-fire/70 bg-dusk-80 p-7 shadow-2xl shadow-black/50 md:p-8"
      >
        <h2
          id="cookie-consent-title"
          className="font-display text-h3 text-dawn"
        >
          Before you explore
        </h2>
        <p
          id="cookie-consent-desc"
          className="mt-3 text-[0.95rem] leading-[1.6] text-dawn/75"
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
            className="px-2 py-2 text-[0.9rem] text-dawn/65 transition-colors duration-200 hover:text-dawn"
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
