import { prisma } from "@/lib/prisma";
import SeoClient from "./SeoClient";

export const revalidate = 0;

export default async function AdminSeoPage() {
  const seoList = await prisma.seoSetting.findMany();
  return <SeoClient initialSeoList={seoList} />;
}
