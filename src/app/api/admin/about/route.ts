import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const updated = await prisma.aboutSection.upsert({
      where: { id: "1" },
      update: {
        name: data.name,
        title: data.title,
        shortBio: data.shortBio,
        longBio: data.longBio,
        personalStatement: data.personalStatement,
        location: data.location,
        availability: data.availability,
        profileImage: data.profileImage,
      },
      create: {
        id: "1",
        name: data.name,
        title: data.title,
        shortBio: data.shortBio,
        longBio: data.longBio,
        personalStatement: data.personalStatement,
        location: data.location,
        availability: data.availability,
        profileImage: data.profileImage,
      },
    });

    return NextResponse.json({ success: true, about: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update about section" }, { status: 500 });
  }
}
