import { publishedErpModules } from "@/data/erp-modules";
import { industries } from "@/data/industries";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";

/** Inquiry options built from site data. Imported by server code only (page + API route). */
export const interestGroups: { label: string; options: { value: string; label: string }[] }[] = [
  {
    label: "Solutions",
    options: [{ value: "erp", label: "ERP Solutions" }, ...solutions.map((s) => ({ value: s.slug, label: s.title }))],
  },
  {
    label: "Products",
    options: [{ value: "demo", label: "Product demo" }],
  },
  {
    label: "Services",
    options: services.map((s) => ({ value: s.slug, label: s.title })),
  },
  {
    label: "Industries",
    options: industries.map((i) => ({ value: i.slug, label: `${i.title} solutions` })),
  },
  {
    label: "Other",
    options: [
      { value: "careers", label: "Careers" },
      { value: "partnership", label: "Partnership" },
      { value: "other", label: "Something else" },
    ],
  },
];

export const interestValues = new Set(interestGroups.flatMap((g) => g.options.map((o) => o.value)));

/** Human-readable context for `?module=` / `?product=` query params. */
export function contextLabel(params: { module?: string | null; product?: string | null }) {
  if (params.module) {
    const m = publishedErpModules.find((x) => x.slug === params.module);
    if (m) return `ERP module: ${m.title}`;
  }
  if (params.product) {
    const p = products.find((x) => x.slug === params.product);
    if (p) return `Product: ${p.name}`;
  }
  return null;
}
