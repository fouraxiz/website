import Image from "next/image";
import { Check, Phone } from "lucide-react";
import { AboutTabs } from "./AboutTabs";
import { ButtonLink } from "@/components/ui/Button";
import { CopyTitle } from "@/components/ui/Section";
import { getOffices, getSettings, getStats, getTechnologies, getValues } from "@/lib/cms/content";
import type { SectionEntry } from "@/lib/cms/content";
import { TechIcon } from "@/components/ui/TechIcon";

export async function AboutSection({ copy }: { copy: SectionEntry }) {
  const [site, technologies, companyValues, offices, stats] = await Promise.all([getSettings(), getTechnologies(), getValues(), getOffices(), getStats()]);
  const { mission, vision } = site;
  const years = site.foundedYear ? new Date().getFullYear() - site.foundedYear : null;
  return (
    <section className="bg-white pt-24 pb-20 sm:pt-28 sm:pb-28" aria-labelledby="about-heading">
      <div className="container-site grid items-center gap-16 lg:grid-cols-2">
        {/* Visual collage */}
        <div className="relative mx-auto w-full max-w-xl lg:mx-0">
          <div className="grid grid-cols-[1.4fr_1fr] gap-4">
            <div className="relative row-span-2 overflow-hidden rounded-3xl bg-gradient-to-br from-ink-800 to-ink-950">
              <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
              <div className="absolute -top-10 -left-10 size-48 rounded-full bg-accent-500/40 blur-3xl" aria-hidden="true" />
              <div className="relative flex aspect-[3/4] flex-col justify-between gap-5 p-6 pb-12">
                {site.basisMembership && (
                  <div className="flex items-center gap-3 self-start rounded-2xl bg-white p-3">
                    <Image src="/images/brand/basis.webp" alt="BASIS" width={96} height={32} className="h-5 w-auto sm:h-7" unoptimized />
                    <span className="text-[0.62rem] leading-tight font-medium text-ink-600 sm:text-[0.68rem]">
                      Member
                      <br />
                      {site.basisMembership}
                    </span>
                  </div>
                )}
                <ul className="space-y-5">
                  {stats.slice(1, 4).map((st, i) => (
                    <li key={st._id} className={i === 2 ? "hidden sm:block" : undefined}>
                      <p className="font-display text-3xl font-bold text-white">{st.value}</p>
                      <p className="mt-0.5 text-xs leading-snug text-ink-300">{st.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col justify-center rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100">
              {years !== null && (
                <>
                  <p className="font-display text-5xl font-bold text-brand-600">{years}+</p>
                  <p className="mt-1 text-sm font-medium text-ink-700">Years of experience</p>
                  <p className="mt-0.5 text-xs text-ink-500">Since {site.foundedYear}</p>
                </>
              )}
            </div>
            <div className="rounded-3xl bg-violet-50 p-5 ring-1 ring-violet-100">
              <p className="text-xs font-semibold text-violet-700">Technologies</p>
              <ul className="mt-3 grid grid-cols-4 gap-2.5">
                {technologies.slice(0, 8).map((t) => (
                  <li key={t.name} title={t.name} className="flex aspect-square items-center justify-center rounded-xl bg-white shadow-sm">
                    <TechIcon tech={t} className="size-5" />
                    <span className="sr-only">{t.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[var(--shadow-lift)] ring-1 ring-ink-100 sm:left-10">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="size-5" strokeWidth={3} aria-hidden="true" />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-semibold text-ink-900">Local &amp; global clients</span>
              <span className="text-ink-500">{offices.map((o) => o.country).join(" · ")}</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="eyebrow">
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h2 id="about-heading" className="mt-4 text-3xl leading-tight font-bold tracking-tight sm:text-[2.6rem]">
            <CopyTitle title={copy.title} highlight={copy.highlight} />
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-600">
            {site.legalName} designs, develops and implements secure, scalable digital solutions for government organisations, international
            development partners, NGOs, INGOs and corporate enterprises{site.foundedYear ? ` — since ${site.foundedYear}` : ""}. Enterprise
            software, ERP, MIS and mobile platforms that improve efficiency, transparency and decision-making.
          </p>
          <div className="mt-8">
            <AboutTabs
              tabs={[
                { label: "Our Mission", content: <p className="leading-relaxed text-ink-600">{mission}</p> },
                { label: "Our Vision", content: <p className="leading-relaxed text-ink-600">{vision}</p> },
                {
                  label: "Our Values",
                  content: (
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {companyValues.map((v) => (
                        <li key={v.title} className="flex gap-2.5 text-sm text-ink-700">
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" strokeWidth={3} aria-hidden="true" />
                          {v.title}
                        </li>
                      ))}
                    </ul>
                  ),
                },
              ]}
            />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <ButtonLink href="/about" arrow>
              More about us
            </ButtonLink>
            {site.phone && (
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="group flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100 group-hover:bg-brand-500 group-hover:text-white">
                  <Phone className="size-4" aria-hidden="true" />
                </span>
                <span className="leading-tight">
                  <span className="block text-xs text-ink-500">Call us anytime</span>
                  <span className="block font-semibold text-ink-900">{site.phone}</span>
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
