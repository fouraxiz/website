import Link from "next/link";
import { CopyTitle, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/lib/icons";
import { hues, hueAt } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { getIndustries } from "@/lib/cms/content";
import type { SectionEntry } from "@/lib/cms/content";

export async function IndustriesSection({ copy }: { copy: SectionEntry }) {
  const industries = await getIndustries();
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="industries-heading">
      <div className="container-site">
        <SectionHeading
          align="center"
          eyebrow={copy.eyebrow ?? undefined}
          id="industries-heading"
          title={<CopyTitle title={copy.title} highlight={copy.highlight} />}
          description={copy.description ?? undefined}
        />
        <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {industries.map((ind, i) => {
            const h = hues[hueAt(i + 2)];
            return (
              <li key={ind.slug}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group flex h-full flex-col items-center rounded-2xl bg-white p-6 text-center ring-1 ring-ink-200/80 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:ring-transparent sm:p-8"
                >
                  <span className={cn("inline-flex size-16 items-center justify-center rounded-full transition-colors duration-300 [&_svg]:size-7", h.soft, h.text, "group-hover:text-white", h.hover)}>
                    <Icon name={ind.icon} />
                  </span>
                  <h3 className="mt-5 text-[0.95rem] leading-snug font-semibold text-ink-900">{ind.title}</h3>
                  <p className="mt-2 hidden text-xs leading-relaxed text-ink-500 sm:block">{ind.summary}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
