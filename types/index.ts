/**
 * Shared content models. All repeatable site content lives in /data and is
 * typed here so pages and templates stay presentation-only.
 *
 * Convention: a field typed `string | null` that is `null` means the value has
 * not been verified/supplied by 4axiz yet. Components render an explicit
 * "to be confirmed" state instead of inventing a value.
 */

export type IconName =
  | "boxes"
  | "brain"
  | "code"
  | "globe"
  | "smartphone"
  | "workflow"
  | "shopping-cart"
  | "calculator"
  | "users"
  | "wallet"
  | "kanban"
  | "scan-barcode"
  | "package"
  | "truck"
  | "monitor-cog"
  | "shopping-bag"
  | "badge-check"
  | "id-card"
  | "shield-check"
  | "stethoscope"
  | "bar-chart"
  | "palette"
  | "plug"
  | "cloud"
  | "test-tube"
  | "life-buoy"
  | "graduation-cap"
  | "heart-handshake"
  | "landmark"
  | "factory"
  | "briefcase"
  | "file-text"
  | "message-square"
  | "trending-up"
  | "sparkles"
  | "lock"
  | "headset"
  | "search"
  | "compass"
  | "pen-tool"
  | "rocket"
  | "layers"
  | "server"
  | "network"
  | "megaphone"
  | "activity"
  | "archive"
  | "building"
  | "hospital"
  | "utensils"
  | "shirt"
  | "house"
  | "pill"
  | "clipboard-check"
  | "clock"
  | "bed"
  | "fingerprint"
  | "gauge"
  | "database"
  | "siren"
  | "map-pin";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: IconName;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface Office {
  id: string;
  country: string;
  countryCode: string;
  /** Short role of the office, e.g. "Headquarters". `null` until confirmed. */
  role: string | null;
  city: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  hours: string | null;
  timezone: string;
  /** Only set once a verified street address exists. */
  mapUrl: string | null;
}

export interface SocialLink {
  network: "linkedin" | "facebook" | "x" | "youtube" | "github" | "instagram";
  /** `null` until the official profile URL is confirmed. Not rendered when null. */
  url: string | null;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface Solution {
  slug: string;
  /** Route for the solution. ERP has its own section under /solutions/erp. */
  href: string;
  title: string;
  shortTitle: string;
  icon: IconName;
  tagline: string;
  summary: string;
  intro: string;
  problems: string[];
  capabilities: FeatureItem[];
  approach: FeatureItem[];
  outcomes: string[];
  relatedServices: string[];
  relatedProjects: string[];
  relatedIndustries: string[];
  seoDescription: string;
}

export type ErpModuleStatus = "available" | "on-request" | "in-development";

export interface ErpModule {
  slug: string;
  title: string;
  shortTitle: string;
  icon: IconName;
  group: "Finance & Operations" | "People" | "Commerce & Supply" | "Assets & Service" | "Insight" | "Industry";
  /**
   * Whether the module page is published. Set to false to hide a module from
   * navigation, listings and the sitemap without deleting its content.
   */
  published: boolean;
  /**
   * Commercial availability. Defaults to "on-request" until 4axiz confirms
   * which modules ship as part of a standard package.
   */
  status: ErpModuleStatus;
  tagline: string;
  summary: string;
  problems: string[];
  capabilities: FeatureItem[];
  workflow: string[];
  benefits: string[];
  related: string[];
  /** Labels shown in the generated interface mockup. */
  mockup: { metricLabels: [string, string, string]; rows: string[] };
}

export type ProductKind = "platform" | "standalone" | "erp-module" | "custom";

export interface Product {
  slug: string;
  name: string;
  kind: ProductKind;
  category: string;
  icon: IconName;
  tagline: string;
  summary: string;
  description: string;
  features: FeatureItem[];
  benefits: string[];
  /** Integrations confirmed by 4axiz. Empty means "not yet documented". */
  integrations: string[];
  audience: string[];
  /** Links an ERP-module product to its module page. */
  erpModule?: string;
  relatedProject?: string;
  mockup: { metricLabels: [string, string, string]; rows: string[] };
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: IconName;
  featured: boolean;
  tagline: string;
  summary: string;
  intro: string;
  deliverables: FeatureItem[];
  benefits: string[];
  process: FeatureItem[];
  technologies: string[];
  relatedProjects: string[];
  seoDescription: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  name: string;
  categories: string[];
  industry: string;
  platform: string[];
  /** Client name, only when approved for publication. */
  client: string | null;
  summary: string;
  overview: string;
  /** `null` until the case-study content is supplied by 4axiz. */
  challenge: string | null;
  solution: string | null;
  highlights: string[];
  /** Only verified technologies. Empty = not yet documented. */
  technologies: string[];
  images: ProjectImage[];
  liveUrl: string | null;
  featured: boolean;
  /** Visual theme used by the generated cover until real screenshots exist. */
  theme: "blue" | "teal" | "indigo" | "slate" | "amber" | "rose";
  relatedSolutions: string[];
}

export interface Industry {
  slug: string;
  title: string;
  icon: IconName;
  summary: string;
  intro: string;
  challenges: FeatureItem[];
  solutions: { title: string; description: string; href: string }[];
  relatedProjects: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  leadership: boolean;
  bio: string | null;
  photo: ProjectImage | null;
  linkedin: string | null;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  organisation: string;
  /** Must be true before the testimonial is rendered anywhere. */
  approved: boolean;
}

export interface ProcessStep {
  title: string;
  description: string;
  outputs: string[];
  icon: IconName;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  applyUrl: string;
}
