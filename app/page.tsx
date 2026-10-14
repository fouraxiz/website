import { Hero } from "@/components/sections/home/Hero";
import { Intro } from "@/components/sections/home/Intro";
import { SolutionsShowcase } from "@/components/sections/home/SolutionsShowcase";
import { ErpSection } from "@/components/sections/home/ErpSection";
import { AiSection } from "@/components/sections/home/AiSection";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { ProjectsSection } from "@/components/sections/home/ProjectsSection";
import { IndustriesSection } from "@/components/sections/home/IndustriesSection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { CompanySection } from "@/components/sections/home/CompanySection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { PresenceSection } from "@/components/sections/home/PresenceSection";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <SolutionsShowcase />
      <ErpSection />
      <AiSection />
      <ServicesSection />
      <ProjectsSection />
      <IndustriesSection />
      <ProcessSection />
      <CompanySection />
      <TestimonialsSection />
      <PresenceSection />
      <CtaBand />
    </>
  );
}
