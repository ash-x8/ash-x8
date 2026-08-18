import { NextResponse } from "next";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, slug, category, excerpt, content, authorAlias, coverImage, publicationDate, isFeatured, isPublished, displayOrder } = body;

    const { data, error } = await supabase
      .from("writing_items")
      .insert({
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: category || "Creative Non-Fiction",
        excerpt,
        content,
        author_alias: authorAlias || "Writer Ash",
        cover_image: coverImage,
        publication_date: publicationDate || new Date().toISOString().split("T")[0],
        is_featured: isFeatured ?? true,
        is_published: isPublished ?? true,
        display_order: displayOrder || 1,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ item: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { id, title, slug, category, excerpt, content, authorAlias, coverImage, publicationDate, isFeatured, isPublished, displayOrder } = body;

    const { data, error } = await supabase
      .from("writing_items")
      .update({
        title,
        slug,
        category,
        excerpt,
        content,
        author_alias: authorAlias,
        cover_image: coverImage,
        publication_date: publicationDate,
        is_featured: isFeatured,
        is_published: isPublished,
        display_order: displayOrder,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ item: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const { error } = await supabase.from("writing_items").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
