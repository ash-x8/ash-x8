import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { senderName, email, projectType, message } = await request.json();

    if (!senderName || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        sender_name: senderName,
        email,
        project_type: projectType || "Other",
        message,
        status: "UNREAD",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase contact insertion error:", error);
      return NextResponse.json(
        { error: "Failed to submit message." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: data });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit message." },
      { status: 500 }
    );
  }
}
