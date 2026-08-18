import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: { gallery: { orderBy: { displayOrder: "asc" } } },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        year: data.year,
        client: data.client,
        role: data.role,
        shortDesc: data.shortDesc,
        fullDesc: data.fullDesc,
        tools: typeof data.tools === "string" ? data.tools : JSON.stringify(data.tools || []),
        technologies: typeof data.technologies === "string" ? data.technologies : JSON.stringify(data.technologies || []),
        coverImage: data.coverImage,
        videoUrl: data.videoUrl,
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        isFeatured: Boolean(data.isFeatured),
        isPublished: Boolean(data.isPublished),
        displayOrder: Number(data.displayOrder || 0),
        overview: data.overview,
        challenge: data.challenge,
        research: data.research,
        concept: data.concept,
        design: data.design,
        development: data.development,
        testing: data.testing,
        finalProduct: data.finalProduct,
        results: data.results,
      },
    });

    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    console.error("Update project error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
