import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { senderName, email, projectType, message } = await request.json();

    if (!senderName || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        senderName,
        email,
        projectType: projectType || "Other",
        message,
        status: "UNREAD",
      },
    });

    return NextResponse.json({ success: true, message: contactMessage });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit message." },
      { status: 500 }
    );
  }
}
