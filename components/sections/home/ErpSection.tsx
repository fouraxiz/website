import { ButtonLink } from "@/components/ui/Button";
import { ErpEcosystem } from "@/components/visuals/ErpEcosystem";
import { publishedErpModules } from "@/data/erp-modules";

const points = [
  { title: "Visibility", text: "Every department works from the same live data, so leadership sees one version of the truth." },
  { title: "Efficiency", text: "Transactions flow between modules automatically — no re-keying between finance, HR, purchasing and stock." },
  { title: "Better decisions", text: "Dashboards and reports draw on every connected module, from cash position to stock levels." },
];

export function ErpSection() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28" aria-labelledby="erp-heading">
      <div className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-site relative">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-brand-300">ERP product ecosystem</p>
            <h2 id="erp-heading" className="mt-4 text-3xl leading-tight font-bold tracking-tight text-balance text-white sm:text-[2.75rem]">
              One platform. Every part of your business, connected.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-ink-400">
            4axiz ERP is a modular business management platform. Start with the modules you need today and add more as you grow — each one
            shares data with the rest.
          </p>
        </div>

        <div className="mt-14 lg:mt-10">
          <ErpEcosystem modules={publishedErpModules} />
        </div>

        <div className="mt-14 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-3">
          {points.map((p) => (
            <div key={p.title}>
              <h3 className="text-base font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <ButtonLink href="/solutions/erp" variant="inverse" arrow>
            Explore the ERP platform
          </ButtonLink>
          <ButtonLink href="/contact?interest=erp" variant="outline-inverse">
            Request a demo
          </ButtonLink>
          <p className="text-sm text-ink-500">Module availability is confirmed per engagement.</p>
        </div>
      </div>
    </section>
  );
}
