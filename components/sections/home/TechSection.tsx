import { Hl, SectionHeading } from "@/components/ui/Section";
import { TechLogo } from "@/components/ui/TechLogo";
import { technologies } from "@/data/site";

export function TechSection() {
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="tech-heading">
      <div className="container-site">
        <SectionHeading
          align="center"
          eyebrow="Technology"
          id="tech-heading"
          title={
            <>
              Technologies <Hl>we work with</Hl>
            </>
          }
          description="Modern frameworks for new builds — and deep experience with the platforms many businesses already run on."
        />
        <ul className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-4">
          {technologies.map((t) => (
            <li
              key={t.name}
              className="group flex w-[calc(33.333%-0.7rem)] flex-col items-center gap-3 rounded-2xl bg-ink-50 p-5 sm:w-36 ring-1 ring-ink-100 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[var(--shadow-soft)]"
            >
              <TechLogo icon={t.icon} className="size-9 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-center text-xs font-semibold text-ink-700">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
