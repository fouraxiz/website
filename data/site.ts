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
  coverLine: "Enterprise Software · MIS & ERP · Mobile · AI & Data",
  secondaryEmail: "nasir@4axiz.com",
  officeSetup: "2,300 sq ft — Mirpur 12, Dhaka",
  deliveryCapability: "Web, Android, iOS, cloud, data & AI",
  programmeReach: "Partner programmes across 180+ countries",
  connectivity: "Unlimited alternate high-speed internet connectivity",
};

/** "What that means in practice" — Vision & Mission page of the Company Profile 2026. */
export const missionPractice = [
  "Systems designed around the real workflow of the people who use them, not the org chart.",
  "Security, access control and audit trails specified before the first line of code.",
  "Offline-first thinking wherever the field has no reliable connectivity.",
  "Documentation, training and handover treated as deliverables, not afterthoughts.",
];

export const trustNote =
  "We measure that trust in renewals, in referrals between agencies, and in platforms still running and growing years after handover.";

export const strategicFocus =
  "Centralised, secure and future-ready platforms that improve programme visibility, strengthen MEAL and reporting, enhance beneficiary and partner management, and enable evidence-based decision-making.";

/** The four pillars under "A leading Bangladeshi technology company with a global delivery record". */
export const pillars = [
  { title: "Institutional by default", description: "Ministries, UN agencies, INGOs and corporate groups — environments where accountability, audit and uptime are non-negotiable." },
  { title: "Global by design", description: "Delivery from Dhaka and Auckland with a US presence, serving partners whose programmes span more than 180 countries." },
  { title: "Built for trust", description: "Donor-grade security, role-based access control, encrypted transmission and audit-ready architecture, designed in from day one." },
  { title: "End-to-end ownership", description: "Discovery and UX through build, QA, deployment, migration, training and long-term SLA-backed support." },
];

/** "Three countries. Worldwide impact." figures. */
export const presenceStats = [
  { value: "2", label: "Engineering hubs" },
  { value: "3", label: "Country presence" },
  { value: "180+", label: "Countries reached" },
  { value: "24/7", label: "Support coverage" },
];

/** Technologies from the "Our tech stack" page of the Company Profile 2026 (logos and "Also in regular use") and the existing fouraxiz.com. */
export const techCategories = ["Backend", "Frontend", "Mobile", "Database & search", "Cloud & DevOps", "CMS & commerce", "Data, AI & field tools", "Design"] as const;

export const technologies: { name: string; icon: string; category: string }[] = [
  { name: "Java", icon: "siOpenjdk", category: "Backend" },
  { name: "React", icon: "siReact", category: "Frontend" },
  { name: "Laravel", icon: "siLaravel", category: "Backend" },
  { name: ".NET", icon: "siDotnet", category: "Backend" },
  { name: "Flutter", icon: "siFlutter", category: "Mobile" },
  { name: "Python", icon: "siPython", category: "Backend" },
  { name: "Docker", icon: "siDocker", category: "Cloud & DevOps" },
  { name: "PHP", icon: "siPhp", category: "Backend" },
  { name: "CodeIgniter", icon: "siCodeigniter", category: "Backend" },
  { name: "CakePHP", icon: "siCakephp", category: "Backend" },
  { name: "Node.js", icon: "siNodedotjs", category: "Backend" },
  { name: "Django", icon: "siDjango", category: "Backend" },
  { name: "Spring Boot", icon: "siSpringboot", category: "Backend" },
  { name: "Ruby on Rails", icon: "siRubyonrails", category: "Backend" },
  { name: "Next.js", icon: "siNextdotjs", category: "Frontend" },
  { name: "Angular", icon: "siAngular", category: "Frontend" },
  { name: "Vue.js", icon: "siVuedotjs", category: "Frontend" },
  { name: "TypeScript", icon: "siTypescript", category: "Frontend" },
  { name: "MERN stack", icon: "", category: "Frontend" },
  { name: "MEAN stack", icon: "", category: "Frontend" },
  { name: "Kotlin", icon: "siKotlin", category: "Mobile" },
  { name: "Swift", icon: "siSwift", category: "Mobile" },
  { name: "Ionic", icon: "siIonic", category: "Mobile" },
  { name: "PostgreSQL", icon: "siPostgresql", category: "Database & search" },
  { name: "MySQL", icon: "siMysql", category: "Database & search" },
  { name: "MongoDB", icon: "siMongodb", category: "Database & search" },
  { name: "Redis", icon: "siRedis", category: "Database & search" },
  { name: "Elasticsearch", icon: "siElasticsearch", category: "Database & search" },
  { name: "Firebase", icon: "siFirebase", category: "Database & search" },
  { name: "AWS", icon: "", category: "Cloud & DevOps" },
  { name: "Microsoft Azure", icon: "", category: "Cloud & DevOps" },
  { name: "Kubernetes", icon: "siKubernetes", category: "Cloud & DevOps" },
  { name: "Jenkins", icon: "siJenkins", category: "Cloud & DevOps" },
  { name: "GitHub Actions", icon: "siGithubactions", category: "Cloud & DevOps" },
  { name: "WordPress", icon: "siWordpress", category: "CMS & commerce" },
  { name: "Drupal", icon: "siDrupal", category: "CMS & commerce" },
  { name: "Joomla", icon: "siJoomla", category: "CMS & commerce" },
  { name: "Shopify", icon: "siShopify", category: "CMS & commerce" },
  { name: "Magento", icon: "", category: "CMS & commerce" },
  { name: "Squarespace", icon: "siSquarespace", category: "CMS & commerce" },
  { name: "Salesforce", icon: "", category: "CMS & commerce" },
  { name: "Moodle", icon: "siMoodle", category: "CMS & commerce" },
  { name: "TensorFlow", icon: "siTensorflow", category: "Data, AI & field tools" },
  { name: "Power BI", icon: "", category: "Data, AI & field tools" },
  { name: "KoboToolbox", icon: "", category: "Data, AI & field tools" },
  { name: "Twilio", icon: "", category: "Data, AI & field tools" },
  { name: "Figma", icon: "siFigma", category: "Design" },
];

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
    description:
      "45 engineers, designers, QA and project managers across a 2,300 sq ft facility in Mirpur 12, with unlimited alternate high-speed connectivity. Core development, testing and support operate from here.",
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
    description:
      "Regional engagement, solution consulting and support coordination — extending our working day across Asia-Pacific time zones. www.4axiz.co.nz",
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
    description: "Commercial base for North American clients, partnerships and hosting relationships with US data centres.",
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
    description: null,
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
  { title: "Excellence", tagline: "Quality engineering, no shortcuts.", description: "Every build passes structured functional, performance and regression testing before it reaches a user." },
  { title: "Integrity", tagline: "Security and trust by default.", description: "We protect client data as if it were our own and say plainly what is and is not possible." },
  { title: "Innovation", tagline: "AI-first, future-ready thinking.", description: "Predictive analytics, automation and SaaS-ready architecture are part of our default toolkit." },
  { title: "Partnership", tagline: "Your goals are our mandate.", description: "We measure ourselves on your outcomes \u2014 adoption, efficiency and reporting quality \u2014 not billable hours." },
  { title: "Accountability", tagline: "We own the outcome.", description: "One team is answerable from discovery through to post-launch support and enhancement." },
  { title: "Sustainability", tagline: "Built to be maintained.", description: "Modular, documented codebases your team or ours can extend for years without a rewrite." },
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

