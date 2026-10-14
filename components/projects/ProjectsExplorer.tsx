"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

const PAGE_SIZE = 9;

export function ProjectsExplorer({ projects, categories, initialQuery = "" }: { projects: Project[]; categories: string[]; initialQuery?: string }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<"featured" | "az">("featured");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = projects.filter(
      (p) =>
        (category === "All" || p.categories.includes(category)) &&
        (!q || [p.name, p.summary, p.industry, p.client ?? "", ...p.categories, ...p.technologies, ...p.deliveryTags].join(" ").toLowerCase().includes(q)),
    );
    return sort === "az"
      ? [...list].sort((a, b) => a.name.localeCompare(b.name))
      : [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [projects, category, query, sort]);

  const reset = () => {
    setCategory("All");
    setQuery("");
    setVisible(PAGE_SIZE);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-ink-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="-mx-1 flex flex-wrap gap-1.5">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => {
                setCategory(c);
                setVisible(PAGE_SIZE);
              }}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                category === c ? "bg-ink-900 text-white" : "bg-ink-50 text-ink-600 ring-1 ring-ink-200 ring-inset hover:bg-ink-100",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <label className="relative flex-1 lg:w-64">
            <span className="sr-only">Search projects</span>
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              placeholder="Search projects"
              className="h-10 w-full rounded-lg border border-ink-200 bg-white pr-3 pl-9 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none"
            />
          </label>
          <label>
            <span className="sr-only">Sort projects</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "featured" | "az")}
              className="h-10 rounded-lg border border-ink-200 bg-white px-3 text-sm text-ink-700 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none"
            >
              <option value="featured">Featured first</option>
              <option value="az">Name A–Z</option>
            </select>
          </label>
        </div>
      </div>

      <p className="mt-5 text-sm text-ink-500" aria-live="polite">
        Showing {Math.min(visible, filtered.length)} of {filtered.length} project{filtered.length === 1 ? "" : "s"}
        {category !== "All" && ` in ${category}`}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-[var(--radius-card)] border border-dashed border-ink-300 px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold text-ink-900">No projects match your filters</p>
          <p className="mt-2 text-sm text-ink-500">Try a different category or search term.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            <X className="size-4" aria-hidden="true" /> Clear filters
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, visible).map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} headingLevel="h2" />
            </li>
          ))}
        </ul>
      )}

      {visible < filtered.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex h-11 items-center rounded-lg bg-white px-5 text-sm font-semibold text-ink-900 ring-1 ring-ink-200 ring-inset hover:bg-ink-50"
          >
            Load more projects
          </button>
        </div>
      )}
    </div>
  );
}
