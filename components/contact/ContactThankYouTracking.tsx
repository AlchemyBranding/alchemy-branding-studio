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
    // Explicit pageview so GTM can fire a GA4 pageview regardless of trigger
    // type. Named "virtual_pageview" to avoid colliding with GA4 Enhanced
    // Measurement's automatic "page_view".
    w.dataLayer.push({
      event: "virtual_pageview",
      page_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
    w.dataLayer.push({ event: "contact_submitted", form: "contact" });
  }, []);

  return null;
}
