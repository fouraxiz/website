"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { login, type LoginState } from "@/lib/auth/actions";
import { buttonClasses } from "@/components/ui/Button";

const input =
  "block h-12 w-full rounded-xl border border-ink-200 bg-ink-50/60 pr-3.5 pl-11 text-[0.95rem] text-ink-900 transition placeholder:text-ink-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100 focus:outline-none";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  const [show, setShow] = useState(false);
  return (
    <form action={action} className="mt-8 space-y-5">
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-800">
          Email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
          <input id="email" name="email" type="email" autoComplete="username" required placeholder="you@4axiz.com" defaultValue={state.email} key={state.email} className={input} />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-800">
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
          <input id="password" name="password" type={show ? "text" : "password"} autoComplete="current-password" required placeholder="••••••••" className={`${input} pr-12`} />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute top-1/2 right-2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-ink-400 hover:bg-ink-100 hover:text-ink-700"
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
          >
            {show ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
          </button>
        </div>
      </div>
      {state.error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={buttonClasses("primary", "lg", "w-full")}>
        {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />} Sign in
      </button>
      <p className="text-center text-xs text-ink-400">Forgot your password? Ask a website admin to reset it.</p>
    </form>
  );
}
