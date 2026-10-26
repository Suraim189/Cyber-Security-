"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Trophy,
  Flag,
  Key,
  Globe,
  Search,
  Terminal,
  Check,
  X,
  ShieldAlert,
  Send,
  Flame,
  Award,
  Clock,
  Sparkles,
  Users,
} from "lucide-react";

interface CtfChallenge {
  id: string;
  category: "Web" | "Pwn" | "Crypto" | "Forensics" | "Reverse";
  title: string;
  points: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  solves: number;
  description: string;
  hint: string;
  sampleFlag?: string; // Hint for test purposes
}

interface LeaderboardEntry {
  rank: number;
  handle: string;
  department: string;
  score: number;
  solves: number;
  firstBloods: number;
  avatar: string;
}

export function LiveCtfArena() {
  const [activeTab, setActiveTab] = useState<"challenges" | "leaderboard">("challenges");
  const [selectedChallenge, setSelectedChallenge] = useState<CtfChallenge | null>(null);
  const [userHandle, setUserHandle] = useState("Student Hacker");
  const [submittedFlag, setSubmittedFlag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Solved challenges tracked in state & local storage
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    try {
      const savedSolves = localStorage.getItem("ntu_ctf_solved");
      if (savedSolves) {
        const parsed = JSON.parse(savedSolves);
        setSolvedIds(parsed);
      }
      const savedScore = localStorage.getItem("ntu_ctf_score");
      if (savedScore) {
        setUserScore(parseInt(savedScore, 10));
      }
    } catch (e) {
      // LocalStorage access fallback
    }
  }, []);

  const challenges: CtfChallenge[] = [
    {
      id: "ch-1",
      category: "Web",
      title: "Broken Token Signature",
      points: 150,
      difficulty: "Beginner",
      solves: 46,
      description:
        "An authentication endpoint accepts unsigned HS256 tokens when the algorithm header is altered to 'none'. Discover the administrative cookie to retrieve the flag.",
      hint: "Inspect the JWT header base64 payload. Test flag: NTU_CSS{jwt_n0n3_alg_byP4ss_2026}",
      sampleFlag: "NTU_CSS{jwt_n0n3_alg_byP4ss_2026}",
    },
    {
      id: "ch-2",
      category: "Pwn",
      title: "Buffer Overflow Alpha",
      points: 250,
      difficulty: "Intermediate",
      solves: 21,
      description:
        "A 32-bit ELF executable does not check user input buffer bounds in gets(). Overwrite the instruction pointer (EIP) to hijack control flow to the print_flag() address.",
      hint: "Check offset to EIP using cyclic pattern generator. Test flag: NTU_CSS{eip_0verwr1te_c0ntr0l_hijack}",
      sampleFlag: "NTU_CSS{eip_0verwr1te_c0ntr0l_hijack}",
    },
    {
      id: "ch-3",
      category: "Crypto",
      title: "Weak RSA Public Exponent",
      points: 200,
      difficulty: "Intermediate",
      solves: 29,
      description:
        "A server encrypts the same message to 3 different recipients using e=3 with different moduli. Reconstruct the plaintext using Hastad's Broadcast Attack.",
      hint: "Chinese Remainder Theorem applies here. Test flag: NTU_CSS{h4st4d_br04dc4st_crt_cr4ck}",
      sampleFlag: "NTU_CSS{h4st4d_br04dc4st_crt_cr4ck}",
    },
    {
      id: "ch-4",
      category: "Forensics",
      title: "Volatile RAM Artifact",
      points: 300,
      difficulty: "Advanced",
      solves: 13,
      description:
        "A Linux memory dump was captured following an unauthorized reverse shell execution. Carve out the malicious process memory descriptors and recover the beacon URL.",
      hint: "Use Volatility 3 linux.pslist. Test flag: NTU_CSS{v0l4t1l1ty_m3m0ry_b34c0n_f0und}",
      sampleFlag: "NTU_CSS{v0l4t1l1ty_m3m0ry_b34c0n_f0und}",
    },
    {
      id: "ch-5",
      category: "Reverse",
      title: "Stripped x86_64 Binary",
      points: 175,
      difficulty: "Beginner",
      solves: 38,
      description:
        "A compiled C binary contains hardcoded XOR-encoded credentials. Reverse engineer the validation loop in Ghidra to extract the key.",
      hint: "Check the main function disassembly at 0x401156. Test flag: NTU_CSS{gh1dr4_d3c0mp1l3_str1ngs_rev}",
      sampleFlag: "NTU_CSS{gh1dr4_d3c0mp1l3_str1ngs_rev}",
    },
  ];

  const leaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      handle: "0xCyberSniper",
      department: "BS Computer Science (21)",
      score: 950,
      solves: 5,
      firstBloods: 3,
      avatar: "CS",
    },
    {
      rank: 2,
      handle: "NullPointer_PK",
      department: "BS Software Eng (22)",
      score: 725,
      solves: 4,
      firstBloods: 1,
      avatar: "NP",
    },
    {
      rank: 3,
      handle: "RootShell_NTU",
      department: "BS Artificial Intel (22)",
      score: 600,
      solves: 3,
      firstBloods: 1,
      avatar: "RS",
    },
    {
      rank: 4,
      handle: "BitFlipper",
      department: "BS Computer Science (23)",
      score: 475,
      solves: 3,
      firstBloods: 0,
      avatar: "BF",
    },
    {
      rank: 5,
      handle: "CryptoKnight",
      department: "BS Software Eng (21)",
      score: 350,
      solves: 2,
      firstBloods: 0,
      avatar: "CK",
    },
  ];

  const handleFlagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallenge || !submittedFlag.trim()) return;

    setIsSubmitting(true);
    setSubmissionFeedback(null);

    try {
      const res = await fetch("/api/ctf/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId: selectedChallenge.id,
          flag: submittedFlag.trim(),
          handle: userHandle,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Trigger confetti celebration!
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00F0FF", "#2563EB", "#10B981", "#F59E0B"],
        });

        const newSolves = Array.from(new Set([...solvedIds, selectedChallenge.id]));
        const newScore = userScore + selectedChallenge.points;
        setSolvedIds(newSolves);
        setUserScore(newScore);

        try {
          localStorage.setItem("ntu_ctf_solved", JSON.stringify(newSolves));
          localStorage.setItem("ntu_ctf_score", newScore.toString());
        } catch (e) {}

        setSubmissionFeedback({
          type: "success",
          text: data.message,
        });
        setSubmittedFlag("");
      } else {
        setSubmissionFeedback({
          type: "error",
          text: data.message,
        });
      }
    } catch (err) {
      setSubmissionFeedback({
        type: "error",
        text: "Network error submitting flag. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Web":
        return Globe;
      case "Pwn":
        return Terminal;
      case "Crypto":
        return Key;
      case "Forensics":
        return Search;
      default:
        return Flag;
    }
  };

  return (
    <div className="space-y-6">
      {/* CTF Arena Header & Live Stats Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-cyber-950/80 border border-cyber-border font-mono">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-cyber-cyan flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE CTF WARGAME ARENA
            </div>
            <h3 className="text-lg font-bold text-white font-sans">
              Intra-University Jeopardy Arena
            </h3>
          </div>
        </div>

        {/* User CTF Stats & Score */}
        <div className="flex items-center gap-4 text-xs">
          <div className="px-3.5 py-1.5 rounded-xl bg-cyber-900 border border-cyber-border">
            <span className="text-slate-400 block text-[10px]">YOUR SCORE:</span>
            <span className="text-cyber-cyan font-bold text-sm">
              {userScore} PTS
            </span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-cyber-900 border border-cyber-border">
            <span className="text-slate-400 block text-[10px]">SOLVES:</span>
            <span className="text-emerald-400 font-bold text-sm">
              {solvedIds.length} / {challenges.length}
            </span>
          </div>

          {/* Switcher: Challenges vs Leaderboard */}
          <div className="inline-flex rounded-xl bg-cyber-900 p-1 border border-cyber-border">
            <button
              onClick={() => setActiveTab("challenges")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "challenges"
                  ? "bg-cyber-cyan text-cyber-950 font-bold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Challenges
            </button>
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "leaderboard"
                  ? "bg-cyber-cyan text-cyber-950 font-bold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* View 1: Jeopardy Challenges Grid */}
      {activeTab === "challenges" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((ch) => {
            const Icon = getCategoryIcon(ch.category);
            const isSolved = solvedIds.includes(ch.id);

            return (
              <div
                key={ch.id}
                onClick={() => {
                  setSelectedChallenge(ch);
                  setSubmissionFeedback(null);
                  setSubmittedFlag("");
                }}
                className={`bento-card cursor-pointer group flex flex-col justify-between ${
                  isSolved
                    ? "border-emerald-500/50 bg-emerald-950/10 shadow-emerald-950/30"
                    : "hover:border-cyber-cyan/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4 font-mono text-xs">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyber-950 border border-cyber-border text-cyber-cyan font-bold">
                      <Icon className="w-3.5 h-3.5" />
                      {ch.category}
                    </span>

                    {isSolved ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold">
                        <Check className="w-3.5 h-3.5" /> SOLVED
                      </span>
                    ) : (
                      <span className="text-amber-400 font-bold text-xs">
                        +{ch.points} PTS
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-bold text-white group-hover:text-cyber-cyan transition-colors mb-2">
                    {ch.title}
                  </h4>

                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 mb-6">
                    {ch.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-cyber-border flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">
                    Difficulty: <strong className="text-slate-300">{ch.difficulty}</strong>
                  </span>
                  <span className="text-cyber-cyan font-semibold group-hover:underline">
                    {isSolved ? "Review Solved" : "Capture Flag →"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View 2: Supabase / Realtime Leaderboard */}
      {activeTab === "leaderboard" && (
        <div className="bento-card p-6 font-mono text-xs overflow-x-auto">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyber-border">
            <div>
              <h4 className="text-base font-bold text-white font-sans">
                Official Hall of Fame // Intra-NTU CTF
              </h4>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Top student ethical hackers ranked by verified flag captures &amp; first bloods
              </p>
            </div>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE TELEMETRY
            </span>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 border-b border-cyber-border/70 pb-2 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">Hacker Handle</th>
                <th className="py-2.5 px-3">Department / Batch</th>
                <th className="py-2.5 px-3 text-center">First Bloods</th>
                <th className="py-2.5 px-3 text-center">Solves</th>
                <th className="py-2.5 px-3 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/40">
              {leaderboard.map((user) => (
                <tr key={user.rank} className="hover:bg-cyber-900/60 transition-colors">
                  <td className="py-3 px-3 font-bold text-white">
                    {user.rank === 1 && <span className="text-amber-400 font-black">#1 🏆</span>}
                    {user.rank === 2 && <span className="text-slate-300 font-black">#2 🥈</span>}
                    {user.rank === 3 && <span className="text-amber-600 font-black">#3 🥉</span>}
                    {user.rank > 3 && `#${user.rank}`}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-cyber-950 border border-cyber-border flex items-center justify-center text-cyber-cyan font-bold text-[10px]">
                        {user.avatar}
                      </div>
                      <span className="font-bold text-white">{user.handle}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-400">{user.department}</td>
                  <td className="py-3 px-3 text-center">
                    {user.firstBloods > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/30 text-[10px] font-bold">
                        <Flame className="w-3 h-3" /> {user.firstBloods}
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-slate-300">
                    {user.solves}
                  </td>
                  <td className="py-3 px-3 text-right font-extrabold text-cyber-cyan">
                    {user.score} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Challenge Mission Briefing & Flag Submission Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 z-50 bg-cyber-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="rounded-2xl bg-cyber-900 border border-cyber-cyan/40 p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl shadow-cyan-950/60 animate-in zoom-in-95 duration-150 text-xs font-mono">
            {/* Modal Titlebar */}
            <div className="flex items-center justify-between pb-3 border-b border-cyber-border">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded text-[11px] bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-bold">
                  {selectedChallenge.category}
                </span>
                <span className="font-bold text-base text-white font-sans">
                  {selectedChallenge.title}
                </span>
              </div>
              <button
                onClick={() => setSelectedChallenge(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metrics Dossier */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-cyber-950 border border-cyber-border text-[11px]">
              <span className="text-cyber-cyan font-bold">
                Reward: {selectedChallenge.points} Points
              </span>
              <span className="text-slate-400">
                Solves: {selectedChallenge.solves} Teams
              </span>
              <span className="text-amber-400">
                Difficulty: {selectedChallenge.difficulty}
              </span>
            </div>

            {/* Mission Briefing */}
            <div>
              <strong className="text-white block font-mono text-xs mb-1.5 uppercase tracking-wider">
                Mission Scenario:
              </strong>
              <p className="bg-cyber-950/80 p-3.5 rounded-xl border border-cyber-border text-slate-200 leading-relaxed font-sans text-xs">
                {selectedChallenge.description}
              </p>
            </div>

            {/* Tactical Mentor Hint */}
            <div>
              <strong className="text-amber-400 block font-mono text-xs mb-1.5 uppercase tracking-wider">
                Tactical Mentor Hint:
              </strong>
              <p className="italic text-slate-300 bg-cyber-950/80 p-3 rounded-xl border border-cyber-border text-[11px]">
                "{selectedChallenge.hint}"
              </p>
            </div>

            {/* Server-Side Flag Submission Form */}
            <form onSubmit={handleFlagSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                  Submit Flag (format: NTU_CSS&#123;...&#125;)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={submittedFlag}
                    onChange={(e) => setSubmittedFlag(e.target.value)}
                    placeholder="NTU_CSS{...}"
                    className="flex-1 bg-cyber-950 border border-cyber-border rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan font-mono text-xs"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !submittedFlag.trim()}
                    className="btn-cyber-cyan px-4 py-2.5 text-xs font-bold font-mono flex items-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <Clock className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Submit</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Submission Feedback Banner */}
              {submissionFeedback && (
                <div
                  className={`p-3 rounded-xl border font-mono text-xs flex items-start gap-2 ${
                    submissionFeedback.type === "success"
                      ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/50"
                      : "bg-red-950/40 text-amber-300 border-red-500/50"
                  }`}
                >
                  {submissionFeedback.type === "success" ? (
                    <Award className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  )}
                  <span>{submissionFeedback.text}</span>
                </div>
              )}
            </form>

            {/* Footer */}
            <div className="pt-3 border-t border-cyber-border flex items-center justify-between text-[11px] text-slate-500">
              <span>Server-validated SHA-256 integrity</span>
              <button
                onClick={() => setSelectedChallenge(null)}
                className="text-slate-400 hover:text-white"
              >
                Close Briefing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
