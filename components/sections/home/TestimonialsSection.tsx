import { Quote } from "lucide-react";
import { CopyTitle, SectionHeading } from "@/components/ui/Section";
import { getTestimonials } from "@/lib/cms/content";
import type { SectionEntry } from "@/lib/cms/content";

/** Renders only when approved testimonials exist (see data/testimonials.ts). */
export async function TestimonialsSection({ copy }: { copy: SectionEntry }) {
  const approvedTestimonials = await getTestimonials();
  if (approvedTestimonials.length === 0) return null;
  return (
    <section className="bg-ink-50 py-20 sm:py-28" aria-labelledby="testimonials-heading">
      <div className="container-site">
        <SectionHeading eyebrow={copy.eyebrow ?? undefined} id="testimonials-heading" title={<CopyTitle title={copy.title} highlight={copy.highlight} />} align="center" />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {approvedTestimonials.map((t) => (
            <li key={t.id}>
              <figure className="flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-7">
                <Quote className="size-6 text-brand-300" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 leading-relaxed text-ink-700">“{t.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-ink-100 pt-4 text-sm">
                  <span className="block font-semibold text-ink-900">{t.name}</span>
                  <span className="text-ink-500">
                    {t.title}, {t.organisation}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
