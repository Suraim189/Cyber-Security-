"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle, BookOpen, ExternalLink, Terminal, Shield, Trophy, Sparkles } from "lucide-react";

interface RoadmapItem {
  id: string;
  title: string;
  summary: string;
  resourceTitle: string;
  resourceUrl: string;
}

interface RoadmapTrack {
  id: "beginner" | "intermediate" | "advanced";
  title: string;
  badge: string;
  accent: string;
  description: string;
  items: RoadmapItem[];
}

export function LearningRoadmap() {
  const [activeTrack, setActiveTrack] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ntu_cyber_roadmap");
      if (saved) {
        setCompletedItems(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const toggleItem = (id: string) => {
    let updated: string[];
    if (completedItems.includes(id)) {
      updated = completedItems.filter((i) => i !== id);
    } else {
      updated = [...completedItems, id];
    }
    setCompletedItems(updated);
    try {
      localStorage.setItem("ntu_cyber_roadmap", JSON.stringify(updated));
    } catch (e) {}
  };

  const tracks: RoadmapTrack[] = [
    {
      id: "beginner",
      title: "Foundational Security & Systems",
      badge: "LEVEL 01 // NOVICE",
      accent: "text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/10",
      description: "Core computing mechanics, operating systems, networking fundamentals, and essential scripting tools.",
      items: [
        {
          id: "beg-1",
          title: "Linux Command Line & Shell Navigation",
          summary: "File permissions, bash scripting, grep/awk/sed text wrangling, SSH key generation, and process monitoring.",
          resourceTitle: "OverTheWire: Bandit Wargame",
          resourceUrl: "https://overthewire.org/wargames/bandit/",
        },
        {
          id: "beg-2",
          title: "TCP/IP & Network Protocols",
          summary: "Packet framing, subnetting, ARP/DNS resolution, handshake mechanics, and Wireshark live packet captures.",
          resourceTitle: "Wireshark Packet Analysis Labs",
          resourceUrl: "https://tryhackme.com",
        },
        {
          id: "beg-3",
          title: "Python for Security Practitioners",
          summary: "Socket programming, port scanners, crafting raw HTTP payloads, and automating brute-force scripts.",
          resourceTitle: "Violent Python Security Scripts",
          resourceUrl: "https://github.com",
        },
        {
          id: "beg-4",
          title: "Web Architecture & Protocol Basics",
          summary: "HTTP headers, cookies, JWT tokens, session lifecycle, stateless APIs, and server-side databases.",
          resourceTitle: "Mozilla Web Security Guidelines",
          resourceUrl: "https://developer.mozilla.org",
        },
      ],
    },
    {
      id: "intermediate",
      title: "Core Offensive & Defensive Operations",
      badge: "LEVEL 02 // PRACTITIONER",
      accent: "text-blue-400 border-blue-500/30 bg-blue-500/10",
      description: "Vulnerability analysis, web penetration testing, volatile forensics, and applied cryptographic protocols.",
      items: [
        {
          id: "int-1",
          title: "OWASP Top 10 Web Application Attacks",
          summary: "SQL Injection, Cross-Site Scripting (XSS), Server-Side Request Forgery (SSRF), and IDOR vulnerability exploitation.",
          resourceTitle: "PortSwigger Web Security Academy",
          resourceUrl: "https://portswigger.net/web-security",
        },
        {
          id: "int-2",
          title: "Network Reconnaissance & Vulnerability Audits",
          summary: "Nmap NSE script engine, masscan, banner grabbing, and identifying unpatched CVEs on enterprise subnets.",
          resourceTitle: "Nmap Network Scanning Bible",
          resourceUrl: "https://nmap.org/book/",
        },
        {
          id: "int-3",
          title: "Volatile Memory Forensics & Artifact Carving",
          summary: "Capturing Linux/Windows RAM dumps, extracting malicious processes, socket connections, and shell commands via Volatility 3.",
          resourceTitle: "Volatility 3 Framework Docs",
          resourceUrl: "https://volatilityfoundation.org",
        },
        {
          id: "int-4",
          title: "Applied Cryptography & Key Management",
          summary: "Asymmetric RSA factorization, AES block modes, padding oracle attacks, and SHA-256 collision defense.",
          resourceTitle: "Cryptohack Practice Platform",
          resourceUrl: "https://cryptohack.org",
        },
      ],
    },
    {
      id: "advanced",
      title: "Advanced Wargames & Exploit Engineering",
      badge: "LEVEL 03 // ELITE",
      accent: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      description: "Binary exploitation, reverse engineering, kernel defense, and collegiate CTF championship squad prep.",
      items: [
        {
          id: "adv-1",
          title: "Binary Exploitation & Buffer Overflows",
          summary: "Stack canary bypass, return-oriented programming (ROP chains), shellcode injection, and ASLR/DEP mitigations.",
          resourceTitle: "Nightmare Pwn Course",
          resourceUrl: "https://github.com",
        },
        {
          id: "adv-2",
          title: "Reverse Engineering & Malware Decompilation",
          summary: "Disassembling stripped x86_64 binaries in Ghidra, patch analysis, anti-debugging detection, and dynamic GDB tracing.",
          resourceTitle: "Ghidra SRE NSA Tool Suite",
          resourceUrl: "https://ghidra-sre.org",
        },
        {
          id: "adv-3",
          title: "Active Directory & Enterprise Perimeter Defense",
          summary: "Kerberoasting, BloodHound graph analysis, mimikatz credential dumping, and hardening Group Policy Objects.",
          resourceTitle: "MITRE ATT&CK Enterprise Matrix",
          resourceUrl: "https://attack.mitre.org",
        },
        {
          id: "adv-4",
          title: "Threat Hunting & SIEM Telemetry Pipeline",
          summary: "Authoring custom Suricata rules, Zeek connection logs, Wazuh agent alerting, and memory triage playbooks.",
          resourceTitle: "Wazuh Open Source SIEM",
          resourceUrl: "https://wazuh.com",
        },
      ],
    },
  ];

  const currentTrackData = tracks.find((t) => t.id === activeTrack)!;
  const totalTrackItems = currentTrackData.items.length;
  const completedInTrack = currentTrackData.items.filter((i) => completedItems.includes(i.id)).length;
  const progressPercent = Math.round((completedInTrack / totalTrackItems) * 100);

  return (
    <section className="py-16 bg-cyber-950 border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Curriculum &amp; Training Tracks</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Interactive Cybersecurity Learning Roadmap
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Track your individual progress through our structured multi-tier curriculum. Check off competencies as you master them in society labs.
            </p>
          </div>

          {/* Level Switcher */}
          <div className="inline-flex rounded-xl bg-cyber-900 p-1 border border-cyber-border font-mono text-xs">
            {tracks.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTrack(t.id)}
                className={`px-3.5 py-2 rounded-lg font-semibold transition-all ${
                  activeTrack === t.id
                    ? "bg-cyber-cyan text-cyber-950 font-bold shadow-md shadow-cyber-cyan/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t.id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Track Overview & Progress Meter */}
        <div className="bento-card mb-8 p-6 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold border mb-2 ${currentTrackData.accent}`}>
                {currentTrackData.badge}
              </span>
              <h3 className="text-xl font-bold text-white font-sans">
                {currentTrackData.title}
              </h3>
              <p className="text-xs text-slate-300 font-sans mt-1">
                {currentTrackData.description}
              </p>
            </div>

            <div className="sm:text-right flex-shrink-0">
              <span className="text-[11px] text-slate-400 block mb-1">TRACK PROGRESS:</span>
              <span className="text-2xl font-extrabold text-cyber-cyan">
                {progressPercent}%
              </span>
              <span className="text-xs text-slate-500 block">
                {completedInTrack} of {totalTrackItems} Competencies
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-cyber-900 border border-cyber-border overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-cyber-cyan to-cyan-300 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Interactive Topic Checkbox Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono">
          {currentTrackData.items.map((item) => {
            const isDone = completedItems.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`bento-card p-5 cursor-pointer group flex items-start gap-4 transition-all ${
                  isDone
                    ? "border-emerald-500/50 bg-emerald-950/10 shadow-emerald-950/20"
                    : "hover:border-cyber-cyan/50"
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-slate-500 group-hover:text-cyber-cyan transition-colors flex-shrink-0"
                  aria-label={isDone ? "Mark as incomplete" : "Mark as complete"}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div className="flex-1">
                  <h4
                    className={`text-base font-bold font-sans transition-colors ${
                      isDone ? "text-emerald-300 line-through" : "text-white group-hover:text-cyber-cyan"
                    }`}
                  >
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed mt-1 mb-3">
                    {item.summary}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-cyber-border/60">
                    <span className="text-slate-500">Resource:</span>
                    <a
                      href={item.resourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-cyber-cyan hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>{item.resourceTitle}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
