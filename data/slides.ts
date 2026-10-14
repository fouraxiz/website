/** Initial homepage slides (seeded into the database; edit them on the site afterwards). */
export interface Slide {
  eyebrow: string;
  title: string;
  highlight: string | null;
  text: string | null;
  primaryLabel: string | null;
  primaryHref: string | null;
  secondaryLabel: string | null;
  secondaryHref: string | null;
  visual: "erp" | "ai" | "apps" | "image";
  image: string | null;
}

export const slides: Slide[] = [
  {
    eyebrow: "4axiz ERP",
    title: "Run your entire business on",
    highlight: "one connected platform",
    text: "Accounting, HRM & payroll, procurement, inventory, POS and reporting — modular ERP configured to the way your organisation works.",
    primaryLabel: "Explore ERP",
    primaryHref: "/solutions/erp",
    secondaryLabel: "Book a demo",
    secondaryHref: "/contact?interest=erp",
    visual: "erp",
    image: null,
  },
  {
    eyebrow: "AI & Automation",
    title: "Put practical AI",
    highlight: "to work in your business",
    text: "AI assistants, intelligent document processing and predictive insight — integrated securely into the systems your teams already use.",
    primaryLabel: "Explore AI solutions",
    primaryHref: "/solutions/ai",
    secondaryLabel: "Talk to an expert",
    secondaryHref: "/contact?interest=ai",
    visual: "ai",
    image: null,
  },
  {
    eyebrow: "Web & Mobile Development",
    title: "Top-notch software,",
    highlight: "built with modern technology",
    text: "Custom web applications, mobile apps and e-commerce platforms — designed, built and supported by one experienced team since 2010.",
    primaryLabel: "Our services",
    primaryHref: "/services",
    secondaryLabel: "View projects",
    secondaryHref: "/projects",
    visual: "apps",
    image: null,
  },
];
