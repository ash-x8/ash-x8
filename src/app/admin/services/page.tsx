import { getServices } from "@/lib/data";
import ServicesClient from "./ServicesClient";

export const revalidate = 0;

export default async function AdminServicesPage() {
  const services = await getServices(false);

  return <ServicesClient initialServices={services} />;
}
