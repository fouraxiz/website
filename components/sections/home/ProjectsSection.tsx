import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured).slice(0, 6);
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="projects-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured projects"
            id="projects-heading"
            title="Software in use across education, retail, finance and the public sector."
          />
          <ButtonLink href="/projects" variant="secondary" arrow>
            Explore all projects
          </ButtonLink>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
