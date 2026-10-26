import React from "react";
import Link from "next/link";
import { Users, Calendar, FolderGit2, BookOpen, Inbox, ArrowRight, ShieldCheck, Plus } from "lucide-react";
import { DataService } from "@/lib/data-service";

export const metadata = {
  title: "Admin Dashboard Overview",
};

export default async function AdminDashboardPage() {
  const team = await DataService.getTeamMembers(false);
  const events = await DataService.getEvents(false);
  const projects = await DataService.getProjects(false);
  const resources = await DataService.getResources(false);
  const applications = await DataService.getMembershipApplications();

  const stats = [
    { label: "Team Members", value: team.length, href: "/admin/team", icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Events & CTFs", value: events.length, href: "/admin/events", icon: Calendar, color: "text-emerald-600 bg-emerald-50" },
    { label: "Active Projects", value: projects.length, href: "/admin/projects", icon: FolderGit2, color: "text-purple-600 bg-purple-50" },
    { label: "Curated Resources", value: resources.length, href: "/admin/resources", icon: BookOpen, color: "text-amber-600 bg-amber-50" },
    { label: "Membership Apps", value: applications.length, href: "/admin/applications", icon: Inbox, color: "text-rose-600 bg-rose-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="surface-card p-6 border-charcoal-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-900">
            Society Management Dashboard
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Maintain public listings, schedule lab workshops, and review student membership submissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/events"
            className="px-4 py-2 rounded-lg bg-brand-700 text-white text-xs font-semibold hover:bg-brand-800 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Event</span>
          </Link>
          <Link
            href="/admin/team"
            className="px-4 py-2 rounded-lg bg-white border border-charcoal-300 text-charcoal-700 text-xs font-semibold hover:bg-charcoal-50 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Member</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link
              key={i}
              href={stat.href}
              className="surface-card p-5 surface-card-hover flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-charcoal-500">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold text-charcoal-900 font-mono">
                {stat.value}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Split Section: Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Applications */}
        <div className="surface-card p-6 border-charcoal-200 bg-white">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-charcoal-100">
            <h2 className="text-base font-bold text-charcoal-900">
              Recent Membership Inquiries
            </h2>
            <Link
              href="/admin/applications"
              className="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {applications.length === 0 ? (
            <p className="text-xs text-charcoal-500 py-6 text-center italic">
              No pending applications at this time.
            </p>
          ) : (
            <div className="space-y-3">
              {applications.slice(0, 4).map((app) => (
                <div
                  key={app.id}
                  className="p-3 rounded-lg border border-charcoal-100 bg-surface-muted/60 flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-xs text-charcoal-900">{app.full_name}</div>
                    <div className="text-[11px] text-charcoal-500">{app.department} • {app.student_id}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase bg-amber-50 text-amber-700 border border-amber-200">
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Security & System Status */}
        <div className="surface-card p-6 border-charcoal-200 bg-white">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-charcoal-100">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-charcoal-900">
              Security Compliance & Database State
            </h2>
          </div>

          <div className="space-y-3 text-xs text-charcoal-600">
            <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-900 flex items-center justify-between">
              <span>Row Level Security (RLS)</span>
              <span className="font-semibold font-mono text-[11px]">ENFORCED</span>
            </div>

            <div className="p-3 rounded-lg bg-surface-muted border border-charcoal-200 flex items-center justify-between">
              <span>Storage Buckets</span>
              <span className="font-semibold font-mono text-[11px] text-charcoal-800">5 ACTIVE (Public Read)</span>
            </div>

            <div className="p-3 rounded-lg bg-surface-muted border border-charcoal-200 flex items-center justify-between">
              <span>Next.js Deployment Status</span>
              <span className="font-semibold font-mono text-[11px] text-brand-700">VERCEL READY</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
