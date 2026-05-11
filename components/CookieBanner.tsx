"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Button from "@/components/Button";

const STORAGE_KEY = "alchemy-cookie-consent";
const CONSENT_EVENT = "alchemy:consent-accepted";

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
    if (value === "accepted") {
      window.dispatchEvent(new Event(CONSENT_EVENT));
    }
  }

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[70] bg-dawn border-t border-dragon-fire/90 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <p className="text-[0.875rem] text-white max-w-2xl">
          We use cookies to understand how people use this site.{" "}
          <Link
            href="/cookie-policy"
            className="text-dragon-fire underline-offset-4 hover:underline"
          >
            Learn more
          </Link>
          .
        </p>
        <div className="flex items-center gap-5 shrink-0">
          <button
            type="button"
            onClick={() => persist("declined")}
            className="text-[0.875rem] text-white/60 hover:text-white transition-colors duration-200"
          >
            Decline
          </button>
          <Button
            variant="primary"
            size="small"
            onClick={() => persist("accepted")}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
