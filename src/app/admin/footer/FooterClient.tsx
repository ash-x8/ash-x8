"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Save, CheckCircle2, AlertCircle } from "lucide-react";

interface FooterClientProps {
  initialTagline: string;
  initialSocialLinks: Array<{ id: string; platform: string; url: string; enabled: boolean }>;
}

export default function FooterClient({ initialTagline, initialSocialLinks }: FooterClientProps) {
  const [tagline, setTagline] = useState(initialTagline);
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const res = await fetch("/api/admin/footer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tagline, socialLinks }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setStatus({ type: "success", message: "Footer content and social links updated successfully!" });
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
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Footer Content Editor</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Manage footer tagline, copyright text, and central social link destinations.
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
            <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Footer Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-[#222738]">
            <h2 className="text-sm font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Social Links Manager
            </h2>

            <div className="space-y-3">
              {socialLinks.map((link, idx) => (
                <div key={link.platform} className="flex items-center gap-4 bg-[#1a1e2c] p-3 rounded-xl border border-[#222738]">
                  <span className="w-24 text-xs font-bold text-white font-mono">{link.platform}</span>
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => {
                      const updated = [...socialLinks];
                      updated[idx].url = e.target.value;
                      setSocialLinks(updated);
                    }}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#12151e] border border-[#222738] text-xs text-white focus:outline-none font-mono"
                  />
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-400">
                    <input
                      type="checkbox"
                      checked={link.enabled}
                      onChange={(e) => {
                        const updated = [...socialLinks];
                        updated[idx].enabled = e.target.checked;
                        setSocialLinks(updated);
                      }}
                      className="w-4 h-4 rounded bg-[#12151e] border-[#222738] text-indigo-600 focus:ring-0"
                    />
                    <span>Show</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-[0.99] disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Publish Footer Changes"}</span>
          </button>
        </form>
      </main>
    </div>
  );
}
