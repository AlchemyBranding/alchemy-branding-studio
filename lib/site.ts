export const siteConfig = {
  name: "Alchemy Branding Studio",
  description: "Brand strategy, design and animation for ambitious businesses.",
  url: "https://alchemybranding.studio",
  email: "hello@alchemybranding.studio",
} as const;

export const whatsappHref = `https://wa.me/${
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "447734794779"
}`;

export const motionHref =
  process.env.NEXT_PUBLIC_MOTION_URL ??
  "https://app.usemotion.com/meet/dave-morgan/discovery-call";

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/news" },
  { label: "Contact", href: "/contact" },
] as const;

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/alchemybrandingstudio", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/alchemybrandingstudio", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/alchemybrandingstudio", icon: "linkedin" },
  { label: "Vimeo", href: "https://vimeo.com/alchemybrandingstudio", icon: "vimeo" },
  { label: "YouTube", href: "https://www.youtube.com/@alchemybrandingstudio", icon: "youtube" },
] as const;

export const groupSites = [
  {
    name: "Alchemy Branding Studio",
    descriptor: "Creative agency",
    href: null,
  },
  {
    name: "Brand to Scale",
    descriptor: "The podcast",
    href: "https://www.brandtoscale.co.uk",
  },
  {
    name: "Jessica Morgan",
    descriptor: "Commercial brand consultancy",
    href: "https://www.jessicamorganconsulting.co.uk",
  },
] as const;
