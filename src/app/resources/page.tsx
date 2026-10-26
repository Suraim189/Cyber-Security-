import React from "react";
import Link from "next/link";
import { BookOpen, ExternalLink, Compass, ShieldAlert, Award, FileCode, Terminal } from "lucide-react";
import { DataService } from "@/lib/data-service";
import { ResourceCategory } from "@/lib/types";
import { PageHeader } from "@/components/layout/PageHeader";
import { LearningRoadmap } from "@/components/learning/LearningRoadmap";

export const metadata = {
  title: "Educational Resources & Security Roadmaps // NTU Cyber Security Society",
  description: "Curated cybersecurity roadmaps, legal practice labs, CTF platforms, and reference guides for students at NTU.",
};

export default async function ResourcesPage() {
  const resources = await DataService.getResources(true);

  const categories: ResourceCategory[] = [
    "Roadmaps",
    "Practice Labs",
    "CTF Platforms",
    "Documentation",
    "Tools",
  ];

  return (
    <div className="bg-cyber-900 text-slate-100 min-h-screen pb-24 selection:bg-cyber-cyan/20 selection:text-cyber-cyan">
      {/* Header */}
      <PageHeader
        badge="// Student Knowledge Repository"
        title="Curated Security Resources"
        description="Vetted roadmaps, legal wargame labs, CTF practice portals, and authoritative documentation recommended by NTU Cyber Security Society mentors."
        rightBadgeText="KNOWLEDGE BASE SYNCED"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {categories.map((category) => {
          const catResources = resources.filter((r) => r.category === category);
          if (catResources.length === 0) return null;

          return (
            <div key={category}>
              <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-cyber-border font-mono">
                <BookOpen className="w-5 h-5 text-cyber-cyan" />
                <h2 className="text-xl font-bold text-white">{category}</h2>
                <span className="text-xs text-slate-500">
                  [{catResources.length}]
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catResources.map((item) => (
                  <div key={item.id} className="cyber-card p-6 cyber-card-hover flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3 font-mono">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            item.difficulty_level === "Beginner"
                              ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30"
                              : item.difficulty_level === "Intermediate"
                              ? "bg-blue-950/80 text-blue-400 border border-blue-500/30"
                              : "bg-purple-950/80 text-purple-400 border border-purple-500/30"
                          }`}
                        >
                          {item.difficulty_level}
                        </span>
                        <span className="text-[10px] text-slate-500">VERIFIED</span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-cyber-border mt-5 font-mono">
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyber-cyan hover:underline"
                      >
                        <span>Access Resource</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Interactive Roadmap */}
        <div className="pt-6">
          <LearningRoadmap />
        </div>

        {/* Suggestion Box */}
        <div className="cyber-card p-8 bg-cyber-850 border-cyber-border text-center max-w-2xl mx-auto">
          <h3 className="text-base font-bold text-white font-mono mb-1">
            Have a valuable security lab or paper to recommend?
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Society members regularly curate and expand this repository. Submit high-quality tools or tutorial suggestions to society leads.
          </p>
          <Link
            href="/contact"
            className="btn-cyber-secondary text-xs font-mono font-semibold"
          >
            <span>Submit Resource Recommendation</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
