import { prisma } from "@/lib/prisma";
import HeroEditorClient from "./HeroEditorClient";

export const revalidate = 0;

export default async function AdminHeroPage() {
  const hero = await prisma.heroSection.findUnique({ where: { id: "1" } });

  const initialData = {
    heading: hero?.heading || "Designing ideas.\nBuilding experiences.",
    subtitle: hero?.subtitle || "Creative Developer & Digital Designer",
    description:
      hero?.description ||
      "Creative developer, designer and digital creator building apps, websites, brands and digital content.",
    primaryCtaText: hero?.primaryCtaText || "Explore My Work",
    primaryCtaLink: hero?.primaryCtaLink || "/work",
    secondaryCtaText: hero?.secondaryCtaText || "Let's Collaborate",
    secondaryCtaLink: hero?.secondaryCtaLink || "/contact",
    statusBadge: hero?.statusBadge || "Available for selected projects",
    smallText: hero?.smallText || "DESIGN → DEVELOP → CREATE → MANAGE",
    heroImage: hero?.heroImage || null,
  };

  return <HeroEditorClient initialData={initialData} />;
}
