import type { Service } from "@/types";

/**
 * Professional services. Each entry renders /services/[slug].
 * `technologies` lists capability areas rather than named vendor stacks —
 * replace with the specific stack 4axiz wants to publish once confirmed.
 */
export const services: Service[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    shortTitle: "Custom Software",
    icon: "code",
    featured: true,
    tagline: "From a blank page to dependable production software.",
    summary: "End-to-end design and engineering of business applications built around your workflows.",
    intro:
      "We take responsibility for the whole journey — requirements, architecture, design, engineering, testing and launch — with a single accountable team. You get working software early, regular demos, and source code and documentation you own.",
    deliverables: [
      { title: "Requirements & specification", description: "User stories, process maps and acceptance criteria agreed with your stakeholders." },
      { title: "Solution architecture", description: "Data model, integration plan and hosting design matched to scale and budget." },
      { title: "Application engineering", description: "Front-end, back-end and database development with code review on every change." },
      { title: "Documentation & handover", description: "Technical and user documentation so your team can operate with confidence." },
    ],
    benefits: [
      "One accountable team from idea to launch",
      "Visible progress through regular demos",
      "Full ownership of code and data",
      "Architecture designed for future change",
    ],
    process: [
      { title: "Discover", description: "Workshops to understand goals, users and constraints." },
      { title: "Define", description: "Scope, priorities and a delivery roadmap." },
      { title: "Build", description: "Two-week sprints with demos and feedback." },
      { title: "Launch", description: "Deployment, training and hypercare." },
    ],
    technologies: ["Web & API frameworks", "Relational databases", "Role-based access control", "Automated testing", "CI/CD pipelines"],
    relatedProjects: ["dsk-e-loan", "dgfp-digital-archive", "school-management"],
    seoDescription:
      "Custom software development services from 4axiz IT Limited — requirements, architecture, engineering and launch by one accountable team.",
  },
  {
    slug: "erp-implementation",
    title: "ERP Development & Implementation",
    shortTitle: "ERP Implementation",
    icon: "boxes",
    featured: true,
    tagline: "An ERP rollout that your teams actually adopt.",
    summary: "Configuration, customisation, data migration and training for connected ERP platforms.",
    intro:
      "ERP projects succeed or fail on fit and adoption. We configure modules to your policies, build the customisations that matter, migrate your data carefully and train each department — then stay on to support the first operating cycles.",
    deliverables: [
      { title: "Fit-gap analysis", description: "Compare your processes with standard modules and decide what to configure, customise or change." },
      { title: "Module configuration", description: "Set up organisation structure, approval chains, numbering, policies and reports." },
      { title: "Custom modules & reports", description: "Build industry- or organisation-specific features on top of the core." },
      { title: "Data migration & training", description: "Cleanse and import master data and balances; train users by role." },
    ],
    benefits: [
      "Modules aligned with real policies",
      "Phased rollout that limits disruption",
      "Clean data from day one",
      "Users trained for their own roles",
    ],
    process: [
      { title: "Assess", description: "Process review and fit-gap analysis." },
      { title: "Configure", description: "Set up and customise modules in a staging environment." },
      { title: "Validate", description: "User acceptance testing with real scenarios." },
      { title: "Go live", description: "Cut-over, training and post-launch support." },
    ],
    technologies: ["Modular ERP architecture", "Configurable workflows", "Biometric & device integration", "Report builders", "Data migration tooling"],
    relatedProjects: ["school-management", "pos"],
    seoDescription:
      "ERP development, customisation and implementation services from 4axiz: fit-gap analysis, configuration, migration and training.",
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    shortTitle: "AI & ML",
    icon: "brain",
    featured: true,
    tagline: "AI engineering grounded in your data and your risk appetite.",
    summary: "Design, build and integration of AI assistants, document intelligence and predictive models.",
    intro:
      "Our AI work starts with a measurable problem and a realistic look at the data available. We prototype quickly, evaluate honestly and integrate carefully — with human review where it matters and monitoring once it is live.",
    deliverables: [
      { title: "Opportunity assessment", description: "Prioritised AI use-cases with expected effort, value and risks." },
      { title: "Proof of concept", description: "A working pilot evaluated against agreed success criteria." },
      { title: "Model & prompt engineering", description: "Selection, tuning and evaluation of models suited to the task." },
      { title: "Production integration", description: "APIs, guardrails, logging and monitoring inside your applications." },
    ],
    benefits: [
      "Clear evidence before large investment",
      "Responsible handling of sensitive data",
      "AI embedded where work happens",
      "Ongoing evaluation after launch",
    ],
    process: [
      { title: "Explore", description: "Identify and rank use-cases." },
      { title: "Prove", description: "Build and evaluate a focused pilot." },
      { title: "Integrate", description: "Connect to systems with safeguards." },
      { title: "Monitor", description: "Track quality, cost and drift." },
    ],
    technologies: ["Large language models", "Retrieval-augmented generation", "OCR & document AI", "Forecasting models", "Evaluation & monitoring"],
    relatedProjects: ["dgfp-digital-archive"],
    seoDescription:
      "AI and machine learning services from 4axiz: use-case assessment, proofs of concept, model engineering and production integration.",
  },
  {
    slug: "web-development",
    title: "Web Design & Development",
    shortTitle: "Web Development",
    icon: "globe",
    featured: true,
    tagline: "Websites and web apps that load fast and convert.",
    summary: "Corporate websites, web applications and dashboards built with modern, accessible front-end engineering.",
    intro:
      "Whether it's a corporate website that has to earn trust in seconds or a web application used all day by staff, we focus on speed, accessibility and maintainability — with content structures your team can update without a developer.",
    deliverables: [
      { title: "Information architecture", description: "Sitemaps, content models and navigation shaped around user goals." },
      { title: "Responsive front-end", description: "Pixel-accurate, accessible interfaces across devices." },
      { title: "Content management", description: "Editable content models so marketing teams stay independent." },
      { title: "SEO & performance", description: "Technical SEO, structured data and Core Web Vitals optimisation." },
    ],
    benefits: [
      "Fast, accessible experiences",
      "Better search visibility",
      "Easier content updates",
      "Consistent brand presentation",
    ],
    process: [
      { title: "Plan", description: "Goals, audiences and content inventory." },
      { title: "Design", description: "Wireframes, visual design and prototypes." },
      { title: "Develop", description: "Component-based build with reviews." },
      { title: "Optimise", description: "Performance, SEO and analytics setup." },
    ],
    technologies: ["Server-rendered frameworks", "Component design systems", "Headless CMS", "Web performance tooling", "Accessibility testing"],
    relatedProjects: ["bazarnao", "unikart", "school-management"],
    seoDescription:
      "Web design and development by 4axiz: corporate websites, web applications, CMS integration, SEO and performance optimisation.",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile Application Development",
    shortTitle: "Mobile Apps",
    icon: "smartphone",
    featured: true,
    tagline: "Apps your customers keep on their home screen.",
    summary: "Android, iOS and cross-platform apps connected to your business systems.",
    intro:
      "We build mobile apps that are focused, quick and stable, with back-end APIs designed alongside them. From first prototype to store submission and post-launch updates, we cover the full mobile lifecycle.",
    deliverables: [
      { title: "App UX & prototyping", description: "Platform-appropriate flows tested on real devices." },
      { title: "App development", description: "Native or cross-platform builds with shared business logic." },
      { title: "Back-end & APIs", description: "Secure APIs, authentication and push notification services." },
      { title: "Store release", description: "Store listings, builds and review submission." },
    ],
    benefits: [
      "Direct, always-available customer channel",
      "Consistent data across app and web",
      "Stable releases with crash monitoring",
      "Roadmap support after launch",
    ],
    process: [
      { title: "Scope", description: "Define core journeys and MVP." },
      { title: "Prototype", description: "Validate flows with users." },
      { title: "Develop", description: "Sprints with test builds every iteration." },
      { title: "Release", description: "Store launch and monitoring." },
    ],
    technologies: ["Cross-platform frameworks", "Native Android & iOS", "Push notifications", "Offline sync", "Crash & usage analytics"],
    relatedProjects: ["unikart-app", "bazarnao"],
    seoDescription:
      "Mobile app development services from 4axiz: Android, iOS and cross-platform apps with secure APIs and store release.",
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    shortTitle: "E-commerce",
    icon: "shopping-cart",
    featured: true,
    tagline: "Online selling, backed by operations that keep up.",
    summary: "Storefronts, marketplaces and shopping apps with payments, inventory and fulfilment integration.",
    intro:
      "We build commerce platforms with both sides in mind: a smooth experience for shoppers and a manageable back office for the people who pack, ship and support every order.",
    deliverables: [
      { title: "Storefront build", description: "Catalogue, search, cart and checkout designed for conversion." },
      { title: "Admin & fulfilment", description: "Order management, stock, delivery and returns tooling." },
      { title: "Payment integration", description: "Local and international gateways with reconciliation." },
      { title: "Marketing tools", description: "Coupons, campaigns, notifications and analytics." },
    ],
    benefits: [
      "Reliable, conversion-focused checkout",
      "Stock shared across channels",
      "Clear order status for staff and customers",
      "Scalable platform for growth",
    ],
    process: [
      { title: "Plan", description: "Catalogue, channels and fulfilment model." },
      { title: "Design", description: "Shopping and admin experiences." },
      { title: "Build", description: "Storefront, admin and integrations." },
      { title: "Grow", description: "Optimise conversion and operations." },
    ],
    technologies: ["Storefront frameworks", "Payment gateway APIs", "Search & filtering", "Order management", "Courier integrations"],
    relatedProjects: ["bazarnao", "unikart", "unikart-app"],
    seoDescription:
      "E-commerce development from 4axiz: online stores, marketplaces and shopping apps with payments and fulfilment integration.",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortTitle: "UI/UX Design",
    icon: "palette",
    featured: true,
    tagline: "Interfaces that make complex work feel simple.",
    summary: "Research, interaction design, visual design and design systems for business software.",
    intro:
      "Enterprise software is often dense by necessity — but it should never be confusing. Our designers work closely with engineers to create interfaces that reduce training time, prevent errors and look consistent across every screen.",
    deliverables: [
      { title: "User research", description: "Interviews, task analysis and usability reviews of existing tools." },
      { title: "Wireframes & prototypes", description: "Interactive prototypes to test flows before development." },
      { title: "Visual design", description: "Polished interface design aligned with your brand." },
      { title: "Design systems", description: "Reusable components, tokens and guidelines for consistency at scale." },
    ],
    benefits: [
      "Shorter onboarding for new users",
      "Fewer user errors",
      "Faster development with shared components",
      "A consistent, credible brand experience",
    ],
    process: [
      { title: "Research", description: "Understand users and tasks." },
      { title: "Structure", description: "Information architecture and flows." },
      { title: "Design", description: "Visual design and prototypes." },
      { title: "Validate", description: "Usability testing and iteration." },
    ],
    technologies: ["Design tools & prototyping", "Design tokens", "Accessibility (WCAG) review", "Usability testing", "Component libraries"],
    relatedProjects: ["school-management", "unikart-app"],
    seoDescription:
      "UI/UX design services from 4axiz: user research, prototyping, interface design and design systems for business software.",
  },
  {
    slug: "api-integration",
    title: "API Development & Integration",
    shortTitle: "API Integration",
    icon: "plug",
    featured: true,
    tagline: "Make your systems talk to each other.",
    summary: "Secure APIs and integrations between ERP, payment, messaging and third-party platforms.",
    intro:
      "Disconnected systems create duplicate work and conflicting data. We design clean, documented APIs and reliable integrations — with error handling, retries and monitoring so data keeps flowing.",
    deliverables: [
      { title: "API design", description: "Well-documented REST or GraphQL APIs with versioning." },
      { title: "Third-party integration", description: "Payment gateways, SMS and email providers, maps and identity services." },
      { title: "System synchronisation", description: "Two-way sync between ERP, CRM, e-commerce and legacy systems." },
      { title: "Device integration", description: "Connect hardware such as biometric attendance devices where supported." },
    ],
    benefits: [
      "No more duplicate data entry",
      "Consistent data across systems",
      "Resilient, monitored data flows",
      "Faster partner onboarding",
    ],
    process: [
      { title: "Map", description: "Systems, data and ownership." },
      { title: "Design", description: "Contracts, security and error handling." },
      { title: "Build", description: "Integration and automated tests." },
      { title: "Monitor", description: "Alerts and logging in production." },
    ],
    technologies: ["REST & GraphQL", "Webhooks", "OAuth & API keys", "Message queues", "API documentation"],
    relatedProjects: ["dsk-e-loan", "bazarnao"],
    seoDescription:
      "API development and system integration services from 4axiz: secure APIs, payment and messaging integrations and data synchronisation.",
  },
  {
    slug: "cloud-devops",
    title: "Cloud, DevOps & Deployment",
    shortTitle: "Cloud & DevOps",
    icon: "cloud",
    featured: true,
    tagline: "Reliable infrastructure and releases you don't have to worry about.",
    summary: "Cloud hosting, CI/CD pipelines, monitoring and backup strategies for business applications.",
    intro:
      "Great software still fails if deployments are risky and servers are fragile. We set up environments, automated pipelines and monitoring so releases become routine and incidents are spotted early.",
    deliverables: [
      { title: "Infrastructure setup", description: "Cloud or on-premise environments sized for your workload." },
      { title: "CI/CD pipelines", description: "Automated build, test and deployment workflows." },
      { title: "Monitoring & alerting", description: "Uptime, performance and error monitoring with alerts." },
      { title: "Backup & recovery", description: "Backup schedules and tested recovery procedures." },
    ],
    benefits: [
      "Predictable, low-risk releases",
      "Higher availability",
      "Faster recovery from incidents",
      "Right-sized hosting costs",
    ],
    process: [
      { title: "Assess", description: "Current hosting and release practices." },
      { title: "Design", description: "Target environments and pipelines." },
      { title: "Implement", description: "Automation and monitoring." },
      { title: "Operate", description: "Ongoing tuning and support." },
    ],
    technologies: ["Cloud & VPS hosting", "Containers", "CI/CD automation", "Infrastructure monitoring", "Automated backups"],
    relatedProjects: ["dgfp-digital-archive"],
    seoDescription:
      "Cloud, DevOps and deployment services from 4axiz: infrastructure setup, CI/CD pipelines, monitoring and backup strategies.",
  },
  {
    slug: "software-testing",
    title: "Software Testing & Quality Assurance",
    shortTitle: "Testing & QA",
    icon: "test-tube",
    featured: true,
    tagline: "Confidence in every release.",
    summary: "Manual and automated testing that catches problems before your users do.",
    intro:
      "Quality isn't a phase at the end — it's built into how we work. Our QA practice covers test planning, functional and regression testing, automation and performance checks, and can support software built by us or by others.",
    deliverables: [
      { title: "Test strategy", description: "Risk-based test plans aligned with business priorities." },
      { title: "Functional testing", description: "Structured manual testing against acceptance criteria." },
      { title: "Test automation", description: "Automated unit, integration and end-to-end suites." },
      { title: "Performance & security checks", description: "Load testing and common vulnerability checks." },
    ],
    benefits: [
      "Fewer defects in production",
      "Faster, safer releases",
      "Documented evidence of quality",
      "Lower long-term maintenance cost",
    ],
    process: [
      { title: "Plan", description: "Scope, risks and test approach." },
      { title: "Design", description: "Test cases and data." },
      { title: "Execute", description: "Manual and automated runs." },
      { title: "Report", description: "Defects, coverage and sign-off." },
    ],
    technologies: ["Unit & integration testing", "End-to-end automation", "Load testing", "Defect tracking", "Regression suites"],
    relatedProjects: ["school-management", "dsk-e-loan"],
    seoDescription:
      "Software testing and QA services from 4axiz: test strategy, functional testing, automation and performance testing.",
  },
  {
    slug: "maintenance-support",
    title: "Cybersecurity, Maintenance & Support",
    shortTitle: "Maintenance & Support",
    icon: "life-buoy",
    featured: true,
    tagline: "Keep critical software healthy, secure and improving.",
    summary: "Ongoing maintenance, security updates, monitoring and user support for live systems.",
    intro:
      "Software is a living asset. We keep your applications patched, secure and performing, respond to issues within agreed service levels, and continue to deliver small improvements as your business evolves.",
    deliverables: [
      { title: "Corrective maintenance", description: "Diagnose and resolve defects reported by users or monitoring." },
      { title: "Security maintenance", description: "Dependency updates, patching, access reviews and hardening." },
      { title: "User support", description: "Help-desk support for administrators and end users." },
      { title: "Continuous improvement", description: "A rolling backlog of enhancements and optimisations." },
    ],
    benefits: [
      "Predictable support with clear service levels",
      "Reduced security exposure",
      "Stable performance as usage grows",
      "Software that keeps pace with the business",
    ],
    process: [
      { title: "Onboard", description: "Review the system and agree service levels." },
      { title: "Monitor", description: "Track health and security." },
      { title: "Respond", description: "Resolve tickets by priority." },
      { title: "Improve", description: "Regular enhancement releases." },
    ],
    technologies: ["Ticketing & SLAs", "Vulnerability scanning", "Patch management", "Access control reviews", "Uptime monitoring"],
    relatedProjects: ["dgfp-digital-archive", "pos"],
    seoDescription:
      "Software maintenance, cybersecurity and support services from 4axiz: patching, monitoring, help-desk and continuous improvement.",
  },
  {
    slug: "it-consulting",
    title: "IT Consulting & Technical Support",
    shortTitle: "IT Consulting",
    icon: "compass",
    featured: false,
    tagline: "Independent technical advice before you commit.",
    summary: "Technology strategy, solution selection, architecture reviews and digital transformation planning.",
    intro:
      "Not every challenge needs new software. Our consultants help you understand options, assess vendors and existing systems, and plan transformation in realistic stages — with a recommendation you can act on.",
    deliverables: [
      { title: "Technology assessment", description: "Review of current systems, risks and opportunities." },
      { title: "Solution selection", description: "Build-versus-buy analysis and vendor evaluation." },
      { title: "Architecture review", description: "Independent review of scalability, security and maintainability." },
      { title: "Transformation roadmap", description: "Phased plan with priorities, budgets and dependencies." },
    ],
    benefits: [
      "Decisions based on clear evidence",
      "Lower risk on large investments",
      "A realistic, staged roadmap",
      "Alignment between business and IT",
    ],
    process: [
      { title: "Listen", description: "Interviews with stakeholders." },
      { title: "Assess", description: "Systems, processes and data." },
      { title: "Recommend", description: "Options with trade-offs." },
      { title: "Plan", description: "Roadmap and next steps." },
    ],
    technologies: ["Architecture assessment", "Process analysis", "Vendor evaluation", "Security review", "Roadmapping"],
    relatedProjects: [],
    seoDescription:
      "IT consulting from 4axiz: technology assessment, solution selection, architecture review and digital transformation roadmaps.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
