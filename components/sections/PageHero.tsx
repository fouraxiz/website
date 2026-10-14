import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { HeroDecor } from "@/components/visuals/HeroDecor";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types";

/** Shared banner for inner pages: colourful soft background, breadcrumbs, heading, intro, actions, optional visual. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  description,
  actions,
  aside,
  children,
  className,
  decor,
}: {
  crumbs: Crumb[];
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  /** Icons for the decorative banner visual, shown when no `aside` is given. */
  decor?: { icons: IconName[]; center?: IconName };
}) {
  const side = aside ?? (decor ? <HeroDecor icons={decor.icons} center={decor.center} /> : null);
  return (
    <section className={cn("relative overflow-hidden bg-ink-50", className)}>
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-32 -right-24 size-[30rem] rounded-full bg-gradient-to-br from-violet-200/60 via-sky-200/40 to-transparent blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 size-[24rem] rounded-full bg-brand-100/70 blur-3xl" aria-hidden="true" />
      <svg className="pointer-events-none absolute bottom-10 left-[46%] hidden size-28 text-ink-300/60 lg:block" viewBox="0 0 100 100" aria-hidden="true">
        {Array.from({ length: 36 }).map((_, i) => (
          <circle key={i} cx={8 + (i % 6) * 17} cy={8 + Math.floor(i / 6) * 17} r="2.2" fill="currentColor" />
        ))}
      </svg>
      <div className="container-site relative pt-10 pb-16 sm:pt-12 sm:pb-20">
        <Breadcrumbs items={crumbs} />
        <div className={cn("mt-10 grid items-center gap-12", side && "lg:grid-cols-[1.05fr_1fr]")}>
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold tracking-wide text-brand-600 shadow-sm ring-1 ring-ink-200 uppercase">
                {eyebrow}
              </p>
            )}
            <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl">{title}</h1>
            {description && <p className="mt-5 text-lg leading-relaxed text-pretty text-ink-600">{description}</p>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
            {children}
          </div>
          {side && <div className="relative">{side}</div>}
        </div>
      </div>
    </section>
  );
}
