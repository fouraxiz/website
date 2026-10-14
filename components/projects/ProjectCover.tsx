import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

const themes: Record<Project["theme"], { bg: string; accent: string; soft: string }> = {
  blue: { bg: "from-brand-500 to-brand-700", accent: "bg-brand-500", soft: "bg-brand-100" },
  indigo: { bg: "from-ink-700 to-ink-950", accent: "bg-brand-500", soft: "bg-brand-100" },
  teal: { bg: "from-ink-400 to-ink-700", accent: "bg-ink-700", soft: "bg-ink-100" },
  slate: { bg: "from-ink-800 to-ink-950", accent: "bg-ink-600", soft: "bg-ink-100" },
  amber: { bg: "from-brand-400 to-brand-600", accent: "bg-brand-500", soft: "bg-brand-50" },
  rose: { bg: "from-brand-700 to-brand-950", accent: "bg-brand-600", soft: "bg-brand-100" },
};

/**
 * Project cover. Uses the first real screenshot when available; otherwise a
 * generated, clearly-labelled cover so the grid stays visually consistent.
 */
export function ProjectCover({ project, className, priority = false }: { project: Project; className?: string; priority?: boolean }) {
  const image = project.images[0];
  if (image) {
    return (
      <div className={cn("relative aspect-[16/10] overflow-hidden bg-ink-100", className)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  const t = themes[project.theme];
  const isMobile = project.platform.includes("Mobile") && !project.platform.includes("Web");

  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden bg-gradient-to-br", t.bg, className)} aria-hidden="true">
      <div className="bg-grid-dark mask-radial absolute inset-0 opacity-70" />
      <span className="absolute top-4 left-4 font-display text-sm font-semibold text-white/85">{project.name}</span>
      {isMobile ? (
        <div className="absolute top-[22%] left-1/2 h-[95%] w-[30%] -translate-x-1/2 rounded-[1.4rem] border-4 border-ink-900/80 bg-white p-2 shadow-2xl">
          <span className={cn("block h-[18%] rounded-lg", t.soft)} />
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="block aspect-square rounded-md bg-ink-100" />
            ))}
          </div>
          <span className={cn("mt-2 block h-3 rounded", t.accent)} />
        </div>
      ) : (
        <div className="absolute top-[24%] left-[10%] h-[90%] w-[80%] rounded-t-lg bg-white shadow-2xl">
          <div className="flex gap-1 border-b border-ink-100 px-2.5 py-2">
            <span className="size-1.5 rounded-full bg-ink-200" />
            <span className="size-1.5 rounded-full bg-ink-200" />
            <span className="size-1.5 rounded-full bg-ink-200" />
          </div>
          <div className="grid grid-cols-[22%_1fr] gap-2.5 p-2.5">
            <div className="space-y-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className={cn("block h-2 rounded", i === 0 ? t.accent : "bg-ink-100")} />
              ))}
            </div>
            <div>
              <span className={cn("block h-8 rounded-md", t.soft)} />
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="block h-6 rounded bg-ink-100" />
                ))}
              </div>
              <span className="mt-2 block h-2 w-3/4 rounded bg-ink-100" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
