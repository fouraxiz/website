import type { TeamMember } from "@/types";

/**
 * Key personnel from the Company Profile 2026. Add portraits by uploading a
 * photo in edit mode (or place files in /public/images/team/).
 */
export const team: TeamMember[] = [
  {
    id: "apurba-kumar-datta",
    name: "Apurba Kumar Datta",
    role: "Team Lead \u2014 MEAL & MIS",
    department: "Project Delivery",
    leadership: true,
    bio: "Nearly 20 years leading the design and institutionalisation of integrated MEAL and MIS solutions for large donor-funded programmes. Expert in requirements validation, workflow mapping, indicator management, dashboards, DQA and UAT.",
    photo: null,
    linkedin: null,
  },
  {
    id: "ebnesayeed-md-imtiaz-pmp",
    name: "EbneSayeed Md. Imtiaz, PMP",
    role: "Project Manager \u2014 Global Delivery",
    department: "Project Delivery",
    leadership: true,
    bio: "Certified project management professional with senior technical advisory experience at Management Sciences for Health and system development leadership at Palli Daridro Bimochon Foundation. Leads global delivery and governance.",
    photo: null,
    linkedin: null,
  },
  {
    id: "md-shofiqul-islam",
    name: "Md. Shofiqul Islam",
    role: "Software Architect",
    department: "Engineering",
    leadership: true,
    bio: "Architecture and platform design across ERP, POS, CRM and enterprise systems, including desktop and cross-platform application delivery.",
    photo: null,
    linkedin: null,
  },
  {
    id: "samsul-arefin-islam",
    name: "Samsul Arefin Islam",
    role: "Senior Software Engineer",
    department: "Engineering",
    leadership: false,
    bio: "Java and Spring Boot system development, microservices migration, Kafka and AWS SQS integration, MongoDB implementation and legacy system modernisation.",
    photo: null,
    linkedin: null,
  },
  {
    id: "anis-ahammed",
    name: "Anis Ahammed",
    role: "Senior Software Engineer",
    department: "Engineering",
    leadership: false,
    bio: "Enterprise application development with a focus on payroll, HR and transactional business systems.",
    photo: null,
    linkedin: null,
  },
  {
    id: "md-kamrul-hasan",
    name: "Md. Kamrul Hasan",
    role: "Senior Software Engineer",
    department: "Engineering",
    leadership: false,
    bio: "Architected and developed educational institute management software used by 60+ institutions; Laravel platform and system architecture.",
    photo: null,
    linkedin: null,
  },
  {
    id: "mst-nazma",
    name: "Mst. Nazma",
    role: "Senior UI/UX Designer",
    department: "Design",
    leadership: false,
    bio: "Responsive, accessible and user-centric design for web and mobile \u2014 dashboards and interfaces for ERP, HR & payroll, POS and management systems.",
    photo: null,
    linkedin: null,
  },
  {
    id: "tanem-rahman",
    name: "Tanem Rahman",
    role: "DevOps Engineer",
    department: "Engineering",
    leadership: false,
    bio: "Cloud infrastructure, CI/CD and production operations; led development teams across ERP, HR & payroll, POS, e-commerce and school management systems.",
    photo: null,
    linkedin: null,
  },
  {
    id: "prince-md-waziuddin-shoumik",
    name: "Prince Md. Waziuddin Shoumik",
    role: "Software Engineer",
    department: "Engineering",
    leadership: false,
    bio: "Secure, efficient API development; vehicle, route and driver modules (HI-FLEET) and the SECU safety and security incident reporting app.",
    photo: null,
    linkedin: null,
  },
];

/** Team composition — Company Profile 2026. */
export const teamComposition = [
  {
    title: "Skills composition of our engineers",
    items: [
      { value: 62, label: "Back-end developers" },
      { value: 25, label: "Front-end developers" },
      { value: 13, label: "Full-stack / DevOps" },
    ],
  },
  {
    title: "Mobile technologies",
    items: [
      { value: 50, label: "Native — Android & iOS" },
      { value: 50, label: "Cross-platform frameworks" },
    ],
  },
  {
    title: "Experience level",
    items: [
      { value: 48, label: "Mid level" },
      { value: 39, label: "Senior" },
      { value: 13, label: "Entry level" },
    ],
  },
];

/** Department groupings shown on /team, in display order. */
export const departments = [
  { name: "Leadership", description: "The core team typically proposed for institutional MIS, MEAL and ERP engagements. Full CVs are provided with every technical proposal." },
  { name: "Engineering", description: "System architects, software engineers, mobile developers, database specialists and DevOps engineers." },
  { name: "Design", description: "UI/UX designers creating intuitive, accessible interfaces for non-technical users." },
  { name: "Quality Assurance", description: "Tests every release and guards product quality." },
  { name: "Project Delivery", description: "Business analysts and project managers: requirements, delivery, governance and client communication." },
  { name: "Support", description: "Helps clients get the most from their systems after launch." },
];

export const leadership = team.filter((m) => m.leadership);
