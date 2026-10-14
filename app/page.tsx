import { EyeOff, Plus } from "lucide-react";
import { HeroSlider } from "@/components/sections/home/HeroSlider";
import { HeroTrust } from "@/components/sections/home/HeroTrust";
import { StatsStrip } from "@/components/sections/home/StatsStrip";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { ServicesGrid } from "@/components/sections/home/ServicesGrid";
import { ProductShowcase } from "@/components/sections/home/ProductShowcase";
import { AiSection } from "@/components/sections/home/AiSection";
import { WhyChooseUs } from "@/components/sections/home/WhyChooseUs";
import { ProjectsSection } from "@/components/sections/home/ProjectsSection";
import { IndustriesSection } from "@/components/sections/home/IndustriesSection";
import { ClientsSection } from "@/components/sections/home/ClientsSection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { TechSection } from "@/components/sections/home/TechSection";
import { BlogSection } from "@/components/sections/home/BlogSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { PresenceSection } from "@/components/sections/home/PresenceSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { Edit } from "@/components/cms/Edit";
import type { EditAction } from "@/components/cms/Editable";
import { getClients, getPosts, getSections, getSlides, getTestimonials, type SectionEntry } from "@/lib/cms/content";
import { getSession } from "@/lib/auth/session";

type SectionComponent = (props: { copy: SectionEntry }) => Promise<React.ReactNode> | React.ReactNode;

/** Homepage sections by key. Order and visibility come from the "sections" collection. */
const registry: Record<string, { Component: SectionComponent; name: string; extra?: EditAction[] }> = {
  "home.about": {
    Component: AboutSection,
    name: "About",
    extra: [
      { label: "Mission & vision", collection: "settings", slug: "site" },
      { label: "Values", collection: "values" },
      { label: "Technologies", collection: "technologies" },
    ],
  },
  "home.services": { Component: ServicesGrid, name: "Services", extra: [{ label: "Services", collection: "services" }] },
  "home.products": { Component: ProductShowcase, name: "Products", extra: [{ label: "Products", collection: "products" }] },
  "home.ai": { Component: AiSection, name: "AI", extra: [{ label: "AI capabilities", collection: "solutions", slug: "ai" }] },
  "home.why": { Component: WhyChooseUs, name: "Why choose us" },
  "home.industries": { Component: IndustriesSection, name: "Industries", extra: [{ label: "Industries", collection: "industries" }] },
  "home.projects": { Component: ProjectsSection, name: "Projects", extra: [{ label: "Projects", collection: "projects" }] },
  "home.clients": { Component: ClientsSection, name: "Client logos", extra: [{ label: "Client logos", collection: "clients" }] },
  "home.tech": { Component: TechSection, name: "Technologies", extra: [{ label: "Technologies", collection: "technologies" }] },
  "home.process": { Component: ProcessSection, name: "Process", extra: [{ label: "Steps", collection: "process" }] },
  "home.blog": { Component: BlogSection, name: "Blog", extra: [{ label: "New post", collection: "posts", create: true }] },
  "home.testimonials": { Component: TestimonialsSection, name: "Testimonials", extra: [{ label: "Testimonials", collection: "testimonials" }] },
  "home.presence": { Component: PresenceSection, name: "Offices", extra: [{ label: "Offices", collection: "offices" }] },
  "home.cta": {
    Component: ({ copy }) => <CtaBand title={copy.title ?? undefined} description={copy.description ?? undefined} />,
    name: "Call to action",
  },
};

/** Collections whose homepage section renders nothing while empty. */
const emptyWhenNone: Record<string, { collection: string; label: string }> = {
  "home.clients": { collection: "clients", label: "Add your first client logo" },
  "home.testimonials": { collection: "testimonials", label: "Add your first testimonial" },
  "home.blog": { collection: "posts", label: "Write your first blog post" },
};

function EditorPlaceholder({ title, note, actions, icon }: { title: string; note: string; actions: EditAction[]; icon: React.ReactNode }) {
  return (
    <Edit actions={actions}>
      <div className="container-site py-6">
        <div className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-accent-300 bg-accent-50/50 px-5 py-5 pr-48 text-sm text-ink-600">
          <span className="text-accent-600">{icon}</span>
          <span>
            <strong className="text-ink-900">{title}</strong> — {note}
          </span>
        </div>
      </div>
    </Edit>
  );
}

export default async function HomePage() {
  const [slides, sections, session] = await Promise.all([getSlides(), getSections(), getSession()]);
  const home = sections.filter((s) => s.key.startsWith("home.") && registry[s.key]);
  const counts = session
    ? { "home.clients": (await getClients()).length, "home.testimonials": (await getTestimonials()).length, "home.blog": (await getPosts()).length }
    : null;

  return (
    <>
      <Edit
        actions={[
          { label: "Slides", collection: "slides" },
          { label: "Add slide", collection: "slides", create: true },
        ]}
      >
        <HeroSlider slides={slides} trust={<HeroTrust />} />
      </Edit>
      <Edit actions={[{ label: "Numbers", collection: "stats" }]} className="relative z-10">
        <StatsStrip />
      </Edit>
      {home.map((s) => {
        const { Component, name, extra = [] } = registry[s.key];
        const actions: EditAction[] = [{ label: "Heading & visibility", collection: "sections", slug: s.key }, ...extra];
        if (s.hidden) {
          return session ? (
            <EditorPlaceholder key={s.key} title={`${name} section is hidden`} note="visitors don't see it. Open it and untick “Hide this section” to show it." actions={actions} icon={<EyeOff className="size-5" />} />
          ) : null;
        }
        const empty = emptyWhenNone[s.key];
        if (session && empty && counts && counts[s.key as keyof typeof counts] === 0) {
          return (
            <EditorPlaceholder
              key={s.key}
              title={`${name} section`}
              note="nothing to show yet, so visitors don't see it."
              actions={[{ label: empty.label, collection: empty.collection, create: true }, actions[0]]}
              icon={<Plus className="size-5" />}
            />
          );
        }
        return (
          <Edit key={s.key} actions={actions}>
            <Component copy={s} />
          </Edit>
        );
      })}
    </>
  );
}
