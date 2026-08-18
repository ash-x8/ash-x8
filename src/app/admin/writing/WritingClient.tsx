"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Plus, Edit2, Trash2, X, Upload, BookOpen } from "lucide-react";

interface WritingItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt?: string | null;
  content?: string | null;
  authorAlias?: string | null;
  coverImage?: string | null;
  publicationDate?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
}

export default function WritingClient({ initialItems }: { initialItems: WritingItem[] }) {
  const [items, setItems] = useState<WritingItem[]>(initialItems);
  const [editing, setEditing] = useState<Partial<WritingItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const categories = ["Creative Non-Fiction", "Short Story", "Essay", "Poetry", "Article", "Review"];
  const authorAliases = ["Writer Ash", "Writer Tizzy", "Ash Wickramasinghe", "Kushan A Wickramasinghe"];

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

      setEditing((prev) => ({ ...prev, coverImage: data.url }));
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
      const res = await fetch("/api/admin/writing", {
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
      alert(err.message || "Failed to save writing piece");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete writing piece "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/writing?id=${id}`, { method: "DELETE" });
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
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Writing & Literature CMS</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Manage authored works, short stories, essays, and publications for Writer Ash / Writer Tizzy.
            </p>
          </div>

          <button
            onClick={() => {
              setEditing({
                title: "",
                category: "Creative Non-Fiction",
                excerpt: "",
                content: "",
                authorAlias: "Writer Ash",
                coverImage: "",
                publicationDate: new Date().toISOString().split("T")[0],
                isFeatured: true,
                isPublished: true,
                displayOrder: items.length + 1,
              });
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-amber-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add Writing Piece</span>
          </button>
        </div>

        {/* Writing Items List */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#12151e] border border-[#222738] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-amber-500/40 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 text-amber-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1a1e2c] text-amber-400 font-semibold uppercase">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">By {item.authorAlias || "Writer Ash"}</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">{item.title}</h3>
                  {item.excerpt && <p className="text-slate-400 text-sm line-clamp-2">{item.excerpt}</p>}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  onClick={() => {
                    setEditing(item);
                    setIsModalOpen(true);
                  }}
                  className="p-2.5 rounded-xl bg-[#1a1e2c] text-slate-300 hover:text-amber-400 transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-2.5 rounded-xl bg-[#1a1e2c] text-slate-300 hover:text-rose-400 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Editor */}
        {isModalOpen && editing && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <form
              onSubmit={handleSave}
              className="bg-[#12151e] border border-[#222738] rounded-3xl p-8 max-w-2xl w-full space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-[#222738] pb-4">
                <h2 className="text-xl font-bold text-white">
                  {editing.id ? "Edit Writing Piece" : "New Writing Piece"}
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
                    <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Category *</label>
                    <select
                      value={editing.category || "Creative Non-Fiction"}
                      onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Author Alias *</label>
                    <select
                      value={editing.authorAlias || "Writer Ash"}
                      onChange={(e) => setEditing({ ...editing, authorAlias: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                    >
                      {authorAliases.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Excerpt / Summary</label>
                  <textarea
                    rows={2}
                    value={editing.excerpt || ""}
                    onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Full Story / Article Content</label>
                  <textarea
                    rows={6}
                    value={editing.content || ""}
                    onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                    placeholder="Write or paste markdown/text content here..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Cover Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editing.coverImage || ""}
                      onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none font-mono"
                    />
                    <label className="px-3 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-xs font-mono text-amber-400 cursor-pointer flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploading ? "..." : "Upload"}</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
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
                  className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-all shadow-lg"
                >
                  Save Piece
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
