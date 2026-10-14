import Image from "next/image";
import { CopyTitle } from "@/components/ui/Section";
import { getClients, type SectionEntry } from "@/lib/cms/content";

/** Client logo strip — renders only when client logos have been added. */
export async function ClientsSection({ copy }: { copy: SectionEntry }) {
  const clients = await getClients();
  if (clients.length === 0) return null;
  return (
    <section className="border-y border-ink-100 bg-white py-14" aria-labelledby="clients-heading">
      <div className="container-site">
        <h2 id="clients-heading" className="text-center text-sm font-semibold tracking-[0.14em] text-ink-500 uppercase">
          <CopyTitle title={copy.title} highlight={copy.highlight} />
        </h2>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {clients.map((c) => {
            const logo = <Image src={c.logo} alt={c.name} width={160} height={56} className="h-12 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" unoptimized />;
            return (
              <li key={c._id}>
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer">
                    {logo}
                  </a>
                ) : (
                  logo
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
