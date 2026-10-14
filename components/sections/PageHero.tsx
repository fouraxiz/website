import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { cn } from "@/lib/utils";

/** Shared hero for inner pages: breadcrumbs, heading, intro, optional actions and aside visual. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  description,
  actions,
  aside,
  children,
  className,
}: {
  crumbs: Crumb[];
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden border-b border-ink-100 bg-gradient-to-b from-ink-50 to-white", className)}>
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-site relative pt-10 pb-16 sm:pt-12 sm:pb-20">
        <Breadcrumbs items={crumbs} />
        <div className={cn("mt-10 grid items-center gap-12", aside && "lg:grid-cols-[1.05fr_1fr]")}>
          <div className="max-w-2xl">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h1 className="text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl">{title}</h1>
            {description && <p className="mt-5 text-lg leading-relaxed text-pretty text-ink-500">{description}</p>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
            {children}
          </div>
          {aside && <div className="relative">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
