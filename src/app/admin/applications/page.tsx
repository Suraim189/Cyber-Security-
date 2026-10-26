"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Search, Clock, Mail, GraduationCap, X, Loader2 } from "lucide-react";
import { DataService } from "@/lib/data-service";
import { MembershipApplication } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<MembershipApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApp, setSelectedApp] = useState<MembershipApplication | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setIsLoading(true);
    const data = await DataService.getMembershipApplications();
    setApplications(data);
    setIsLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: "pending" | "approved" | "rejected") => {
    await DataService.updateApplicationStatus(id, newStatus);
    loadApplications();
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
  };

  const filtered = applications.filter((app) => {
    const matchesSearch =
      app.full_name.toLowerCase().includes(search.toLowerCase()) ||
      app.student_id.toLowerCase().includes(search.toLowerCase()) ||
      app.department.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-900">Membership Applications</h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Review student applications for NTU Cyber Security Society.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="surface-card p-4 border-charcoal-200 bg-white flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-2 flex-1 w-full">
          <Search className="w-4 h-4 text-charcoal-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, ID, or department..."
            className="w-full text-xs text-charcoal-900 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-charcoal-500 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded border border-charcoal-200 text-xs text-charcoal-800 bg-white"
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="surface-card border-charcoal-200 bg-white overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-charcoal-500 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-brand-700" />
            <span>Loading submissions...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-charcoal-500">
            No applications found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal-700">
              <thead className="bg-surface-muted border-b border-surface-border text-charcoal-500 font-mono uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Department / Year</th>
                  <th className="py-3 px-4">Interests</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100">
                {filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-charcoal-900">
                      <div>{app.full_name}</div>
                      <div className="text-[11px] font-normal text-charcoal-500 font-mono">{app.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-charcoal-700">
                      {app.student_id}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-600">
                      <div>{app.department}</div>
                      <div className="text-[11px] text-charcoal-400">{app.year_of_study}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {app.interests.slice(0, 2).map((interest) => (
                          <span key={interest} className="px-1.5 py-0.5 rounded text-[10px] bg-charcoal-100">
                            {interest}
                          </span>
                        ))}
                        {app.interests.length > 2 && (
                          <span className="text-[10px] text-charcoal-400">+{app.interests.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium font-mono uppercase ${
                          app.status === "approved"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : app.status === "rejected"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-2.5 py-1 rounded bg-brand-50 text-brand-700 font-medium hover:bg-brand-100 transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="surface-card bg-white max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
              <div>
                <h2 className="text-base font-bold text-charcoal-900">
                  {selectedApp.full_name}
                </h2>
                <p className="text-xs font-mono text-charcoal-500">
                  {selectedApp.student_id} • {selectedApp.department}
                </p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-charcoal-400 hover:text-charcoal-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-charcoal-700">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-surface-muted border border-charcoal-200">
                <div>
                  <span className="text-charcoal-500 block text-[11px]">Email Address</span>
                  <span className="font-semibold">{selectedApp.email}</span>
                </div>
                <div>
                  <span className="text-charcoal-500 block text-[11px]">Academic Year</span>
                  <span className="font-semibold">{selectedApp.year_of_study}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-charcoal-900 block mb-1">Selected Technical Interests</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedApp.interests.map((item) => (
                    <span key={item} className="tech-badge">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {selectedApp.prior_experience && (
                <div>
                  <span className="font-semibold text-charcoal-900 block mb-1">Prior Experience</span>
                  <p className="p-2.5 rounded bg-surface-muted text-charcoal-600 leading-relaxed border border-charcoal-200">
                    {selectedApp.prior_experience}
                  </p>
                </div>
              )}

              <div>
                <span className="font-semibold text-charcoal-900 block mb-1">Motivation Statement</span>
                <p className="p-2.5 rounded bg-surface-muted text-charcoal-600 leading-relaxed border border-charcoal-200">
                  {selectedApp.motivation}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between">
              <span className="text-xs text-charcoal-500 font-mono">
                Current: <strong className="uppercase">{selectedApp.status}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusChange(selectedApp.id, "rejected")}
                  className="px-3 py-1.5 rounded border border-red-200 text-red-700 hover:bg-red-50 text-xs font-medium"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleStatusChange(selectedApp.id, "approved")}
                  className="px-3 py-1.5 rounded bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-medium"
                >
                  Approve Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
