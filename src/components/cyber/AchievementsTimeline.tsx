"use client";

import React, { useState } from "react";
import { Trophy, Award, Flag, ShieldCheck, Flame, Star, Calendar } from "lucide-react";

interface Achievement {
  year: string;
  title: string;
  competition: string;
  rank: string;
  category: "National CTF" | "Collegiate" | "CVE Research" | "University";
  description: string;
  stats: string;
}

export function AchievementsTimeline() {
  const [filter, setFilter] = useState<string>("All");

  const achievements: Achievement[] = [
    {
      year: "2026",
      title: "Top 10 Finalist — Collegiate Cyber Olympiad",
      competition: "National Cyber Olympiad Pakistan",
      rank: "Rank #7 National",
      category: "National CTF",
      description:
        "The NTU CSS CTF Squad cleared intense multi-stage qualifiers in web penetration testing and binary reverse engineering, placing among the top 10 universities in Pakistan.",
      stats: "2,450 Pts • 18 Solves",
    },
    {
      year: "2025",
      title: "1st Place Champions — Inter-University Qualifier",
      competition: "Air University Regional Hackathon",
      rank: "1st Place 🏆",
      category: "Collegiate",
      description:
        "Secured first place in the 12-hour Jeopardy wargame by capturing first blood on advanced pwnable buffer overflow and memory carving challenges.",
      stats: "1st of 32 Teams • 4 First Bloods",
    },
    {
      year: "2025",
      title: "Top 3% Global Percentile Ranking",
      competition: "HackTheBox University CTF",
      rank: "Top 3% Global",
      category: "National CTF",
      description:
        "Represented National Textile University globally in the 72-hour international university CTF wargames, solving post-quantum cryptographic and kernel exploit challenges.",
      stats: "Global Rank #142 of 4,800+",
    },
    {
      year: "2024",
      title: "15+ Responsible Vulnerability Disclosures",
      competition: "University Lab Security Audits",
      rank: "Hall of Fame",
      category: "CVE Research",
      description:
        "Identified, documented, and safely reported 15 critical misconfigurations and unauthenticated endpoints across sandbox targets under verified academic supervision.",
      stats: "15 CVEs & Fixes Coordinated",
    },
    {
      year: "2024",
      title: "Inaugural Intra-NTU CTF Championship",
      competition: "National Textile University",
      rank: "200+ Participants",
      category: "University",
      description:
        "Organized the first campus-wide 24-hour jeopardy hacking competition with custom binary challenges authored by society leads.",
      stats: "45 Teams • 5 Tracks",
    },
  ];

  const categories = ["All", "National CTF", "Collegiate", "CVE Research", "University"];

  const filtered =
    filter === "All"
      ? achievements
      : achievements.filter((a) => a.category === filter);

  return (
    <section className="py-16 bg-cyber-900 border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>Competitive Record</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              CTF Achievements &amp; Track Record
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Verified tournament victories, collegiate rankings, and responsible vulnerability disclosure milestones.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  filter === cat
                    ? "bg-amber-500/15 text-amber-400 border-amber-500/40 font-bold"
                    : "bg-cyber-950 text-slate-400 border-cyber-border hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Cards */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-cyber-border/80 space-y-8">
          {filtered.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Pin Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-cyber-950 border-2 border-amber-400 group-hover:scale-125 transition-transform shadow-md shadow-amber-500/30" />

              <div className="bento-card border-cyber-border/80 hover:border-amber-500/40 p-5 sm:p-6 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2 py-0.5 rounded font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      {item.year}
                    </span>
                    <span className="text-slate-400 font-semibold">{item.competition}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-xs font-extrabold text-amber-300 bg-cyber-950 px-2.5 py-1 rounded-full border border-amber-500/30 w-fit">
                    <Star className="w-3 h-3 text-amber-400" />
                    {item.rank}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-cyber-border/60 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-400">Scorecard Telemetry:</span>
                  <span className="text-cyber-cyan font-bold">{item.stats}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
