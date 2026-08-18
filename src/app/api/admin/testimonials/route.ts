import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: items, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;
    return NextResponse.json({
      items: items.map((t) => ({
        id: t.id,
        name: t.name,
        role: t.role,
        company: t.company,
        quote: t.quote,
        photoUrl: t.photo_url,
        website: t.website,
        displayOrder: t.display_order,
        isPublished: t.is_published,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    const { data: item, error } = await supabase
      .from("testimonials")
      .insert({
        name: data.name,
        role: data.role || "Founder & CEO",
        company: data.company || null,
        quote: data.quote || "",
        photo_url: data.photoUrl || null,
        website: data.website || null,
        display_order: Number(data.displayOrder || 0),
        is_published: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      item: {
        id: item.id,
        name: item.name,
        role: item.role,
        company: item.company,
        quote: item.quote,
        photoUrl: item.photo_url,
        website: item.website,
        displayOrder: item.display_order,
        isPublished: item.is_published,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const supabase = await createClient();

    const { data: updated, error } = await supabase
      .from("testimonials")
      .update({
        name: data.name,
        role: data.role,
        company: data.company,
        quote: data.quote,
        photo_url: data.photoUrl,
        website: data.website,
        display_order: Number(data.displayOrder || 0),
        is_published: Boolean(data.isPublished),
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
        name: updated.name,
        role: updated.role,
        company: updated.company,
        quote: updated.quote,
        photoUrl: updated.photo_url,
        website: updated.website,
        displayOrder: updated.display_order,
        isPublished: updated.is_published,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const supabase = await createClient();
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
