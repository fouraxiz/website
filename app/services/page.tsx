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
import { getDomains, getProcess, getSection, getServices } from "@/lib/cms/content";
import { Icon } from "@/lib/icons";
import { hues } from "@/lib/palette";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Full-lifecycle software services from 4axiz — ERP, MIS & MEAL, custom software, mobile, AI & data, cloud & DevOps, system integration, UI/UX and support — plus cyber security, hosting, networking, SEO and marketing expertise.",
  path: "/services",
});

export default async function ServicesPage() {
  const [services, processSteps, copy, domains] = await Promise.all([getServices(), getProcess(), getSection("page.services"), getDomains()]);
  const lifecycle = services.filter((s) => s.group !== "expertise");
  const expertise = services.filter((s) => s.group === "expertise");
  return (
    <>
      <PageHero
        edit={[{ label: "Heading", collection: "sections", slug: "page.services" }, { label: "Services", collection: "services" }, { label: "Add service", collection: "services", create: true }, { label: "Domains", collection: "domains" }]}
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
        <SectionHeading
          eyebrow="Full-lifecycle software & digital services"
          id="all-services"
          title="Nine services, one accountable team."
          description="From discovery and design to build, deployment, training and long-term support."
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {lifecycle.map((s, idx) => (
            <li key={s.slug}>
              <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-7 transition-[border-color,box-shadow] hover:border-brand-200 hover:shadow-[var(--shadow-soft)]">
                <div className="flex items-start justify-between gap-4">
                  <IconTile name={s.icon} hue={hueAt(idx)} />
                  <span className="font-display text-sm font-semibold text-ink-300">{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">
                  <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0">
                    {s.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{s.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                  Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      {expertise.length > 0 && (
        <Section tone="muted" labelledBy="expertise">
          <SectionHeading eyebrow="Our expertise" id="expertise" title="Where our engineers go deep." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {expertise.map((s, idx) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-ink-200/70 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] hover:ring-brand-200"
                >
                  <IconTile name={s.icon} hue={hueAt(idx + 3)} />
                  <span className="mt-4 font-semibold text-ink-900">{s.title}</span>
                  <span className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-500">{s.tagline}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                    Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {domains.length > 0 && (
        <Section tone="dark" labelledBy="domains">
          <SectionHeading eyebrow="Domains" id="domains" title="Domains where we go deep." inverse />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {domains.map((d, i) => (
              <li key={d._id} className="rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10">
                <span className={cn("inline-flex size-11 items-center justify-center rounded-xl text-white [&_svg]:size-5", hues[hueAt(i)].solid)}>
                  <Icon name={d.icon} />
                </span>
                <h3 className="mt-5 font-semibold text-white">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{d.description}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section labelledBy="process">
        <SectionHeading eyebrow="How we work" id="process" title="One process across every service." />
        <div className="mt-12">
          <ProcessTimeline steps={processSteps} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
