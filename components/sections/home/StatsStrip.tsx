import { CalendarCheck, Globe2, Headphones, Layers } from "lucide-react";
import { stats } from "@/data/site";
import { hues, hueAt } from "@/lib/palette";
import { cn } from "@/lib/utils";

const icons = [CalendarCheck, Globe2, Layers, Headphones];

export function StatsStrip() {
  return (
    <section aria-label="4axiz at a glance" className="relative z-10 -mt-16 sm:-mt-20">
      <div className="container-site">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink-100 shadow-[0_30px_60px_-25px_rgb(18_21_23/0.25)] ring-1 ring-ink-100 lg:grid-cols-4">
          {stats.map((s, i) => {
            const I = icons[i % icons.length];
            const h = hues[hueAt(i)];
            return (
              <li key={s.label} className="flex flex-col items-start gap-3 bg-white p-5 sm:flex-row sm:items-center sm:gap-4 sm:p-8">
                <span className={cn("inline-flex size-11 shrink-0 items-center justify-center rounded-2xl sm:size-14", h.soft, h.text)}>
                  <I className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold text-ink-950 sm:text-3xl">{s.value}</p>
                  <p className="text-sm text-ink-500">{s.label}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
