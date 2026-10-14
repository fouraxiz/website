import { HomeProjects } from "./HomeProjects";
import { ButtonLink } from "@/components/ui/Button";
import { Hl, SectionHeading } from "@/components/ui/Section";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section className="bg-ink-50 py-20 sm:py-28" aria-labelledby="projects-heading">
      <div className="container-site">
        <SectionHeading
          align="center"
          eyebrow="Portfolio"
          id="projects-heading"
          title={
            <>
              Featured <Hl>Projects</Hl>
            </>
          }
          description="Products, platforms and custom systems we've designed and delivered."
        />
        <div className="mt-10">
          <HomeProjects projects={projects} />
        </div>
        <div className="mt-12 text-center">
          <ButtonLink href="/projects" variant="secondary" arrow>
            Explore all projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
