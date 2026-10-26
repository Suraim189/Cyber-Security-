"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FolderGit2, 
  BookOpen, 
  Inbox, 
  LogOut, 
  ExternalLink, 
  Shield 
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/admin/login");
  };

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Team Members", href: "/admin/team", icon: Users },
    { label: "Events & Workshops", href: "/admin/events", icon: Calendar },
    { label: "Projects & Research", href: "/admin/projects", icon: FolderGit2 },
    { label: "Educational Resources", href: "/admin/resources", icon: BookOpen },
    { label: "Membership Applications", href: "/admin/applications", icon: Inbox },
  ];

  return (
    <aside className="w-64 bg-charcoal-900 text-charcoal-300 min-h-screen flex flex-col justify-between border-r border-charcoal-800">
      <div>
        {/* Header */}
        <div className="p-6 border-b border-charcoal-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-600 text-white flex items-center justify-center shadow-inner">
            <Shield className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <div className="font-bold text-white text-sm tracking-tight leading-none">
              NTU CSS Admin
            </div>
            <div className="text-[11px] text-charcoal-400 font-mono mt-1">
              Control Center
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1 text-sm font-medium">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-brand-700 text-white font-semibold"
                    : "text-charcoal-400 hover:text-white hover:bg-charcoal-800/80"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-charcoal-800 space-y-2 text-xs">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-charcoal-400 hover:text-white hover:bg-charcoal-800 rounded-lg transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors text-left"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
