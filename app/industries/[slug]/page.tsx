import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedProjects } from "@/components/sections/RelatedProjects";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { Icon } from "@/lib/icons";
import { pageMetadata } from "@/lib/metadata";
import { hueAt } from "@/lib/palette";
import { bySlug, getIndustries, getProjects, pickSlugs } from "@/lib/cms/content";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const i = bySlug(await getIndustries(), slug);
  if (!i) return {};
  return pageMetadata({ title: `Software for ${i.title}`, description: `${i.summary} Solutions from 4axiz IT Limited.`, path: `/industries/${i.slug}` });
}

export default async function IndustryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [industries, projects] = await Promise.all([getIndustries(), getProjects()]);
  const i = bySlug(industries, slug);
  if (!i) notFound();
  const relatedProjects = pickSlugs(projects, i.relatedProjects);
  const others = industries.filter((o) => o.slug !== i.slug);

  return (
    <>
      <PageHero
        decor={{ icons: i.solutions.length ? ["boxes", "brain", "workflow", "bar-chart", "globe"] : [], center: i.icon }}
        crumbs={[{ label: "Industries", href: "/industries" }, { label: i.title }]}
        eyebrow={
          <>
            <Icon name={i.icon} className="size-4" /> Industry
          </>
        }
        title={`Software for ${i.title}`}
        description={i.intro}
        actions={
          <ButtonLink href={`/contact?interest=${i.slug}`} arrow>
            Talk to an expert
          </ButtonLink>
        }
      />

      <Section labelledBy="challenges">
        <SectionHeading eyebrow="Challenges" id="challenges" title={`Common challenges in ${i.title}`} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {i.challenges.map((c, idx) => (
            <li key={c.title} className="rounded-[var(--radius-card)] border border-ink-200 p-6">
              <span className="font-display text-sm font-semibold text-brand-600">{String(idx + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted" labelledBy="solutions">
        <SectionHeading eyebrow="How we help" id="solutions" title="Relevant solutions" />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {i.solutions.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="group flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 hover:border-brand-200 hover:shadow-[var(--shadow-soft)]">
                <h3 className="font-display text-lg font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-500">{s.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                  Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <RelatedProjects projects={relatedProjects} tone="white" />

      <Section tone={relatedProjects.length ? "muted" : "white"} labelledBy="other-industries" className="py-16 sm:py-16">
        <h2 id="other-industries" className="text-lg font-semibold">
          Other industries
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {others.map((o, idx) => (
            <li key={o.slug}>
              <Link href={`/industries/${o.slug}`} className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-3.5 py-2 text-sm font-medium text-ink-700 hover:border-brand-300 hover:text-brand-700">
                <IconTile name={o.icon} size="sm" hue={hueAt(idx)} className="size-6 ring-0 [&_svg]:size-3.5" />
                {o.title}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand title={`Building for ${i.title}? Let's talk.`} primary={{ label: "Start a conversation", href: `/contact?interest=${i.slug}` }} />
    </>
  );
}
