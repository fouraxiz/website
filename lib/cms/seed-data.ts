/**
 * Initial content for every collection, built from the files in /data.
 * Used by `npm run db:seed` and as a read fallback when no DATABASE_URL is set
 * (e.g. local preview without a database).
 */
import { slugify } from "./fields";
import { site, companyFacts, offices, socialLinks, stats, technologies, companyValues, mission, vision, strengths, milestones, engagementModels, missionPractice, trustNote, strategicFocus, pillars, presenceStats, domains, sectors, clientMix, outcomes, bankDetails } from "@/data/site";
import { mainNav } from "@/data/navigation";
import { slides } from "@/data/slides";
import { sectionDefaults, homeSectionOrder } from "@/data/sections";
import { processSteps } from "@/data/process";
import { deliveryItems } from "@/data/delivery";
import { solutions } from "@/data/solutions";
import { erpModules } from "@/data/erp-modules";
import { products, readyProducts } from "@/data/products";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { industries } from "@/data/industries";
import { team, teamRoles, differentiators, shortVersion } from "@/data/team";
import { clients, engagements, clientGroups } from "@/data/clients";
import { testimonials } from "@/data/testimonials";
import { jobOpenings } from "@/data/careers";

export interface SeedItem {
  slug: string;
  data: Record<string, unknown>;
}

const bySlug = <T extends { slug: string }>(items: T[], map: (i: T) => Record<string, unknown> = (i) => ({ ...i })) =>
  items.map((i) => {
    const data = map(i);
    delete data.slug;
    return { slug: i.slug, data };
  });

const byName = <T,>(items: readonly T[], name: (i: T) => string, map: (i: T) => Record<string, unknown> = (i) => ({ ...(i as object) })) =>
  items.map((i) => ({ slug: slugify(name(i)), data: map(i) }));

export function buildSeed(): Record<string, SeedItem[]> {
  const sectionKeys = [...homeSectionOrder, ...Object.keys(sectionDefaults).filter((k) => !homeSectionOrder.includes(k))];
  return {
    settings: [
      {
        slug: "site",
        data: {
          legalName: site.legalName,
          tagline: site.tagline,
          description: site.description,
          phone: site.phone,
          email: site.email,
          foundedYear: site.foundedYear,
          topbarLocation: "Mirpur 12, Dhaka, Bangladesh",
          established: companyFacts.established,
          incorporationNo: companyFacts.incorporationNo,
          basisMembership: companyFacts.basisMembership,
          tradeLicence: companyFacts.tradeLicence,
          teamsId: companyFacts.teamsId,
          secondaryEmail: companyFacts.secondaryEmail,
          websites: companyFacts.websites,
          coverLine: companyFacts.coverLine,
          officeSetup: companyFacts.officeSetup,
          deliveryCapability: companyFacts.deliveryCapability,
          programmeReach: companyFacts.programmeReach,
          connectivity: companyFacts.connectivity,
          practice: missionPractice,
          trustNote,
          strategicFocus,
          shortVersion,
          vatNo: companyFacts.vatNo,
          tin: companyFacts.tin,
          showBankDetails: true,
          ...bankDetails,
          mission,
          vision,
          socials: socialLinks.filter((s) => s.url).map((s) => ({ network: s.network, url: s.url })),
        },
      },
    ],
    nav: byName(mainNav, (n) => n.label, (n) => ({
      label: n.label,
      href: n.href,
      menu: n.menu ?? "",
      children: (n.children ?? []).map((c) => ({ label: c.label, href: c.href, description: c.description ?? null, icon: c.icon ?? "layers" })),
    })),
    slides: byName(slides, (s) => s.eyebrow, (s) => ({ ...s })),
    sections: sectionKeys.map((k) => ({ slug: k, data: { ...sectionDefaults[k] } })),
    stats: byName(stats, (s) => s.label),
    technologies: byName(technologies, (t) => t.name, (t) => ({ name: t.name, icon: t.icon, image: null, category: t.category })),
    how_we_work: deliveryItems.map((it, i) => ({ slug: `${it.group}-${slugify(it.title)}-${i}`, data: { icon: null, points: [], meta: null, ...it } })),
    values: byName(companyValues, (v) => v.title),
    pillars: byName(pillars, (v) => v.title),
    domains: byName(domains, (v) => v.title),
    team_roles: byName(teamRoles, (v) => v.title),
    differentiators: byName(differentiators, (v) => v.title),
    outcomes: byName(outcomes, (v) => v.label),
    sectors: byName(sectors, (v) => v.title),
    client_mix: byName(clientMix, (v) => v.label),
    presence_stats: byName(presenceStats, (v) => v.label),
    strengths: byName(strengths, (v) => v.title),
    milestones: byName(milestones, (m) => m.title),
    engagement: byName(engagementModels, (m) => m.title),
    ready_products: byName(readyProducts, (p) => p.name, (p) => ({ name: p.name, icon: p.icon, summary: p.summary, href: p.href })),
    process: byName(processSteps, (p) => p.title),
    solutions: bySlug(solutions, (s) => {
      const { href: _href, ...rest } = s;
      void _href;
      return { ...rest };
    }),
    erp_modules: bySlug(erpModules, (m) => {
      const { mockup, published: _p, ...rest } = m;
      void _p;
      return { ...rest, mockupMetrics: [...mockup.metricLabels], mockupRows: [...mockup.rows] };
    }),
    products: bySlug(products, (p) => {
      const { mockup, ...rest } = p;
      return { ...rest, image: null, erpModule: p.erpModule ?? null, relatedProject: p.relatedProject ?? null, mockupMetrics: [...mockup.metricLabels], mockupRows: [...mockup.rows] };
    }),
    services: bySlug(services),
    projects: bySlug(projects, (p) => ({ ...p, images: p.images.map((i) => ({ src: i.src, alt: i.alt })) })),
    industries: bySlug(industries),
    team: byName(team, (m) => m.name, (m) => ({ ...m, photo: m.photo?.src ?? null })),
    offices: offices.map((o) => {
      const { id, ...rest } = o;
      return { slug: id, data: { ...rest } };
    }),
    engagements: engagements.map((e, i) => ({ slug: `${slugify(e.client)}-${i}`, data: { ...e } })),
    client_groups: byName(clientGroups, (g) => g.title),
    clients: byName(clients, (c) => c.name, (c) => ({ name: c.name, logo: c.logo.src, url: c.url ?? null })),
    testimonials: byName(
      testimonials.filter((t) => t.approved),
      (t) => t.name,
      (t) => ({ quote: t.quote, name: t.name, title: t.title, organisation: t.organisation, photo: null }),
    ),
    jobs: byName(jobOpenings, (j) => j.title, (j) => ({ ...j })),
    posts: [],
  };
}
