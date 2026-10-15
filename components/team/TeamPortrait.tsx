import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/types";

const gradients = ["from-brand-500 to-brand-700", "from-ink-600 to-ink-900"];

export function gradient(name: string) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return gradients[h % gradients.length];
}

/** Two initials from the name, ignoring honorifics such as "Md." and "Mst." and suffixes such as "PMP". */
export function initials(name: string) {
  const words = name
    .replace(/,.*$/, "")
    .split(/\s+/)
    .filter((w) => w && !/^(md|mst|mr|mrs|ms|dr)\.?$/i.test(w));
  return ((words[0]?.[0] ?? "") + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase();
}

/** Round gradient avatar with the person's initials (used while no photo is uploaded). */
export function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-display font-bold text-white", gradient(name), className)}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}

export function TeamPortrait({ member, showBio = false, featured = false }: { member: TeamMember; showBio?: boolean; featured?: boolean }) {
  const links = member.linkedin && (
    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-medium text-brand-700 hover:text-brand-800">
      LinkedIn<span className="sr-only"> profile of {member.name}</span>
    </a>
  );

  if (featured) {
    return (
      <figure className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
        <div className={cn("relative h-28 bg-gradient-to-br", gradient(member.name))}>
          <div className="bg-grid-dark absolute inset-0 opacity-50" aria-hidden="true" />
        </div>
        <div className="flex flex-1 flex-col px-7 pb-7">
          {member.photo ? (
            <span className="relative z-10 -mt-12 block size-24 overflow-hidden rounded-full ring-4 ring-white">
              <Image unoptimized src={member.photo.src} alt={member.photo.alt} fill sizes="96px" className="object-cover" />
            </span>
          ) : (
            <Avatar name={member.name} className="relative z-10 -mt-12 size-24 text-3xl ring-4 ring-white" />
          )}
          <figcaption className="mt-4">
            <p className="font-display text-xl font-semibold text-ink-900">{member.name}</p>
            <p className="mt-1 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{member.role}</p>
            {member.bio && <p className="mt-4 text-sm leading-relaxed text-ink-500">{member.bio}</p>}
            {links}
          </figcaption>
        </div>
      </figure>
    );
  }

  if (!member.photo) {
    return (
      <figure className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-ink-200/70 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] hover:ring-brand-200">
        <div className="flex items-center gap-4">
          <Avatar name={member.name} className="size-14 text-lg" />
          <figcaption>
            <p className="font-display leading-snug font-semibold text-ink-900">{member.name}</p>
            <p className="mt-0.5 text-sm text-brand-600">{member.role}</p>
          </figcaption>
        </div>
        {showBio && member.bio && <p className="mt-4 text-sm leading-relaxed text-ink-500">{member.bio}</p>}
        {links}
      </figure>
    );
  }
  return (
    <figure className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink-100">
        <Image unoptimized src={member.photo.src} alt={member.photo.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <figcaption className="mt-4">
        <p className="font-display font-semibold text-ink-900">{member.name}</p>
        <p className="text-sm text-ink-500">{member.role}</p>
        {showBio && member.bio && <p className="mt-2 text-sm leading-relaxed text-ink-500">{member.bio}</p>}
        {links}
      </figcaption>
    </figure>
  );
}
