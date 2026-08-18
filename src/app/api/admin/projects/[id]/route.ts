import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data: project, error } = await supabase
      .from("projects")
      .select("*, project_gallery(*)")
      .eq("id", id)
      .single();

    if (error || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({
      project: {
        id: project.id,
        title: project.title,
        slug: project.slug,
        category: project.category,
        year: project.year,
        client: project.client,
        role: project.role,
        shortDesc: project.short_desc,
        fullDesc: project.full_desc,
        tools: JSON.stringify(project.tools || []),
        technologies: JSON.stringify(project.technologies || []),
        coverImage: project.cover_image,
        videoUrl: project.video_url,
        liveUrl: project.live_url,
        githubUrl: project.github_url,
        isFeatured: project.is_featured,
        isPublished: project.is_published,
        displayOrder: project.display_order,
        overview: project.overview,
        challenge: project.challenge,
        research: project.research,
        concept: project.concept,
        design: project.design,
        development: project.development,
        testing: project.testing,
        finalProduct: project.final_product,
        results: project.results,
        gallery: (project.project_gallery || []).map((g: any) => ({
          id: g.id,
          imageUrl: g.image_url,
          caption: g.caption,
          displayOrder: g.display_order,
        })),
      },
    });
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
    const supabase = await createClient();

    const payload = {
      title: data.title,
      slug: data.slug,
      category: data.category,
      year: data.year,
      client: data.client,
      role: data.role,
      short_desc: data.shortDesc,
      full_desc: data.fullDesc,
      tools: typeof data.tools === "string" ? JSON.parse(data.tools || "[]") : data.tools || [],
      technologies: typeof data.technologies === "string" ? JSON.parse(data.technologies || "[]") : data.technologies || [],
      cover_image: data.coverImage,
      video_url: data.videoUrl,
      live_url: data.liveUrl,
      github_url: data.githubUrl,
      is_featured: Boolean(data.isFeatured),
      is_published: Boolean(data.isPublished),
      display_order: Number(data.displayOrder || 0),
      overview: data.overview,
      challenge: data.challenge,
      research: data.research,
      concept: data.concept,
      design: data.design,
      development: data.development,
      testing: data.testing,
      final_product: data.finalProduct,
      results: data.results,
      updated_at: new Date().toISOString(),
    };

    const { data: updated, error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

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
    const supabase = await createClient();

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
