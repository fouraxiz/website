import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

const suggestions = [
  { label: "Solutions", href: "/solutions" },
  { label: "ERP platform", href: "/solutions/erp" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ink-50 to-white">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-site relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-display text-sm font-semibold tracking-[0.2em] text-brand-600">ERROR 404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">This page doesn&apos;t exist.</h1>
        <p className="mt-4 max-w-md text-lg text-ink-500">It may have moved, or the link may be incorrect. Here are some places to continue.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="text-ink-500 hover:text-brand-700">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
