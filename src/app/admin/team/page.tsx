"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, CheckCircle2, XCircle, Search, Users, X, Loader2 } from "lucide-react";
import { DataService } from "@/lib/data-service";
import { TeamMember, MemberHierarchy } from "@/lib/types";

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    setIsLoading(true);
    const data = await DataService.getTeamMembers(false);
    setMembers(data);
    setIsLoading(false);
  };

  const handleOpenAdd = () => {
    setEditingMember({
      name: "",
      designation: "",
      hierarchy_order: 3,
      department: "Computer Science",
      bio: "",
      email: "",
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m: TeamMember) => {
    setEditingMember({ ...m });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      await DataService.deleteTeamMember(id);
      loadMembers();
    }
  };

  const handleTogglePublish = async (m: TeamMember) => {
    await DataService.saveTeamMember({ ...m, is_published: !m.is_published });
    loadMembers();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !editingMember.name || !editingMember.designation) return;

    setIsSaving(true);
    await DataService.saveTeamMember(editingMember);
    setIsSaving(false);
    setIsModalOpen(false);
    loadMembers();
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.designation.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-900">Team Directory Management</h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Maintain executive council rosters, domain leads, and faculty advisor entries.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-lg bg-brand-700 text-white text-xs font-semibold hover:bg-brand-800 transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member Profile</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="surface-card p-4 border-charcoal-200 bg-white flex items-center gap-3">
        <Search className="w-4 h-4 text-charcoal-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, role, or academic department..."
          className="w-full text-xs text-charcoal-900 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="surface-card border-charcoal-200 bg-white overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-charcoal-500 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-brand-700" />
            <span>Loading roster...</span>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-12 text-center text-xs text-charcoal-500">
            No team members found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal-700">
              <thead className="bg-surface-muted border-b border-surface-border text-charcoal-500 font-mono uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Member Name</th>
                  <th className="py-3 px-4">Designation</th>
                  <th className="py-3 px-4">Hierarchy Tier</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-charcoal-900">
                      {m.name}
                    </td>
                    <td className="py-3.5 px-4 text-brand-700 font-medium">
                      {m.designation}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      Tier {m.hierarchy_order}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-500">
                      {m.department}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(m)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                          m.is_published
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-charcoal-100 text-charcoal-500 border border-charcoal-200"
                        }`}
                      >
                        {m.is_published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(m)}
                        className="p-1.5 text-charcoal-600 hover:text-brand-700 hover:bg-brand-50 rounded"
                        title="Edit Profile"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(m.id, m.name)}
                        className="p-1.5 text-charcoal-400 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Delete Member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Add / Edit */}
      {isModalOpen && editingMember && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="surface-card bg-white max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
              <h2 className="text-base font-bold text-charcoal-900">
                {editingMember.id ? "Edit Team Profile" : "Add Team Profile"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-charcoal-400 hover:text-charcoal-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingMember.name || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-charcoal-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">Official Designation</label>
                <input
                  type="text"
                  required
                  value={editingMember.designation || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, designation: e.target.value })}
                  placeholder="e.g. Offensive Security Lead / Vice President"
                  className="w-full px-3 py-2 rounded border border-charcoal-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Hierarchy Order</label>
                  <select
                    value={editingMember.hierarchy_order || 3}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        hierarchy_order: Number(e.target.value) as MemberHierarchy,
                      })
                    }
                    className="w-full px-3 py-2 rounded border border-charcoal-200"
                  >
                    <option value={1}>1 - Faculty Advisor</option>
                    <option value={2}>2 - President / VP</option>
                    <option value={3}>3 - Executive Body</option>
                    <option value={4}>4 - Technical Lead</option>
                    <option value={5}>5 - Member / Volunteer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Department</label>
                  <input
                    type="text"
                    value={editingMember.department || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, department: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-charcoal-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">Bio / Profile Notes</label>
                <textarea
                  rows={2}
                  value={editingMember.bio || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-charcoal-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">Email</label>
                <input
                  type="email"
                  value={editingMember.email || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-charcoal-200"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pub_check"
                  checked={editingMember.is_published ?? true}
                  onChange={(e) => setEditingMember({ ...editingMember, is_published: e.target.checked })}
                  className="rounded border-charcoal-300 text-brand-600 focus:ring-brand-500"
                />
                <label htmlFor="pub_check" className="font-medium text-charcoal-800">
                  Visible on public website
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded border border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 rounded bg-brand-700 text-white font-medium hover:bg-brand-800 disabled:opacity-60 flex items-center gap-1.5"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
