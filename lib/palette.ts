/**
 * Supporting palette for icon tiles, numbers and small accents.
 *
 * Only the two logo colours are used — orange and charcoal — so the site stays
 * calm and on-brand. Orange is an accent (tiles, numbers, highlights), never a
 * full-section background. The other names are kept as aliases so existing
 * content that stores a hue name still renders in brand colours.
 * Class strings are written out in full so Tailwind can detect them.
 */
const orange = {
  soft: "bg-brand-50",
  text: "text-brand-600",
  ring: "ring-brand-100",
  solid: "bg-brand-500",
  card: "bg-brand-50/70",
  border: "border-brand-100",
  grad: "from-brand-400 to-brand-600",
  hover: "group-hover:bg-brand-500",
} as const;

const charcoal = {
  soft: "bg-ink-100",
  text: "text-ink-700",
  ring: "ring-ink-200",
  solid: "bg-ink-700",
  card: "bg-ink-50",
  border: "border-ink-200",
  grad: "from-ink-600 to-ink-800",
  hover: "group-hover:bg-ink-700",
} as const;

export const hues = {
  orange,
  charcoal,
  violet: charcoal,
  sky: charcoal,
  emerald: orange,
  amber: orange,
  rose: orange,
  indigo: charcoal,
  teal: charcoal,
} as const;

export type Hue = keyof typeof hues;

const order: Hue[] = ["orange", "charcoal"];

/** Stable colour for the n-th item in a list (alternates orange and charcoal). */
export function hueAt(i: number): Hue {
  return order[((i % order.length) + order.length) % order.length];
}
