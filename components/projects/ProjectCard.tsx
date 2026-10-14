import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectCover } from "./ProjectCover";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/types";

export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-white transition-shadow hover:shadow-[var(--shadow-lift)]">
      <ProjectCover project={project} className="transition-transform duration-500 group-hover:scale-[1.015]" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-1.5">
          {project.categories.slice(0, 3).map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
        </div>
        <H className="mt-4 text-lg font-semibold">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.name}
          </Link>
        </H>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{project.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
          View project <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
