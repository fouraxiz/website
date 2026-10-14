import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CheckList } from "@/components/ui/CheckList";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { AppMockup } from "@/components/visuals/AppMockup";
import { Icon } from "@/lib/icons";
import { pageMetadata } from "@/lib/metadata";
import { pickBySlug } from "@/lib/utils";
import { erpStatusLabel, getErpModule, publishedErpModules } from "@/data/erp-modules";

type Params = { module: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return publishedErpModules.map((m) => ({ module: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { module } = await params;
  const m = getErpModule(module);
  if (!m) return {};
  return pageMetadata({
    title: `${m.title} — ERP Module`,
    description: `${m.summary} Part of the 4axiz ERP platform.`,
    path: `/solutions/erp/${m.slug}`,
  });
}

/** Shared ERP module template — every module page is generated from data/erp-modules.ts. */
export default async function ErpModulePage({ params }: { params: Promise<Params> }) {
  const { module } = await params;
  const m = getErpModule(module);
  if (!m) notFound();
  const related = pickBySlug(publishedErpModules, m.related);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Solutions", href: "/solutions" },
          { label: "ERP", href: "/solutions/erp" },
          { label: m.shortTitle },
        ]}
        eyebrow={
          <>
            <Icon name={m.icon} className="size-4" /> ERP module · {m.group}
          </>
        }
        title={m.title}
        description={
          <>
            <span className="block font-medium text-ink-800">{m.tagline}</span>
            <span className="mt-3 block">{m.summary}</span>
          </>
        }
        actions={
          <>
            <ButtonLink href={`/contact?interest=erp&module=${m.slug}`} arrow>
              Book a demo
            </ButtonLink>
            <ButtonLink href="/solutions/erp" variant="secondary">
              All modules
            </ButtonLink>
          </>
        }
        aside={<AppMockup title={m.title} icon={m.icon} metricLabels={m.mockup.metricLabels} rows={m.mockup.rows} />}
      >
        <div className="mt-6">
          <Badge>{erpStatusLabel[m.status]}</Badge>
        </div>
      </PageHero>

      <Section labelledBy="problems">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <SectionHeading eyebrow="The problem" id="problems" title="Business problems it addresses" />
          <ul className="grid gap-4 sm:grid-cols-2">
            {m.problems.map((p) => (
              <li key={p} className="rounded-xl border border-ink-200 bg-ink-50/60 p-5 text-sm leading-relaxed text-ink-600">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="muted" labelledBy="capabilities">
        <SectionHeading eyebrow="Capabilities" id="capabilities" title="What the module does" />
        <FeatureGrid items={m.capabilities} className="mt-10" />
      </Section>

      <Section labelledBy="workflow">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Typical workflow" id="workflow" title="How work flows through it" />
            <ol className="mt-8">
              {m.workflow.map((step, i) => (
                <li key={step} className="relative flex gap-4 pb-7 last:pb-0">
                  {i < m.workflow.length - 1 && <span className="absolute top-8 bottom-0 left-4 w-px bg-ink-200" aria-hidden="true" />}
                  <span className="relative inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-brand-50 font-display text-sm font-semibold text-brand-700">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-ink-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="self-start rounded-2xl bg-ink-950 p-8 sm:p-10">
            <h2 className="text-xl font-semibold text-white">Business benefits</h2>
            <CheckList items={m.benefits} inverse className="mt-6" />
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="muted" labelledBy="related">
          <SectionHeading eyebrow="Connected modules" id="related" title="Works best with" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/solutions/erp/${r.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-5 hover:border-brand-200 hover:shadow-[var(--shadow-soft)]"
                >
                  <Icon name={r.icon} className="size-5 text-brand-600" />
                  <span className="mt-4 font-display font-semibold text-ink-900">{r.title}</span>
                  <span className="mt-1 flex-1 text-sm text-ink-500">{r.tagline}</span>
                  <ArrowRight className="mt-4 size-4 text-ink-300 transition group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand
        title={`Explore ${m.title} for your organisation.`}
        description="Book a demo or a short consultation. We'll walk through the module using scenarios from your own operations."
        primary={{ label: "Book a demo", href: `/contact?interest=erp&module=${m.slug}` }}
        secondary={{ label: "ERP overview", href: "/solutions/erp" }}
      />
    </>
  );
}
