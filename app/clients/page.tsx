import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { hues, hueAt } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/metadata";
import { getClientGroups, getClientMix, getClients, getEngagements, getSection } from "@/lib/cms/content";

export const metadata = pageMetadata({
  title: "Clients & Track Record",
  description:
    "4axiz IT Limited's client engagement record: UNDP, MSH, Handicap International, NGO Forum (UNHCR), DGFP, DGHS, Karim Group, Sanofi, Toyota Bangladesh and more — what we built and how long we have been trusted with it.",
  path: "/clients",
});

export default async function ClientsPage() {
  const [engagements, clients, groups, mix, copy] = await Promise.all([getEngagements(), getClients(), getClientGroups(), getClientMix(), getSection("page.clients")]);

  return (
    <>
      <PageHero
        edit={[
          { label: "Heading", collection: "sections", slug: "page.clients" },
          { label: "Engagement record", collection: "engagements" },
          { label: "Client logos", collection: "clients" },
          { label: "Who we work with", collection: "client_groups" },
          { label: "Client mix", collection: "client_mix" },
        ]}
        decor={{ icons: ["landmark", "globe", "heart-handshake", "briefcase", "stethoscope"], center: "users" }}
        crumbs={[{ label: "Company", href: "/about" }, { label: "Clients" }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      {mix.length > 0 && (
        <div className="container-site relative z-10 -mt-8">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink-200 shadow-[var(--shadow-lift)] ring-1 ring-ink-200 lg:grid-cols-4">
            {mix.map((m, i) => (
              <div key={m._id} className="bg-white p-6">
                <dd className={cn("font-display text-3xl font-bold", hues[hueAt(i)].text)}>{m.value}</dd>
                <dt className="mt-1 text-sm text-ink-500">{m.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      )}

      {engagements.length > 0 && (
        <Section labelledBy="record">
          <SectionHeading
            eyebrow="Track record"
            id="record"
            title="Client engagement record."
            description="A client-by-client summary of what 4axiz has built and how long we have been trusted to run it."
          />
          <div className="mt-12 overflow-hidden rounded-3xl bg-white ring-1 ring-ink-200/70">
            <table className="w-full text-left text-sm">
              <thead className="hidden bg-ink-950 text-xs tracking-[0.12em] text-ink-300 uppercase md:table-header-group">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Client</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Scope of work</th>
                  <th scope="col" className="px-6 py-4 text-right font-semibold">Years</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {engagements.map((e) => (
                  <tr key={e._id} className="block p-5 md:table-row md:p-0">
                    <th scope="row" className="block align-top font-semibold text-ink-900 md:table-cell md:w-[26%] md:px-6 md:py-5">
                      {e.href ? (
                        <Link href={e.href} className="inline-flex items-center gap-1 hover:text-brand-700">
                          {e.client} <ArrowUpRight className="size-3.5 text-ink-400" aria-hidden="true" />
                        </Link>
                      ) : (
                        e.client
                      )}
                    </th>
                    <td className="mt-2 block align-top leading-relaxed text-ink-600 md:mt-0 md:table-cell md:px-6 md:py-5">{e.scope}</td>
                    <td className="mt-3 block align-top md:mt-0 md:table-cell md:px-6 md:py-5 md:text-right">
                      <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold whitespace-nowrap text-brand-800">{e.years}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {clients.length > 0 && (
        <Section tone="muted" labelledBy="logos">
          <SectionHeading eyebrow="Clients & partners" id="logos" title="Trusted across sectors." description="Government directorates, UN agencies, international NGOs and corporate groups rely on platforms engineered by 4axiz." />
          <ul className="mt-12 flex flex-wrap justify-center gap-3">
            {clients.map((c) => (
              <li key={c._id} title={c.name} className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.5625rem)] lg:w-[calc(16.666%-0.625rem)]">
                <div className="flex h-24 items-center justify-center rounded-2xl bg-white ring-1 ring-ink-200/70">
                  <Image src={c.logo} alt={c.name} width={160} height={64} className="max-h-14 w-auto max-w-[80%] object-contain" unoptimized />
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {groups.length > 0 && (
        <Section labelledBy="who">
          <SectionHeading eyebrow="Who we work with" id="who" title="A selection of the organisations whose systems we have designed, built or maintain." />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {groups.map((g, i) => (
              <div key={g._id} className="rounded-3xl bg-ink-50 p-7 ring-1 ring-ink-100">
                <h3 className={cn("text-sm font-semibold tracking-[0.12em] uppercase", hues[hueAt(i)].text)}>{g.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-700">{g.names}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-3xl bg-ink-950 p-8 text-white">
            <p className="eyebrow text-brand-300">References available</p>
            <p className="mt-3 text-lg leading-relaxed">
              Contactable references, work orders, completion certificates and performance letters can be provided for tender and due-diligence
              processes on request.
            </p>
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
