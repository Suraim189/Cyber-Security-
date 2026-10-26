import React from "react";
import Link from "next/link";
import { Shield, Mail, MapPin, ExternalLink, ShieldCheck, Terminal, Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-cyber-950 text-slate-300 border-t border-cyber-border">
      {/* Upper Footer: Society Identity & Core Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1 & 2: Branding & Ethics Commitment */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-blue to-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30">
                <Shield className="w-5 h-5 stroke-[2.2] text-cyber-cyan" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block">
                  NTU Cyber Security Society
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  National Textile University, Faisalabad
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              The official university student organization advancing cybersecurity research, 
              hands-on offensive/defensive training, CTF competitions, and digital ethics 
              at National Textile University, Pakistan.
            </p>

            <div className="p-3.5 rounded-lg bg-cyber-900 border border-cyber-border flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-cyber-cyan flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-normal">
                <strong className="text-white block font-mono text-[11px] uppercase tracking-wide">
                  Ethical Research Protocol
                </strong>
                All activities, vulnerability triage, and security research operate strictly within 
                authorized university environments in accordance with academic integrity and legal state statutes.
              </p>
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h4 className="text-white text-xs font-mono uppercase tracking-wider mb-4 font-semibold text-cyber-cyan">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-slate-400">
              <li>
                <Link href="/" className="hover:text-cyber-cyan transition-colors">
                  // Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyber-cyan transition-colors">
                  // About Society
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-cyber-cyan transition-colors">
                  // Leadership &amp; Team
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-cyber-cyan transition-colors">
                  // Workshops &amp; CTFs
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-cyber-cyan transition-colors">
                  // Projects &amp; Research
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-cyber-cyan transition-colors">
                  // Curated Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Focus Domains */}
          <div>
            <h4 className="text-white text-xs font-mono uppercase tracking-wider mb-4 font-semibold text-cyber-cyan">
              Technical Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-slate-400">
              <li>[01] Ethical Hacking</li>
              <li>[02] Web App Security</li>
              <li>[03] Digital Forensics</li>
              <li>[04] Network Defense</li>
              <li>[05] Cryptography</li>
              <li>[06] CTF Competitions</li>
            </ul>
          </div>

          {/* Column 5: Campus & Contact */}
          <div>
            <h4 className="text-white text-xs font-mono uppercase tracking-wider mb-4 font-semibold text-cyber-cyan">
              Headquarters
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyber-cyan flex-shrink-0 mt-0.5" />
                <span className="leading-snug text-xs">
                  Department of Computer Science, National Textile University, Sheikhupura Road, Faisalabad, Pakistan
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-mono">
                <Mail className="w-4 h-4 text-cyber-cyan flex-shrink-0" />
                <span>cybersecurity@ntu.edu.pk</span>
              </div>
              <div className="pt-2">
                <Link
                  href="https://ntu.edu.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyber-cyan hover:underline"
                >
                  <span>Official NTU Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cyber-border bg-cyber-950/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} NTU Cyber Security Society. Department of Computer Science.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/security" className="hover:text-emerald-400 transition-colors">
              // Security Policy
            </Link>
            <a href="/.well-known/security.txt" target="_blank" className="hover:text-cyber-cyan transition-colors">
              // security.txt
            </a>
            <Link href="/contact#join" className="hover:text-cyber-cyan transition-colors">
              // Enlistment
            </Link>
            <Link href="/admin" className="hover:text-cyber-cyan transition-colors">
              // Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
