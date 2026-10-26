"use client";

import React, { useState, useEffect } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import {
  Search,
  Shield,
  Calendar,
  Users,
  Cpu,
  BookOpen,
  Send,
  Lock,
  Terminal,
  ExternalLink,
  X,
} from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle on Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName))) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigateTo = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <>
      {/* Keyboard Trigger Icon Pill for Navbar */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyber-950/90 border border-cyber-border text-slate-400 hover:text-white hover:border-cyber-cyan/50 text-xs font-mono transition-all"
        title="Open Command Palette (Ctrl+K or ⌘K)"
        aria-label="Open Command Palette"
      >
        <Search className="w-3.5 h-3.5 text-cyber-cyan" />
        <kbd className="hidden xl:inline-block px-1 py-0.2 rounded bg-cyber-900 border border-cyber-border text-[9px] text-slate-400 font-mono">
          ⌘K
        </kbd>
      </button>

      {/* Modal Dialog */}
      {open && (
        <div className="fixed inset-0 z-50 bg-cyber-950/80 backdrop-blur-md flex items-start justify-center pt-20 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-cyber-900 border border-cyber-cyan/40 shadow-2xl overflow-hidden font-mono text-xs animate-in zoom-in-95 duration-150">
            <Command className="w-full">
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-cyber-border bg-cyber-950">
                <Search className="w-4 h-4 text-cyber-cyan" />
                <Command.Input
                  placeholder="Type a page, directive or search term..."
                  className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm font-sans"
                  autoFocus
                />
                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Suggestions List */}
              <Command.List className="max-h-80 overflow-y-auto p-3 space-y-1 text-slate-300">
                <Command.Empty className="p-4 text-center text-slate-500 font-mono">
                  No matching cyber directives found.
                </Command.Empty>

                <Command.Group heading="NAVIGATION">
                  <Command.Item
                    onSelect={() => navigateTo("/")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-cyber-800 hover:text-cyber-cyan cursor-pointer transition-colors"
                  >
                    <Shield className="w-4 h-4 text-cyber-cyan" />
                    <span className="font-sans text-sm text-white">Homepage &amp; Hero</span>
                    <span className="ml-auto text-[11px] text-slate-500">/</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => navigateTo("/about")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-cyber-800 hover:text-cyber-cyan cursor-pointer transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-cyber-cyan" />
                    <span className="font-sans text-sm text-white">Society Doctrine &amp; Mission</span>
                    <span className="ml-auto text-[11px] text-slate-500">/about</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => navigateTo("/team")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-cyber-800 hover:text-cyber-cyan cursor-pointer transition-colors"
                  >
                    <Users className="w-4 h-4 text-cyber-cyan" />
                    <span className="font-sans text-sm text-white">Leadership &amp; Security Wings</span>
                    <span className="ml-auto text-[11px] text-slate-500">/team</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => navigateTo("/events")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-cyber-800 hover:text-cyber-cyan cursor-pointer transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-cyber-cyan" />
                    <span className="font-sans text-sm text-white">Workshops &amp; CTF Calendar</span>
                    <span className="ml-auto text-[11px] text-slate-500">/events</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => navigateTo("/projects")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-cyber-800 hover:text-cyber-cyan cursor-pointer transition-colors"
                  >
                    <Cpu className="w-4 h-4 text-cyber-cyan" />
                    <span className="font-sans text-sm text-white">Research &amp; Security Tooling</span>
                    <span className="ml-auto text-[11px] text-slate-500">/projects</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => navigateTo("/resources")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-cyber-800 hover:text-cyber-cyan cursor-pointer transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-cyber-cyan" />
                    <span className="font-sans text-sm text-white">Tactical Knowledge Library</span>
                    <span className="ml-auto text-[11px] text-slate-500">/resources</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => navigateTo("/contact#join")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-cyber-800 hover:text-cyber-cyan cursor-pointer transition-colors"
                  >
                    <Send className="w-4 h-4 text-cyber-cyan" />
                    <span className="font-sans text-sm text-white">Enlist / Join Society</span>
                    <span className="ml-auto text-[11px] text-slate-500">/contact</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="SECURITY &amp; CONTROL">
                  <Command.Item
                    onSelect={() => navigateTo("/security")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-cyber-800 hover:text-cyber-cyan cursor-pointer transition-colors"
                  >
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span className="font-sans text-sm text-white">Public Security &amp; Vulnerability Disclosure</span>
                    <span className="ml-auto text-[11px] text-slate-500">/security</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => navigateTo("/admin")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-cyber-800 hover:text-cyber-cyan cursor-pointer transition-colors"
                  >
                    <Terminal className="w-4 h-4 text-amber-400" />
                    <span className="font-sans text-sm text-white">Administrative Portal</span>
                    <span className="ml-auto text-[11px] text-slate-500">/admin</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>

              {/* Footer Helper */}
              <div className="p-3 bg-cyber-950 border-t border-cyber-border flex items-center justify-between text-[11px] text-slate-500">
                <span>Navigate with ↑ ↓ and Enter</span>
                <span>ESC to close</span>
              </div>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
