"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Search, Mail, Trash2, CheckCircle, Archive, MessageSquare } from "lucide-react";

interface ContactMsg {
  id: string;
  senderName: string;
  email: string;
  projectType: string;
  message: string;
  status: string;
  createdAt: Date | string;
}

export default function ContactClient({ initialMessages }: { initialMessages: ContactMsg[] }) {
  const [messages, setMessages] = useState<ContactMsg[]>(initialMessages);
  const [search, setSearch] = useState("");
  const [selectedMsg, setSelectedMsg] = useState<ContactMsg | null>(messages[0] || null);

  const filtered = messages.filter(
    (m) =>
      m.senderName.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.projectType.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        setMessages(
          messages.map((m) => (m.id === id ? { ...m, status } : m))
        );
        if (selectedMsg?.id === id) {
          setSelectedMsg({ ...selectedMsg, status });
        }
      }
    } catch {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/admin/contact?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        const nextMsgs = messages.filter((m) => m.id !== id);
        setMessages(nextMsgs);
        if (selectedMsg?.id === id) setSelectedMsg(nextMsgs[0] || null);
      }
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
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Proposals Inbox</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Inbound project requests and contact form inquiries.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* List Column */}
          <div className="lg:col-span-5 bg-[#12151e] border border-[#222738] rounded-3xl p-4 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#1a1e2c] border border-[#222738] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filtered.map((m) => {
                const isSelected = selectedMsg?.id === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMsg(m)}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all space-y-1.5 ${
                      isSelected
                        ? "bg-indigo-600/10 border-indigo-500/50"
                        : "bg-[#1a1e2c] border-[#222738] hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{m.senderName}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-mono font-semibold ${
                          m.status === "UNREAD"
                            ? "bg-rose-950/60 text-rose-400 border border-rose-800/40"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>

                    <div className="text-xs text-indigo-400 font-mono">{m.projectType}</div>
                    <div className="text-xs text-slate-400 line-clamp-1">{m.message}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Message Reader Column */}
          <div className="lg:col-span-7 bg-[#12151e] border border-[#222738] rounded-3xl p-8 space-y-6">
            {selectedMsg ? (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#222738] pb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedMsg.senderName}</h2>
                    <a
                      href={`mailto:${selectedMsg.email}`}
                      className="text-xs text-indigo-400 font-mono hover:underline"
                    >
                      {selectedMsg.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedMsg.status === "UNREAD" ? (
                      <button
                        onClick={() => handleUpdateStatus(selectedMsg.id, "READ")}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold"
                      >
                        Mark as Read
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateStatus(selectedMsg.id, "UNREAD")}
                        className="px-3 py-1.5 rounded-xl bg-[#1a1e2c] text-slate-400 border border-[#222738] text-xs font-mono"
                      >
                        Mark Unread
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(selectedMsg.id)}
                      className="p-2 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-400 hover:bg-rose-900/50"
                      title="Delete Proposal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-slate-500 font-semibold">
                    Requested Project Service
                  </span>
                  <div className="text-sm font-bold text-indigo-300 font-mono bg-[#1a1e2c] px-3 py-1.5 rounded-xl border border-[#222738] inline-block">
                    {selectedMsg.projectType}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-slate-500 font-semibold">
                    Proposal Message & Brief
                  </span>
                  <div className="p-6 rounded-2xl bg-[#1a1e2c] border border-[#222738] text-slate-200 text-sm leading-relaxed whitespace-pre-line font-sans">
                    {selectedMsg.message}
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-500 pt-4 border-t border-[#222738]">
                  Received Date: {new Date(selectedMsg.createdAt).toLocaleString()}
                </div>
              </div>
            ) : (
              <div className="py-20 text-center space-y-3 text-slate-500 font-mono text-xs">
                <MessageSquare className="w-8 h-8 mx-auto text-slate-600" />
                <p>Select a message from the left inbox to view details.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
