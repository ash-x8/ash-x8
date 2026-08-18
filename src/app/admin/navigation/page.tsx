import { prisma } from "@/lib/prisma";
import NavigationClient from "./NavigationClient";

export const revalidate = 0;

export default async function AdminNavigationPage() {
  const items = await prisma.navigationItem.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return <NavigationClient initialItems={items} />;
}
