import type { NavItem, NavLink } from "@/types";
import { publishedErpModules } from "./erp-modules";
import { products } from "./products";
import { services } from "./services";

export const solutionLinks: NavLink[] = [
  { label: "ERP Solutions", href: "/solutions/erp", description: "Connected modules for finance, people and operations", icon: "boxes" },
  { label: "AI Solutions", href: "/solutions/ai", description: "Assistants, document AI and automation", icon: "brain" },
  { label: "Custom Software", href: "/solutions/custom-software", description: "Systems built around your process", icon: "code" },
  { label: "Web Applications", href: "/solutions/web-applications", description: "Platforms, portals and dashboards", icon: "globe" },
  { label: "Mobile Apps", href: "/solutions/mobile-apps", description: "Android, iOS and cross-platform", icon: "smartphone" },
  { label: "E-commerce", href: "/solutions/ecommerce", description: "Stores, marketplaces and shopping apps", icon: "shopping-cart" },
];

export const companyLinks: NavLink[] = [
  { label: "About Us", href: "/about", description: "Our story, mission and values", icon: "layers" },
  { label: "Our Team", href: "/team", description: "The people behind 4axiz", icon: "users" },
  { label: "Blog", href: "/blog", description: "News and insights", icon: "file-text" },
  { label: "Careers", href: "/careers", description: "Build with us", icon: "rocket" },
  { label: "Contact Us", href: "/contact", description: "Offices and project inquiries", icon: "message-square" },
];

export const serviceLinks: NavLink[] = services.map((s) => ({
  label: s.shortTitle,
  href: `/services/${s.slug}`,
  description: s.summary,
  icon: s.icon,
}));

export const productLinks: NavLink[] = products
  .filter((p) => p.kind !== "erp-module")
  .map((p) => ({ label: p.name, href: `/products/${p.slug}`, description: p.tagline, icon: p.icon }));

export const erpNavLinks: NavLink[] = publishedErpModules.map((m) => ({
  label: m.shortTitle,
  href: `/solutions/erp/${m.slug}`,
  icon: m.icon,
}));

export type MenuKind = "solutions" | "services" | "products" | "company";

export const mainNav: (NavItem & { menu?: MenuKind })[] = [
  { label: "Solutions", href: "/solutions", children: solutionLinks, menu: "solutions" },
  { label: "Products", href: "/products", children: productLinks, menu: "products" },
  { label: "Services", href: "/services", children: serviceLinks, menu: "services" },
  { label: "Projects", href: "/projects" },
  { label: "Industries", href: "/industries" },
  { label: "Company", href: "/about", children: companyLinks, menu: "company" },
];
