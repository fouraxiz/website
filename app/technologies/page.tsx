import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";
import { Icon } from "@/lib/icons";
import { hues, hueAt } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/metadata";
import { techCategories } from "@/data/site";
import { getHowWeWork, getSection, getTechnologies } from "@/lib/cms/content";

export const metadata = pageMetadata({
  title: "Technologies",
  description:
    "The technology stack 4axiz works in every day — backend, frontend, mobile, databases, cloud and DevOps, CMS and commerce, data and AI — and how we choose it.",
  path: "/technologies",
});

export default async function TechnologiesPage() {
  const [technologies, items, copy] = await Promise.all([getTechnologies(), getHowWeWork(), getSection("page.technologies")]);
  const choice = items.filter((i) => i.group === "tech-choice");
  const known = new Set<string>(techCategories);
  const groups = [
    ...techCategories.map((c) => ({ name: c, list: technologies.filter((t) => t.category === c) })),
    { name: "Other", list: technologies.filter((t) => !known.has(t.category)) },
  ].filter((g) => g.list.length > 0);

  return (
    <>
      <PageHero
        edit={[
          { label: "Heading", collection: "sections", slug: "page.technologies" },
          { label: "Technologies", collection: "technologies" },
          { label: "How we choose", collection: "how_we_work" },
        ]}
        decor={{ icons: ["code", "database", "cloud", "smartphone", "brain"], center: "layers" }}
        crumbs={[{ label: "Company", href: "/about" }, { label: "Technologies" }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <Section labelledBy="stack">
        <h2 id="stack" className="sr-only">
          Technology stack
        </h2>
        <div className="space-y-12">
          {groups.map((g, gi) => (
            <div key={g.name} className="grid gap-6 border-t border-ink-200 pt-8 lg:grid-cols-[14rem_1fr]">
              <h3 className="flex items-center gap-3 text-lg font-semibold">
                <span className={cn("h-6 w-1.5 rounded-full", hues[hueAt(gi)].solid)} aria-hidden="true" />
                {g.name}
              </h3>
              <ul className="flex flex-wrap gap-3">
                {g.list.map((t) => (
                  <li key={t._id} className="flex items-center gap-3 rounded-2xl bg-ink-50 px-4 py-3 ring-1 ring-ink-100">
                    <TechIcon tech={t} className="size-7" />
                    <span className="text-sm font-semibold text-ink-800">{t.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {choice.length > 0 && (
        <Section tone="muted" labelledBy="choose">
          <SectionHeading
            eyebrow="How we choose"
            id="choose"
            title="We choose technology on fit, not fashion."
            description="These are the platforms our teams work in every day, across backend, frontend, mobile, cloud and commerce."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {choice.map((c, i) => (
              <li key={c._id} className="rounded-3xl bg-white p-7 ring-1 ring-ink-200/70">
                <span className={cn("inline-flex size-11 items-center justify-center rounded-xl text-white [&_svg]:size-5", hues[hueAt(i + 1)].solid)}>
                  <Icon name={c.icon} />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.description}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
