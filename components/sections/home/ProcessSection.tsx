import { CopyTitle, SectionHeading } from "@/components/ui/Section";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { getProcess } from "@/lib/cms/content";
import type { SectionEntry } from "@/lib/cms/content";

export async function ProcessSection({ copy }: { copy: SectionEntry }) {
  const processSteps = await getProcess();
  return (
    <section className="bg-ink-50 py-20 sm:py-28" aria-labelledby="process-heading">
      <div className="container-site">
        <SectionHeading
          eyebrow={copy.eyebrow ?? undefined}
          id="process-heading"
          title={<CopyTitle title={copy.title} highlight={copy.highlight} />}
          description={copy.description ?? undefined}
        />
        <div className="mt-14">
          <ProcessTimeline steps={processSteps} />
        </div>
      </div>
    </section>
  );
}
