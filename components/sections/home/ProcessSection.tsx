import { SectionHeading } from "@/components/ui/Section";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { processSteps } from "@/data/process";

export function ProcessSection() {
  return (
    <section className="bg-ink-50 py-20 sm:py-28" aria-labelledby="process-heading">
      <div className="container-site">
        <SectionHeading
          eyebrow="How we work"
          id="process-heading"
          title="A clear process from first conversation to long-term support."
          description="Six stages, each with tangible outputs you can review — so you always know where your project stands."
        />
        <div className="mt-14">
          <ProcessTimeline steps={processSteps} />
        </div>
      </div>
    </section>
  );
}
