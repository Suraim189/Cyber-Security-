import React from "react";
import Link from "next/link";
import { Shield, Mail, MapPin, ExternalLink, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal-900 text-charcoal-300 border-t border-charcoal-800">
      {/* Upper Footer: Society Identity & Core Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1 & 2: Branding & Ethics Commitment */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-inner">
                <Shield className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-bold text-white text-base tracking-tight block">
                  NTU Cyber Security Society
                </span>
                <span className="text-xs text-charcoal-400">
                  National Textile University, Faisalabad
                </span>
              </div>
            </div>

            <p className="text-sm text-charcoal-400 leading-relaxed pr-6">
              The official student technology body advancing cybersecurity research, 
              hands-on offensive/defensive training, CTF competitions, and digital ethics 
              at National Textile University, Pakistan.
            </p>

            <div className="p-3.5 rounded-lg bg-charcoal-800/80 border border-charcoal-700/60 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-charcoal-300 leading-normal">
                <strong className="text-white block font-medium">Commitment to Ethical Practice</strong>
                All research, training, and vulnerability discussions operate strictly within 
                authorized environments adhering to academic integrity and legal standards.
              </p>
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h4 className="text-white text-xs font-mono uppercase tracking-wider mb-4 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Society
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition-colors">
                  Leadership & Team
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Workshops & Events
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Projects & Research
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  Curated Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Focus Domains */}
          <div>
            <h4 className="text-white text-xs font-mono uppercase tracking-wider mb-4 font-semibold">
              Focus Areas
            </h4>
            <ul className="space-y-2.5 text-sm text-charcoal-400">
              <li>Penetration Testing</li>
              <li>Capture The Flag (CTF)</li>
              <li>Network & Cloud Defense</li>
              <li>Digital Forensics</li>
              <li>Vulnerability Research</li>
              <li>Secure Coding Practices</li>
            </ul>
          </div>

          {/* Column 5: Campus & Contact */}
          <div>
            <h4 className="text-white text-xs font-mono uppercase tracking-wider mb-4 font-semibold">
              University Location
            </h4>
            <div className="space-y-3 text-sm text-charcoal-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Department of Computer Science, National Textile University, Sheikhupura Road, Faisalabad, Pakistan
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>cybersecurity@ntu.edu.pk</span>
              </div>
              <div className="pt-2">
                <Link
                  href="https://ntu.edu.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 font-medium"
                >
                  <span>Official NTU Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-800 bg-charcoal-950/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>© {new Date().getFullYear()} NTU Cyber Security Society. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-charcoal-300 transition-colors">
              Membership Inquiries
            </Link>
            <Link href="/admin" className="hover:text-brand-400 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
