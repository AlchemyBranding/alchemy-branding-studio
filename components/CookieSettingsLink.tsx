"use client";

import { OPEN_COOKIE_SETTINGS_EVENT } from "@/components/CookieBanner";

/** Footer link that reopens the cookie banner so visitors can change their choice. */
export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
      className="hover:text-dragon-fire transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dragon-fire"
    >
      Cookie settings
    </button>
  );
}
