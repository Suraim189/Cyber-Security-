import React from "react";
import Link from "next/link";
import { BookOpen, ExternalLink, Compass, ShieldAlert, Award, FileCode } from "lucide-react";
import { DataService } from "@/lib/data-service";
import { ResourceCategory } from "@/lib/types";

export const metadata = {
  title: "Educational Resources & Security Roadmaps",
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
    <div className="bg-background min-h-screen pb-24">
      {/* Header */}
      <section className="bg-white border-b border-surface-border py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-medium text-brand-700 uppercase tracking-wider">
              Student Knowledge Base
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-charcoal-900 tracking-tight">
              Curated Cybersecurity Resources
            </h1>
            <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed">
              Vetted roadmaps, legal wargame labs, CTF practice portals, and authoritative documentation 
              recommended by NTU Cyber Security Society mentors.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {categories.map((category) => {
          const catResources = resources.filter((r) => r.category === category);
          if (catResources.length === 0) return null;

          return (
            <div key={category}>
              <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-charcoal-200">
                <BookOpen className="w-5 h-5 text-brand-700" />
                <h2 className="text-xl font-bold text-charcoal-900">{category}</h2>
                <span className="text-xs text-charcoal-500 font-mono">
                  ({catResources.length})
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catResources.map((item) => (
                  <div key={item.id} className="surface-card p-6 surface-card-hover flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                            item.difficulty_level === "Beginner"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : item.difficulty_level === "Intermediate"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-purple-50 text-purple-700 border border-purple-200"
                          }`}
                        >
                          {item.difficulty_level}
                        </span>
                        <span className="text-xs text-charcoal-400 font-mono">Verified Resource</span>
                      </div>

                      <h3 className="text-lg font-bold text-charcoal-900 mb-2 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-charcoal-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-charcoal-100 mt-5">
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800"
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

        {/* Suggestion Box */}
        <div className="surface-card p-8 bg-brand-50/50 border-brand-200 text-center max-w-2xl mx-auto">
          <h3 className="text-base font-bold text-charcoal-900 mb-1">
            Have a valuable security lab or paper to recommend?
          </h3>
          <p className="text-xs text-charcoal-600 leading-relaxed mb-4">
            Society members regularly curate and expand this repository. Submit high-quality tools or tutorial suggestions to the society leads.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-charcoal-900 text-white text-xs font-medium hover:bg-brand-700 transition-colors"
          >
            <span>Submit Resource Recommendation</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
