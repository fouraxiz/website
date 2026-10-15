import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { asc } from "drizzle-orm";
import { db, hasDatabase } from "@/lib/db";
import { contentItems } from "@/lib/db/schema";
import { getSession } from "@/lib/auth/session";
import { buildSeed } from "./seed-data";
import { ensureContentSynced, seedHash } from "./sync";
import { site as siteConst } from "@/data/site";
import { sectionDefaults, type SectionCopy } from "@/data/sections";
import type { Slide } from "@/data/slides";
import type {
  IconName,
  ErpModule,
  Industry,
  JobOpening,
  NavItem,
  Office,
  ProcessStep,
  Product,
  Project,
  Service,
  SocialLink,
  Solution,
  TeamMember,
  Testimonial,
} from "@/types";
import type { MenuKind } from "@/data/navigation";

export interface RawItem {
  id: string;
  slug: string;
  data: Record<string, unknown>;
  status: "published" | "draft";
  sort: number;
}

/** Metadata attached to every item so edit mode can address it. */
export interface Meta {
  _id: string;
  _status: "published" | "draft";
}

export const contentTag = (collection: string) => `content:${collection}`;

async function readAll(): Promise<Record<string, RawItem[]>> {
  if (!hasDatabase) {
    const seed = buildSeed();
    return Object.fromEntries(
      Object.entries(seed).map(([c, items]) => [c, items.map((it, i) => ({ id: `${c}:${it.slug}`, slug: it.slug, data: it.data, status: "published" as const, sort: i * 10 }))]),
    );
  }
  await ensureContentSynced(db);
  const rows = await db.select().from(contentItems).orderBy(asc(contentItems.collection), asc(contentItems.sort), asc(contentItems.createdAt));
  const out: Record<string, RawItem[]> = {};
  for (const r of rows) (out[r.collection] ??= []).push({ id: r.id, slug: r.slug, data: r.data, status: r.status, sort: r.sort });
  return out;
}

/** Published content, cached across requests until an edit revalidates the "content" tag. */
const readPublished = unstable_cache(
  async () => {
    const all = await readAll();
    for (const k of Object.keys(all)) all[k] = all[k].filter((i) => i.status === "published");
    return all;
  },
  // The key includes a hash of /data so a new release never serves content cached by the previous one.
  ["cms-content", seedHash()],
  { tags: ["content"] },
);

/** Per-request snapshot: signed-in editors also see drafts (uncached). */
const snapshot = cache(async () => ((await getSession()) ? readAll() : readPublished()));

export async function getRaw(collection: string): Promise<RawItem[]> {
  return (await snapshot())[collection] ?? [];
}

const meta = (r: RawItem): Meta => ({ _id: r.id, _status: r.status });
const str = (v: unknown) => (v === null || v === undefined ? "" : String(v));
const strOrNull = (v: unknown) => (v === null || v === undefined || v === "" ? null : String(v));
const arr = <T = string,>(v: unknown) => (Array.isArray(v) ? (v as T[]) : []);
const img = (src: unknown, alt = "") => (src ? { src: String(src), alt, width: 1600, height: 1000 } : null);

async function list<T>(collection: string, map: (d: Record<string, unknown>, r: RawItem) => T): Promise<(T & Meta)[]> {
  return (await getRaw(collection)).map((r) => ({ ...map(r.data, r), ...meta(r) }));
}

/* ---------------- Settings ---------------- */

export interface Settings {
  legalName: string;
  name: string;
  url: string;
  tagline: string;
  description: string;
  phone: string | null;
  email: string | null;
  foundedYear: number | null;
  topbarLocation: string | null;
  mission: string;
  vision: string;
  socials: SocialLink[];
  established: string | null;
  incorporationNo: string | null;
  basisMembership: string | null;
  tradeLicence: string | null;
  teamsId: string | null;
  secondaryEmail: string | null;
  websites: string | null;
  coverLine: string | null;
  officeSetup: string | null;
  deliveryCapability: string | null;
  programmeReach: string | null;
  connectivity: string | null;
  practice: string[];
  trustNote: string | null;
  strategicFocus: string | null;
  shortVersion: string | null;
  vatNo: string | null;
  tin: string | null;
  showBankDetails: boolean;
  bankAccountName: string | null;
  bankName: string | null;
  bankBranch: string | null;
  bankAccountNo: string | null;
  bankRouting: string | null;
  bankSwift: string | null;
}

