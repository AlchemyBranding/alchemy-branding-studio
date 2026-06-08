import type { Metadata } from "next";

import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import GoogleTagManager from "@/components/GoogleTagManager";
import Header from "@/components/Header";
import HideOnStudio from "@/components/HideOnStudio";
import JsonLd from "@/components/JsonLd";
import NewsletterPopup from "@/components/NewsletterPopup";
import { satoshi } from "@/lib/fonts";
import { indexableRobots } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    // Short brand suffix keeps titles under the SERP truncation limit and
    // leaves room for keywords. Per-page titles set the part before the pipe.
    template: "%s | Alchemy",
  },
  description: siteConfig.description,
  robots: indexableRobots,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${satoshi.variable} h-full antialiased`}>
      <head>
        {/* Adobe Fonts kit — supplies p22-mackinac-pro */}
        <link rel="stylesheet" href="https://use.typekit.net/vhr5zqe.css" />
        <JsonLd />
      </head>
      <body className="bg-dawn text-white min-h-full flex flex-col">
        <HideOnStudio>
          <Header />
        </HideOnStudio>
        <main className="flex-1">{children}</main>
        <HideOnStudio>
          <Footer />
          <CookieBanner />
          <NewsletterPopup />
        </HideOnStudio>
        <GoogleTagManager gtmId={gtmId} />
      </body>
    </html>
  );
}
