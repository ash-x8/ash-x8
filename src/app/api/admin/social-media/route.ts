import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: items, error } = await supabase
      .from("social_content")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;
    return NextResponse.json({
      items: items.map((i) => ({
        id: i.id,
        title: i.title,
        platform: i.platform,
        contentType: i.content_type,
        description: i.description,
        mediaUrl: i.media_url,
        videoUrl: i.video_url,
        url: i.url,
        campaign: i.campaign,
        date: i.date,
        isFeatured: i.is_featured,
        isPublished: i.is_published,
        displayOrder: i.display_order,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch social items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    const { data: item, error } = await supabase
      .from("social_content")
      .insert({
        title: data.title,
        platform: data.platform || "Instagram",
        content_type: data.contentType || "Post",
        description: data.description || null,
        media_url: data.mediaUrl || null,
        video_url: data.videoUrl || null,
        url: data.url || null,
        campaign: data.campaign || null,
        date: data.date || null,
        is_featured: Boolean(data.isFeatured),
        is_published: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
        display_order: Number(data.displayOrder || 0),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      item: {
        id: item.id,
        title: item.title,
        platform: item.platform,
        contentType: item.content_type,
        description: item.description,
        mediaUrl: item.media_url,
        videoUrl: item.video_url,
        url: item.url,
        campaign: item.campaign,
        date: item.date,
        isFeatured: item.is_featured,
        isPublished: item.is_published,
        displayOrder: item.display_order,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create social item" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const supabase = await createClient();

    const { data: updated, error } = await supabase
      .from("social_content")
      .update({
        title: data.title,
        platform: data.platform,
        content_type: data.contentType,
        description: data.description,
        media_url: data.mediaUrl,
        video_url: data.videoUrl,
        url: data.url,
        campaign: data.campaign,
        date: data.date,
        is_featured: Boolean(data.isFeatured),
        is_published: Boolean(data.isPublished),
        display_order: Number(data.displayOrder || 0),
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      item: {
        id: updated.id,
        title: updated.title,
        platform: updated.platform,
        contentType: updated.content_type,
        description: updated.description,
        mediaUrl: updated.media_url,
        videoUrl: updated.video_url,
        url: updated.url,
        campaign: updated.campaign,
        date: updated.date,
        isFeatured: updated.is_featured,
        isPublished: updated.is_published,
        displayOrder: updated.display_order,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update social item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const supabase = await createClient();
    const { error } = await supabase.from("social_content").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete social item" }, { status: 500 });
  }
}
