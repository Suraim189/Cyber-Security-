"use client";

import React, { useState } from "react";
import { Shield, Flame, Terminal, Search, Lock, Cpu, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function DefenseMatrix() {
  const [activeTab, setActiveTab] = useState<"offensive" | "defensive" | "ctf">("offensive");

  const tracks = {
    offensive: {
      badge: "Red Team / Adversarial Analysis",
      color: "border-rose-500/40 text-rose-400 bg-rose-500/10",
      accent: "text-rose-400",
      headline: "Think Like an Adversary to Harden Systems",
      description:
        "Offensive security at NTU operates exclusively within authorized, sandboxed testbeds. Students learn how threat actors discover misconfigurations, bypass access controls, and chain vulnerabilities—giving defenders the deep knowledge required to neutralize threats.",
      capabilities: [
        { title: "Web Application Pentesting", desc: "Analyzing OWASP Top 10 vectors, SQLi, SSRF, JWT forgery, and logic flaws in modern applications." },
        { title: "Network Reconnaissance", desc: "Mapping laboratory subnets, banner grabbing, and port scanning with Nmap, Masscan, and custom Python scripts." },
        { title: "Privilege Escalation", desc: "Auditing Linux/Windows misconfigurations, SUID binaries, kernel exploit theory, and token abuse." },
        { title: "API Security Audits", desc: "Fuzzing REST and GraphQL endpoints for broken object level authorization (BOLA) and parameter tampering." },
      ],
      tools: ["Burp Suite Pro", "Kali Linux", "OWASP ZAP", "Metasploit (Lab)", "SQLmap"],
    },
    defensive: {
      badge: "Blue Team / Defensive Architecture",
      color: "border-cyber-cyan/40 text-cyber-cyan bg-cyber-cyan/10",
      accent: "text-cyber-cyan",
      headline: "Resilient Threat Detection, SOC & Digital Triage",
      description:
        "Defenders anticipate attack vectors before breaches occur. Our blue-team curriculum focuses on deploying Security Information and Event Management (SIEM) pipelines, analyzing volatile memory artifacts, and incident response.",
      capabilities: [
        { title: "SIEM & Telemetry Analysis", desc: "Deploying and configuring Wazuh and Splunk dashboards to correlate alerts and detect abnormal telemetry." },
        { title: "Volatile Memory Forensics", desc: "Extracting process dumps, injected DLLs, and rootkit artifacts using Volatility 3 and LiME." },
        { title: "Network Packet Forensics", desc: "Dissecting PCAP files with Wireshark and Zeek to isolate command-and-control (C2) beaconing." },
        { title: "Zero Trust Architecture", desc: "Implementing identity verification, micro-segmentation, and least-privilege access across campus subnets." },
      ],
      tools: ["Wazuh SIEM", "Volatility 3", "Wireshark", "Autopsy", "Snort IDS"],
    },
    ctf: {
      badge: "Wargame & CTF Competition Wing",
      color: "border-cyber-blue/40 text-blue-400 bg-blue-500/10",
      accent: "text-blue-400",
      headline: "High-Speed Reverse Engineering & Binary Exploitation",
      description:
        "Capture The Flag competitions sharpen rapid problem-solving under extreme time constraints. We field university teams for national collegiate tournaments and train weekly on international jeopardy platforms.",
      capabilities: [
        { title: "Binary Reverse Engineering", desc: "Decompiling stripped binaries using Ghidra and IDA Free, deciphering control-flow graphs." },
        { title: "Buffer Overflows & Pwn", desc: "Understanding memory layout, stack smashing, return-oriented programming (ROP), and shellcoding." },
        { title: "Cryptographic Attacks", desc: "Breaking weak RSA keys, small public exponent attacks, AES padding oracles, and custom PRNG flaws." },
        { title: "Forensics & Steganography", desc: "Extracting hidden payloads from corrupted file headers, polyglots, and audio spectral graphs." },
      ],
      tools: ["Ghidra", "GDB-pwndbg", "CyberChef", "Pwntools", "CTFd"],
    },
  };

  const current = tracks[activeTab];

  return (
    <div className="rounded-2xl border border-cyber-border bg-cyber-850 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />

      {/* Tabs Switcher */}
      <div className="flex flex-wrap gap-2.5 mb-8 pb-4 border-b border-cyber-border/70">
        {[
          { id: "offensive", label: "Red Team (Offensive)", icon: Flame },
          { id: "defensive", label: "Blue Team (Defensive)", icon: Shield },
          { id: "ctf", label: "CTF Competition Wing", icon: Terminal },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                isActive
                  ? "bg-cyber-800 text-white border border-cyber-cyan/50 shadow-sm"
                  : "bg-cyber-900/60 text-slate-400 hover:text-slate-200 border border-cyber-border/40"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Track Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Mission Description */}
        <div className="lg:col-span-5 space-y-4">
          <span className={`inline-block px-2.5 py-1 rounded text-[11px] font-mono font-semibold border ${current.color}`}>
            {current.badge}
          </span>

          <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
            {current.headline}
          </h3>

          <p className="text-sm text-slate-400 leading-relaxed">
            {current.description}
          </p>

          <div className="pt-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
              Primary Lab Toolkits
            </span>
            <div className="flex flex-wrap gap-1.5">
              {current.tools.map((tool) => (
                <span key={tool} className="tech-badge">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cyber-cyan hover:underline"
            >
              <span>View Practical Study Roadmaps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Capabilities Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {current.capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-cyber-900/80 border border-cyber-border/80 hover:border-cyber-cyan/30 transition-all flex flex-col justify-between space-y-2"
            >
              <div className="flex items-start gap-2">
                <CheckCircle2 className={`w-4 h-4 ${current.accent} flex-shrink-0 mt-0.5`} />
                <h4 className="text-sm font-bold text-white leading-tight">
                  {cap.title}
                </h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pl-6">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
