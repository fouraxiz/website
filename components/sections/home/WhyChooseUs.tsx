import { Code2, Globe2, Headphones, Layers, RefreshCw, ShieldCheck } from "lucide-react";
import { Hl } from "@/components/ui/Section";
import { site } from "@/data/site";

export function WhyChooseUs() {
  const years = site.foundedYear ? new Date().getFullYear() - site.foundedYear : null;
  return (
    <section className="bg-ink-50 py-20 sm:py-28" aria-labelledby="why-heading">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow">
              <span className="h-px w-6 bg-current" aria-hidden="true" />
              Why 4axiz
            </p>
            <h2 id="why-heading" className="mt-4 text-3xl leading-tight font-bold tracking-tight sm:text-[2.6rem]">
              What makes us <Hl>different</Hl>
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-ink-600">
            We combine our own proven products with custom engineering — so you get software that fits, delivered by a team that stays with
            you long after launch.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <article className="relative overflow-hidden rounded-3xl bg-ink-950 p-8 md:row-span-2">
            <div className="absolute -right-16 -bottom-16 size-64 rounded-full bg-accent-500/40 blur-3xl" aria-hidden="true" />
            <Code2 className="relative size-7 text-accent-300" aria-hidden="true" />
            <h3 className="relative mt-6 text-2xl font-semibold text-white">
              {years !== null ? `${years}+ years of engineering` : "Proven engineering"}
            </h3>
            <p className="relative mt-3 leading-relaxed text-ink-300">
              Building software for local and global clients{site.foundedYear ? ` since ${site.foundedYear}` : ""} — across .NET, PHP, Laravel,
              React, Vue, Flutter and WordPress.
            </p>
            <pre className="relative mt-8 overflow-hidden rounded-2xl bg-white/[0.05] p-4 font-mono text-[0.72rem] leading-relaxed text-ink-400 ring-1 ring-white/10" aria-hidden="true">
              <span className="text-accent-300">const</span> partner = {"{"}
              {"\n"}  quality: <span className="text-emerald-300">&quot;reviewed&quot;</span>,
              {"\n"}  delivery: <span className="text-emerald-300">&quot;on time&quot;</span>,
              {"\n"}  support: <span className="text-amber-300">&quot;24/7&quot;</span>,
              {"\n"}{"}"};
            </pre>
          </article>

          <article className="rounded-3xl bg-gradient-to-br from-sky-400 to-indigo-500 p-8 text-white md:col-span-2">
            <Layers className="size-7" aria-hidden="true" />
            <h3 className="mt-6 text-2xl font-semibold">Products + custom engineering</h3>
            <p className="mt-3 max-w-lg leading-relaxed text-sky-50">
              Start from 4axiz ERP, POS or School Management and tailor them — or build something entirely new on proven foundations.
            </p>
          </article>

          <article className="rounded-3xl bg-white p-8 ring-1 ring-ink-200/70">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Headphones className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-lg font-semibold">24/7 hotline support</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">A real person to call when your business software needs attention.</p>
          </article>

          <article className="rounded-3xl bg-white p-8 ring-1 ring-ink-200/70">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Globe2 className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-lg font-semibold">Local &amp; global presence</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">Teams in Bangladesh, New Zealand and Kosovo, working across time zones.</p>
          </article>

          <article className="rounded-3xl bg-white p-8 ring-1 ring-ink-200/70">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <RefreshCw className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-lg font-semibold">Maintenance &amp; updates</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">We keep systems secure, patched and improving after launch.</p>
          </article>

          <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-500 p-8 text-white md:col-span-2">
            <div className="absolute -top-10 -right-10 size-48 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
            <ShieldCheck className="relative size-7" aria-hidden="true" />
            <h3 className="relative mt-6 text-2xl font-semibold">Built to be secure and reliable</h3>
            <p className="relative mt-3 max-w-lg leading-relaxed text-violet-50">
              Role-based access, audit trails, tested releases and monitored deployments — quality is part of every sprint.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
