import Link from "next/link";
import { Icon } from "@/lib/icons";
import type { ErpModule } from "@/types";

/**
 * ERP ecosystem diagram: modules arranged around a shared data core.
 * Desktop renders an orbital layout with connector lines; smaller screens get
 * a clean grid. Every module node is a real link to its module page.
 */
export function ErpEcosystem({ modules }: { modules: ErpModule[] }) {
  const n = modules.length;
  const nodes = modules.map((m, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { m, x: 50 + Math.cos(angle) * 41, y: 50 + Math.sin(angle) * 40 };
  });

  return (
    <div>
      {/* Desktop orbital layout */}
      <div className="relative mx-auto hidden aspect-[1.45] max-w-5xl lg:block">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
          <ellipse cx="50" cy="50" rx="41" ry="40" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="0.15" />
          <ellipse cx="50" cy="50" rx="24" ry="24" fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth="0.15" />
          {nodes.map(({ m, x, y }) => (
            <line
              key={m.slug}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="rgb(142 170 255 / 0.28)"
              strokeWidth="0.18"
              strokeDasharray="0.8 0.8"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="absolute top-1/2 left-1/2 w-60 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-brand-700/90 p-6 text-center shadow-[0_0_80px_-10px_rgb(58_92_243/0.7)] backdrop-blur">
          <span className="mx-auto inline-flex size-11 items-center justify-center rounded-xl bg-white text-brand-700">
            <Icon name="boxes" className="size-5" />
          </span>
          <p className="mt-3 font-display text-lg font-bold text-white">4axiz ERP</p>
          <p className="mt-1 text-xs leading-relaxed text-brand-100">One shared data model. Every module connected.</p>
        </div>

        <ul>
          {nodes.map(({ m, x, y }) => (
            <li key={m.slug} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
              <Link
                href={`/solutions/erp/${m.slug}`}
                className="group flex w-40 items-center gap-2.5 rounded-xl border border-white/10 bg-ink-900/90 px-3 py-2.5 backdrop-blur transition-colors hover:border-brand-400/60 hover:bg-ink-800"
              >
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-brand-300 group-hover:text-white [&_svg]:size-4">
                  <Icon name={m.icon} />
                </span>
                <span className="text-[0.8rem] leading-tight font-medium text-ink-200 group-hover:text-white">{m.shortTitle}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile / tablet grid */}
      <div className="lg:hidden">
        <div className="mb-4 rounded-xl border border-white/15 bg-brand-700 p-5">
          <p className="font-display text-lg font-bold text-white">4axiz ERP</p>
          <p className="mt-1 text-sm text-brand-100">One shared data model. Every module connected.</p>
        </div>
        <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {modules.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/solutions/erp/${m.slug}`}
                className="flex h-full items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-ink-200 hover:border-brand-400/60 hover:text-white"
              >
                <Icon name={m.icon} className="size-4 shrink-0 text-brand-300" />
                {m.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
