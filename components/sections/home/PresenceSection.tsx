import { OfficeCards } from "@/components/sections/OfficeCards";
import { TextLink } from "@/components/ui/Button";
import { offices } from "@/data/site";

export function PresenceSection() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28" aria-labelledby="presence-heading">
      <div className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-site relative">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-brand-300">International presence</p>
            <h2 id="presence-heading" className="mt-4 text-3xl leading-tight font-bold tracking-tight text-balance text-white sm:text-[2.5rem]">
              Three countries. One team.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-ink-400">
            Offices in Bangladesh, New Zealand and Kosovo let us collaborate closely with clients across regions and time zones.
          </p>
        </div>
        <div className="mt-12">
          <OfficeCards offices={offices} inverse />
        </div>
        <TextLink href="/contact#offices" className="mt-8" inverse>
          Contact an office
        </TextLink>
      </div>
    </section>
  );
}
