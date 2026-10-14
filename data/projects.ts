import type { Project } from "@/types";

/**
 * Portfolio projects. Names come from the existing 4axiz portfolio.
 *
 * Descriptions are intentionally limited to what each project is. Client
 * names, challenges, outcomes, technology stacks and screenshots are `null`
 * or empty until 4axiz supplies approved case-study material — the detail
 * template shows a clear "case study in preparation" state for those fields.
 *
 * To add screenshots: place files in /public/images/projects/<slug>/ and add
 * them to `images` (first image is used as the card cover).
 */
export const projects: Project[] = [
  {
    slug: "school-management",
    name: "4axiz School Management",
    categories: ["Education", "Web Application", "Product"],
    industry: "Education",
    platform: ["Web"],
    client: null,
    summary: "A school management system for running academic administration from a single platform.",
    overview:
      "4axiz School Management is a 4axiz software product for educational institutions, bringing day-to-day academic and administrative work into one system.",
    challenge: null,
    solution: null,
    highlights: ["4axiz product", "Web-based administration", "Education sector"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: true,
    theme: "indigo",
    relatedSolutions: ["custom-software", "web-applications"],
  },
  {
    slug: "pos",
    name: "4axiz POS",
    categories: ["Retail", "Product", "ERP"],
    industry: "Retail & E-commerce",
    platform: ["Web"],
    client: null,
    summary: "A point-of-sale system for counter sales, stock and outlet operations.",
    overview:
      "4axiz POS is a 4axiz point-of-sale product for retail counters and outlets, and also forms the POS module within the 4axiz ERP ecosystem.",
    challenge: null,
    solution: null,
    highlights: ["4axiz product", "Counter sales", "Connects to ERP inventory and accounts"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: true,
    theme: "blue",
    relatedSolutions: ["ecommerce", "custom-software"],
  },
  {
    slug: "dgfp-digital-archive",
    name: "DGFP Digital Archive",
    categories: ["Government", "Web Application", "Custom Software"],
    industry: "Public Sector",
    platform: ["Web"],
    client: null,
    summary: "A digital archive platform for storing, organising and retrieving records.",
    overview:
      "DGFP Digital Archive is a custom digital archiving system delivered by 4axiz for organising and retrieving records electronically.",
    challenge: null,
    solution: null,
    highlights: ["Custom-built system", "Digital records management", "Public sector"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: true,
    theme: "slate",
    relatedSolutions: ["custom-software", "business-process-automation"],
  },
  {
    slug: "dsk-e-loan",
    name: "DSK e-Loan",
    categories: ["Finance", "Web Application", "Custom Software"],
    industry: "Financial Services",
    platform: ["Web"],
    client: null,
    summary: "A digital loan management platform for handling loan processes electronically.",
    overview:
      "DSK e-Loan is a custom loan management system delivered by 4axiz to digitise loan-related processes.",
    challenge: null,
    solution: null,
    highlights: ["Custom-built system", "Loan process digitisation", "Financial services"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: true,
    theme: "teal",
    relatedSolutions: ["custom-software", "business-process-automation"],
  },
  {
    slug: "bazarnao",
    name: "Bazarnao",
    categories: ["E-commerce", "Web Application"],
    industry: "Retail & E-commerce",
    platform: ["Web"],
    client: null,
    summary: "An online shopping platform for browsing products and placing orders.",
    overview: "Bazarnao is an e-commerce platform delivered by 4axiz for online shopping and order management.",
    challenge: null,
    solution: null,
    highlights: ["E-commerce platform", "Online ordering", "Retail"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: true,
    theme: "amber",
    relatedSolutions: ["ecommerce", "web-applications"],
  },
  {
    slug: "unikart",
    name: "Unikart",
    categories: ["E-commerce", "Web Application"],
    industry: "Retail & E-commerce",
    platform: ["Web"],
    client: null,
    summary: "An e-commerce marketplace website for online product sales.",
    overview: "Unikart is an online commerce platform delivered by 4axiz, complemented by the Unikart mobile app.",
    challenge: null,
    solution: null,
    highlights: ["E-commerce website", "Companion mobile app", "Retail"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: true,
    theme: "rose",
    relatedSolutions: ["ecommerce", "web-applications"],
  },
  {
    slug: "unikart-app",
    name: "Unikart App",
    categories: ["E-commerce", "Mobile App"],
    industry: "Retail & E-commerce",
    platform: ["Mobile"],
    client: null,
    summary: "The mobile shopping app companion to the Unikart platform.",
    overview: "Unikart App brings the Unikart shopping experience to mobile devices, delivered by 4axiz alongside the Unikart website.",
    challenge: null,
    solution: null,
    highlights: ["Mobile shopping app", "Companion to Unikart web", "Retail"],
    technologies: [],
    images: [],
    liveUrl: null,
    featured: false,
    theme: "rose",
    relatedSolutions: ["mobile-apps", "ecommerce"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const projectCategories = Array.from(new Set(projects.flatMap((p) => p.categories))).sort();
