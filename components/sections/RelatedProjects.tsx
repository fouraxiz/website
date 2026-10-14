import { ProjectCard } from "@/components/projects/ProjectCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Button";
import type { Project } from "@/types";

export function RelatedProjects({ projects, title = "Related projects", tone = "muted" }: { projects: Project[]; title?: string; tone?: "white" | "muted" }) {
  if (projects.length === 0) return null;
  return (
    <Section tone={tone} labelledBy="related-projects">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Our work" title={title} id="related-projects" />
        <TextLink href="/projects">All projects</TextLink>
      </div>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
