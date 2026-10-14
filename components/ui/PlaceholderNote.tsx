import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Visible marker for content that 4axiz still needs to supply or verify.
 * Kept deliberately understated so pages remain presentable before launch,
 * while making it impossible to mistake placeholder content for fact.
 */
export function PlaceholderNote({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-lg border border-dashed border-ink-300 bg-ink-50/70 px-3.5 py-2.5 text-sm text-ink-500",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0 text-ink-400" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

/** Inline "to be confirmed" value for unverified fields such as addresses. */
export function Tbc({ label = "To be confirmed" }: { label?: string }) {
  return <span className="text-ink-400 italic">{label}</span>;
}
