import React from "react";
import Link from "next/link";
import { Users, Mail, Linkedin, Github, Shield, GraduationCap, ArrowRight, Activity, Terminal } from "lucide-react";
import { DataService } from "@/lib/data-service";
import { TeamListClient } from "@/components/team/TeamListClient";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
  title: "Society Leadership & Security Wings // NTU Cyber Security Society",
  description: "Meet the faculty mentors, executive council, and specialized security wings (Red Team, Blue Team, CTF) of the NTU Cyber Security Society.",
};

export default async function TeamPage() {
  const members = await DataService.getTeamMembers(true);
  const advisor = members.find((m) => m.hierarchy_order === 1);

  return (
    <div className="bg-cyber-900 text-slate-100 min-h-screen pb-24 selection:bg-cyber-cyan/20 selection:text-cyber-cyan">
      {/* Page Header */}
      <PageHeader
        badge="// Governance & Security Wings"
        title="Leadership & Tactical Roster"
        description="Student leaders and faculty mentors directing curriculum, technical workshops, collegiate CTF wargames, and security research at National Textile University."
        rightBadgeText="ROSTER VERIFIED"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        {/* Tier 1: Faculty Patron & Advisor Spotlight */}
        {advisor && (
          <section>
            <div className="mb-6 flex items-center gap-2 text-cyber-cyan font-mono text-xs uppercase tracking-wider font-bold">
              <GraduationCap className="w-4 h-4" />
              <span>Tier 01 // Faculty Patronage &amp; Academic Advisory</span>
            </div>

            <div className="bento-card border-cyber-border/90 bg-cyber-850/90 max-w-4xl flex flex-col sm:flex-row gap-8 items-center sm:items-start">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-cyber-cyan/40 flex-shrink-0 shadow-xl shadow-cyan-950/60 bg-cyber-950">
                {advisor.image_url ? (
                  <img
                    src={advisor.image_url}
                    alt={advisor.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-cyber-cyan font-mono text-3xl font-bold">
                    DR
                  </div>
                )}
              </div>

              <div className="space-y-3 text-center sm:text-left flex-1">
                <div>
                  <h3 className="text-2xl font-bold text-white font-mono">{advisor.name}</h3>
                  <div className="text-sm font-semibold text-cyber-cyan font-mono mt-0.5">{advisor.designation}</div>
                  <div className="text-xs text-slate-400">{advisor.department}</div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {advisor.bio}
                </p>

                {advisor.email && (
                  <div className="pt-2">
                    <a
                      href={`mailto:${advisor.email}`}
                      className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-cyber-cyan transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-cyber-cyan" />
                      <span>{advisor.email}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Tier 2: Interactive Wings & Leadership Grid */}
        <section>
          <div className="mb-6 flex items-center justify-between pb-3 border-b border-cyber-border font-mono">
            <div>
              <h2 className="text-2xl font-bold text-white">Operational Security Wings</h2>
              <p className="text-xs text-slate-400 mt-1">
                Interactive roster across Red Team, Blue Team, CTF and Executive leadership
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">
              Hover cards for 3D tilt
            </span>
          </div>

          <TeamListClient members={members} />
        </section>

        {/* Join Leadership CTA */}
        <section className="bento-card p-8 sm:p-12 text-center max-w-4xl mx-auto border-cyber-cyan/30">
          <Terminal className="w-12 h-12 text-cyber-cyan mx-auto mb-4" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Aspire to Lead a Technical Security Wing?
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Executive elections and technical lead selections occur each academic year. 
            Active contributors with proven lab engagement and CTF solve records are eligible for council nominations.
          </p>
          <Link
            href="/contact#join"
            className="btn-cyber-cyan font-mono font-bold text-xs sm:text-sm px-6 py-3 inline-flex items-center gap-2"
          >
            <span>Enlist in Society First</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
