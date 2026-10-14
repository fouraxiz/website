"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

/** Accessible tabs for Mission / Vision / Values. */
export function AboutTabs({ tabs }: { tabs: { label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  return (
    <div>
      <div role="tablist" aria-label="Mission, vision and values" className="inline-flex flex-wrap gap-1 rounded-full bg-white p-1 shadow-sm ring-1 ring-ink-200">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            id={`${id}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const next = (active + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
                setActive(next);
                document.getElementById(`${id}-tab-${next}`)?.focus();
              }
            }}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
              active === i ? "bg-ink-950 text-white" : "text-ink-600 hover:text-ink-900",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.label} id={`${id}-panel-${i}`} role="tabpanel" aria-labelledby={`${id}-tab-${i}`} hidden={active !== i} className="mt-5">
          {t.content}
        </div>
      ))}
    </div>
  );
}
