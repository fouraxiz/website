/**
 * Client and partner logos, taken from the 4axiz Company Profile 2026
 * ("Trusted across sectors" and "Clients & partners"). Files live in
 * /public/images/clients/. Editors can add, remove or reorder logos on the site.
 */
export interface ClientLogo {
  name: string;
  logo: { src: string; width: number; height: number };
  url?: string;
}

export const clients: ClientLogo[] = [
  { name: "UNDP", logo: { src: "/images/clients/undp.webp", width: 288, height: 142 } },
  { name: "Management Sciences for Health", logo: { src: "/images/clients/management-sciences-for-health.webp", width: 360, height: 149 } },
  { name: "Pathfinder", logo: { src: "/images/clients/pathfinder.webp", width: 360, height: 48 } },
  { name: "Toyota", logo: { src: "/images/clients/toyota.webp", width: 196, height: 160 } },
  { name: "DGFP", logo: { src: "/images/clients/dgfp.webp", width: 262, height: 160 } },
  { name: "Ministry of Health & Family Welfare", logo: { src: "/images/clients/ministry-of-health-family-welfare.webp", width: 253, height: 145 } },
  { name: "National Tuberculosis Control Programme", logo: { src: "/images/clients/national-tuberculosis-control-programme.webp", width: 160, height: 160 } },
  { name: "Bureau of Health Education", logo: { src: "/images/clients/bureau-of-health-education.webp", width: 110, height: 160 } },
  { name: "CPTU e-GP", logo: { src: "/images/clients/cptu-e-gp.webp", width: 190, height: 82 } },
  { name: "Dhaka Medical College", logo: { src: "/images/clients/dhaka-medical-college.webp", width: 150, height: 150 } },
  { name: "BCCP", logo: { src: "/images/clients/bccp.webp", width: 211, height: 122 } },
  { name: "DSK", logo: { src: "/images/clients/dsk.webp", width: 360, height: 87 } },
  { name: "Hospice Bangladesh", logo: { src: "/images/clients/hospice-bangladesh.webp", width: 123, height: 83 } },
  { name: "Karim Group", logo: { src: "/images/clients/karim-group.webp", width: 179, height: 160 } },
  { name: "ACI Godrej", logo: { src: "/images/clients/aci-godrej.webp", width: 349, height: 109 } },
  { name: "BazarNao", logo: { src: "/images/clients/bazarnao.webp", width: 360, height: 98 }, url: "https://bazarnao.com" },
  { name: "Unikart", logo: { src: "/images/clients/unikart.webp", width: 299, height: 91 } },
  { name: "University of Northern Iowa", logo: { src: "/images/clients/university-of-northern-iowa.webp", width: 138, height: 64 } },
  { name: "BICM", logo: { src: "/images/clients/bicm.webp", width: 331, height: 158 } },
  { name: "Great Eastern", logo: { src: "/images/clients/great-eastern.webp", width: 360, height: 106 } },
  { name: "Riant Group", logo: { src: "/images/clients/riant-group.webp", width: 133, height: 49 } },
  { name: "Maisha Construction", logo: { src: "/images/clients/maisha-construction.webp", width: 360, height: 57 } },
  { name: "Max Management", logo: { src: "/images/clients/max-management.webp", width: 113, height: 45 } },
  { name: "Dozweb", logo: { src: "/images/clients/dozweb.webp", width: 360, height: 139 } },
  { name: "Peerbits", logo: { src: "/images/clients/peerbits.webp", width: 360, height: 86 } },
  { name: "Byteshake Design", logo: { src: "/images/clients/byteshake-design.webp", width: 119, height: 58 } },
  { name: "JuniorAid", logo: { src: "/images/clients/junioraid.webp", width: 130, height: 53 } },
  { name: "Nabil Foundation", logo: { src: "/images/clients/nabil-foundation.webp", width: 126, height: 79 } },
  { name: "Jessore City Cable", logo: { src: "/images/clients/jessore-city-cable.webp", width: 136, height: 79 } },
  { name: "Cedar Valley Food Runner", logo: { src: "/images/clients/cedar-valley-food-runner.webp", width: 137, height: 84 } },
  { name: "Anytime Office", logo: { src: "/images/clients/anytime-office.webp", width: 85, height: 92 } },
];

