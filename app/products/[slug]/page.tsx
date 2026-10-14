import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CheckList } from "@/components/ui/CheckList";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { AppMockup } from "@/components/visuals/AppMockup";
import { ProductCard } from "@/components/products/ProductCard";
import { pageMetadata } from "@/lib/metadata";
import { getProduct, productKindLabel, products } from "@/data/products";
import { getErpModule } from "@/data/erp-modules";
import { getProject } from "@/data/projects";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return pageMetadata({ title: p.name, description: `${p.tagline} ${p.summary}`, path: `/products/${p.slug}` });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const erpModule = p.erpModule ? getErpModule(p.erpModule) : undefined;
  const project = p.relatedProject ? getProject(p.relatedProject) : undefined;
  const others = products.filter((o) => o.slug !== p.slug && (o.kind === p.kind || o.category === p.category)).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Products", href: "/products" }, { label: p.name }]}
        eyebrow={`${productKindLabel[p.kind]} · ${p.category}`}
        title={p.name}
        description={
          <>
            <span className="block font-medium text-ink-800">{p.tagline}</span>
            <span className="mt-3 block">{p.description}</span>
          </>
        }
        actions={
          <>
            <ButtonLink href={`/contact?interest=demo&product=${p.slug}`} arrow>
              {p.kind === "custom" ? "Discuss your project" : "Request a demo"}
            </ButtonLink>
            {erpModule && (
              <ButtonLink href={`/solutions/erp/${erpModule.slug}`} variant="secondary">
                Module details
              </ButtonLink>
            )}
          </>
        }
        aside={<AppMockup title={p.name} icon={p.icon} metricLabels={p.mockup.metricLabels} rows={p.mockup.rows} />}
      />

      <Section labelledBy="features">
        <SectionHeading eyebrow="Key features" id="features" title={`What ${p.name} offers`} />
        <FeatureGrid items={p.features} columns={p.features.length === 4 ? 2 : 3} className="mt-10" />
        <PlaceholderNote className="mt-6">
          Feature list summarised at capability level. Ask our team for the current, detailed feature specification.
        </PlaceholderNote>
      </Section>

      <Section tone="muted" labelledBy="benefits">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <h2 id="benefits" className="text-2xl font-bold tracking-tight">
              Benefits
            </h2>
            <CheckList items={p.benefits} className="mt-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Who it&apos;s for</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {p.audience.map((a) => (
                <li key={a}>
                  <Badge tone="brand" className="px-3 py-1 text-sm">
                    {a}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Integrations</h2>
            {p.integrations.length > 0 ? (
              <CheckList items={p.integrations} className="mt-6" />
            ) : (
              <p className="mt-6 text-sm leading-relaxed text-ink-500">
                Integration options are scoped per deployment. Tell us which systems you use and we&apos;ll confirm what&apos;s possible.
              </p>
            )}
            {p.kind === "erp-module" && (
              <p className="mt-4 text-sm leading-relaxed text-ink-500">
                As part of 4axiz ERP, this module shares data with the other modules you deploy.
              </p>
            )}
          </div>
        </div>
      </Section>

      {project && (
        <Section labelledBy="in-use" className="py-16 sm:py-16">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-ink-200 p-8 sm:flex-row sm:items-center">
            <div>
              <h2 id="in-use" className="text-xl font-semibold">
                See it in our portfolio
              </h2>
              <p className="mt-1 text-ink-500">{project.summary}</p>
            </div>
            <Link href={`/projects/${project.slug}`} className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-800">
              View project <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Section>
      )}

      {others.length > 0 && (
        <Section tone="muted" labelledBy="more">
          <SectionHeading eyebrow="Explore more" id="more" title="Related products" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <ProductCard product={o} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand
        title={`See ${p.name} in action.`}
        description="Book a demo tailored to your processes, or ask us anything about deployment, configuration and support."
        primary={{ label: "Request a demo", href: `/contact?interest=demo&product=${p.slug}` }}
        secondary={{ label: "All products", href: "/products" }}
      />
    </>
  );
}
