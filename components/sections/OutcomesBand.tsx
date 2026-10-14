import { SectionHeading } from "@/components/ui/Section";
import { getOutcomes } from "@/lib/cms/content";
import { hues, hueAt } from "@/lib/palette";
import { cn } from "@/lib/utils";

/** "Outcomes that scale" — the numbers behind sixteen years of delivery. */
export async function OutcomesBand() {
  const outcomes = await getOutcomes();
  if (outcomes.length === 0) return null;
  return (
    <section className="bg-ink-950 py-20 sm:py-24" aria-labelledby="outcomes-heading">
      <div className="container-site">
        <SectionHeading eyebrow="Outcomes that scale" id="outcomes-heading" title="The numbers behind sixteen years of delivery." inverse />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((o, i) => (
            <div key={o._id} className="bg-ink-950 p-7">
              <dd className={cn("font-display text-4xl font-bold", hues[hueAt(i)].text)}>{o.value}</dd>
              <dt className="mt-2 text-sm text-ink-300">{o.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs text-ink-500">Figures reflect cumulative delivery across public sector, UN, INGO and corporate engagements to 2026.</p>
      </div>
    </section>
  );
}
