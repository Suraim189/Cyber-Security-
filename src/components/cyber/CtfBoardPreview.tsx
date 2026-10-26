"use client";

import React, { useState } from "react";
import { Trophy, Flag, Key, Globe, Search, Terminal, Check, X, ShieldAlert } from "lucide-react";

interface CtfChallenge {
  id: string;
  category: "Web" | "Pwn" | "Crypto" | "Forensics" | "Reverse";
  title: string;
  points: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  solves: number;
  description: string;
  hint: string;
}

export function CtfBoardPreview() {
  const [selectedChallenge, setSelectedChallenge] = useState<CtfChallenge | null>(null);

  const challenges: CtfChallenge[] = [
    {
      id: "ch-1",
      category: "Web",
      title: "Broken Token Signature",
      points: 150,
      difficulty: "Beginner",
      solves: 42,
      description: "An authentication endpoint accepts unsigned HS256 tokens when the algorithm header is altered to 'none'. Discover the administrative cookie to retrieve the flag.",
      hint: "Inspect the JWT header base64 payload.",
    },
    {
      id: "ch-2",
      category: "Pwn",
      title: "Buffer Overflow Alpha",
      points: 250,
      difficulty: "Intermediate",
      solves: 19,
      description: "A 32-bit ELF executable does not check user input buffer bounds in gets(). Overwrite the instruction pointer (EIP) to hijack control flow to the print_flag() address.",
      hint: "Check the offset to EIP using cyclic pattern generator.",
    },
    {
      id: "ch-3",
      category: "Crypto",
      title: "Weak RSA Public Exponent",
      points: 200,
      difficulty: "Intermediate",
      solves: 27,
      description: "A server encrypts the same message to 3 different recipients using e=3 with different moduli. Reconstruct the plaintext using Hastad's Broadcast Attack.",
      hint: "Chinese Remainder Theorem applies here.",
    },
    {
      id: "ch-4",
      category: "Forensics",
      title: "Volatile RAM Artifact",
      points: 300,
      difficulty: "Advanced",
      solves: 11,
      description: "A Linux memory dump was captured following an unauthorized reverse shell execution. Carve out the malicious process memory descriptors and recover the beacon URL.",
      hint: "Use Volatility 3 linux.pslist and linux.netscan.",
    },
    {
      id: "ch-5",
      category: "Reverse",
      title: "Obfuscated Keygen",
      points: 250,
      difficulty: "Intermediate",
      solves: 16,
      description: "A Windows PE binary verifies user serial numbers via a custom XOR byte shuffling loop. Disassemble the validation routine in Ghidra to write a key generator.",
      hint: "Look for the string comparison function at 0x4012A0.",
    },
    {
      id: "ch-6",
      category: "Web",
      title: "SSRF Cloud Metadata Exfiltration",
      points: 400,
      difficulty: "Advanced",
      solves: 8,
      description: "An image fetcher service blindly requests URLs supplied in JSON payloads. Bypass internal IP regex filters to query the local cloud metadata endpoint.",
      hint: "Decimal IP representations or DNS rebinding can bypass naive string matching.",
    },
  ];

  return (
    <div className="rounded-2xl border border-cyber-border bg-cyber-850 p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cyber-border/70 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white leading-tight font-mono">
              NTU Intra-Wargame Arena // Live Board
            </h4>
            <p className="text-xs text-slate-400">
              Interactive Jeopardy-style challenges for weekly practice
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="telemetry-badge text-emerald-400 border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ARENA ONLINE
          </span>
          <span className="telemetry-badge text-slate-400">
            TOTAL SOLVES: 123
          </span>
        </div>
      </div>

      {/* Grid of Challenges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges.map((ch) => (
          <button
            key={ch.id}
            type="button"
            onClick={() => setSelectedChallenge(ch)}
            className="p-4 rounded-xl bg-cyber-900 border border-cyber-border hover:border-cyber-cyan/50 hover:bg-cyber-800/80 transition-all text-left flex flex-col justify-between group space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyber-950 border border-cyber-border text-slate-300">
                  {ch.category}
                </span>
                <span className="text-xs font-mono font-bold text-cyber-cyan group-hover:scale-105 transition-transform">
                  +{ch.points} pts
                </span>
              </div>

              <h5 className="text-sm font-bold text-white group-hover:text-cyber-cyan transition-colors line-clamp-1">
                {ch.title}
              </h5>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                {ch.description}
              </p>
            </div>

            <div className="pt-3 border-t border-cyber-border/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span className={`font-semibold ${
                ch.difficulty === "Beginner" ? "text-emerald-400" : ch.difficulty === "Intermediate" ? "text-amber-400" : "text-rose-400"
              }`}>
                {ch.difficulty}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Flag className="w-3 h-3 text-cyber-cyan" />
                {ch.solves} solves
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Challenge Detail Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 z-50 bg-cyber-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="rounded-xl bg-cyber-900 border border-cyber-cyan/40 p-6 max-w-lg w-full space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-cyber-border">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
                  {selectedChallenge.category}
                </span>
                <span className="font-bold text-sm text-white font-mono">
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

            <div className="space-y-3 text-slate-300">
              <div className="flex items-center justify-between p-2.5 rounded bg-cyber-950 border border-cyber-border font-mono text-[11px]">
                <span className="text-cyber-cyan">Reward: {selectedChallenge.points} Points</span>
                <span className="text-slate-400">Solves: {selectedChallenge.solves} Teams</span>
                <span className="text-amber-400">Difficulty: {selectedChallenge.difficulty}</span>
              </div>

              <div>
                <strong className="text-white block font-mono text-[11px] mb-1">Mission Briefing:</strong>
                <p className="leading-relaxed bg-cyber-950/60 p-3 rounded border border-cyber-border/70 text-slate-300">
                  {selectedChallenge.description}
                </p>
              </div>

              <div>
                <strong className="text-amber-400 block font-mono text-[11px] mb-1">Mentor Tactical Hint:</strong>
                <p className="italic text-slate-400 bg-cyber-950/60 p-2.5 rounded border border-cyber-border/70">
                  "{selectedChallenge.hint}"
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-cyber-border flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">
                Flag format: NTU_CSS&#123;...&#125;
              </span>
              <button
                onClick={() => setSelectedChallenge(null)}
                className="px-4 py-2 rounded bg-cyber-cyan text-cyber-950 font-bold hover:bg-cyan-300 transition-colors"
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
