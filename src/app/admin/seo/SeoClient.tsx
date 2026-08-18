"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Save, CheckCircle2, AlertCircle } from "lucide-react";

interface SeoItem {
  pagePath: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string | null;
}

export default function SeoClient({ initialSeoList }: { initialSeoList: SeoItem[] }) {
  const [selectedPath, setSelectedPath] = useState("/");
  const [seoList, setSeoList] = useState<SeoItem[]>(initialSeoList);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const currentSeo = seoList.find((s) => s.pagePath === selectedPath) || {
    pagePath: selectedPath,
    metaTitle: "Alex Morgan Studio",
    metaDescription: "Creative developer & digital designer",
    keywords: "next.js, react, ui/ux, branding, video editing",
  };

  const pages = [
    { label: "Homepage (/)", path: "/" },
    { label: "About Page (/about)", path: "/about" },
    { label: "Work Archive (/work)", path: "/work" },
    { label: "App Development (/apps)", path: "/apps" },
    { label: "Web Development (/web-development)", path: "/web-development" },
    { label: "Graphic Design (/graphic-design)", path: "/graphic-design" },
    { label: "Social Media (/social-media)", path: "/social-media" },
    { label: "Services (/services)", path: "/services" },
    { label: "Contact (/contact)", path: "/contact" },
  ];

  const [form, setForm] = useState(currentSeo);

  const handleSelectPage = (path: string) => {
    setSelectedPath(path);
    const found = seoList.find((s) => s.pagePath === path) || {
      pagePath: path,
      metaTitle: "Alex Morgan Studio",
      metaDescription: "Creative developer & digital designer",
      keywords: "next.js, react, ui/ux, branding, video editing",
    };
    setForm(found);
    setStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, pagePath: selectedPath }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSeoList((prev) => {
        const idx = prev.findIndex((s) => s.pagePath === selectedPath);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = data.seo;
          return updated;
        }
        return [...prev, data.seo];
      });

      setStatus({ type: "success", message: `SEO metadata updated for ${selectedPath}` });
    } catch (err: any) {
      setStatus({ type: "error", message: err.message || "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex">
      <AdminSidebar />

      <main className="flex-1 lg:pl-64 p-6 sm:p-10 space-y-8 max-w-4xl">
        <div className="flex items-center justify-between pb-6 border-b border-[#222738]">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Global & Page SEO Manager</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Configure meta titles, descriptions, and OpenGraph tags per route.
            </p>
          </div>
        </div>

        {status && (
          <div
            className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-semibold ${
              status.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/30 text-rose-400"
            }`}
          >
            {status.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{status.message}</span>
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {pages.map((p) => (
            <button
              key={p.path}
              onClick={() => handleSelectPage(p.path)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                selectedPath === p.path
                  ? "bg-indigo-600 text-white font-semibold shadow-lg"
                  : "bg-[#12151e] border border-[#222738] text-slate-400 hover:text-white"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-[#12151e] border border-[#222738] rounded-3xl p-8 space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Meta Page Title *</label>
            <input
              type="text"
              required
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Meta Description *</label>
            <textarea
              rows={3}
              required
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Keywords (Comma Separated)</label>
            <input
              type="text"
              value={form.keywords || ""}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-[0.99] disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Metadata..." : `Save SEO for ${selectedPath}`}</span>
          </button>
        </form>
      </main>
    </div>
  );
}
