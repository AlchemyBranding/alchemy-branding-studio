import type { Metadata } from "next";
import Image from "next/image";

import { siteConfig } from "@/lib/site";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Stori Cymru · Sign in",
  robots: { index: false, follow: false },
};

export default function StoriCymruLoginPage() {
  return (
    <section className="bg-dawn px-6 py-[100px] min-h-[70vh] flex items-center">
      <div className="max-w-md mx-auto flex flex-col items-center text-center w-full">
        <Image
          src="/alchemy-logo-white.svg"
          alt={siteConfig.name}
          width={176}
          height={44}
          priority
          className="h-10 w-auto"
        />
        <p className="mt-6 text-eyebrow text-dragon-fire">Stori Cymru</p>
        <h1 className="mt-2 font-display text-h3 text-white">
          This project page is private
        </h1>
        <p className="mt-3 text-[0.9rem] leading-relaxed text-white/60 max-w-xs">
          Enter the password Alchemy gave you to view production status.
        </p>

        <LoginForm />
      </div>
    </section>
  );
}
