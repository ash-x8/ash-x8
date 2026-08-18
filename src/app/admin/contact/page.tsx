import { prisma } from "@/lib/prisma";
import ContactClient from "./ContactClient";

export const revalidate = 0;

export default async function AdminContactPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <ContactClient initialMessages={messages} />;
}
