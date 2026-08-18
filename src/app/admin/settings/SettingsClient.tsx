"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Save, CheckCircle2, AlertCircle } from "lucide-react";

interface SettingsClientProps {
  initialSettings: {
    siteName: string;
    tagline: string;
    email: string;
    phone: string;
    location: string;
    timezone: string;
    accentColor: string;
    analyticsId: string;
    maintenanceMode: boolean;
  };
}

export default function SettingsClient({ initialSettings }: SettingsClientProps) {
  const [formData, setFormData] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setStatus({ type: "success", message: "Global site settings saved successfully!" });
    } catch (err: any) {
      setStatus({ type: "error", message: err.message || "Save error" });
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
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Site Settings</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Configure platform branding, contact details, accent color, and maintenance mode.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Site Name *</label>
              <input
                type="text"
                required
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Global Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Contact Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Direct Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Analytics ID (Google Analytics)</label>
              <input
                type="text"
                value={formData.analyticsId}
                onChange={(e) => setFormData({ ...formData, analyticsId: e.target.value })}
                placeholder="G-XXXXXXX"
                className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Accent Theme Color</label>
              <input
                type="color"
                value={formData.accentColor}
                onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                className="w-full h-12 rounded-xl bg-[#1a1e2c] border border-[#222738] cursor-pointer p-1"
              />
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="maintenance"
                checked={formData.maintenanceMode}
                onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
                className="w-5 h-5 rounded bg-[#1a1e2c] border-[#222738] text-indigo-600 focus:ring-0"
              />
              <label htmlFor="maintenance" className="text-xs font-mono font-semibold text-slate-300">
                Enable Maintenance Mode
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-[0.99] disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Settings..." : "Save Site Settings"}</span>
          </button>
        </form>
      </main>
    </div>
  );
}
