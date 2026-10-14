import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Official 4axiz logo. `inverse` uses the light version for dark backgrounds. */
export function Logo({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center", className)} aria-label="4axiz IT Limited — home">
      <Image
        src={inverse ? "/brand/4axiz-logo-white.png" : "/brand/4axiz-logo.png"}
        alt="4axiz IT Limited"
        width={195}
        height={102}
        priority
        className="h-12 w-auto lg:h-14"
      />
    </Link>
  );
}
