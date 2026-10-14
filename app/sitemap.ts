import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { solutions } from "@/data/solutions";
import { publishedErpModules } from "@/data/erp-modules";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { industries } from "@/data/industries";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: [string, number][] = [
    ["/", 1],
    ["/solutions", 0.9],
    ["/solutions/erp", 0.9],
    ["/products", 0.9],
    ["/services", 0.9],
    ["/projects", 0.8],
    ["/industries", 0.7],
    ["/about", 0.7],
    ["/team", 0.6],
    ["/careers", 0.5],
    ["/contact", 0.8],
    ["/privacy-policy", 0.2],
    ["/terms-of-service", 0.2],
  ];
  const dynamicPaths: [string, number][] = [
    ...solutions.map((s): [string, number] => [s.href, 0.8]),
    ...publishedErpModules.map((m): [string, number] => [`/solutions/erp/${m.slug}`, 0.7]),
    ...products.map((p): [string, number] => [`/products/${p.slug}`, 0.7]),
    ...services.map((s): [string, number] => [`/services/${s.slug}`, 0.7]),
    ...projects.map((p): [string, number] => [`/projects/${p.slug}`, 0.6]),
    ...industries.map((i): [string, number] => [`/industries/${i.slug}`, 0.6]),
  ];
  return [...staticPaths, ...dynamicPaths].map(([path, priority]) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority,
  }));
}
