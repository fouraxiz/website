"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { budgetOptions, validateContact, type ContactPayload, type FieldErrors, type InquiryType } from "@/lib/contact";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "not-configured" }
  | { kind: "error"; message: string };

interface Props {
  interestGroups: { label: string; options: { value: string; label: string }[] }[];
  contextLabels: { module: Record<string, string>; product: Record<string, string> };
  fallbackEmail: string | null;
}

const inputBase =
  "block w-full rounded-lg border bg-white px-3.5 text-[0.95rem] text-ink-900 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2";
const inputOk = "border-ink-200 focus:border-brand-400 focus:ring-brand-100";
const inputErr = "border-red-400 focus:border-red-500 focus:ring-red-100";

export function ContactForm({ interestGroups, contextLabels, fallbackEmail }: Props) {
  const params = useSearchParams();
  const allowed = useMemo(() => new Set(interestGroups.flatMap((g) => g.options.map((o) => o.value))), [interestGroups]);

  const initialInterest = params.get("interest");
  const moduleParam = params.get("module");
  const productParam = params.get("product");
  const context =
    (moduleParam && contextLabels.module[moduleParam] && `ERP module: ${contextLabels.module[moduleParam]}`) ||
    (productParam && contextLabels.product[productParam] && `Product: ${contextLabels.product[productParam]}`) ||
    "";

  const [type, setType] = useState<InquiryType>(initialInterest && initialInterest !== "careers" ? "project" : "general");
  const [values, setValues] = useState({
    interest: initialInterest && allowed.has(initialInterest) ? initialInterest : "",
    name: "",
    email: "",
    company: "",
    phone: "",
    budget: "",
    message: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;

  const set = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: ContactPayload = { ...values, type, context, budget: type === "project" ? values.budget : "" };
    const errs = validateContact(payload, allowed);
    setErrors(errs);
    const firstInvalid = Object.keys(errs)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus({ kind: "success" });
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: FieldErrors };
      if (res.status === 503 && data.error === "not_configured") {
        setStatus({ kind: "not-configured" });
      } else if (res.status === 422 && data.fields) {
        setErrors(data.fields);
        setStatus({ kind: "idle" });
      } else {
        setStatus({ kind: "error", message: "We couldn't send your message. Please try again in a moment." });
      }
    } catch {
      setStatus({ kind: "error", message: "Network error — your message was not sent. Please check your connection and try again." });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-2xl border border-accent-200 bg-accent-50 p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto size-10 text-accent-600" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold">Thank you — your message has been sent.</h3>
        <p className="mt-2 text-ink-600">Our team will review your inquiry and get back to you.</p>
      </div>
    );
  }

  const field = (name: keyof typeof values) => ({
    id: fid(name),
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${fid(name)}-error` : undefined,
  });

  const ErrorText = ({ name }: { name: keyof FieldErrors }) =>
    errors[name] ? (
      <p id={`${fid(name)}-error`} className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
        <AlertCircle className="size-3.5" aria-hidden="true" />
        {errors[name]}
      </p>
    ) : null;

  const Label = ({ name, children, optional }: { name: string; children: React.ReactNode; optional?: boolean }) => (
    <label htmlFor={fid(name)} className="mb-1.5 block text-sm font-medium text-ink-800">
      {children}
      {optional ? <span className="ml-1 font-normal text-ink-400">(optional)</span> : <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>}
    </label>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink-800">Type of inquiry</legend>
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-ink-100 p-1">
          {(
            [
              { v: "project", l: "Project inquiry" },
              { v: "general", l: "General contact" },
            ] as const
          ).map((o) => (
            <label
              key={o.v}
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-500",
                type === o.v ? "bg-white text-ink-900 shadow-sm" : "text-ink-500 hover:text-ink-800",
              )}
            >
              <input type="radio" name="type" value={o.v} checked={type === o.v} onChange={() => setType(o.v)} className="sr-only" />
              {o.l}
            </label>
          ))}
        </div>
      </fieldset>

      {context && (
        <p className="rounded-lg bg-brand-50 px-3.5 py-2.5 text-sm text-brand-800">
          Regarding: <strong className="font-semibold">{context}</strong>
        </p>
      )}

      <div>
        <Label name="interest">{type === "project" ? "Service or solution" : "Topic"}</Label>
        <select
          {...field("interest")}
          value={values.interest}
          onChange={(e) => set("interest", e.target.value)}
          className={cn(inputBase, "h-11", errors.interest ? inputErr : inputOk, !values.interest && "text-ink-400")}
          required
        >
          <option value="" disabled>
            Select an option
          </option>
          {interestGroups.map((g) => (
            <optgroup key={g.label} label={g.label}>
              {g.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <ErrorText name="interest" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label name="name">Full name</Label>
          <input {...field("name")} type="text" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} className={cn(inputBase, "h-11", errors.name ? inputErr : inputOk)} required />
          <ErrorText name="name" />
        </div>
        <div>
          <Label name="email">Business email</Label>
          <input {...field("email")} type="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} className={cn(inputBase, "h-11", errors.email ? inputErr : inputOk)} required />
          <ErrorText name="email" />
        </div>
        <div>
          <Label name="company">Company name</Label>
          <input {...field("company")} type="text" autoComplete="organization" value={values.company} onChange={(e) => set("company", e.target.value)} className={cn(inputBase, "h-11", errors.company ? inputErr : inputOk)} required />
          <ErrorText name="company" />
        </div>
        <div>
          <Label name="phone" optional>
            Phone number
          </Label>
          <input {...field("phone")} type="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} className={cn(inputBase, "h-11", errors.phone ? inputErr : inputOk)} />
          <ErrorText name="phone" />
        </div>
      </div>

      {type === "project" && (
        <div>
          <Label name="budget" optional>
            Estimated budget
          </Label>
          <select {...field("budget")} value={values.budget} onChange={(e) => set("budget", e.target.value)} className={cn(inputBase, "h-11", errors.budget ? inputErr : inputOk, !values.budget && "text-ink-400")}>
            <option value="">Prefer not to say</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <ErrorText name="budget" />
        </div>
      )}

      <div>
        <Label name="message">{type === "project" ? "Project requirements" : "Message"}</Label>
        <textarea
          {...field("message")}
          rows={6}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder={type === "project" ? "What are you trying to achieve? Who will use it? Any timelines or existing systems we should know about?" : "How can we help?"}
          className={cn(inputBase, "py-3", errors.message ? inputErr : inputOk)}
          required
        />
        <ErrorText name="message" />
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
        </label>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-ink-600">
          <input
            {...field("consent")}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 size-4 shrink-0 rounded border-ink-300 accent-brand-600"
            required
          />
          <span>
            I agree that 4axiz may use the information I provide to respond to my inquiry, in line with the{" "}
            <Link href="/privacy-policy" className="font-medium text-brand-700 underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <ErrorText name="consent" />
      </div>

      {status.kind === "not-configured" && (
        <div role="alert" className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">Your message has not been sent.</p>
          <p className="mt-1">
            Online submission isn&apos;t connected yet.{" "}
            {fallbackEmail ? (
              <>
                Please email us at{" "}
                <a className="font-semibold underline" href={`mailto:${fallbackEmail}`}>
                  {fallbackEmail}
                </a>{" "}
                instead.
              </>
            ) : (
              "Please reach us through one of our offices in the meantime."
            )}
          </p>
        </div>
      )}
      {status.kind === "error" && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {status.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status.kind === "submitting"} className={buttonClasses("primary", "lg")}>
          {status.kind === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" /> {type === "project" ? "Send project inquiry" : "Send message"}
            </>
          )}
        </button>
        <p className="text-xs text-ink-400">
          Fields marked <span className="text-red-500">*</span> are required.
        </p>
      </div>
    </form>
  );
}
