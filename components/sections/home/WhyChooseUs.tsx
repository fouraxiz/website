import { Code2, Globe2, Headphones, Landmark, Layers, ShieldCheck } from "lucide-react";
import { CopyTitle } from "@/components/ui/Section";
import { getSettings } from "@/lib/cms/content";
import type { SectionEntry } from "@/lib/cms/content";

export async function WhyChooseUs({ copy }: { copy: SectionEntry }) {
  const site = await getSettings();
  const years = site.foundedYear ? new Date().getFullYear() - site.foundedYear : null;
  return (
    <section className="bg-ink-50 py-20 sm:py-28" aria-labelledby="why-heading">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow">
              <span className="h-px w-6 bg-current" aria-hidden="true" />
              {copy.eyebrow}
            </p>
            <h2 id="why-heading" className="mt-4 text-3xl leading-tight font-bold tracking-tight sm:text-[2.6rem]">
              <CopyTitle title={copy.title} highlight={copy.highlight} />
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-ink-600">
            {copy.description}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <article className="relative overflow-hidden rounded-3xl bg-ink-950 p-8 md:row-span-2">
            <div className="absolute -right-16 -bottom-16 size-64 rounded-full bg-brand-500/25 blur-3xl" aria-hidden="true" />
            <Code2 className="relative size-7 text-brand-400" aria-hidden="true" />
            <h3 className="relative mt-6 text-2xl font-semibold text-white">
              {years !== null ? `${years}+ years of engineering` : "Proven engineering"}
            </h3>
            <p className="relative mt-3 leading-relaxed text-ink-300">
              A long, unbroken record of complex deliveries for demanding institutions{site.foundedYear ? ` since ${site.foundedYear}` : ""} — across
              Java, .NET, PHP, Laravel, React, Flutter and Python.
            </p>
            <pre className="relative mt-8 overflow-hidden rounded-2xl bg-white/[0.05] p-4 font-mono text-[0.72rem] leading-relaxed text-ink-400 ring-1 ring-white/10" aria-hidden="true">
              <span className="text-brand-300">const</span> partner = {"{"}
              {"\n"}  quality: <span className="text-ink-200">&quot;reviewed&quot;</span>,
              {"\n"}  delivery: <span className="text-ink-200">&quot;on time&quot;</span>,
              {"\n"}  support: <span className="text-brand-300">&quot;24/7&quot;</span>,
              {"\n"}{"}"};
            </pre>
          </article>

          <article className="rounded-3xl bg-white p-8 ring-1 ring-ink-200/70 md:col-span-2">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-500 text-white">
              <Layers className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold">16 ready products + custom engineering</h3>
            <p className="mt-3 max-w-lg leading-relaxed text-ink-500">
              Start from ready software — ERP, HR &amp; payroll, POS, school, hospital or smart hostel management — or build something entirely new on
              proven foundations.
            </p>
          </article>

          <article className="rounded-3xl bg-white p-8 ring-1 ring-ink-200/70">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Headphones className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-lg font-semibold">24/7 support coverage</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">SLA-backed support — critical issues answered within one hour.</p>
          </article>

          <article className="rounded-3xl bg-white p-8 ring-1 ring-ink-200/70">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Globe2 className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-lg font-semibold">Local &amp; global presence</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">Engineering hubs in Dhaka and Auckland and a US presence, serving programmes in 180+ countries.</p>
          </article>

          <article className="rounded-3xl bg-white p-8 ring-1 ring-ink-200/70">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Landmark className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-lg font-semibold">Trusted by the UN &amp; government</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">Software relied on daily by agencies that audit everything.</p>
          </article>

          <article className="relative overflow-hidden rounded-3xl bg-ink-900 p-8 text-white md:col-span-2">
            <div className="absolute -top-10 -right-10 size-48 rounded-full bg-brand-500/20 blur-2xl" aria-hidden="true" />
            <ShieldCheck className="relative size-7 text-brand-400" aria-hidden="true" />
            <h3 className="relative mt-6 text-2xl font-semibold text-white">Built to be secure and reliable</h3>
            <p className="relative mt-3 max-w-lg leading-relaxed text-ink-300">
              Donor-grade security, role-based access, encrypted transmission and audit-ready architecture — designed in from day one.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
