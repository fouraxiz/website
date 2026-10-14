import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { pageMetadata } from "@/lib/metadata";
import { projectCategories, projects } from "@/data/projects";

export const metadata = pageMetadata({
  title: "Projects & Portfolio",
  description:
    "Selected 4axiz projects including 4axiz School Management, 4axiz POS, DGFP Digital Archive, DSK e-Loan, Bazarnao and Unikart.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Projects" }]}
        eyebrow="Portfolio"
        title="Projects we've designed, built and delivered."
        description="Products, platforms and custom systems across education, retail, financial services and the public sector."
      />
      <Section>
        <ProjectsExplorer projects={projects} categories={projectCategories} />
      </Section>
      <CtaBand title="Have a project in mind?" primary={{ label: "Start your project", href: "/contact" }} secondary={{ label: "Our services", href: "/services" }} />
    </>
  );
}
