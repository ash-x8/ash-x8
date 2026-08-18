import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings, getDesignItems } from "@/lib/data";
import { Palette } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

interface GraphicDesignPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function GraphicDesignPage({ searchParams }: GraphicDesignPageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams?.category;

  const [siteSettings, designItems] = await Promise.all([
    getSiteSettings(),
    getDesignItems(currentCategory),
  ]);

  const categories = ["All", "Logo", "Branding", "Poster", "Social Media", "Typography", "UI Design", "Marketing"];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar siteName={siteSettings?.siteName || "ALEX MORGAN"} />

      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151e] border border-[#222738] text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
              <Palette className="w-3.5 h-3.5 text-indigo-400" />
              <span>EDITORIAL VISUAL ART DIRECTION</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Graphic Design & Visual Identity
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Curated gallery of vector logos, brand architecture, editorial posters, packaging, and digital visual artwork.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = (!currentCategory && cat === "All") || currentCategory === cat;
              const href = cat === "All" ? "/graphic-design" : `/graphic-design?category=${encodeURIComponent(cat)}`;

              return (
                <Link
                  key={cat}
                  href={href}
                  className={`px-5 py-2 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold"
                      : "bg-[#12151e] border border-[#222738] text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {designItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {designItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-[#12151e] border border-[#222738] rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-indigo-950/20"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden relative bg-[#1a1e2c]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-[#090a0f]/80 backdrop-blur-md border border-[#222738] text-indigo-400 font-semibold uppercase">
                        {item.category}
                      </span>
                      {item.year && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#090a0f]/80 backdrop-blur-md border border-[#222738] text-slate-400">
                          {item.year}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 bg-[#12151e] border border-[#222738] rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white">No Design Items Found</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                There are no published graphic design items in this category.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer siteName={siteSettings?.siteName || "ALEX MORGAN"} />
    </div>
  );
}
