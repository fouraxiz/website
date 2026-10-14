import type { NavItem, NavLink } from "@/types";
import { publishedErpModules } from "./erp-modules";

export const solutionLinks: NavLink[] = [
  { label: "ERP Solutions", href: "/solutions/erp", description: "Connected modules for finance, people and operations", icon: "boxes" },
  { label: "AI Solutions", href: "/solutions/ai", description: "Assistants, document AI and automation", icon: "brain" },
  { label: "Custom Software", href: "/solutions/custom-software", description: "Systems built around your process", icon: "code" },
  { label: "Web Applications", href: "/solutions/web-applications", description: "Platforms, portals and dashboards", icon: "globe" },
  { label: "Mobile Apps", href: "/solutions/mobile-apps", description: "Android, iOS and cross-platform", icon: "smartphone" },
];

export const companyLinks: NavLink[] = [
  { label: "About Us", href: "/about", description: "Our story, mission and values", icon: "layers" },
  { label: "Our Team", href: "/team", description: "The people behind 4axiz", icon: "users" },
  { label: "Careers", href: "/careers", description: "Build with us", icon: "rocket" },
  { label: "Contact Us", href: "/contact", description: "Offices and project inquiries", icon: "message-square" },
];

export const erpNavLinks: NavLink[] = publishedErpModules.slice(0, 8).map((m) => ({
  label: m.shortTitle,
  href: `/solutions/erp/${m.slug}`,
  icon: m.icon,
}));

export const mainNav: NavItem[] = [
  { label: "Solutions", href: "/solutions", children: solutionLinks },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Industries", href: "/industries" },
  { label: "Company", href: "/about", children: companyLinks },
];
