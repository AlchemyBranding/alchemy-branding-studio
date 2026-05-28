"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/icons";
import { motionHref, navLinks, whatsappHref } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 h-16 md:h-[72px] transition-colors duration-200 ${
          scrolled
            ? "bg-dawn/85 backdrop-blur-md border-b border-dawn-80/60"
            : "bg-dawn"
        }`}
      >
        <div className="h-full max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo — white variant on dark bg. Min height 32px; safe space = A-letterform height. */}
          <Link href="/" className="flex items-center" aria-label="Alchemy Branding Studio home">
            <Image
              src="/alchemy-logo-white.svg"
              alt="Alchemy Branding Studio"
              width={128}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Centre nav (desktop) */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {navLinks.map(({ label, href, external }) => {
              const className = `text-[0.9375rem] font-medium transition-colors duration-200 ${
                isActive(href)
                  ? "text-dragon-fire"
                  : "text-white hover:text-dragon-fire"
              }`;
              return external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {label}
                </a>
              ) : (
                <Link key={href} href={href} className={className}>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTAs (desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message us on WhatsApp"
              className="text-white hover:text-dragon-fire transition-colors duration-200"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
            <Button href={motionHref} variant="primary" size="small" external>
              Book a Call
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-white hover:text-dragon-fire transition-colors duration-200 p-2 -mr-2"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[60] bg-dawn lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 px-6 flex items-center justify-between">
            <Link href="/" className="flex items-center" aria-label="Alchemy Branding Studio home">
              <Image
                src="/alchemy-logo-white.svg"
                alt="Alchemy Branding Studio"
                width={156}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="text-white hover:text-dragon-fire transition-colors duration-200 p-2 -mr-2"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          <nav
            className="flex-1 flex flex-col items-start gap-6 px-8 pt-12"
            aria-label="Primary mobile"
          >
            {navLinks.map(({ label, href, external }) => {
              const className = `text-[2rem] font-bold leading-none transition-colors duration-200 ${
                isActive(href)
                  ? "text-dragon-fire"
                  : "text-white hover:text-dragon-fire"
              }`;
              return external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className={className}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="px-8 pb-12 flex flex-col gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white hover:text-dragon-fire transition-colors duration-200"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span className="text-[0.9375rem] font-medium">WhatsApp</span>
            </a>
            <Button href={motionHref} variant="primary" external>
              Book a Call
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
