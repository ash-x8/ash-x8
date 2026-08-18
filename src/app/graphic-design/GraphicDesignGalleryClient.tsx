"use client";

import { useState } from "react";
import { Palette, X, ZoomIn, MessageCircle, Calendar } from "lucide-react";
import { DesignItem } from "@/lib/data";

interface GraphicDesignGalleryClientProps {
  items: DesignItem[];
  categories: string[];
  currentCategory?: string;
}

export default function GraphicDesignGalleryClient({
  items,
  categories,
  currentCategory = "All",
}: GraphicDesignGalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState(currentCategory);
  const [selectedItem, setSelectedItem] = useState<DesignItem | null>(null);

  const filteredItems = items.filter((item) => {
    if (activeCategory && activeCategory !== "All") {
      return item.category === activeCategory;
    }
    return true;
  });

  return (
    <div className="space-y-12">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold"
                  : "bg-[#12151e] border border-[#222738] text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative bg-[#12151e] border border-[#222738] rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-purple-950/20 cursor-pointer"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-[#1a1e2c]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-[#090a0f]/85 backdrop-blur-md border border-[#222738] text-purple-400 font-semibold uppercase">
                    {item.category}
                  </span>
                  {item.year && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#090a0f]/85 backdrop-blur-md border border-[#222738] text-slate-400">
                      {item.year}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 right-4 p-2 rounded-full bg-[#090a0f]/80 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                  <ZoomIn className="w-4 h-4 text-purple-400" />
                </div>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-[#12151e] border border-[#222738] rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white">No Designs Found</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            There are currently no published works under the "{activeCategory}" category.
          </p>
          <button
            onClick={() => setActiveCategory("All")}
            className="px-6 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-mono"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-[#090a0f]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in">
          <div className="relative max-w-5xl w-full bg-[#12151e] border border-[#222738] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-[#222738]">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400 font-mono text-xs font-semibold">
                  {selectedItem.category}
                </span>
                <h3 className="text-lg font-bold text-white truncate max-w-md">
                  {selectedItem.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-xl bg-[#1a1e2c] border border-[#222738] text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-black/60 flex items-center justify-center p-4 min-h-[350px]">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>

            <div className="p-5 border-t border-[#222738] bg-[#0c0e15] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-300 max-w-md">
                {selectedItem.description}
              </div>

              <a
                href={`https://wa.me/94752269410?text=${encodeURIComponent(
                  `Hi Kushan, I would like to commission a graphic design project similar to "${selectedItem.title}".`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs font-mono flex items-center gap-2 shadow-lg shadow-emerald-600/30 whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Order on WhatsApp (0752269410)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
