import Link from "next/link";
import { MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { SocialIcons } from "./SocialIcons";
import { offices, site, socialLinks } from "@/data/site";
import { solutionLinks } from "@/data/navigation";
import { products } from "@/data/products";
import { services } from "@/data/services";

const columns = [
  { title: "Solutions", links: solutionLinks.map((l) => ({ label: l.label, href: l.href })) },
  {
    title: "Products",
    links: [
      ...products.filter((p) => p.kind !== "erp-module").map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
      { label: "All products", href: "/products" },
    ],
  },
  {
    title: "Services",
    links: [
      ...services.slice(0, 6).map((s) => ({ label: s.shortTitle, href: `/services/${s.slug}` })),
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Projects", href: "/projects" },
      { label: "Industries", href: "/industries" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink-950 text-ink-400" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container-site pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_2fr]">
          <div className="max-w-sm">
            <Logo inverse />
            <p className="mt-5 text-sm leading-relaxed">
              {site.legalName} builds enterprise software, ERP platforms, AI-driven automation and custom digital products for organisations
              across markets.
            </p>
            <div className="mt-6">
              <SocialIcons links={socialLinks} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-display text-sm font-semibold text-white">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-sm font-semibold text-white">Our offices</h3>
            <Link href="/contact#offices" className="text-sm text-brand-300 hover:text-white">
              Office details
            </Link>
          </div>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {offices.map((o) => (
              <li key={o.id} className="flex gap-3 rounded-lg border border-white/10 p-4">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden="true" />
                <div className="text-sm">
                  <p className="font-semibold text-white">{o.country}</p>
                  <p className="mt-1">{o.address ?? o.city ?? <span className="italic opacity-70">Address to be confirmed</span>}</p>
                  {o.phone && (
                    <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="mt-1 block hover:text-white">
                      {o.phone}
                    </a>
                  )}
                  {o.email && (
                    <a href={`mailto:${o.email}`} className="mt-1 block hover:text-white">
                      {o.email}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="hover:text-white" prefetch={false}>
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
