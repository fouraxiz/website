import { TechIcon } from "@/components/ui/TechIcon";
import { getTechnologies } from "@/lib/cms/content";

/** Server-rendered technology row shown under the hero slider. */
export async function HeroTrust() {
  const technologies = await getTechnologies();
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <p className="text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase">Built with</p>
      <ul className="flex flex-wrap items-center gap-2">
        {technologies.slice(0, 7).map((t) => (
          <li key={t.name} title={t.name} className="inline-flex size-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-ink-200/80">
            <TechIcon tech={t} className="size-5" />
            <span className="sr-only">{t.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
