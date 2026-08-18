"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Plus, Edit2, Trash2, X, Upload } from "lucide-react";

interface SocialItem {
  id: string;
  title: string;
  platform: string;
  contentType: string;
  description?: string | null;
  mediaUrl?: string | null;
  url?: string | null;
  campaign?: string | null;
  date?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
}

export default function SocialMediaClient({ initialItems }: { initialItems: SocialItem[] }) {
  const [items, setItems] = useState<SocialItem[]>(initialItems);
  const [editing, setEditing] = useState<Partial<SocialItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const platforms = ["Instagram", "Facebook", "TikTok", "YouTube", "Other"];
  const contentTypes = ["Post", "Reel", "Video", "Story", "Thumbnail", "Campaign", "Banner"];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setEditing((prev) => ({ ...prev, mediaUrl: data.url }));
    } catch (err: any) {
      alert(err.message || "Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.title) return alert("Title is required");

    try {
      const method = editing.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/social-media", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (editing.id) {
        setItems(items.map((i) => (i.id === editing.id ? data.item : i)));
      } else {
        setItems([...items, data.item]);
      }

      setIsModalOpen(false);
      setEditing(null);
    } catch (err: any) {
      alert(err.message || "Failed to save content item");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/social-media?id=${id}`, { method: "DELETE" });
      if (res.ok) setItems(items.filter((i) => i.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex">
      <AdminSidebar />

      <main className="flex-1 lg:pl-64 p-6 sm:p-10 space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-[#222738]">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Social Media Content Manager</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Manage Reels, TikTok videos, YouTube thumbnails, and social campaigns.
            </p>
          </div>

          <button
            onClick={() => {
              setEditing({
                title: "",
                platform: "Instagram",
                contentType: "Reel",
                description: "",
                mediaUrl: "",
                campaign: "",
                isFeatured: true,
                isPublished: true,
                displayOrder: items.length + 1,
              });
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add Social Item</span>
          </button>
        </div>

        {/* Content Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#12151e] border border-[#222738] rounded-3xl p-5 space-y-4 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {item.mediaUrl && (
                  <div className="aspect-video rounded-2xl overflow-hidden bg-[#1a1e2c]">
                    <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#1a1e2c] text-indigo-400 font-bold">
                    {item.platform}
                  </span>
                  <span className="text-slate-500">{item.contentType}</span>
                </div>

                <h3 className="font-bold text-white text-base leading-snug">{item.title}</h3>
                {item.description && <p className="text-slate-400 text-xs line-clamp-2">{item.description}</p>}
              </div>

              <div className="pt-3 border-t border-[#222738] flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    setEditing(item);
                    setIsModalOpen(true);
                  }}
                  className="p-2 rounded-lg bg-[#1a1e2c] text-slate-400 hover:text-indigo-400"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-2 rounded-lg bg-[#1a1e2c] text-slate-400 hover:text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Dialog */}
        {isModalOpen && editing && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <form
              onSubmit={handleSave}
              className="bg-[#12151e] border border-[#222738] rounded-3xl p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in zoom-in-95"
            >
              <div className="flex items-center justify-between border-b border-[#222738] pb-4">
                <h2 className="text-xl font-bold text-white">
                  {editing.id ? "Edit Social Item" : "New Social Item"}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Title *</label>
                  <input
                    type="text"
                    required
                    value={editing.title || ""}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Platform</label>
                    <select
                      value={editing.platform || "Instagram"}
                      onChange={(e) => setEditing({ ...editing, platform: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                    >
                      {platforms.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Content Type</label>
                    <select
                      value={editing.contentType || "Post"}
                      onChange={(e) => setEditing({ ...editing, contentType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                    >
                      {contentTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Media Image/Thumbnail URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editing.mediaUrl || ""}
                      onChange={(e) => setEditing({ ...editing, mediaUrl: e.target.value })}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none font-mono"
                    />
                    <label className="px-3 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-xs font-mono text-indigo-400 cursor-pointer flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploading ? "..." : "Upload"}</span>
                      <input type="file" accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Campaign Name</label>
                  <input
                    type="text"
                    value={editing.campaign || ""}
                    onChange={(e) => setEditing({ ...editing, campaign: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Description</label>
                  <textarea
                    rows={2}
                    value={editing.description || ""}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-[#1a1e2c] text-slate-300 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-lg"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
