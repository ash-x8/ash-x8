import { prisma } from "@/lib/prisma";
import SocialMediaClient from "./SocialMediaClient";

export const revalidate = 0;

export default async function AdminSocialMediaPage() {
  const items = await prisma.socialContent.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return <SocialMediaClient initialItems={items} />;
}
