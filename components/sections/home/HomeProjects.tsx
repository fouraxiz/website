"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/** Featured projects with quick category tabs. */
export function HomeProjects({ projects }: { projects: Project[] }) {
  const tabs = useMemo(() => ["All", ...Array.from(new Set(projects.flatMap((p) => p.categories.slice(0, 1))))], [projects]);
  const [tab, setTab] = useState("All");
  const list = (tab === "All" ? projects : projects.filter((p) => p.categories.includes(tab))).slice(0, 6);
  return (
    <div>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap justify-center gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
              tab === t ? "bg-brand-500 text-white shadow-sm" : "bg-white text-ink-600 ring-1 ring-ink-200 hover:text-ink-900",
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
