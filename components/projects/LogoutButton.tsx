"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LOGIN_PATH = "/projects/stori-cymru/login";

export default function LogoutButton() {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleLogout() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await fetch("/api/stori-cymru-login/logout", { method: "POST" });
    } catch {
      // The cookie clear is the only thing that matters; if the request
      // failed the redirect below still bounces off the middleware gate.
    }
    router.push(LOGIN_PATH);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={signingOut}
      className="inline-flex items-center gap-2 rounded-full border border-dawn-60 bg-dawn-80 px-4 py-2 text-[0.8rem] font-medium text-white/70 transition-colors duration-200 hover:border-dragon-fire/40 hover:bg-dragon-fire/10 hover:text-white disabled:opacity-50"
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 14H3.5A1.5 1.5 0 0 1 2 12.5v-9A1.5 1.5 0 0 1 3.5 2H6M10.5 11l3-3-3-3M13.5 8H6" />
      </svg>
      {signingOut ? "Signing out..." : "Sign out"}
    </button>
  );
}
