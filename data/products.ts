import type { IconName, Product, ProductKind } from "@/types";

/**
 * Product catalogue.
 *
 * `kind` separates what 4axiz offers:
 *  - platform    — the connected 4axiz ERP platform
 *  - standalone  — named 4axiz products from the existing portfolio
 *  - erp-module  — capabilities delivered as part of the ERP platform
 *  - custom      — solution frameworks tailored per client engagement
 *
 * Features are described at capability level. Replace or extend with the
 * confirmed feature list for each product before launch. `integrations` stays
 * empty until specific integrations are confirmed.
 */
export const products: Product[] = [
  {
    slug: "4axiz-erp",
    name: "4axiz ERP",
    kind: "platform",
    category: "ERP",
    icon: "boxes",
    tagline: "A connected platform for finance, people, operations and insight.",
    summary: "The modular business management platform behind the 4axiz ERP ecosystem.",
    description:
      "4axiz ERP brings accounting, HR and payroll, procurement, inventory, sales and reporting onto one shared data model. Organisations start with the modules they need and add more as they grow, with configuration for their own structure, policies and approval chains.",
    features: [
      { title: "Modular by design", description: "Adopt the modules you need now and extend later without re-platforming." },
      { title: "Shared data model", description: "Every module reads and writes the same master data, so reports agree." },
      { title: "Configurable workflows", description: "Approval chains, numbering and policies set up to match your organisation." },
      { title: "Role-based access", description: "Permissions by role, department and branch." },
      { title: "Multi-branch support", description: "Run several branches or entities from one system." },
      { title: "Dashboards & reports", description: "Operational and financial reporting across modules." },
    ],
    benefits: ["One system instead of many", "Consistent data across departments", "Faster reporting and closing", "Scales with the organisation"],
    integrations: [],
    audience: ["Growing SMEs", "Multi-branch organisations", "NGOs and development organisations", "Healthcare and service organisations"],
    mockup: { metricLabels: ["Modules active", "Pending approvals", "Today's transactions"], rows: ["Finance · Journal posted", "HR · Leave approved", "Procurement · PO issued", "Inventory · Transfer received"] },
  },
  {
    slug: "school-management",
    name: "4axiz School Management",
    kind: "standalone",
    category: "Education",
    icon: "graduation-cap",
    tagline: "Academic administration in one place.",
    summary: "A school management product for educational institutions.",
    description:
      "4axiz School Management helps schools organise administration on a single platform. Contact our team for a walkthrough of the current feature set and deployment options.",
    features: [
      { title: "Centralised records", description: "Keep institutional records in one system instead of scattered files." },
      { title: "Web-based access", description: "Use the system from any modern browser." },
      { title: "Role-based access", description: "Different access for administrators and staff roles." },
      { title: "Configurable for your institution", description: "Set up to reflect how your institution is organised." },
    ],
    benefits: ["Less paperwork for administrators", "Information available when needed", "A single system of record"],
    integrations: [],
    audience: ["Schools", "Educational institutions"],
    mockup: { metricLabels: ["Classes", "Records updated", "Notices"], rows: ["Records · Updated", "Class schedule", "Notice published", "Report generated"] },
  },
  {
    slug: "pos",
    name: "4axiz POS",
    kind: "standalone",
    category: "Retail",
    icon: "scan-barcode",
    tagline: "Counter sales that keep stock and finance in sync.",
    summary: "A point-of-sale product for retail counters and outlets.",
    description:
      "4axiz POS supports day-to-day counter sales for retail businesses. It can run as a standalone product or as the POS module of 4axiz ERP, where sales flow directly into inventory and accounting.",
    features: [
      { title: "Counter checkout", description: "A focused sales screen for fast transactions." },
      { title: "Product & price management", description: "Maintain products and prices centrally." },
      { title: "Sales records", description: "Track sales by day, counter and product." },
      { title: "ERP-ready", description: "Connects with ERP inventory and accounting modules." },
    ],
    benefits: ["Faster checkout", "Accurate sales records", "Room to grow into full ERP"],
    integrations: [],
    audience: ["Retail shops", "Outlets and branches"],
    erpModule: "pos",
    mockup: { metricLabels: ["Today's sales", "Transactions", "Top product"], rows: ["Sale · Counter 1", "Sale · Counter 2", "Return processed", "Day close"] },
  },
  {
    slug: "hrm-payroll",
    name: "HRM & Payroll",
    kind: "erp-module",
    category: "HRM",
    icon: "users",
    tagline: "People operations from onboarding to payslip.",
    summary: "Employee records, leave, attendance and payroll within 4axiz ERP.",
    description:
      "The HRM & Payroll module manages the employee lifecycle, leave policies, attendance and payroll processing, with payroll journals flowing into accounting.",
    features: [
      { title: "Employee records", description: "Complete employee profiles and documents." },
      { title: "Leave & attendance", description: "Policy-driven leave and shift-based attendance." },
      { title: "Payroll", description: "Salary structures, payslips and accounting postings." },
      { title: "Self-service", description: "Employees access payslips and requests online." },
    ],
    benefits: ["Consistent HR policy", "Faster payroll", "Fewer HR queries"],
    integrations: [],
    audience: ["HR teams", "Finance teams", "Managers"],
    erpModule: "hrm-payroll",
    mockup: { metricLabels: ["Present today", "On leave", "Payroll"], rows: ["Leave request", "Attendance sync", "Payroll review", "Payslips published"] },
  },
  {
    slug: "accounting",
    name: "Accounting & Finance",
    kind: "erp-module",
    category: "Finance",
    icon: "calculator",
    tagline: "A ledger that every department posts to.",
    summary: "General ledger, receivables, payables and financial statements within 4axiz ERP.",
    description:
      "The Accounting & Finance module is the financial core of 4axiz ERP, receiving postings from sales, purchasing, payroll and inventory.",
    features: [
      { title: "General ledger", description: "Chart of accounts, journals and periods." },
      { title: "Receivables & payables", description: "Invoices, bills and payment tracking." },
      { title: "Bank reconciliation", description: "Match transactions to statements." },
      { title: "Financial statements", description: "Trial balance, P&L and balance sheet." },
    ],
    benefits: ["Faster month-end", "Fewer manual entries", "Clear audit trail"],
    integrations: [],
    audience: ["Finance teams", "Business owners", "Auditors"],
    erpModule: "accounting-finance",
    mockup: { metricLabels: ["Receivables", "Payables", "Cash"], rows: ["Journal posted", "Invoice issued", "Bill paid", "Bank reconciled"] },
  },
  {
    slug: "procurement",
    name: "Procurement",
    kind: "erp-module",
    category: "Procurement",
    icon: "shopping-bag",
    tagline: "Controlled purchasing with full traceability.",
    summary: "Requisitions, approvals, quotations and purchase orders within 4axiz ERP.",
    description:
      "The Procurement module structures purchasing from requisition through approval, quotation comparison, purchase order and goods receipt.",
    features: [
      { title: "Requisitions", description: "Department purchase requests with justification." },
      { title: "Approval chains", description: "Rules by amount and department." },
      { title: "Quotation comparison", description: "Compare vendor offers side by side." },
      { title: "Purchase orders & receipts", description: "Track orders through to delivery." },
    ],
    benefits: ["Transparent purchasing", "Policy compliance", "Spend visibility"],
    integrations: [],
    audience: ["Procurement teams", "Department heads", "Finance"],
    erpModule: "procurement",
    mockup: { metricLabels: ["Open PRs", "Pending approval", "POs"], rows: ["Requisition raised", "Approval · Level 2", "Quotations compared", "PO issued"] },
  },
  {
    slug: "project-management",
    name: "Project Management",
    kind: "erp-module",
    category: "Project Management",
    icon: "kanban",
    tagline: "Delivery, time and budget in one view.",
    summary: "Projects, tasks, timesheets and budgets within 4axiz ERP.",
    description:
      "The Project Management module connects planning and execution with people and costs, giving managers a live view of progress.",
    features: [
      { title: "Projects & milestones", description: "Plan phases, owners and dates." },
      { title: "Task boards", description: "Kanban and list views for teams." },
      { title: "Timesheets", description: "Time logged against projects." },
      { title: "Budget tracking", description: "Planned versus actual cost." },
    ],
    benefits: ["Live project visibility", "Accurate costing", "Less status reporting"],
    integrations: [],
    audience: ["Project managers", "Delivery teams", "Leadership"],
    erpModule: "project-management",
    mockup: { metricLabels: ["Active projects", "Tasks due", "Budget used"], rows: ["Milestone reached", "Task assigned", "Timesheet submitted", "Budget review"] },
  },
  {
    slug: "inventory",
    name: "Inventory Management",
    kind: "erp-module",
    category: "Inventory",
    icon: "package",
    tagline: "Accurate stock across every location.",
    summary: "Multi-warehouse stock control within 4axiz ERP.",
    description:
      "The Inventory module tracks items, movements, transfers and valuation across warehouses and outlets, connected to purchasing and sales.",
    features: [
      { title: "Item master", description: "Products, units, categories and barcodes." },
      { title: "Multi-location stock", description: "Warehouses, stores and transfers." },
      { title: "Stock movements", description: "Receipts, issues and adjustments." },
      { title: "Valuation", description: "Inventory value linked to accounting." },
    ],
    benefits: ["Reliable stock levels", "Fewer stock-outs", "Correct valuation"],
    integrations: [],
    audience: ["Warehouse teams", "Retail operations", "Finance"],
    erpModule: "inventory",
    mockup: { metricLabels: ["Stock value", "Low stock", "Transfers"], rows: ["Goods received", "Transfer sent", "Stock count", "Reorder alert"] },
  },
  {
    slug: "custom-business-solutions",
    name: "Custom Business Solutions",
    kind: "custom",
    category: "Custom",
    icon: "layers",
    tagline: "When your process needs software of its own.",
    summary: "Tailored systems built on proven 4axiz components and delivery practices.",
    description:
      "Some needs don't fit a standard product. We build custom solutions — portals, workflow systems, archives, loan platforms and more — reusing proven components where it makes sense and building new where it matters.",
    features: [
      { title: "Discovery-led scope", description: "Requirements shaped with your stakeholders." },
      { title: "Reusable foundations", description: "Authentication, roles, audit and reporting foundations reused across projects." },
      { title: "Integration-ready", description: "APIs to connect with ERP and third-party systems." },
      { title: "Long-term support", description: "Maintenance and enhancement after launch." },
    ],
    benefits: ["Software that fits", "Faster delivery on proven foundations", "Ownership of your system"],
    integrations: [],
    audience: ["Organisations with specialised processes", "Public and development sector", "Financial services"],
    mockup: { metricLabels: ["Requests", "In review", "Completed"], rows: ["Application received", "Review · Stage 2", "Approved", "Archived"] },
  },
];

