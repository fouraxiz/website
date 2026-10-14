import type { Solution } from "@/types";

/**
 * Solution areas rendered at /solutions/[slug].
 * ERP has a dedicated section at /solutions/erp (see data/erp-modules.ts).
 */
export const solutions: Solution[] = [
  {
    slug: "ai",
    href: "/solutions/ai",
    title: "AI & Intelligent Automation",
    shortTitle: "AI Solutions",
    icon: "brain",
    tagline: "Practical AI, built into the way your business already works.",
    summary:
      "Assistants, document intelligence, prediction and automation designed around real workflows — and integrated into the systems your teams already use.",
    intro:
      "AI creates value when it removes friction from everyday work: reading the documents nobody has time to read, answering the questions teams ask every day, and spotting patterns early enough to act. 4axiz approaches AI as an engineering discipline — we start from a concrete process, prove value with a focused pilot, and then integrate it securely into your software. The capabilities below describe the areas we design and build for; each engagement is scoped to your data, risk profile and goals.",
    problems: [
      "Teams spend hours reading, classifying and re-keying information from documents.",
      "Customers and staff wait for answers that already exist somewhere in your systems.",
      "Decisions rely on hindsight because historical data is never analysed.",
      "Repetitive approval and data-entry steps slow down every process.",
    ],
    capabilities: [
      { title: "AI-powered business automation", description: "Combine rules, workflows and language models to automate multi-step tasks such as triage, routing and data entry." },
      { title: "Intelligent document processing", description: "Extract, classify and validate data from invoices, forms, contracts and scanned records." },
      { title: "AI assistants & chatbots", description: "Conversational assistants grounded in your own knowledge base and business data, for customers or internal teams." },
      { title: "Predictive analytics", description: "Forecast demand, cash flow, churn or maintenance needs from historical data." },
      { title: "AI inside enterprise software", description: "Add summarisation, natural-language search and smart suggestions to ERP and line-of-business applications." },
      { title: "Custom AI applications", description: "Purpose-built applications where AI is the core of the product, from prototype to production." },
    ],
    approach: [
      { title: "Use-case discovery", description: "Identify where AI can measurably reduce effort, error or delay — and where it shouldn't be used." },
      { title: "Data readiness", description: "Assess data quality, access and privacy requirements before building." },
      { title: "Focused pilot", description: "Prove value on a narrow, measurable workflow with real users." },
      { title: "Production integration", description: "Integrate securely with existing systems, with monitoring, human review and fallbacks." },
    ],
    outcomes: [
      "Less manual handling of documents and data",
      "Faster responses for customers and staff",
      "Earlier insight from your own data",
      "AI that is governed, monitored and explainable to stakeholders",
    ],
    relatedServices: ["ai-machine-learning", "api-integration", "custom-software-development"],
    relatedProjects: ["smart-hostel-management", "dsk-e-loan"],
    relatedIndustries: ["healthcare", "financial-services", "professional-services"],
    seoDescription:
      "AI assistants, intelligent document processing, predictive analytics and workflow automation designed and integrated by 4axiz IT Limited.",
  },
  {
    slug: "custom-software",
    href: "/solutions/custom-software",
    title: "Custom Software Development",
    shortTitle: "Custom Software",
    icon: "code",
    tagline: "Software shaped around your process — not the other way round.",
    summary:
      "When off-the-shelf tools force compromises, we design and build software that fits your operations, integrates with your systems and grows with you.",
    intro:
      "Every organisation has processes that set it apart. Packaged software often handles the common 80% and leaves the important 20% to spreadsheets and workarounds. 4axiz builds custom systems that capture how your business actually operates — with the architecture, documentation and support needed to keep them valuable for years.",
    problems: [
      "Critical processes run on spreadsheets that only one person understands.",
      "Packaged software requires costly workarounds for your core workflows.",
      "Several disconnected tools hold different versions of the same data.",
      "Legacy systems are hard to change and harder to support.",
    ],
    capabilities: [
      { title: "Line-of-business systems", description: "Operational platforms for case management, approvals, field operations and internal services." },
      { title: "Portals", description: "Secure portals for customers, partners, members or beneficiaries." },
      { title: "Legacy modernisation", description: "Re-platform aging applications while preserving data and business rules." },
      { title: "Workflow & approvals", description: "Configurable, auditable multi-step workflows with notifications and SLAs." },
      { title: "Integrations", description: "Connect new software to ERP, payment gateways, SMS, email and third-party APIs." },
      { title: "Data migration", description: "Plan, cleanse and migrate data from existing systems with validation." },
    ],
    approach: [
      { title: "Understand the process", description: "Map the real workflow, its exceptions and the people involved." },
      { title: "Design the system", description: "Agree architecture, data model and user experience before code is written." },
      { title: "Build iteratively", description: "Deliver working increments for review every sprint." },
      { title: "Launch and evolve", description: "Deploy, train users and keep improving based on usage." },
    ],
    outcomes: [
      "Software that fits your operations",
      "Ownership of your product and data",
      "Fewer manual workarounds",
      "A foundation you can extend over time",
    ],
    relatedServices: ["custom-software-development", "ui-ux-design", "api-integration"],
    relatedProjects: ["handicap-international-mis", "ngo-forum-integrated-erp", "kmix-erp"],
    relatedIndustries: ["ngos-development", "financial-services", "education"],
    seoDescription:
      "Custom software development by 4axiz: line-of-business systems, portals, workflow automation, integrations and legacy modernisation.",
  },
  {
    slug: "web-applications",
    href: "/solutions/web-applications",
    title: "Web Application Development",
    shortTitle: "Web Applications",
    icon: "globe",
    tagline: "Fast, secure web platforms that people enjoy using.",
    summary:
      "Modern web applications, SaaS platforms and dashboards engineered for performance, accessibility and scale.",
    intro:
      "The browser is where most business software lives today. 4axiz builds web applications with a strong focus on speed, clarity and security — from data-heavy admin dashboards to public-facing platforms that must perform under real traffic.",
    problems: [
      "Existing web tools are slow, dated or hard to use on mobile.",
      "The platform struggles as users and data grow.",
      "Security and access control were added as an afterthought.",
      "Each new feature takes longer than the last.",
    ],
    capabilities: [
      { title: "SaaS platforms", description: "Multi-tenant products with subscriptions, roles and tenant isolation." },
      { title: "Admin dashboards", description: "Data-rich interfaces with tables, filters, charts and bulk actions." },
      { title: "Public platforms", description: "Marketplaces, booking systems and content-driven platforms." },
      { title: "Progressive web apps", description: "Installable, responsive web apps that work across devices." },
      { title: "Performance engineering", description: "Server rendering, caching and optimisation for fast load times." },
      { title: "Security by design", description: "Authentication, authorisation, input validation and audit logging from day one." },
    ],
    approach: [
      { title: "Product definition", description: "Clarify users, journeys and success measures." },
      { title: "Interface design", description: "Design systems and prototypes validated with users." },
      { title: "Engineering", description: "Modern frameworks, automated tests and code review." },
      { title: "Operate", description: "Monitoring, backups and continuous delivery after launch." },
    ],
    outcomes: [
      "Faster, more reliable applications",
      "Interfaces people can use without training",
      "A codebase that is easy to extend",
      "Confidence in security and data protection",
    ],
    relatedServices: ["web-development", "ui-ux-design", "cloud-devops"],
    relatedProjects: ["bazarnao", "unfpa-shombhabona-connect", "dghs-etoolkits"],
    relatedIndustries: ["retail-ecommerce", "education", "professional-services"],
    seoDescription:
      "Web application development by 4axiz: SaaS platforms, dashboards, marketplaces and progressive web apps built for performance and security.",
  },
  {
    slug: "mobile-apps",
    href: "/solutions/mobile-apps",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    icon: "smartphone",
    tagline: "Mobile experiences that keep customers and teams connected.",
    summary:
      "Native and cross-platform apps for Android and iOS — for customers on the go and for field teams that need business systems in their pocket.",
    intro:
      "A good mobile app is fast, focused and dependable even on poor connections. 4axiz designs and builds apps for commerce, field operations and self-service, connected to the same back-end systems that run the rest of your business.",
    problems: [
      "Customers expect to order, pay and track from their phone.",
      "Field staff record data on paper and re-enter it at the office.",
      "Existing apps are slow, crash-prone or poorly rated.",
      "Mobile and web channels show different information.",
    ],
    capabilities: [
      { title: "Customer apps", description: "Shopping, ordering, booking and account self-service apps." },
      { title: "Field & workforce apps", description: "Data capture, attendance, inspections and task apps for teams on the move." },
      { title: "Cross-platform builds", description: "Single codebase for Android and iOS where it suits the product." },
      { title: "Offline support", description: "Capture data without connectivity and sync when back online." },
      { title: "Notifications", description: "Push notifications for orders, approvals and updates." },
      { title: "Store release", description: "Preparation and submission for Google Play and the App Store." },
    ],
    approach: [
      { title: "Journey mapping", description: "Focus the app on the few journeys that matter most." },
      { title: "Prototype", description: "Clickable prototypes tested on real devices." },
      { title: "Build & integrate", description: "App and API development with automated builds." },
      { title: "Release & improve", description: "Store release, crash monitoring and iterative updates." },
    ],
    outcomes: [
      "A direct channel to your customers",
      "Real-time data from the field",
      "Consistent experience across web and mobile",
      "Apps that are maintainable after launch",
    ],
    relatedServices: ["mobile-app-development", "ui-ux-design", "api-integration"],
    relatedProjects: ["mdr-tb-dot-monitoring", "undp-nuprp-mis", "sbcc-activity-monitoring"],
    relatedIndustries: ["retail-ecommerce", "logistics-supply-chain", "financial-services"],
    seoDescription:
      "Android, iOS and cross-platform mobile app development by 4axiz for customer commerce, field operations and self-service.",
  },
  {
    slug: "business-process-automation",
    href: "/solutions/business-process-automation",
    title: "Business Process Automation",
    shortTitle: "Process Automation",
    icon: "workflow",
    tagline: "Remove the manual steps that slow your organisation down.",
    summary:
      "Digitise approvals, hand-offs and repetitive tasks with workflow automation that is visible, auditable and easy to change.",
    intro:
      "Many delays aren't caused by hard work — they're caused by waiting: for a signature, for a spreadsheet, for someone to forward an email. 4axiz maps these processes, removes unnecessary steps and automates the rest, connecting people and systems so work flows without chasing.",
    problems: [
      "Approvals are chased by email and phone.",
      "The same data is typed into several systems.",
      "There's no visibility into where a request is stuck.",
      "Compliance evidence is gathered manually at audit time.",
    ],
    capabilities: [
      { title: "Process mapping", description: "Document current processes and design streamlined future states." },
      { title: "Digital forms & approvals", description: "Replace paper and email with structured forms and approval chains." },
      { title: "System-to-system automation", description: "Move data between applications automatically through APIs." },
      { title: "Notifications & escalations", description: "Reminders and escalations based on deadlines and SLAs." },
      { title: "Audit trails", description: "Every action recorded with who, what and when." },
      { title: "Process dashboards", description: "See volumes, bottlenecks and turnaround times." },
    ],
    approach: [
      { title: "Map", description: "Walk the process with the people who run it." },
      { title: "Simplify", description: "Remove steps before automating them." },
      { title: "Automate", description: "Build workflows and integrations incrementally." },
      { title: "Measure", description: "Track turnaround and refine." },
    ],
    outcomes: [
      "Faster turnaround on routine requests",
      "Less duplicated data entry",
      "Clear visibility into process status",
      "Built-in compliance evidence",
    ],
    relatedServices: ["custom-software-development", "api-integration", "ai-machine-learning"],
    relatedProjects: ["ngo-forum-integrated-erp", "kmix-erp", "dsk-e-loan"],
    relatedIndustries: ["ngos-development", "manufacturing-distribution", "professional-services"],
    seoDescription:
      "Business process automation by 4axiz: digital approvals, workflow automation, system integration and process dashboards.",
  },
  {
    slug: "ecommerce",
    href: "/solutions/ecommerce",
    title: "E-commerce Solutions",
    shortTitle: "E-commerce",
    icon: "shopping-cart",
    tagline: "Commerce platforms connected to the operations behind them.",
    summary:
      "Online stores, marketplaces and shopping apps integrated with inventory, payments, delivery and customer service.",
    intro:
      "Selling online is only half of e-commerce; the other half is fulfilling orders reliably. 4axiz builds storefronts and shopping apps together with the order, stock and delivery processes behind them, so growth doesn't create chaos in operations.",
    problems: [
      "Online orders are handled separately from stock and accounts.",
      "The storefront is slow or hard to manage.",
      "Customers abandon carts because checkout or payment is unreliable.",
      "Delivery status is not visible to customers or staff.",
    ],
    capabilities: [
      { title: "Storefronts & marketplaces", description: "Single-vendor stores and multi-vendor marketplaces." },
      { title: "Shopping apps", description: "Android and iOS apps for browsing, ordering and tracking." },
      { title: "Payments", description: "Integration with local and international payment gateways." },
      { title: "Order management", description: "Order processing, picking, packing and returns." },
      { title: "Inventory sync", description: "Stock shared between online and physical channels." },
      { title: "Promotions", description: "Coupons, campaigns and pricing rules." },
    ],
    approach: [
      { title: "Commerce strategy", description: "Clarify catalogue, channels and fulfilment model." },
      { title: "Experience design", description: "Design browsing and checkout for conversion." },
      { title: "Platform build", description: "Build storefront, admin and integrations." },
      { title: "Scale", description: "Optimise performance and operations as volume grows." },
    ],
    outcomes: [
      "A reliable online sales channel",
      "Operations that keep pace with orders",
      "Better customer experience from browse to delivery",
      "Data to understand what sells",
    ],
    relatedServices: ["ecommerce-development", "mobile-app-development", "web-development"],
    relatedProjects: ["bazarnao", "unikart", "unikart-app"],
    relatedIndustries: ["retail-ecommerce", "logistics-supply-chain", "manufacturing-distribution"],
    seoDescription:
      "E-commerce development by 4axiz: online stores, marketplaces and shopping apps integrated with payments, inventory and delivery.",
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
