import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types";

type Tone = "brand" | "accent" | "inverse" | "neutral";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-600 ring-brand-100",
  accent: "bg-accent-50 text-accent-600 ring-accent-100",
  inverse: "bg-white/[0.07] text-brand-200 ring-white/10",
  neutral: "bg-white text-ink-700 ring-ink-200",
};

export function IconTile({ name, tone = "brand", size = "md", className }: { name: IconName; tone?: Tone; size?: "sm" | "md" | "lg"; className?: string }) {
  const s = size === "sm" ? "size-9 [&_svg]:size-4" : size === "lg" ? "size-14 [&_svg]:size-6" : "size-11 [&_svg]:size-5";
  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center rounded-lg ring-1 ring-inset", tones[tone], s, className)}>
      <Icon name={name} />
    </span>
  );
}
