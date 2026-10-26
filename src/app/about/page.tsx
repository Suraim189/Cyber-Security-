import React from "react";
import Link from "next/link";
import { 
  Shield, 
  Target, 
  Eye, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight,
  Cpu,
  Layers,
  Lock,
  Terminal
} from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
  title: "About the Society // NTU Cyber Security Society",
  description: "Learn about the mission, academic supervision, ethical tenets, and research focus of the NTU Cyber Security Society.",
};

export default function AboutPage() {
  const coreValues = [
    {
      title: "Ethical Responsibility",
      desc: "Every skill taught—from network packet inspection to exploit theory—is grounded in legal authorization, academic integrity, and responsible disclosure.",
    },
    {
      title: "Technical Rigor",
      desc: "We focus on rigorous, deep technical competence rather than superficial tool usage, emphasizing fundamentals in operating systems, networking, and assembly.",
    },
    {
      title: "Collaborative Learning",
      desc: "Senior students mentor junior peers, sharing notes, walkthroughs, and lab tutorials to elevate the overall cybersecurity readiness of NTU students.",
    },
    {
      title: "Digital Defense",
      desc: "Our mission extends beyond competitions to fostering general cyber hygiene and awareness for university faculty, staff, and regional organizations.",
    },
  ];

  const milestones = [
    {
      code: "PHASE-01",
      year: "Establishment",
      title: "Founding under Department of Computer Science",
      desc: "Formed as the premier student-led technical body dedicated to cybersecurity education and research at National Textile University, Faisalabad.",
    },
    {
      code: "PHASE-02",
      year: "Expansion",
      title: "Dedicated Hands-On Laboratory Sessions",
      desc: "Instituted regular hands-on workshops in web security, Linux internals, network penetration testing, and digital forensics in CS Lab 3.",
    },
    {
      code: "PHASE-03",
      year: "Competitiveness",
      title: "Collegiate CTF Team Formation & Tournaments",
      desc: "Assembled competitive university CTF teams representing NTU in nationwide collegiate competitions and online global wargames.",
    },
  ];

  return (
    <div className="bg-cyber-900 text-slate-100 min-h-screen pb-24 selection:bg-cyber-cyan/20 selection:text-cyber-cyan">
      {/* Header Banner */}
      <PageHeader
        badge="National Textile University, Faisalabad"
        title="About NTU Cyber Security Society"
        description="We are a community of student researchers, ethical hackers, and defensive architects dedicated to advancing digital resilience and technical security mastery."
        rightBadgeText="ACADEMIC MANDATE ACTIVE"
      />

      {/* Mission & Vision */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="cyber-card p-8 border-cyber-border bg-cyber-850">
            <div className="w-12 h-12 rounded-xl bg-cyber-900 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan mb-6 shadow-cyber-glow">
              <Target className="w-6 h-6 stroke-[1.8]" />
            </div>
            <span className="text-xs font-mono text-cyber-cyan uppercase tracking-wider font-semibold">
              Primary Mandate
            </span>
            <h2 className="text-2xl font-bold text-white mt-1 mb-3">Our Mission</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              To cultivate an elite, responsible, and skilled community of cybersecurity practitioners 
              at National Textile University by providing hands-on lab environments, research guidance, 
              industry seminars, and competitive wargame preparation.
            </p>
          </div>

          <div className="cyber-card p-8 border-cyber-border bg-cyber-850">
            <div className="w-12 h-12 rounded-xl bg-cyber-900 border border-blue-500/30 flex items-center justify-center text-cyber-blue mb-6">
              <Eye className="w-6 h-6 stroke-[1.8]" />
            </div>
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
              Strategic Vision
            </span>
            <h2 className="text-2xl font-bold text-white mt-1 mb-3">Our Vision</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              To position National Textile University as a distinguished hub for cybersecurity research, 
              threat intelligence analysis, and defensive engineering across Pakistan, producing graduates 
              who lead modern enterprise security programs.
            </p>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-cyber-850 border-y border-cyber-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-cyber-900 text-cyber-cyan border border-cyber-border mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>Ethical Code</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Foundational Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((v, i) => (
              <div key={i} className="p-6 rounded-xl border border-cyber-border bg-cyber-900">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-cyber-cyan flex-shrink-0" />
                  <h3 className="text-lg font-bold text-white font-mono">{v.title}</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed pl-8">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Faculty Oversight */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cyber-card p-8 sm:p-12 border-cyber-border bg-cyber-850 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-20 h-20 rounded-2xl bg-cyber-900 border border-cyber-cyan/30 text-cyber-cyan flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/10">
            <GraduationCap className="w-10 h-10 stroke-[1.5]" />
          </div>
          <div className="space-y-3 flex-1 text-center md:text-left">
            <div className="text-xs font-mono uppercase tracking-wider text-cyber-cyan font-semibold">
              Institutional Patronage
            </div>
            <h3 className="text-2xl font-bold text-white">
              Department of Computer Science Oversight
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              The NTU Cyber Security Society functions under the official patronage and mentorship of the 
              Department of Computer Science at National Textile University, Faisalabad. 
              All lab activities, curriculum workshops, and public events adhere strictly to academic 
              governance and state cybersecurity regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Milestones / Trajectory */}
      <section className="py-16 bg-cyber-900 border-t border-cyber-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-cyber-850 text-cyber-cyan border border-cyber-border mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>Evolution Timeline</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Milestones &amp; Continuing Growth
            </h2>
          </div>

          <div className="space-y-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="cyber-card p-6 flex flex-col sm:flex-row gap-6 items-start">
                <div className="px-3 py-1.5 rounded bg-cyber-900 border border-cyber-cyan/30 text-cyber-cyan font-mono text-xs font-semibold whitespace-nowrap">
                  {m.code} // {m.year}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">{m.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Join CTA */}
          <div className="mt-12 text-center pt-8 border-t border-cyber-border font-mono">
            <Link
              href="/contact#join"
              className="btn-cyber-cyan text-xs font-bold"
            >
              <span>Get Involved With NTU CSS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
