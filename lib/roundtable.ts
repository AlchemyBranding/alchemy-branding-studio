/**
 * The Brand to Scale Roundtable (/roundtable): one place for the current date's details, so the page,
 * the form and the Event markup can't disagree. `slug` must match an open event in Opus (its events
 * table, 0073), or requests are refused there. Change these for the next date.
 *
 * Date and venue are provisional as of 28 Oct 2026: `venue` stays null until it is booked, and the
 * page says "venue to be confirmed" until then.
 */
export const ROUNDTABLE = {
  slug: "roundtable-cardiff-2026-12",
  name: "Brand to Scale Roundtable",
  city: "Cardiff",
  /** ISO, Europe/London. */
  startsAt: "2026-12-03T08:00:00+00:00",
  endsAt: "2026-12-03T10:30:00+00:00",
  dateLabel: "Thursday 3 December 2026",
  timeLabel: "8:00 to 10:30",
  venue: null as null | { name: string; address: string; access: string },
  seats: 15,
  updatesConsent: "Email me about this and future Brand to Scale Roundtables. Unsubscribe anytime.",
} as const;

export const ROLE_OPTIONS = [
  { value: "founder", label: "Founder or owner" },
  { value: "md", label: "MD or CEO" },
  { value: "director", label: "Director" },
  { value: "other", label: "Other" },
] as const;

export const TURNOVER_OPTIONS = [
  { value: "under_500k", label: "Under £500k" },
  { value: "500k_1m", label: "£500k to £1M" },
  { value: "1m_5m", label: "£1M to £5M" },
  { value: "5m_15m", label: "£5M to £15M" },
  { value: "over_15m", label: "Over £15M" },
] as const;
