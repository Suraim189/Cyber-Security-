"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Shield, CheckCircle2, CornerDownLeft, Sparkles, Command } from "lucide-react";

interface TerminalEntry {
  id: string;
  type: "command" | "output" | "system" | "error";
  text: string;
}

const COMMAND_LIST = [
  "help",
  "about",
  "team",
  "events",
  "ctf",
  "whoami",
  "nmap",
  "ping",
  "sudo",
  "clear",
  "matrix",
  "advisor",
  "join",
];

export function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      id: "init-1",
      type: "system",
      text: "NTU CYBER DEFENSE TERMINAL // OS-NODE: ACADEMIC-LAB-01 [v2.4-STABLE]",
    },
    {
      id: "init-2",
      type: "system",
      text: "Authorized Environment: Department of Computer Science, NTU Faisalabad",
    },
    {
      id: "init-3",
      type: "output",
      text: "System ready. Type 'help' or press Tab for command auto-completion. Up/Down for history.",
    },
  ]);

  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Add to history list for up/down navigation
    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    const lowerCmd = cmd.toLowerCase();
    const args = lowerCmd.split(" ");
    const primary = args[0];

    const cmdEntry: TerminalEntry = {
      id: `cmd-${Date.now()}`,
      type: "command",
      text: `ntu-css@lab-01:~$ ${rawCmd}`,
    };

    let responseEntry: TerminalEntry;

    switch (primary) {
      case "help":
        responseEntry = {
          id: `res-${Date.now()}`,
          type: "output",
          text: `AVAILABLE TERMINAL DIRECTIVES:
  • about       - Overview of NTU Cyber Security Society doctrine
  • team        - Query technical wings and leadership roster
  • events      - Inspect scheduled workshops and CTF wargames
  • ctf         - Query active CTF challenges & jeopardy categories
  • advisor     - Verify faculty patronage & academic oversight
  • whoami      - Inspect current defense clearance & student session
  • nmap [host] - Run simulated network port scan
  • ping [host] - Check packet latency to NTU defense node
  • matrix      - Trigger cyber telemetry stream
  • sudo [cmd]  - Elevate privilege (requires root)
  • join        - Direct enlistment application portal
  • clear       - Flush terminal console buffer`,
        };
        break;

      case "about":
        responseEntry = {
          id: `res-${Date.now()}`,
          type: "output",
          text: `NTU CYBER SECURITY SOCIETY:
Mission: Equip students with ethical hacking, defense operations, and post-quantum cryptography skills.
Affiliation: Department of Computer Science, National Textile University, Faisalabad.
Motto: "Think Like an Attacker. Build Like a Defender."`,
        };
        break;

      case "team":
        responseEntry = {
          id: `res-${Date.now()}`,
          type: "output",
          text: `SOCIETY LEADERSHIP ROSTER:
[PATRON]  Dr. Muhammad Asif — Faculty Advisor & Patron
[EXEC]    President & Vice President (Executive Council)
[RED]     Offensive Security Lead — Pentesting & Exploit Dev
[BLUE]    Defensive Security Lead — SOC, SIEM & Forensics
[CTF]     Wargames & Competition Lead — Jeopardy CTFs`,
        };
        break;

      case "events":
        responseEntry = {
          id: `res-${Date.now()}`,
          type: "output",
          text: `SCHEDULED OPERATIONS:
1. "Hands-on Web App Penetration Testing" // Nov 15 // CS Lab 3
2. "NTU Intra-University CTF Championship" // Nov 28 // 24-hr Virtual
3. "Zero Trust Architecture Seminar" // Dec 05 // Executive Hall
Type 'join' or visit /events to register.`,
        };
        break;

      case "ctf":
        responseEntry = {
          id: `res-${Date.now()}`,
          type: "output",
          text: `ACTIVE CTF ARENA CATEGORIES:
• Web Exploitation: JWT bypass, SQLi, SSRF, Deserialization
• Binary Exploitation (Pwn): Buffer overflows, ROP chains
• Cryptography: Post-quantum lattices, RSA factorization
• Digital Forensics: Volatility memory carving, PCAP packet analysis
• Reverse Engineering: Ghidra x86_64 disassembly`,
        };
        break;

      case "whoami":
        responseEntry = {
          id: `res-${Date.now()}`,
          type: "output",
          text: `UID: student@ntu-cyber-terminal
CLEARANCE: Level-1 Observer (Guest Academic)
IP ORIGIN: 10.24.189.4 (NTU Campus Subnet)
STATUS: Unrestricted Read Access Enabled`,
        };
        break;

      case "advisor":
        responseEntry = {
          id: `res-${Date.now()}`,
          type: "output",
          text: `FACULTY PATRON & ACADEMIC OVERSIGHT:
Dr. Muhammad Asif
Associate Professor & Chairman, Department of Computer Science
National Textile University, Faisalabad, Pakistan
Email: advisor.cyber@ntu.edu.pk`,
        };
        break;

      case "nmap":
        const target = args[1] || "127.0.0.1";
        responseEntry = {
          id: `res-${Date.now()}`,
          type: "output",
          text: `Starting Nmap 7.94 at 2026-10-26 20:50 PKT
Nmap scan report for ${target}
Host is up (0.00012s latency).
PORT     STATE SERVICE       VERSION
22/tcp   open  ssh           OpenSSH 9.6p1
80/tcp   open  http          Next.js App Server 14.2.35
443/tcp  open  ssl/https     TLSv1.3 Enterprise
5432/tcp open  postgresql    Supabase PG 16.2
Nmap done: 1 IP address (1 host up) scanned in 0.42 seconds`,
        };
        break;

      case "ping":
        responseEntry = {
          id: `res-${Date.now()}`,
          type: "output",
          text: `PING ntu-defense-node.ntu.edu.pk (10.24.1.1): 56 data bytes
64 bytes from 10.24.1.1: icmp_seq=0 ttl=64 time=1.42 ms
64 bytes from 10.24.1.1: icmp_seq=1 ttl=64 time=0.98 ms
64 bytes from 10.24.1.1: icmp_seq=2 ttl=64 time=1.04 ms
--- ntu-defense-node ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss, rtt avg 1.14 ms`,
        };
        break;

      case "matrix":
        responseEntry = {
          id: `res-${Date.now()}`,
          type: "system",
          text: `01001110 01010100 01010101 00100000 01000011 01011001 01000010 01000101 01010010
[+] TELEMETRY SYNCHRONIZED: 100%
[+] ZERO VULNERABILITIES IN SYSTEM DEFENSE PERIMETER
[+] ALL ENCRYPTION SUITES POST-QUANTUM COMPLIANT`,
        };
        break;

      case "sudo":
        responseEntry = {
          id: `res-${Date.now()}`,
          type: "error",
          text: `[!] Permission Denied: User is not in the sudoers file.
This incident has been logged and reported to Dr. Muhammad Asif.`,
        };
        break;

      case "join":
        window.location.href = "/contact#join";
        responseEntry = {
          id: `res-${Date.now()}`,
          type: "output",
          text: `Redirecting to membership enlistment portal...`,
        };
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        responseEntry = {
          id: `err-${Date.now()}`,
          type: "error",
          text: `zsh: command not found: '${rawCmd}'. Type 'help' for directory of valid instructions.`,
        };
        break;
    }

    setHistory((prev) => [...prev, cmdEntry, responseEntry]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // History Navigation: Up Arrow
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    }
    // History Navigation: Down Arrow
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const prevIndex = historyIndex - 1;
        setHistoryIndex(prevIndex);
        setInputVal(commandHistory[prevIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
    // Tab Autocomplete
    else if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;
      const matched = COMMAND_LIST.find((c) => c.startsWith(current));
      if (matched) {
        setInputVal(matched);
      }
    }
    // Enter to execute
    else if (e.key === "Enter") {
      handleCommand(inputVal);
    }
  };

  return (
    <div className="rounded-2xl border border-cyber-border/80 bg-cyber-950/90 shadow-2xl backdrop-blur-xl overflow-hidden font-mono text-xs flex flex-col h-[400px] sm:h-[460px]">
      {/* Terminal Titlebar */}
      <div className="bg-cyber-900/90 border-b border-cyber-border/80 px-4 py-2.5 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-400 text-[11px] ml-2 flex items-center gap-1.5 font-semibold">
            <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
            ntu-css@academic-lab-01:~
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] bg-cyber-850 text-slate-400 border border-cyber-border hidden sm:inline">
            Tab for Autocomplete
          </span>
          <span className="flex items-center gap-1 text-[11px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        </div>
      </div>

      {/* Terminal Log Output Window */}
      <div
        className="flex-1 p-4 overflow-y-auto space-y-2 select-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item) => (
          <div key={item.id} className="leading-relaxed">
            {item.type === "system" && (
              <p className="text-slate-500 text-[11px] italic">
                [SYS] {item.text}
              </p>
            )}
            {item.type === "command" && (
              <p className="text-cyber-cyan font-bold flex items-center gap-1">
                <span>❯</span> {item.text}
              </p>
            )}
            {item.type === "output" && (
              <pre className="text-slate-300 font-mono text-[11px] whitespace-pre-wrap pl-3 border-l-2 border-cyber-cyan/30 my-1">
                {item.text}
              </pre>
            )}
            {item.type === "error" && (
              <p className="text-amber-400 font-mono text-[11px] pl-3 border-l-2 border-amber-500/50 my-1">
                {item.text}
              </p>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick Action Presets */}
      <div className="px-4 py-2 bg-cyber-900/60 border-t border-cyber-border/60 flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-slate-500 text-[10px] uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyber-cyan" /> Presets:
        </span>
        {["help", "whoami", "events", "ctf", "nmap", "matrix", "clear"].map((preset) => (
          <button
            key={preset}
            onClick={() => handleCommand(preset)}
            className="px-2.5 py-1 rounded bg-cyber-950 border border-cyber-border hover:border-cyber-cyan/60 hover:text-cyber-cyan text-slate-300 transition-colors whitespace-nowrap"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Interactive Input Form */}
      <div className="p-3 bg-cyber-900 border-t border-cyber-border/80 flex items-center gap-2">
        <span className="text-cyber-cyan font-bold select-none">ntu-css$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type command (e.g. 'help', 'ctf', 'events')..."
          className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-xs font-mono"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={() => handleCommand(inputVal)}
          className="text-slate-400 hover:text-cyber-cyan p-1"
          title="Execute directive"
        >
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
