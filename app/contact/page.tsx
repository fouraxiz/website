import { Suspense } from "react";
import { Clock, MessageSquare, Presentation } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { OfficeCards } from "@/components/sections/OfficeCards";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { pageMetadata } from "@/lib/metadata";
import { hues, hueAt } from "@/lib/palette";
import { getInterestGroups } from "@/lib/contact-options";
import { getErpModules, getOffices, getProducts, getSection, getSettings } from "@/lib/cms/content";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact 4axiz IT Limited about ERP, AI, custom software, web and mobile projects. Offices in Bangladesh, New Zealand and Kosovo.",
  path: "/contact",
});

const expectations = [
  { icon: MessageSquare, title: "A real conversation", text: "Your inquiry is read by people who understand software projects — not an automated sales sequence." },
  { icon: Presentation, title: "Demos on request", text: "Ask for a walkthrough of 4axiz ERP or our products using scenarios from your own operations." },
  { icon: Clock, title: "Clear next steps", text: "We'll suggest a practical next step: a call, a discovery workshop or a scoped proposal." },
];

export default async function ContactPage() {
  const [offices, site, publishedErpModules, products, copy, interestGroups] = await Promise.all([
    getOffices(),
    getSettings(),
    getErpModules(),
    getProducts(),
    getSection("page.contact"),
    getInterestGroups(),
  ]);
  const contextLabels = {
    module: Object.fromEntries(publishedErpModules.map((m) => [m.slug, m.title])),
    product: Object.fromEntries(products.map((p) => [p.slug, p.name])),
  };

  return (
    <>
      <PageHero
        edit={[{ label: "Heading", collection: "sections", slug: "page.contact" }, { label: "Offices", collection: "offices" }, { label: "Contact details", collection: "settings", slug: "site" }]}
        decor={{ icons: ["message-square", "headset", "globe", "file-text", "sparkles"], center: "message-square" }}
        crumbs={[{ label: "Company", href: "/about" }, { label: "Contact Us" }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">What to expect</h2>
            <ul className="mt-8 space-y-7">
              {expectations.map(({ icon: I, title, text }, idx) => (
                <li key={title} className="flex gap-4">
                  <span className={`inline-flex size-12 shrink-0 items-center justify-center rounded-xl text-white ${hues[hueAt(idx + 1)].solid}`}>
                    <I className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
            {site.email && (
              <p className="mt-10 text-sm text-ink-600">
                Prefer email?{" "}
                <a href={`mailto:${site.email}`} className="font-semibold text-brand-700">
                  {site.email}
                </a>
              </p>
            )}
          </div>
          <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-[var(--shadow-soft)] sm:p-10">
            <h2 className="sr-only">Contact form</h2>
            <Suspense fallback={<div className="h-[40rem] animate-pulse rounded-xl bg-ink-50" aria-label="Loading form" />}>
              <ContactForm interestGroups={interestGroups} contextLabels={contextLabels} fallbackEmail={site.email} />
            </Suspense>
          </div>
        </div>
      </Section>

      <Section tone="muted" id="offices" labelledBy="offices-heading">
        <SectionHeading
          eyebrow="Our offices"
          id="offices-heading"
          title={offices.map((o) => o.country).join(", ").replace(/, ([^,]*)$/, " and $1") + "."}
          description="Each office has its own contact details."
        />
        <div className="mt-12">
          <OfficeCards offices={offices} />
        </div>
      </Section>
    </>
  );
}
