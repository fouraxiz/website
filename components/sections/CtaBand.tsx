import { Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { getSettings } from "@/lib/cms/content";

export async function CtaBand({
  title = "Want to build something great together?",
  description = "Tell us about your goals. We'll respond with practical next steps — a product demo, a discovery workshop or a scoped proposal.",
  primary = { label: "Request a Quote", href: "/contact" },
  secondary = { label: "View our work", href: "/projects" },
}: {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  const site = await getSettings();
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="cta-heading">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
          <div className="absolute -top-24 -right-16 size-80 rounded-full bg-accent-500/40 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-28 left-1/3 size-72 rounded-full bg-ink-500/30 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-20 -left-16 size-56 rounded-full bg-brand-500/25 blur-3xl" aria-hidden="true" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 id="cta-heading" className="text-3xl leading-tight font-bold tracking-tight text-balance text-white sm:text-[2.6rem]">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-300">{description}</p>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={primary.href} size="lg" arrow>
                  {primary.label}
                </ButtonLink>
                {secondary && (
                  <ButtonLink href={secondary.href} variant="outline-inverse" size="lg">
                    {secondary.label}
                  </ButtonLink>
                )}
              </div>
              {site.phone && (
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white">
                  <Phone className="size-4 text-brand-400" aria-hidden="true" /> Hotline 24/7: <span className="font-semibold text-white">{site.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
