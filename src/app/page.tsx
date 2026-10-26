import React from "react";
import Link from "next/link";
import { 
  Shield, 
  Terminal, 
  Cpu, 
  Search, 
  Trophy, 
  Lock, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ExternalLink 
} from "lucide-react";
import { DataService } from "@/lib/data-service";
import { formatDate } from "@/lib/utils";

export default async function HomePage() {
  const events = await DataService.getEvents(true);
  const projects = await DataService.getProjects(true);
  const team = await DataService.getTeamMembers(true);

  const upcomingEvents = events.slice(0, 2);
  const featuredProjects = projects.slice(0, 2);
  const leadership = team.filter((m) => m.hierarchy_order <= 3).slice(0, 4);

  const focusAreas = [
    {
      icon: Terminal,
      title: "Ethical Hacking & Pentesting",
      desc: "Structured vulnerability assessments, network reconnaissance, and authorized red-team lab exercises in controlled environments.",
      tags: ["OWASP", "Burp Suite", "Kali Linux"],
    },
    {
      icon: Shield,
      title: "Defensive Security & SOC",
      desc: "Hardening operating systems, enterprise firewalls, security incident event management (SIEM), and active intrusion detection.",
      tags: ["Splunk", "Wazuh", "Snort"],
    },
    {
      icon: Search,
      title: "Digital Forensics & Incident Response",
      desc: "Investigating memory artifacts, disk triage, malware analysis, and network packet forensics for breach post-mortems.",
      tags: ["Autopsy", "Volatility", "Wireshark"],
    },
    {
      icon: Trophy,
      title: "Capture The Flag (CTF)",
      desc: "Competitive hacking training encompassing cryptography, reverse engineering, binary exploitation, and jeopardy challenges.",
      tags: ["CTFd", "Ghidra", "Crypto"],
    },
    {
      icon: Cpu,
      title: "Hardware & IoT Security",
      desc: "Exploring firmware extraction, hardware debugging interfaces (JTAG/UART), and securing embedded university systems.",
      tags: ["Firmware", "Logic Analyzers", "UART"],
    },
    {
      icon: Lock,
      title: "Secure Software Development",
      desc: "Integrating static/dynamic code analysis (SAST/DAST) and defensive engineering into modern web and systems software.",
      tags: ["DevSecOps", "Static Analysis", "CI/CD"],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-white border-b border-surface-border">
        {/* Subtle architectural grid background */}
        <div className="absolute inset-0 editorial-grid opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Description & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-800 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
                <span>National Textile University, Faisalabad</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal-900 leading-[1.12]">
                Pioneering Cyber Defense & Security Research at NTU.
              </h1>

              <p className="text-lg sm:text-xl text-charcoal-600 leading-relaxed max-w-2xl">
                The official student organization advancing ethical hacking, digital forensics, 
                CTF competitiveness, and security awareness through hands-on technical workshops.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact#join"
                  className="px-6 py-3.5 rounded-xl bg-brand-700 text-white font-medium text-base hover:bg-brand-800 shadow-sm transition-all hover:shadow flex items-center gap-2 group"
                >
                  <span>Apply for Membership</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/events"
                  className="px-6 py-3.5 rounded-xl bg-white border border-charcoal-300 text-charcoal-800 font-medium text-base hover:bg-charcoal-50 hover:border-charcoal-400 transition-all"
                >
                  Explore Workshops
                </Link>
              </div>

              {/* Verified Key Indicators */}
              <div className="pt-8 border-t border-charcoal-200/80 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-charcoal-900 font-mono">100+</div>
                  <div className="text-xs text-charcoal-500 font-medium mt-0.5">Active Student Members</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-charcoal-900 font-mono">6+</div>
                  <div className="text-xs text-charcoal-500 font-medium mt-0.5">Technical Domains</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-charcoal-900 font-mono">100%</div>
                  <div className="text-xs text-charcoal-500 font-medium mt-0.5">Hands-On Practice</div>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Visual Card Composition */}
                <div className="surface-card p-6 shadow-xl relative overflow-hidden bg-white border-charcoal-200">
                  <div className="flex items-center justify-between pb-4 border-b border-charcoal-100 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                      <div className="w-3 h-3 rounded-full bg-green-400/80" />
                    </div>
                    <span className="text-xs font-mono text-charcoal-400 font-medium">ntu-css-terminal</span>
                  </div>

                  <div className="space-y-4 font-mono text-xs text-charcoal-700 leading-relaxed">
                    <p className="text-charcoal-400"># Initializing NTU Cyber Security Environment</p>
                    <p>
                      <span className="text-brand-600 font-semibold">$</span> ntu-css status --verify
                    </p>
                    
                    <div className="p-3.5 rounded-lg bg-charcoal-50 border border-charcoal-200/70 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-charcoal-600">Offensive Labs:</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Operational
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-charcoal-600">CTF Training Wing:</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-charcoal-600">Faculty Advisory:</span>
                        <span className="text-charcoal-900 font-medium">Dept of CS, NTU</span>
                      </div>
                    </div>

                    <p className="pt-1">
                      <span className="text-brand-600 font-semibold">$</span> run-session --topic="Web Security & Cryptography"
                    </p>
                    <p className="text-charcoal-500 italic pl-3 border-l-2 border-brand-300">
                      "Fostering ethical responsibility, curiosity, and defensive resilience."
                    </p>
                  </div>

                  {/* Highlights badge */}
                  <div className="mt-6 pt-4 border-t border-charcoal-100 flex items-center justify-between text-xs text-charcoal-500">
                    <span className="flex items-center gap-1.5 font-sans">
                      <Lock className="w-3.5 h-3.5 text-brand-600" /> Authorized Academic Labs
                    </span>
                    <span className="font-mono text-brand-700 font-medium">v2026.1</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SOCIETY PURPOSE & PILLARS */}
      <section className="py-20 bg-surface-muted border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-xs font-mono uppercase tracking-wider text-brand-700 font-semibold mb-2">
              Our Academic Role
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-charcoal-900 leading-tight">
              Bridging University Theory with Practical Security Defense.
            </h3>
            <p className="mt-4 text-base text-charcoal-600 leading-relaxed">
              We empower students across National Textile University to master defensive principles, 
              identify software vulnerabilities ethically, and compete on national and international CTF leaderboards.
            </p>
          </div>

          {/* Focus Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div key={idx} className="surface-card p-6 surface-card-hover flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700 mb-5">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <h4 className="text-lg font-bold text-charcoal-900 mb-2">
                      {area.title}
                    </h4>
                    <p className="text-sm text-charcoal-600 leading-relaxed mb-6">
                      {area.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-charcoal-100">
                    {area.tags.map((t) => (
                      <span key={t} className="tech-badge">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. UPCOMING EVENTS & WORKSHOPS */}
      <section className="py-20 bg-white border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-brand-700 font-semibold mb-2">
                Calendar & Activities
              </h2>
              <h3 className="text-3xl font-bold text-charcoal-900">
                Upcoming Society Events
              </h3>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="surface-card p-6 surface-card-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                      {evt.category}
                    </span>
                    <span className="text-xs text-charcoal-500 font-mono flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-600" />
                      {formatDate(evt.event_date)}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-charcoal-900 mb-2.5 hover:text-brand-700 transition-colors">
                    {evt.title}
                  </h4>
                  <p className="text-sm text-charcoal-600 leading-relaxed mb-6">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between text-xs text-charcoal-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-charcoal-400" />
                    <span>{evt.venue}</span>
                  </div>
                  {evt.registration_link && (
                    <Link
                      href={evt.registration_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand-700 hover:text-brand-800 flex items-center gap-1"
                    >
                      <span>Register</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED RESEARCH & PROJECTS */}
      <section className="py-20 bg-surface-muted border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-brand-700 font-semibold mb-2">
                Student Engineering
              </h2>
              <h3 className="text-3xl font-bold text-charcoal-900">
                Featured Projects & Research
              </h3>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((proj) => (
              <div key={proj.id} className="surface-card p-6 surface-card-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-medium text-brand-700 uppercase tracking-wide">
                      {proj.domain}
                    </span>
                    <span className="text-xs text-charcoal-500">
                      By {proj.lead_author}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-charcoal-900 mb-2">
                    {proj.title}
                  </h4>
                  <p className="text-sm text-charcoal-600 leading-relaxed mb-6">
                    {proj.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-charcoal-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech_stack.map((tech) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {proj.github_url && (
                    <Link
                      href={proj.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-charcoal-700 hover:text-brand-700 flex items-center gap-1"
                    >
                      <span>Code Repository</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP & FACULTY PREVIEW */}
      <section className="py-20 bg-white border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-brand-700 font-semibold mb-2">
                Executive Council
              </h2>
              <h3 className="text-3xl font-bold text-charcoal-900">
                Society Leadership
              </h3>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              <span>View Full Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((member) => (
              <div key={member.id} className="surface-card p-5 surface-card-hover flex flex-col text-center items-center">
                <div className="w-20 h-20 rounded-full bg-brand-50 border-2 border-brand-100 flex items-center justify-center text-brand-700 mb-4 shadow-sm">
                  <Users className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="text-base font-bold text-charcoal-900">
                  {member.name}
                </h4>
                <p className="text-xs font-semibold text-brand-700 mt-1">
                  {member.designation}
                </p>
                <p className="text-xs text-charcoal-500 mt-1">
                  {member.department}
                </p>
                {member.bio && (
                  <p className="text-xs text-charcoal-600 mt-3 line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-16 bg-charcoal-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ready to Build Your Cybersecurity Capabilities?
          </h2>
          <p className="text-charcoal-300 text-base sm:text-lg mb-8 leading-relaxed">
            Join passionate NTU students in hands-on offensive & defensive labs, 
            participate in nationwide CTFs, and gain practical technical mentorship.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact#join"
              className="px-6 py-3.5 rounded-xl bg-brand-600 text-white font-medium text-base hover:bg-brand-500 transition-colors shadow-md"
            >
              Submit Membership Application
            </Link>
            <Link
              href="/resources"
              className="px-6 py-3.5 rounded-xl bg-charcoal-800 text-charcoal-200 border border-charcoal-700 font-medium text-base hover:bg-charcoal-700 transition-colors"
            >
              Access Study Roadmaps
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
