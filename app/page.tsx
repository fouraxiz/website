import { HeroSlider } from "@/components/sections/home/HeroSlider";
import { StatsStrip } from "@/components/sections/home/StatsStrip";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { ServicesGrid } from "@/components/sections/home/ServicesGrid";
import { ProductShowcase } from "@/components/sections/home/ProductShowcase";
import { AiSection } from "@/components/sections/home/AiSection";
import { WhyChooseUs } from "@/components/sections/home/WhyChooseUs";
import { ProjectsSection } from "@/components/sections/home/ProjectsSection";
import { IndustriesSection } from "@/components/sections/home/IndustriesSection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { TechSection } from "@/components/sections/home/TechSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { PresenceSection } from "@/components/sections/home/PresenceSection";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <StatsStrip />
      <AboutSection />
      <ServicesGrid />
      <ProductShowcase />
      <AiSection />
      <WhyChooseUs />
      <IndustriesSection />
      <ProjectsSection />
      <TechSection />
      <ProcessSection />
      <TestimonialsSection />
      <PresenceSection />
      <CtaBand />
    </>
  );
}
