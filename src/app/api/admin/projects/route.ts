import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*, project_gallery(*)")
      .order("display_order", { ascending: true });

    if (error) throw error;
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    if (!data.title || !data.category) {
      return NextResponse.json({ error: "Title and Category are required" }, { status: 400 });
    }

    const slug =
      data.slug?.trim() ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const payload = {
      title: data.title,
      slug,
      category: data.category,
      year: data.year || new Date().getFullYear().toString(),
      client: data.client || null,
      role: data.role || null,
      short_desc: data.shortDesc || "",
      full_desc: data.fullDesc || "",
      tools: typeof data.tools === "string" ? JSON.parse(data.tools || "[]") : data.tools || [],
      technologies: typeof data.technologies === "string" ? JSON.parse(data.technologies || "[]") : data.technologies || [],
      cover_image: data.coverImage || null,
      video_url: data.videoUrl || null,
      live_url: data.liveUrl || null,
      github_url: data.githubUrl || null,
      is_featured: Boolean(data.isFeatured),
      is_published: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
      display_order: data.displayOrder ? Number(data.displayOrder) : 0,
      overview: data.overview || null,
      challenge: data.challenge || null,
      research: data.research || null,
      concept: data.concept || null,
      design: data.design || null,
      development: data.development || null,
      testing: data.testing || null,
      final_product: data.finalProduct || null,
      results: data.results || null,
    };

    const { data: project, error } = await supabase
      .from("projects")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
