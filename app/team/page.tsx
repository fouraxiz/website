import { UserRound } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { TeamPortrait } from "@/components/team/TeamPortrait";
import { pageMetadata } from "@/lib/metadata";
import { departments, leadership, team } from "@/data/team";

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

export default function TeamPage() {
  const groups = departments
    .filter((d) => d.name !== "Leadership")
    .map((d) => ({ ...d, members: team.filter((m) => m.department === d.name && !m.leadership) }));

  return (
    <>
      <PageHero
        decor={{ icons: ["code", "palette", "test-tube", "headset", "compass"], center: "users" }}
        crumbs={[{ label: "Company", href: "/about" }, { label: "Our Team" }]}
        eyebrow="Our team"
        title="The people who design, build and support your software."
        description="Engineers, designers, analysts and specialists working across three countries — united by a commitment to software that works well for the people who use it."
        actions={
          <ButtonLink href="/careers" variant="secondary" arrow>
            Join the team
          </ButtonLink>
        }
      />

      <Section labelledBy="leadership">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.4fr]">
          <div>
            <SectionHeading eyebrow="Leadership" id="leadership" title="Leading 4axiz." />
            <p className="mt-4 text-ink-500">{departments[0].description}</p>
          </div>
          <div>
            {leadership.length > 0 ? (
              <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {leadership.map((m) => (
                  <li key={m.id}>
                    <TeamPortrait member={m} showBio />
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <PlaceholderNote className="mb-8">
                  Leadership profiles are awaiting approval. Add members in <code className="rounded bg-white px-1 text-xs">data/team.ts</code> —
                  placeholders below show the final layout.
                </PlaceholderNote>
                <EmptySlots count={4} label="Leadership placeholders" />
              </>
            )}
          </div>
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
                <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                  {g.members.map((m) => (
                    <li key={m.id}>
                      <TeamPortrait member={m} />
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
