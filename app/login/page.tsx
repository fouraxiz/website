import { redirect } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { LoginForm } from "./LoginForm";
import { getSession } from "@/lib/auth/session";

export const metadata = { title: "Sign in", robots: { index: false, follow: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  if (await getSession()) redirect(next && next.startsWith("/") ? next : "/");
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-ink-50 px-4 py-20">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-32 -right-24 size-[30rem] rounded-full bg-gradient-to-br from-violet-200/60 via-sky-200/40 to-transparent blur-3xl" aria-hidden="true" />
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-[var(--shadow-lift)] ring-1 ring-ink-200 sm:p-10">
        <Logo />
        <h1 className="mt-8 text-2xl font-bold">Sign in to edit the website</h1>
        <p className="mt-2 text-sm text-ink-500">For 4axiz team members with editing access.</p>
        <LoginForm next={next ?? "/"} />
      </div>
    </section>
  );
}
