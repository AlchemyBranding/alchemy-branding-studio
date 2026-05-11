import type { Metadata } from "next";

import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import GoogleTagManager from "@/components/GoogleTagManager";
import Header from "@/components/Header";
import { satoshi } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${satoshi.variable} h-full antialiased`}>
      <head>
        {/* Adobe Fonts kit — supplies p22-mackinac-pro */}
        <link rel="stylesheet" href="https://use.typekit.net/vhr5zqe.css" />
      </head>
      <body className="bg-dawn text-white min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <GoogleTagManager gtmId={gtmId} />
      </body>
    </html>
  );
}
