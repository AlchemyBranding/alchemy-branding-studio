import type { Metadata } from "next";
import { satoshi } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Alchemy Branding Studio",
    template: "%s | Alchemy Branding Studio",
  },
  description:
    "Brand strategy, design and animation for ambitious businesses.",
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
        {children}
      </body>
    </html>
  );
}
