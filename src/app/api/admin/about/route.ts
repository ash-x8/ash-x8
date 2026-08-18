import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    const payload = {
      id: "1",
      name: data.name,
      title: data.title,
      short_bio: data.shortBio,
      long_bio: data.longBio,
      personal_statement: data.personalStatement,
      location: data.location,
      availability: data.availability,
      profile_image: data.profileImage,
      updated_at: new Date().toISOString(),
    };

    const { data: updated, error } = await supabase
      .from("about_section")
      .upsert(payload)
      .select()
      .single();

    if (error) {
      console.error("Supabase about update error:", error);
      return NextResponse.json({ error: "Failed to update about section" }, { status: 500 });
    }

    return NextResponse.json({ success: true, about: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update about section" }, { status: 500 });
  }
}
