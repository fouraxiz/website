import { Icon } from "@/lib/icons";
import { hues, hueAt } from "@/lib/palette";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types";

const positions = [
  "top-[8%] left-[38%]",
  "top-[30%] left-[8%]",
  "top-[28%] right-[6%]",
  "bottom-[18%] left-[18%]",
  "bottom-[10%] right-[22%]",
];

/** Decorative orbit of colourful icon tiles for inner-page banners. */
export function HeroDecor({ icons, center = "layers" }: { icons: IconName[]; center?: IconName }) {
  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-[26rem] lg:block" aria-hidden="true">
      <div className="absolute inset-[12%] rounded-full border-2 border-dashed border-ink-200" />
      <div className="absolute inset-[28%] rounded-full border border-ink-200/80" />
      <div className="absolute inset-[38%] flex items-center justify-center rounded-[2rem] bg-ink-950 text-white shadow-[0_30px_60px_-20px_rgb(18_21_23/0.45)] [&_svg]:size-10">
        <div className="absolute -inset-3 -z-10 rounded-[2.4rem] bg-gradient-to-br from-accent-400/40 via-sky-300/30 to-brand-300/40 blur-xl" />
        <Icon name={center} />
      </div>
      {icons.slice(0, 5).map((ic, i) => {
        const h = hues[hueAt(i + 1)];
        return (
          <span
            key={`${ic}-${i}`}
            className={cn(
              "absolute inline-flex size-16 items-center justify-center rounded-2xl text-white shadow-[0_18px_40px_-15px_rgb(18_21_23/0.4)] [&_svg]:size-7",
              h.solid,
              positions[i],
              i % 2 === 0 && "animate-float",
            )}
            style={i % 2 === 0 ? { animationDelay: `${i * 0.6}s` } : undefined}
          >
            <Icon name={ic} />
          </span>
        );
      })}
    </div>
  );
}
