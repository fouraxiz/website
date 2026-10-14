import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/IconTile";
import { productKindLabel } from "@/data/products";
import type { Hue } from "@/lib/palette";
import type { Product, ProductKind } from "@/types";

const hueByKind: Record<ProductKind, Hue> = { platform: "sky", standalone: "amber", "erp-module": "violet", custom: "emerald" };

export function ProductCard({ product, headingLevel = "h2" }: { product: Product; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 transition-[border-color,box-shadow] hover:border-brand-200 hover:shadow-[var(--shadow-soft)]">
      <div className="flex items-start justify-between gap-4">
        <IconTile name={product.icon} hue={hueByKind[product.kind]} />
        <Badge tone={product.kind === "platform" ? "brand" : product.kind === "erp-module" ? "accent" : "neutral"}>
          {productKindLabel[product.kind]}
        </Badge>
      </div>
      <H className="mt-5 text-lg font-semibold">
        <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0">
          {product.name}
        </Link>
      </H>
      <p className="mt-1 text-sm font-medium text-ink-500">{product.category}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">{product.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
        Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </article>
  );
}
