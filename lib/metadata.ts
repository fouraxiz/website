import type { Metadata } from "next";
import { site } from "@/data/site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
}

/** Consistent per-page metadata with canonical URL, Open Graph and Twitter tags. */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  const url = path === "/" ? "/" : path;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.legalName}`,
      description,
      url,
      siteName: site.legalName,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.legalName}`,
      description,
    },
  };
}
