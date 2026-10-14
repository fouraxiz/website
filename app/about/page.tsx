import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { TechSection } from "@/components/sections/home/TechSection";
import { OutcomesBand } from "@/components/sections/OutcomesBand";
import { StatsStrip } from "@/components/sections/home/StatsStrip";
import { CtaBand } from "@/components/sections/CtaBand";
import { OfficeCards } from "@/components/sections/OfficeCards";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { TeamPortrait } from "@/components/team/TeamPortrait";
import { Icon } from "@/lib/icons";
import { pageMetadata } from "@/lib/metadata";
import { getMilestones, getOffices, getPillars, getPresenceStats, getSettings, getSolutions, getStrengths, getTeam, getValues } from "@/lib/cms/content";
import { Check } from "lucide-react";
import { hues, hueAt } from "@/lib/palette";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "4axiz IT Limited (est. 2010, BASIS member A337) builds enterprise software, ERP, MIS & MEAL platforms, mobile apps and AI for government, UN agencies, NGOs, INGOs and corporate enterprises.",
  path: "/about",
});

export default async function AboutPage() {
  const [site, offices, solutions, team, companyValues, milestones, strengths, pillars, presenceStats] = await Promise.all([
    getSettings(),
    getOffices(),
    getSolutions(),
    getTeam(),
    getValues(),
    getMilestones(),
    getStrengths(),
    getPillars(),
    getPresenceStats(),
  ]);
  const facts = [
    { label: "Established", value: site.established },
    { label: "Incorporation no.", value: site.incorporationNo },
    { label: "BASIS membership", value: site.basisMembership },
    { label: "Trade licence", value: site.tradeLicence },
    { label: "VAT registration", value: site.vatNo },
    { label: "TIN", value: site.tin },
    { label: "Head office", value: site.officeSetup },
    { label: "Delivery capability", value: site.deliveryCapability },
    { label: "Programme reach", value: site.programmeReach },
    { label: "Connectivity", value: site.connectivity },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));
  const { mission, vision } = site;
  const leadership = team.filter((m) => m.leadership);
  return (
    <>
      <PageHero
        edit={[
          { label: "Mission, vision & company facts", collection: "settings", slug: "site" },
          { label: "Values", collection: "values" },
          { label: "Milestones", collection: "milestones" },
          { label: "Key strengths", collection: "strengths" },
          { label: "Pillars", collection: "pillars" },
          { label: "Presence numbers", collection: "presence_stats" },
          { label: "Team", collection: "team" },
        ]}
        decor={{ icons: ["code", "boxes", "brain", "globe", "users"], center: "layers" }}
        crumbs={[{ label: "Company" }, { label: "About Us" }]}
        eyebrow="About 4axiz"
        title="Sixteen years of engineering for institutions that cannot afford to fail."
        description={`${site.legalName} is a Bangladeshi technology company with a global delivery record. Since ${site.foundedYear ?? 2010} we have delivered enterprise software, ERP platforms, MIS systems, mobile applications and digital transformation programmes for government, UN agencies, NGOs, INGOs and corporate enterprises.`}
      />

      <StatsStrip />

      <Section labelledBy="who">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Who we are" id="who" title="A leading Bangladeshi technology company with a global delivery record." />
          <div className="space-y-5 text-lg leading-relaxed text-ink-600">
            <p>
              {site.legalName} designs, develops and implements innovative, secure and scalable digital solutions for government organisations,
              international development partners, NGOs, INGOs and corporate enterprises — improving operational efficiency, automation,
              transparency and decision-making.
            </p>
            <p>
              Our work spans beneficiary management systems, project monitoring platforms, mobile data collection applications, reporting
              dashboards and cloud-based solutions — from a nationwide TB monitoring system in 800+ upazila health complexes to a mutualised
              platform serving Handicap International operations in more than 180 countries.
            </p>
            <p>
              Our 45 engineers, designers, QA specialists and project managers work from one building in Mirpur 12, Dhaka — with offices in{" "}
              {offices.map((o) => o.country).join(", ").replace(/, ([^,]*)$/, " and $1")}.
            </p>
          </div>
        </div>
        {pillars.length > 0 && (
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <li key={p._id} className="rounded-3xl bg-ink-50 p-7 ring-1 ring-ink-100">
                <span className={cn("block h-1.5 w-10 rounded-full", hues[hueAt(i)].solid)} aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{p.description}</p>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section tone="dark" labelledBy="mission">
        <h2 id="mission" className="sr-only">
          Mission and vision
        </h2>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
          <div className="bg-ink-950 p-8 sm:p-12">
            <p className="eyebrow text-brand-300">Our mission</p>
            <p className="mt-5 font-display text-2xl leading-snug font-semibold text-white">{mission}</p>
          </div>
          <div className="bg-ink-950 p-8 sm:p-12">
            <p className="eyebrow text-accent-300">Our vision</p>
            <p className="mt-5 font-display text-2xl leading-snug font-semibold text-white">{vision}</p>
            {site.trustNote && <p className="mt-5 text-ink-300">{site.trustNote}</p>}
          </div>
        </div>
        {site.practice.length > 0 && (
          <div className="mt-10">
            <h3 className="text-sm font-semibold tracking-[0.14em] text-ink-400 uppercase">What that means in practice</h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {site.practice.map((t) => (
                <li key={t} className="flex gap-3 rounded-2xl bg-white/[0.04] p-5 text-ink-200 ring-1 ring-white/10">
                  <Check className="mt-0.5 size-5 shrink-0 text-emerald-400" strokeWidth={2.5} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <Section labelledBy="values">
        <SectionHeading eyebrow="Core values" id="values" title="What guides our work." />
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {companyValues.map((v, i) => (
            <li key={v.title} className="border-t border-ink-200 pt-6">
              <span className="font-display text-sm font-semibold text-brand-600">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-semibold">{v.title}</h3>
              {v.tagline && <p className="mt-1 text-sm font-medium text-ink-800">{v.tagline}</p>}
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted" labelledBy="journey">
        <SectionHeading eyebrow="Our journey" id="journey" title="Sixteen years in four steps." />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m, i) => (
            <li key={m._id} className="relative rounded-3xl bg-white p-6 shadow-[var(--shadow-soft)] ring-1 ring-ink-100">
              <span className={`font-display text-4xl font-bold ${["text-brand-500", "text-accent-500", "text-sky-500", "text-emerald-500"][i % 4]}`}>{m.year}</span>
              <h3 className="mt-3 font-semibold">{m.title}</h3>
              {m.description && <p className="mt-2 text-sm leading-relaxed text-ink-500">{m.description}</p>}
            </li>
          ))}
        </ol>
      </Section>

      {facts.length > 0 && (
        <Section labelledBy="facts">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <SectionHeading eyebrow="Company facts" id="facts" title="Registered, accredited and accountable." />
              <p className="mt-4 text-ink-500">
                Certificates of incorporation, trade licence, work orders and completion certificates are available on request for tender and
                due-diligence purposes.
              </p>
              {site.basisMembership && (
                <div className="mt-8 inline-flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-ink-200">
                  <Image src="/images/brand/basis.webp" alt="BASIS — Bangladesh Association of Software and Information Services" width={240} height={80} className="h-12 w-auto" unoptimized />
                  <span className="text-sm text-ink-600">
                    Member
                    <br />
                    <span className="font-semibold text-ink-900">{site.basisMembership}</span>
                  </span>
                </div>
              )}
            </div>
            <dl className="grid gap-px overflow-hidden rounded-2xl bg-ink-200 ring-1 ring-ink-200 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className="bg-white p-6">
                  <dt className="text-xs font-semibold tracking-[0.12em] text-ink-400 uppercase">{f.label}</dt>
                  <dd className="mt-2 font-display text-lg leading-snug font-semibold text-ink-900">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>
      )}

      <OutcomesBand />

      <Section labelledBy="expertise">
        <SectionHeading eyebrow="Expertise" id="expertise" title="Capabilities across the software lifecycle." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <Link href="/solutions/erp" className="flex h-full items-center gap-3 rounded-xl border border-ink-200 p-4 font-medium text-ink-800 hover:border-brand-300 hover:text-brand-700">
              <Icon name="boxes" className="size-5 text-brand-600" /> ERP Solutions
            </Link>
          </li>
          {solutions.map((s) => (
            <li key={s.slug}>
              <Link href={s.href} className="flex h-full items-center gap-3 rounded-xl border border-ink-200 p-4 font-medium text-ink-800 hover:border-brand-300 hover:text-brand-700">
                <Icon name={s.icon} className="size-5 text-brand-600" /> {s.shortTitle}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/services" className="flex h-full items-center gap-3 rounded-xl border border-dashed border-ink-300 p-4 font-medium text-brand-700 hover:border-brand-300">
              <Icon name="layers" className="size-5" /> All services
            </Link>
          </li>
        </ul>
      </Section>

      <TechSection />

      <Section tone="muted" labelledBy="presence">
        <SectionHeading
          eyebrow="International presence"
          id="presence"
          title="Three countries. Worldwide impact."
          description="Engineering hubs in Dhaka and Auckland, supported by a commercial presence in the United States, deliver to clients whose programmes span the globe — including Handicap International operations across more than 180 countries."
        />
        {presenceStats.length > 0 && (
          <dl className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {presenceStats.map((st, i) => (
              <div key={st._id} className="rounded-2xl bg-white p-5 ring-1 ring-ink-200/70">
                <dd className={cn("font-display text-3xl font-bold", hues[hueAt(i)].text)}>{st.value}</dd>
                <dt className="mt-1 text-sm text-ink-500">{st.label}</dt>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-8">
          <OfficeCards offices={offices} />
        </div>
      </Section>

      <Section labelledBy="why">
        <SectionHeading eyebrow="Key strengths" id="why" title="What clients consistently buy from 4axiz." />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((r, i) => (
            <li key={r._id} className="rounded-3xl bg-ink-50 p-7 ring-1 ring-ink-100">
              <span className="font-display text-sm font-semibold text-brand-600">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{r.description}</p>
            </li>
          ))}
        </ul>
        {site.strategicFocus && (
          <div className="mt-8 rounded-3xl bg-ink-950 p-8 text-white sm:p-10">
            <p className="eyebrow text-brand-300">Strategic focus</p>
            <p className="mt-4 max-w-4xl font-display text-xl leading-snug font-semibold sm:text-2xl">{site.strategicFocus}</p>
          </div>
        )}
      </Section>

      <Section tone="muted" labelledBy="leadership">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Key personnel" id="leadership" title="The people behind 4axiz." />
          <ButtonLink href="/team" variant="secondary" arrow>
            Meet the team
          </ButtonLink>
        </div>
        {leadership.length > 0 ? (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((m) => (
              <li key={m.id}>
                <TeamPortrait member={m} showBio />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 max-w-2xl text-ink-600">
            Engineers, designers, analysts and support specialists — meet the people who build and support your software.
          </p>
        )}
      </Section>

      <CtaBand />
    </>
  );
}