/**
 * "Products you can adopt today" — the 16 ready-to-deploy products listed in the
 * Company Profile 2026. Licensed as a one-off licence, annual subscription or
 * fully managed SaaS, with configuration, data migration and training included.
 */
export const readyProducts: { name: string; icon: IconName; summary: string | null; href: string | null }[] = [
  { name: "Restaurant Management", icon: "utensils", summary: null, href: null },
  { name: "HR & Payroll Management", icon: "users", summary: null, href: "/products/hrm-payroll" },
  { name: "Garments ERP", icon: "shirt", summary: null, href: null },
  { name: "Multi-purpose Management", icon: "layers", summary: null, href: null },
  { name: "Courier & Product Tracking", icon: "truck", summary: null, href: null },
  { name: "Point of Sale (POS)", icon: "scan-barcode", summary: null, href: "/products/pos" },
  { name: "Real Estate (CRM)", icon: "house", summary: null, href: null },
  { name: "Document Management", icon: "file-text", summary: null, href: null },
  { name: "Prescription Management", icon: "clipboard-check", summary: null, href: null },
  { name: "Manufacturing Software", icon: "factory", summary: null, href: null },
  { name: "Digital Archiving (Web)", icon: "archive", summary: null, href: "/projects/dgfp-digital-archive" },
  { name: "Medicine Shop Management", icon: "pill", summary: null, href: null },
  { name: "Attendance Management", icon: "fingerprint", summary: null, href: null },
  { name: "School / College Management", icon: "graduation-cap", summary: null, href: "/products/school-management" },
  { name: "Hospital Management", icon: "hospital", summary: null, href: null },
  { name: "Smart Hostel Management", icon: "bed", summary: "Admission, rooms, billing, meals and maintenance with AI-assisted forecasting.", href: "/projects/smart-hostel-management" },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const productKindLabel: Record<ProductKind, string> = {
  platform: "Platform",
  standalone: "Product",
  "erp-module": "ERP module",
  custom: "Custom solution",
};

export const productKindDescription: Record<ProductKind, string> = {
  platform: "The connected 4axiz ERP platform.",
  standalone: "Named 4axiz products that can be deployed on their own.",
  "erp-module": "Capabilities delivered as part of 4axiz ERP.",
  custom: "Tailored solutions built for a specific organisation.",
};
