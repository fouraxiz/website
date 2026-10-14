import { ButtonLink } from "@/components/ui/Button";
import { HeroVisual } from "@/components/visuals/HeroVisual";

const pillars = ["ERP platforms", "AI & automation", "Custom software", "Web & mobile"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ink-50 via-white to-white" aria-labelledby="hero-heading">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-site relative grid items-center gap-16 pt-14 pb-24 sm:pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pt-24 lg:pb-32">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-600 shadow-sm">
            <span className="size-1.5 rounded-full bg-accent-500" aria-hidden="true" />
            Software products &amp; technology services
          </p>
          <h1
            id="hero-heading"
            className="mt-6 text-[2.6rem] leading-[1.04] font-extrabold tracking-[-0.035em] text-balance text-ink-950 sm:text-6xl lg:text-[4.1rem]"
          >
            Building intelligent software for a <span className="text-brand-600">smarter business</span> future.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-pretty text-ink-500 sm:text-xl sm:leading-relaxed">
            4axiz helps organisations streamline operations with connected ERP, practical AI and custom digital solutions — designed around
            how your teams really work.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/solutions" size="lg" arrow>
              Explore Our Solutions
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">
              Talk to Our Team
            </ButtonLink>
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink-200/80 pt-6 text-sm text-ink-500">
            {pillars.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-brand-400" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-4 sm:px-10 lg:px-0">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
