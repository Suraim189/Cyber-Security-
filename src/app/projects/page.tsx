import React from "react";
import Link from "next/link";
import { FolderGit2, Github, ExternalLink, ShieldCheck, Terminal } from "lucide-react";
import { DataService } from "@/lib/data-service";

export const metadata = {
  title: "Projects & Research Initiatives",
  description: "Explore open-source security tools, academic research projects, and student engineering developed by NTU Cyber Security Society.",
};

export default async function ProjectsPage() {
  const projects = await DataService.getProjects(true);

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Page Header */}
      <section className="bg-white border-b border-surface-border py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-medium text-brand-700 uppercase tracking-wider">
              Engineering & Innovation
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-charcoal-900 tracking-tight">
              Projects & Security Research
            </h1>
            <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed">
              Technical tools, empirical security analyses, and open-source defensive utilities 
              architected by society members and research working groups.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Research Ethics Banner */}
        <div className="mb-12 p-4 rounded-xl bg-white border border-charcoal-200 flex items-start gap-3.5 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-brand-700 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-charcoal-600 leading-relaxed">
            <strong className="text-charcoal-900 font-semibold block">Academic Research Notice:</strong>
            All projects listed below are developed exclusively for educational triage, defensive benchmarking, 
            and authorized research. Source repositories do not distribute malicious payloads or exploit materials.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div key={proj.id} className="surface-card p-6 surface-card-hover flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-brand-700 uppercase tracking-wider">
                    {proj.domain}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-charcoal-100 flex items-center justify-center text-charcoal-700">
                    <Terminal className="w-4 h-4" />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-charcoal-900 leading-snug">
                  {proj.title}
                </h2>

                <p className="text-sm text-charcoal-600 leading-relaxed">
                  {proj.summary}
                </p>

                {proj.detailed_description && (
                  <p className="text-xs text-charcoal-500 leading-relaxed italic bg-surface-muted p-3 rounded-lg border border-charcoal-200/60">
                    {proj.detailed_description}
                  </p>
                )}

                {/* Tech Stack */}
                <div className="pt-2">
                  <span className="text-xs text-charcoal-400 block mb-1.5 font-mono">Technologies</span>
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
              <div className="pt-6 border-t border-charcoal-100 mt-6 flex items-center justify-between text-xs">
                <span className="text-charcoal-500 font-medium">
                  {proj.lead_author}
                </span>

                <div className="flex items-center gap-3">
                  {proj.github_url && (
                    <Link
                      href={proj.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-charcoal-600 hover:text-brand-700 hover:bg-brand-50 rounded-md transition-colors flex items-center gap-1 font-medium"
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
                      className="p-1.5 text-brand-700 hover:text-brand-800 hover:bg-brand-50 rounded-md transition-colors flex items-center gap-1 font-medium"
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
