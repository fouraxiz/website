import { ArrowDown, Check, Clock } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/lib/icons";
import { hues, hueAt } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/metadata";
import { getHowWeWork, getProcess, getSection } from "@/lib/cms/content";

export const metadata = pageMetadata({
  title: "How We Work",
  description:
    "How 4axiz delivers software from first conversation to long-term support: platform features, architecture, the nine-phase methodology, testing, training, post-deployment support, SLAs, security and compliance.",
  path: "/how-we-work",
});

type Item = Awaited<ReturnType<typeof getHowWeWork>>[number];

function IconCards({ items, columns = 3, dark = false, offset = 0 }: { items: Item[]; columns?: 3 | 4; dark?: boolean; offset?: number }) {
  return (
    <ul className={cn("mt-12 grid gap-5 sm:grid-cols-2", columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
      {items.map((it, i) => (
        <li key={it._id} className={cn("rounded-3xl p-7", dark ? "bg-white/[0.04] ring-1 ring-white/10" : "bg-white ring-1 ring-ink-200/70")}>
          <span className={cn("inline-flex size-11 items-center justify-center rounded-xl text-white [&_svg]:size-5", hues[hueAt(i + offset)].solid)}>
            <Icon name={it.icon} />
          </span>
          <h3 className={cn("mt-5 text-lg font-semibold", dark && "text-white")}>{it.title}</h3>
          {it.description && <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-ink-300" : "text-ink-500")}>{it.description}</p>}
        </li>
      ))}
    </ul>
  );
}

export default async function HowWeWorkPage() {
  const [items, steps, copy] = await Promise.all([getHowWeWork(), getProcess(), getSection("page.approach")]);
  const g = (group: string) => items.filter((i) => i.group === group);
  const features = g("features");
  const engineering = g("engineering");
  const layers = g("architecture");
  const durations = g("duration");
  const testing = g("testing");
  const training = g("training");
  const support = g("support");
  const sla = g("sla");
  const controls = g("controls");
  const compliance = g("compliance");
  const infrastructure = g("infrastructure");

  return (
    <>
      <PageHero
        edit={[
          { label: "Heading", collection: "sections", slug: "page.approach" },
          { label: "How we work content", collection: "how_we_work" },
          { label: "Delivery phases", collection: "process" },
        ]}
        decor={{ icons: ["search", "pen-tool", "code", "test-tube", "rocket"], center: "workflow" }}
        crumbs={[{ label: "Company", href: "/about" }, { label: "How We Work" }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        actions={
          <>
            <ButtonLink href="#methodology" arrow>
              Our methodology
            </ButtonLink>
            <ButtonLink href="/technologies" variant="secondary">
              Technologies
            </ButtonLink>
          </>
        }
      />

      {features.length > 0 && (
        <Section labelledBy="features">
          <SectionHeading
            eyebrow="Built in by default"
            id="features"
            title="Technological features we build in."
            description="4axiz uses modern, secure and scalable technologies to develop enterprise-level platforms. Unless a client requires otherwise, every platform we deliver includes the following."
          />
          <IconCards items={features} />
        </Section>
      )}

      {engineering.length > 0 && (
        <Section tone="dark" labelledBy="engineering">
          <SectionHeading eyebrow="Engineering" id="engineering" title="Engineering excellence under the hood." inverse />
          <IconCards items={engineering} dark offset={2} />
        </Section>
      )}

      {layers.length > 0 && (
        <Section labelledBy="architecture">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <SectionHeading
              eyebrow="System architecture"
              id="architecture"
              title="A secure, modular three-tier architecture."
              description="We separate presentation, application logic and data. Each layer can be scaled, secured and upgraded independently — which is what makes long-lived institutional systems affordable to maintain."
            />
            <ol className="space-y-3" aria-label="Architecture layers">
              {layers.map((l, i) => (
                <li key={l._id}>
                  <div className={cn("rounded-3xl p-6 text-white sm:p-7", ["bg-gradient-to-br from-sky-500 to-indigo-600", "bg-gradient-to-br from-violet-500 to-fuchsia-600", "bg-gradient-to-br from-ink-700 to-ink-950"][i % 3])}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-3xl font-bold text-white/60">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{l.title}</h3>
                        {l.meta && <p className="text-xs font-semibold tracking-[0.12em] text-white/70 uppercase">{l.meta}</p>}
                      </div>
                    </div>
                    {l.points.length > 0 && (
                      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                        {l.points.map((pt) => (
                          <li key={pt} className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white/90">
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {i < layers.length - 1 && <ArrowDown className="mx-auto my-1 size-5 text-ink-300" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>
        </Section>
      )}

      <Section tone="muted" id="methodology" labelledBy="methodology-heading">
        <SectionHeading
          eyebrow="Delivery"
          id="methodology-heading"
          title="A disciplined, phased delivery methodology."
          description="For large institutional programmes we run a nine-phase delivery model with formal deliverables at each gate. Smaller engagements use the same discipline compressed into fewer phases."
        />
        <div className="mt-12 overflow-hidden rounded-3xl bg-white ring-1 ring-ink-200/70">
          <table className="w-full text-left text-sm">
            <thead className="hidden bg-ink-950 text-xs tracking-[0.12em] text-ink-300 uppercase md:table-header-group">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Phase</th>
                <th scope="col" className="px-6 py-4 font-semibold">Activities</th>
                <th scope="col" className="px-6 py-4 font-semibold">Key deliverables</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {steps.map((s, i) => (
                <tr key={s._id} className="block p-5 md:table-row md:p-0">
                  <th scope="row" className="block align-top md:table-cell md:w-[30%] md:px-6 md:py-5">
                    <span className="flex items-start gap-3">
                      <span className={cn("inline-flex size-9 shrink-0 items-center justify-center rounded-xl text-white [&_svg]:size-4", hues[hueAt(i)].solid)}>
                        <Icon name={s.icon} />
                      </span>
                      <span>
                        <span className={cn("block font-display text-xs font-semibold", hues[hueAt(i)].text)}>{String(i + 1).padStart(2, "0")}</span>
                        <span className="font-semibold text-ink-900">{s.title}</span>
                      </span>
                    </span>
                  </th>
                  <td className="mt-3 block align-top text-ink-600 md:mt-0 md:table-cell md:px-6 md:py-5">{s.description}</td>
                  <td className="mt-3 block align-top md:mt-0 md:table-cell md:px-6 md:py-5">
                    <ul className="flex flex-wrap gap-1.5">
                      {s.outputs.map((o) => (
                        <li key={o} className="rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-800">
                          {o}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {durations.length > 0 && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {durations.map((d) => (
              <div key={d._id} className="flex items-center gap-4 rounded-2xl bg-ink-950 p-6 text-white">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Clock className="size-5 text-brand-300" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold">{d.meta}</p>
                  <p className="text-sm text-ink-300">
                    {d.title}
                    {d.description ? ` — ${d.description}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {(testing.length > 0 || training.length > 0) && (
        <Section labelledBy="testing">
          <SectionHeading
            eyebrow="Testing, training & knowledge transfer"
            id="testing"
            title="A system is only delivered when your people can run it without us in the room."
          />
          {testing.length > 0 && (
            <>
              <h3 className="mt-12 text-sm font-semibold tracking-[0.14em] text-ink-400 uppercase">System testing</h3>
              <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {testing.map((t, i) => (
                  <li key={t._id} className="flex gap-4 rounded-2xl bg-ink-50 p-6 ring-1 ring-ink-100">
                    <span className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-xl text-white [&_svg]:size-5", hues[hueAt(i + 1)].solid)}>
                      <Icon name={t.icon} />
                    </span>
                    <div>
                      <h4 className="font-semibold">{t.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-ink-500">{t.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
          {training.length > 0 && (
            <>
              <h3 className="mt-12 text-sm font-semibold tracking-[0.14em] text-ink-400 uppercase">Training & documentation</h3>
              <ul className="mt-5 grid gap-5 md:grid-cols-3">
                {training.map((t, i) => (
                  <li key={t._id} className="rounded-2xl bg-white p-6 ring-1 ring-ink-200/70">
                    <span className={cn("inline-flex size-10 items-center justify-center rounded-xl text-white [&_svg]:size-5", hues[hueAt(i + 4)].solid)}>
                      <Icon name={t.icon} />
                    </span>
                    <h4 className="mt-4 font-semibold">{t.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{t.description}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-2xl bg-emerald-50 p-5 text-sm text-emerald-900 ring-1 ring-emerald-100">
                <span className="font-semibold">Proven track record:</span> we have delivered hands-on training and comprehensive documentation on every
                institutional deployment — ensuring smooth system usage and operational independence for the client.
              </p>
            </>
          )}
        </Section>
      )}

      {(support.length > 0 || sla.length > 0) && (
        <Section tone="muted" labelledBy="support">
          <SectionHeading
            eyebrow="After go-live"
            id="support"
            title="Post-deployment support framework."
            description="A structured post-implementation framework maintains system performance, resolves technical issues, supports users and keeps business operations running after go-live."
          />
          <IconCards items={support} offset={3} />
          {sla.length > 0 && (
            <>
              <h3 className="mt-14 text-sm font-semibold tracking-[0.14em] text-ink-400 uppercase">Indicative service levels</h3>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {sla.map((l, i) => (
                  <li key={l._id} className="overflow-hidden rounded-2xl bg-white ring-1 ring-ink-200/70">
                    <div className={cn("h-1.5", ["bg-rose-500", "bg-amber-500", "bg-sky-500", "bg-emerald-500"][i % 4])} aria-hidden="true" />
                    <div className="p-6">
                      <p className="font-display text-lg font-bold text-ink-900">{l.title}</p>
                      <p className="text-sm text-ink-500">{l.description}</p>
                      {l.meta && <p className="mt-4 font-semibold text-ink-900">{l.meta}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Section>
      )}

      {(controls.length > 0 || compliance.length > 0 || infrastructure.length > 0) && (
        <Section tone="dark" labelledBy="security">
          <SectionHeading
            eyebrow="Security, infrastructure & compliance"
            id="security"
            title="Controls that are part of every engagement — not an optional extra."
            description="Our clients answer to ministries, boards and international donors."
            inverse
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {[
              { title: "Controls", list: controls },
              { title: "Compliance & standards", list: compliance },
            ].map(
              (block) =>
                block.list.length > 0 && (
                  <div key={block.title} className="rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10">
                    <h3 className="font-semibold text-white">{block.title}</h3>
                    <ul className="mt-5 space-y-3">
                      {block.list.map((c) => (
                        <li key={c._id} className="flex gap-3 text-sm text-ink-200">
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" strokeWidth={2.5} aria-hidden="true" />
                          {c.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
            )}
          </div>
          {infrastructure.length > 0 && <IconCards items={infrastructure} columns={4} dark offset={1} />}
        </Section>
      )}

      <CtaBand
        title="Plan your programme with us."
        description="Tell us about the system you need. We'll walk you through the phases, deliverables and timeline for your engagement."
      />
    </>
  );
}
