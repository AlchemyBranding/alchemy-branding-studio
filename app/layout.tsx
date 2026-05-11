import type { Metadata } from "next";

import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import GoogleTagManager from "@/components/GoogleTagManager";
import Header from "@/components/Header";
import HideOnStudio from "@/components/HideOnStudio";
import JsonLd from "@/components/JsonLd";
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
  robots: { index: true, follow: true },
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
        </HideOnStudio>
        <GoogleTagManager gtmId={gtmId} />
      </body>
    </html>
  );
}
