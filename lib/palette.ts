/**
 * Colourful supporting palette (Tailwind defaults) used for icon tiles and
 * cards so the site feels lively without flooding sections in brand orange.
 * Class strings are written out in full so Tailwind can detect them.
 */
export const hues = {
  orange: { soft: "bg-brand-50", text: "text-brand-600", ring: "ring-brand-100", solid: "bg-brand-500", card: "bg-brand-50/70", border: "border-brand-100", grad: "from-brand-400 to-brand-600", hover: "group-hover:bg-brand-500" },
  violet: { soft: "bg-violet-50", text: "text-violet-600", ring: "ring-violet-100", solid: "bg-violet-500", card: "bg-violet-50/70", border: "border-violet-100", grad: "from-violet-400 to-violet-600", hover: "group-hover:bg-violet-500" },
  sky: { soft: "bg-sky-50", text: "text-sky-600", ring: "ring-sky-100", solid: "bg-sky-500", card: "bg-sky-50/70", border: "border-sky-100", grad: "from-sky-400 to-sky-600", hover: "group-hover:bg-sky-500" },
  emerald: { soft: "bg-emerald-50", text: "text-emerald-600", ring: "ring-emerald-100", solid: "bg-emerald-500", card: "bg-emerald-50/70", border: "border-emerald-100", grad: "from-emerald-400 to-emerald-600", hover: "group-hover:bg-emerald-500" },
  amber: { soft: "bg-amber-50", text: "text-amber-600", ring: "ring-amber-100", solid: "bg-amber-500", card: "bg-amber-50/70", border: "border-amber-100", grad: "from-amber-400 to-amber-600", hover: "group-hover:bg-amber-500" },
  rose: { soft: "bg-rose-50", text: "text-rose-600", ring: "ring-rose-100", solid: "bg-rose-500", card: "bg-rose-50/70", border: "border-rose-100", grad: "from-rose-400 to-rose-600", hover: "group-hover:bg-rose-500" },
  indigo: { soft: "bg-indigo-50", text: "text-indigo-600", ring: "ring-indigo-100", solid: "bg-indigo-500", card: "bg-indigo-50/70", border: "border-indigo-100", grad: "from-indigo-400 to-indigo-600", hover: "group-hover:bg-indigo-500" },
  teal: { soft: "bg-teal-50", text: "text-teal-600", ring: "ring-teal-100", solid: "bg-teal-500", card: "bg-teal-50/70", border: "border-teal-100", grad: "from-teal-400 to-teal-600", hover: "group-hover:bg-teal-500" },
} as const;

export type Hue = keyof typeof hues;

const order: Hue[] = ["orange", "violet", "sky", "emerald", "amber", "rose", "indigo", "teal"];

/** Stable colour for the n-th item in a list. */
export function hueAt(i: number): Hue {
  return order[((i % order.length) + order.length) % order.length];
}
