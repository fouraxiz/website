import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedProjects } from "@/components/sections/RelatedProjects";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Icon } from "@/lib/icons";
import { pageMetadata } from "@/lib/metadata";
import { pickBySlug } from "@/lib/utils";
import { getService, services } from "@/data/services";
import { projects } from "@/data/projects";
import type { Service } from "@/types";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ title: s.title, description: s.seoDescription, path: `/services/${s.slug}` });
}

function ServiceVisual({ service }: { service: Service }) {
  return (
    <div className="relative rounded-2xl border border-ink-200 bg-white p-7 shadow-[var(--shadow-soft)]" aria-hidden="true">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-600 text-white [&_svg]:size-6">
          <Icon name={service.icon} />
        </span>
        <div>
          <p className="font-display font-semibold text-ink-900">{service.shortTitle}</p>
          <p className="text-xs text-ink-500">Delivery roadmap</p>
        </div>
      </div>
      <ol className="mt-7 space-y-3">
        {service.process.map((p, i) => (
          <li key={p.title} className="flex items-center gap-3">
            <span className={`inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${i === 0 ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-500"}`}>
              {i + 1}
            </span>
            <span className="flex-1 rounded-lg border border-ink-100 px-3 py-2 text-sm text-ink-700">{p.title}</span>
            <span className="h-1.5 w-12 overflow-hidden rounded-full bg-ink-100">
              <span className="block h-full rounded-full bg-brand-400" style={{ width: `${[100, 70, 35, 10][i] ?? 0}%` }} />
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-7 flex flex-wrap gap-1.5 border-t border-ink-100 pt-5">
        {service.technologies.slice(0, 4).map((t) => (
          <span key={t} className="rounded-md bg-ink-50 px-2 py-1 text-xs text-ink-600 ring-1 ring-ink-200 ring-inset">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const relatedProjects = pickBySlug(projects, s.relatedProjects);
  const otherServices = services.filter((o) => o.slug !== s.slug).slice(0, 6);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: s.shortTitle }]}
        eyebrow={s.title}
        title={s.tagline}
        description={s.summary}
        actions={
          <>
            <ButtonLink href={`/contact?interest=${s.slug}`} arrow>
              Discuss your project
            </ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              Our work
            </ButtonLink>
          </>
        }
        aside={<ServiceVisual service={s} />}
      />

      <Section labelledBy="intro">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <h2 id="intro" className="text-2xl font-bold tracking-tight sm:text-3xl">
            What this service covers
          </h2>
          <p className="text-lg leading-relaxed text-ink-600">{s.intro}</p>
        </div>
        <FeatureGrid items={s.deliverables} columns={2} className="mt-12" />
      </Section>

      <Section tone="muted" labelledBy="process">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading eyebrow="Delivery process" id="process" title="How we deliver it" />
            <ol className="mt-10 grid gap-6 sm:grid-cols-2">
              {s.process.map((p, i) => (
                <li key={p.title} className="rounded-xl border border-ink-200 bg-white p-6">
                  <span className="font-display text-sm font-semibold text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-500">{p.description}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="self-start rounded-2xl bg-ink-950 p-8">
            <h2 className="text-xl font-semibold text-white">Benefits</h2>
            <CheckList items={s.benefits} inverse className="mt-6" />
            <h3 className="mt-10 border-t border-white/10 pt-6 text-sm font-semibold text-white">Capability areas</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {s.technologies.map((t) => (
                <li key={t} className="rounded-md bg-white/[0.06] px-2.5 py-1 text-xs text-ink-300">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <RelatedProjects projects={relatedProjects} tone="white" />

      <Section tone={relatedProjects.length ? "muted" : "white"} labelledBy="other-services" className="py-16 sm:py-16">
        <h2 id="other-services" className="text-lg font-semibold">
          Other services
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {otherServices.map((o) => (
            <li key={o.slug}>
              <Link href={`/services/${o.slug}`} className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-3.5 py-2 text-sm font-medium text-ink-700 hover:border-brand-300 hover:text-brand-700">
                <Icon name={o.icon} className="size-4 text-brand-600" />
                {o.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={`Let's talk about ${s.shortTitle}.`}
        primary={{ label: "Start your project", href: `/contact?interest=${s.slug}` }}
        secondary={{ label: "All services", href: "/services" }}
      />
    </>
  );
}
