import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { productKindLabel } from "@/data/products";
import type { Product } from "@/types";

export function ProductCard({ product, headingLevel = "h2" }: { product: Product; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const dark = product.kind === "platform";
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:ring-brand-200">
      <div className={cn("relative flex h-32 items-end justify-between overflow-hidden p-5", dark ? "bg-gradient-to-br from-brand-500 to-brand-700" : "bg-gradient-to-br from-ink-700 to-ink-900")}>
        <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <Icon name={product.icon} className="pointer-events-none absolute -top-4 -right-4 size-28 text-white/10 transition duration-500 group-hover:scale-110 group-hover:rotate-6" strokeWidth={1.25} />
        <span className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm [&_svg]:size-6">
          <Icon name={product.icon} />
        </span>
        <Badge tone="neutral" className="relative bg-white/90">
          {productKindLabel[product.kind]}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <H className="text-lg font-semibold">
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </H>
        <p className="mt-1 text-xs font-semibold tracking-[0.1em] text-brand-600 uppercase">{product.category}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">{product.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
          Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
