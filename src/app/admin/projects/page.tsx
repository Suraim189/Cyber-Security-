"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Search, X, Loader2 } from "lucide-react";
import { DataService } from "@/lib/data-service";
import { SocietyProject, ProjectDomain } from "@/lib/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<SocietyProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<SocietyProject> | null>(null);
  const [techStackInput, setTechStackInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    const data = await DataService.getProjects(false);
    setProjects(data);
    setIsLoading(false);
  };

  const handleOpenAdd = () => {
    setEditingProject({
      title: "",
      slug: "",
      domain: "Network Security",
      summary: "",
      detailed_description: "",
      tech_stack: ["Python"],
      lead_author: "NTU CSS Technical Wing",
      github_url: "",
      is_published: true,
    });
    setTechStackInput("Python");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: SocietyProject) => {
    setEditingProject({ ...p });
    setTechStackInput(p.tech_stack.join(", "));
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Delete project "${title}"?`)) {
      await DataService.deleteProject(id);
      loadProjects();
    }
  };

  const handleTogglePublish = async (p: SocietyProject) => {
    await DataService.saveProject({ ...p, is_published: !p.is_published });
    loadProjects();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    setIsSaving(true);
    const slug = editingProject.slug || editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const tech_stack = techStackInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    await DataService.saveProject({ ...editingProject, slug, tech_stack });
    setIsSaving(false);
    setIsModalOpen(false);
    loadProjects();
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.domain.toLowerCase().includes(search.toLowerCase()) ||
      p.lead_author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-900">Projects & Research Management</h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Maintain research initiatives, student security tools, and technical whitepapers.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-lg bg-brand-700 text-white text-xs font-semibold hover:bg-brand-800 transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="surface-card p-4 border-charcoal-200 bg-white flex items-center gap-3">
        <Search className="w-4 h-4 text-charcoal-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, domain, or lead author..."
          className="w-full text-xs text-charcoal-900 focus:outline-none"
        />
      </div>

      <div className="surface-card border-charcoal-200 bg-white overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-charcoal-500 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-brand-700" />
            <span>Loading projects...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-charcoal-500">
            No projects found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal-700">
              <thead className="bg-surface-muted border-b border-surface-border text-charcoal-500 font-mono uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Domain</th>
                  <th className="py-3 px-4">Lead Author</th>
                  <th className="py-3 px-4">Tech Stack</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100">
                {filtered.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-charcoal-900">
                      {proj.title}
                    </td>
                    <td className="py-3.5 px-4 text-brand-700 font-medium">
                      {proj.domain}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-600">{proj.lead_author}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {proj.tech_stack.slice(0, 3).map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-charcoal-100 font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(proj)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                          proj.is_published
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-charcoal-100 text-charcoal-500 border border-charcoal-200"
                        }`}
                      >
                        {proj.is_published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 text-charcoal-600 hover:text-brand-700 hover:bg-brand-50 rounded"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id, proj.title)}
                        className="p-1.5 text-charcoal-400 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Delete Project"
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

      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="surface-card bg-white max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
              <h2 className="text-base font-bold text-charcoal-900">
                {editingProject.id ? "Edit Project" : "Add Project / Research"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-charcoal-400 hover:text-charcoal-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-charcoal-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Domain</label>
                  <select
                    value={editingProject.domain || "Network Security"}
                    onChange={(e) => setEditingProject({ ...editingProject, domain: e.target.value as ProjectDomain })}
                    className="w-full px-3 py-2 rounded border border-charcoal-200"
                  >
                    <option value="Penetration Testing">Penetration Testing</option>
                    <option value="Network Security">Network Security</option>
                    <option value="Digital Forensics">Digital Forensics</option>
                    <option value="Cryptography">Cryptography</option>
                    <option value="Web App Security">Web App Security</option>
                    <option value="Threat Intelligence">Threat Intelligence</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Lead Author / Team</label>
                  <input
                    type="text"
                    required
                    value={editingProject.lead_author || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, lead_author: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-charcoal-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">Summary</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.summary || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-charcoal-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="e.g. Python, Docker, Nmap, PostgreSQL"
                  className="w-full px-3 py-2 rounded border border-charcoal-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">GitHub / Code URL</label>
                <input
                  type="url"
                  value={editingProject.github_url || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 rounded border border-charcoal-200"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="proj_pub_check"
                  checked={editingProject.is_published ?? true}
                  onChange={(e) => setEditingProject({ ...editingProject, is_published: e.target.checked })}
                  className="rounded border-charcoal-300 text-brand-600 focus:ring-brand-500"
                />
                <label htmlFor="proj_pub_check" className="font-medium text-charcoal-800">
                  Visible on public projects portfolio
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
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
