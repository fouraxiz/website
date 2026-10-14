import { UserRound } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { TeamPortrait } from "@/components/team/TeamPortrait";
import { pageMetadata } from "@/lib/metadata";
import { departments, teamComposition } from "@/data/team";
import { getSection, getTeam } from "@/lib/cms/content";

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
  const [team, copy] = await Promise.all([getTeam(), getSection("page.team")]);
  const leadership = team.filter((m) => m.leadership);
  const groups = departments
    .filter((d) => d.name !== "Leadership")
    .map((d) => ({ ...d, members: team.filter((m) => m.department === d.name && !m.leadership) }))
    .filter((d) => d.members.length > 0);

  return (
    <>
      <PageHero
        edit={[{ label: "Heading", collection: "sections", slug: "page.team" }, { label: "Team members", collection: "team" }, { label: "Add team member", collection: "team", create: true }]}
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
        <div className="grid gap-12 lg:grid-cols-[1fr_2.4fr]">
          <div>
            <SectionHeading eyebrow="Key personnel" id="leadership" title="The core team on our programmes." />
            <p className="mt-4 text-ink-500">{departments[0].description}</p>
          </div>
          <div>
            {leadership.length > 0 ? (
              <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {leadership.map((m) => (
                  <li key={m.id}>
                    <TeamPortrait member={m} showBio />
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
          {teamComposition.map((g) => (
            <div key={g.title} className="rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10">
              <h3 className="text-sm font-semibold tracking-[0.12em] text-ink-300 uppercase">{g.title}</h3>
              <ul className="mt-6 space-y-5">
                {g.items.map((it, i) => (
                  <li key={it.label}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-sm text-ink-200">{it.label}</span>
                      <span className="font-display text-xl font-bold text-white">{it.value}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className={`h-full rounded-full ${["bg-brand-500", "bg-accent-500", "bg-sky-400"][i % 3]}`} style={{ width: `${it.value}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted" labelledBy="teams">
        <SectionHeading eyebrow="Teams" id="teams" title="How we're organised." />
        <div className="mt-12 space-y-14">
          {groups.map((g) => (
            <div key={g.name} className="grid gap-8 border-t border-ink-200 pt-8 lg:grid-cols-[1fr_2.4fr]">
              <div>
                <h3 className="text-xl font-semibold">{g.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{g.description}</p>
              </div>
              {g.members.length > 0 ? (
                <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {g.members.map((m) => (
                    <li key={m.id}>
                      <TeamPortrait member={m} showBio />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="self-center text-sm text-ink-400 italic">Team profiles coming soon.</p>
              )}
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Want to work with this team?"
        description="Whether you're planning a project or looking for your next role, we'd like to hear from you."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "View careers", href: "/careers" }}
      />
    </>
  );
}
