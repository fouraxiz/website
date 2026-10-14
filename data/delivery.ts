import type { IconName } from "@/types";

/**
 * "Technology & Delivery" content from the Company Profile 2026 (pp. 19–27).
 * Seeded into the `how_we_work` collection; each item belongs to one group.
 */
export type DeliveryGroup =
  | "features"
  | "engineering"
  | "architecture"
  | "duration"
  | "testing"
  | "training"
  | "support"
  | "sla"
  | "controls"
  | "compliance"
  | "infrastructure"
  | "tech-choice";

export interface DeliveryItem {
  group: DeliveryGroup;
  title: string;
  description: string;
  icon?: IconName;
  /** Group-specific detail: architecture layer points, SLA response time, etc. */
  points?: string[];
  meta?: string;
}

export const deliveryGroups: { value: DeliveryGroup; label: string }[] = [
  { value: "features", label: "Features built into every platform" },
  { value: "engineering", label: "Engineering excellence" },
  { value: "architecture", label: "System architecture layer" },
  { value: "duration", label: "Typical duration" },
  { value: "testing", label: "System testing" },
  { value: "training", label: "Training & documentation" },
  { value: "support", label: "Post-deployment support" },
  { value: "sla", label: "Service level" },
  { value: "controls", label: "Security controls" },
  { value: "compliance", label: "Compliance & standards" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "tech-choice", label: "How we choose technology" },
];