export const getSettings = cache(async (): Promise<Settings & Partial<Meta>> => {
  const r = (await getRaw("settings")).find((i) => i.slug === "site");
  const d = r?.data ?? {};
  return {
    name: siteConst.name,
    url: siteConst.url,
    legalName: str(d.legalName) || siteConst.legalName,
    tagline: str(d.tagline),
    description: str(d.description) || siteConst.description,
    phone: strOrNull(d.phone),
    email: strOrNull(d.email),
    foundedYear: typeof d.foundedYear === "number" ? d.foundedYear : null,
    topbarLocation: strOrNull(d.topbarLocation),
    mission: str(d.mission),
    vision: str(d.vision),
    socials: arr<SocialLink>(d.socials).filter((s) => s.url),
    established: strOrNull(d.established),
    incorporationNo: strOrNull(d.incorporationNo),
    basisMembership: strOrNull(d.basisMembership),
    tradeLicence: strOrNull(d.tradeLicence),
    teamsId: strOrNull(d.teamsId),
    secondaryEmail: strOrNull(d.secondaryEmail),
    websites: strOrNull(d.websites),
    coverLine: strOrNull(d.coverLine),
    officeSetup: strOrNull(d.officeSetup),
    deliveryCapability: strOrNull(d.deliveryCapability),
    programmeReach: strOrNull(d.programmeReach),
    connectivity: strOrNull(d.connectivity),
    practice: arr<string>(d.practice),
    trustNote: strOrNull(d.trustNote),
    strategicFocus: strOrNull(d.strategicFocus),
    shortVersion: strOrNull(d.shortVersion),
    vatNo: strOrNull(d.vatNo),
    tin: strOrNull(d.tin),
    showBankDetails: Boolean(d.showBankDetails),
    bankAccountName: strOrNull(d.bankAccountName),
    bankName: strOrNull(d.bankName),
    bankBranch: strOrNull(d.bankBranch),
    bankAccountNo: strOrNull(d.bankAccountNo),
    bankRouting: strOrNull(d.bankRouting),
    bankSwift: strOrNull(d.bankSwift),
    ...(r ? meta(r) : {}),
  };
});

/* ---------------- Navigation, slides, sections ---------------- */

export type NavEntry = NavItem & { menu?: MenuKind } & Meta;

export const getNav = cache(async (): Promise<NavEntry[]> =>
  list("nav", (d) => ({
    label: str(d.label),
    href: str(d.href) || "/",
    menu: (strOrNull(d.menu) as MenuKind | null) ?? undefined,
    children: arr<Record<string, unknown>>(d.children).length
      ? arr<Record<string, unknown>>(d.children).map((c) => ({
          label: str(c.label),
          href: str(c.href) || "/",
          description: strOrNull(c.description) ?? undefined,
          icon: (strOrNull(c.icon) ?? "layers") as IconName,
        }))
      : undefined,
  })),
);

export const getSlides = cache(async () => list<Slide>("slides", (d) => d as unknown as Slide));

export type SectionEntry = SectionCopy & { key: string } & Partial<Meta>;

export const getSections = cache(async (): Promise<SectionEntry[]> =>
  (await getRaw("sections")).map((r) => ({ ...sectionDefaults[r.slug], ...(r.data as Partial<SectionCopy>), key: r.slug, ...meta(r) })),
);

export async function getSection(key: string): Promise<SectionEntry> {
  const found = (await getSections()).find((s) => s.key === key);
  return found ?? { ...(sectionDefaults[key] ?? { eyebrow: null, title: null, highlight: null, description: null, hidden: false }), key };
}

/* ---------------- Simple lists ---------------- */

