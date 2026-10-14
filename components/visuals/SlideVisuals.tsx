import {
  BarChart3,
  Bell,
  Boxes,
  Calculator,
  Check,
  FileText,
  Package,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

/** Hero slide visuals — illustrative interfaces, decorative only. */

export function ErpVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[36rem]" aria-hidden="true">
      <div className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_40px_80px_-30px_rgb(18_21_23/0.35)]">
        <div className="flex items-center gap-2 border-b border-ink-100 px-4 py-3">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-rose-400" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="ml-3 flex h-6 flex-1 items-center gap-2 rounded-md bg-ink-50 px-2 text-[0.65rem] text-ink-400">
            <Search className="size-3" /> Search modules, reports…
          </span>
          <Bell className="size-4 text-ink-400" />
        </div>
        <div className="grid grid-cols-[7.5rem_1fr] max-sm:grid-cols-1">
          <ul className="space-y-1 bg-ink-950 p-3 text-[0.68rem] text-ink-300 max-sm:hidden">
            {[
              { I: Boxes, l: "Dashboard", a: true },
              { I: Calculator, l: "Accounts" },
              { I: Users, l: "HRM" },
              { I: ShoppingBag, l: "Procurement" },
              { I: Package, l: "Inventory" },
              { I: BarChart3, l: "Reports" },
            ].map(({ I, l, a }) => (
              <li key={l} className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${a ? "bg-brand-500 font-semibold text-white" : ""}`}>
                <I className="size-3.5" /> {l}
              </li>
            ))}
          </ul>
          <div className="space-y-3 bg-ink-50/50 p-4">
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { l: "Sales", c: "bg-sky-500", s: "bg-sky-50", w: "70%" },
                { l: "Purchases", c: "bg-violet-500", s: "bg-violet-50", w: "52%" },
                { l: "Payroll", c: "bg-emerald-500", s: "bg-emerald-50", w: "84%" },
              ].map((k) => (
                <div key={k.l} className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-ink-100">
                  <span className={`inline-flex size-6 items-center justify-center rounded-md ${k.s}`}>
                    <span className={`size-2 rounded-full ${k.c}`} />
                  </span>
                  <p className="mt-2 text-[0.62rem] font-medium text-ink-500">{k.l}</p>
                  <span className="mt-1.5 block h-1.5 rounded-full bg-ink-100">
                    <span className={`block h-1.5 rounded-full ${k.c}`} style={{ width: k.w }} />
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-[1.6fr_1fr] gap-2.5">
              <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-ink-100">
                <p className="text-[0.65rem] font-semibold text-ink-700">Monthly overview</p>
                <div className="mt-3 flex h-20 items-end gap-1.5">
                  {[40, 55, 45, 70, 62, 80, 74, 92].map((h, i) => (
                    <span key={i} className="flex flex-1 flex-col justify-end gap-0.5" style={{ height: `${h}%` }}>
                      <span className="block flex-[2] rounded-t-sm bg-sky-400" />
                      <span className="block flex-1 rounded-b-sm bg-brand-400" />
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl bg-white p-3 shadow-sm ring-1 ring-ink-100">
                <svg viewBox="0 0 36 36" className="size-16 -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#eceef0" strokeWidth="5" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#7c4ff8" strokeWidth="5" strokeDasharray="40 88" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="5" strokeDasharray="25 88" strokeDashoffset="-40" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#e4603a" strokeWidth="5" strokeDasharray="18 88" strokeDashoffset="-65" />
                </svg>
                <p className="mt-2 text-[0.6rem] font-medium text-ink-500">Expense mix</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-8 -left-6 w-52 animate-float rounded-2xl bg-white p-3.5 shadow-[0_20px_50px_-15px_rgb(18_21_23/0.35)] ring-1 ring-ink-100 max-sm:hidden">
        <p className="text-[0.68rem] font-semibold text-ink-900">Purchase approval</p>
        <ul className="mt-2 space-y-1.5">
          {["Requisition", "Manager", "Finance"].map((s, i) => (
            <li key={s} className="flex items-center gap-2 text-[0.65rem] text-ink-600">
              <span className={`inline-flex size-4 items-center justify-center rounded-full ${i < 2 ? "bg-emerald-500 text-white" : "border border-dashed border-ink-300"}`}>
                {i < 2 && <Check className="size-2.5" strokeWidth={3} />}
              </span>
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute -top-6 -right-4 rounded-2xl bg-white px-4 py-3 shadow-[0_20px_50px_-15px_rgb(18_21_23/0.35)] ring-1 ring-ink-100 max-sm:hidden">
        <p className="text-[0.62rem] font-medium text-ink-500">Modules connected</p>
        <div className="mt-1.5 flex -space-x-1.5">
          {["bg-sky-500", "bg-violet-500", "bg-emerald-500", "bg-amber-500", "bg-brand-500"].map((c) => (
            <span key={c} className={`size-6 rounded-full ring-2 ring-white ${c}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function AiVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem]" aria-hidden="true">
      <div className="rounded-2xl bg-ink-950 p-5 shadow-[0_40px_80px_-30px_rgb(18_21_23/0.5)]">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-sky-500 text-white">
            <Sparkles className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">4axiz AI Assistant</p>
            <p className="flex items-center gap-1.5 text-[0.65rem] text-emerald-400">
              <span className="size-1.5 animate-pulse-soft rounded-full bg-emerald-400" /> Connected to your ERP
            </p>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          <div className="ml-auto w-4/5 rounded-2xl rounded-br-sm bg-brand-500 px-3.5 py-2.5 text-[0.75rem] text-white">
            Which suppliers have invoices due this week?
          </div>
          <div className="w-11/12 rounded-2xl rounded-bl-sm bg-white/[0.07] px-3.5 py-3 text-[0.72rem] text-ink-200">
            I found invoices from three suppliers due this week. Here&apos;s the summary:
            <div className="mt-2.5 space-y-1.5">
              {[
                { c: "bg-sky-400", w: "w-24" },
                { c: "bg-violet-400", w: "w-16" },
                { c: "bg-emerald-400", w: "w-20" },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-white/[0.05] px-2.5 py-1.5">
                  <span className={`size-2 rounded-full ${r.c}`} />
                  <span className={`h-1.5 rounded bg-white/25 ${r.w}`} />
                  <span className="ml-auto h-1.5 w-10 rounded bg-white/15" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {["Draft reminders", "Open report"].map((t) => (
              <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-[0.65rem] text-ink-300">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -right-6 -bottom-10 w-56 animate-float rounded-2xl bg-white p-4 shadow-[0_20px_50px_-15px_rgb(18_21_23/0.35)] ring-1 ring-ink-100 max-sm:hidden">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
            <FileText className="size-3.5" />
          </span>
          <p className="text-[0.7rem] font-semibold text-ink-900">Invoice scanned</p>
        </div>
        <dl className="mt-3 space-y-1.5 text-[0.65rem]">
          {["Vendor", "Amount", "Due date"].map((f) => (
            <div key={f} className="flex items-center justify-between">
              <dt className="text-ink-500">{f}</dt>
              <dd className="h-1.5 w-16 rounded bg-emerald-200" />
            </div>
          ))}
        </dl>
        <p className="mt-3 flex items-center gap-1 text-[0.62rem] font-medium text-emerald-600">
          <Check className="size-3" strokeWidth={3} /> Extracted &amp; ready for review
        </p>
      </div>
    </div>
  );
}

export function AppsVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[36rem] pb-6" aria-hidden="true">
      <div className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_40px_80px_-30px_rgb(18_21_23/0.35)]">
        <div className="flex items-center gap-1.5 border-b border-ink-100 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-rose-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="h-3 w-16 rounded bg-ink-900" />
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-2 w-8 rounded bg-ink-200" />
              ))}
            </div>
            <ShoppingCart className="size-4 text-ink-700" />
          </div>
          <div className="mt-4 grid grid-cols-[1.3fr_1fr] gap-3 rounded-xl bg-gradient-to-br from-violet-500 to-sky-500 p-4">
            <div>
              <span className="block h-2 w-14 rounded bg-white/50" />
              <span className="mt-2 block h-4 w-28 rounded bg-white" />
              <span className="mt-1.5 block h-4 w-20 rounded bg-white" />
              <span className="mt-3 inline-block rounded-md bg-amber-300 px-2.5 py-1 text-[0.6rem] font-bold text-ink-900">Shop now</span>
            </div>
            <div className="rounded-lg bg-white/20" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2.5">
            {["bg-rose-100", "bg-amber-100", "bg-emerald-100", "bg-sky-100"].map((c, i) => (
              <div key={c} className="rounded-lg ring-1 ring-ink-100">
                <div className={`aspect-square rounded-t-lg ${c}`} />
                <div className="space-y-1 p-1.5">
                  <span className="block h-1.5 w-full rounded bg-ink-200" />
                  <span className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 4 - (i % 2) }).map((_, s) => (
                      <Star key={s} className="size-2 fill-current" />
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -right-2 -bottom-2 w-36 rounded-[1.6rem] border-[5px] border-ink-900 bg-white p-2 shadow-[0_30px_60px_-20px_rgb(18_21_23/0.5)] sm:-right-8">
        <div className="mx-auto h-1.5 w-10 rounded-full bg-ink-900" />
        <div className="mt-2 rounded-lg bg-gradient-to-br from-brand-400 to-rose-500 p-2">
          <span className="block h-1.5 w-10 rounded bg-white/60" />
          <span className="mt-1.5 block h-2.5 w-16 rounded bg-white" />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {["bg-sky-100", "bg-violet-100", "bg-emerald-100", "bg-amber-100"].map((c) => (
            <span key={c} className={`block aspect-square rounded-md ${c}`} />
          ))}
        </div>
        <span className="mt-2 block rounded-md bg-ink-900 py-1.5 text-center text-[0.55rem] font-semibold text-white">Checkout</span>
      </div>
    </div>
  );
}
