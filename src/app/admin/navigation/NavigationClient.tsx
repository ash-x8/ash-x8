"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Plus, Edit2, Trash2, X, Menu } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  category?: string | null;
  displayOrder: number;
  enabled: boolean;
}

export default function NavigationClient({ initialItems }: { initialItems: NavItem[] }) {
  const [items, setItems] = useState<NavItem[]>(initialItems);
  const [editing, setEditing] = useState<Partial<NavItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.label || !editing?.href) return alert("Label and href required");

    try {
      const method = editing.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/navigation", {
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
      alert(err.message || "Failed to save navigation item");
    }
  };

  const handleDelete = async (id: string, label: string) => {
    if (!confirm(`Delete link "${label}"?`)) return;
    try {
      const res = await fetch(`/api/admin/navigation?id=${id}`, { method: "DELETE" });
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
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Navigation Menu Manager</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Add, edit, or toggle header navigation links and dropdown categories.
            </p>
          </div>

          <button
            onClick={() => {
              setEditing({
                label: "",
                href: "/",
                category: "Main",
                displayOrder: items.length + 1,
                enabled: true,
              });
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add Navigation Item</span>
          </button>
        </div>

        {/* Navigation List */}
        <div className="bg-[#12151e] border border-[#222738] rounded-3xl p-6 space-y-3 max-w-3xl">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-[#1a1e2c] border border-[#222738] flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <Menu className="w-4 h-4 text-slate-500" />
                <div>
                  <div className="font-bold text-sm text-white">{item.label}</div>
                  <div className="text-xs text-indigo-400 font-mono">{item.href}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-500 uppercase">{item.category}</span>
                <button
                  onClick={() => {
                    setEditing(item);
                    setIsModalOpen(true);
                  }}
                  className="p-1.5 rounded-lg bg-[#12151e] text-slate-400 hover:text-indigo-400"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.label)}
                  className="p-1.5 rounded-lg bg-[#12151e] text-slate-400 hover:text-rose-400"
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
              className="bg-[#12151e] border border-[#222738] rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl animate-in zoom-in-95"
            >
              <div className="flex items-center justify-between border-b border-[#222738] pb-4">
                <h2 className="text-xl font-bold text-white">
                  {editing.id ? "Edit Navigation Link" : "New Navigation Link"}
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
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Label *</label>
                  <input
                    type="text"
                    required
                    value={editing.label || ""}
                    onChange={(e) => setEditing({ ...editing, label: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Target URL / Route *</label>
                  <input
                    type="text"
                    required
                    value={editing.href || ""}
                    onChange={(e) => setEditing({ ...editing, href: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Category</label>
                  <select
                    value={editing.category || "Main"}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                  >
                    <option value="Main">Main Navbar</option>
                    <option value="Work">Work Dropdown</option>
                    <option value="Footer">Footer Links</option>
                  </select>
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
                  Save Link
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
