import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { OutcomesBand } from "@/components/sections/OutcomesBand";
import { pageMetadata } from "@/lib/metadata";
import { getProjects, getSection } from "@/lib/cms/content";

export const metadata = pageMetadata({
  title: "Projects & Portfolio",
  description:
    "4axiz projects for Handicap International, UNHCR-funded NGO Forum, UNDP, UNFPA, the National TB Control Programme, Karim Group, BazarNao and more.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const [projects, copy] = await Promise.all([getProjects(), getSection("page.projects")]);
  const projectCategories = Array.from(new Set(projects.flatMap((p) => p.categories))).sort();
  return (
    <>
      <PageHero
        edit={[{ label: "Heading", collection: "sections", slug: "page.projects" }, { label: "Projects", collection: "projects" }, { label: "Add project", collection: "projects", create: true }, { label: "Outcomes", collection: "outcomes" }]}
        decor={{ icons: ["globe", "smartphone", "shopping-cart", "graduation-cap", "landmark"], center: "rocket" }}
        crumbs={[{ label: "Projects" }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <Section>
        <ProjectsExplorer projects={projects} categories={projectCategories} />
      </Section>
      <OutcomesBand />
      <CtaBand title="Have a project in mind?" primary={{ label: "Start your project", href: "/contact" }} secondary={{ label: "Our services", href: "/services" }} />
    </>
  );
}
