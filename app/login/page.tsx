import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { LoginForm } from "./LoginForm";
import { getSession } from "@/lib/auth/session";

export const metadata = { title: "Sign in", robots: { index: false, follow: false } };

const editable = [
  "Homepage slider, sections and headings",
  "Menus, services, products and solutions",
  "Projects, clients, logos and case studies",
  "Blog posts, team, offices and careers",
  "Images, contact details and company facts",
];

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  if (await getSession()) redirect(next && next.startsWith("/") ? next : "/");
  return (
    <section className="bg-ink-50 py-10 sm:py-16">
      <div className="container-site">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[var(--shadow-lift)] ring-1 ring-ink-200/70 lg:grid-cols-[1.05fr_1fr]">
          {/* Brand panel */}
          <div className="relative hidden overflow-hidden bg-ink-950 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">
            <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-brand-500/30 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-20 -bottom-28 size-80 rounded-full bg-brand-600/20 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <div>
                <Logo inverse />
              </div>
              <p className="eyebrow mt-12 text-brand-300">
                <span className="h-px w-6 bg-current" aria-hidden="true" />
                Website editor
              </p>
              <h2 className="mt-4 text-3xl leading-tight font-bold text-white">
                Edit the website <span className="text-brand-400">right on the page.</span>
              </h2>
              <p className="mt-4 leading-relaxed text-ink-300">No separate admin panel — sign in, switch on edit mode and change any section where you see it.</p>
              <ul className="mt-8 space-y-3">
                {editable.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-ink-200">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500">
                      <Check className="size-3 text-white" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <p className="relative mt-12 flex items-center gap-2 text-xs text-ink-400">
              <ShieldCheck className="size-4 text-brand-400" aria-hidden="true" />
              Access for 4axiz team members only. Every change is saved with its history.
            </p>
          </div>

          {/* Form panel */}
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <div className="lg:hidden">
              <Logo />
            </div>
            <span className="mt-8 inline-flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 lg:mt-0">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </span>
            <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">Welcome back</h1>
            <p className="mt-2 text-sm text-ink-500">Sign in with your 4axiz editor account.</p>
            <LoginForm next={next ?? "/"} />
            <Link href="/" className="mt-8 inline-flex items-center gap-1.5 self-start text-sm font-medium text-ink-500 hover:text-brand-700">
              <ArrowLeft className="size-4" aria-hidden="true" /> Back to website
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
