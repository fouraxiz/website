import { Briefcase, MapPin } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { pageMetadata } from "@/lib/metadata";
import { careerBenefits, jobOpenings } from "@/data/careers";
import { companyValues } from "@/data/site";

export const metadata = pageMetadata({
  title: "Careers",
  description: "Build enterprise software, ERP platforms and AI solutions with 4axiz IT Limited. Explore open roles and how we work.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        decor={{ icons: ["code", "palette", "users", "globe", "trending-up"], center: "rocket" }}
        crumbs={[{ label: "Company", href: "/about" }, { label: "Careers" }]}
        eyebrow="Careers"
        title="Build software that organisations rely on."
        description="Join a team working on ERP platforms, AI integrations and custom applications for clients across markets."
        actions={
          <ButtonLink href="#openings" arrow>
            View open roles
          </ButtonLink>
        }
      />

      <Section labelledBy="why-join">
        <SectionHeading eyebrow="Why join us" id="why-join" title="What working at 4axiz offers." />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {careerBenefits.map((b) => (
            <li key={b.title} className="rounded-[var(--radius-card)] border border-ink-200 p-6">
              <h3 className="font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{b.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted" id="openings" labelledBy="openings-heading">
        <SectionHeading eyebrow="Open positions" id="openings-heading" title="Current openings." />
        {jobOpenings.length > 0 ? (
          <ul className="mt-10 divide-y divide-ink-200 rounded-[var(--radius-card)] border border-ink-200 bg-white">
            {jobOpenings.map((j) => (
              <li key={j.id} className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{j.title}</h3>
                  <p className="mt-1 text-sm text-ink-500">{j.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm text-ink-500">
                    <Badge>
                      <Briefcase className="size-3" aria-hidden="true" /> {j.department}
                    </Badge>
                    <Badge>
                      <MapPin className="size-3" aria-hidden="true" /> {j.location}
                    </Badge>
                    <Badge>{j.type}</Badge>
                  </div>
                </div>
                <ButtonLink href={j.applyUrl} size="sm" variant="secondary">
                  Apply
                </ButtonLink>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 rounded-[var(--radius-card)] border border-dashed border-ink-300 bg-white px-6 py-14 text-center">
            <Briefcase className="mx-auto size-8 text-ink-300" aria-hidden="true" />
            <p className="mt-4 font-display text-lg font-semibold text-ink-900">No open positions right now</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
              We&apos;re always glad to hear from talented people. Introduce yourself and tell us what you&apos;d like to work on.
            </p>
            <ButtonLink href="/contact?interest=careers" className="mt-6" size="sm">
              Send a speculative application
            </ButtonLink>
          </div>
        )}
      </Section>

      <Section labelledBy="culture">
        <SectionHeading eyebrow="Culture" id="culture" title="How we work together." />
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {companyValues.map((v) => (
            <li key={v.title} className="border-t-2 border-brand-600 pt-5">
              <h3 className="font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Don't see the right role?"
        description="Send us a note about your experience and interests. We'll keep it on file for future openings."
        primary={{ label: "Get in touch", href: "/contact?interest=careers" }}
        secondary={{ label: "Meet the team", href: "/team" }}
      />
    </>
  );
}
