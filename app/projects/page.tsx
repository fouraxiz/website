import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { pageMetadata } from "@/lib/metadata";
import { getProjects, getSection } from "@/lib/cms/content";

export const metadata = pageMetadata({
  title: "Projects & Portfolio",
  description:
    "Selected 4axiz projects including 4axiz School Management, 4axiz POS, DGFP Digital Archive, DSK e-Loan, Bazarnao and Unikart.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const [projects, copy] = await Promise.all([getProjects(), getSection("page.projects")]);
  const projectCategories = Array.from(new Set(projects.flatMap((p) => p.categories))).sort();
  return (
    <>
      <PageHero
        decor={{ icons: ["globe", "smartphone", "shopping-cart", "graduation-cap", "landmark"], center: "rocket" }}
        crumbs={[{ label: "Projects" }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <Section>
        <ProjectsExplorer projects={projects} categories={projectCategories} />
      </Section>
      <CtaBand title="Have a project in mind?" primary={{ label: "Start your project", href: "/contact" }} secondary={{ label: "Our services", href: "/services" }} />
    </>
  );
}
