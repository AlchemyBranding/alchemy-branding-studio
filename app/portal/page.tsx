import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  VimeoIcon,
  YouTubeIcon,
} from "@/components/icons";
import { motionHref, siteConfig, socialLinks, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Alchemy Branding Studio — Links",
  description: siteConfig.description,
  // Bio-link hub: useful, but not a page we want in search.
  robots: { index: false, follow: true },
  alternates: { canonical: `${siteConfig.url}/portal` },
};

type PortalLink = {
  label: string;
  note?: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

const links: PortalLink[] = [
  {
    label: "Get your free brand audit",
    note: "An honest read on your brand, back in three days",
    href: "/free-brand-audit-for-smes",
  },
  {
    label: "The Brand Strategy Workshop",
    note: "Where every brand build starts",
    href: "/services",
  },
  {
    label: "Download the brand checklist",
    note: "Twenty things we check before any brand build",
    href: "/alchemy-brand-checklist.pdf",
    download: true,
  },
  { label: "See our work", href: "/portfolio" },
  { label: "Read the blog", href: "/news" },
  {
    label: "Brand to Scale podcast",
    href: "https://www.brandtoscale.co.uk",
    external: true,
  },
  { label: "Book a call", href: motionHref, external: true },
  { label: "Message us on WhatsApp", href: whatsappHref, external: true },
];

const iconMap = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  vimeo: VimeoIcon,
  youtube: YouTubeIcon,
} as const;

function PortalLinkRow({ link, primary }: { link: PortalLink; primary?: boolean }) {
  const base =
    "group flex items-center justify-between gap-4 rounded-card px-6 py-4 transition-colors duration-200";
  const cls = primary
    ? `${base} bg-dragon-fire text-dawn hover:bg-fire-80`
    : `${base} bg-dawn-80 border border-dawn-60 text-white hover:border-dragon-fire`;

  const inner = (
    <>
      <span className="flex flex-col">
        <span className="font-bold text-[0.95rem] leading-tight">{link.label}</span>
        {link.note ? (
          <span
            className={`mt-0.5 text-[0.8rem] leading-snug ${
              primary ? "text-dawn/70" : "text-white/45"
            }`}
          >
            {link.note}
          </span>
        ) : null}
      </span>
      <span
        aria-hidden="true"
        className={`shrink-0 text-[1.1rem] transition-transform duration-200 group-hover:translate-x-0.5 ${
          primary ? "text-dawn" : "text-dragon-fire"
        }`}
      >
        &rarr;
      </span>
    </>
  );

  if (link.download || link.external) {
    return (
      <a
        href={link.href}
        className={cls}
        {...(link.download
          ? { download: true }
          : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={link.href} className={cls}>
      {inner}
    </Link>
  );
}

export default function PortalPage() {
  return (
    <section className="bg-dawn px-6 py-[100px]">
      <div className="max-w-md mx-auto flex flex-col items-center text-center">
        <Image
          src="/alchemy-logo-white.svg"
          alt={siteConfig.name}
          width={176}
          height={44}
          priority
          className="h-10 w-auto"
        />
        <p className="mt-5 text-[0.95rem] leading-relaxed text-white/60 max-w-xs">
          {siteConfig.description}
        </p>

        <nav className="mt-10 w-full space-y-3 text-left" aria-label="Quick links">
          {links.map((link, i) => (
            <PortalLinkRow key={link.href} link={link} primary={i === 0} />
          ))}

          {/* Founders' personal LinkedIn — two-up, full button width */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Dave", href: "https://www.linkedin.com/in/beardedtinywizard/" },
              { name: "Jess", href: "https://www.linkedin.com/in/jessmmorgan/" },
            ].map((person) => (
              <a
                key={person.href}
                href={person.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${person.name} on LinkedIn`}
                className="group flex items-center justify-center gap-2 rounded-card bg-dawn-80 border border-dawn-60 px-4 py-4 text-white hover:border-dragon-fire transition-colors duration-200"
              >
                <LinkedInIcon className="w-4 h-4 text-dragon-fire shrink-0" />
                <span className="font-bold text-[0.9rem]">{person.name}</span>
              </a>
            ))}
          </div>
        </nav>

        <ul className="mt-10 flex items-center justify-center gap-5" aria-label="Social media">
          {socialLinks.map(({ label, href, icon }) => {
            const Icon = iconMap[icon];
            return (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/55 hover:text-dragon-fire transition-colors duration-200 inline-block"
                >
                  <Icon className="w-5 h-5" />
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-6 text-[0.85rem] text-white/50 hover:text-dragon-fire transition-colors duration-200"
        >
          {siteConfig.email}
        </a>
      </div>
    </section>
  );
}
