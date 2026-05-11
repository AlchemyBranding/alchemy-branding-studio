import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "default" | "small";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ComponentProps<"button">, "className" | "children">;

const base =
  "inline-flex items-center justify-center font-bold uppercase tracking-[0.08em] " +
  "rounded-full transition-all duration-200 ease-out " +
  "hover:scale-[1.02] active:scale-[0.99]";

const sizes: Record<Size, string> = {
  default: "px-7 py-3.5 text-[0.875rem]",
  small: "px-5 py-2.5 text-[0.8125rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-dragon-fire text-dawn hover:bg-fire-80",
  secondary:
    "bg-dawn text-white border border-dawn-80 hover:border-dragon-fire hover:text-dragon-fire",
};

export default function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    variant = "primary",
    size = "default",
    className = "",
    children,
  } = props;
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`.trim();

  if ("href" in props && props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    void _v;
    void _s;
    void _c;
    void _ch;
    if (external || /^https?:\/\//.test(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
  void _v;
  void _s;
  void _c;
  void _ch;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
