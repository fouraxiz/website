import { ButtonLink } from "@/components/ui/Button";
import { AiVisual } from "@/components/visuals/SlideVisuals";
import { Icon } from "@/lib/icons";
import { hues, hueAt } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { getSolution } from "@/data/solutions";
import type { IconName } from "@/types";

const capIcons: IconName[] = ["workflow", "file-text", "message-square", "trending-up", "boxes", "sparkles"];

export function AiSection() {
  const ai = getSolution("ai")!;
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28" aria-labelledby="ai-heading">
      <div className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-40 -left-20 size-[32rem] rounded-full bg-accent-600/30 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 -bottom-40 size-[28rem] rounded-full bg-sky-500/20 blur-3xl" aria-hidden="true" />
      <div className="container-site relative grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/15">
            <span className="size-2 animate-pulse-soft rounded-full bg-accent-400" aria-hidden="true" />
            AI &amp; Intelligent Automation
          </p>
          <h2 id="ai-heading" className="mt-6 text-3xl leading-tight font-bold tracking-tight text-white sm:text-[2.6rem]">
            AI that does real work{" "}
            <span className="bg-gradient-to-r from-accent-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">inside your business</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-300">
            We design and integrate AI where it measurably reduces effort — with human review, security and monitoring built in.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {ai.capabilities.map((c, i) => {
              const h = hues[hueAt(i + 1)];
              return (
                <li key={c.title} className="flex gap-3.5 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10 transition-colors hover:bg-white/[0.07]">
                  <span className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-xl [&_svg]:size-5", h.solid, "text-white")}>
                    <Icon name={capIcons[i % capIcons.length]} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{c.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-ink-400">{c.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/solutions/ai" size="lg" arrow>
              Explore AI Solutions
            </ButtonLink>
            <ButtonLink href="/contact?interest=ai" variant="outline-inverse" size="lg">
              Discuss a use case
            </ButtonLink>
          </div>
        </div>
        <div className="px-2 sm:px-8 lg:px-0">
          <AiVisual />
        </div>
      </div>
    </section>
  );
}
