"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Menu, X, ArrowUpRight, Lock } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll);
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
    { label: "Projects & Research", href: "/projects" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ];

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-[0_2px_12px_rgba(23,29,46,0.04)]"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-200/70"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo & Identity */}
          <Link href="/" className="flex items-center gap-3 group focus-visible:ring-offset-2">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-sm shadow-brand-600/30 group-hover:bg-brand-700 transition-colors">
              <Shield className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-navy-900 text-sm sm:text-base tracking-tight leading-tight group-hover:text-brand-600 transition-colors">
                NTU Cyber Security Society
              </span>
              <span className="text-[11px] text-slate-500 font-medium tracking-normal">
                National Textile University, Faisalabad
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                    isActive
                      ? "text-brand-600 bg-brand-50/90 font-semibold"
                      : "text-slate-600 hover:text-navy-900 hover:bg-slate-100/70"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Portal Link & Join CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/admin"
              className="p-2 text-slate-400 hover:text-navy-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Admin Control Center"
              aria-label="Admin Control Center"
            >
              <Lock className="w-4 h-4" />
            </Link>
            <Link
              href="/contact#join"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 active:scale-[0.98] transition-all shadow-sm shadow-brand-600/25"
            >
              <span>Join Society</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <Link
              href="/admin"
              className="p-2 text-slate-400 hover:text-navy-900 rounded-lg"
              title="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:text-navy-900 hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-brand-600 bg-brand-50 font-semibold"
                      : "text-slate-700 hover:text-navy-900 hover:bg-slate-50"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/contact#join"
              className="w-full text-center py-2.5 px-4 rounded-lg bg-brand-600 text-white font-semibold text-xs hover:bg-brand-700 transition-colors shadow-sm"
            >
              Join the Society
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
