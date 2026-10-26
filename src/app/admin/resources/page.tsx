"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Search, X, Loader2 } from "lucide-react";
import { DataService } from "@/lib/data-service";
import { EducationalResource, ResourceCategory } from "@/lib/types";

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRes, setEditingRes] = useState<Partial<EducationalResource> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    setIsLoading(true);
    const data = await DataService.getResources(false);
    setResources(data);
    setIsLoading(false);
  };

  const handleOpenAdd = () => {
    setEditingRes({
      title: "",
      category: "Roadmaps",
      difficulty_level: "Beginner",
      description: "",
      url: "https://",
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (r: EducationalResource) => {
    setEditingRes({ ...r });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Delete resource "${title}"?`)) {
      await DataService.deleteResource(id);
      loadResources();
    }
  };

  const handleTogglePublish = async (r: EducationalResource) => {
    await DataService.saveResource({ ...r, is_published: !r.is_published });
    loadResources();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRes || !editingRes.title || !editingRes.url) return;

    setIsSaving(true);
    await DataService.saveResource(editingRes);
    setIsSaving(false);
    setIsModalOpen(false);
    loadResources();
  };

  const filtered = resources.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase()) ||
      r.difficulty_level.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-900">Educational Resources Management</h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Curate verified security roadmaps, practice labs, and CTF platforms.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-lg bg-brand-700 text-white text-xs font-semibold hover:bg-brand-800 transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Resource</span>
        </button>
      </div>

      <div className="surface-card p-4 border-charcoal-200 bg-white flex items-center gap-3">
        <Search className="w-4 h-4 text-charcoal-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, category, or level..."
          className="w-full text-xs text-charcoal-900 focus:outline-none"
        />
      </div>

      <div className="surface-card border-charcoal-200 bg-white overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-charcoal-500 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-brand-700" />
            <span>Loading resources...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-charcoal-500">
            No resources found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal-700">
              <thead className="bg-surface-muted border-b border-surface-border text-charcoal-500 font-mono uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Target URL</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-charcoal-900">
                      {r.title}
                    </td>
                    <td className="py-3.5 px-4 text-brand-700 font-medium">
                      {r.category}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-charcoal-600">
                      {r.difficulty_level}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-500 max-w-xs truncate">
                      {r.url}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(r)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                          r.is_published
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-charcoal-100 text-charcoal-500 border border-charcoal-200"
                        }`}
                      >
                        {r.is_published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(r)}
                        className="p-1.5 text-charcoal-600 hover:text-brand-700 hover:bg-brand-50 rounded"
                        title="Edit Resource"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id, r.title)}
                        className="p-1.5 text-charcoal-400 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Delete Resource"
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

      {isModalOpen && editingRes && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="surface-card bg-white max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
              <h2 className="text-base font-bold text-charcoal-900">
                {editingRes.id ? "Edit Resource" : "Add Resource Link"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-charcoal-400 hover:text-charcoal-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingRes.title || ""}
                  onChange={(e) => setEditingRes({ ...editingRes, title: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-charcoal-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Category</label>
                  <select
                    value={editingRes.category || "Roadmaps"}
                    onChange={(e) => setEditingRes({ ...editingRes, category: e.target.value as ResourceCategory })}
                    className="w-full px-3 py-2 rounded border border-charcoal-200"
                  >
                    <option value="Roadmaps">Roadmaps</option>
                    <option value="Practice Labs">Practice Labs</option>
                    <option value="CTF Platforms">CTF Platforms</option>
                    <option value="Tools">Tools</option>
                    <option value="Documentation">Documentation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Difficulty Level</label>
                  <select
                    value={editingRes.difficulty_level || "Beginner"}
                    onChange={(e) =>
                      setEditingRes({
                        ...editingRes,
                        difficulty_level: e.target.value as "Beginner" | "Intermediate" | "Advanced",
                      })
                    }
                    className="w-full px-3 py-2 rounded border border-charcoal-200"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={editingRes.description || ""}
                  onChange={(e) => setEditingRes({ ...editingRes, description: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-charcoal-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">Resource URL</label>
                <input
                  type="url"
                  required
                  value={editingRes.url || ""}
                  onChange={(e) => setEditingRes({ ...editingRes, url: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-charcoal-200"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="res_pub_check"
                  checked={editingRes.is_published ?? true}
                  onChange={(e) => setEditingRes({ ...editingRes, is_published: e.target.checked })}
                  className="rounded border-charcoal-300 text-brand-600 focus:ring-brand-500"
                />
                <label htmlFor="res_pub_check" className="font-medium text-charcoal-800">
                  Visible on public resources directory
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
                  <span>Save Resource</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
