import { prisma } from "@/lib/prisma";
import DesignClient from "./DesignClient";

export const revalidate = 0;

export default async function AdminDesignPage() {
  const items = await prisma.designItem.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return <DesignClient initialItems={items} />;
}
