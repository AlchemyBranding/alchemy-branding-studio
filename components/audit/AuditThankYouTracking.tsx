"use client";

import { useEffect } from "react";

/**
 * Fires a dataLayer event when the audit thank-you page loads, so GTM /
 * Google Ads can record the lead conversion (in addition to the dedicated
 * thank-you URL pageview). Mirrors the dataLayer pattern used by the
 * newsletter components.
 */
export default function AuditThankYouTracking() {
  useEffect(() => {
    const w = window as typeof window & {
      dataLayer?: Record<string, unknown>[];
    };
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event: "audit_submitted", form: "free-brand-audit" });
  }, []);

  return null;
}
