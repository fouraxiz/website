import { Camera } from "lucide-react";
import { offices } from "@/data/site";

/**
 * Stand-in for team photography until approved photos are supplied.
 * Clearly labelled as a placeholder; replace by adding members with photos
 * in data/team.ts (the homepage switches to real portraits automatically).
 */
export function TeamPhotoPlaceholder() {
  return (
    <figure className="relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-ink-950">
        <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
        <svg className="absolute -right-16 -bottom-16 size-80 text-white/10" viewBox="0 0 200 200" fill="none" aria-hidden="true">
          <circle cx="100" cy="100" r="99" stroke="currentColor" />
          <circle cx="100" cy="100" r="66" stroke="currentColor" />
          <circle cx="100" cy="100" r="33" stroke="currentColor" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20">
            <Camera className="size-5" aria-hidden="true" />
          </span>
          <p className="mt-4 text-sm font-semibold text-white">Team photography</p>
          <p className="mt-1 text-xs text-brand-200">Placeholder — to be replaced with approved photos</p>
        </div>
      </div>
      <ul className="absolute -bottom-6 left-6 flex gap-2 sm:left-8">
        {offices.map((o) => (
          <li key={o.id} className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-xs font-semibold text-ink-700 shadow-[var(--shadow-soft)]">
            {o.country}
          </li>
        ))}
      </ul>
    </figure>
  );
}
