import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/lib/icons";
import { hues } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { IconTile } from "@/components/ui/IconTile";
import { pageMetadata } from "@/lib/metadata";
import { hueAt } from "@/lib/palette";
import { getClientMix, getDomains, getIndustries, getSection, getSectors } from "@/lib/cms/content";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "Sectors and domains 4axiz serves: government, UN and development partners, international and local NGOs, healthcare, education and corporate enterprises.",
  path: "/industries",
});

export default async function IndustriesPage() {
  const [industries, copy, sectors, mix, domains] = await Promise.all([getIndustries(), getSection("page.industries"), getSectors(), getClientMix(), getDomains()]);
  return (
    <>
      <PageHero
        edit={[{ label: "Heading", collection: "sections", slug: "page.industries" }, { label: "Industries", collection: "industries" }, { label: "Add industry", collection: "industries", create: true }, { label: "Sectors", collection: "sectors" }, { label: "Client mix", collection: "client_mix" }, { label: "Domains", collection: "domains" }]}
        decor={{ icons: ["stethoscope", "graduation-cap", "shopping-cart", "factory", "truck"], center: "briefcase" }}
        crumbs={[{ label: "Industries" }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <Section>
        <ul className="grid gap-5 md:grid-cols-2">
          {industries.map((i, idx) => (
            <li key={i.slug}>
              <article className="group relative flex h-full gap-5 rounded-[var(--radius-card)] border border-ink-200 bg-white p-7 transition-[border-color,box-shadow] hover:border-brand-200 hover:shadow-[var(--shadow-soft)]">
                <IconTile name={i.icon} size="lg" hue={hueAt(idx + 2)} />
                <div className="flex flex-1 flex-col">
                  <h2 className="text-xl font-semibold">
                    <Link href={`/industries/${i.slug}`} className="after:absolute after:inset-0">
                      {i.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{i.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {i.challenges.slice(0, 3).map((c) => (
                      <li key={c.title} className="rounded-md bg-ink-50 px-2 py-1 text-xs text-ink-600">
                        {c.title}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                    Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>
      {sectors.length > 0 && (
        <Section tone="dark" labelledBy="sectors">
          <SectionHeading
            eyebrow="Sectors"
            id="sectors"
            title="Sectors that depend on us."
            description="Our clients answer to ministries, boards and international donors. We understand how each of these sectors is governed, funded and audited — and we build accordingly."
            inverse
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sec, i) => (
              <li key={sec._id} className="rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10">
                <span className={cn("inline-flex size-11 items-center justify-center rounded-xl text-white [&_svg]:size-5", hues[hueAt(i)].solid)}>
                  <Icon name={sec.icon} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{sec.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{sec.clients}</p>
              </li>
            ))}
          </ul>
          {mix.length > 0 && (
            <dl className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {mix.map((m, i) => (
                <div key={m._id} className="rounded-2xl bg-white p-5">
                  <dd className={cn("font-display text-3xl font-bold", hues[hueAt(i)].text)}>{m.value}</dd>
                  <dt className="mt-1 text-sm text-ink-500">{m.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </Section>
      )}

      {domains.length > 0 && (
        <Section labelledBy="domains">
          <SectionHeading eyebrow="Domains" id="domains" title="Domains where we go deep." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {domains.map((d, i) => (
              <li key={d._id} className="rounded-3xl bg-ink-50 p-6 ring-1 ring-ink-100">
                <span className={cn("inline-flex size-11 items-center justify-center rounded-xl text-white [&_svg]:size-5", hues[hueAt(i + 2)].solid)}>
                  <Icon name={d.icon} />
                </span>
                <h3 className="mt-5 font-semibold">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{d.description}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand title="Don't see your industry?" description="Our solutions adapt to many sectors. Tell us about your organisation and we'll show you what's possible." />
    </>
  );
}
