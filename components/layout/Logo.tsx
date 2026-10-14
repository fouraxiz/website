import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Interim wordmark. Replace with the official 4axiz logo by swapping this
 * component's contents for an <Image src="/brand/logo.svg" … /> once the
 * approved asset is supplied.
 */
export function Logo({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5", className)} aria-label="4axiz IT Limited — home">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <rect width="32" height="32" rx="8" className={inverse ? "fill-white" : "fill-brand-600"} />
        <path d="M9 16h14M16 9v14" className={inverse ? "stroke-brand-700" : "stroke-white"} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M11.5 11.5l9 9M20.5 11.5l-9 9" className={inverse ? "stroke-brand-400" : "stroke-brand-200"} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className={cn("font-display text-[1.35rem] leading-none font-bold tracking-tight", inverse ? "text-white" : "text-ink-900")}>
        4axiz
      </span>
    </Link>
  );
}
