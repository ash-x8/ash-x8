import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings, getPhotographyItems } from "@/lib/data";
import { Camera } from "lucide-react";
import PhotographyGalleryClient from "./PhotographyGalleryClient";

export const revalidate = 0;

interface PhotographyPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PhotographyPage({ searchParams }: PhotographyPageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams?.category || "All";

  const [siteSettings, photos] = await Promise.all([
    getSiteSettings(),
    getPhotographyItems(),
  ]);

  const categories = ["All", "Portrait", "Landscape", "Event", "Editorial", "Commercial"];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar siteName={siteSettings?.siteName} />

      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151e] border border-[#222738] text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
              <Camera className="w-3.5 h-3.5 text-indigo-400" />
              <span>CINEMATIC VISUAL GALLERY</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Photography Portfolio
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Curated photography archive by Kushan A Wickramasinghe (Ash_x8) featuring editorial portraits, commercial shoots, event highlights, and landscape captures.
            </p>
          </div>

          {/* Interactive Gallery with Lightbox */}
          <PhotographyGalleryClient
            photos={photos}
            categories={categories}
            currentCategory={currentCategory}
          />
        </div>
      </main>

      <Footer
        siteName={siteSettings?.siteName}
        tagline={siteSettings?.tagline}
        email={siteSettings?.email}
        phone={siteSettings?.phone}
        whatsappUrl={siteSettings?.whatsappUrl}
      />
    </div>
  );
}
