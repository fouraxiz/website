import type { TeamMember } from "@/types";

/**
 * Team directory.
 *
 * Intentionally empty: no team identities have been verified for publication.
 * The team page and homepage show clearly labelled placeholder slots until
 * real members are added. Add members like this (photo optional — place the
 * file in /public/images/team/):
 *
 *   {
 *     id: "jane-doe",
 *     name: "Jane Doe",
 *     role: "Chief Executive Officer",
 *     department: "Leadership",
 *     leadership: true,
 *     bio: "Short, approved biography.",
 *     photo: { src: "/images/team/jane-doe.jpg", alt: "Portrait of Jane Doe", width: 800, height: 1000 },
 *     linkedin: "https://www.linkedin.com/in/…",
 *   },
 */
export const team: TeamMember[] = [];

/** Department groupings shown on /team, in display order. */
export const departments = [
  { name: "Leadership", description: "Sets direction, partners with clients and owns delivery quality." },
  { name: "Engineering", description: "Builds and maintains the platforms, applications and integrations." },
  { name: "Design", description: "Shapes the user experience and visual language of every product." },
  { name: "Quality Assurance", description: "Tests every release and guards product quality." },
  { name: "Project Delivery", description: "Plans engagements and keeps clients informed." },
  { name: "Support", description: "Helps clients get the most from their systems after launch." },
];

export const leadership = team.filter((m) => m.leadership);
