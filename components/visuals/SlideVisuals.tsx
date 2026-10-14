import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Boxes,
  Calculator,
  Camera,
  Check,
  CheckCircle2,
  FileText,
  Headphones,
  LayoutDashboard,
  Package,
  PackageCheck,
  Search,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  TriangleAlert,
  Users,
  Watch,
} from "lucide-react";

/**
 * Hero slide visuals — illustrative interfaces with sample data.
 * Decorative only (aria-hidden); figures are UI examples, not company statistics.
 */

const shadow = "shadow-[0_40px_90px_-30px_rgb(18_21_23/0.35)]";
const floatShadow = "shadow-[0_24px_50px_-18px_rgb(18_21_23/0.35)]";

function WindowBar({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-ink-100 bg-white px-4 py-2.5">
      <span className="flex gap-1.5">
        <span className="size-2.5 rounded-full bg-rose-400" />
        <span className="size-2.5 rounded-full bg-amber-400" />
        <span className="size-2.5 rounded-full bg-emerald-400" />
      </span>
      <span className="mx-auto flex h-6 w-1/2 items-center justify-center gap-1.5 rounded-md bg-ink-50 text-[0.62rem] text-ink-400">
        <span className="size-1.5 rounded-full bg-emerald-400" /> {url}
      </span>
    </div>
  );
}

