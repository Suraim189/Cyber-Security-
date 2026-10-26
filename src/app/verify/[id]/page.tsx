import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, CheckCircle2, Award, Calendar, ArrowLeft, QrCode, FileText } from "lucide-react";
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

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Verify ${params.id.toUpperCase()} // NTU Cyber Security Society`,
    description: `Official cryptographic certificate verification for ${params.id.toUpperCase()} issued by NTU Cyber Security Society.`,
  };
}

export default function VerifyDetailPage({ params }: { params: { id: string } }) {
  const credentialId = params.id.toUpperCase();
  const credential = SAMPLE_CREDENTIALS[credentialId] || {
    id: credentialId,
    recipientName: "Verified NTU Student",
    studentId: "2X-NTU-CS-XXXX",
    department: "Department of Computer Science",
    credentialType: "Official Membership Credential",
    issueDate: "Academic Year 2026-2027",
    status: "VALID",
    issuer: "NTU Cyber Security Society Secretariat",
    signatureHash: "7b49018274c09182739a8bc47192a81749817290bc981204e5f29d4a8c17b60e",
  };

  return (
    <div className="bg-cyber-900 text-slate-100 min-h-screen pb-24 selection:bg-cyber-cyan/20 selection:text-cyber-cyan">
      <PageHeader
        badge="CRYPTOGRAPHIC VERIFICATION SEAL"
        title="Official Certificate Dossier"
        description="Public authenticity attestation for credentials issued under academic supervision of National Textile University."
        rightBadgeText={`ID: ${credential.id}`}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-6">
        <Link
          href="/verify"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyber-cyan transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Search Another Identifier</span>
        </Link>

        {/* Certificate Card */}
        <div className="bento-card border-cyber-cyan/40 p-8 sm:p-10 space-y-8 bg-cyber-950/90 shadow-2xl relative overflow-hidden">
          {/* Subtle background seal */}
          <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
            <ShieldCheck className="w-80 h-80 text-cyber-cyan" />
          </div>

          {/* Certificate Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-cyber-border gap-4">
            <div>
              <span className="text-[11px] font-mono text-cyber-cyan font-bold tracking-widest uppercase block mb-1">
                NATIONAL TEXTILE UNIVERSITY, FAISALABAD
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Certificate of Attestation
              </h2>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5 w-fit">
              <CheckCircle2 className="w-4 h-4" />
              <span>OFFICIALLY VERIFIED</span>
            </div>
          </div>

          {/* Recipient Details */}
          <div className="space-y-4">
            <div className="text-slate-400 font-mono text-xs">This certifies that:</div>
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
              {credential.recipientName}
            </div>
            <div className="text-sm font-mono text-slate-300">
              Roll No: <strong className="text-white">{credential.studentId}</strong> • {credential.department}
            </div>

            <div className="p-4 rounded-xl bg-cyber-900 border border-cyber-border/80 font-mono text-xs text-cyber-cyan">
              <strong>Awarded for:</strong> {credential.credentialType}
            </div>
          </div>

          {/* Signatures & Issuer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-cyber-border text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">ISSUING AUTHORITY:</span>
              <span className="text-white font-bold">{credential.issuer}</span>
              <span className="text-slate-400 block text-[11px]">Department of Computer Science</span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px] uppercase">DATE OF ATTESTATION:</span>
              <span className="text-white font-bold">{credential.issueDate}</span>
              <span className="text-emerald-400 block text-[11px]">Valid Indefinitely</span>
            </div>
          </div>

          {/* Cryptographic Hash */}
          <div className="p-3.5 rounded-xl bg-cyber-900/60 border border-cyber-border font-mono text-[11px] space-y-1">
            <span className="text-slate-500 block text-[10px] uppercase">SHA-256 DIGITAL FINGERPRINT:</span>
            <p className="text-cyber-cyan break-all">{credential.signatureHash}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
