import { useId } from "react";
import { Bell, Search } from "lucide-react";
import { Icon } from "@/lib/icons";
import { hues, type Hue } from "@/lib/palette";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types";

const hex: Record<Hue, string> = {
  orange: "#e4603a",
  charcoal: "#40464b",
  violet: "#40464b",
  sky: "#40464b",
  emerald: "#e4603a",
  amber: "#e4603a",
  rose: "#e4603a",
  indigo: "#40464b",
  teal: "#40464b",
};

const statuses = [
  { label: "Approved", cls: "bg-emerald-50 text-emerald-700" },
  { label: "Pending", cls: "bg-amber-50 text-amber-700" },
  { label: "Done", cls: "bg-ink-50 text-ink-800" },
  { label: "New", cls: "bg-brand-50 text-brand-700" },
];
const people = ["RA", "SH", "MK", "TN", "AF"];
const times = ["2m ago", "18m ago", "1h ago", "3h ago", "Yesterday"];
const trends = ["+12.4%", "+3.1%", "+8.6%"];

/**
 * Illustrative interface mockup generated from data (module or product).
 * A stylised representation with sample UI content — not a product screenshot,
 * which the caption states. Metric cards show trends and sparklines rather than
 * absolute figures so no business numbers are implied.
 */
export function AppMockup({
  title,
  icon,
  metricLabels,
  rows,
  tone = "brand",
  hue,
  className,
  caption = true,
}: {
  title: string;
  icon: IconName;
  metricLabels: [string, string, string];
  rows: string[];
  tone?: "brand" | "accent";
  /** Colourful variant — overrides `tone`. */
  hue?: Hue;
  className?: string;
  caption?: boolean;
}) {
  const h: Hue = hue ?? (tone === "accent" ? "orange" : "charcoal");
  const color = hex[h];
  const gid = useId().replace(/:/g, "");
  return (
    <figure className={cn("relative", className)}>
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_70px_-30px_rgb(18_21_23/0.35)] ring-1 ring-ink-200/70" aria-hidden="true">
        <div className="flex items-center gap-3 border-b border-ink-100 bg-white px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-rose-400" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="flex h-6 flex-1 items-center gap-1.5 rounded-md bg-ink-50 px-2 text-[0.6rem] text-ink-400">
            <Search className="size-3" /> Search {title}…
          </span>
          <span className="relative">
            <Bell className="size-3.5 text-ink-400" />
            <span className={cn("absolute -top-0.5 -right-0.5 size-1.5 rounded-full", hues[h].solid)} />
          </span>
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-ink-900 text-[0.5rem] font-bold text-white">AD</span>
        </div>
        <div className="grid grid-cols-[3rem_1fr]">
          <div className="flex flex-col items-center gap-2.5 border-r border-ink-100 bg-ink-50/60 py-4">
            <span className={cn("inline-flex size-8 items-center justify-center rounded-lg text-white [&_svg]:size-4", hues[h].solid)}>
              <Icon name={icon} />
            </span>
            {(["layers", "users", "file-text", "bar-chart"] as IconName[]).map((ic) => (
              <span key={ic} className="inline-flex size-7 items-center justify-center rounded-md text-ink-400 [&_svg]:size-3.5">
                <Icon name={ic} />
              </span>
            ))}
          </div>
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.6rem] text-ink-500">Dashboard</p>
                <p className="font-display text-sm font-semibold text-ink-900">{title}</p>
              </div>
              <span className={cn("rounded-md px-2 py-1 text-[0.58rem] font-semibold", hues[h].soft, hues[h].text)}>+ New</span>
            </div>
            <div className="mt-3.5 grid grid-cols-3 gap-2">
              {metricLabels.map((m, i) => (
                <div key={m} className="rounded-xl p-2.5 ring-1 ring-ink-100">
                  <p className="truncate text-[0.6rem] font-medium text-ink-500">{m}</p>
                  <div className="mt-1.5 flex items-end justify-between gap-1">
                    <span className="rounded bg-emerald-50 px-1 py-0.5 text-[0.52rem] font-semibold text-emerald-700">{trends[i]}</span>
                    <svg viewBox="0 0 40 16" className="h-4 w-10">
                      <path
                        d={["M0 13 L8 10 L16 11 L24 6 L32 7 L40 2", "M0 12 L8 12 L16 8 L24 9 L32 5 L40 6", "M0 14 L8 9 L16 10 L24 7 L32 4 L40 3"][i]}
                        fill="none"
                        stroke={color}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl p-3 ring-1 ring-ink-100">
              <div className="flex items-center justify-between text-[0.58rem]">
                <span className="font-semibold text-ink-800">Activity this year</span>
                <span className="text-ink-400">Jan – Dec</span>
              </div>
              <svg viewBox="0 0 240 60" className="mt-1.5 h-16 w-full">
                <defs>
                  <linearGradient id={`g-${gid}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.28" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[15, 32, 49].map((y) => (
                  <line key={y} x1="0" x2="240" y1={y} y2={y} stroke="#eceef0" />
                ))}
                <path d="M0 48 C20 44 30 40 45 41 S75 30 95 32 S130 22 150 24 S185 12 205 14 L240 8 L240 60 L0 60Z" fill={`url(#g-${gid})`} />
                <path d="M0 48 C20 44 30 40 45 41 S75 30 95 32 S130 22 150 24 S185 12 205 14 L240 8" fill="none" stroke={color} strokeWidth="2.2" />
                <circle cx="205" cy="14" r="3.5" fill="#fff" stroke={color} strokeWidth="2" />
              </svg>
            </div>
            <ul className="mt-3 divide-y divide-ink-100 rounded-xl ring-1 ring-ink-100">
              {rows.map((r, i) => {
                const st = statuses[i % statuses.length];
                return (
                  <li key={r} className="flex items-center gap-2.5 px-3 py-2">
                    <span className={cn("inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[0.5rem] font-bold", hues[h].soft, hues[h].text)}>
                      {people[i % people.length]}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.66rem] font-medium text-ink-800">{r}</span>
                      <span className="block text-[0.52rem] text-ink-400">{times[i % times.length]}</span>
                    </span>
                    <span className={cn("rounded-md px-1.5 py-0.5 text-[0.52rem] font-semibold", st.cls)}>{st.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-center text-xs text-ink-400">Illustrative interface — not a product screenshot</figcaption>}
    </figure>
  );
}
