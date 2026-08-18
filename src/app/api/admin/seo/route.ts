import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const updated = await prisma.seoSetting.upsert({
      where: { pagePath: data.pagePath || "/" },
      update: {
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords,
      },
      create: {
        pagePath: data.pagePath || "/",
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords,
      },
    });

    return NextResponse.json({ success: true, seo: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update SEO settings" }, { status: 500 });
  }
}
