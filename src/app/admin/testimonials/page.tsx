import { prisma } from "@/lib/prisma";
import TestimonialsClient from "./TestimonialsClient";

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const items = await prisma.testimonial.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return <TestimonialsClient initialItems={items} />;
}
