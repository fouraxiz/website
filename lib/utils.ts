import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Returns items from `source` whose `slug` appears in `slugs`, preserving `slugs` order. */
export function pickBySlug<T extends { slug: string }>(source: T[], slugs: string[]): T[] {
  return slugs.map((s) => source.find((item) => item.slug === s)).filter((x): x is T => Boolean(x));
}