export const deliveryItems: DeliveryItem[] = [
  // Technological features we build in
  { group: "features", icon: "cloud", title: "Cloud-based & scalable", description: "Cloud-ready architecture ensuring secure access, high availability, scalability and future expansion — no physical servers for the client to maintain." },
  { group: "features", icon: "smartphone", title: "Web & mobile responsive", description: "Programme teams, field staff, partners and management access and manage information from any location and device." },
  { group: "features", icon: "database", title: "Offline data collection", description: "Mobile applications support offline entry with automatic synchronisation for teams working in remote areas with limited connectivity." },
  { group: "features", icon: "map-pin", title: "GPS & evidence capture", description: "Geo-tagged records with photo and document evidence, supporting verification and post-activity follow-up." },
  { group: "features", icon: "lock", title: "Role-based access control", description: "Granular permissions by role, unit and geography, with segregation of duties and full audit trails." },
  { group: "features", icon: "bar-chart", title: "Dashboards & analytics", description: "Role-based dashboards, indicator tracking, drill-down reporting and export to Excel, PDF and BI tools." },
  { group: "features", icon: "globe", title: "Bangla & English support", description: "Bilingual interfaces so field users work in the language they are comfortable with." },
  { group: "features", icon: "plug", title: "Integration-ready APIs", description: "REST APIs and connectors for SMS, email, WhatsApp, payment gateways, HR, finance and third-party systems." },
  { group: "features", icon: "shield-check", title: "Security & backup", description: "Encrypted storage and transmission, hardened authentication, automated backup and disaster recovery." },

  // Engineering excellence under the hood
  { group: "engineering", icon: "cloud", title: "Cloud-native", description: "High-availability, scalable cloud infrastructure with global access." },
  { group: "engineering", icon: "layers", title: "Modular architecture", description: "Microservice-based design for flexibility and easy expansion." },
  { group: "engineering", icon: "smartphone", title: "Mobile-first", description: "Responsive web plus native and hybrid Android & iOS applications." },
  { group: "engineering", icon: "activity", title: "Real-time processing", description: "Instant updates across transactions, attendance and communications." },
  { group: "engineering", icon: "lock", title: "Security by design", description: "RBAC, encrypted transmission, secure auth and regular audits." },
  { group: "engineering", icon: "brain", title: "AI & analytics", description: "Predictive insight, automated reporting and forecasting built in." },
  { group: "engineering", icon: "plug", title: "Open integrations", description: "SMS, email, WhatsApp API and digital payment gateways." },
  { group: "engineering", icon: "boxes", title: "SaaS-ready", description: "Multi-tenant platforms engineered for long-term growth." },
  { group: "engineering", icon: "database", title: "Offline-first", description: "Field applications that keep working where connectivity does not." },

  // System architecture (three tiers)
  {
    group: "architecture",
    title: "Presentation layer",
    meta: "Web portal and mobile applications",
    description: "What programme, MEAL, management and field users see and use.",
    points: [
      "Responsive web interface for programme, MEAL and management users",
      "Android and iOS applications for field data collection",
      "Role-based menus, dashboards and bilingual interface",
      "Offline-capable forms with background synchronisation",
    ],
  },
  {
    group: "architecture",
    title: "Application layer",
    meta: "Business logic, workflow and integration",
    description: "Where the rules, approvals and integrations run.",
    points: [
      "Modular services for each functional domain",
      "Workflow, approval and validation engine",
      "Authentication, authorisation and audit logging",
      "REST APIs for integration with external systems",
    ],
  },
  {
    group: "architecture",
    title: "Data layer",
    meta: "Database, storage and reporting",
    description: "Where information is stored, protected and reported on.",
    points: [
      "Structured relational database management",
      "Secure data storage with encryption at rest and in transit",
      "Data validation and quality control rules",
      "Automated backup, recovery and audit history",
    ],
  },

  // Typical duration
  { group: "duration", title: "Enterprise MIS or ERP programme", meta: "10–12 months", description: "A full programme runs across all nine phases." },
  { group: "duration", title: "Module-level engagements and product deployments", meta: "6–12 weeks", description: "The same discipline, compressed into fewer phases." },

  // System testing
  { group: "testing", icon: "code", title: "Unit & module testing", description: "Each module verified against its functional specification before integration." },
  { group: "testing", icon: "plug", title: "Integration testing", description: "End-to-end verification across modules, APIs and third-party systems." },
  { group: "testing", icon: "gauge", title: "Performance & load testing", description: "Response times and stability verified under expected and peak load." },
  { group: "testing", icon: "lock", title: "Security testing", description: "Access control, authentication, injection and data-exposure checks." },
  { group: "testing", icon: "clipboard-check", title: "Data validation testing", description: "Validation rules, logical checks and mandatory fields verified with real data." },
  { group: "testing", icon: "badge-check", title: "User acceptance testing", description: "Structured UAT with client users, issue log and formal sign-off." },

  // Training & documentation
  { group: "training", icon: "users", title: "Hands-on user training", description: "On-site and online sessions for administrators, programme staff and field data-entry users." },
  { group: "training", icon: "graduation-cap", title: "Trainer & admin enablement", description: "Train-the-trainer sessions so the organisation can onboard new staff independently." },
  { group: "training", icon: "file-text", title: "Bilingual documentation", description: "User manuals in English and Bangla, SOPs and technical system documentation." },

  // Post-deployment support framework
  { group: "support", icon: "headset", title: "Technical support", description: "Named support channel with defined response and resolution targets by severity, covering incidents, defects and user queries." },
  { group: "support", icon: "activity", title: "System monitoring", description: "Availability, performance and error monitoring with proactive alerting before users are affected." },
  { group: "support", icon: "shield-check", title: "Bug fixing & patching", description: "Defect resolution, security patching and platform updates on a scheduled and emergency basis." },
  { group: "support", icon: "database", title: "Backup & recovery", description: "Automated backup verification and tested recovery procedures with agreed RPO and RTO." },
  { group: "support", icon: "graduation-cap", title: "User support & refresher training", description: "Ongoing user assistance, refresher sessions and documentation updates as the system evolves." },
  { group: "support", icon: "workflow", title: "Change request management", description: "Requirement review and impact analysis, technical assessment, development, testing and approved release." },

  // Indicative service levels
  { group: "sla", title: "P1 — Critical", description: "System unavailable", meta: "Response within 1 hour" },
  { group: "sla", title: "P2 — High", description: "Major function impaired", meta: "Response within 4 hours" },
  { group: "sla", title: "P3 — Medium", description: "Minor function or query", meta: "Next business day" },
  { group: "sla", title: "P4 — Enhancement", description: "Change request", meta: "Assessed and scheduled" },

  // Security, infrastructure & compliance
  { group: "controls", title: "Role-based access with segregation of duties", description: "" },
  { group: "controls", title: "Encrypted transmission and hardened authentication", description: "" },
  { group: "controls", title: "Structured functional, performance and regression QA", description: "" },
  { group: "controls", title: "Comprehensive audit trails and audit-ready reporting", description: "" },
  { group: "controls", title: "Secure SDLC with peer code review at every merge", description: "" },
  { group: "compliance", title: "National regulatory compliance", description: "" },
  { group: "compliance", title: "International donor requirements", description: "" },
  { group: "compliance", title: "Data-protection best practice", description: "" },
  { group: "compliance", title: "Performance and load standards", description: "" },
  { group: "compliance", title: "Disaster recovery and backup policy", description: "" },
  { group: "infrastructure", icon: "cloud", title: "Cloud hosting", description: "AWS or client-nominated cloud, with environment separation for development, staging and production." },
  { group: "infrastructure", icon: "server", title: "High availability", description: "Redundant application and database tiers with monitored uptime and failover." },
  { group: "infrastructure", icon: "database", title: "Backup & disaster recovery", description: "Scheduled automated backups, off-site retention and tested restore procedures." },
  { group: "infrastructure", icon: "map-pin", title: "Data residency options", description: "In-country or regional hosting where programme or donor policy requires it." },

  // How we choose technology
  { group: "tech-choice", icon: "compass", title: "Fit for the problem", description: "Stack selected against the workload, the team who will maintain it and the budget for the next five years." },
  { group: "tech-choice", icon: "life-buoy", title: "Long-term support", description: "We favour technologies with active communities and a credible upgrade path over short-lived frameworks." },
  { group: "tech-choice", icon: "badge-check", title: "Client ownership", description: "No proprietary lock-in — you receive source code, documentation and the ability to hire elsewhere." },
];
