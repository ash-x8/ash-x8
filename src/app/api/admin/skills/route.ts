import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: categories, error } = await supabase
      .from("skill_categories")
      .select("*, skills(*)")
      .order("display_order", { ascending: true });

    if (error) throw error;
    return NextResponse.json({
      categories: categories.map((c) => ({
        id: c.id,
        name: c.name,
        displayOrder: c.display_order,
        skills: (c.skills || []).map((s: any) => ({
          id: s.id,
          name: s.name,
          skillLevel: s.skill_level,
          description: s.description,
          displayOrder: s.display_order,
          isActive: s.is_active,
          categoryId: s.category_id,
        })),
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    if (data.type === "category") {
      const { data: cat, error } = await supabase
        .from("skill_categories")
        .insert({ name: data.name, display_order: Number(data.displayOrder || 0) })
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, category: cat });
    }

    const { data: skill, error } = await supabase
      .from("skills")
      .insert({
        name: data.name,
        category_id: data.categoryId,
        skill_level: data.skillLevel || null,
        description: data.description || null,
        display_order: Number(data.displayOrder || 0),
        is_active: data.isActive !== undefined ? Boolean(data.isActive) : true,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, skill });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const supabase = await createClient();

    if (type === "category") {
      const { error } = await supabase.from("skill_categories").delete().eq("id", id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("skills").delete().eq("id", id);
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
