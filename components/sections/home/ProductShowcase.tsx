import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Hl, SectionHeading } from "@/components/ui/Section";
import { AppMockup } from "@/components/visuals/AppMockup";
import { Icon } from "@/lib/icons";
import { hues, type Hue } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { getProduct, productKindLabel } from "@/data/products";

const showcase: { slug: string; hue: Hue }[] = [
  { slug: "4axiz-erp", hue: "sky" },
  { slug: "pos", hue: "amber" },
  { slug: "school-management", hue: "violet" },
  { slug: "custom-business-solutions", hue: "emerald" },
];

export function ProductShowcase() {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="products-heading">
      <div className="container-site">
        <SectionHeading
          align="center"
          eyebrow="Our products"
          id="products-heading"
          title={
            <>
              Software that runs <Hl>real businesses</Hl>
            </>
          }
          description="Ready-to-deploy business software — and the engineering team to tailor it to you."
        />
        <ul className="mt-14 space-y-6">
          {showcase.map(({ slug, hue }, i) => {
            const p = getProduct(slug);
            if (!p) return null;
            const h = hues[hue];
            return (
              <li key={p.slug}>
                <article className={cn("group grid items-center gap-10 overflow-hidden rounded-3xl p-7 ring-1 sm:p-10 lg:grid-cols-2 lg:p-12", h.card, h.ring)}>
                  <div className={cn(i % 2 === 1 && "lg:order-2")}>
                    <div className="flex items-center gap-3">
                      <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl text-white shadow-sm [&_svg]:size-6", h.solid)}>
                        <Icon name={p.icon} />
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-ink-950">{p.name}</h3>
                        <p className={cn("text-xs font-semibold tracking-wide uppercase", h.text)}>{productKindLabel[p.kind]}</p>
                      </div>
                    </div>
                    <p className="mt-6 font-display text-2xl leading-snug font-semibold text-ink-900 sm:text-[1.7rem]">{p.tagline}</p>
                    <p className="mt-3 leading-relaxed text-ink-600">{p.summary}</p>
                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {p.features.slice(0, 4).map((f) => (
                        <li key={f.title} className="flex gap-2.5 text-sm text-ink-700">
                          <span className={cn("mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full text-white", h.solid)}>
                            <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                          </span>
                          {f.title}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/products/${p.slug}`}
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 shadow-sm ring-1 ring-ink-200 transition hover:bg-ink-950 hover:text-white hover:ring-ink-950"
                    >
                      Explore {p.name} <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className={cn("transition-transform duration-500 group-hover:-translate-y-1", i % 2 === 1 && "lg:order-1")}>
                    <AppMockup title={p.name} icon={p.icon} metricLabels={p.mockup.metricLabels} rows={p.mockup.rows} hue={hue} />
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
        <div className="mt-10 text-center">
          <ButtonLink href="/products" arrow>
            View all products
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
