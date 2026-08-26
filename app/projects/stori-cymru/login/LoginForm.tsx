"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginForm() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/stori-cymru-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setError(data.error ?? "Incorrect password.");
        setSubmitting(false);
        return;
      }

      const next =
        new URLSearchParams(window.location.search).get("next") ||
        "/projects/stori-cymru";
      router.push(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 w-full max-w-xs rounded-card bg-dawn-80 border border-dawn-60 p-6"
    >
      <label htmlFor="password" className="block text-[0.8rem] font-bold text-white/80">
        Password
      </label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2 w-full rounded-sm bg-dawn border border-dawn-60 px-4 py-3 text-white placeholder:text-white/30 focus:border-dragon-fire outline-none"
        placeholder="Enter the project password"
      />

      {error ? (
        <p className="mt-3 text-[0.85rem] text-fire-60" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting || password.length === 0}
        className="mt-5 w-full rounded-full bg-dragon-fire px-6 py-3 text-[0.875rem] font-bold uppercase tracking-[0.08em] text-dawn transition-colors duration-200 hover:bg-fire-80 disabled:opacity-50"
      >
        {submitting ? "Checking..." : "View project"}
      </button>
    </form>
  );
}
