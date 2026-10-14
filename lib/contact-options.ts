import "server-only";
import { getIndustries, getServices, getSolutions } from "@/lib/cms/content";

/** Inquiry options built from site data. Imported by server code only (page + API route). */
export type InterestGroup = { label: string; options: { value: string; label: string }[] };

export async function getInterestGroups(): Promise<InterestGroup[]> {
  const [solutions, services, industries] = await Promise.all([getSolutions(), getServices(), getIndustries()]);
  return [
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
}

export async function getInterestValues() {
  return new Set((await getInterestGroups()).flatMap((g) => g.options.map((o) => o.value)));
}