/** "Client engagement record" — Company Profile 2026 (work orders and completion certificates available on request). */
export const engagements: { client: string; scope: string; years: string; href: string | null }[] = [
  { client: "UNDP", scope: "Livelihoods Improvement of Urban Poor Communities (LIUPC) \u2014 customised MIS software for urban poor communities on AWS; NUPRP survey and monitoring platform.", years: "5 years", href: "/projects/undp-nuprp-mis" },
  { client: "Management Sciences for Health (MSH)", scope: "MDR TB DOT Monitoring System (desktop & mobile) for NTP, USAID-funded; Model Pharmacy Management for DGDA; digital archives for NTP; leave & timesheet module (MTaPS & BHB); digital marketing.", years: "7 years", href: "/projects/mdr-tb-dot-monitoring" },
  { client: "Handicap International", scope: "Lot 1 Mutualization core model & technical architecture; Lot 2 ART audit & recommendations tracker; Lot 3 HI-FLEET vehicles, routes & drivers; Lot 4 SECU safety & security incident reporting.", years: "8 months", href: "/projects/handicap-international-mis" },
  { client: "NGO Forum for Public Health (UNHCR)", scope: "Integrated ERP \u2014 HRM, finance & accounting, procurement & supply chain, project & grant management, production, inventory, payments and POS.", years: "9 months", href: "/projects/ngo-forum-integrated-erp" },
  { client: "BHE, IPHN & BCCP", scope: "SBCC activity monitoring app for supervisors (USAID Ujjiban); digital archives for MoHFW, IPHN, BHE, IEM Unit and CPTU; SLDW project software; BDBCC group website; Bureau of Health Education website.", years: "9 years", href: "/projects/sbcc-activity-monitoring" },
  { client: "Somvabona", scope: "Education & health software \u2014 web and mobile application. pickieforlife.com", years: "1 year", href: "/projects/somvabona" },
  { client: "Ujjiban / USAID", scope: "SAMCS app update and server transfer; digital archive of approved BCC materials for MoHFW; SLA renewal for SBCC monitoring app and admin panel; managing the IEM Unit digital archive.", years: "9 years", href: "/projects/government-digital-archives" },
  { client: "DGFP", scope: "Development of the DGFP Digital Archive \u2014 archive.dgfp.gov.bd", years: "2 years", href: "/projects/dgfp-digital-archive" },
  { client: "SMC Bangladesh", scope: "Digital document management system; customised web application tools for activity monitoring; task and learning management system.", years: "5 years", href: "/projects/smc-document-learning" },
  { client: "E-commerce & fintech clients", scope: "E-commerce software and related services; automated AI-based e-loan management system for loan processing.", years: "4 years", href: null },
  { client: "NITER", scope: "Student management system including HRM, accounts, payroll, attendance, teacher panel, online exam and eLearning management.", years: "5 years", href: "/projects/niter-student-management" },
  { client: "Centre for Policy Dialogue (CPD)", scope: "ERP software \u2014 HRM, finance & accounting, procurement & supply chain, project & grant management, training and asset modules.", years: "Running", href: "/projects/cpd-erp" },
  { client: "Nokia Bangladesh", scope: "Infrastructure support and development.", years: "6 years", href: "/projects/nokia-infrastructure" },
  { client: "SystemOne LLC", scope: "Aspect installation and implementation across 760+ upazila health complexes, with daily support and communication.", years: "5 years", href: "/projects/ntp-aspect-monitoring" },
  { client: "Karim Group", scope: "KMIX ERP; attendance, HR and payroll for head office, Alhaz Karim Textile, HYPOID and Jubaida Karim Jute Mills; Golden Line attendance & HRM; property management; dredger management; WCL supply chain management.", years: "10 years", href: "/projects/kmix-erp" },
  { client: "Sanofi Bangladesh & partners", scope: "MdoseAid Android application; ePIMS for Dhaka Medical College Hospital; digital diabetes mobile application; Shanti Oncology web application and website; networking and server administration for DMC; Rx automation system.", years: "10 years", href: "/projects/mdoseaid" },
  { client: "Super Hostel", scope: "Hostel management system including HRM, inventory and supply chain.", years: "3 years", href: "/projects/smart-hostel-management" },
  { client: "DGHS \u2014 eToolkits", scope: "Comprehensive digital library for health, population and nutrition resources \u2014 etoolkits.dghs.gov.bd", years: "4 years", href: "/projects/dghs-etoolkits" },
  { client: "Youth Organization Bangladesh", scope: "Centralised database for youth organisations across Bangladesh \u2014 youthorganizationbd.org", years: "1 year", href: "/projects/youth-organization-bangladesh" },
  { client: "WAVE Foundation", scope: "YCAP mobile and web applications; accounting and HRM solution piloting for projects.", years: "5 years", href: "/projects/wave-ycap" },
  { client: "Toyota Bangladesh", scope: "Design and development of the Toyota website; 4axiz HRM software implementation.", years: "11 years", href: "/projects/toyota-website" },
  { client: "Light House", scope: "Sustainable agriculture practices; gender-based violence awareness and support; accessible user-friendly design; mobile apps and online portal development.", years: "1 year", href: "/projects/light-house-portal" },
  { client: "BazarNao", scope: "BazarNao e-commerce platform and accounting management software \u2014 bazarnao.com", years: "4 years", href: "/projects/bazarnao" },
  { client: "Uttara Model Club", scope: "ERP software for club management.", years: "3 years", href: "/projects/uttara-model-club-erp" },
  { client: "Hossain Construction (Pvt) Ltd", scope: "Development and implementation of an accounting ERP system.", years: "5 years", href: "/projects/hossain-construction-erp" },
  { client: "Green Peak Holdings Ltd", scope: "Development and implementation of an accounting ERP system.", years: "3 years", href: "/projects/green-peak-erp" },
  { client: "Serenity Builders Ltd", scope: "Accounting management software development.", years: "2 years", href: "/projects/serenity-accounting" },
  { client: "Rupali Health Ltd", scope: "E-healthcare service, development support and maintenance.", years: "4 years", href: "/projects/rupali-health" },
  { client: "Maisha Construction (Pvt) Ltd", scope: "Company website and software development \u2014 mcplbd.net", years: "3 years", href: "/projects/maisha-construction" },
  { client: "Let's Gravel", scope: "Mobile app development for Android and iOS.", years: "4 years", href: "/projects/lets-gravel" },
];

