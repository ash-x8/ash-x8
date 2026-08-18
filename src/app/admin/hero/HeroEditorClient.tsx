"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Save, CheckCircle2, AlertCircle } from "lucide-react";

interface HeroEditorClientProps {
  initialData: {
    heading: string;
    subtitle: string;
    description: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    statusBadge: string;
    smallText: string;
    heroImage?: string | null;
  };
}

export default function HeroEditorClient({ initialData }: HeroEditorClientProps) {
  const [formData, setFormData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const res = await fetch("/api/admin/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save changes");

      setStatus({ type: "success", message: "Homepage Hero Section updated successfully!" });
    } catch (err: unknown) {
      setStatus({ type: "error", message: err instanceof Error ? err.message : "Error saving section" });
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
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Homepage Hero Editor</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Manage hero headlines, CTAs, status badges, and subtext.
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

        <form onSubmit={handleSubmit} className="bg-[#12151e] border border-[#222738] rounded-3xl p-8 space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-400 font-semibold">
              Status Badge
            </label>
            <input
              type="text"
              value={formData.statusBadge}
              onChange={(e) => setFormData({ ...formData, statusBadge: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-400 font-semibold">
              Top Small Category Tagline
            </label>
            <input
              type="text"
              value={formData.smallText}
              onChange={(e) => setFormData({ ...formData, smallText: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-400 font-semibold">
              Main Heading
            </label>
            <textarea
              rows={2}
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500 resize-none font-bold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-400 font-semibold">
              Professional Subtitle / Identity
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-400 font-semibold">
              Hero Description Paragraph
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-400 font-semibold">
                Primary CTA Button Text
              </label>
              <input
                type="text"
                value={formData.primaryCtaText}
                onChange={(e) => setFormData({ ...formData, primaryCtaText: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-400 font-semibold">
                Primary CTA Link Target
              </label>
              <input
                type="text"
                value={formData.primaryCtaLink}
                onChange={(e) => setFormData({ ...formData, primaryCtaLink: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-400 font-semibold">
                Secondary CTA Button Text
              </label>
              <input
                type="text"
                value={formData.secondaryCtaText}
                onChange={(e) => setFormData({ ...formData, secondaryCtaText: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-400 font-semibold">
                Secondary CTA Link Target
              </label>
              <input
                type="text"
                value={formData.secondaryCtaLink}
                onChange={(e) => setFormData({ ...formData, secondaryCtaLink: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-[0.99] disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Publish Hero Changes"}</span>
          </button>
        </form>
      </main>
    </div>
  );
}
