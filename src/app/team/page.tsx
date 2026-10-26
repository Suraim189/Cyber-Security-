import React from "react";
import Link from "next/link";
import { Users, Mail, Linkedin, Github, Shield, GraduationCap } from "lucide-react";
import { DataService } from "@/lib/data-service";

export const metadata = {
  title: "Society Leadership & Executive Team",
  description: "Meet the faculty advisors, student executives, and technical domain leads of the NTU Cyber Security Society.",
};

export default async function TeamPage() {
  const members = await DataService.getTeamMembers(true);

  const advisor = members.find((m) => m.hierarchy_order === 1);
  const executives = members.filter((m) => m.hierarchy_order === 2 || m.hierarchy_order === 3);
  const leads = members.filter((m) => m.hierarchy_order === 4);
  const generalMembers = members.filter((m) => m.hierarchy_order === 5);

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Page Header */}
      <section className="bg-white border-b border-surface-border py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-medium text-brand-700 uppercase tracking-wider">
              Governance & Structure
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-charcoal-900 tracking-tight">
              Society Leadership & Council
            </h1>
            <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed">
              The students and faculty mentors directing curriculum, technical workshops, 
              CTF competitions, and research at National Textile University.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        
        {/* Tier 1: Faculty Patron & Advisor */}
        {advisor && (
          <section>
            <div className="mb-6 flex items-center gap-2 text-brand-800">
              <GraduationCap className="w-5 h-5 text-brand-700" />
              <h2 className="text-xs font-mono uppercase tracking-wider font-bold">
                Faculty Patronage & Advisory
              </h2>
            </div>

            <div className="surface-card p-8 sm:p-10 border-brand-200/90 bg-white max-w-4xl flex flex-col sm:flex-row gap-8 items-center sm:items-start">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-brand-50 border-2 border-brand-200 flex items-center justify-center text-brand-700 flex-shrink-0 shadow-sm">
                <GraduationCap className="w-12 h-12 stroke-[1.5]" />
              </div>

              <div className="space-y-3 text-center sm:text-left flex-1">
                <div>
                  <h3 className="text-2xl font-bold text-charcoal-900">{advisor.name}</h3>
                  <div className="text-sm font-semibold text-brand-700 mt-0.5">{advisor.designation}</div>
                  <div className="text-xs text-charcoal-500">{advisor.department}</div>
                </div>

                {advisor.bio && (
                  <p className="text-sm text-charcoal-600 leading-relaxed pt-1">
                    {advisor.bio}
                  </p>
                )}

                {advisor.email && (
                  <div className="pt-2">
                    <Link
                      href={`mailto:${advisor.email}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-700 hover:text-brand-800"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{advisor.email}</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Tier 2: Executive Body (President, VP, General Secretary) */}
        <section>
          <div className="mb-6 flex items-center gap-2 text-charcoal-800">
            <Shield className="w-5 h-5 text-brand-700" />
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold">
              Executive Council
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executives.map((member) => (
              <div key={member.id} className="surface-card p-6 surface-card-hover flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700 mb-5">
                    <Users className="w-8 h-8 stroke-[1.6]" />
                  </div>

                  <h3 className="text-xl font-bold text-charcoal-900">{member.name}</h3>
                  <div className="text-xs font-semibold text-brand-700 mt-1 uppercase tracking-wide">
                    {member.designation}
                  </div>
                  <div className="text-xs text-charcoal-500 mt-1">{member.department}</div>

                  {member.bio && (
                    <p className="text-xs text-charcoal-600 leading-relaxed mt-4">
                      {member.bio}
                    </p>
                  )}
                </div>

                <div className="pt-6 border-t border-charcoal-100 mt-6 flex items-center gap-3">
                  {member.email && (
                    <Link
                      href={`mailto:${member.email}`}
                      className="p-1.5 rounded-md text-charcoal-400 hover:text-brand-700 hover:bg-brand-50 transition-colors"
                      title="Email Member"
                    >
                      <Mail className="w-4 h-4" />
                    </Link>
                  )}
                  {member.linkedin_url && (
                    <Link
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-charcoal-400 hover:text-brand-700 hover:bg-brand-50 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Link>
                  )}
                  {member.github_url && (
                    <Link
                      href={member.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-charcoal-400 hover:text-brand-700 hover:bg-brand-50 transition-colors"
                      title="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tier 3: Technical Domain Leads */}
        <section>
          <div className="mb-6 flex items-center gap-2 text-charcoal-800">
            <Shield className="w-5 h-5 text-brand-700" />
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold">
              Technical & Domain Leads
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leads.map((member) => (
              <div key={member.id} className="surface-card p-6 surface-card-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-charcoal-900">{member.name}</h3>
                      <div className="text-xs font-semibold text-brand-700 mt-0.5">
                        {member.designation}
                      </div>
                      <div className="text-xs text-charcoal-500 mt-0.5">{member.department}</div>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-charcoal-100 flex items-center justify-center text-charcoal-700">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>

                  {member.bio && (
                    <p className="text-xs text-charcoal-600 leading-relaxed mt-4">
                      {member.bio}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-charcoal-100 mt-5 flex items-center gap-3">
                  {member.github_url && (
                    <Link
                      href={member.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-charcoal-600 hover:text-brand-700 font-medium"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Security Repositories</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* General Working Members / Volunteers (when populated) */}
        {generalMembers.length > 0 && (
          <section>
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-charcoal-600 mb-6">
              Active Society Members
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {generalMembers.map((m) => (
                <div key={m.id} className="p-4 rounded-lg border border-charcoal-200 bg-white text-center">
                  <div className="font-semibold text-sm text-charcoal-900">{m.name}</div>
                  <div className="text-xs text-brand-700">{m.designation}</div>
                  <div className="text-xs text-charcoal-500">{m.department}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Invitation to Lead */}
        <div className="surface-card p-8 border-dashed border-charcoal-300 text-center max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-charcoal-900 mb-2">
            Interested in Joining Society Leadership?
          </h3>
          <p className="text-sm text-charcoal-600 leading-relaxed mb-6">
            Elections and lead appointments are held annually across Computer Science and Software Engineering departments. 
            Active members who demonstrate technical commitment and community service are prioritized.
          </p>
          <Link
            href="/contact#join"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-charcoal-900 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
          >
            Apply for Membership
          </Link>
        </div>

      </div>
    </div>
  );
}
