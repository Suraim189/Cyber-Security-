"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Shield,
  Trophy,
  Flame,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Target,
  Terminal,
  Activity,
  FileCheck,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export default function MemberDashboardPage() {
  const [userHandle, setUserHandle] = useState("CyberStudent_NTU");
  const [xp, setXp] = useState(1450);
  const [streakWeeks, setStreakWeeks] = useState(5);
  const [solvedCount, setSolvedCount] = useState(3);

  useEffect(() => {
    try {
      const savedScore = localStorage.getItem("ntu_ctf_score");
      if (savedScore) {
        setXp(1200 + parseInt(savedScore, 10));
      }
      const savedSolves = localStorage.getItem("ntu_ctf_solved");
      if (savedSolves) {
        setSolvedCount(JSON.parse(savedSolves).length);
      }
    } catch (e) {}
  }, []);

  const badges = [
    {
      id: "b-1",
      name: "First Blood Hunter",
      desc: "Captured first solve on an Intra-University CTF challenge",
      icon: Flame,
      color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      unlocked: true,
    },
    {
      id: "b-2",
      name: "JWT Token Sentry",
      desc: "Successfully decoded and bypassed broken HMAC tokens",
      icon: Shield,
      color: "text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/10",
      unlocked: true,
    },
    {
      id: "b-3",
      name: "Binary Infiltrator",
      desc: "Overwrote instruction pointers in x86_64 pwnable challenge",
      icon: Terminal,
      color: "text-red-400 border-red-500/30 bg-red-500/10",
      unlocked: solvedCount >= 2,
    },
    {
      id: "b-4",
      name: "Forensics Detective",
      desc: "Carved memory descriptors and recovered active reverse shell",
      icon: Target,
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      unlocked: solvedCount >= 3,
    },
    {
      id: "b-5",
      name: "Ethics Guardian",
      desc: "Completed responsible vulnerability disclosure certification",
      icon: Award,
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      unlocked: true,
    },
  ];

  const level = Math.floor(xp / 500) + 1;
  const currentLevelProgress = (xp % 500) / 5; // percentage of current 500 block

  return (
    <div className="bg-cyber-900 text-slate-100 min-h-screen pb-24 selection:bg-cyber-cyan/20 selection:text-cyber-cyan">
      <PageHeader
        badge="STUDENT SECURITY TELEMETRY"
        title="Member Command Dashboard"
        description="Monitor your experiential progression, CTF wargame streaks, competency badges, and official society credentials."
        rightBadgeText={`MEMBER LEVEL 0${level}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
        {/* Profile Card & Level Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Member Card */}
          <div className="lg:col-span-7 bento-card p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-cyber-border mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyber-blue to-blue-700 border-2 border-cyber-cyan/40 text-white flex items-center justify-center font-mono font-bold text-xl shadow-lg shadow-cyan-950/40">
                    CS
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                      <span>{userHandle}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </h2>
                    <span className="text-xs text-slate-400 font-mono">
                      Roll No: 22-NTU-CS-1089 • Level {level} Security Practitioner
                    </span>
                  </div>
                </div>

                <Link
                  href="/verify/NTU-SEC-2026-042"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-950 border border-cyber-border text-xs font-mono text-cyber-cyan hover:border-cyber-cyan transition-colors"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>View Verified ID</span>
                </Link>
              </div>

              {/* XP Progress Bar */}
              <div className="space-y-2 font-mono mb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">EXPERIENCE RANK: <strong className="text-white">LEVEL {level}</strong></span>
                  <span className="text-cyber-cyan font-bold">{xp} / {(level) * 500} XP</span>
                </div>
                <div className="w-full h-3 rounded-full bg-cyber-950 border border-cyber-border overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-cyber-cyan to-cyan-300 transition-all duration-500 shadow-[0_0_10px_#00f0ff]"
                    style={{ width: `${currentLevelProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 font-mono text-center pt-4 border-t border-cyber-border text-xs">
              <div className="bg-cyber-950/80 p-2.5 rounded-xl border border-cyber-border">
                <span className="text-slate-400 block text-[10px]">ACTIVE STREAK</span>
                <span className="text-amber-400 font-extrabold text-sm flex items-center justify-center gap-1 mt-0.5">
                  <Flame className="w-4 h-4" /> {streakWeeks} Weeks
                </span>
              </div>

              <div className="bg-cyber-950/80 p-2.5 rounded-xl border border-cyber-border">
                <span className="text-slate-400 block text-[10px]">CTF SOLVES</span>
                <span className="text-emerald-400 font-extrabold text-sm block mt-0.5">
                  {solvedCount} Flags
                </span>
              </div>

              <div className="bg-cyber-950/80 p-2.5 rounded-xl border border-cyber-border">
                <span className="text-slate-400 block text-[10px]">WORKSHOPS</span>
                <span className="text-cyber-cyan font-extrabold text-sm block mt-0.5">
                  4 Attended
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Credentials */}
          <div className="lg:col-span-5 bento-card p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono text-cyber-cyan uppercase font-bold block mb-1">
                // Directives &amp; Fast Actions
              </span>
              <h3 className="text-lg font-bold text-white mb-4">
                Active Member Shortcuts
              </h3>

              <div className="space-y-2.5 font-mono text-xs">
                <Link
                  href="/events"
                  className="p-3 rounded-xl bg-cyber-950 border border-cyber-border hover:border-cyber-cyan/50 text-slate-300 hover:text-white flex items-center justify-between transition-colors block"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyber-cyan" />
                    Browse Upcoming Operations
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>

                <Link
                  href="/verify/NTU-SEC-2026-042"
                  className="p-3 rounded-xl bg-cyber-950 border border-cyber-border hover:border-cyber-cyan/50 text-slate-300 hover:text-white flex items-center justify-between transition-colors block"
                >
                  <span className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    Inspect Official Certificate QR
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>

                <Link
                  href="/#ctf"
                  className="p-3 rounded-xl bg-cyber-950 border border-cyber-border hover:border-cyber-cyan/50 text-slate-300 hover:text-white flex items-center justify-between transition-colors block"
                >
                  <span className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    Enter Live CTF Arena
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-cyber-950/70 border border-cyber-border text-xs text-slate-400 font-mono">
              Next scheduled workshop: <strong>Hands-on Web Penetration Testing</strong> (Nov 15).
            </div>
          </div>
        </div>

        {/* Competency Badges Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cyber-border font-mono">
            <div>
              <h3 className="text-xl font-bold text-white">Competency Badges &amp; Honors</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Earned through verified problem-solving and lab exercise completions
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400">
              {badges.filter((b) => b.unlocked).length} of {badges.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.id}
                  className={`bento-card p-4 flex items-start gap-3.5 ${
                    b.unlocked
                      ? "border-cyber-border/90"
                      : "opacity-40 border-dashed border-slate-700"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border ${b.color} flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white font-sans">
                        {b.name}
                      </h4>
                      {b.unlocked && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-300 font-sans mt-0.5 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
