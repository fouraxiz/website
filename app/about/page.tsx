import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { TechSection } from "@/components/sections/home/TechSection";
import { StatsStrip } from "@/components/sections/home/StatsStrip";
import { CtaBand } from "@/components/sections/CtaBand";
import { OfficeCards } from "@/components/sections/OfficeCards";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { TeamPortrait } from "@/components/team/TeamPortrait";
import { Icon } from "@/lib/icons";
import { pageMetadata } from "@/lib/metadata";
import { getOffices, getSettings, getSolutions, getTeam, getValues } from "@/lib/cms/content";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "4axiz IT Limited is a software product and technology services company building ERP, AI and custom digital solutions, with offices in Bangladesh, New Zealand and Kosovo.",
  path: "/about",
});

const reasons = [
  { title: "Products and services under one roof", text: "We bring ready-made platforms where they fit and custom engineering where they don't — without forcing either." },
  { title: "Deep business-process understanding", text: "ERP work teaches you how organisations really run. We apply that understanding to every project." },
  { title: "Long-term partnership", text: "We support, maintain and improve the systems we build, so your investment keeps paying back." },
  { title: "International reach, close collaboration", text: "Teams across three countries give us range, while every engagement keeps a single accountable lead." },
];

export default async function AboutPage() {
  const [site, offices, solutions, team, companyValues] = await Promise.all([getSettings(), getOffices(), getSolutions(), getTeam(), getValues()]);
  const { mission, vision } = site;
  const leadership = team.filter((m) => m.leadership);
  return (
    <>
      <PageHero
        decor={{ icons: ["code", "boxes", "brain", "globe", "users"], center: "layers" }}
        crumbs={[{ label: "Company" }, { label: "About Us" }]}
        eyebrow="About 4axiz"
        title="We build software that helps organisations work with clarity."
        description={`${site.legalName} has served local and global clients since ${site.foundedYear ?? 2010}. We create our own business products — led by the 4axiz ERP platform — and partner with organisations to design and build the custom systems they need.`}
      />

      <StatsStrip />

      <Section labelledBy="who">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Who we are" id="who" title="A product company and an engineering partner." />
          <div className="space-y-5 text-lg leading-relaxed text-ink-600">
            <p>
              Our work sits at the intersection of business operations and technology. We build enterprise software and ERP that connects
              finance, people, procurement and inventory; we design web and mobile applications; and we help organisations adopt AI in ways that
              are practical and responsible.
            </p>
            <p>
              We specialise in cost-effective, creative and high-quality solutions that meet your requirements, stay within budget and are
              delivered on time. Our team works across .NET, PHP, CodeIgniter, CakePHP, Laravel, React, Vue, Flutter, WordPress, Drupal and
              Joomla — on new builds as well as ongoing maintenance and support.
            </p>
            <p>
              We work with organisations across education, retail and e-commerce, financial services, healthcare, development and the public
              sector — from our offices in {offices.map((o) => o.country).join(", ").replace(/, ([^,]*)$/, " and $1")}.
            </p>
          </div>
        </div>
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
          </div>
        </div>
      </Section>

      <Section labelledBy="values">
        <SectionHeading eyebrow="Core values" id="values" title="What guides our work." />
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {companyValues.map((v, i) => (
            <li key={v.title} className="border-t border-ink-200 pt-6">
              <span className="font-display text-sm font-semibold text-brand-600">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted" labelledBy="journey">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Our journey" id="journey" title="What our work has grown into." />
          <div>
            <ul className="grid gap-6 sm:grid-cols-2">
              {[
                { t: "Building business software", d: "Developing products for operations such as point of sale and school management." },
                { t: "Delivering custom platforms", d: "Digital archives, loan management and e-commerce platforms for clients across sectors." },
                { t: "Growing the ERP ecosystem", d: "Connecting finance, people, procurement and inventory into one modular platform." },
                { t: "Expanding internationally", d: "Offices in Bangladesh, New Zealand and Kosovo." },
              ].map((m) => (
                <li key={m.t} className="border-l-2 border-brand-600 pl-4">
                  <h3 className="font-semibold">{m.t}</h3>
                  <p className="mt-1 text-sm text-ink-500">{m.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

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
        <SectionHeading eyebrow="International presence" id="presence" title="Offices in three countries." />
        <div className="mt-12">
          <OfficeCards offices={offices} />
        </div>
      </Section>

      <Section labelledBy="why">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Why 4axiz" id="why" title="Why organisations choose us." />
          <ul className="grid gap-8 sm:grid-cols-2">
            {reasons.map((r) => (
              <li key={r.title}>
                <h3 className="font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="muted" labelledBy="leadership">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Leadership & team" id="leadership" title="The people behind 4axiz." />
          <ButtonLink href="/team" variant="secondary" arrow>
            Meet the team
          </ButtonLink>
        </div>
        {leadership.length > 0 ? (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((m) => (
              <li key={m.id}>
                <TeamPortrait member={m} showBio />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 max-w-2xl text-ink-600">
            Engineers, designers, analysts and support specialists across Bangladesh, New Zealand and Kosovo — meet the people who build and
            support your software.
          </p>
        )}
      </Section>

      <CtaBand />
    </>
  );
}
