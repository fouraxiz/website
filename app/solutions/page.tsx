import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { IconTile } from "@/components/ui/IconTile";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/lib/icons";
import { pageMetadata } from "@/lib/metadata";
import { hueAt } from "@/lib/palette";
import { solutions } from "@/data/solutions";
import { publishedErpModules } from "@/data/erp-modules";

export const metadata = pageMetadata({
  title: "Solutions",
  description:
    "ERP, AI and intelligent automation, custom software, web and mobile applications, process automation and e-commerce solutions from 4axiz IT Limited.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        decor={{ icons: ["boxes", "brain", "globe", "smartphone", "workflow"], center: "sparkles" }}
        crumbs={[{ label: "Solutions" }]}
        eyebrow="Solutions"
        title="Technology solutions for every stage of growth."
        description="Whether you need a connected ERP, practical AI or a system built around a unique process, we combine proven products with tailored engineering."
        actions={
          <>
            <ButtonLink href="/contact" arrow>
              Discuss your requirements
            </ButtonLink>
            <ButtonLink href="/products" variant="secondary">
              Browse products
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="erp-feature">
        <div className="grid items-center gap-10 overflow-hidden rounded-2xl border border-ink-200 bg-gradient-to-br from-brand-50 to-white p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <IconTile name="boxes" size="lg" hue="sky" />
            <h2 id="erp-feature" className="mt-6 text-3xl font-bold tracking-tight">
              ERP Solutions
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-ink-500">
              A modular business management platform connecting finance, people, procurement, inventory, sales and reporting.
            </p>
            <ButtonLink href="/solutions/erp" className="mt-8" arrow>
              Explore ERP
            </ButtonLink>
          </div>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {publishedErpModules.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/solutions/erp/${m.slug}`}
                  className="flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-700 hover:border-brand-300 hover:text-brand-700"
                >
                  <Icon name={m.icon} className="size-4 shrink-0 text-brand-600" />
                  <span className="truncate">{m.shortTitle}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, idx) => (
            <li key={s.slug}>
              <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-7 transition-[border-color,box-shadow] hover:border-brand-200 hover:shadow-[var(--shadow-soft)]">
                <IconTile name={s.icon} hue={hueAt(idx + 1)} />
                <h2 className="mt-6 text-xl font-semibold">
                  <Link href={s.href} className="after:absolute after:inset-0">
                    {s.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{s.summary}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                  Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