/** "Domains where we go deep" — Company Profile 2026. */
export const domains = [
  { title: "Health & Public Systems", icon: "stethoscope", description: "Nationwide TB monitoring, disease surveillance, health records, digital archives and facility reporting at scale." },
  { title: "MEAL & Programme Management", icon: "bar-chart", description: "Beneficiary registries, indicator frameworks, partner reporting, accountability feedback and evidence management." },
  { title: "EdTech & Learning", icon: "graduation-cap", description: "Gamified digital learning, assessment, teacher dashboards and institution management." },
  { title: "Survey & Field Data", icon: "clipboard-check", description: "Offline-first collection with validation, GPS, photo evidence, sync and supervisor workflows." },
  { title: "Fleet & Logistics", icon: "truck", description: "Vehicles, drivers, routes, maintenance and safety compliance across regions." },
  { title: "Audit & Compliance", icon: "shield-check", description: "Audit findings and recommendation trackers, fully traceable end to end." },
  { title: "Safety & Incident Reporting", icon: "siren", description: "Real-time safety and security incident reporting for field staff in complex environments." },
  { title: "Commerce & Enterprise", icon: "shopping-bag", description: "ERP, POS, CRM, HR & payroll and e-commerce for multi-unit corporate groups." },
] as const;

/** "Sectors that depend on us" — Company Profile 2026. */
export const sectors = [
  { title: "Government & Public Sector", icon: "landmark", clients: "MOHFW, DGFP, DGHS, IPHN, CPTU, NTP, Department of Youth Development and Teletalk Bangladesh Ltd." },
  { title: "UN & Development Partners", icon: "globe", clients: "UNDP, UNFPA, UNHCR-funded programmes, World Bank and USAID-funded initiatives." },
  { title: "International NGOs", icon: "heart-handshake", clients: "Handicap International, Management Sciences for Health (MSH), Pathfinder and partners." },
  { title: "Local NGOs", icon: "users", clients: "NGO Forum for Public Health, BCCP, DSK, WAVE Foundation, Light House, SKS Foundation, Room to Read, CODEC, SMC and RSC." },
  { title: "Healthcare & Education", icon: "graduation-cap", clients: "Disease monitoring, health records, digital archives, universities, colleges, schools and madrasahs." },
  { title: "Corporate & Enterprise", icon: "briefcase", clients: "Toyota Bangladesh, Nokia Bangladesh, RANGS Group, Karim Group (18+ business units), HCPL, MCL, UMC, Rupali Health, Serenity Builders and Green Peak Holdings." },
] as const;

/** Client mix — Company Profile 2026 ("Who we work with"). */
export const clientMix = [
  { value: "60+", label: "Client organisations" },
  { value: "9", label: "UN & INGO partners" },
  { value: "10+", label: "Government bodies" },
  { value: "20+", label: "Corporate groups" },
];

/** "Outcomes that scale" — Company Profile 2026. */
export const outcomes = [
  { value: "16+", label: "Years of continuous delivery" },
  { value: "45", label: "In-house engineers & specialists" },
  { value: "180+", label: "Countries reached via partner programmes" },
  { value: "800+", label: "Upazila health complexes on our TB systems" },
  { value: "100+", label: "Schools running our digital learning platform" },
  { value: "20+", label: "Institutions on the Somvabona platform" },
  { value: "60+", label: "Client organisations served" },
  { value: "16", label: "Ready-to-deploy software products" },
  { value: "3", label: "Countries with a 4axiz presence" },
];
