import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { pageMetadata } from "@/lib/metadata";
import { hueAt } from "@/lib/palette";
import { getProcess, getSection, getServices } from "@/lib/cms/content";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Software development services from 4axiz: custom software, ERP implementation, AI and machine learning, web and mobile development, UI/UX, APIs, cloud, QA and support.",
  path: "/services",
});

export default async function ServicesPage() {
  const [services, processSteps, copy] = await Promise.all([getServices(), getProcess(), getSection("page.services")]);
  const [lead, ...rest] = services;
  return (
    <>
      <PageHero
        decor={{ icons: ["code", "smartphone", "cloud", "palette", "plug"], center: "layers" }}
        crumbs={[{ label: "Services" }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        actions={
          <ButtonLink href="/contact" arrow>
            Start a project
          </ButtonLink>
        }
      />

      <Section labelledBy="all-services">
        <h2 id="all-services" className="sr-only">
          All services
        </h2>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <li className="md:col-span-2 lg:col-span-1 lg:row-span-3">
            <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] bg-ink-950 p-8">
              <IconTile name={lead.icon} tone="inverse" size="lg" />
              <h3 className="mt-8 text-2xl font-semibold text-white">
                <Link href={`/services/${lead.slug}`} className="after:absolute after:inset-0">
                  {lead.title}
                </Link>
              </h3>
              <p className="mt-3 leading-relaxed text-ink-400">{lead.intro}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-8 text-sm font-semibold text-brand-300 group-hover:text-white">
                Explore service <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </article>
          </li>
          {rest.map((s, idx) => (
            <li key={s.slug}>
              <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 transition-[border-color,box-shadow] hover:border-brand-200 hover:shadow-[var(--shadow-soft)]">
                <IconTile name={s.icon} hue={hueAt(idx + 1)} />
                <h3 className="mt-5 text-lg font-semibold">
                  <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0">
                    {s.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{s.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                  Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </article>
            </li>
          ))}
          <li>
            <div className="flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-dashed border-brand-300 bg-brand-50/50 p-6">
              <div>
                <h3 className="text-lg font-semibold">Not sure what you need?</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  Describe the problem and we&apos;ll recommend the right mix of services — or tell you honestly if you don&apos;t need new software.
                </p>
              </div>
              <ButtonLink href="/contact" size="sm" className="mt-6 self-start" arrow>
                Ask our team
              </ButtonLink>
            </div>
          </li>
        </ul>
      </Section>

      <Section tone="muted" labelledBy="process">
        <SectionHeading eyebrow="How we work" id="process" title="One process across every service." />
        <div className="mt-12">
          <ProcessTimeline steps={processSteps} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
