import { Suspense } from "react";
import { Clock, MessageSquare, Presentation } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { OfficeCards } from "@/components/sections/OfficeCards";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { pageMetadata } from "@/lib/metadata";
import { hues, hueAt } from "@/lib/palette";
import { getInterestGroups } from "@/lib/contact-options";
import { getEngagementModels, getErpModules, getOffices, getProducts, getSection, getSettings } from "@/lib/cms/content";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact 4axiz IT Limited about ERP, MIS & MEAL, AI, custom software, web and mobile projects. Head office in Mirpur 12, Dhaka; +880 1718 837 689; admin@4axiz.com.",
  path: "/contact",
});

const expectations = [
  { icon: MessageSquare, title: "A real conversation", text: "Your inquiry is read by people who understand software projects — not an automated sales sequence." },
  { icon: Presentation, title: "Demos on request", text: "Ask for a walkthrough of 4axiz ERP or our products using scenarios from your own operations." },
  { icon: Clock, title: "Clear next steps", text: "We'll suggest a practical next step: a call, a discovery workshop or a scoped proposal." },
];

export default async function ContactPage() {
  const [offices, site, publishedErpModules, products, copy, interestGroups, engagement] = await Promise.all([
    getOffices(),
    getSettings(),
    getErpModules(),
    getProducts(),
    getSection("page.contact"),
    getInterestGroups(),
    getEngagementModels(),
  ]);
  const contextLabels = {
    module: Object.fromEntries(publishedErpModules.map((m) => [m.slug, m.title])),
    product: Object.fromEntries(products.map((p) => [p.slug, p.name])),
  };

  return (
    <>
      <PageHero
        edit={[
          { label: "Heading", collection: "sections", slug: "page.contact" },
          { label: "Offices", collection: "offices" },
          { label: "Contact details", collection: "settings", slug: "site" },
          { label: "Ways to engage", collection: "engagement" },
          { label: "Registration & banking", collection: "settings", slug: "site" },
        ]}
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
                {site.secondaryEmail && (
                  <>
                    {" · "}
                    <a href={`mailto:${site.secondaryEmail}`} className="font-semibold text-brand-700">
                      {site.secondaryEmail}
                    </a>
                  </>
                )}
                {site.websites && (
                  <>
                    <br />
                    Websites: <span className="font-semibold text-ink-900">{site.websites}</span>
                  </>
                )}
                {site.teamsId && (
                  <>
                    <br />
                    Microsoft Teams: <span className="font-semibold text-ink-900">{site.teamsId}</span>
                  </>
                )}
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

      {engagement.length > 0 && (
        <Section tone="muted" labelledBy="engage-heading">
          <SectionHeading
            eyebrow="Work with us"
            id="engage-heading"
            title="Flexible ways to engage."
            description="Not sure which fits? Send us the problem in a paragraph. We will tell you which model we would use and why — before any proposal."
          />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {engagement.map((m, i) => (
              <li key={m._id} className="rounded-3xl bg-white p-6 shadow-[var(--shadow-soft)] ring-1 ring-ink-100">
                <span className={`font-display text-sm font-bold ${hues[hueAt(i)].text}`}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{m.description}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {(() => {
        const reg = [
          { label: "Legal name", value: site.legalName },
          { label: "Registered address", value: offices[0]?.address ?? null },
          { label: "Date of establishment", value: site.established },
          { label: "Certificate of incorporation", value: site.incorporationNo },
          { label: "Trade licence number", value: site.tradeLicence },
          { label: "VAT registration number", value: site.vatNo },
          { label: "TIN", value: site.tin },
          { label: "BASIS membership number", value: site.basisMembership },
          { label: "Office setup", value: site.officeSetup },
          { label: "Connectivity", value: site.connectivity },
        ].filter((r): r is { label: string; value: string } => Boolean(r.value));
        const bank = site.showBankDetails
          ? [
              { label: "Account name", value: site.bankAccountName },
              { label: "Bank", value: site.bankName },
              { label: "Branch", value: site.bankBranch },
              { label: "Account number", value: site.bankAccountNo },
              { label: "Routing number", value: site.bankRouting },
              { label: "SWIFT code", value: site.bankSwift },
            ].filter((r): r is { label: string; value: string } => Boolean(r.value))
          : [];
        if (reg.length === 0 && bank.length === 0) return null;
        return (
          <Section labelledBy="annex">
            <SectionHeading
              eyebrow="Corporate annex"
              id="annex"
              title="Registration, tax & banking details."
              description="Provided for procurement, tender and due-diligence purposes. Supporting certificates are available on request."
            />
            <div className={`mt-12 grid gap-5 ${bank.length ? "lg:grid-cols-2" : ""}`}>
              {[
                { title: "Registration", rows: reg },
                { title: "Banking", rows: bank },
              ]
                .filter((t) => t.rows.length > 0)
                .map((t) => (
                  <div key={t.title} className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink-200/70">
                    <h3 className="bg-ink-950 px-6 py-4 text-xs font-semibold tracking-[0.12em] text-ink-300 uppercase">{t.title}</h3>
                    <dl className="divide-y divide-ink-100">
                      {t.rows.map((r) => (
                        <div key={r.label} className="grid gap-1 px-6 py-3.5 text-sm sm:grid-cols-[12rem_1fr]">
                          <dt className="text-ink-500">{r.label}</dt>
                          <dd className="font-medium text-ink-900">{r.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
            </div>
          </Section>
        );
      })()}

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
