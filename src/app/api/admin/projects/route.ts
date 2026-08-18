import { NextResponse } from "next/server";
import { getProjects, mutateProjects } from "@/lib/data";

export async function GET() {
  const projects = await getProjects({ publishedOnly: false });
  return NextResponse.json({ success: true, projects });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const created = await mutateProjects("create", data);
    return NextResponse.json({ success: true, project: created });
  } catch (error) {
    console.error("Project create error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
