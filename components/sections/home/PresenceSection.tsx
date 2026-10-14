import { OfficeCards } from "@/components/sections/OfficeCards";
import { CopyTitle, SectionHeading } from "@/components/ui/Section";
import { getOffices, getPresenceStats } from "@/lib/cms/content";
import { hues, hueAt } from "@/lib/palette";
import { cn } from "@/lib/utils";
import type { SectionEntry } from "@/lib/cms/content";

export async function PresenceSection({ copy }: { copy: SectionEntry }) {
  const [offices, presenceStats] = await Promise.all([getOffices(), getPresenceStats()]);
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
          eyebrow={copy.eyebrow ?? undefined}
          id="presence-heading"
          title={<CopyTitle title={copy.title} highlight={copy.highlight} />}
          description={copy.description ?? undefined}
        />
        {presenceStats.length > 0 && (
          <dl className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
            {presenceStats.map((st, i) => (
              <div key={st._id} className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-ink-200/70">
                <dd className={cn("font-display text-3xl font-bold", hues[hueAt(i)].text)}>{st.value}</dd>
                <dt className="mt-1 text-sm text-ink-500">{st.label}</dt>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-10">
          <OfficeCards offices={offices} />
        </div>
      </div>
    </section>
  );
}
