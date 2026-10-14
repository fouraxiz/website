"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";
import type { Product, ProductKind } from "@/types";

const kinds: { value: ProductKind | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "platform", label: "Platform" },
  { value: "standalone", label: "Products" },
  { value: "erp-module", label: "ERP modules" },
  { value: "custom", label: "Custom solutions" },
];

export function ProductsExplorer({ products }: { products: Product[] }) {
  const [kind, setKind] = useState<ProductKind | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (kind === "all" || p.kind === kind) &&
        (!q || [p.name, p.category, p.summary, p.tagline].join(" ").toLowerCase().includes(q)),
    );
  }, [products, kind, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-1.5">
          {kinds.map((k) => (
            <button
              key={k.value}
              type="button"
              aria-pressed={kind === k.value}
              onClick={() => setKind(k.value)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                kind === k.value ? "bg-ink-900 text-white" : "bg-white text-ink-600 ring-1 ring-ink-200 ring-inset hover:bg-ink-100",
              )}
            >
              {k.label}
            </button>
          ))}
        </div>
        <label className="relative lg:w-72">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products and modules"
            className="h-10 w-full rounded-lg border border-ink-200 bg-white pr-3 pl-9 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none"
          />
        </label>
      </div>
      <p className="sr-only" aria-live="polite">
        {filtered.length} results
      </p>
      {filtered.length === 0 ? (
        <div className="mt-8 rounded-[var(--radius-card)] border border-dashed border-ink-300 bg-white px-6 py-14 text-center">
          <p className="font-display text-lg font-semibold text-ink-900">Nothing matches that search</p>
          <p className="mt-2 text-sm text-ink-500">Try another term, or tell us what you need — we may already have built it.</p>
          <button
            type="button"
            onClick={() => {
              setKind("all");
              setQuery("");
            }}
            className="mt-5 rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            Show all products
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
