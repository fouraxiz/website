import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/lib/icons";
import { getSolution } from "@/data/solutions";

export function AiSection() {
  const ai = getSolution("ai")!;
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28" aria-labelledby="ai-heading">
      <div className="container-site grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="eyebrow text-accent-600">AI &amp; intelligent automation</p>
          <h2 id="ai-heading" className="mt-4 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-[2.5rem]">
            AI that does real work inside your business systems.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-500">
            We design and integrate AI where it measurably reduces effort — reading documents, answering questions and spotting patterns —
            with human review and security built in.
          </p>
          <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {ai.capabilities.map((c) => (
              <li key={c.title}>
                <h3 className="text-sm font-semibold text-ink-900">{c.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">{c.description}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/solutions/ai" arrow>
              Explore AI Solutions
            </ButtonLink>
            <p className="text-sm text-ink-400">Capabilities we design and build for — each scoped to your data and goals.</p>
          </div>
        </div>

        {/* Illustration: documents → AI → structured, actionable data */}
        <div
          role="img"
          aria-label="Illustration of documents being processed by AI into structured data that flows into business systems."
          className="relative rounded-2xl border border-ink-200 bg-gradient-to-br from-accent-50 via-white to-brand-50 p-6 sm:p-10"
        >
          <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
            <div className="space-y-2">
              {["Invoice", "Contract", "Form"].map((d, i) => (
                <div key={d} className="flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 py-2.5 shadow-sm" style={{ marginLeft: i * 6 }}>
                  <FileText className="size-4 text-ink-400" aria-hidden="true" />
                  <span className="text-xs font-medium text-ink-600">{d}</span>
                </div>
              ))}
            </div>
            <ArrowRight className="mx-auto size-4 rotate-90 text-ink-300 sm:rotate-0" aria-hidden="true" />
            <div className="rounded-xl bg-ink-950 p-4 text-center shadow-[var(--shadow-lift)]">
              <span className="mx-auto inline-flex size-10 items-center justify-center rounded-lg bg-accent-500 text-white">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-3 text-xs font-semibold text-white">AI processing</p>
              <ul className="mt-3 space-y-1.5 text-left text-[0.66rem] text-ink-400">
                {["Classify", "Extract", "Validate"].map((s) => (
                  <li key={s} className="flex items-center gap-1.5">
                    <span className="size-1 rounded-full bg-accent-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <ArrowRight className="mx-auto size-4 rotate-90 text-ink-300 sm:rotate-0" aria-hidden="true" />
            <div className="space-y-2">
              {(["calculator", "workflow", "bar-chart"] as const).map((i, idx) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 py-2.5 shadow-sm">
                  <Icon name={i} className="size-4 text-brand-600" />
                  <span className="text-xs font-medium text-ink-600">{["Ledger", "Approval", "Dashboard"][idx]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-ink-200/70 pt-6 text-center">
            {["Human review", "Audit trail", "Secure by design"].map((l) => (
              <p key={l} className="text-xs font-medium text-ink-500">
                {l}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
