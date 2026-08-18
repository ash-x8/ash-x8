"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Plus, Edit2, Trash2, Save, X, CheckCircle, XCircle } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  longDesc?: string | null;
  icon?: string | null;
  displayOrder: number;
  isActive: boolean;
}

export default function ServicesClient({ initialServices }: { initialServices: ServiceItem[] }) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [editing, setEditing] = useState<Partial<ServiceItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.title || !editing?.shortDesc) return alert("Title and description required");

    try {
      const method = editing.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (editing.id) {
        setServices(services.map((s) => (s.id === editing.id ? data.service : s)));
      } else {
        setServices([...services, data.service]);
      }

      setIsModalOpen(false);
      setEditing(null);
    } catch (err: any) {
      alert(err.message || "Failed to save service");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete service "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
      if (res.ok) setServices(services.filter((s) => s.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleToggleActive = async (s: ServiceItem) => {
    try {
      const updated = { ...s, isActive: !s.isActive };
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) setServices(services.map((item) => (item.id === s.id ? updated : item)));
    } catch {
      alert("Toggle failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex">
      <AdminSidebar />

      <main className="flex-1 lg:pl-64 p-6 sm:p-10 space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-[#222738]">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Services Manager</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Add, edit, reorder, or toggle active services on the public website.
            </p>
          </div>

          <button
            onClick={() => {
              setEditing({
                title: "",
                slug: "",
                shortDesc: "",
                longDesc: "",
                icon: "Briefcase",
                displayOrder: services.length + 1,
                isActive: true,
              });
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-[#12151e] border border-[#222738] rounded-3xl p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-400">0{s.displayOrder}</span>
                  <button
                    onClick={() => handleToggleActive(s)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border font-semibold flex items-center gap-1 ${
                      s.isActive
                        ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/40"
                        : "bg-rose-950/60 text-rose-400 border-rose-800/40"
                    }`}
                  >
                    {s.isActive ? "Active" : "Hidden"}
                  </button>
                </div>

                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{s.shortDesc}</p>
              </div>

              <div className="pt-4 border-t border-[#222738] flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    setEditing(s);
                    setIsModalOpen(true);
                  }}
                  className="p-2 rounded-lg bg-[#1a1e2c] text-slate-400 hover:text-indigo-400"
                  title="Edit Service"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(s.id, s.title)}
                  className="p-2 rounded-lg bg-[#1a1e2c] text-slate-400 hover:text-rose-400"
                  title="Delete Service"
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
                  {editing.id ? "Edit Service" : "New Service"}
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

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">
                    Short Description *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={editing.shortDesc || ""}
                    onChange={(e) => setEditing({ ...editing, shortDesc: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">
                    Long Detailed Description
                  </label>
                  <textarea
                    rows={3}
                    value={editing.longDesc || ""}
                    onChange={(e) => setEditing({ ...editing, longDesc: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Display Order</label>
                    <input
                      type="number"
                      value={editing.displayOrder || 1}
                      onChange={(e) => setEditing({ ...editing, displayOrder: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Icon Identifier</label>
                    <input
                      type="text"
                      value={editing.icon || "Briefcase"}
                      onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                      placeholder="Smartphone, Globe, Layout, Palette"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none font-mono"
                    />
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
                  className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-lg"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
