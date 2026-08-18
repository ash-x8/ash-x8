import { prisma } from "@/lib/prisma";
import ServicesClient from "./ServicesClient";

export const revalidate = 0;

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return <ServicesClient initialServices={services} />;
}
