"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Upload, Trash2, Copy, Check, Image as ImageIcon } from "lucide-react";

interface MediaItem {
  id: string;
  filename: string;
  filepath: string;
  filetype: string;
  filesize: number;
  createdAt: Date | string;
}

export default function MediaClient({ initialAssets }: { initialAssets: MediaItem[] }) {
  const [assets, setAssets] = useState<MediaItem[]>(initialAssets);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setAssets([data.asset, ...assets]);
    } catch (err: any) {
      alert(err.message || "Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;

    try {
      const res = await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setAssets(assets.filter((a) => a.id !== id));
      }
    } catch {
      alert("Failed to delete asset");
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex">
      <AdminSidebar />

      <main className="flex-1 lg:pl-64 p-6 sm:p-10 space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-[#222738]">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Media Library</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Upload, preview, and manage images and media assets.
            </p>
          </div>

          <label className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>{uploading ? "Uploading..." : "Upload Media File"}</span>
            <input type="file" accept="image/*,video/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>

        {/* Media Assets Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {assets.map((a) => (
            <div
              key={a.id}
              className="bg-[#12151e] border border-[#222738] rounded-2xl p-3 space-y-3 group hover:border-indigo-500/50 transition-all flex flex-col justify-between"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-[#1a1e2c] relative">
                {a.filetype.startsWith("image/") ? (
                  <img src={a.filepath} alt={a.filename} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs">
                    VIDEO
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-white truncate" title={a.filename}>
                  {a.filename}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {(a.filesize / 1024).toFixed(1)} KB
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#222738]">
                <button
                  onClick={() => handleCopyUrl(a.filepath, a.id)}
                  className="p-1.5 rounded-lg bg-[#1a1e2c] text-slate-400 hover:text-white"
                  title="Copy File URL"
                >
                  {copiedId === a.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => handleDelete(a.id)}
                  className="p-1.5 rounded-lg bg-[#1a1e2c] text-slate-400 hover:text-rose-400"
                  title="Delete Asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
