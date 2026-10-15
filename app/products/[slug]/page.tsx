import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ClientsUsing } from "@/components/sections/ClientsUsing";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CheckList } from "@/components/ui/CheckList";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { AppMockup } from "@/components/visuals/AppMockup";
import { ProductCard } from "@/components/products/ProductCard";
import { pageMetadata } from "@/lib/metadata";
import { productKindLabel } from "@/data/products";
import { bySlug, getErpModules, getProducts, getProjects } from "@/lib/cms/content";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(await getProducts(), slug);
  if (!p) return {};
  return pageMetadata({ title: p.name, description: `${p.tagline} ${p.summary}`, path: `/products/${p.slug}` });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [products, erpModules, projects] = await Promise.all([getProducts(), getErpModules(), getProjects()]);
  const p = bySlug(products, slug);
  if (!p) notFound();

  const erpModule = p.erpModule ? bySlug(erpModules, p.erpModule) : undefined;
  const project = p.relatedProject ? bySlug(projects, p.relatedProject) : undefined;
  const others = products.filter((o) => o.slug !== p.slug && (o.kind === p.kind || o.category === p.category)).slice(0, 3);

  return (
    <>
      <PageHero
        edit={[{ label: "Edit this product", collection: "products", slug: p.slug }]}
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
        aside={
          p.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt={`${p.name} screenshot`} className="w-full rounded-2xl shadow-[var(--shadow-lift)] ring-1 ring-ink-200" />
          ) : (
            <AppMockup title={p.name} icon={p.icon} metricLabels={p.mockup.metricLabels} rows={p.mockup.rows} />
          )
        }
      />

      {/* At a glance */}
      <div className="container-site relative z-10 -mt-8">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink-200 shadow-[var(--shadow-lift)] ring-1 ring-ink-200 lg:grid-cols-4">
          {[
            { v: String(p.features.length), l: "Key features" },
            { v: String(p.benefits.length), l: "Business benefits" },
            { v: String(p.audience.length), l: "Types of organisation" },
            { v: productKindLabel[p.kind], l: "Product type" },
          ].map((st, i) => (
            <div key={st.l} className="bg-white p-5 sm:p-6">
              <dd className={cn("font-display text-2xl font-bold sm:text-3xl", i % 2 === 0 ? "text-brand-600" : "text-ink-800")}>{st.v}</dd>
              <dt className="mt-1 text-sm text-ink-500">{st.l}</dt>
            </div>
          ))}
        </dl>
      </div>

      <Section labelledBy="features">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="Key features" id="features" title={`What ${p.name} offers`} description={p.summary} />
            <PlaceholderNote className="mt-6">Summarised at capability level. Ask our team for the detailed feature specification.</PlaceholderNote>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {p.features.map((f, i) => (
              <li key={f.title} className="group rounded-3xl bg-ink-50 p-6 ring-1 ring-ink-100 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[var(--shadow-soft)] hover:ring-brand-200">
                <span className={cn("inline-flex size-11 items-center justify-center rounded-xl font-display text-sm font-bold text-white", i % 2 === 0 ? "bg-brand-500" : "bg-ink-700")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="dark" labelledBy="benefits">
        <SectionHeading eyebrow="Why it matters" id="benefits" title="Benefits for your organisation" inverse />
        <ul className={cn("mt-10 grid gap-4 sm:grid-cols-2", p.benefits.length >= 4 ? "lg:grid-cols-4" : p.benefits.length === 3 ? "lg:grid-cols-3" : "")}>
          {p.benefits.map((b) => (
            <li key={b} className="flex gap-3 rounded-2xl bg-white/[0.05] p-5 ring-1 ring-white/10">
              <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-500">
                <Check className="size-3.5 text-white" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="text-ink-100">{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted" labelledBy="audience">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 ring-1 ring-ink-200/70">
            <h2 id="audience" className="text-xl font-bold tracking-tight">
              Who it&apos;s for
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.audience.map((a) => (
                <li key={a}>
                  <Badge tone="brand" className="px-3 py-1 text-sm">
                    {a}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-8 ring-1 ring-ink-200/70">
            <h2 className="text-xl font-bold tracking-tight">Integrations</h2>
            {p.integrations.length > 0 ? (
              <CheckList items={p.integrations} className="mt-5" />
            ) : (
              <p className="mt-5 text-sm leading-relaxed text-ink-500">
                Integration options are scoped per deployment — SMS, email, WhatsApp, payment gateways and third-party systems. Tell us which systems you use and
                we&apos;ll confirm what&apos;s possible.
              </p>
            )}
            {p.kind === "erp-module" && <p className="mt-4 text-sm leading-relaxed text-ink-500">As part of 4axiz ERP, this module shares data with the other modules you deploy.</p>}
          </div>
        </div>
      </Section>

      <ClientsUsing kind="products" slug={p.slug} name={p.name} />

      {project && (
        <Section labelledBy="in-use" tone="muted" className="py-16 sm:py-16">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-white p-8 ring-1 ring-ink-200/70 sm:flex-row sm:items-center">
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
        <Section labelledBy="more">
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
