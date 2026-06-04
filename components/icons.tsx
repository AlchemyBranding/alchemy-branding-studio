import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M20.5 12a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.1-4.3A8.5 8.5 0 1 1 20.5 12Z" />
      <path d="M8.5 9.5c0 4 3.5 6.5 5.5 6.5.7 0 1.4-.2 1.9-.6.3-.2.3-.6 0-.9l-1-1c-.2-.2-.5-.2-.7 0-.4.3-.9.2-1.2 0-1-.7-1.7-1.5-2.2-2.6-.1-.3 0-.7.3-.9l.4-.3c.2-.2.3-.5.1-.8L10.5 7.7c-.2-.3-.6-.3-.9-.1-.5.4-.9 1-1.1 1.9Z" />
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ArrowDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}

export function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4.1 0 4.9 2.7 4.9 6.2V21h-4v-5.5c0-1.3 0-3-1.8-3-1.9 0-2.1 1.5-2.1 3V21h-4V9Z" />
    </svg>
  );
}

export function VimeoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M22 7.4c-.1 2-1.5 4.8-4.3 8.4-2.9 3.7-5.3 5.6-7.3 5.6-1.2 0-2.3-1.1-3.1-3.4l-1.7-6.3c-.6-2.3-1.3-3.4-2-3.4-.2 0-.7.3-1.6.9l-1-1.3c1-.9 2-1.8 3-2.7 1.4-1.2 2.4-1.8 3.1-1.9 1.6-.2 2.6.9 3 3.4.4 2.6.7 4.3.9 4.9.5 2.1 1 3.2 1.6 3.2.5 0 1.2-.7 2.1-2.2.9-1.5 1.4-2.6 1.5-3.4.1-1.1-.3-1.6-1.3-1.6-.5 0-1 .1-1.5.3 1-3.2 2.9-4.8 5.7-4.7 2.1.1 3 1.5 2.9 4.2Z" />
    </svg>
  );
}

export function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 0 0 .5 6.5C.1 8.4.1 12 .1 12s0 3.6.4 5.5a3 3 0 0 0 2.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1c.4-1.9.4-5.5.4-5.5s0-3.6-.4-5.5ZM9.8 15.5v-7l6.2 3.5-6.2 3.5Z" />
    </svg>
  );
}
