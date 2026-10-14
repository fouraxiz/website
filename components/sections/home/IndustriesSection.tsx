import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Button";
import { Icon } from "@/lib/icons";
import { industries } from "@/data/industries";

export function IndustriesSection() {
  return (
    <section className="border-t border-ink-100 bg-white py-20 sm:py-28" aria-labelledby="industries-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Industries"
            id="industries-heading"
            title="Built for the way your sector works."
            description="Each industry has its own pressures. We bring solutions shaped around them."
          />
          <TextLink href="/industries">All industries</TextLink>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-ink-200 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((i) => (
            <li key={i.slug} className="bg-white">
              <Link href={`/industries/${i.slug}`} className="group flex h-full flex-col p-6 transition-colors hover:bg-ink-50">
                <div className="flex items-center justify-between">
                  <Icon name={i.icon} className="size-5 text-brand-600" />
                  <ArrowUpRight className="size-4 text-ink-300 transition group-hover:text-brand-600" aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-base font-semibold">{i.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{i.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
