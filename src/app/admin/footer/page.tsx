import { prisma } from "@/lib/prisma";
import FooterClient from "./FooterClient";

export const revalidate = 0;

export default async function AdminFooterPage() {
  const [settings, socialLinks] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "1" } }),
    prisma.socialLink.findMany({ orderBy: { displayOrder: "asc" } }),
  ]);

  return (
    <FooterClient
      initialTagline={settings?.tagline || "Design. Develop. Create. Manage."}
      initialSocialLinks={socialLinks}
    />
  );
}
