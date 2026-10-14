import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CheckList } from "@/components/ui/CheckList";
import { ErpEcosystem } from "@/components/visuals/ErpEcosystem";
import { AppMockup } from "@/components/visuals/AppMockup";
import { IconTile } from "@/components/ui/IconTile";
import { hueAt } from "@/lib/palette";
import { pageMetadata } from "@/lib/metadata";
import { erpStatusLabel, publishedErpModules } from "@/data/erp-modules";
import { getProduct } from "@/data/products";
import type { ErpModule } from "@/types";

export const metadata = pageMetadata({
  title: "ERP Solutions",
  description:
    "4axiz ERP: a modular business management platform connecting accounting, HRM and payroll, procurement, inventory, POS, projects, assets and analytics.",
  path: "/solutions/erp",
});

const groupOrder: ErpModule["group"][] = ["Finance & Operations", "People", "Commerce & Supply", "Assets & Service", "Industry", "Insight"];

const principles = [
  { title: "Start where it matters", text: "Begin with the modules that address your most pressing problem, then expand at your own pace." },
  { title: "Configured to your policies", text: "Organisation structure, approval chains, numbering and permissions set up to match how you operate." },
  { title: "Connected by default", text: "Transactions flow between modules so finance, HR, purchasing and stock always agree." },
  { title: "Extended when needed", text: "Industry-specific modules and integrations are built on the same foundation." },
];

export default function ErpPage() {
  const erp = getProduct("4axiz-erp")!;
  const grouped = groupOrder
    .map((g) => ({ group: g, modules: publishedErpModules.filter((m) => m.group === g) }))
    .filter((g) => g.modules.length > 0);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Solutions", href: "/solutions" }, { label: "ERP" }]}
        eyebrow="ERP solutions"
        title="An integrated platform for running your entire organisation."
        description="4axiz ERP connects finance, people, procurement, inventory, sales and reporting on one shared data model — improving visibility, efficiency and the quality of every decision."
        actions={
          <>
            <ButtonLink href="/contact?interest=erp" arrow>
              Request an ERP demo
            </ButtonLink>
            <ButtonLink href="#modules" variant="secondary">
              Browse modules
            </ButtonLink>
          </>
        }
        aside={<AppMockup title="4axiz ERP" icon="boxes" metricLabels={erp.mockup.metricLabels} rows={erp.mockup.rows} />}
      />

      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-24" aria-labelledby="ecosystem">
        <div className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-site relative">
          <SectionHeading
            inverse
            eyebrow="The ecosystem"
            id="ecosystem"
            title="Modules that work together."
            description="Each module is valuable on its own. Together, they remove the gaps between departments."
            align="center"
          />
          <div className="mt-12">
            <ErpEcosystem modules={publishedErpModules} />
          </div>
        </div>
      </section>

      <Section labelledBy="principles">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <SectionHeading eyebrow="How it works" id="principles" title="A platform that grows with you." />
          <ul className="grid gap-8 sm:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title}>
                <span className="font-display text-sm font-semibold text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="muted" id="modules" labelledBy="modules-heading">
        <SectionHeading
          eyebrow="Modules"
          id="modules-heading"
          title="Explore the modules."
          description="Availability and packaging are confirmed per engagement — talk to us about the combination that fits your organisation."
        />
        <div className="mt-12 space-y-12">
          {grouped.map(({ group, modules }) => (
            <div key={group}>
              <h3 className="text-sm font-semibold tracking-[0.12em] text-ink-400 uppercase">{group}</h3>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {modules.map((m, idx) => (
                  <li key={m.slug}>
                    <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 transition-[border-color,box-shadow] hover:border-brand-200 hover:shadow-[var(--shadow-soft)]">
                      <div className="flex items-start justify-between gap-3">
                        <IconTile name={m.icon} hue={hueAt(idx + m.group.length)} />
                        <Badge>{erpStatusLabel[m.status]}</Badge>
                      </div>
                      <h4 className="mt-5 font-display text-lg font-semibold text-ink-900">
                        <Link href={`/solutions/erp/${m.slug}`} className="after:absolute after:inset-0">
                          {m.title}
                        </Link>
                      </h4>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{m.tagline}</p>
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                        View module <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="implementation">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Implementation"
              id="implementation"
              title="More than software: a rollout your teams adopt."
              description="We handle fit-gap analysis, configuration, data migration, training and post-launch support."
            />
            <ButtonLink href="/services/erp-implementation" variant="secondary" className="mt-8" arrow>
              ERP implementation services
            </ButtonLink>
          </div>
          <div className="rounded-2xl border border-ink-200 bg-ink-50 p-8">
            <CheckList items={erp.benefits.concat(["Integration with other business systems where required", "Ongoing support and enhancement"])} />
          </div>
        </div>
      </Section>

      <CtaBand
        title="See how 4axiz ERP could fit your organisation."
        description="Book a walkthrough focused on your processes. We'll show the relevant modules and discuss what configuration you'd need."
        primary={{ label: "Request a demo", href: "/contact?interest=erp" }}
        secondary={{ label: "View products", href: "/products" }}
      />
    </>
  );
}
