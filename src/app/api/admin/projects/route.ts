import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { displayOrder: "asc" },
      include: { gallery: true },
    });
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.title || !data.category) {
      return NextResponse.json({ error: "Title and Category are required" }, { status: 400 });
    }

    const slug =
      data.slug?.trim() ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug,
        category: data.category,
        year: data.year || new Date().getFullYear().toString(),
        client: data.client || null,
        role: data.role || null,
        shortDesc: data.shortDesc || "",
        fullDesc: data.fullDesc || "",
        tools: typeof data.tools === "string" ? data.tools : JSON.stringify(data.tools || []),
        technologies: typeof data.technologies === "string" ? data.technologies : JSON.stringify(data.technologies || []),
        coverImage: data.coverImage || null,
        videoUrl: data.videoUrl || null,
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        isFeatured: Boolean(data.isFeatured),
        isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
        displayOrder: data.displayOrder ? Number(data.displayOrder) : 0,
        overview: data.overview || null,
        challenge: data.challenge || null,
        research: data.research || null,
        concept: data.concept || null,
        design: data.design || null,
        development: data.development || null,
        testing: data.testing || null,
        finalProduct: data.finalProduct || null,
        results: data.results || null,
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
