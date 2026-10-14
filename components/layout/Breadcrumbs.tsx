import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/data/site";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, inverse = false }: { items: Crumb[]; inverse?: boolean }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${inverse ? "text-ink-400" : "text-ink-500"}`}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
                {c.href && !last ? (
                  <Link href={c.href} className={inverse ? "hover:text-white" : "hover:text-ink-900"}>
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className={inverse ? "text-ink-200" : "text-ink-700"}>
                    {c.label}
                  </span>
                )}
                {!last && <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.href ? { item: new URL(c.href, site.url).toString() } : {}),
          })),
        }}
      />
    </>
  );
}