export const getStats = cache(async () => list("stats", (d) => ({ value: str(d.value), label: str(d.label) })));
export const getTechnologies = cache(async () =>
  list("technologies", (d) => ({ name: str(d.name), icon: str(d.icon), image: strOrNull(d.image), category: str(d.category) })),
);
export const getValues = cache(async () => list("values", (d) => ({ title: str(d.title), tagline: strOrNull(d.tagline), description: str(d.description) })));
export const getDomains = cache(async () => list("domains", (d) => ({ title: str(d.title), icon: (str(d.icon) || "layers") as IconName, description: str(d.description) })));
export const getSectors = cache(async () => list("sectors", (d) => ({ title: str(d.title), icon: (str(d.icon) || "layers") as IconName, clients: str(d.clients) })));
export const getClientMix = cache(async () => list("client_mix", (d) => ({ value: str(d.value), label: str(d.label) })));
export const getHowWeWork = cache(async () =>
  list("how_we_work", (d) => ({
    group: str(d.group),
    title: str(d.title),
    icon: (str(d.icon) || "layers") as IconName,
    description: str(d.description),
    meta: strOrNull(d.meta),
    points: arr<string>(d.points),
  })),
);
export const getOutcomes = cache(async () => list("outcomes", (d) => ({ value: str(d.value), label: str(d.label) })));
export const getEngagements = cache(async () =>
  list("engagements", (d) => ({ client: str(d.client), scope: str(d.scope), years: str(d.years), href: strOrNull(d.href), products: arr<string>(d.products), services: arr<string>(d.services) })),
);
export const getClientGroups = cache(async () => list("client_groups", (d) => ({ title: str(d.title), names: str(d.names) })));
export const getTeamRoles = cache(async () => list("team_roles", (d) => ({ title: str(d.title), icon: (str(d.icon) || "users") as IconName, description: str(d.description) })));
export const getDifferentiators = cache(async () => list("differentiators", (d) => ({ title: str(d.title), description: str(d.description) })));
export const getPillars = cache(async () => list("pillars", (d) => ({ title: str(d.title), description: str(d.description) })));
export const getPresenceStats = cache(async () => list("presence_stats", (d) => ({ value: str(d.value), label: str(d.label) })));
export const getStrengths = cache(async () => list("strengths", (d) => ({ title: str(d.title), description: str(d.description) })));
export const getMilestones = cache(async () => list("milestones", (d) => ({ year: str(d.year), title: str(d.title), description: str(d.description) })));
export const getEngagementModels = cache(async () => list("engagement", (d) => ({ title: str(d.title), description: str(d.description) })));
export const getReadyProducts = cache(async () =>
  list("ready_products", (d) => ({ name: str(d.name), icon: (str(d.icon) || "layers") as IconName, summary: strOrNull(d.summary), href: strOrNull(d.href) })),
);
export const getProcess = cache(async () => list<ProcessStep>("process", (d) => ({ ...(d as unknown as ProcessStep), outputs: arr(d.outputs) })));
export const getOffices = cache(async () =>
  list<Office>("offices", (d, r) => ({
    id: r.slug,
    country: str(d.country),
    countryCode: str(d.countryCode),
    role: strOrNull(d.role),
    description: strOrNull(d.description),
    city: strOrNull(d.city),
    address: strOrNull(d.address),
    phone: strOrNull(d.phone),
    email: strOrNull(d.email),
    hours: strOrNull(d.hours),
    timezone: str(d.timezone),
    mapUrl: strOrNull(d.mapUrl),
    lat: typeof d.lat === "number" ? d.lat : null,
    lng: typeof d.lng === "number" ? d.lng : null,
  })),
);
export const getClients = cache(async () => list("clients", (d) => ({ name: str(d.name), logo: str(d.logo), url: strOrNull(d.url), products: arr<string>(d.products), services: arr<string>(d.services) })));
export const getTestimonials = cache(async () =>
  list<Testimonial & { photo: string | null }>("testimonials", (d, r) => ({
    id: r.slug,
    quote: str(d.quote),
    name: str(d.name),
    title: str(d.title),
    organisation: str(d.organisation),
    approved: true,
    photo: strOrNull(d.photo),
  })),
);
export const getJobs = cache(async () => list<JobOpening>("jobs", (d, r) => ({ ...(d as unknown as JobOpening), id: r.slug })));

/* ---------------- Main collections ---------------- */

export const getSolutions = cache(async () =>
  list<Solution>("solutions", (d, r) => ({
    ...(d as unknown as Solution),
    slug: r.slug,
    href: `/solutions/${r.slug}`,
    problems: arr(d.problems),
    capabilities: arr(d.capabilities),
    approach: arr(d.approach),
    outcomes: arr(d.outcomes),
    relatedServices: arr(d.relatedServices),
    relatedProjects: arr(d.relatedProjects),
    relatedIndustries: arr(d.relatedIndustries),
  })),
);

export const getErpModules = cache(async () =>
  list<ErpModule>("erp_modules", (d, r) => {
    const metrics = arr(d.mockupMetrics);
    return {
      ...(d as unknown as ErpModule),
      slug: r.slug,
      published: true,
      status: ((strOrNull(d.status) ?? "on-request") as ErpModule["status"]),
      problems: arr(d.problems),
      capabilities: arr(d.capabilities),
      workflow: arr(d.workflow),
      benefits: arr(d.benefits),
      related: arr(d.related),
      mockup: { metricLabels: [metrics[0] ?? "Overview", metrics[1] ?? "Pending", metrics[2] ?? "Completed"], rows: arr(d.mockupRows) },
    };
  }),
);

