import Image from "next/image";
import { UserRound } from "lucide-react";
import type { TeamMember } from "@/types";

export function TeamPortrait({ member, showBio = false }: { member: TeamMember; showBio?: boolean }) {
  return (
    <figure className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-ink-100">
        {member.photo ? (
          <Image
            src={member.photo.src}
            alt={member.photo.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-ink-300">
            <UserRound className="size-12" strokeWidth={1.25} aria-hidden="true" />
          </div>
        )}
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
