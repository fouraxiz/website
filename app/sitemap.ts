import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getErpModules, getIndustries, getPosts, getProducts, getProjects, getServices, getSolutions } from "@/lib/cms/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [solutions, publishedErpModules, products, services, projects, industries, posts] = await Promise.all([
    getSolutions(),
    getErpModules(),
    getProducts(),
    getServices(),
    getProjects(),
    getIndustries(),
    getPosts(),
  ]);
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
    ["/blog", 0.7],
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
    ...posts.filter((p) => p._status === "published").map((p): [string, number] => [`/blog/${p.slug}`, 0.6]),
  ];
  return [...staticPaths, ...dynamicPaths].map(([path, priority]) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority,
  }));
}