export const getProducts = cache(async () =>
  list<Product & { image: string | null }>("products", (d, r) => {
    const metrics = arr(d.mockupMetrics);
    return {
      ...(d as unknown as Product),
      slug: r.slug,
      image: strOrNull(d.image),
      features: arr(d.features),
      benefits: arr(d.benefits),
      integrations: arr(d.integrations),
      audience: arr(d.audience),
      erpModule: strOrNull(d.erpModule) ?? undefined,
      relatedProject: strOrNull(d.relatedProject) ?? undefined,
      mockup: { metricLabels: [metrics[0] ?? "Overview", metrics[1] ?? "Pending", metrics[2] ?? "Completed"], rows: arr(d.mockupRows) },
    };
  }),
);

export const getServices = cache(async () =>
  list<Service>("services", (d, r) => ({
    ...(d as unknown as Service),
    slug: r.slug,
    featured: Boolean(d.featured),
    deliverables: arr(d.deliverables),
    benefits: arr(d.benefits),
    process: arr(d.process),
    technologies: arr(d.technologies),
    relatedProjects: arr(d.relatedProjects),
  })),
);

export const getProjects = cache(async () =>
  list<Project>("projects", (d, r) => ({
    ...(d as unknown as Project),
    slug: r.slug,
    categories: arr(d.categories),
    platform: arr(d.platform),
    client: strOrNull(d.client),
    challenge: strOrNull(d.challenge),
    solution: strOrNull(d.solution),
    highlights: arr(d.highlights),
    technologies: arr(d.technologies),
    images: arr<{ src: string; alt: string }>(d.images)
      .filter((i) => i?.src)
      .map((i) => img(i.src, i.alt || str(d.name))!),
    liveUrl: strOrNull(d.liveUrl),
    featured: Boolean(d.featured),
    theme: ((strOrNull(d.theme) ?? "blue") as Project["theme"]),
    relatedSolutions: arr(d.relatedSolutions),
    duration: strOrNull(d.duration),
    featuresTitle: strOrNull(d.featuresTitle),
    features: arr(d.features),
    technicalTitle: strOrNull(d.technicalTitle),
    technical: arr(d.technical),
    stats: arr(d.stats),
    impactTitle: strOrNull(d.impactTitle),
    impact: strOrNull(d.impact),
    deliveryTags: arr(d.deliveryTags),
  })),
);

export const getIndustries = cache(async () =>
  list<Industry>("industries", (d, r) => ({
    ...(d as unknown as Industry),
    slug: r.slug,
    challenges: arr(d.challenges),
    solutions: arr(d.solutions),
    relatedProjects: arr(d.relatedProjects),
  })),
);

export const getTeam = cache(async () =>
  list<TeamMember>("team", (d, r) => ({
    id: r.slug,
    name: str(d.name),
    role: str(d.role),
    department: str(d.department),
    leadership: Boolean(d.leadership),
    bio: strOrNull(d.bio),
    photo: img(d.photo, `Portrait of ${str(d.name)}`),
    linkedin: strOrNull(d.linkedin),
  })),
);

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  cover: string | null;
  category: string | null;
  tags: string[];
  author: string | null;
  publishedAt: string | null;
  body: string;
  seoDescription: string | null;
}

export const getPosts = cache(async () =>
  (
    await list<Post>("posts", (d, r) => ({
      slug: r.slug,
      title: str(d.title),
      excerpt: str(d.excerpt),
      cover: strOrNull(d.cover),
      category: strOrNull(d.category),
      tags: arr(d.tags),
      author: strOrNull(d.author),
      publishedAt: strOrNull(d.publishedAt),
      body: str(d.body),
      seoDescription: strOrNull(d.seoDescription),
    }))
  ).sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")),
);

/** Find by slug helper. */
export function bySlug<T extends { slug: string }>(items: T[], slug: string) {
  return items.find((i) => i.slug === slug);
}
export function pickSlugs<T extends { slug: string }>(items: T[], slugs: string[]) {
  return slugs.map((s) => items.find((i) => i.slug === s)).filter((x): x is T => Boolean(x));
}
