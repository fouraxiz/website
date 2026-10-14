import { Boxes, Brain, Calculator, Check, Package, ShoppingBag, Sparkles, Users } from "lucide-react";

/**
 * Hero composition: a connected operations workspace (ERP), an AI assistant
 * panel and an automated workflow card. Purely illustrative and decorative —
 * exposed to assistive tech as a single labelled image.
 */
export function HeroVisual() {
  return (
    <div
      role="img"
      aria-label="Illustration of the 4axiz platform: an operations dashboard connecting finance, HR, procurement and inventory, with an AI assistant and an automated approval workflow."
      className="relative mx-auto w-full max-w-[38rem]"
    >
      {/* Soft brand halo */}
      <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgb(58_92_243/0.18),transparent)]" aria-hidden="true" />

      {/* Main workspace */}
      <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-[var(--shadow-lift)]">
        <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-6 items-center justify-center rounded-md bg-brand-600 text-white">
              <Boxes className="size-3.5" aria-hidden="true" />
            </span>
            <span className="font-display text-[0.8rem] font-semibold text-ink-900">Operations overview</span>
          </div>
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-5 w-12 rounded bg-ink-100" />
            <span className="h-5 w-5 rounded-full bg-brand-100" />
          </div>
        </div>

        <div className="grid grid-cols-[8.5rem_1fr] max-sm:grid-cols-1">
          <ul className="space-y-1 border-r border-ink-100 p-3 text-[0.72rem] max-sm:hidden">
            {[
              { icon: Calculator, label: "Finance", active: true },
              { icon: Users, label: "People" },
              { icon: ShoppingBag, label: "Procurement" },
              { icon: Package, label: "Inventory" },
              { icon: Brain, label: "AI Insights" },
            ].map(({ icon: I, label, active }) => (
              <li
                key={label}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${active ? "bg-brand-50 font-semibold text-brand-700" : "text-ink-500"}`}
              >
                <I className="size-3.5" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <div className="p-4">
            <div className="grid grid-cols-3 gap-2.5">
              {["Revenue", "Expenses", "Cash flow"].map((l, i) => (
                <div key={l} className="rounded-lg border border-ink-100 p-2.5">
                  <p className="text-[0.62rem] font-medium text-ink-400">{l}</p>
                  <span className="mt-1.5 block h-2 w-3/4 rounded bg-ink-200" />
                  <span className={`mt-2 block h-1 rounded-full ${i === 1 ? "bg-accent-400" : "bg-brand-400"}`} style={{ width: `${[72, 48, 64][i]}%` }} />
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-lg border border-ink-100 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[0.66rem] font-semibold text-ink-700">Performance trend</span>
                <span className="flex gap-2 text-[0.58rem] text-ink-400">
                  <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-brand-500" />Actual</span>
                  <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-accent-400" />Forecast</span>
                </span>
              </div>
              <svg viewBox="0 0 300 90" className="mt-2 h-24 w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="hv-area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3a5cf3" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#3a5cf3" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[20, 45, 70].map((y) => (
                  <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#eceef5" />
                ))}
                <path d="M0 72 C 30 66, 50 60, 75 58 S 120 44, 150 46 S 195 30, 210 28 L210 90 L0 90Z" fill="url(#hv-area)" />
                <path d="M0 72 C 30 66, 50 60, 75 58 S 120 44, 150 46 S 195 30, 210 28" fill="none" stroke="#2643dc" strokeWidth="2.2" />
                <path
                  d="M210 28 C 235 24, 255 20, 300 12"
                  fill="none"
                  stroke="#10b296"
                  strokeWidth="2.2"
                  strokeDasharray="5 5"
                  className="animate-dash"
                />
                <circle cx="210" cy="28" r="4" fill="#fff" stroke="#2643dc" strokeWidth="2" />
              </svg>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {["Pending approvals", "Stock alerts"].map((l) => (
                <div key={l} className="rounded-lg bg-ink-50 p-2.5">
                  <p className="text-[0.62rem] font-medium text-ink-500">{l}</p>
                  <div className="mt-2 space-y-1.5" aria-hidden="true">
                    <span className="block h-1.5 w-full rounded bg-ink-200" />
                    <span className="block h-1.5 w-2/3 rounded bg-ink-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI assistant */}
      <div className="absolute -bottom-10 -left-4 w-60 animate-float rounded-xl border border-ink-200 bg-white p-3.5 shadow-[var(--shadow-lift)] sm:-left-12">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-6 items-center justify-center rounded-md bg-accent-500 text-white">
            <Sparkles className="size-3.5" aria-hidden="true" />
          </span>
          <span className="text-[0.72rem] font-semibold text-ink-900">AI assistant</span>
          <span className="ml-auto size-1.5 animate-pulse-soft rounded-full bg-accent-500" />
        </div>
        <p className="mt-2.5 rounded-lg bg-ink-50 px-2.5 py-2 text-[0.68rem] leading-snug text-ink-600">
          Summarise this month&apos;s overdue receivables by branch.
        </p>
        <div className="mt-2 space-y-1 rounded-lg border border-accent-100 bg-accent-50/60 px-2.5 py-2" aria-hidden="true">
          <span className="block h-1.5 w-full rounded bg-accent-200" />
          <span className="block h-1.5 w-4/5 rounded bg-accent-200" />
          <span className="block h-1.5 w-3/5 rounded bg-accent-200" />
        </div>
      </div>

      {/* Workflow */}
      <div className="absolute -top-8 -right-3 w-52 rounded-xl border border-ink-200 bg-white p-3.5 shadow-[var(--shadow-lift)] max-sm:hidden sm:-right-10">
        <p className="text-[0.68rem] font-semibold text-ink-900">Purchase workflow</p>
        <ol className="mt-2.5 space-y-2">
          {["Requisition", "Manager approval", "Purchase order"].map((s, i) => (
            <li key={s} className="flex items-center gap-2 text-[0.66rem] text-ink-600">
              <span
                className={`inline-flex size-4 items-center justify-center rounded-full ${i < 2 ? "bg-brand-600 text-white" : "border border-dashed border-brand-300"}`}
              >
                {i < 2 && <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
