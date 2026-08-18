"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Plus, Edit2, Trash2, X, MessageSquare } from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string | null;
  quote: string;
  photoUrl?: string | null;
  website?: string | null;
  displayOrder: number;
  isPublished: boolean;
}

export default function TestimonialsClient({ initialItems }: { initialItems: TestimonialItem[] }) {
  const [items, setItems] = useState<TestimonialItem[]>(initialItems);
  const [editing, setEditing] = useState<Partial<TestimonialItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.name || !editing?.quote) return alert("Name and quote required");

    try {
      const method = editing.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/testimonials", {
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
      alert(err.message || "Failed to save testimonial");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
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
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Testimonial Manager</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Add authentic client endorsements. Note: Testimonials section automatically auto-hides if 0 items exist.
            </p>
          </div>

          <button
            onClick={() => {
              setEditing({
                name: "",
                role: "CEO & Founder",
                company: "",
                quote: "",
                displayOrder: items.length + 1,
                isPublished: true,
              });
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        </div>

        {/* Testimonials List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#12151e] border border-[#222738] rounded-3xl p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <p className="text-slate-300 text-sm italic leading-relaxed">"{item.quote}"</p>
                <div className="pt-2 border-t border-[#222738] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center">
                    {item.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{item.name}</div>
                    <div className="text-xs text-slate-400">
                      {item.role} {item.company && `• ${item.company}`}
                    </div>
                  </div>
                </div>
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
                  onClick={() => handleDelete(item.id, item.name)}
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
                  {editing.id ? "Edit Testimonial" : "New Testimonial"}
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
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={editing.name || ""}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Role *</label>
                    <input
                      type="text"
                      required
                      value={editing.role || ""}
                      onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Company</label>
                    <input
                      type="text"
                      value={editing.company || ""}
                      onChange={(e) => setEditing({ ...editing, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Quote *</label>
                  <textarea
                    required
                    rows={4}
                    value={editing.quote || ""}
                    onChange={(e) => setEditing({ ...editing, quote: e.target.value })}
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
                  Save Endorsement
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
