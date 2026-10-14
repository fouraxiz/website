import Image from "next/image";
import { TechLogo, hasTechLogo } from "./TechLogo";

/** Technology logo: uploaded image if present, otherwise a simple-icons mark, otherwise initials. */
export function TechIcon({ tech, className }: { tech: { name: string; icon: string; image: string | null }; className?: string }) {
  if (tech.image) return <Image src={tech.image} alt="" width={40} height={40} className={`${className ?? ""} object-contain`} unoptimized />;
  if (tech.icon && hasTechLogo(tech.icon)) return <TechLogo icon={tech.icon} className={className} />;
  return (
    <span className={`inline-flex items-center justify-center rounded-md bg-ink-200 text-[0.6rem] font-bold text-ink-700 ${className ?? ""}`} aria-hidden="true">
      {tech.name.slice(0, 2).toUpperCase()}
    </span>
  );
}
