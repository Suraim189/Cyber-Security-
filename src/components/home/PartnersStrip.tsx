"use client";

import React from "react";
import { Shield, Award, Terminal, Cpu, CheckCircle2, Globe, GraduationCap } from "lucide-react";

export function PartnersStrip() {
  const partners = [
    {
      name: "NTU Computer Science Dept",
      type: "Academic Patron",
      icon: GraduationCap,
      accent: "text-cyber-cyan border-cyber-cyan/30",
    },
    {
      name: "IEEE NTU Student Branch",
      type: "Technical Partner",
      icon: Cpu,
      accent: "text-blue-400 border-blue-500/30",
    },
    {
      name: "TryHackMe Academic",
      type: "Lab Partner",
      icon: Terminal,
      accent: "text-red-400 border-red-500/30",
    },
    {
      name: "HackTheBox University",
      type: "Wargame Platform",
      icon: Shield,
      accent: "text-emerald-400 border-emerald-500/30",
    },
    {
      name: "National Cyber Olympiad",
      type: "Collegiate CTF",
      icon: Award,
      accent: "text-amber-400 border-amber-500/30",
    },
  ];

  return (
    <section className="py-8 bg-cyber-950 border-b border-cyber-border/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
            <span className="text-white font-bold uppercase tracking-wider">
              Academic &amp; Industry Affiliations
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Verified Partner Network // 2026-2027
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {partners.map((partner, idx) => {
            const Icon = partner.icon;
            return (
              <div
                key={idx}
                className="bg-cyber-900/60 border border-cyber-border rounded-xl p-3.5 flex flex-col justify-between hover:border-cyber-cyan/40 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`p-1.5 rounded-lg border bg-cyber-950 ${partner.accent}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase">
                    VERIFIED
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyber-cyan transition-colors truncate">
                    {partner.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {partner.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