export function ErpVisual() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  return (
    <div className="relative mx-auto w-full max-w-[40rem]" aria-hidden="true">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-sky-200/60 via-violet-200/40 to-brand-100/50 blur-2xl" />
      <div className={`overflow-hidden rounded-2xl bg-white ring-1 ring-ink-200/70 ${shadow}`}>
        <WindowBar url="erp.4axiz.com/dashboard" />
        <div className="grid grid-cols-[8.5rem_1fr] max-sm:grid-cols-1">
          {/* Sidebar */}
          <div className="bg-ink-950 p-3 max-sm:hidden">
            <p className="flex items-center gap-1.5 px-2 py-1 text-[0.7rem] font-bold text-white">
              <span className="inline-flex size-5 items-center justify-center rounded-md bg-brand-500">
                <Boxes className="size-3" />
              </span>
              4axiz ERP
            </p>
            <ul className="mt-3 space-y-0.5 text-[0.66rem] text-ink-400">
              {[
                { I: LayoutDashboard, l: "Dashboard", a: true },
                { I: Calculator, l: "Accounts" },
                { I: Users, l: "HRM & Payroll" },
                { I: ShoppingBag, l: "Procurement" },
                { I: Package, l: "Inventory" },
                { I: BarChart3, l: "Reports" },
              ].map(({ I, l, a }) => (
                <li key={l} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${a ? "bg-white/10 font-semibold text-white" : ""}`}>
                  <I className={`size-3.5 ${a ? "text-brand-400" : ""}`} /> {l}
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-xl bg-gradient-to-br from-accent-500 to-sky-500 p-2.5">
              <p className="flex items-center gap-1 text-[0.6rem] font-semibold text-white">
                <Sparkles className="size-3" /> AI insight
              </p>
              <p className="mt-1 text-[0.56rem] leading-snug text-white/85">Sales up this month — Dhaka branch leads.</p>
            </div>
          </div>

          {/* Main */}
          <div className="bg-ink-50/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.62rem] text-ink-500">Good morning,</p>
                <p className="text-[0.82rem] font-bold text-ink-900">Business overview</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[0.58rem] text-ink-500 ring-1 ring-ink-200">
                  <Search className="size-3" /> Search
                </span>
                <span className="relative inline-flex size-6 items-center justify-center rounded-md bg-white ring-1 ring-ink-200">
                  <Bell className="size-3 text-ink-500" />
                  <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-brand-500" />
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { l: "Revenue", v: "৳ 8.42M", t: "+12.4%", c: "text-emerald-600 bg-emerald-50" },
                { l: "Expenses", v: "৳ 3.15M", t: "-4.1%", c: "text-sky-600 bg-sky-50" },
                { l: "Receivables", v: "৳ 1.27M", t: "+6.8%", c: "text-violet-600 bg-violet-50" },
              ].map((k) => (
                <div key={k.l} className="rounded-xl bg-white p-2.5 ring-1 ring-ink-100">
                  <p className="text-[0.58rem] font-medium text-ink-500">{k.l}</p>
                  <p className="mt-0.5 text-[0.85rem] font-bold text-ink-900">{k.v}</p>
                  <span className={`mt-1 inline-block rounded px-1 py-0.5 text-[0.52rem] font-semibold ${k.c}`}>{k.t}</span>
                </div>
              ))}
            </div>

            <div className="mt-2.5 grid grid-cols-[1.55fr_1fr] gap-2.5">
              <div className="rounded-xl bg-white p-3 ring-1 ring-ink-100">
                <div className="flex items-center justify-between">
                  <p className="text-[0.62rem] font-semibold text-ink-800">Sales vs purchases</p>
                  <span className="flex gap-2 text-[0.5rem] text-ink-500">
                    <span className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-sky-500" />
                      Sales
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-brand-400" />
                      Purchases
                    </span>
                  </span>
                </div>
                <svg viewBox="0 0 240 90" className="mt-2 h-24 w-full">
                  <defs>
                    <linearGradient id="erp-sales" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[15, 40, 65].map((y) => (
                    <line key={y} x1="0" x2="240" y1={y} y2={y} stroke="#eceef0" />
                  ))}
                  <path d="M0 70 C20 62 35 60 50 55 S80 40 100 44 S135 30 150 26 S190 20 210 14 L240 10 L240 90 L0 90Z" fill="url(#erp-sales)" />
                  <path d="M0 70 C20 62 35 60 50 55 S80 40 100 44 S135 30 150 26 S190 20 210 14 L240 10" fill="none" stroke="#0ea5e9" strokeWidth="2.2" />
                  <path d="M0 78 C25 74 40 72 60 70 S95 62 120 64 S160 54 180 52 S220 46 240 44" fill="none" stroke="#ee7d57" strokeWidth="2" strokeDasharray="4 3" />
                  <circle cx="150" cy="26" r="3.5" fill="#fff" stroke="#0ea5e9" strokeWidth="2" />
                </svg>
                <div className="flex justify-between text-[0.48rem] text-ink-400">
                  {months.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-white p-3 ring-1 ring-ink-100">
                <p className="text-[0.62rem] font-semibold text-ink-800">Recent activity</p>
                <ul className="mt-2 space-y-2">
                  {[
                    { l: "PO-1042", s: "Approved", c: "bg-emerald-50 text-emerald-700", d: "bg-emerald-500" },
                    { l: "Payroll · Oct", s: "Processing", c: "bg-amber-50 text-amber-700", d: "bg-amber-500" },
                    { l: "GRN-221", s: "Received", c: "bg-sky-50 text-sky-700", d: "bg-sky-500" },
                    { l: "INV-3307", s: "Paid", c: "bg-violet-50 text-violet-700", d: "bg-violet-500" },
                  ].map((r) => (
                    <li key={r.l} className="flex items-center gap-1.5 text-[0.56rem]">
                      <span className={`size-1.5 shrink-0 rounded-full ${r.d}`} />
                      <span className="font-medium text-ink-700">{r.l}</span>
                      <span className={`ml-auto rounded px-1.5 py-0.5 font-semibold ${r.c}`}>{r.s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`absolute -bottom-7 -left-8 flex w-56 animate-float items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-ink-100 max-sm:hidden ${floatShadow}`}>
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-[0.65rem] font-bold text-white">RA</span>
        <div className="min-w-0">
          <p className="text-[0.66rem] font-semibold text-ink-900">Leave request</p>
          <p className="text-[0.58rem] text-ink-500">Annual leave · 3 days</p>
        </div>
        <span className="ml-auto inline-flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="size-3.5" strokeWidth={3} />
        </span>
      </div>
      <div className={`absolute -top-6 -right-6 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 ring-1 ring-ink-100 max-sm:hidden ${floatShadow}`}>
        <span className="inline-flex size-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <TriangleAlert className="size-4" />
        </span>
        <div>
          <p className="text-[0.64rem] font-semibold text-ink-900">Low stock alert</p>
          <p className="text-[0.56rem] text-ink-500">12 items below reorder level</p>
        </div>
      </div>
    </div>
  );
}

export function AiVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[36rem]" aria-hidden="true">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-violet-300/50 via-fuchsia-200/40 to-sky-200/50 blur-2xl" />
      <div className={`overflow-hidden rounded-2xl bg-ink-950 ring-1 ring-white/10 ${shadow}`}>
        <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-3.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-sky-500 text-white">
            <Sparkles className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">4axiz AI Assistant</p>
            <p className="flex items-center gap-1.5 text-[0.62rem] text-emerald-400">
              <span className="size-1.5 animate-pulse-soft rounded-full bg-emerald-400" /> Connected to ERP · Finance
            </p>
          </div>
          <span className="ml-auto rounded-full bg-white/10 px-2.5 py-1 text-[0.58rem] text-ink-300">Private &amp; secure</span>
        </div>
        <div className="space-y-3.5 p-5">
          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-brand-500 px-3.5 py-2.5 text-[0.74rem] text-white">
            Which supplier invoices are due this week?
          </div>
          <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-white/[0.07] px-3.5 py-3 text-[0.72rem] text-ink-200">
            3 invoices are due this week, totalling <span className="font-semibold text-white">৳ 4,85,000</span>:
            <ul className="mt-2.5 space-y-1.5">
              {[
                { n: "Rahman Traders", a: "৳ 2,10,000", d: "Thu", c: "bg-sky-400" },
                { n: "Delta Supplies Ltd", a: "৳ 1,55,000", d: "Fri", c: "bg-violet-400" },
                { n: "Green Packaging", a: "৳ 1,20,000", d: "Sun", c: "bg-emerald-400" },
              ].map((r) => (
                <li key={r.n} className="flex items-center gap-2 rounded-lg bg-white/[0.05] px-2.5 py-1.5">
                  <span className={`size-1.5 rounded-full ${r.c}`} />
                  <span className="text-ink-100">{r.n}</span>
                  <span className="ml-auto font-semibold text-white">{r.a}</span>
                  <span className="w-7 text-right text-ink-400">{r.d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Draft payment run", "Email reminders", "Open AP report"].map((t) => (
              <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-[0.62rem] text-ink-300">
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2.5 text-[0.66rem] text-ink-400 ring-1 ring-white/10">
            Ask anything about your business…
            <span className="ml-auto inline-flex size-6 items-center justify-center rounded-lg bg-brand-500 text-white">
              <ArrowUpRight className="size-3.5" />
            </span>
          </div>
        </div>
      </div>
      <div className={`absolute -right-8 -bottom-12 w-60 animate-float rounded-2xl bg-white p-4 ring-1 ring-ink-100 max-sm:hidden ${floatShadow}`}>
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
            <FileText className="size-4" />
          </span>
          <div>
            <p className="text-[0.68rem] font-semibold text-ink-900">invoice_3307.pdf</p>
            <p className="text-[0.56rem] text-ink-500">Scanned just now</p>
          </div>
        </div>
        <dl className="mt-3 space-y-1.5 text-[0.62rem]">
          {[
            ["Vendor", "Rahman Traders"],
            ["Amount", "৳ 2,10,000"],
            ["Due date", "17 Oct"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between">
              <dt className="text-ink-500">{k}</dt>
              <dd className="font-semibold text-ink-900">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1.5 text-[0.6rem] font-semibold text-emerald-700">
          <CheckCircle2 className="size-3.5" /> Extracted · ready for approval
        </p>
      </div>
    </div>
  );
}

export function AppsVisual() {
  const products = [
    { I: Headphones, n: "Wireless Headphones", p: "৳ 3,450", bg: "from-sky-100 to-sky-200", c: "text-sky-600", r: 5 },
    { I: Watch, n: "Smart Watch", p: "৳ 5,990", bg: "from-violet-100 to-violet-200", c: "text-violet-600", r: 4 },
    { I: Shirt, n: "Cotton T-Shirt", p: "৳ 890", bg: "from-amber-100 to-amber-200", c: "text-amber-600", r: 5 },
    { I: Camera, n: "Action Camera", p: "৳ 12,500", bg: "from-emerald-100 to-emerald-200", c: "text-emerald-600", r: 4 },
  ];
  return (
    <div className="relative mx-auto w-full max-w-[40rem] pb-8" aria-hidden="true">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-emerald-200/50 via-sky-200/50 to-violet-200/50 blur-2xl" />
      <div className={`overflow-hidden rounded-2xl bg-white ring-1 ring-ink-200/70 ${shadow}`}>
        <WindowBar url="shop.example.com" />
        <div className="p-4">
          <div className="flex items-center gap-4">
            <span className="text-[0.8rem] font-extrabold text-ink-900">
              Shop<span className="text-brand-500">Now</span>
            </span>
            <nav className="flex gap-3 text-[0.6rem] font-medium text-ink-500 max-sm:hidden">
              <span className="text-ink-900">Home</span>
              <span>Electronics</span>
              <span>Fashion</span>
              <span>Offers</span>
            </nav>
            <span className="ml-auto flex h-6 items-center gap-1 rounded-md bg-ink-50 px-2 text-[0.56rem] text-ink-400">
              <Search className="size-3" /> Search products
            </span>
            <span className="relative">
              <ShoppingCart className="size-4 text-ink-700" />
              <span className="absolute -top-1.5 -right-1.5 inline-flex size-3.5 items-center justify-center rounded-full bg-brand-500 text-[0.45rem] font-bold text-white">3</span>
            </span>
          </div>
          <div className="mt-3 flex items-center overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-indigo-500 to-sky-500 p-4">
            <div>
              <p className="text-[0.55rem] font-semibold tracking-wider text-white/70 uppercase">Mega Sale</p>
              <p className="mt-0.5 text-[1rem] leading-tight font-extrabold text-white">Up to 40% off</p>
              <p className="text-[0.6rem] text-white/80">On electronics &amp; accessories</p>
              <span className="mt-2 inline-block rounded-md bg-amber-300 px-2.5 py-1 text-[0.58rem] font-bold text-ink-900">Shop now</span>
            </div>
            <div className="relative ml-auto flex size-20 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-white/20" />
              <Headphones className="relative size-10 text-white" />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2.5">
            {products.map(({ I, n, p, bg, c, r }) => (
              <div key={n} className="overflow-hidden rounded-xl ring-1 ring-ink-100">
                <div className={`flex aspect-square items-center justify-center bg-gradient-to-br ${bg}`}>
                  <I className={`size-8 ${c}`} />
                </div>
                <div className="p-2">
                  <p className="truncate text-[0.56rem] font-semibold text-ink-800">{n}</p>
                  <div className="mt-0.5 flex items-center justify-between">
                    <span className="text-[0.6rem] font-bold text-ink-900">{p}</span>
                    <span className="flex text-amber-400">
                      {Array.from({ length: r }).map((_, s) => (
                        <Star key={s} className="size-2 fill-current" />
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phone: order tracking */}
      <div className="absolute -right-3 -bottom-4 w-40 rounded-[1.8rem] border-[5px] border-ink-900 bg-white p-2.5 shadow-[0_30px_60px_-20px_rgb(18_21_23/0.55)] sm:-right-10">
        <div className="mx-auto h-1.5 w-10 rounded-full bg-ink-900" />
        <p className="mt-2.5 text-[0.62rem] font-bold text-ink-900">Order #4821</p>
        <p className="text-[0.52rem] text-ink-500">Arriving today</p>
        <ol className="mt-2.5 space-y-2">
          {[
            { I: CheckCircle2, l: "Confirmed", done: true },
            { I: PackageCheck, l: "Packed", done: true },
            { I: Truck, l: "Out for delivery", done: true },
            { I: Check, l: "Delivered", done: false },
          ].map(({ I, l, done }) => (
            <li key={l} className="flex items-center gap-1.5 text-[0.55rem]">
              <span className={`inline-flex size-4 items-center justify-center rounded-full ${done ? "bg-emerald-500 text-white" : "bg-ink-100 text-ink-400"}`}>
                <I className="size-2.5" />
              </span>
              <span className={done ? "font-medium text-ink-800" : "text-ink-400"}>{l}</span>
            </li>
          ))}
        </ol>
        <span className="mt-3 block rounded-lg bg-ink-900 py-1.5 text-center text-[0.52rem] font-semibold text-white">Track on map</span>
      </div>
      <div className={`absolute top-[45%] -left-8 flex items-center gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-ink-100 max-sm:hidden ${floatShadow}`}>
        <span className="inline-flex size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="size-4" />
        </span>
        <div>
          <p className="text-[0.6rem] font-semibold text-ink-900">Payment received</p>
          <p className="text-[0.52rem] text-ink-500">bKash · ৳ 5,990</p>
        </div>
      </div>
    </div>
  );
}
