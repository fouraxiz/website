import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CheckList({ items, className, inverse = false }: { items: string[]; className?: string; inverse?: boolean }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className={cn(
              "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full",
              inverse ? "bg-white/10 text-accent-300" : "bg-accent-50 text-accent-600",
            )}
          >
            <Check className="size-3" strokeWidth={3} aria-hidden="true" />
          </span>
          <span className={inverse ? "text-ink-200" : "text-ink-600"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
