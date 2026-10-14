import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/lib/icons";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section className="bg-ink-50 py-20 sm:py-28" aria-labelledby="services-heading">
      <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.6fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Services</p>
          <h2 id="services-heading" className="mt-4 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-[2.5rem]">
            End-to-end engineering, from first workshop to long-term support.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-500">
            One accountable team covering strategy, design, development, quality and operations — so nothing gets lost between hand-offs.
          </p>
          <ButtonLink href="/services" variant="secondary" className="mt-8" arrow>
            All services
          </ButtonLink>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-ink-200 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug} className="bg-white">
              <Link href={`/services/${s.slug}`} className="group flex h-full items-start gap-4 p-5 transition-colors hover:bg-ink-50/70 sm:p-6">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white [&_svg]:size-[1.15rem]">
                  <Icon name={s.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-display text-[0.95rem] font-semibold text-ink-900">{s.title}</span>
                    <ArrowRight className="size-4 shrink-0 text-ink-300 transition group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden="true" />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-500">{s.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
