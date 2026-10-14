import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/lib/icons";
import { hues, hueAt } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { ProductsExplorer } from "@/components/products/ProductsExplorer";
import { pageMetadata } from "@/lib/metadata";
import { productKindDescription, productKindLabel } from "@/data/products";
import { getProducts, getReadyProducts, getSection } from "@/lib/cms/content";
import type { ProductKind } from "@/types";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "4axiz business software: the 4axiz ERP platform, ERP modules and 16 ready-to-deploy products — HR & payroll, POS, school, hospital, restaurant, garments ERP, smart hostel management and more.",
  path: "/products",
});

const kinds: ProductKind[] = ["platform", "standalone", "erp-module", "custom"];

export default async function ProductsPage() {
  const [products, copy, ready] = await Promise.all([getProducts(), getSection("page.products"), getReadyProducts()]);
  return (
    <>
      <PageHero
        edit={[
          { label: "Heading", collection: "sections", slug: "page.products" },
          { label: "Products", collection: "products" },
          { label: "Add product", collection: "products", create: true },
          { label: "Ready software", collection: "ready_products" },
        ]}
        decor={{ icons: ["calculator", "users", "scan-barcode", "package", "graduation-cap"], center: "boxes" }}
        crumbs={[{ label: "Products" }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        actions={
          <>
            <ButtonLink href="/contact?interest=demo" arrow>
              Request a demo
            </ButtonLink>
            <ButtonLink href="/solutions/erp" variant="secondary">
              ERP ecosystem
            </ButtonLink>
          </>
        }
      >
        <dl className="mt-10 grid gap-4 sm:grid-cols-2">
          {kinds.map((k) => (
            <div key={k} className="border-l-2 border-brand-200 pl-4">
              <dt className="text-sm font-semibold text-ink-900">{productKindLabel[k]}</dt>
              <dd className="mt-0.5 text-sm text-ink-500">{productKindDescription[k]}</dd>
            </div>
          ))}
        </dl>
      </PageHero>
      <Section tone="muted">
        <ProductsExplorer products={products} />
      </Section>
      {ready.length > 0 && (
        <Section labelledBy="ready-heading">
          <SectionHeading
            eyebrow="Ready software"
            id="ready-heading"
            title="Products you can adopt today."
            description="Alongside bespoke engineering we license and deploy proven products — configured to your process, hosted where you need them and supported under SLA."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ready.map((r, i) => {
              const inner = (
                <>
                  <span className={cn("inline-flex size-11 shrink-0 items-center justify-center rounded-xl text-white [&_svg]:size-5", hues[hueAt(i)].solid)}>
                    <Icon name={r.icon} />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 font-semibold text-ink-900">
                      {r.name}
                      {r.href && <ArrowUpRight className="size-3.5 text-ink-400 transition group-hover:text-brand-600" aria-hidden="true" />}
                    </span>
                    {r.summary && <span className="mt-1 block text-xs leading-relaxed text-ink-500">{r.summary}</span>}
                  </span>
                </>
              );
              const cls = "group flex h-full items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink-200/80 transition";
              return (
                <li key={r._id}>
                  {r.href ? (
                    <Link href={r.href} className={cn(cls, "hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] hover:ring-brand-200")}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-8 rounded-2xl bg-ink-50 p-5 text-sm text-ink-600 ring-1 ring-ink-100">
            <span className="font-semibold text-ink-900">Licensing options:</span> one-off licence, annual subscription or fully managed SaaS — with
            configuration, data migration and training included.
          </p>
        </Section>
      )}
      <CtaBand
        title="Not sure which product fits?"
        description="Tell us about your organisation and the problem you're solving. We'll recommend the right starting point — product, module or custom build."
        primary={{ label: "Book a consultation", href: "/contact?interest=demo" }}
        secondary={{ label: "View services", href: "/services" }}
      />
    </>
  );
}
