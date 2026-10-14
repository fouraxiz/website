import { OfficeCards } from "@/components/sections/OfficeCards";
import { Hl, SectionHeading } from "@/components/ui/Section";
import { offices } from "@/data/site";

export function PresenceSection() {
  return (
    <section className="relative overflow-hidden bg-ink-50 py-20 sm:py-28" aria-labelledby="presence-heading">
      <svg className="mask-radial pointer-events-none absolute inset-0 size-full text-ink-300/60" aria-hidden="true">
        <defs>
          <pattern id="presence-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#presence-dots)" />
      </svg>
      <div className="container-site relative">
        <SectionHeading
          align="center"
          eyebrow="Global presence"
          id="presence-heading"
          title={
            <>
              Three countries. <Hl>One team.</Hl>
            </>
          }
          description="Offices in Bangladesh, New Zealand and Kosovo let us work closely with clients across regions and time zones."
        />
        <div className="mt-12">
          <OfficeCards offices={offices} />
        </div>
      </div>
    </section>
  );
}
