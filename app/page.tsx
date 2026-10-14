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
import { getSections, getSlides, type SectionEntry } from "@/lib/cms/content";

/** Homepage sections by key. Order and visibility come from the "sections" collection. */
const registry: Record<string, (props: { copy: SectionEntry }) => Promise<React.ReactNode> | React.ReactNode> = {
  "home.about": AboutSection,
  "home.services": ServicesGrid,
  "home.products": ProductShowcase,
  "home.ai": AiSection,
  "home.why": WhyChooseUs,
  "home.industries": IndustriesSection,
  "home.projects": ProjectsSection,
  "home.clients": ClientsSection,
  "home.tech": TechSection,
  "home.process": ProcessSection,
  "home.blog": BlogSection,
  "home.testimonials": TestimonialsSection,
  "home.presence": PresenceSection,
  "home.cta": ({ copy }) => <CtaBand title={copy.title ?? undefined} description={copy.description ?? undefined} />,
};

export default async function HomePage() {
  const [slides, sections] = await Promise.all([getSlides(), getSections()]);
  const home = sections.filter((s) => s.key.startsWith("home.") && !s.hidden && registry[s.key]);
  return (
    <>
      <HeroSlider slides={slides} trust={<HeroTrust />} />
      <StatsStrip />
      {home.map((s) => {
        const Section = registry[s.key];
        return <Section key={s.key} copy={s} />;
      })}
    </>
  );
}
