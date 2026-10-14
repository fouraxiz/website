import { HomeProjects } from "./HomeProjects";
import { ButtonLink } from "@/components/ui/Button";
import { CopyTitle, SectionHeading } from "@/components/ui/Section";
import { getProjects } from "@/lib/cms/content";
import type { SectionEntry } from "@/lib/cms/content";

export async function ProjectsSection({ copy }: { copy: SectionEntry }) {
  const projects = await getProjects();
  return (
    <section className="bg-ink-50 py-20 sm:py-28" aria-labelledby="projects-heading">
      <div className="container-site">
        <SectionHeading
          align="center"
          eyebrow={copy.eyebrow ?? undefined}
          id="projects-heading"
          title={<CopyTitle title={copy.title} highlight={copy.highlight} />}
          description={copy.description ?? undefined}
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
