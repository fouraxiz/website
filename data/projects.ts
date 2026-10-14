import type { Project } from "@/types";

/**
 * Portfolio projects, taken from the 4axiz Company Profile 2026 ("Ongoing Top
 * Projects", "More platforms in the field" and the client engagement record),
 * plus Unikart and DSK e-Loan from the existing fouraxiz.com portfolio.
 *
 * Screenshots live in /public/images/projects/. The first image is the card cover.
 */
export const projects: Project[] = [
  {
    slug: "handicap-international-mis",
    name: "Handicap International — Global MIS Suite",
    categories: ["INGO", "MIS", "Web Application", "Mobile App"],
    industry: "NGOs & Development",
    platform: ["Web", "Mobile"],
    client: "Handicap International",
    summary: "Four interlocking systems — a mutualised core, audit tracker, fleet management and safety reporting — for operations in 180+ countries.",
    overview:
      "4axiz IT Limited is engaged on several critical software development projects for Handicap International, a global organisation dedicated to improving the lives of people with disabilities. Designed to support HI's work in over 180 countries and delivered jointly for HI Bangladesh, France, Germany and the USA, these systems focus on operational efficiency, safety and management across multiple domains.",
    challenge: null,
    solution: null,
    highlights: ["180+ countries of operation", "4 interlocking lots", "1 mutualised core", "HI Bangladesh, France, Germany and USA"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: true,
    theme: "indigo",
    duration: "8 months",
    featuresTitle: "Four interlocking lots",
    features: [
      {
        "title": "Lot 1 — Mutualization: core model & technical architecture",
        "description": "A shared, scalable model and technical architecture usable across HI's global operations. A common core framework streamlines processes and improves resource utilisation across all HI branches worldwide."
      },
      {
        "title": "Lot 2 — ART: Audit & Recommendations Tracker",
        "description": "Tracks and manages audits, evaluations and recommendations in real time, keeping HI teams across regions aligned and improving follow-up efficiency on audit processes and quality management."
      },
      {
        "title": "Lot 3 — HI-FLEET: vehicles, routes & drivers management",
        "description": "Manages the organisation's fleet, drivers and routes across 180+ countries — enhancing logistics, improving vehicle safety, reducing operational cost and monitoring driver activity."
      },
      {
        "title": "Lot 4 — SECU App: safety & security incident reporting",
        "description": "Enables field staff across HI branches to report and respond to safety and security incidents promptly, ensuring real-time reporting and staff safety in complex environments."
      }
    ],
    technicalTitle: null,
    technical: [],
    stats: [
      {
        "value": "180+",
        "label": "Countries of operation"
      },
      {
        "value": "4",
        "label": "Interlocking lots"
      },
      {
        "value": "1",
        "label": "Mutualised core"
      },
      {
        "value": "4",
        "label": "HI national branches"
      }
    ],
    impactTitle: "Why it matters",
    impact: "These projects demonstrate our ability to deliver large-scale, robust solutions with an emphasis on security, functionality and scalability for a global humanitarian organisation.",
    deliveryTags: [],
    relatedSolutions: ["custom-software", "mobile-apps"],
  },
  {
    slug: "ngo-forum-integrated-erp",
    name: "Integrated ERP for NGO Forum for Public Health",
    categories: ["ERP", "INGO", "Web Application"],
    industry: "NGOs & Development",
    platform: ["Web"],
    client: "NGO Forum for Public Health (UNHCR-funded)",
    summary: "A multi-project, multi-location ERP for the central office and field programmes, including Cox's Bazar.",
    overview:
      "A comprehensive Integrated ERP System designed, developed and implemented to enhance organisational efficiency, strengthen transparency and ensure full compliance with national regulations and international donor requirements. It supports the central office and multiple project offices, including field-level programmes in Cox's Bazar supporting the Rohingya humanitarian response.",
    challenge: null,
    solution: null,
    highlights: ["UNHCR-funded programme", "Multi-project, multi-location", "Donor-compliant reporting", "8 integrated modules"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: true,
    theme: "blue",
    duration: "9 months",
    featuresTitle: "Key modules",
    features: [
      {
        "title": "Human Resource Management",
        "description": "Employee records, payroll, leave management, attendance tracking and performance evaluation."
      },
      {
        "title": "Finance & Accounting",
        "description": "Budgets, donor funds, multi-currency transactions, expenses and audit-ready financial reports."
      },
      {
        "title": "Procurement & Supply Chain",
        "description": "Raw material master data, inventory management and material consumption tracking."
      },
      {
        "title": "Production Planning & Control",
        "description": "Production order creation, stage-wise tracking, wastage monitoring and quality control."
      },
      {
        "title": "Inventory Management",
        "description": "Real-time stock control, goods received notes (GRN), issuance tracking and audit trails."
      },
      {
        "title": "Project & Budget Management",
        "description": "Project creation, budget monitoring, milestone tracking and donor-compliant reporting."
      },
      {
        "title": "Payment Management",
        "description": "Vendor payments, advances and reimbursements with approval workflows and audit logs."
      },
      {
        "title": "POS Sales & Sales Documents",
        "description": "POS retail sales integrated with inventory and accounting — invoices, delivery notes and sales records in real time."
      }
    ],
    technicalTitle: null,
    technical: [],
    stats: [],
    impactTitle: "Impact",
    impact: "Streamlined organisational processes, improved reporting accuracy and stronger transparency and accountability — a secure, scalable, fully integrated platform enabling NGO Forum to optimise resources and deliver better services to vulnerable populations.",
    deliveryTags: [],
    relatedSolutions: ["custom-software", "business-process-automation"],
  },
  {
    slug: "ntp-aspect-monitoring",
    name: "NTP Aspect — GeneXpert Monitoring",
    categories: ["Healthcare", "Government", "Monitoring"],
    industry: "Healthcare",
    platform: ["Web", "Devices"],
    client: "SystemOne LLC · National Tuberculosis Control Programme",
    summary: "Connecting GeneXpert TB diagnostic machines across 800+ upazila health complexes for remote monitoring.",
    overview:
      "ASPECT connects GeneXpert diagnostic machines to the internet so every device can be managed and monitored remotely — improving maintenance and coordination and giving fast feedback of results to patients, referring clinicians and treatment teams. 4axiz provides software development and maintenance support, installed the software and routers across the national GeneXpert network, and supports the workflow of TB case tracking, treatment monitoring and reporting in line with national health guidelines.",
    challenge: null,
    solution: null,
    highlights: ["800+ health complexes", "Nationwide rollout", "Field installation", "5 years running"],
    technologies: [],
    images: [{ src: "/images/projects/ntp-aspect.webp", alt: "GeneXpert monitoring setup in a health complex laboratory", width: 326, height: 632 }],
    liveUrl: null,
    featured: true,
    theme: "teal",
    duration: "5 years",
    featuresTitle: "What we built",
    features: [
      {
        "title": "Installation and implementation",
        "description": "Across 760+ upazila health complexes."
      },
      {
        "title": "Device connectivity",
        "description": "Configuration and remote monitoring setup."
      },
      {
        "title": "Monitoring tools",
        "description": "Monitoring tools development alongside SystemOne LLC."
      },
      {
        "title": "TB case workflow",
        "description": "Real-time TB case tracking, treatment monitoring and reporting."
      },
      {
        "title": "Training",
        "description": "Technical assistance and training for laboratory assistants."
      },
      {
        "title": "Daily support",
        "description": "Daily support, communication and first-level troubleshooting."
      }
    ],
    technicalTitle: null,
    technical: [],
    stats: [
      {
        "value": "800+",
        "label": "Health complexes"
      },
      {
        "value": "760+",
        "label": "Upazila installations"
      },
      {
        "value": "5 years",
        "label": "Running"
      }
    ],
    impactTitle: null,
    impact: null,
    deliveryTags: [
      "Nationwide rollout",
      "Field installation",
      "Monitoring tools"
    ],
    relatedSolutions: ["custom-software"],
  },
  {
    slug: "undp-nuprp-mis",
    name: "UNDP NUPRP — MIS & Mobile Survey",
    categories: ["UN", "MIS", "Mobile App"],
    industry: "NGOs & Development",
    platform: ["Web", "Mobile"],
    client: "UNDP — National Urban Poverty Reduction Programme",
    summary: "Offline-first socio-economic data collection and monitoring for urban poverty programmes, hosted on AWS.",
    overview:
      "A robust digital survey and monitoring solution designed, developed, deployed and supported by 4axiz for UNDP under the National Urban Poverty Reduction Programme. It supports large-scale collection of urban poverty indicators — household income, housing conditions, access to services, employment status and vulnerability factors — directly on mobile devices.",
    challenge: null,
    solution: null,
    highlights: ["Offline-first collection", "Built-in data quality", "Supervisor review workflows", "AWS deployment"],
    technologies: ["AWS"],
    images: [],
    liveUrl: null,
    featured: true,
    theme: "blue",
    duration: "5 years",
    featuresTitle: "What we built",
    features: [
      {
        "title": "Offline-first collection",
        "description": "Data is stored securely on the device and synchronised automatically once internet access returns — no interruption, no data loss."
      },
      {
        "title": "Built-in data quality",
        "description": "Validation rules, logical checks and mandatory fields ensure high-quality data at the point of capture."
      },
      {
        "title": "Secure access control",
        "description": "User authentication and role-based access maintain data integrity and confidentiality across survey teams."
      },
      {
        "title": "End-to-end service",
        "description": "System design, mobile development, backend integration, deployment, training, maintenance and ongoing technical support."
      },
      {
        "title": "Monitoring & analysis",
        "description": "Supervisor review workflows and consolidated reporting for programme monitoring."
      },
      {
        "title": "AWS deployment",
        "description": "Customised MIS software for urban poor communities hosted on AWS infrastructure."
      }
    ],
    technicalTitle: null,
    technical: [],
    stats: [],
    impactTitle: "Why it matters",
    impact: "This project exemplifies 4axiz's capability to deliver internationally recognised digital solutions that enable data-driven decision-making and strengthen development programmes targeting vulnerable urban populations.",
    deliveryTags: [],
    relatedSolutions: ["mobile-apps", "custom-software"],
  },
  {
    slug: "unfpa-shombhabona-connect",
    name: "UNFPA Shombhabona Connect",
    categories: ["Education", "UN", "Web Application"],
    industry: "Education",
    platform: ["Web", "Mobile"],
    client: "UNFPA",
    summary: "A gamified digital learning platform, based on the Shahana cartoon, running in 100+ schools.",
    overview:
      "A modern, interactive digital learning and engagement platform for school-going teenagers. Based on the popular Shahana cartoon, it promotes learning through gamification, quizzes and digital content — encouraging self-learning and helping teachers run a more participatory classroom.",
    challenge: null,
    solution: null,
    highlights: ["100+ schools", "Thousands of students reached", "Gamified learning model"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: true,
    theme: "rose",
    duration: null,
    featuresTitle: "Key features",
    features: [
      {
        "title": "Digital learning system",
        "description": "Structured educational content through interactive lessons and multimedia-based learning modules."
      },
      {
        "title": "Quiz & assessment system",
        "description": "Topic-based quizzes with real-time scoring and performance tracking."
      },
      {
        "title": "Real-time data tracking",
        "description": "Monitors student engagement, progress and performance for data-driven insight."
      },
      {
        "title": "Content feeding system",
        "description": "Centralised management and distribution of learning materials, quizzes and updates."
      },
      {
        "title": "Scheduling & alerts",
        "description": "Automated notifications ensure timely participation in learning activities and assessments."
      },
      {
        "title": "Monitoring dashboard",
        "description": "Performance analytics and usage reports for teachers and administrators."
      }
    ],
    technicalTitle: null,
    technical: [],
    stats: [
      {
        "value": "100+",
        "label": "Schools implemented"
      },
      {
        "value": "1000s",
        "label": "Students reached"
      },
      {
        "value": "Gamified",
        "label": "Learning model"
      }
    ],
    impactTitle: "Impact",
    impact: "Significantly improved digital education engagement — learning is more interactive, accessible and enjoyable, helping students develop critical thinking and improving academic performance.",
    deliveryTags: [],
    relatedSolutions: ["web-applications"],
  },
  {
    slug: "somvabona",
    name: "Somvabona — Education & Health Platform",
    categories: ["Education", "Healthcare", "Web Application", "Mobile App"],
    industry: "Education",
    platform: ["Web", "Mobile"],
    client: "Somvabona",
    summary: "Student and staff health records, monitoring and alerts for 20+ universities, colleges, schools and madrasahs.",
    overview:
      "An education and health platform on web and mobile that promotes health awareness, manages student wellbeing and integrates with educational institutions — so schools, colleges, universities and madrasahs can monitor and manage student and staff health effectively.",
    challenge: null,
    solution: null,
    highlights: ["20+ institutions", "Web and mobile", "Encrypted health records"],
    technologies: [],
    images: [],
    liveUrl: "https://pickieforlife.com",
    featured: false,
    theme: "teal",
    duration: "1 year",
    featuresTitle: "Platform features",
    features: [
      {
        "title": "Real-time health tracking",
        "description": "Health records for students and staff with live updates and alerts."
      },
      {
        "title": "Digital health records",
        "description": "Secure centralised records for vaccinations, check-ups and medical history."
      },
      {
        "title": "Personalised monitoring",
        "description": "Tools for mental health support, preventive care and individual wellness tracking."
      },
      {
        "title": "Scheduling & alerts",
        "description": "Automated check-up scheduling, vaccination reminders and emergency health alerts."
      },
      {
        "title": "Educational integration",
        "description": "Academic and health information combined in one platform for institutional management."
      },
      {
        "title": "Multi-institution deployment",
        "description": "Standardised health monitoring across 20+ institutions nationwide."
      }
    ],
    technicalTitle: null,
    technical: [
      {
        "title": "Security & privacy",
        "description": "End-to-end encrypted data management, compliant with data-protection standards."
      },
      {
        "title": "User-friendly design",
        "description": "Intuitive interface for administrators, teachers and staff with a minimal learning curve."
      },
      {
        "title": "Scalable architecture",
        "description": "Supports multiple institutions and users with room to expand features."
      },
      {
        "title": "Mobile & offline access",
        "description": "Responsive design with full mobile functionality, even in low-connectivity environments."
      }
    ],
    stats: [
      {
        "value": "20+",
        "label": "Universities, colleges, schools & madrasahs"
      }
    ],
    impactTitle: "Impact",
    impact: "Real-time insight, preventive care tools and actionable data create a safer, healthier learning environment — letting administrators act proactively and unifying academic and wellbeing management.",
    deliveryTags: [],
    relatedSolutions: ["web-applications", "mobile-apps"],
  },
  {
    slug: "mdr-tb-dot-monitoring",
    name: "MDR TB DOT Monitoring System",
    categories: ["Healthcare", "Government", "Mobile App"],
    industry: "Healthcare",
    platform: ["Web", "Mobile", "Desktop"],
    client: "NTP, DGHS · Management Sciences for Health (USAID-funded)",
    summary: "Geo-tagged DOT visit monitoring and patient records for multi-drug-resistant TB, available on Google Play.",
    overview:
      "A DOT monitoring system with geo-tagging, built on data from mobile service providers, so programme managers can monitor service delivery and keep records of multi-drug-resistant TB patients. Implemented across Bangladesh by NTP, DGHS, with desktop and mobile applications.",
    challenge: null,
    solution: null,
    highlights: ["Nationwide implementation", "Geo-tagged visits", "Android app on Google Play"],
    technologies: ["Android"],
    images: [{ src: "/images/projects/mdr-tb-dot.webp", alt: "MDR TB DOT Monitoring System mobile app login screen", width: 544, height: 450 }],
    liveUrl: null,
    featured: true,
    theme: "indigo",
    duration: "7 years",
    featuresTitle: "What we built",
    features: [
      {
        "title": "Geo-tagged DOT visit capture",
        "description": "From the field."
      },
      {
        "title": "MDR TB patient registry",
        "description": "Patient registry and treatment records."
      },
      {
        "title": "Mobile-operator data integration",
        "description": "For service verification."
      },
      {
        "title": "Supervisor dashboards",
        "description": "Supervisor dashboards and nationwide reporting."
      },
      {
        "title": "Android application",
        "description": "Distributed via Google Play."
      },
      {
        "title": "Maintenance & re-engineering",
        "description": "Ongoing maintenance and software re-engineering."
      }
    ],
    technicalTitle: null,
    technical: [],
    stats: [],
    impactTitle: null,
    impact: null,
    deliveryTags: [
      "Enterprise applications",
      "Desktop applications",
      "Web application",
      "API and add-ons",
      "Mobile & tablet apps",
      "Software maintenance",
      "Software re-engineering"
    ],
    relatedSolutions: ["mobile-apps"],
  },
  {
    slug: "sbcc-activity-monitoring",
    name: "SBCC Activity Monitoring Checklist (SAMCS)",
    categories: ["Healthcare", "Government", "Mobile App"],
    industry: "Healthcare",
    platform: ["Web", "Mobile"],
    client: "DGHS · BCCP (USAID Ujjiban SBCC project)",
    summary: "A digitised supervisor checklist for SBCC field activity, piloted and scaled in Sylhet and Chattogram divisions.",
    overview:
      "DGHS field-level supervisor tools did not cover monitoring of SBCC inputs, outputs and results. 4axiz digitised the manual checklist: SAMCS lets frontline supervisors monitor day-to-day SBCC activity — interpersonal communication, courtyard meetings and group gatherings — carried out by Health Assistants and Family Welfare Assistants.",
    challenge: null,
    solution: null,
    highlights: ["Piloted and scaled by DGHS", "Offline-first", "Bangla interface"],
    technologies: ["Android"],
    images: [{ src: "/images/projects/samcs.webp", alt: "SAMCS supervisor checklist app screens", width: 578, height: 450 }],
    liveUrl: "https://bit.ly/3EveSOt",
    featured: true,
    theme: "teal",
    duration: "9 years",
    featuresTitle: "What we built",
    features: [
      {
        "title": "Digitised supervisor checklist",
        "description": "With scoring."
      },
      {
        "title": "Worker-wise activity tracking",
        "description": "And progress views."
      },
      {
        "title": "Online and offline modes",
        "description": "Offline build shipped on SD card."
      },
      {
        "title": "Bangla-language interface",
        "description": "For field staff."
      },
      {
        "title": "Sync and consolidation",
        "description": "Once connectivity returns."
      },
      {
        "title": "SLA-backed maintenance",
        "description": "Of the app and admin panel."
      }
    ],
    technicalTitle: null,
    technical: [],
    stats: [],
    impactTitle: null,
    impact: null,
    deliveryTags: [
      "Web application",
      "API and add-ins",
      "Mobile & tablet apps",
      "Offline-first",
      "Software maintenance"
    ],
    relatedSolutions: ["mobile-apps"],
  },
  {
    slug: "kmix-erp",
    name: "KMIX ERP — Asphalt & Ready-Mix Operations",
    categories: ["ERP", "Manufacturing", "Web Application"],
    industry: "Manufacturing & Distribution",
    platform: ["Web"],
    client: "Karim Asphalt & Ready Mix Ltd. (Karim Group)",
    summary: "End-to-end ERP for an asphalt and ready-mix producer — part of a 10-year partnership with Karim Group.",
    overview:
      "A full ERP platform for an asphalt and ready-mix concrete producer, covering the commercial and production cycle: sales orders and delivery challans at the plant, material and purchase requisitions with budget checks, multi-level approvals, store ledgers with stock valuation, and project-wise consumption and costing. Part of a wider Karim Group programme covering attendance, HR and payroll, property, dredger and supply-chain management across 18+ business units.",
    challenge: null,
    solution: null,
    highlights: ["10 years of partnership", "Multi-plant", "Inventory & costing", "HR & payroll"],
    technologies: [],
    images: [{ src: "/images/projects/kmix-erp.webp", alt: "KMIX ERP screens and a printed delivery challan", width: 600, height: 717 }],
    liveUrl: null,
    featured: true,
    theme: "slate",
    duration: "10 years",
    featuresTitle: "What we built",
    features: [
      {
        "title": "Sales",
        "description": "Sales orders, delivery challans and customer records."
      },
      {
        "title": "Requisition & purchasing",
        "description": "Material requisition, purchase order and approval workflow."
      },
      {
        "title": "Budget control",
        "description": "Budget control with rate, quantity and value validation."
      },
      {
        "title": "Store ledger",
        "description": "Store ledger with opening balance, MRR receive, return and adjustment."
      },
      {
        "title": "Fuel & diesel",
        "description": "Fuel and diesel stock accounting by depot."
      },
      {
        "title": "Fleet & trips",
        "description": "Project, vehicle, driver and trip records with printable documents."
      }
    ],
    technicalTitle: null,
    technical: [],
    stats: [],
    impactTitle: null,
    impact: null,
    deliveryTags: [
      "Enterprise ERP",
      "Web application",
      "Inventory & costing",
      "HR & payroll",
      "Multi-plant"
    ],
    relatedSolutions: ["custom-software", "business-process-automation"],
  },
  {
    slug: "bazarnao",
    name: "BazarNao — Ecommerce 360",
    categories: ["E-commerce", "Web Application", "Mobile App"],
    industry: "Retail & E-commerce",
    platform: ["Web", "Mobile"],
    client: "BazarNao",
    summary: "A bilingual online grocery and retail marketplace with Android and iOS apps and accounting software.",
    overview:
      "A complete online commerce platform for grocery and retail: a bilingual storefront with deep category navigation, campaign and discount management, cart, wishlist and checkout, order and delivery management and customer accounts — backed by native Android and iOS apps on the same commerce core, plus accounting software for the business behind it.",
    challenge: null,
    solution: null,
    highlights: ["4 years", "Web, Android and iOS", "Payment gateway integration"],
    technologies: [],
    images: [{ src: "/images/projects/bazarnao.webp", alt: "BazarNao online grocery storefront", width: 941, height: 524 }],
    liveUrl: "https://bazarnao.com/",
    featured: true,
    theme: "amber",
    duration: "4 years",
    featuresTitle: "What we built",
    features: [
      {
        "title": "Bilingual storefront",
        "description": "English / Bangla storefront."
      },
      {
        "title": "Catalogue & inventory",
        "description": "Catalogue, category and inventory management."
      },
      {
        "title": "Campaigns",
        "description": "Offers, discounts and cashback campaigns."
      },
      {
        "title": "Checkout",
        "description": "Cart, wishlist, checkout and payment integration."
      },
      {
        "title": "Orders & delivery",
        "description": "Order management, delivery tracking and returns."
      },
      {
        "title": "Mobile apps",
        "description": "Android and iOS applications on a shared backend."
      }
    ],
    technicalTitle: null,
    technical: [],
    stats: [],
    impactTitle: null,
    impact: null,
    deliveryTags: [
      "Web application",
      "Android application",
      "iOS application",
      "Payment gateway",
      "Accounting software"
    ],
    relatedSolutions: ["ecommerce", "web-applications"],
  },
  {
    slug: "smart-hostel-management",
    name: "Smart Hostel Management Platform",
    categories: ["SaaS", "Product", "Web Application"],
    industry: "Education",
    platform: ["Web"],
    client: "Super Hostel",
    summary: "A SaaS-ready platform for hostels and campuses — admission, billing, meals and maintenance with AI-assisted forecasting.",
    overview:
      "A SaaS-ready platform for hostels, campuses and institutional accommodation — from admission through billing, meals and maintenance, with AI-assisted forecasting and a multi-tenant super-admin layer. Deployed with Super Hostel including HRM, inventory and supply chain.",
    challenge: null,
    solution: null,
    highlights: ["Multi-tenant SaaS", "Occupancy prediction", "3 years with Super Hostel"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: false,
    theme: "indigo",
    duration: "3 years",
    featuresTitle: "Platform",
    features: [
      {
        "title": "Dashboard & KPIs",
        "description": "Multi-hostel setup with real-time occupancy views · Revenue, dues and utilisation at a glance · Configurable alerts for management."
      },
      {
        "title": "Resident lifecycle",
        "description": "Online admission and document collection · Room and bed allocation with transfers · Visitor management and gate pass control."
      },
      {
        "title": "Operations",
        "description": "Billing, invoicing and payment reconciliation · Smart attendance and meal management · Complaints, maintenance and asset tracking."
      }
    ],
    technicalTitle: "Intelligence built in",
    technical: [
      {
        "title": "Occupancy prediction",
        "description": "Forecast demand by block, season and intake cycle."
      },
      {
        "title": "Automated reporting",
        "description": "Scheduled management reports without manual compilation."
      },
      {
        "title": "Complaint classification",
        "description": "Incoming issues routed automatically to the right team."
      },
      {
        "title": "SaaS super-admin",
        "description": "Multi-tenant control for operators running several sites."
      }
    ],
    stats: [],
    impactTitle: "Who it is for",
    impact: "University and college hostels · private operators running several sites · hospitals, training centres and corporate housing with rotating occupancy.",
    deliveryTags: [],
    relatedSolutions: ["ai", "web-applications"],
  },
  {
    slug: "dgfp-digital-archive",
    name: "DGFP Digital Archive",
    categories: ["Government", "Web Application"],
    industry: "Public Sector",
    platform: ["Web"],
    client: "Directorate General of Family Planning",
    summary: "A secure digital archive for storing and managing family planning records.",
    overview: "A secure digital archive for storing and managing family planning records for the Directorate General of Family Planning.",
    challenge: null,
    solution: null,
    highlights: ["Government directorate", "Digital records management", "2 years"],
    technologies: [],
    images: [],
    liveUrl: "https://archive.dgfp.gov.bd",
    featured: false,
    theme: "slate",
    duration: "2 years",
    featuresTitle: null,
    features: [],
    technicalTitle: null,
    technical: [],
    stats: [],
    impactTitle: null,
    impact: null,
    deliveryTags: [],
    relatedSolutions: ["custom-software"],
  },
  {
    slug: "dghs-etoolkits",
    name: "eToolkits — DGHS",
    categories: ["Government", "Healthcare", "Web Application"],
    industry: "Public Sector",
    platform: ["Web"],
    client: "Directorate General of Health Services",
    summary: "A digital library of health, population and nutrition resources.",
    overview: "A comprehensive digital library of health, population and nutrition resources for the Directorate General of Health Services.",
    challenge: null,
    solution: null,
    highlights: ["Government directorate", "4 years"],
    technologies: [],
    images: [],
    liveUrl: "https://etoolkits.dghs.gov.bd",
    featured: false,
    theme: "teal",
    duration: "4 years",
    featuresTitle: null,
    features: [],
    technicalTitle: null,
    technical: [],
    stats: [],
    impactTitle: null,
    impact: null,
    deliveryTags: [],
    relatedSolutions: ["web-applications"],
  },
  {
    slug: "niter-student-management",
    name: "NITER Student Management System",
    categories: ["Education", "Web Application"],
    industry: "Education",
    platform: ["Web"],
    client: "National Institute of Textile Engineering and Research",
    summary: "HRM, accounts, payroll, attendance, teacher panel, online exams and eLearning for one institute.",
    overview:
      "A student management system for the National Institute of Textile Engineering and Research, covering HRM, accounts, payroll, attendance, a teacher panel, online exams and eLearning management.",
    challenge: null,
    solution: null,
    highlights: ["5 years", "Online exams & eLearning"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: false,
    theme: "indigo",
    duration: "5 years",
    featuresTitle: null,
    features: [],
    technicalTitle: null,
    technical: [],
    stats: [],
    impactTitle: null,
    impact: null,
    deliveryTags: [],
    relatedSolutions: ["web-applications"],
  },
  {
    slug: "cpd-erp",
    name: "CPD ERP",
    categories: ["ERP", "Web Application"],
    industry: "NGOs & Development",
    platform: ["Web"],
    client: "Centre for Policy Dialogue",
    summary: "HRM, finance, procurement, project and grant management, training and asset modules for a policy think-tank.",
    overview:
      "ERP software for the Centre for Policy Dialogue covering HRM, finance and accounting, procurement and supply chain, project and grant management, training and asset modules.",
    challenge: null,
    solution: null,
    highlights: ["Running", "Project & grant management"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: false,
    theme: "blue",
    duration: "Running",
    featuresTitle: null,
    features: [],
    technicalTitle: null,
    technical: [],
    stats: [],
    impactTitle: null,
    impact: null,
    deliveryTags: [],
    relatedSolutions: ["custom-software"],
  },
  {
    slug: "dgda-model-pharmacy",
    name: "Model Pharmacy Management — DGDA",
    categories: ["Healthcare", "Government", "Web Application"],
    industry: "Healthcare",
    platform: ["Web"],
    client: "Directorate General of Drug Administration (with MSH)",
    summary: "Pharmacy management software developed for the Directorate General of Drug Administration.",
    overview: "Pharmacy management software developed for the Directorate General of Drug Administration, delivered with Management Sciences for Health.",
    challenge: null,
    solution: null,
    highlights: ["Government directorate", "With MSH"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: false,
    theme: "rose",
    duration: null,
    featuresTitle: null,
    features: [],
    technicalTitle: null,
    technical: [],
    stats: [],
    impactTitle: null,
    impact: null,
    deliveryTags: [],
    relatedSolutions: ["custom-software"],
  },
  {
    slug: "youth-organization-bangladesh",
    name: "Youth Organization Bangladesh",
    categories: ["Government", "Web Application"],
    industry: "Public Sector",
    platform: ["Web"],
    client: "Youth Organization Bangladesh",
    summary: "A centralised database for youth organisations across Bangladesh.",
    overview: "A centralised database for youth organisations across Bangladesh.",
    challenge: null,
    solution: null,
    highlights: ["Nationwide database"],
    technologies: [],
    images: [],
    liveUrl: "https://youthorganizationbd.org",
    featured: false,
    theme: "amber",
    duration: "1 year",
    featuresTitle: null,
    features: [],
    technicalTitle: null,
    technical: [],
    stats: [],
    impactTitle: null,
    impact: null,
    deliveryTags: [],
    relatedSolutions: ["web-applications"],
  },
  {
    slug: "dsk-e-loan",
    name: "DSK e-Loan",
    categories: ["Finance", "Web Application"],
    industry: "Financial Services",
    platform: ["Web"],
    client: "DSK",
    summary: "A digital loan management platform for processing loans electronically.",
    overview: "DSK e-Loan is a loan management system delivered by 4axiz to digitise loan processing.",
    challenge: null,
    solution: null,
    highlights: ["Loan process digitisation", "Financial services"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: false,
    theme: "teal",
    duration: null,
    featuresTitle: null,
    features: [],
    technicalTitle: null,
    technical: [],
    stats: [],
    impactTitle: null,
    impact: null,
    deliveryTags: [],
    relatedSolutions: ["custom-software", "business-process-automation"],
  },
  {
    slug: "unikart",
    name: "Unikart",
    categories: ["E-commerce", "Web Application"],
    industry: "Retail & E-commerce",
    platform: ["Web"],
    client: "Unikart",
    summary: "An e-commerce marketplace website for online product sales.",
    overview: "Unikart is an online commerce platform delivered by 4axiz, complemented by the Unikart mobile app.",
    challenge: null,
    solution: null,
    highlights: ["E-commerce website", "Companion mobile app"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: false,
    theme: "rose",
    duration: null,
    featuresTitle: null,
    features: [],
    technicalTitle: null,
    technical: [],
    stats: [],
    impactTitle: null,
    impact: null,
    deliveryTags: [],
    relatedSolutions: ["ecommerce", "web-applications"],
  },
  {
    slug: "unikart-app",
    name: "Unikart App",
    categories: ["E-commerce", "Mobile App"],
    industry: "Retail & E-commerce",
    platform: ["Mobile"],
    client: "Unikart",
    summary: "The mobile shopping app companion to the Unikart platform.",
    overview: "Unikart App brings the Unikart shopping experience to mobile devices, delivered by 4axiz alongside the Unikart website.",
    challenge: null,
    solution: null,
    highlights: ["Mobile shopping app", "Companion to Unikart web"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: false,
    theme: "rose",
    duration: null,
    featuresTitle: null,
    features: [],
    technicalTitle: null,
    technical: [],
    stats: [],
    impactTitle: null,
    impact: null,
    deliveryTags: [],
    relatedSolutions: ["mobile-apps", "ecommerce"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const projectCategories = Array.from(new Set(projects.flatMap((p) => p.categories))).sort();
