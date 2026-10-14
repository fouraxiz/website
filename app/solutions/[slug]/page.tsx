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
import { IconTile } from "@/components/ui/IconTile";
import { Icon } from "@/lib/icons";
import { pageMetadata } from "@/lib/metadata";
import { bySlug, getIndustries, getProjects, getServices, getSolutions, pickSlugs } from "@/lib/cms/content";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = bySlug(await getSolutions(), slug);
  if (!s) return {};
  return pageMetadata({ title: s.title, description: s.seoDescription, path: s.href });
}

export default async function SolutionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = bySlug(await getSolutions(), slug);
  if (!s) notFound();
  const [services, projects, industries] = await Promise.all([getServices(), getProjects(), getIndustries()]);

  const relatedServices = pickSlugs(services, s.relatedServices);
  const relatedProjects = pickSlugs(projects, s.relatedProjects);
  const relatedIndustries = pickSlugs(industries, s.relatedIndustries);
  const isAi = s.slug === "ai";

  return (
    <>
      <PageHero
        crumbs={[{ label: "Solutions", href: "/solutions" }, { label: s.shortTitle }]}
        eyebrow={s.shortTitle}
        title={s.tagline}
        description={s.summary}
        actions={
          <>
            <ButtonLink href={`/contact?interest=${s.slug}`} arrow>
              Talk to our team
            </ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              See our work
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-2xl border border-ink-200 bg-white p-7 shadow-[var(--shadow-soft)]">
            <IconTile name={s.icon} hue={isAi ? "violet" : "sky"} size="lg" />
            <h2 className="mt-6 text-lg font-semibold">Challenges we solve</h2>
            <ul className="mt-4 space-y-3">
              {s.problems.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink-600">
                  <span className={`mt-2 size-1.5 shrink-0 rounded-full ${isAi ? "bg-accent-500" : "bg-brand-500"}`} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <Section labelledBy="overview">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <h2 id="overview" className="text-2xl font-bold tracking-tight sm:text-3xl">
            Overview
          </h2>
          <p className="text-lg leading-relaxed text-ink-600">{s.intro}</p>
        </div>
      </Section>

      <Section tone="muted" labelledBy="capabilities">
        <SectionHeading eyebrow="Capabilities" id="capabilities" title={isAi ? "Where we apply AI" : "What we deliver"} />
        <FeatureGrid items={s.capabilities} className="mt-10" />
      </Section>

      <Section labelledBy="approach">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our approach" id="approach" title="How we deliver" />
            <ol className="mt-8 space-y-6">
              {s.approach.map((a, i) => (
                <li key={a.title} className="flex gap-4">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-ink-900 font-display text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{a.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{a.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl bg-ink-950 p-8 sm:p-10">
            <h2 className="text-xl font-semibold text-white">What you can expect</h2>
            <CheckList items={s.outcomes} inverse className="mt-6" />
            {relatedServices.length > 0 && (
              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-sm font-semibold text-white">Related services</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {relatedServices.map((sv) => (
                    <li key={sv.slug}>
                      <Link href={`/services/${sv.slug}`} className="inline-flex rounded-md bg-white/[0.06] px-3 py-1.5 text-sm text-ink-200 hover:bg-white/10 hover:text-white">
                        {sv.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Section>

      {relatedIndustries.length > 0 && (
        <Section tone="muted" labelledBy="industries" className="py-16 sm:py-16">
          <h2 id="industries" className="text-lg font-semibold">
            Industries we serve with {s.shortTitle}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {relatedIndustries.map((i) => (
              <li key={i.slug}>
                <Link href={`/industries/${i.slug}`} className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-700 hover:border-brand-300 hover:text-brand-700">
                  <Icon name={i.icon} className="size-4 text-brand-600" />
                  {i.title}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <RelatedProjects projects={relatedProjects} tone="white" />
      <CtaBand primary={{ label: "Start a conversation", href: `/contact?interest=${s.slug}` }} />
    </>
  );
}
