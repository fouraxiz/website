import { UserRound } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { TeamPortrait } from "@/components/team/TeamPortrait";
import { pageMetadata } from "@/lib/metadata";
import { departments, teamComposition } from "@/data/team";
import { getDifferentiators, getSection, getSettings, getTeam, getTeamRoles } from "@/lib/cms/content";
import { Icon } from "@/lib/icons";
import { hues, hueAt } from "@/lib/palette";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Our Team",
  description: "Meet the people of 4axiz IT Limited — the leadership, engineers, designers and specialists behind our software and services.",
  path: "/team",
});

function EmptySlots({ count, label }: { count: number; label: string }) {
  return (
    <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4" aria-label={label}>
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-[var(--radius-card)] border border-dashed border-ink-300 bg-ink-50 text-ink-400">
            <UserRound className="size-10" strokeWidth={1.25} aria-hidden="true" />
            <span className="mt-3 text-xs">Portrait placeholder</span>
          </div>
          <div className="mt-4 space-y-2" aria-hidden="true">
            <span className="block h-3 w-2/3 rounded bg-ink-100" />
            <span className="block h-2.5 w-1/2 rounded bg-ink-100" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default async function TeamPage() {
  const [team, copy, roles, apart, site] = await Promise.all([getTeam(), getSection("page.team"), getTeamRoles(), getDifferentiators(), getSettings()]);
  const leadership = team.filter((m) => m.leadership);
  const groups = departments
    .filter((d) => d.name !== "Leadership")
    .map((d) => ({ ...d, members: team.filter((m) => m.department === d.name && !m.leadership) }))
    .filter((d) => d.members.length > 0);

  return (
    <>
      <PageHero
        edit={[{ label: "Heading", collection: "sections", slug: "page.team" }, { label: "Team members", collection: "team" }, { label: "Add team member", collection: "team", create: true }, { label: "Team roles", collection: "team_roles" }, { label: "What sets us apart", collection: "differentiators" }]}
        aside={
          team.length > 0 ? (
            <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
              <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-100/60 via-ink-100/60 to-transparent blur-xl" />
              <ul className="grid grid-cols-3 gap-3">
                {team.slice(0, 8).map((m, i) => (
                  <li key={m.id} className={cn("flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br shadow-[var(--shadow-soft)]", i % 3 === 1 ? "translate-y-4" : "", i % 2 === 0 ? "from-brand-500 to-brand-700" : "from-ink-600 to-ink-900")}>
                    <span className="font-display text-2xl font-bold text-white/95">{m.name.replace(/\b(Md|Mst)\.?\s/gi, "").split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
                  </li>
                ))}
                <li className="col-span-1 flex aspect-square flex-col items-center justify-center rounded-3xl bg-white text-center shadow-[var(--shadow-soft)] ring-1 ring-ink-200">
                  <span className="font-display text-3xl font-bold text-brand-600">45</span>
                  <span className="text-xs text-ink-500">specialists</span>
                </li>
              </ul>
            </div>
          ) : undefined
        }
        decor={{ icons: ["code", "palette", "test-tube", "headset", "compass"], center: "users" }}
        crumbs={[{ label: "Company", href: "/about" }, { label: "Our Team" }]}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        actions={
          <ButtonLink href="/careers" variant="secondary" arrow>
            Join the team
          </ButtonLink>
        }
      />

      <Section labelledBy="leadership">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Key personnel" id="leadership" title="The core team on our programmes." description={departments[0].description} />
        </div>
        <div className="mt-14">
          {leadership.length > 0 ? (
            <ul className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {leadership.map((m) => (
                <li key={m.id}>
                  <TeamPortrait member={m} featured />
                </li>
              ))}
            </ul>
          ) : (
            <>
              <PlaceholderNote className="mb-8">
                Leadership profiles are awaiting approval. Sign in and use edit mode to add team members — placeholders below show the final layout.
              </PlaceholderNote>
              <EmptySlots count={4} label="Leadership placeholders" />
            </>
          )}
        </div>
      </Section>

      <Section tone="dark" labelledBy="composition">
        <SectionHeading
          eyebrow="Team composition"
          id="composition"
          title="45 specialists in one building."
          description="Every engagement is staffed from one in-house team — no subcontracting, no hand-offs between vendors. Almost nine in ten of our engineers are mid-level or senior."
          inverse
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {teamComposition.map((g) => {
            const colors = ["#e4603a", "#f5a386", "#98a1a9"];
            let acc = 0;
            const stops = g.items.map((it, i) => {
              const from = acc;
              acc += it.value;
              return `${colors[i % colors.length]} ${from}% ${acc}%`;
            });
            return (
              <div key={g.title} className="rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10">
                <h3 className="text-sm font-semibold tracking-[0.12em] text-ink-300 uppercase">{g.title}</h3>
                <div className="mt-6 flex items-center gap-6">
                  <div className="relative size-32 shrink-0 rounded-full" style={{ background: `conic-gradient(${stops.join(", ")})` }} role="img" aria-label={g.items.map((it) => `${it.label} ${it.value}%`).join(", ")}>
                    <div className="absolute inset-[22%] flex items-center justify-center rounded-full bg-ink-950">
                      <span className="font-display text-xl font-bold text-white">{g.items[0].value}%</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {g.items.map((it, i) => (
                      <li key={it.label} className="flex items-start gap-2.5 text-sm text-ink-200">
                        <span className="mt-1.5 size-2.5 shrink-0 rounded-full" style={{ background: colors[i % colors.length] }} aria-hidden="true" />
                        <span>
                          <span className="font-semibold text-white">{it.value}%</span> {it.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {roles.length > 0 && (
        <Section labelledBy="roles">
          <SectionHeading
            eyebrow="Team composition"
            id="roles"
            title="A multidisciplinary team — every engagement staffed in-house."
            description="We maintain a multidisciplinary team of software engineers, business analysts, UI/UX designers, database specialists, system architects and project managers."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((r, i) => (
              <li key={r._id} className="group flex gap-4 rounded-3xl bg-ink-50 p-6 ring-1 ring-ink-100 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[var(--shadow-soft)] hover:ring-brand-200">
                <span className={cn("inline-flex size-11 shrink-0 items-center justify-center rounded-xl text-white [&_svg]:size-5", hues[hueAt(i)].solid)}>
                  <Icon name={r.icon} />
                </span>
                <div>
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">{r.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone="muted" labelledBy="teams">
        <SectionHeading eyebrow="Teams" id="teams" title="How we're organised." />
        <div className="mt-12 space-y-12">
          {groups.map((g) => (
            <div key={g.name}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-ink-200 pb-4">
                <h3 className="text-xl font-semibold">{g.name}</h3>
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">{g.members.length}</span>
                <p className="w-full text-sm leading-relaxed text-ink-500 sm:ml-2 sm:w-auto">{g.description}</p>
              </div>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {g.members.map((m) => (
                  <li key={m.id}>
                    <TeamPortrait member={m} showBio />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {apart.length > 0 && (
        <Section labelledBy="apart">
          <SectionHeading eyebrow="Why 4axiz" id="apart" title="What sets our engineering apart." />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {apart.map((a, i) => (
              <li key={a._id} className="rounded-3xl bg-white p-6 ring-1 ring-ink-200/70">
                <span className={cn("font-display text-sm font-bold", hues[hueAt(i)].text)}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-semibold">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{a.description}</p>
              </li>
            ))}
          </ol>
          {site.shortVersion && (
            <div className="mt-8 rounded-3xl bg-ink-950 p-8 sm:p-10">
              <p className="eyebrow text-brand-300">The short version</p>
              <p className="mt-4 max-w-4xl font-display text-xl leading-snug font-semibold text-white sm:text-2xl">{site.shortVersion}</p>
            </div>
          )}
        </Section>
      )}

      <CtaBand
        title="Want to work with this team?"
        description="Whether you're planning a project or looking for your next role, we'd like to hear from you."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "View careers", href: "/careers" }}
      />
    </>
  );
}
