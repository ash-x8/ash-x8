import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
];

const MAX_SIZE = 15 * 1024 * 1024; // 15MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Supported types: JPG, PNG, WEBP, GIF, SVG, MP4, WEBM" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 15MB limit" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let publicUrl = "";

    // Attempt writing to disk if local filesystem is writable, else fallback to Data URL for serverless environments
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });

      const timeStamp = Date.now();
      const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filename = `${timeStamp}-${sanitizedFilename}`;
      const filePath = path.join(uploadsDir, filename);

      await writeFile(filePath, buffer);
      publicUrl = `/uploads/${filename}`;
    } catch (fsErr) {
      console.warn("Read-only or serverless filesystem detected. Falling back to data URL for asset:", fsErr);
      const base64 = buffer.toString("base64");
      publicUrl = `data:${file.type};base64,${base64}`;
    }

    let mediaAsset = null;
    try {
      mediaAsset = await prisma.mediaAsset.create({
        data: {
          filename: file.name,
          filepath: publicUrl,
          filetype: file.type,
          filesize: file.size,
          altText: file.name,
        },
      });
    } catch (dbErr) {
      console.warn("Could not log media asset to database:", dbErr);
    }

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
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
