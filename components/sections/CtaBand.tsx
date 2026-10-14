import { ButtonLink } from "@/components/ui/Button";

export function CtaBand({
  title = "Have a business challenge? Let's build the right solution.",
  description = "Tell us about your goals and constraints. We'll respond with practical next steps — whether that's a product demo, a discovery workshop or a scoped proposal.",
  primary = { label: "Start Your Project", href: "/contact" },
  secondary = { label: "View our work", href: "/projects" },
}: {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="cta-heading">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-2xl bg-brand-700 px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <div className="bg-grid-dark mask-radial absolute inset-0" aria-hidden="true" />
          <svg className="absolute -right-24 -bottom-24 size-[28rem] text-brand-500/40" viewBox="0 0 200 200" fill="none" aria-hidden="true">
            <circle cx="100" cy="100" r="99" stroke="currentColor" />
            <circle cx="100" cy="100" r="70" stroke="currentColor" />
            <circle cx="100" cy="100" r="41" stroke="currentColor" />
            <path d="M1 100h198M100 1v198" stroke="currentColor" />
          </svg>
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <h2 id="cta-heading" className="text-3xl leading-tight font-bold tracking-tight text-balance text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-brand-100">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href={primary.href} variant="inverse" size="lg" arrow>
                {primary.label}
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} variant="outline-inverse" size="lg">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
