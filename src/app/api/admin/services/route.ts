import { NextResponse } from "next/server";
import { getServices, mutateServices } from "@/lib/data";

export async function GET() {
  const services = await getServices(false);
  return NextResponse.json({ success: true, services });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const created = await mutateServices("create", data);
    return NextResponse.json({ success: true, service: created });
  } catch (error) {
    console.error("Service create error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
