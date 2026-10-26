import React from "react";
import Link from "next/link";
import { FolderGit2, Github, ExternalLink, ShieldCheck, Terminal, Cpu } from "lucide-react";
import { DataService } from "@/lib/data-service";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
  title: "Projects & Research Initiatives // NTU Cyber Security Society",
  description: "Explore open-source security tools, academic research projects, and student engineering developed by NTU Cyber Security Society.",
};

export default async function ProjectsPage() {
  const projects = await DataService.getProjects(true);

  return (
    <div className="bg-cyber-900 text-slate-100 min-h-screen pb-24 selection:bg-cyber-cyan/20 selection:text-cyber-cyan">
      {/* Page Header */}
      <PageHeader
        badge="// Engineering & Vulnerability Research"
        title="Projects & Security Tools"
        description="Technical tools, empirical security analyses, and open-source defensive utilities architected by society members and research working groups."
        rightBadgeText="RESEARCH CORE ACTIVE"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Research Ethics Banner */}
        <div className="mb-12 p-4 rounded-xl bg-cyber-850 border border-cyber-cyan/30 flex items-start gap-3.5 shadow-md">
          <ShieldCheck className="w-5 h-5 text-cyber-cyan flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white font-mono block mb-0.5">ACADEMIC RESEARCH &amp; WHITE-HAT DISCLOSURE:</strong>
            All projects listed below are developed exclusively for educational triage, defensive benchmarking, 
            and authorized research. Repositories do not distribute malicious payloads or exploit materials.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div key={proj.id} className="cyber-card p-6 cyber-card-hover flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-cyber-cyan uppercase tracking-wider">
                    {proj.domain}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-cyber-900 border border-cyber-border flex items-center justify-center text-cyber-cyan">
                    <Terminal className="w-4 h-4" />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white leading-snug">
                  {proj.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {proj.summary}
                </p>

                {proj.detailed_description && (
                  <p className="text-xs text-slate-400 leading-relaxed italic bg-cyber-950 p-3 rounded-lg border border-cyber-border/70">
                    {proj.detailed_description}
                  </p>
                )}

                {/* Tech Stack */}
                <div className="pt-2">
                  <span className="text-[10px] text-slate-500 block mb-1.5 font-mono uppercase tracking-wider">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech_stack.map((t) => (
                      <span key={t} className="tech-badge">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Authors & Links */}
              <div className="pt-6 border-t border-cyber-border mt-6 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  {proj.lead_author}
                </span>

                <div className="flex items-center gap-3">
                  {proj.github_url && (
                    <Link
                      href={proj.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-300 hover:text-cyber-cyan hover:bg-cyber-900 rounded-md transition-colors flex items-center gap-1 font-semibold"
                      title="GitHub Source"
                    >
                      <Github className="w-4 h-4" />
                      <span>Repo</span>
                    </Link>
                  )}
                  {proj.live_demo_url && (
                    <Link
                      href={proj.live_demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-cyber-cyan hover:underline flex items-center gap-1 font-semibold"
                      title="Live Demo"
                    >
                      <span>Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
