import type { Office, SocialLink } from "@/types";

/**
 * Company-level facts. Only verified values are filled in; everything that
 * 4axiz still needs to supply is `null` and is rendered as "to be confirmed".
 * Search the codebase for `null` values in /data to find content gaps.
 */
export const site = {
  name: "4axiz",
  legalName: "4axiz IT Limited",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fouraxiz.com",
  tagline: "Enterprise software, MIS & ERP, mobile and AI — engineered since 2010.",
  description:
    "4axiz IT Limited designs, develops and implements secure, scalable software — ERP, MIS & MEAL platforms, mobile apps and AI — for government, UN agencies, NGOs, INGOs and corporate enterprises since 2010.",
  /** General inbox (Company Profile 2026). */
  email: "admin@4axiz.com" as string | null,
  /** Phone / WhatsApp (Company Profile 2026). */
  phone: "+880 1718 837 689" as string | null,
  /** Established 30 June 2010 (Company Profile 2026). */
  foundedYear: 2010 as number | null,
};

/** Registration facts from the Company Profile 2026 (bank, VAT and TIN details are deliberately not published). */
export const companyFacts = {
  established: "30 June 2010",
  incorporationNo: "C-112349/13",
  basisMembership: "A337",
  tradeLicence: "02-07374",
  teamsId: "fouraxiz",
  websites: "www.4axiz.com · www.fouraxiz.com · www.4axiz.co.nz",
};

/** Technologies from the "Our tech stack" page of the Company Profile 2026 and the existing fouraxiz.com. */
export const technologies = [
  { name: "Java", icon: "siOpenjdk" },
  { name: "React", icon: "siReact" },
  { name: "Laravel", icon: "siLaravel" },
  { name: ".NET", icon: "siDotnet" },
  { name: "Flutter", icon: "siFlutter" },
  { name: "Python", icon: "siPython" },
  { name: "Docker", icon: "siDocker" },
  { name: "Kotlin", icon: "siKotlin" },
  { name: "Swift", icon: "siSwift" },
  { name: "PHP", icon: "siPhp" },
  { name: "CodeIgniter", icon: "siCodeigniter" },
  { name: "TypeScript", icon: "siTypescript" },
  { name: "Node.js", icon: "siNodedotjs" },
  { name: "Next.js", icon: "siNextdotjs" },
  { name: "Angular", icon: "siAngular" },
  { name: "Vue.js", icon: "siVuedotjs" },
  { name: "Django", icon: "siDjango" },
  { name: "Spring Boot", icon: "siSpringboot" },
  { name: "Ionic", icon: "siIonic" },
  { name: "Ruby on Rails", icon: "siRubyonrails" },
  { name: "WordPress", icon: "siWordpress" },
  { name: "Shopify", icon: "siShopify" },
  { name: "Moodle", icon: "siMoodle" },
  { name: "PostgreSQL", icon: "siPostgresql" },
  { name: "MySQL", icon: "siMysql" },
  { name: "MongoDB", icon: "siMongodb" },
  { name: "Redis", icon: "siRedis" },
  { name: "Kubernetes", icon: "siKubernetes" },
  { name: "Firebase", icon: "siFirebase" },
  { name: "TensorFlow", icon: "siTensorflow" },
  { name: "Figma", icon: "siFigma" },
] as const;

/** Headline numbers from the Company Profile 2026 ("Outcomes that scale"). */
export const stats: { value: string; label: string }[] = [
  { value: "16+", label: "Years of continuous delivery" },
  { value: "45", label: "In-house engineers & specialists" },
  { value: "60+", label: "Client organisations served" },
  { value: "180+", label: "Countries reached via partner programmes" },
];

export const offices: Office[] = [
  {
    id: "bangladesh",
    country: "Bangladesh",
    countryCode: "BD",
    role: "Head office · Primary engineering hub",
    city: "Dhaka",
    address: "Level 4, House 34, Lane 6/2, Road 20/A, DUIP Plot, Block D, Mirpur 12, Dhaka 1216",
    phone: "+880 1718 837 689",
    email: "admin@4axiz.com",
    hours: null,
    timezone: "GMT+6",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=DUIP+Plot+Block+D+Mirpur+12+Dhaka+1216",
  },
  {
    id: "new-zealand",
    country: "New Zealand",
    countryCode: "NZ",
    role: "Delivery & client hub",
    city: "Auckland",
    address: null,
    phone: null,
    email: null,
    hours: null,
    timezone: "GMT+12 / +13",
    mapUrl: null,
  },
  {
    id: "united-states",
    country: "United States",
    countryCode: "US",
    role: "North American presence",
    city: "Cedar Falls, Iowa",
    address: "8120 Jennings Drive, Suite 128 C, Business and Community Service Bldg., Cedar Falls, IA 50613-0130",
    phone: null,
    email: "admin@4axiz.com",
    hours: null,
    timezone: "GMT-6 / -5",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=8120+Jennings+Drive+Cedar+Falls+IA+50613",
  },
  {
    id: "kosovo",
    country: "Kosovo",
    countryCode: "XK",
    role: null,
    city: null,
    address: null,
    phone: null,
    email: null,
    hours: null,
    timezone: "GMT+1 / +2",
    mapUrl: null,
  },
];

