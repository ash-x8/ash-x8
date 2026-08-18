import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://morgan.studio";

  const staticRoutes = [
    "",
    "/about",
    "/work",
    "/apps",
    "/web-development",
    "/graphic-design",
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
    const publishedProjects = await prisma.project.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });

    const projectRoutes = publishedProjects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes];
  } catch {
    return staticRoutes;
  }
}
