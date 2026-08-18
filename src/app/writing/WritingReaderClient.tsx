"use client";

import { useState } from "react";
import { BookOpen, X, User } from "lucide-react";
import { WritingItem } from "@/lib/data";

interface WritingReaderClientProps {
  writings: WritingItem[];
  categories: string[];
  currentCategory?: string;
}

export default function WritingReaderClient({
  writings,
  categories,
  currentCategory = "All",
}: WritingReaderClientProps) {
  const [activeCategory, setActiveCategory] = useState(currentCategory);
  const [selectedWriting, setSelectedWriting] = useState<WritingItem | null>(null);

  const filteredWritings = writings.filter((item) => {
    if (activeCategory && activeCategory !== "All") {
      return item.category === activeCategory;
    }
    return true;
  });

  return (
    <div className="space-y-12">
      {/* Filter Tabs */}
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

      {/* Writings Grid */}
      {filteredWritings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWritings.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedWriting(item)}
              className="bg-[#12151e] border border-[#222738] rounded-3xl p-8 space-y-5 hover:border-emerald-500/50 transition-all flex flex-col justify-between cursor-pointer group hover:shadow-2xl hover:shadow-emerald-950/20"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 uppercase font-semibold">
                    {item.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <User className="w-3 h-3 text-emerald-400" />
                    {item.authorAlias}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed line-clamp-4 italic border-l border-emerald-500/30 pl-3">
                  "{item.excerpt}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#222738] font-mono text-xs text-slate-500 flex items-center justify-between">
                <span>{item.publicationDate || "2024"}</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <BookOpen className="w-3.5 h-3.5" /> Read Full Piece
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-[#12151e] border border-[#222738] rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white">No Publications Found</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            There are currently no published works under "{activeCategory}".
          </p>
          <button
            onClick={() => setActiveCategory("All")}
            className="px-6 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-mono"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Reader Modal */}
      {selectedWriting && (
        <div className="fixed inset-0 z-50 bg-[#090a0f]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in">
          <div className="relative max-w-3xl w-full bg-[#12151e] border border-[#222738] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh]">
            <div className="flex items-center justify-between p-6 border-b border-[#222738] bg-[#161a26]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 text-xs font-mono font-semibold">
                    {selectedWriting.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    By {selectedWriting.authorAlias}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {selectedWriting.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedWriting(null)}
                className="p-2 rounded-xl bg-[#1a1e2c] border border-[#222738] text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 text-slate-200 text-base leading-relaxed font-serif whitespace-pre-line selection:bg-emerald-500 selection:text-black">
              {selectedWriting.content || selectedWriting.excerpt}
            </div>

            <div className="p-5 border-t border-[#222738] bg-[#0c0e15] flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Published: {selectedWriting.publicationDate || "2024"}</span>
              <span>Author Persona: {selectedWriting.authorAlias}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
