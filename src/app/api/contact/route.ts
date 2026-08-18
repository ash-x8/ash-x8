import { NextResponse } from "next/server";
import { addContactMessage } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const { senderName, email, phone, projectType, message } = await request.json();

    if (!senderName || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const newMsg = await addContactMessage({
      senderName,
      email,
      phone: phone || "",
      projectType: projectType || "General Inquiry",
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. Kushan will be in touch shortly!",
      data: newMsg,
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit message. Please try again or reach out directly on WhatsApp." },
      { status: 500 }
    );
  }
}
