import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedProjects } from "@/components/sections/RelatedProjects";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { CheckList } from "@/components/ui/CheckList";
import { PlaceholderNote, Tbc } from "@/components/ui/PlaceholderNote";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { pageMetadata } from "@/lib/metadata";
import { bySlug, getProjects, getSolutions, pickSlugs } from "@/lib/cms/content";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(await getProjects(), slug);
  if (!p) return {};
  return pageMetadata({ title: `${p.name} — Project`, description: `${p.summary} A ${p.industry.toLowerCase()} project by 4axiz IT Limited.`, path: `/projects/${p.slug}` });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [projects, solutions] = await Promise.all([getProjects(), getSolutions()]);
  const p = bySlug(projects, slug);
  if (!p) notFound();

  const related = projects
    .filter((o) => o.slug !== p.slug)
    .sort((a, b) => b.categories.filter((c) => p.categories.includes(c)).length - a.categories.filter((c) => p.categories.includes(c)).length)
    .slice(0, 3);
  const relatedSolutions = pickSlugs(solutions, p.relatedSolutions);
  const caseStudyPending = !p.challenge || !p.solution;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Projects", href: "/projects" }, { label: p.name }]}
        eyebrow={p.industry}
        title={p.name}
        description={p.overview}
        aside={<ProjectCover project={p} priority className="rounded-2xl border border-ink-200 shadow-[var(--shadow-lift)]" />}
      >
        <div className="mt-6 flex flex-wrap gap-1.5">
          {p.categories.map((c) => (
            <Badge key={c} tone="brand">
              {c}
            </Badge>
          ))}
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_20rem]">
          <div>
            <div className="prose-site">
            {caseStudyPending && (
              <PlaceholderNote className="mb-8">
                Full case study in preparation. Challenge, solution details and screenshots will be published once approved.
              </PlaceholderNote>
            )}
            <h2>Project overview</h2>
            <p>{p.overview}</p>

            <h2>Business challenge</h2>
            {p.challenge ? <p>{p.challenge}</p> : <p><Tbc label="To be supplied with the approved case study." /></p>}

            <h2>Solution delivered</h2>
            {p.solution ? <p>{p.solution}</p> : <p><Tbc label="To be supplied with the approved case study." /></p>}

              <h2>Highlights</h2>
            </div>
            <CheckList items={p.highlights} />
          </div>

          <aside className="self-start rounded-2xl border border-ink-200 bg-ink-50/70 p-6 lg:sticky lg:top-28">
            <h2 className="text-sm font-semibold tracking-[0.12em] text-ink-400 uppercase">Project details</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-ink-500">Client</dt>
                <dd className="mt-0.5 font-medium text-ink-900">{p.client ?? <Tbc label="Shared on approval" />}</dd>
              </div>
              <div>
                <dt className="text-ink-500">Industry</dt>
                <dd className="mt-0.5 font-medium text-ink-900">{p.industry}</dd>
              </div>
              <div>
                <dt className="text-ink-500">Platform</dt>
                <dd className="mt-0.5 font-medium text-ink-900">{p.platform.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-ink-500">Technology</dt>
                <dd className="mt-0.5 font-medium text-ink-900">{p.technologies.length ? p.technologies.join(", ") : <Tbc />}</dd>
              </div>
              {relatedSolutions.length > 0 && (
                <div>
                  <dt className="text-ink-500">Related solutions</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {relatedSolutions.map((s) => (
                      <Link key={s.slug} href={s.href} className="rounded-md bg-white px-2 py-1 text-xs font-medium text-brand-700 ring-1 ring-ink-200 ring-inset hover:ring-brand-300">
                        {s.shortTitle}
                      </Link>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Visit live project <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            )}
          </aside>
        </div>

        {p.images.length > 1 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight">Gallery</h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {p.images.slice(1).map((img) => (
                <li key={img.src} className="overflow-hidden rounded-xl border border-ink-200">
                  <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 640px) 50vw, 100vw" className="h-auto w-full" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <RelatedProjects projects={related} title="More projects" />
      <CtaBand title="Planning something similar?" primary={{ label: "Start your project", href: "/contact" }} secondary={{ label: "All projects", href: "/projects" }} />
    </>
  );
}
