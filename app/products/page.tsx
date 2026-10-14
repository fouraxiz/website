import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ProductsExplorer } from "@/components/products/ProductsExplorer";
import { pageMetadata } from "@/lib/metadata";
import { productKindDescription, productKindLabel, products } from "@/data/products";
import type { ProductKind } from "@/types";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "4axiz business software: the 4axiz ERP platform, 4axiz POS, 4axiz School Management, ERP modules for HRM, accounting, procurement and inventory, and custom solutions.",
  path: "/products",
});

const kinds: ProductKind[] = ["platform", "standalone", "erp-module", "custom"];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        decor={{ icons: ["calculator", "users", "scan-barcode", "package", "graduation-cap"], center: "boxes" }}
        crumbs={[{ label: "Products" }]}
        eyebrow="Products"
        title="Business software built to run real operations."
        description="From the connected 4axiz ERP platform to focused products for retail and education — plus custom solutions when your process needs something of its own."
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
      <CtaBand
        title="Not sure which product fits?"
        description="Tell us about your organisation and the problem you're solving. We'll recommend the right starting point — product, module or custom build."
        primary={{ label: "Book a consultation", href: "/contact?interest=demo" }}
        secondary={{ label: "View services", href: "/services" }}
      />
    </>
  );
}
