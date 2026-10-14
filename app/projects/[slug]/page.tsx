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
import { hues, hueAt } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/metadata";
import { bySlug, getProjects, getSolutions, getTechnologies, pickSlugs } from "@/lib/cms/content";
import { TechIcon } from "@/components/ui/TechIcon";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(await getProjects(), slug);
  if (!p) return {};
  return pageMetadata({ title: `${p.name} — Project`, description: `${p.summary} A ${p.industry.toLowerCase()} project by 4axiz IT Limited.`, path: `/projects/${p.slug}` });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [projects, solutions, techList] = await Promise.all([getProjects(), getSolutions(), getTechnologies()]);
  const p = bySlug(projects, slug);
  if (!p) notFound();

  const related = projects
    .filter((o) => o.slug !== p.slug)
    .sort((a, b) => b.categories.filter((c) => p.categories.includes(c)).length - a.categories.filter((c) => p.categories.includes(c)).length)
    .slice(0, 3);
  const relatedSolutions = pickSlugs(solutions, p.relatedSolutions);
  const caseStudyPending = !p.challenge && !p.solution && p.features.length === 0;

  return (
    <>
      <PageHero
        edit={[{ label: "Edit this project", collection: "projects", slug: p.slug }, { label: "Add project", collection: "projects", create: true }]}
        crumbs={[{ label: "Projects", href: "/projects" }, { label: p.name }]}
        eyebrow={p.industry}
        title={p.name}
        description={p.summary}
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

      {p.stats.length > 0 && (
        <div className="container-site relative z-10 -mt-8">
          <dl className={cn("grid gap-px overflow-hidden rounded-2xl bg-ink-200 shadow-[var(--shadow-lift)] ring-1 ring-ink-200", p.stats.length >= 4 ? "grid-cols-2 lg:grid-cols-4" : p.stats.length === 3 ? "grid-cols-3" : "grid-cols-2")}>
            {p.stats.map((st, i) => (
              <div key={st.label} className="bg-white p-5 sm:p-6">
                <dd className={cn("font-display text-2xl font-bold sm:text-3xl", hues[hueAt(i)].text)}>{st.value}</dd>
                <dt className="mt-1 text-sm text-ink-500">{st.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      )}

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_20rem]">
          <div>
            <div className="prose-site">
            {caseStudyPending && (
              <PlaceholderNote className="mb-8">
                A detailed case study, work orders and completion certificates are available on request.
              </PlaceholderNote>
            )}
            <h2>Project overview</h2>
            <p>{p.overview}</p>

            {p.challenge && (
              <>
                <h2>Business challenge</h2>
                <p>{p.challenge}</p>
              </>
            )}

            {p.solution && (
              <>
                <h2>Solution delivered</h2>
                <p className="whitespace-pre-line">{p.solution}</p>
              </>
            )}

            </div>

            {p.features.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold tracking-tight">{p.featuresTitle ?? "What we built"}</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {p.features.map((f, i) => (
                    <li key={f.title} className="rounded-2xl bg-ink-50 p-5 ring-1 ring-ink-100">
                      <span className={cn("block h-1 w-8 rounded-full", hues[hueAt(i)].solid)} aria-hidden="true" />
                      <h3 className="mt-3 font-semibold text-ink-900">{f.title}</h3>
                      {f.description && <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{f.description}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {p.technical.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold tracking-tight">{p.technicalTitle ?? "Technical highlights"}</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {p.technical.map((f) => (
                    <li key={f.title} className="rounded-2xl bg-white p-5 ring-1 ring-ink-200">
                      <h3 className="font-semibold text-ink-900">{f.title}</h3>
                      {f.description && <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{f.description}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {p.impact && (
              <div className="mt-10 rounded-3xl bg-ink-950 p-7 sm:p-8">
                <p className="eyebrow text-brand-300">{p.impactTitle ?? "Impact"}</p>
                <p className="mt-3 text-lg leading-relaxed text-white">{p.impact}</p>
              </div>
            )}

            {p.highlights.length > 0 && (
              <>
                <h2 className="mt-10 font-display text-2xl font-bold tracking-tight">Highlights</h2>
                <CheckList items={p.highlights} className="mt-5" />
              </>
            )}
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
              {p.duration && (
                <div>
                  <dt className="text-ink-500">Engagement</dt>
                  <dd className="mt-0.5 font-medium text-ink-900">{p.duration}</dd>
                </div>
              )}
              <div>
                <dt className="text-ink-500">Platform</dt>
                <dd className="mt-0.5 font-medium text-ink-900">{p.platform.join(", ")}</dd>
              </div>
              {p.technologies.length > 0 && (
                <div>
                  <dt className="text-ink-500">Technology</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {p.technologies.map((name) => {
                      const tech = techList.find((t) => t.name.toLowerCase() === name.toLowerCase());
                      return (
                        <Link key={name} href={`/projects?q=${encodeURIComponent(name)}`} className="inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-xs font-medium text-ink-700 ring-1 ring-ink-200 ring-inset hover:ring-brand-300">
                          {tech && <TechIcon tech={tech} className="size-3.5" />}
                          {name}
                        </Link>
                      );
                    })}
                  </dd>
                </div>
              )}
              {p.deliveryTags.length > 0 && (
                <div>
                  <dt className="text-ink-500">Delivered as</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {p.deliveryTags.map((t) => (
                      <span key={t} className="rounded-md bg-white px-2 py-1 text-xs font-medium text-ink-700 ring-1 ring-ink-200 ring-inset">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
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
                  <Image unoptimized src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 640px) 50vw, 100vw" className="h-auto w-full" />
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
