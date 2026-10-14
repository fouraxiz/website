import { cn } from "@/lib/utils";

type Tone = "brand" | "neutral" | "accent" | "warning" | "inverse";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-100",
  neutral: "bg-ink-50 text-ink-600 ring-ink-200",
  accent: "bg-accent-50 text-accent-700 ring-accent-100",
  warning: "bg-amber-50 text-amber-800 ring-amber-200",
  inverse: "bg-white/10 text-white ring-white/15",
};

export function Badge({ children, tone = "neutral", className }: { children: React.ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset", tones[tone], className)}>
      {children}
    </span>
  );
}
