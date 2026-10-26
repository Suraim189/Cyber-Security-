"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Search, QrCode, CheckCircle2, AlertTriangle, ArrowRight, Award, Calendar, FileText } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

interface VerifiedCredential {
  id: string;
  recipientName: string;
  studentId: string;
  department: string;
  credentialType: string;
  issueDate: string;
  status: "VALID" | "REVOKED";
  issuer: string;
  signatureHash: string;
}

const SAMPLE_CREDENTIALS: Record<string, VerifiedCredential> = {
  "NTU-SEC-2026-001": {
    id: "NTU-SEC-2026-001",
    recipientName: "Hamza Tariq",
    studentId: "21-NTU-CS-1042",
    department: "Department of Computer Science",
    credentialType: "Official Society Leadership Credential — President",
    issueDate: "October 15, 2026",
    status: "VALID",
    issuer: "Dr. Muhammad Asif, Faculty Patron",
    signatureHash: "e5f29d4a8c17b60e32aa9084cb9183421109a9bc4721ef9a8b13c721908271e1",
  },
  "NTU-SEC-2026-042": {
    id: "NTU-SEC-2026-042",
    recipientName: "Abdullah Khan",
    studentId: "22-NTU-SE-1089",
    department: "Department of Software Engineering",
    credentialType: "Web Application Penetration Testing Workshop Certification",
    issueDate: "November 16, 2026",
    status: "VALID",
    issuer: "NTU Cyber Security Society Secretariat",
    signatureHash: "3a890471b6c098dfa9104821a7cd9812739a8bc47192a81749817290bc981204",
  },
  "NTU-SEC-2026-088": {
    id: "NTU-SEC-2026-088",
    recipientName: "Zainab Malik",
    studentId: "21-NTU-SE-1011",
    department: "Department of Software Engineering",
    credentialType: "Collegiate CTF Championship 1st Place Honors",
    issueDate: "September 28, 2026",
    status: "VALID",
    issuer: "National Textile University CS Department",
    signatureHash: "98271bc840192a74c981203948bca9182740918274a981274091827409812740",
  },
};

export default function VerifyPage() {
  const [searchId, setSearchId] = useState("");
  const [result, setResult] = useState<VerifiedCredential | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toUpperCase();
    if (!query) return;

    setHasSearched(true);
    const found = SAMPLE_CREDENTIALS[query] || null;
    setResult(found);
  };

  return (
    <div className="bg-cyber-900 text-slate-100 min-h-screen pb-24 selection:bg-cyber-cyan/20 selection:text-cyber-cyan">
      <PageHeader
        badge="PUBLIC VERIFICATION PROTOCOL"
        title="Credential & Certificate Verification"
        description="Cryptographically authenticate membership certificates, workshop completions, and executive credentials issued by the NTU Cyber Security Society."
        rightBadgeText="SHA-256 SIGNED"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
        {/* Verification Input Box */}
        <div className="bento-card p-6 sm:p-8">
          <form onSubmit={handleVerify} className="space-y-4">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Enter Credential Identifier (e.g. NTU-SEC-2026-001):
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="e.g. NTU-SEC-2026-001 or NTU-SEC-2026-042"
                  className="w-full bg-cyber-950 border border-cyber-border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan font-mono"
                />
              </div>
              <button
                type="submit"
                className="btn-cyber-cyan px-6 py-3 font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Verify Credential</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Sample IDs */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono text-slate-400">
              <span>Test Identifiers:</span>
              {["NTU-SEC-2026-001", "NTU-SEC-2026-042", "NTU-SEC-2026-088"].map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSearchId(id)}
                  className="px-2 py-0.5 rounded bg-cyber-950 border border-cyber-border hover:border-cyber-cyan text-cyber-cyan transition-colors"
                >
                  {id}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Verification Result Display */}
        {hasSearched && (
          <div>
            {result ? (
              <div className="bento-card border-emerald-500/50 bg-emerald-950/10 p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cyber-border gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                        AUTHENTIC // STATUS: {result.status}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                        {result.id}
                      </h2>
                    </div>
                  </div>

                  <Link
                    href={`/verify/${result.id}`}
                    className="text-xs font-mono text-cyber-cyan hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Permanent URL</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Credential Data Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="bg-cyber-950/80 p-3.5 rounded-xl border border-cyber-border">
                    <span className="text-slate-400 block text-[10px] mb-1">RECIPIENT NAME:</span>
                    <span className="text-base font-bold text-white">{result.recipientName}</span>
                    <span className="text-slate-400 block text-[11px] mt-0.5">{result.studentId}</span>
                  </div>

                  <div className="bg-cyber-950/80 p-3.5 rounded-xl border border-cyber-border">
                    <span className="text-slate-400 block text-[10px] mb-1">ACADEMIC DEPARTMENT:</span>
                    <span className="text-sm font-semibold text-white">{result.department}</span>
                    <span className="text-slate-400 block text-[11px] mt-0.5">National Textile University</span>
                  </div>

                  <div className="bg-cyber-950/80 p-3.5 rounded-xl border border-cyber-border">
                    <span className="text-slate-400 block text-[10px] mb-1">CREDENTIAL TYPE:</span>
                    <span className="text-sm font-bold text-cyber-cyan">{result.credentialType}</span>
                  </div>

                  <div className="bg-cyber-950/80 p-3.5 rounded-xl border border-cyber-border">
                    <span className="text-slate-400 block text-[10px] mb-1">ISSUE DATE &amp; AUTHORITY:</span>
                    <span className="text-sm font-semibold text-white">{result.issueDate}</span>
                    <span className="text-slate-400 block text-[11px] mt-0.5">{result.issuer}</span>
                  </div>
                </div>

                {/* Cryptographic Signature & QR */}
                <div className="p-4 rounded-xl bg-cyber-950 border border-cyber-border font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1 min-w-0">
                    <span className="text-[10px] text-slate-500 block uppercase tracking-wider">
                      SHA-256 DIGITAL ATTESTATION HASH:
                    </span>
                    <p className="text-[11px] text-cyber-cyan truncate font-mono">
                      {result.signatureHash}
                    </p>
                  </div>

                  <div className="p-2 bg-white rounded-lg flex-shrink-0">
                    {/* Visual QR Code Representation */}
                    <div className="w-16 h-16 bg-slate-900 flex items-center justify-center text-white text-[9px] font-bold text-center">
                      QR SEAL
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bento-card border-amber-500/40 bg-amber-950/10 p-8 text-center space-y-3 font-mono">
                <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Record Not Found</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  No verified credential matching identifier <strong className="text-amber-400 font-mono">{searchId}</strong> was located in the official society registry.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
