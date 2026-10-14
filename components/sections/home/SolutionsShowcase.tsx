import Link from "next/link";
import { ArrowUpRight, Check, CreditCard, PackageCheck, Truck } from "lucide-react";
import { Icon } from "@/lib/icons";
import { SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { publishedErpModules } from "@/data/erp-modules";
import type { IconName } from "@/types";

function Card({
  href,
  icon,
  title,
  text,
  className,
  dark = false,
  children,
}: {
  href: string;
  icon: IconName;
  title: string;
  text: string;
  className?: string;
  dark?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border p-7 transition-[border-color,box-shadow]",
        dark ? "border-ink-800 bg-ink-950" : "border-ink-200 bg-white hover:border-brand-200 hover:shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-lg ring-1 ring-inset [&_svg]:size-5",
            dark ? "bg-accent-500/10 text-accent-300 ring-accent-400/20" : "bg-brand-50 text-brand-600 ring-brand-100",
          )}
        >
          <Icon name={icon} />
        </span>
        <ArrowUpRight
          className={cn("size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5", dark ? "text-ink-500" : "text-ink-300 group-hover:text-brand-600")}
          aria-hidden="true"
        />
      </div>
      <h3 className={cn("mt-6 text-xl font-semibold", dark && "text-white")}>
        <Link href={href} className="after:absolute after:inset-0">
          {title}
        </Link>
      </h3>
      <p className={cn("mt-2 max-w-md text-sm leading-relaxed", dark ? "text-ink-400" : "text-ink-500")}>{text}</p>
      {children && <div className="mt-auto pt-8">{children}</div>}
    </article>
  );
}

export function SolutionsShowcase() {
  return (
    <section className="bg-ink-50 py-20 sm:py-28" aria-labelledby="solutions-heading">
      <div className="container-site">
        <SectionHeading
          eyebrow="Solutions"
          id="solutions-heading"
          title="Everything a growing organisation needs to run on software."
          description="From a connected ERP to AI-powered automation, we combine proven products with tailored engineering."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <Card
            href="/solutions/erp"
            icon="boxes"
            title="Enterprise Resource Planning"
            text="A modular platform connecting finance, people, procurement, inventory and reporting on a single shared data model."
            className="lg:col-span-2"
          >
            <ul className="flex flex-wrap gap-2" aria-label="Example ERP modules">
              {publishedErpModules.slice(0, 9).map((m) => (
                <li key={m.slug} className="inline-flex items-center gap-1.5 rounded-md bg-ink-50 px-2.5 py-1.5 text-xs font-medium text-ink-600 ring-1 ring-ink-200 ring-inset">
                  <Icon name={m.icon} className="size-3.5 text-brand-600" />
                  {m.shortTitle}
                </li>
              ))}
              <li className="inline-flex items-center rounded-md px-2.5 py-1.5 text-xs font-medium text-brand-700">+ more</li>
            </ul>
          </Card>

          <Card
            href="/solutions/ai"
            icon="sparkles"
            title="AI & Automation"
            text="Assistants, document intelligence and predictive insight integrated into the systems your teams already use."
            className="lg:row-span-2"
            dark
          >
            <div className="space-y-2.5" aria-hidden="true">
              <div className="ml-auto w-4/5 rounded-lg rounded-br-sm bg-white/[0.06] px-3 py-2 text-xs text-ink-300">
                Extract totals and due dates from these invoices.
              </div>
              <div className="w-11/12 rounded-lg rounded-bl-sm border border-accent-400/20 bg-accent-500/10 px-3 py-2.5">
                {["Vendor", "Amount", "Due date"].map((f) => (
                  <div key={f} className="flex items-center justify-between py-1 text-[0.7rem] text-accent-200">
                    <span>{f}</span>
                    <span className="h-1.5 w-16 rounded bg-accent-300/30" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1 text-[0.7rem] text-ink-500">
                <span className="size-1.5 animate-pulse-soft rounded-full bg-accent-400" />
                Ready for review
              </div>
            </div>
          </Card>

          <Card href="/solutions/custom-software" icon="code" title="Custom Software" text="Systems shaped around your process, with full ownership of code and data.">
            <pre className="overflow-hidden rounded-lg bg-ink-950 p-3.5 font-mono text-[0.68rem] leading-relaxed text-ink-400" aria-hidden="true">
              <span className="text-brand-300">workflow</span>(<span className="text-accent-300">&quot;loan-approval&quot;</span>)
              {"\n"}  .step(<span className="text-accent-300">&quot;review&quot;</span>)
              {"\n"}  .step(<span className="text-accent-300">&quot;approve&quot;</span>)
              {"\n"}  .notify(<span className="text-brand-300">applicant</span>)
            </pre>
          </Card>

          <Card href="/solutions/web-applications" icon="smartphone" title="Web & Mobile Applications" text="Fast, accessible web platforms and mobile apps connected to the same back end.">
            <div className="flex items-end gap-3" aria-hidden="true">
              <div className="h-20 flex-1 rounded-md border border-ink-200 bg-white p-2">
                <span className="block h-1.5 w-1/3 rounded bg-brand-200" />
                <span className="mt-2 block h-6 rounded bg-ink-100" />
                <span className="mt-1.5 block h-1.5 w-2/3 rounded bg-ink-100" />
              </div>
              <div className="h-24 w-12 rounded-lg border-2 border-ink-800 bg-white p-1">
                <span className="block h-4 rounded-sm bg-brand-100" />
                <span className="mt-1 block h-2 rounded-sm bg-ink-100" />
                <span className="mt-1 block h-2 rounded-sm bg-ink-100" />
                <span className="mt-2 block h-2.5 rounded-sm bg-brand-500" />
              </div>
            </div>
          </Card>

          <Card href="/solutions/business-process-automation" icon="workflow" title="Business Process Automation" text="Digital approvals and system-to-system automation that remove waiting and re-keying.">
            <ol className="flex items-center gap-1.5 text-[0.68rem] font-medium text-ink-600" aria-hidden="true">
              {["Request", "Approve", "Notify"].map((s, i) => (
                <li key={s} className="flex flex-1 items-center gap-1.5">
                  <span className="flex flex-1 items-center justify-center gap-1 rounded-md bg-ink-50 py-2 ring-1 ring-ink-200 ring-inset">
                    {i < 2 && <Check className="size-3 text-accent-600" strokeWidth={3} />}
                    {s}
                  </span>
                  {i < 2 && <span className="h-px w-2 bg-ink-300" />}
                </li>
              ))}
            </ol>
          </Card>

          <Card
            href="/solutions/ecommerce"
            icon="shopping-cart"
            title="E-commerce Solutions"
            text="Storefronts, marketplaces and shopping apps integrated with stock, payments and delivery."
            className="lg:col-span-2"
          >
            <ol className="grid grid-cols-3 gap-2" aria-hidden="true">
              {[
                { I: CreditCard, l: "Payment received" },
                { I: PackageCheck, l: "Order packed" },
                { I: Truck, l: "Out for delivery" },
              ].map(({ I, l }, i) => (
                <li key={l} className={cn("rounded-lg p-3 ring-1 ring-inset", i < 2 ? "bg-brand-50 ring-brand-100" : "bg-white ring-ink-200")}>
                  <I className={cn("size-4", i < 2 ? "text-brand-600" : "text-ink-400")} />
                  <p className="mt-2 text-[0.7rem] font-medium text-ink-700">{l}</p>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </section>
  );
}
