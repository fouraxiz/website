import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { IconTile } from "@/components/ui/IconTile";
import { pageMetadata } from "@/lib/metadata";
import { industries } from "@/data/industries";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "Software solutions from 4axiz for healthcare, education, retail and e-commerce, NGOs, financial services, manufacturing, logistics and professional services.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries" }]}
        eyebrow="Industries"
        title="Solutions shaped around your sector."
        description="Every industry has its own regulations, workflows and pressures. We bring solutions designed for them — and the flexibility to fit your organisation."
      />
      <Section>
        <ul className="grid gap-5 md:grid-cols-2">
          {industries.map((i) => (
            <li key={i.slug}>
              <article className="group relative flex h-full gap-5 rounded-[var(--radius-card)] border border-ink-200 bg-white p-7 transition-[border-color,box-shadow] hover:border-brand-200 hover:shadow-[var(--shadow-soft)]">
                <IconTile name={i.icon} size="lg" />
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
      <CtaBand title="Don't see your industry?" description="Our solutions adapt to many sectors. Tell us about your organisation and we'll show you what's possible." />
    </>
  );
}
