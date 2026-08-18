import { prisma } from "@/lib/prisma";
import AboutEditorClient from "./AboutEditorClient";

export const revalidate = 0;

export default async function AdminAboutPage() {
  const about = await prisma.aboutSection.findUnique({ where: { id: "1" } });

  const initialData = {
    name: about?.name || "Alex Morgan",
    title: about?.title || "Creative Developer & Digital Designer",
    shortBio:
      about?.shortBio ||
      "Multidisciplinary digital creator working at the intersection of application development, modern visual design, and social media content.",
    longBio: about?.longBio || "",
    personalStatement:
      about?.personalStatement || "I work at the intersection of design, technology and digital content.",
    location: about?.location || "San Francisco, CA / Remote",
    availability: about?.availability || "Open for selected client work",
    profileImage: about?.profileImage || null,
  };

  return <AboutEditorClient initialData={initialData} />;
}