/** Social profiles render only when `url` is set. */
export const socialLinks: SocialLink[] = [
  { network: "linkedin", url: null },
  { network: "facebook", url: null },
  { network: "x", url: null },
  { network: "youtube", url: null },
  { network: "github", url: null },
];

export const companyValues = [
  { title: "Excellence", description: "Quality engineering, no shortcuts. Every build passes structured functional, performance and regression testing before it reaches a user." },
  { title: "Integrity", description: "Security and trust by default. We protect client data as if it were our own and say plainly what is and is not possible." },
  { title: "Innovation", description: "AI-first, future-ready thinking. Predictive analytics, automation and SaaS-ready architecture are part of our default toolkit." },
  { title: "Partnership", description: "Your goals are our mandate. We measure ourselves on your outcomes — adoption, efficiency and reporting quality — not billable hours." },
  { title: "Accountability", description: "We own the outcome. One team is answerable from discovery through to post-launch support and enhancement." },
  { title: "Sustainability", description: "Built to be maintained. Modular, documented codebases your team or ours can extend for years without a rewrite." },
];

export const mission =
  "To deliver secure, scalable and intelligent software that improves efficiency, transparency and outcomes — on time, every time — pairing disciplined engineering with deep understanding of health, education, humanitarian and enterprise operations.";

export const vision =
  "To be the most trusted engineering partner for institutions that modernise public service and enterprise operations through technology — the company they call when the system has to work, has to scale and has to be defensible.";

/** "Key strengths & strategic focus" — Company Profile 2026. */
export const strengths = [
  { title: "Proven digital transformation", description: "16+ years designing, developing and implementing customised software, MIS platforms, ERP systems and mobile applications for government, NGOs, INGOs and corporate clients." },
  { title: "Expertise in MIS & MEAL", description: "Deep expertise in MIS, ERP, beneficiary management, monitoring platforms, dashboards and mobile applications that improve efficiency, transparency and decision-making." },
  { title: "NGO / INGO sector understanding", description: "Extensive experience with development organisations — project monitoring, MEAL processes, field data collection, partner coordination and management reporting." },
  { title: "Secure & scalable technology", description: "Cloud-based architecture, role-based access control, data security, backup mechanisms and scalable design for long-term sustainability." },
  { title: "Mobile & field data capability", description: "Offline data collection, GPS tracking, photo and document evidence capture, and reliable synchronisation for field operations." },
  { title: "Strong team & quality delivery", description: "Engineers, UI/UX designers, architects and project managers delivering through structured processes, testing, documentation and user support." },
];

/** Dated milestones — "Sixteen years in four steps", Company Profile 2026. */
export const milestones = [
  { year: "2010", title: "Founded in Dhaka", description: "4axiz IT Limited established on 30 June 2010." },
  { year: "2013", title: "Incorporated & BASIS member", description: "Incorporated (C-112349/13) and joined the Bangladesh Association of Software and Information Services (A337)." },
  { year: "2018", title: "UN, INGO & government programmes", description: "Delivering platforms for UN agencies, international NGOs and government directorates." },
  { year: "2026", title: "Global presence, AI-enabled platforms", description: "Engineering hubs in Dhaka and Auckland with a US presence, building AI-enabled platforms." },
];

/** "Flexible ways to engage" — Company Profile 2026. */
export const engagementModels = [
  { title: "Project based", description: "We scope the project with you over a couple of calls, then return a fixed-price bid and a schedule of deliverables. Best for well-defined requirements." },
  { title: "Hourly", description: "For product development with evolving requirements: we scope the next few sprints and bill by hours actually spent." },
  { title: "Dedicated team", description: "Part-time or full-time dedicated talent for maintenance or day-to-day operations, billed monthly — the most cost-effective option." },
  { title: "SaaS & licensing", description: "Adopt a ready platform such as Smart Hostel or School Management by subscription, with configuration, migration and training included." },
  { title: "Support & AMC", description: "Annual maintenance contracts covering enhancements, monitoring, patching and SLA-backed response for systems already in production." },
];
