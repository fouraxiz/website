import Image from "next/image";
import { CopyTitle } from "@/components/ui/Section";
import { getClients, type SectionEntry } from "@/lib/cms/content";

/** Client logo strip — renders only when client logos have been added. */
export async function ClientsSection({ copy }: { copy: SectionEntry }) {
  const clients = await getClients();
  if (clients.length === 0) return null;
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="clients-heading">
      <div className="container-site">
        <div className="text-center">
          {copy.eyebrow && (
            <p className="eyebrow justify-center">
              <span className="h-px w-6 bg-current" aria-hidden="true" />
              {copy.eyebrow}
            </p>
          )}
          <h2 id="clients-heading" className="mt-4 text-3xl leading-tight font-bold tracking-tight sm:text-[2.4rem]">
            <CopyTitle title={copy.title} highlight={copy.highlight} />
          </h2>
          {copy.description && <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600">{copy.description}</p>}
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-3">
          {clients.map((c) => {
            const logo = (
              <Image
                src={c.logo}
                alt={c.name}
                width={160}
                height={64}
                className="max-h-14 w-auto max-w-[80%] object-contain grayscale-[60%] transition duration-300 group-hover:scale-105 group-hover:grayscale-0"
                unoptimized
              />
            );
            const cls = "group flex h-24 items-center justify-center rounded-2xl bg-white ring-1 ring-ink-200/70 transition hover:shadow-[var(--shadow-soft)] hover:ring-ink-300";
            return (
              <li key={c._id} title={c.name} className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.5625rem)] lg:w-[calc(16.666%-0.625rem)]">
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className={cls}>
                    {logo}
                  </a>
                ) : (
                  <div className={cls}>{logo}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
