import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { CopyTitle, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/lib/icons";
import { hues, hueAt } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { getServices } from "@/lib/cms/content";
import type { SectionEntry } from "@/lib/cms/content";

export async function ServicesGrid({ copy }: { copy: SectionEntry }) {
  const list = (await getServices()).filter((s) => s.featured).slice(0, 8);
  return (
    <section className="relative bg-ink-50 py-20 sm:py-28" aria-labelledby="services-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={copy.eyebrow ?? undefined}
            id="services-heading"
            title={<CopyTitle title={copy.title} highlight={copy.highlight} />}
            description={copy.description ?? undefined}
          />
          <ButtonLink href="/services" variant="secondary" arrow>
            All services
          </ButtonLink>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s, i) => {
            const h = hues[hueAt(i)];
            return (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-7 ring-1 ring-ink-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className={cn("absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100", h.grad)} aria-hidden="true" />
                  <span className={cn("inline-flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-[-6deg] [&_svg]:size-6", h.soft, h.text)}>
                    <Icon name={s.icon} />
                  </span>
                  <h3 className="mt-6 text-lg leading-snug font-semibold text-ink-900">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{s.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 group-hover:text-brand-600">
                    Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
