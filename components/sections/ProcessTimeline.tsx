import { Icon } from "@/lib/icons";
import type { ProcessStep } from "@/types";

/** Six-step delivery process. Horizontal rail on desktop, vertical on mobile. */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="relative grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-5 lg:flex-col lg:gap-0">
          <div className="relative flex shrink-0 flex-col items-center lg:flex-row">
            <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-xl bg-white text-brand-600 shadow-[var(--shadow-soft)] ring-1 ring-ink-200 [&_svg]:size-5">
              <Icon name={s.icon} />
            </span>
            <span className="mt-2 w-px flex-1 bg-gradient-to-b from-ink-200 to-transparent lg:hidden" aria-hidden="true" />
            <span className="ml-3 hidden h-px flex-1 bg-gradient-to-r from-ink-200 to-transparent lg:block" aria-hidden="true" />
          </div>
          <div className="pb-2 lg:mt-6">
            <p className="font-display text-xs font-semibold tracking-[0.14em] text-brand-600 uppercase">Step {String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.description}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {s.outputs.map((o) => (
                <li key={o} className="rounded-md bg-white px-2 py-1 text-xs text-ink-600 ring-1 ring-ink-200 ring-inset">
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
