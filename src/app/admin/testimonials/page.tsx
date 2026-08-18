import { getTestimonials } from "@/lib/data";
import TestimonialsClient from "./TestimonialsClient";

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const items = await getTestimonials();

  return <TestimonialsClient initialItems={items} />;
}
