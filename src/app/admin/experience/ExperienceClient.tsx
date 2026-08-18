"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Plus, Edit2, Trash2, X, Award } from "lucide-react";

interface ExperienceItem {
  id: string;
  dateRange: string;
  title: string;
  company?: string | null;
  description: string;
  category?: string | null;
  displayOrder: number;
  isActive: boolean;
}

export default function ExperienceClient({ initialItems }: { initialItems: ExperienceItem[] }) {
  const [items, setItems] = useState<ExperienceItem[]>(initialItems);
  const [editing, setEditing] = useState<Partial<ExperienceItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.title || !editing?.dateRange) return alert("Title and Date Range required");

    try {
      const method = editing.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/experience", {
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
      alert(err.message || "Failed to save experience item");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete experience entry "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/experience?id=${id}`, { method: "DELETE" });
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
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Experience Journey Manager</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Add and order career timeline entries displayed on the About page.
            </p>
          </div>

          <button
            onClick={() => {
              setEditing({
                dateRange: "2024 - Present",
                title: "",
                company: "",
                description: "",
                category: "Leadership",
                displayOrder: items.length + 1,
                isActive: true,
              });
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add Experience Entry</span>
          </button>
        </div>

        {/* Experience Items List */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#12151e] border border-[#222738] rounded-2xl p-6 flex items-center justify-between gap-6 hover:border-indigo-500/50 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-950/60 text-indigo-400 border border-indigo-800/40">
                    {item.dateRange}
                  </span>
                  {item.category && (
                    <span className="text-xs font-mono text-slate-500 uppercase">{item.category}</span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {item.title} {item.company && <span className="text-indigo-400">@ {item.company}</span>}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">{item.description}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => {
                    setEditing(item);
                    setIsModalOpen(true);
                  }}
                  className="p-2 rounded-lg bg-[#1a1e2c] text-slate-400 hover:text-indigo-400"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-2 rounded-lg bg-[#1a1e2c] text-slate-400 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
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
                  {editing.id ? "Edit Experience Entry" : "New Experience Entry"}
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Date Range *</label>
                    <input
                      type="text"
                      required
                      value={editing.dateRange || ""}
                      onChange={(e) => setEditing({ ...editing, dateRange: e.target.value })}
                      placeholder="e.g. 2022 - Present"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Category</label>
                    <input
                      type="text"
                      value={editing.category || ""}
                      onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                      placeholder="e.g. Leadership"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={editing.title || ""}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Company / Studio</label>
                  <input
                    type="text"
                    value={editing.company || ""}
                    onChange={(e) => setEditing({ ...editing, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Description</label>
                  <textarea
                    rows={3}
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
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