/** "Who we work with" — Company Profile 2026. */
export const clientGroups: { title: string; names: string }[] = [
  { title: "International NGOs & development partners", names: "UNDP \u00b7 UNFPA \u00b7 UNHCR \u00b7 Handicap International \u00b7 World Bank \u00b7 USAID \u00b7 Management Sciences for Health \u00b7 Pathfinder \u00b7 University of Northern Iowa" },
  { title: "Government", names: "MOHFW \u00b7 DGFP \u00b7 DGHS \u00b7 IPHN \u00b7 CPTU \u00b7 NTP \u00b7 BHE \u00b7 DGDA \u00b7 Department of Youth Development \u00b7 Teletalk Bangladesh Ltd." },
  { title: "Local NGOs", names: "NGO Forum for Public Health \u00b7 BCCP \u00b7 DSK \u00b7 WAVE Foundation \u00b7 Light House \u00b7 SKS Foundation \u00b7 Room to Read \u00b7 CODEC \u00b7 SMC \u00b7 RSC \u00b7 Hospice Bangladesh" },
  { title: "Corporate", names: "Toyota Bangladesh \u00b7 Nokia Bangladesh \u00b7 RANGS Group \u00b7 Karim Group (18+ business units) \u00b7 Sanofi Bangladesh \u00b7 ACI \u00b7 Godrej \u00b7 HCPL \u00b7 MCL \u00b7 UMC \u00b7 Rupali Health \u00b7 Serenity Builders \u00b7 Green Peak Holdings \u00b7 Maisha Construction \u00b7 Unikart \u00b7 BazarNao" },
];
