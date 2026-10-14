import Image from "next/image";
import type { TeamMember } from "@/types";

const gradients = [
  "from-violet-500 to-indigo-600",
  "from-sky-400 to-blue-600",
  "from-emerald-400 to-teal-600",
  "from-amber-400 to-rose-500",
  "from-rose-400 to-fuchsia-600",
  "from-ink-600 to-ink-900",
];

function gradient(name: string) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return gradients[h % gradients.length];
}

/** Two initials from the name, ignoring honorifics such as "Md." and "Mst." and suffixes such as "PMP". */
function initials(name: string) {
  const words = name
    .replace(/,.*$/, "")
    .split(/\s+/)
    .filter((w) => w && !/^(md|mst|mr|mrs|ms|dr)\.?$/i.test(w));
  return ((words[0]?.[0] ?? "") + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase();
}

export function TeamPortrait({ member, showBio = false }: { member: TeamMember; showBio?: boolean }) {
  if (!member.photo) {
    return (
      <figure className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-ink-200/70 transition hover:shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-4">
          <span
            className={`inline-flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-display text-xl font-bold text-white shadow-sm ${gradient(member.name)}`}
            aria-hidden="true"
          >
            {initials(member.name)}
          </span>
          <figcaption>
            <p className="font-display leading-snug font-semibold text-ink-900">{member.name}</p>
            <p className="mt-0.5 text-sm text-brand-600">{member.role}</p>
          </figcaption>
        </div>
        {showBio && member.bio && <p className="mt-4 text-sm leading-relaxed text-ink-500">{member.bio}</p>}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-medium text-brand-700 hover:text-brand-800">
            LinkedIn<span className="sr-only"> profile of {member.name}</span>
          </a>
        )}
      </figure>
    );
  }
  return (
    <figure className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-ink-100">
        <Image unoptimized
          src={member.photo.src}
          alt={member.photo.alt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <figcaption className="mt-4">
        <p className="font-display font-semibold text-ink-900">{member.name}</p>
        <p className="text-sm text-ink-500">{member.role}</p>
        {showBio && member.bio && <p className="mt-2 text-sm leading-relaxed text-ink-500">{member.bio}</p>}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-medium text-brand-700 hover:text-brand-800">
            LinkedIn<span className="sr-only"> profile of {member.name}</span>
          </a>
        )}
      </figcaption>
    </figure>
  );
}
