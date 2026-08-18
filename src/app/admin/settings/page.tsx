import { getSiteSettings } from "@/lib/data";
import SettingsClient from "./SettingsClient";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  const initialSettings = {
    siteName: settings?.siteName || "Alex Morgan Studio",
    tagline: settings?.tagline || "Design. Develop. Create. Manage.",
    email: settings?.email || "alex@morgan.studio",
    phone: settings?.phone || "+1 (555) 234-5678",
    location: settings?.location || "San Francisco, CA & Remote",
    timezone: settings?.timezone || "PST (UTC-8)",
    accentColor: settings?.accentColor || "#6366f1",
    analyticsId: settings?.analyticsId || "",
    maintenanceMode: settings?.maintenanceMode ?? false,
  };

  return <SettingsClient initialSettings={initialSettings} />;
}
