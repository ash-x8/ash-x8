import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    const { data: updated, error } = await supabase
      .from("seo_settings")
      .upsert({
        page_path: data.pagePath || "/",
        meta_title: data.metaTitle,
        meta_description: data.metaDescription,
        keywords: data.keywords,
        updated_at: new Date().toISOString(),
      }, { onConflict: "page_path" })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      seo: {
        pagePath: updated.page_path,
        metaTitle: updated.meta_title,
        metaDescription: updated.meta_description,
        keywords: updated.keywords,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update SEO settings" }, { status: 500 });
  }
}
