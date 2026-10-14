import type { Industry } from "@/types";

export const industries: Industry[] = [
  {
    slug: "government-public-sector",
    title: "Government & Public Sector",
    icon: "landmark",
    summary: "Digital archives, disease surveillance and nationwide monitoring systems for ministries and directorates.",
    intro:
      "Our public-sector clients — including MOHFW, DGFP, DGHS, IPHN, CPTU, NTP and the Department of Youth Development — answer to ministries and international donors. We build nationwide systems with the access control, audit trails and training they need.",
    challenges: [
      { title: "Nationwide scale", description: "Systems used across hundreds of facilities and field offices." },
      { title: "Connectivity", description: "Field staff working where the network is unreliable." },
      { title: "Records and archives", description: "Paper records that are hard to store, find and share." },
      { title: "Capacity", description: "Users who need training in their own language." },
    ],
    solutions: [
      { title: "MIS & MEAL platforms", description: "Monitoring, indicators and dashboards.", href: "/services/mis-meal-platforms" },
      { title: "Mobile apps", description: "Offline field data collection.", href: "/solutions/mobile-apps" },
      { title: "Custom software", description: "Digital archives and registries.", href: "/solutions/custom-software" },
    ],
    relatedProjects: ["ntp-aspect-monitoring", "dgfp-digital-archive", "dghs-etoolkits", "youth-organization-bangladesh"],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    icon: "stethoscope",
    summary: "TB monitoring, health records, pharmacy and facility reporting systems used nationwide.",
    intro:
      "Healthcare organisations carry heavy operational loads behind the scenes — equipment uptime, supplies, staffing and reporting to stakeholders. Software that removes this friction frees teams to focus on care.",
    challenges: [
      { title: "Equipment downtime", description: "Diagnostic and clinical equipment issues tracked informally lead to slow responses." },
      { title: "Programme reporting", description: "Periodic indicators compiled by hand from many facilities." },
      { title: "Supply visibility", description: "Consumables and stock levels unknown across sites." },
      { title: "Fragmented back office", description: "HR, procurement and finance disconnected from operations." },
    ],
    solutions: [
      { title: "Healthcare ERP modules", description: "Equipment, ticketing and programme reporting.", href: "/solutions/erp/healthcare" },
      { title: "Asset management", description: "Registry and maintenance for medical equipment.", href: "/solutions/erp/asset-management" },
      { title: "Reporting & analytics", description: "Dashboards across facilities.", href: "/solutions/erp/reporting-analytics" },
    ],
    relatedProjects: ["ntp-aspect-monitoring", "mdr-tb-dot-monitoring", "sbcc-activity-monitoring", "dgda-model-pharmacy"],
  },
  {
    slug: "education",
    title: "Education",
    icon: "graduation-cap",
    summary: "School and institution management systems that reduce administrative load.",
    intro:
      "Educational institutions manage a large volume of records, schedules and communication. Well-designed software lets administrators and teachers spend less time on paperwork.",
    challenges: [
      { title: "Paper-based administration", description: "Records held in registers and spreadsheets." },
      { title: "Communication gaps", description: "Notices and updates reach people inconsistently." },
      { title: "Fee and finance tracking", description: "Collections reconciled manually." },
      { title: "Reporting", description: "Institutional reports assembled by hand." },
    ],
    solutions: [
      { title: "4axiz School Management", description: "A product for school administration.", href: "/products/school-management" },
      { title: "Smart Hostel Management", description: "Admission, billing, meals and maintenance.", href: "/projects/smart-hostel-management" },
      { title: "Web applications", description: "Portals for students, parents and staff.", href: "/solutions/web-applications" },
      { title: "HRM & Payroll", description: "Staff, leave and payroll for institutions.", href: "/solutions/erp/hrm-payroll" },
    ],
    relatedProjects: ["unfpa-shombhabona-connect", "somvabona", "niter-student-management", "smart-hostel-management"],
  },
  {
    slug: "retail-ecommerce",
    title: "Retail & E-commerce",
    icon: "shopping-cart",
    summary: "Point of sale, inventory and online commerce working as one.",
    intro:
      "Retailers sell across counters, websites and apps — but customers expect one consistent experience. Connected POS, inventory and e-commerce systems make that possible.",
    challenges: [
      { title: "Channel silos", description: "Online and in-store stock and pricing disagree." },
      { title: "Slow checkout", description: "Counter software that slows down queues." },
      { title: "Stock accuracy", description: "Overselling and stock-outs." },
      { title: "Fulfilment", description: "Order status unclear to staff and customers." },
    ],
    solutions: [
      { title: "4axiz POS", description: "Counter sales connected to stock and finance.", href: "/products/pos" },
      { title: "E-commerce solutions", description: "Stores, marketplaces and shopping apps.", href: "/solutions/ecommerce" },
      { title: "Inventory management", description: "Multi-location stock control.", href: "/solutions/erp/inventory" },
    ],
    relatedProjects: ["bazarnao", "unikart", "unikart-app"],
  },
  {
    slug: "ngos-development",
    title: "UN, INGOs & Development",
    icon: "heart-handshake",
    summary: "MIS, MEAL, ERP and field data systems for UN agencies, international NGOs and local NGOs.",
    intro:
      "Development organisations must demonstrate accountability to donors, regulators and communities while operating across many locations. We have built systems for UNDP, UNFPA, UNHCR-funded programmes, Handicap International, Management Sciences for Health, Pathfinder and local NGOs — designed for donor-grade security and audit.",
    challenges: [
      { title: "Accountability", description: "Proving how funds and resources were used." },
      { title: "Distributed operations", description: "Field offices with limited connectivity and shared tools." },
      { title: "Procurement compliance", description: "Purchasing that must follow donor rules." },
      { title: "Programme data", description: "Beneficiary and activity data collected inconsistently." },
    ],
    solutions: [
      { title: "MIS & MEAL platforms", description: "Beneficiaries, indicators, partners and dashboards.", href: "/services/mis-meal-platforms" },
      { title: "Procurement & vendor management", description: "Compliant, auditable purchasing.", href: "/solutions/erp/procurement" },
      { title: "Custom software", description: "Programme, fleet, audit and incident systems.", href: "/solutions/custom-software" },
      { title: "Process automation", description: "Digital approvals and audit trails.", href: "/solutions/business-process-automation" },
    ],
    relatedProjects: ["handicap-international-mis", "ngo-forum-integrated-erp", "undp-nuprp-mis", "cpd-erp"],
  },
  {
    slug: "financial-services",
    title: "Financial Services",
    icon: "landmark",
    summary: "Loan, accounting and customer-facing systems for financial institutions.",
    intro:
      "Financial service providers need systems that are secure, auditable and fast — whether processing a loan application or reconciling thousands of transactions.",
    challenges: [
      { title: "Manual loan processing", description: "Applications and approvals handled on paper." },
      { title: "Reconciliation effort", description: "Large transaction volumes reconciled by hand." },
      { title: "Audit requirements", description: "Evidence for every decision and change." },
      { title: "Customer expectations", description: "Demand for digital self-service." },
    ],
    solutions: [
      { title: "Custom software", description: "Loan and case management platforms.", href: "/solutions/custom-software" },
      { title: "Accounting & finance", description: "Ledger and reconciliation.", href: "/solutions/erp/accounting-finance" },
      { title: "AI solutions", description: "Document processing and risk insight.", href: "/solutions/ai" },
    ],
    relatedProjects: ["dsk-e-loan"],
  },
  {
    slug: "manufacturing-distribution",
    title: "Manufacturing & Distribution",
    icon: "factory",
    summary: "Inventory, procurement and distribution systems for producers and distributors.",
    intro:
      "Manufacturers and distributors depend on materials arriving on time, stock being accurate and goods reaching customers efficiently. Connected ERP modules make each step visible.",
    challenges: [
      { title: "Material availability", description: "Production delayed by missing inputs." },
      { title: "Distributor ordering", description: "Orders taken by phone and message." },
      { title: "Warranty and service", description: "After-sales claims handled manually." },
      { title: "Costing", description: "True product cost unclear." },
    ],
    solutions: [
      { title: "Supply chain management", description: "Planning and distribution visibility.", href: "/solutions/erp/supply-chain" },
      { title: "Warranty management", description: "Claims, repairs and replacements.", href: "/solutions/erp/warranty-management" },
      { title: "Procurement", description: "Controlled material purchasing.", href: "/solutions/erp/procurement" },
    ],
    relatedProjects: ["kmix-erp"],
  },
  {
    slug: "logistics-supply-chain",
    title: "Logistics & Supply Chain",
    icon: "truck",
    summary: "Visibility across warehouses, dispatch and delivery.",
    intro:
      "Logistics runs on timing and information. When every hand-off is recorded and visible, teams can plan better and customers stay informed.",
    challenges: [
      { title: "Shipment visibility", description: "No live view of goods in transit." },
      { title: "Warehouse accuracy", description: "Stock locations and quantities uncertain." },
      { title: "Field data", description: "Delivery proof captured on paper." },
      { title: "Performance measurement", description: "On-time rates not tracked." },
    ],
    solutions: [
      { title: "Supply chain management", description: "Order, dispatch and delivery tracking.", href: "/solutions/erp/supply-chain" },
      { title: "Mobile apps", description: "Driver and field team apps.", href: "/solutions/mobile-apps" },
      { title: "Inventory management", description: "Warehouse stock control.", href: "/solutions/erp/inventory" },
    ],
    relatedProjects: ["handicap-international-mis"],
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    icon: "briefcase",
    summary: "Project, time and client management for service firms.",
    intro:
      "For consultancies, agencies and service firms, time is the product. Systems that connect projects, people and billing make utilisation and profitability visible.",
    challenges: [
      { title: "Utilisation", description: "Unclear how time is spent across clients." },
      { title: "Project profitability", description: "Margins known only after the project ends." },
      { title: "Knowledge silos", description: "Information locked in inboxes." },
      { title: "Client reporting", description: "Status updates assembled manually." },
    ],
    solutions: [
      { title: "Project management", description: "Projects, tasks, time and budgets.", href: "/solutions/erp/project-management" },
      { title: "AI solutions", description: "Assistants and document intelligence.", href: "/solutions/ai" },
      { title: "Process automation", description: "Approvals and client workflows.", href: "/solutions/business-process-automation" },
    ],
    relatedProjects: [],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
