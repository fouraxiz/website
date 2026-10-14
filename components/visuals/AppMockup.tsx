import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types";

/**
 * Illustrative interface mockup generated from data (module or product).
 * It is a stylised representation, not a product screenshot — every instance
 * carries an "Illustrative interface" caption for that reason.
 * Values are rendered as neutral bars rather than numbers so no figures are implied.
 */
export function AppMockup({
  title,
  icon,
  metricLabels,
  rows,
  tone = "brand",
  className,
  caption = true,
}: {
  title: string;
  icon: IconName;
  metricLabels: [string, string, string];
  rows: string[];
  tone?: "brand" | "accent";
  className?: string;
  caption?: boolean;
}) {
  const accent = tone === "accent" ? "bg-accent-500" : "bg-brand-500";
  const accentSoft = tone === "accent" ? "bg-accent-100" : "bg-brand-100";
  return (
    <figure className={cn("relative", className)}>
      <div className="overflow-hidden rounded-xl border border-ink-200 bg-white shadow-[var(--shadow-lift)]">
        <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50/80 px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-ink-200" />
            <span className="size-2.5 rounded-full bg-ink-200" />
            <span className="size-2.5 rounded-full bg-ink-200" />
          </span>
          <span className="ml-3 h-5 flex-1 rounded bg-white ring-1 ring-ink-100" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-[3.25rem_1fr]">
          <div className="flex flex-col items-center gap-3 border-r border-ink-100 py-4" aria-hidden="true">
            <span className={cn("inline-flex size-8 items-center justify-center rounded-lg text-white [&_svg]:size-4", accent)}>
              <Icon name={icon} />
            </span>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="size-6 rounded-md bg-ink-100" />
            ))}
          </div>
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-semibold text-ink-900">{title}</p>
              <span className={cn("h-6 w-16 rounded-md", accentSoft)} aria-hidden="true" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {metricLabels.map((m, i) => (
                <div key={m} className="rounded-lg border border-ink-100 p-2.5">
                  <p className="truncate text-[0.65rem] font-medium text-ink-400">{m}</p>
                  <span className="mt-2 block h-1.5 rounded-full bg-ink-100" aria-hidden="true">
                    <span className={cn("block h-1.5 rounded-full", accent)} style={{ width: `${[68, 42, 81][i]}%` }} />
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex h-20 items-end gap-1.5 rounded-lg border border-ink-100 p-3" aria-hidden="true">
              {[38, 52, 44, 63, 58, 72, 66, 80, 74, 88, 70, 92].map((h, i) => (
                <span key={i} className={cn("flex-1 rounded-sm", i > 8 ? accent : accentSoft)} style={{ height: `${h}%` }} />
              ))}
            </div>
            <ul className="mt-4 space-y-1.5">
              {rows.map((r, i) => (
                <li key={r} className="flex items-center gap-2.5 rounded-md bg-ink-50/80 px-2.5 py-2">
                  <span className={cn("size-1.5 rounded-full", i === 0 ? accent : "bg-ink-300")} aria-hidden="true" />
                  <span className="truncate text-xs text-ink-600">{r}</span>
                  <span className="ml-auto h-1.5 w-10 rounded-full bg-ink-200" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-center text-xs text-ink-400">Illustrative interface — not a product screenshot</figcaption>}
    </figure>
  );
}
