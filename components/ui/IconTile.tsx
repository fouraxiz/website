import { Icon } from "@/lib/icons";
import { hues, type Hue } from "@/lib/palette";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types";

type Tone = "brand" | "accent" | "inverse" | "neutral";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-600 ring-brand-100",
  accent: "bg-accent-50 text-accent-600 ring-accent-100",
  inverse: "bg-white/[0.07] text-brand-300 ring-white/10",
  neutral: "bg-white text-ink-700 ring-ink-200",
};

export function IconTile({
  name,
  tone = "brand",
  hue,
  size = "md",
  className,
}: {
  name: IconName;
  tone?: Tone;
  /** Colourful variant — overrides `tone`. */
  hue?: Hue;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const s = size === "sm" ? "size-9 [&_svg]:size-4" : size === "lg" ? "size-14 [&_svg]:size-6" : "size-12 [&_svg]:size-[1.35rem]";
  const color = hue ? `${hues[hue].soft} ${hues[hue].text} ${hues[hue].ring}` : tones[tone];
  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center rounded-xl ring-1 ring-inset", color, s, className)}>
      <Icon name={name} />
    </span>
  );
}
