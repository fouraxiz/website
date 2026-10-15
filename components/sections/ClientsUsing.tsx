import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getClients, getEngagements } from "@/lib/cms/content";

const norm = (s: string) => s.toLowerCase().replace(/\(.*?\)|pvt|ltd|limited|bangladesh|foundation|group|&|[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
const same = (a: string, b: string) => {
  const x = norm(a);
  const y = norm(b);
  return Boolean(x && y) && (x === y || x.includes(y) || y.includes(x));
};

/**
 * "Clients using this product / service": organisations whose logo or engagement
 * record is tagged with it (tag them in edit mode when adding a client logo).
 */
export async function ClientsUsing({ kind, slug, name, tone = "white" }: { kind: "products" | "services"; slug: string; name: string; tone?: "white" | "muted" }) {
  const [clients, engagements] = await Promise.all([getClients(), getEngagements()]);
  const withLogo = clients.filter((c) => c[kind].includes(slug));
  const textOnly = engagements.filter((e) => e[kind].includes(slug) && !withLogo.some((c) => same(c.name, e.client)));
  if (withLogo.length + textOnly.length === 0) return null;
  const years = (client: string) => engagements.find((e) => same(e.client, client))?.years;
  const label = kind === "products" ? "using" : "we delivered this to";

  return (
    <Section tone={tone} labelledBy="used-by">
      <SectionHeading
        eyebrow="Clients"
        id="used-by"
        title={kind === "products" ? `Organisations using ${name}.` : `Who we've delivered ${name} for.`}
        description={`${withLogo.length + textOnly.length} client${withLogo.length + textOnly.length === 1 ? "" : "s"} ${label}.`}
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {withLogo.map((c) => (
          <li key={c._id} className="flex flex-col items-center rounded-2xl bg-white p-6 text-center ring-1 ring-ink-200/70 transition hover:shadow-[var(--shadow-soft)]">
            <span className="flex h-20 w-full items-center justify-center">
              <Image src={c.logo} alt="" width={160} height={64} className="max-h-16 w-auto max-w-[80%] object-contain" unoptimized />
            </span>
            <span className="mt-3 text-sm font-semibold text-ink-900">{c.name}</span>
            {years(c.name) && <span className="mt-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-800">{years(c.name)}</span>}
          </li>
        ))}
        {textOnly.map((e) => (
          <li key={e._id} className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 text-center ring-1 ring-ink-200/70">
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-ink-100 font-display text-lg font-bold text-ink-700" aria-hidden="true">
              {e.client.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()}
            </span>
            <span className="mt-3 text-sm font-semibold text-ink-900">{e.client}</span>
            {e.years && <span className="mt-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-800">{e.years}</span>}
          </li>
        ))}
      </ul>
      <Link href="/clients" className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800">
        Full client record <ArrowUpRight className="size-4" aria-hidden="true" />
      </Link>
    </Section>
  );
}
