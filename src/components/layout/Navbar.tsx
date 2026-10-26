"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  Menu,
  X,
  ArrowUpRight,
  Lock,
  Activity,
  CheckCircle,
  FileCheck,
  UserCheck,
} from "lucide-react";
import { CommandPalette } from "@/components/layout/CommandPalette";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Events", href: "/events" },
    { label: "Projects", href: "/projects" }, // Shortened from "Projects & Research"
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ];

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-cyber-950/92 backdrop-blur-md border-b border-cyber-border shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
            : "bg-cyber-950/80 backdrop-blur-sm border-b border-cyber-border/60"
        }`}
      >
        {/* Scroll Progress Bar */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-blue-600 via-cyber-cyan to-cyan-300 shadow-[0_0_10px_#00f0ff] z-50 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* One-Line Logo & Identity */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group whitespace-nowrap focus-visible:ring-offset-2 flex-shrink-0"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyber-blue to-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-cyber-glow transition-all border border-blue-400/30">
                <Shield className="w-4.5 h-4.5 stroke-[2.2] text-cyber-cyan group-hover:scale-105 transition-transform" />
              </div>

              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-sm sm:text-base tracking-tight group-hover:text-cyber-cyan transition-colors">
                  NTU Cyber Security Society
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30">
                  <Activity className="w-2 h-2 animate-pulse" /> LAB-ACTIVE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? "text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30 font-semibold shadow-sm"
                        : "text-slate-300 hover:text-white hover:bg-cyber-800/60"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <CommandPalette />

              <Link
                href="/verify"
                className="px-2.5 py-1.5 text-slate-300 hover:text-cyber-cyan hover:bg-cyber-900 rounded-lg transition-colors border border-transparent hover:border-cyber-border text-xs font-mono flex items-center gap-1"
                title="Verify Official Certificates & Credentials"
              >
                <FileCheck className="w-3.5 h-3.5 text-cyber-cyan" />
                <span className="hidden xl:inline">Verify</span>
              </Link>

              <Link
                href="/admin"
                className="p-2 text-slate-400 hover:text-cyber-cyan hover:bg-cyber-900 rounded-lg transition-colors border border-transparent hover:border-cyber-border"
                title="Admin Control Center"
                aria-label="Admin Control Center"
              >
                <Lock className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/contact#join"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-cyber-blue text-white text-xs font-mono font-semibold hover:bg-blue-600 active:scale-[0.98] transition-all shadow-md shadow-blue-600/30 border border-blue-400/40 whitespace-nowrap"
              >
                <span>Join</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Mobile Bar Actions */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <CommandPalette />

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-slate-300 hover:text-white hover:bg-cyber-850 rounded-lg focus:outline-none"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-5 h-5 text-cyber-cyan" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full-Feature Slide-Out Drawer */}
        {isOpen && (
          <div className="lg:hidden border-b border-cyber-border bg-cyber-950/98 px-5 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-mono font-medium transition-colors ${
                      isActive
                        ? "text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-cyber-900"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Verification & Member Tools in Mobile Drawer */}
            <div className="pt-3 border-t border-cyber-border/70 space-y-2">
              <Link
                href="/verify"
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-cyber-900 border border-cyber-border text-xs font-mono text-slate-300 hover:text-cyber-cyan"
              >
                <span className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-cyber-cyan" />
                  Verify Certificate / Credential
                </span>
                <span className="text-slate-500 text-[10px]">/verify</span>
              </Link>

              <Link
                href="/dashboard"
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-cyber-900 border border-cyber-border text-xs font-mono text-slate-300 hover:text-cyber-cyan"
              >
                <span className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  Member Dashboard &amp; XP
                </span>
                <span className="text-slate-500 text-[10px]">/dashboard</span>
              </Link>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/contact#join"
                className="w-full text-center py-2.5 px-4 rounded-xl bg-cyber-cyan text-cyber-950 font-mono font-bold text-xs hover:bg-cyan-300 transition-colors shadow-lg shadow-cyber-cyan/20"
              >
                Apply for Society Membership
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
