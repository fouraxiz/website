import { CopyTitle, SectionHeading } from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";
import { ButtonLink } from "@/components/ui/Button";
import { getSection, getTechnologies } from "@/lib/cms/content";
import type { SectionEntry } from "@/lib/cms/content";

export async function TechSection({ copy: given }: { copy?: SectionEntry }) {
  const [technologies, fallback] = await Promise.all([getTechnologies(), getSection("home.tech")]);
  const copy = given ?? fallback;
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="tech-heading">
      <div className="container-site">
        <SectionHeading
          align="center"
          eyebrow={copy.eyebrow ?? undefined}
          id="tech-heading"
          title={<CopyTitle title={copy.title} highlight={copy.highlight} />}
          description={copy.description ?? undefined}
        />
        <ul className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-4">
          {technologies.slice(0, 24).map((t) => (
            <li
              key={t.name}
              className="group flex w-[calc(33.333%-0.7rem)] flex-col items-center gap-3 rounded-2xl bg-ink-50 p-5 sm:w-36 ring-1 ring-ink-100 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[var(--shadow-soft)]"
            >
              <TechIcon tech={t} className="size-9 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-center text-xs font-semibold text-ink-700">{t.name}</span>
            </li>
          ))}
        </ul>
        {technologies.length > 24 && (
          <div className="mt-10 text-center">
            <ButtonLink href="/technologies" variant="secondary" arrow>
              All {technologies.length} technologies
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
