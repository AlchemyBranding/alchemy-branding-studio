export const colors = {
  dawn: "#191919",
  dawn80: "#303030",
  dawn60: "#474747",
  dawn40: "#5E5E5E",
  dawn20: "#757575",

  dragonFire: "#FE6D4C",
  fire80: "#FE7C5E",
  fire60: "#FE8A70",
  fire40: "#FE9982",
  fire20: "#FFB6A6",

  dusk: "#FAF8F7",
  white: "#FFFFFF",

  pixiePink: "#FE86F6",
  curiousBlue: "#3052F9",
  mindaro: "#C4FE79",
  spaceGreen: "#00524D",
  ultraViolet: "#9A4EFF",
} as const;

export const fontFamily = {
  satoshi: "var(--font-satoshi), system-ui, sans-serif",
  mackinac: "p22-mackinac-pro, Georgia, 'Times New Roman', serif",
} as const;

export const typeScale = {
  display: "clamp(3rem, 6vw, 7rem)",
  h2: "clamp(2rem, 4vw, 3.5rem)",
  h3: "clamp(1.25rem, 2.5vw, 1.75rem)",
  bodyLarge: "1.125rem",
  body: "1rem",
  small: "0.875rem",
  button: "0.875rem",
  nav: "0.9375rem",
} as const;

export const lineHeight = {
  display: "1.1",
  h2: "1.2",
  h3: "1.3",
  body: "1.6",
  small: "1.4",
} as const;

export const radius = {
  pill: "9999px",
  card: "12px",
  sm: "6px",
} as const;

export const motion = {
  hover: "200ms ease",
  reveal: "300ms ease",
  scrollOffset: 60,
} as const;

export type ColorToken = keyof typeof colors;
