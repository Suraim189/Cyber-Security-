import React from "react";
import Link from "next/link";
import { Shield, Lock, FileCode, CheckCircle2, AlertTriangle, Mail, Award, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Vulnerability Disclosure & Security Policy // NTU Cyber Security Society",
  description: "Official vulnerability disclosure policy (VDP), safe harbor pledge, and security reporting protocols of the NTU Cyber Security Society.",
};

export default function SecurityPage() {
  return (
    <div className="bg-cyber-900 text-slate-100 min-h-screen pb-24 selection:bg-cyber-cyan/20 selection:text-cyber-cyan">
      {/* Header */}
      <section className="bg-cyber-gradient border-b border-cyber-border py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              // Security Policy &amp; Safe Harbor
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Vulnerability Disclosure Policy
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We practice what we teach. The NTU Cyber Security Society is committed to maintaining 
              the security and privacy of our systems and welcoming responsible disclosures from ethical researchers.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-12">
        {/* Safe Harbor Statement */}
        <div className="bento-card border-emerald-500/40 bg-emerald-950/10 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Ethical Safe Harbor Pledge</h2>
              <span className="text-xs font-mono text-emerald-400">LEGAL &amp; ACADEMIC PROTECTION</span>
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            If you conduct vulnerability research in good faith and adhere to this policy, we consider your research 
            authorized. We pledge not to initiate legal action or request university disciplinary measures against researchers 
            who follow responsible disclosure protocols.
          </p>
        </div>

        {/* Scope Guidelines */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
            <FileCode className="w-5 h-5 text-cyber-cyan" />
            <span>Scope of Research</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* In Scope */}
            <div className="bento-card border-cyber-cyan/30 p-6">
              <h3 className="text-base font-bold text-cyber-cyan font-mono flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>In-Scope Targets</span>
              </h3>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
                  <span>*.cyber.ntu.edu.pk Web Assets</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
                  <span>Next.js App Server &amp; API Routes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
                  <span>Public GitHub Security Repositories</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
                  <span>CTF Sandbox &amp; Challenge Daemons</span>
                </li>
              </ul>
            </div>

            {/* Out of Scope */}
            <div className="bento-card border-red-500/30 p-6">
              <h3 className="text-base font-bold text-amber-400 font-mono flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Strictly Prohibited Actions</span>
              </h3>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>Denial of Service (DoS / DDoS)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>Social Engineering / Phishing Staff</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>Destruction or Exfiltration of Data</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>Physical Security Attacks at NTU</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to Report */}
        <div className="bento-card p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyber-cyan" />
            <span>Encrypted Reporting Protocol</span>
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Please submit your findings with reproduction steps, PoC, and severity assessment to our faculty patron:
          </p>
          <div className="bg-cyber-950 p-4 rounded-xl border border-cyber-border font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-slate-500 block text-[10px]">FACULTY OVERSIGHT EMAIL:</span>
              <a href="mailto:advisor.cyber@ntu.edu.pk" className="text-cyber-cyan font-bold hover:underline">
                advisor.cyber@ntu.edu.pk
              </a>
            </div>
            <a
              href="/.well-known/security.txt"
              target="_blank"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 border border-cyber-border px-3 py-1.5 rounded-lg"
            >
              <span>View security.txt</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Hall of Fame */}
        <div id="hall-of-fame" className="bento-card p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-bold">
            <Award className="w-4 h-4" />
            <span>Hall of Fame // Security Acknowledgments</span>
          </div>
          <h2 className="text-xl font-bold text-white font-mono">
            Whitehat Security Researchers
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            We gratefully acknowledge independent researchers who have responsibly reported vulnerabilities to improve NTU's cybersecurity posture:
          </p>

          <div className="border border-cyber-border rounded-xl divide-y divide-cyber-border overflow-hidden font-mono text-xs">
            <div className="p-3 bg-cyber-950 flex justify-between items-center text-slate-400 text-[11px]">
              <span>RESEARCHER</span>
              <span>DOMAIN / REPORTED</span>
            </div>
            <div className="p-3.5 flex justify-between items-center text-slate-300">
              <span className="font-bold text-white">NTU Student Red Team Core</span>
              <span className="text-cyber-cyan">Next.js Header Hardening (2026)</span>
            </div>
            <div className="p-3.5 flex justify-between items-center text-slate-300">
              <span className="font-bold text-white">CS Lab Network Audit Team</span>
              <span className="text-cyber-cyan">Subnet Segmentation Review (2026)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
