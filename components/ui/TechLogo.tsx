import * as icons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

/** Renders a technology brand mark from simple-icons (server-only, inline SVG). */
export function TechLogo({ icon, className }: { icon: string; className?: string }) {
  const data = (icons as unknown as Record<string, SimpleIcon>)[icon];
  if (!data) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} fill={`#${data.hex}`} aria-hidden="true">
      <path d={data.path} />
    </svg>
  );
}
