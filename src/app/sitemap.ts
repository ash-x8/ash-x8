import { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ash-wickramasinghe.site";

  const staticRoutes = [
    "",
    "/about",
    "/work",
    "/photography",
    "/graphic-design",
    "/writing",
    "/apps",
    "/web-development",
    "/social-media",
    "/services",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    const publishedProjects = await getProjects({ publishedOnly: true });

    const projectRoutes = publishedProjects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes];
  } catch {
    return staticRoutes;
  }
}
