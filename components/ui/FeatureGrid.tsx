import { hues, hueAt } from "@/lib/palette";
import { cn } from "@/lib/utils";
import type { FeatureItem } from "@/types";

/** Numbered feature list in a hairline grid — used for capabilities and deliverables. */
export function FeatureGrid({ items, columns = 3, className }: { items: FeatureItem[]; columns?: 2 | 3; className?: string }) {
  return (
    <dl
      className={cn(
        "grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-ink-200 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, i) => (
        <div key={item.title} className="bg-white p-6 transition-colors hover:bg-ink-50/60 sm:p-7">
          <span className={cn("inline-flex size-9 items-center justify-center rounded-xl font-display text-sm font-bold tabular-nums", hues[hueAt(i)].soft, hues[hueAt(i)].text)}>{String(i + 1).padStart(2, "0")}</span>
          <dt className="mt-3 font-display text-base font-semibold text-ink-900">{item.title}</dt>
          <dd className="mt-2 text-sm leading-relaxed text-ink-500">{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}
