import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import FooterNewsletter from "@/components/FooterNewsletter";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  VimeoIcon,
  YouTubeIcon,
} from "@/components/icons";
import Spotlight from "@/components/motion/Spotlight";
import {
  groupSites,
  motionHref,
  navLinks,
  siteConfig,
  socialLinks,
  whatsappHref,
} from "@/lib/site";

const iconMap = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  vimeo: VimeoIcon,
  youtube: YouTubeIcon,
} as const;

const labelStyle =
  "text-[0.75rem] font-bold uppercase tracking-[0.12em] text-dragon-fire";

export default function Footer() {
  return (
    <footer className="bg-dawn border-t border-dawn-80 mt-auto">
      <Spotlight size={520} className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FooterNewsletter />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: brand + socials */}
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="Home">
              <Image
                src="/alchemy-logo-white.svg"
                alt="Alchemy Branding Studio"
                width={128}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-5 text-[0.875rem] leading-relaxed text-white/60 max-w-xs">
              Brand strategy, design and animation for ambitious businesses.
            </p>
            <ul className="mt-6 flex items-center gap-4" aria-label="Social media">
              {socialLinks.map(({ label, href, icon }) => {
                const Icon = iconMap[icon];
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-white/60 hover:text-dragon-fire transition-colors duration-200 inline-block"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 2: navigate */}
          <div>
            <p className={labelStyle}>Navigate</p>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[0.9rem] text-white/70 hover:text-dragon-fire transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: get in touch */}
          <div>
            <p className={labelStyle}>Get in touch</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[0.9rem] text-white/70 hover:text-dragon-fire transition-colors duration-200 break-words"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.9rem] text-white/70 hover:text-dragon-fire transition-colors duration-200"
                >
                  WhatsApp
                </a>
              </li>
              <li className="pt-2">
                <Button href={motionHref} variant="primary" size="small" external>
                  Book a Call
                </Button>
              </li>
            </ul>
          </div>

          {/* Column 4: group */}
          <div>
            <p className={labelStyle}>Part of the Alchemy Group</p>
            <ul className="mt-5 space-y-4">
              {groupSites.map(({ name, descriptor, href }) => (
                <li key={name}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <span className="block text-[0.9rem] font-bold text-white group-hover:text-dragon-fire transition-colors duration-200">
                        {name}
                      </span>
                      <span className="block text-[0.8rem] text-white/50">
                        {descriptor}
                      </span>
                    </a>
                  ) : (
                    <div>
                      <span className="block text-[0.9rem] font-bold text-white">
                        {name}
                      </span>
                      <span className="block text-[0.8rem] text-white/50">
                        {descriptor}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-10 border-t border-dawn-80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[0.8rem] text-white/40">
          <p>© {new Date().getFullYear()} Alchemy Branding Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-dragon-fire transition-colors duration-200">
              Privacy Policy
            </Link>
            <span aria-hidden="true">|</span>
            <Link href="/cookie-policy" className="hover:text-dragon-fire transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
          <p>Design &amp; animation by Alchemy</p>
        </div>
      </div>
      </Spotlight>
    </footer>
  );
}
