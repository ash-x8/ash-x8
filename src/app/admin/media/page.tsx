import { prisma } from "@/lib/prisma";
import MediaClient from "./MediaClient";

export const revalidate = 0;

export default async function AdminMediaPage() {
  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <MediaClient initialAssets={assets} />;
}
