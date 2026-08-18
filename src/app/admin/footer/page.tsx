import { getSiteSettings, getSocialLinks } from "@/lib/data";
import FooterClient from "./FooterClient";

export const revalidate = 0;

export default async function AdminFooterPage() {
  const [settings, socialLinks] = await Promise.all([
    getSiteSettings(),
    getSocialLinks(),
  ]);

  return (
    <FooterClient
      initialTagline={settings?.tagline || "Design. Develop. Create. Manage."}
      initialSocialLinks={socialLinks}
    />
  );
}
