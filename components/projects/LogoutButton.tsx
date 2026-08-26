"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/stori-cymru-login/logout", { method: "POST" });
    router.push("/projects/stori-cymru/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-[0.8rem] text-white/40 hover:text-dragon-fire transition-colors duration-200"
    >
      Sign out
    </button>
  );
}
