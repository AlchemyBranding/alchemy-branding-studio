"use client";

import { useEffect } from "react";

/**
 * Fires a dataLayer event when the contact thank-you page loads, so GTM /
 * Google Ads can record the lead (in addition to the dedicated thank-you URL
 * pageview). Mirrors AuditThankYouTracking.
 */
export default function ContactThankYouTracking() {
  useEffect(() => {
    const w = window as typeof window & {
      dataLayer?: Record<string, unknown>[];
    };
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event: "contact_submitted", form: "contact" });
  }, []);

  return null;
}
