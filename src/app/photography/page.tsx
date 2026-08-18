import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings, getPhotographyItems } from "@/lib/data";
import { Camera, Sparkles, MapPin } from "lucide-react";

export const revalidate = 0;

interface PhotographyPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PhotographyPage({ searchParams }: PhotographyPageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams?.category;

  const [siteSettings, photos] = await Promise.all([
    getSiteSettings(),
    getPhotographyItems(currentCategory),
  ]);

  const categories = ["All", "Portrait", "Landscape", "Event", "Editorial", "Commercial", "Nature"];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar siteName={siteSettings?.siteName || "ASH-X8"} />

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
              Curated photography showcase by Kushan A Wickramasinghe (Ash_x8) featuring portraits, commercial shoots, event coverage, and editorial visual arts.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = (!currentCategory && cat === "All") || currentCategory === cat;
              const href = cat === "All" ? "/photography" : `/photography?category=${encodeURIComponent(cat)}`;

              return (
                <a
                  key={cat}
                  href={href}
                  className={`px-5 py-2 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold"
                      : "bg-[#12151e] border border-[#222738] text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  {cat}
                </a>
              );
            })}
          </div>

          {/* Photography Gallery Grid */}
          {photos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative bg-[#12151e] border border-[#222738] rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-indigo-950/20"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden relative bg-[#1a1e2c]">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-[#090a0f]/80 backdrop-blur-md border border-[#222738] text-indigo-400 font-semibold uppercase">
                        {photo.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {photo.title}
                    </h3>

                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-[#222738]">
                      {photo.cameraInfo && <span>{photo.cameraInfo}</span>}
                      {photo.location && (
                        <span className="flex items-center gap-1 text-slate-500">
                          <MapPin className="w-3 h-3 text-indigo-400" />
                          {photo.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 bg-[#12151e] border border-[#222738] rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white">No Photographs Listed</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Photography gallery items will appear here soon.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer siteName={siteSettings?.siteName || "ASH-X8"} />
    </div>
  );
}
