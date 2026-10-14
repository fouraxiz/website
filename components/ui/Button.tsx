import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "outline-inverse";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800",
  secondary: "bg-white text-ink-900 ring-1 ring-ink-200 ring-inset hover:bg-ink-50 hover:ring-ink-300",
  ghost: "text-brand-700 hover:bg-brand-50",
  inverse: "bg-white text-brand-800 hover:bg-brand-50",
  "outline-inverse": "text-white ring-1 ring-white/30 ring-inset hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

export const buttonClasses = (variant: Variant = "primary", size: Size = "md", className?: string) =>
  cn(
    "group inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
}

export function ButtonLink({ href, children, variant = "primary", size = "md", arrow = false, className }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)}>
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
    </Link>
  );
}

/** Inline text link with arrow, used for "Learn more" style navigation. */
export function TextLink({
  href,
  children,
  className,
  inverse = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-semibold",
        inverse ? "text-brand-300 hover:text-white" : "text-brand-700 hover:text-brand-800",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}
