import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings, getDesignItems } from "@/lib/data";
import { Palette } from "lucide-react";
import GraphicDesignGalleryClient from "./GraphicDesignGalleryClient";

export const revalidate = 0;

interface GraphicDesignPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function GraphicDesignPage({ searchParams }: GraphicDesignPageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams?.category || "All";

  const [siteSettings, designItems] = await Promise.all([
    getSiteSettings(),
    getDesignItems(),
  ]);

  const categories = ["All", "Posters", "Certificates", "Logo & Marks", "Social Graphics", "Invitations"];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar siteName={siteSettings?.siteName} />

      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151e] border border-[#222738] text-xs font-mono text-purple-400 font-semibold tracking-wider uppercase">
              <Palette className="w-3.5 h-3.5 text-purple-400" />
              <span>EDITORIAL VISUAL ART DIRECTION</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Graphic Design & Visual Identity
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Bespoke visual graphic designs, event posters, academic merit certificates, corporate vector marks, and social media collateral by Kushan A Wickramasinghe.
            </p>
          </div>

          {/* Interactive Gallery */}
          <GraphicDesignGalleryClient
            items={designItems}
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
