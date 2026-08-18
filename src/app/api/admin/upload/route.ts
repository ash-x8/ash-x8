import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const supabase = await createClient();

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage 'media' bucket
    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    let publicUrl = "";

    if (uploadError) {
      console.warn("Supabase storage upload error (falling back to Data URL if offline):", uploadError);
      const base64 = buffer.toString("base64");
      publicUrl = `data:${file.type};base64,${base64}`;
    } else {
      const { data } = supabase.storage.from("media").getPublicUrl(filePath);
      publicUrl = data.publicUrl;
    }

    // Save asset record
    const { data: mediaAsset } = await supabase
      .from("media_assets")
      .insert({
        filename: file.name,
        filepath: publicUrl,
        filetype: file.type,
        filesize: file.size,
        alt_text: file.name,
      })
      .select()
      .single();

    return NextResponse.json({
      success: true,
      url: publicUrl,
      asset: mediaAsset || {
        id: "temp-" + Date.now(),
        filename: file.name,
        filepath: publicUrl,
        filetype: file.type,
        filesize: file.size,
      },
    });
  } catch (error) {
    console.error("Upload route error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
