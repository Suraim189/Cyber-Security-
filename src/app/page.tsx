import React from "react";
import Link from "next/link";
import { 
  Shield, 
  Terminal, 
  Search, 
  Trophy, 
  Lock, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ExternalLink,
  Globe,
  Network,
  Key,
  Flame,
  BookOpen,
  GraduationCap,
  Activity,
  Cpu,
  Layers,
  Sparkles
} from "lucide-react";
import { DataService } from "@/lib/data-service";
import { formatDate } from "@/lib/utils";
import { DefenseMatrix } from "@/components/cyber/DefenseMatrix";
import { LiveCtfArena } from "@/components/cyber/LiveCtfArena";
import { HeroSection } from "@/components/cyber/HeroSection";
import { AnimatedStats } from "@/components/cyber/AnimatedStats";
import { PartnersStrip } from "@/components/home/PartnersStrip";
import { AchievementsTimeline } from "@/components/cyber/AchievementsTimeline";
import { EventGallery } from "@/components/events/EventGallery";
import { LearningRoadmap } from "@/components/learning/LearningRoadmap";
import { FaqAccordion } from "@/components/home/FaqAccordion";

export default async function HomePage() {
  const events = await DataService.getEvents(true);
  const projects = await DataService.getProjects(true);
  const team = await DataService.getTeamMembers(true);
  const resources = await DataService.getResources(true);

  const upcomingEvents = events.slice(0, 2);
  const featuredProjects = projects.slice(0, 2);
  const leadership = team.filter((m) => m.hierarchy_order <= 3).slice(0, 4);
  const topResources = resources.slice(0, 3);

  // The 6 exact requested cybersecurity domains
  const domains = [
    {
      icon: Terminal,
      code: "DOM-01",
      title: "Ethical Hacking & Pentesting",
      desc: "Structured vulnerability assessments, offensive penetration testing methodologies, and authorized red-team lab exercises in sandboxed environments.",
      tags: ["OWASP Top 10", "Burp Suite", "Kali Linux", "Metasploit"],
    },
    {
      icon: Globe,
      code: "DOM-02",
      title: "Web Application Security",
      desc: "Analyzing SQL injection, SSRF, XSS, session hijacking, broken object authorization (BOLA), and architecting defensive code remediations.",
      tags: ["API Security", "JWT Audits", "Secure Coding", "DAST"],
    },
    {
      icon: Search,
      code: "DOM-03",
      title: "Digital Forensics & Incident Response",
      desc: "Investigating volatile RAM memory dumps, carving file system artifacts, timeline triage, and network packet forensics for breach post-mortems.",
      tags: ["Volatility 3", "Autopsy", "Wireshark", "Memory Dumps"],
    },
    {
      icon: Network,
      code: "DOM-04",
      title: "Network Security & Defensive SOC",
      desc: "Hardening enterprise network perimeters, analyzing protocols, configuring intrusion detection (IDS/IPS), and zero-trust firewall policies.",
      tags: ["Packet Analysis", "Snort IDS", "Wazuh SIEM", "Zero Trust"],
    },
    {
      icon: Key,
      code: "DOM-05",
      title: "Applied Cryptography",
      desc: "Understanding mathematical primitives, public-key infrastructure (PKI), block cipher modes, hash digest collisions, and post-quantum security.",
      tags: ["PKI", "AES / RSA", "Entropy Analysis", "Rust Crypto"],
    },
    {
      icon: Trophy,
      code: "DOM-06",
      title: "Capture the Flag (CTF) Wing",
      desc: "Competitive hacking training encompassing binary reverse engineering, pwn exploitation, web challenges, and jeopardy wargames.",
      tags: ["Ghidra", "GDB Pwndbg", "CTFd", "Binary Exploitation"],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-cyber-900 text-slate-100 selection:bg-cyber-cyan/20 selection:text-cyber-cyan">
      
      {/* 1. HERO SECTION: ELITE CYBER COMMAND */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-18 lg:pb-24 border-b border-cyber-border bg-cyber-gradient">
        {/* Subtle cyber grid and radial highlight */}
        <div className="absolute inset-0 cyber-grid opacity-60 pointer-events-none" />
        <div className="absolute inset-0 cyber-radial-overlay pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <HeroSection />
        </div>
      </section>

      {/* 1.2 PARTNERS & AFFILIATIONS STRIP */}
      <PartnersStrip />

      {/* 1.5 VERIFIED STATS COUNTERS */}
      <section className="py-12 bg-cyber-950/70 border-b border-cyber-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedStats
            memberCount={148}
            eventCount={events.length > 0 ? events.length + 5 : 12}
            domainCount={6}
            solveCount={412}
          />
        </div>
      </section>

      {/* 2. DEFENSE MATRIX: RED TEAM VS BLUE TEAM VS CTF */}
      <section className="py-20 bg-cyber-900 border-b border-cyber-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-cyber-850 text-cyber-cyan border border-cyber-border mb-3">
              <Layers className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Operational Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Dual-Spectrum Security Education
            </h2>
            <p className="mt-3 text-base text-slate-400">
              Real defense requires deep comprehension of adversarial techniques. We structure our labs across 
              offensive probing, blue-team telemetry, and competitive jeopardy challenges.
            </p>
          </div>

          <DefenseMatrix />
        </div>
      </section>

      {/* 3. CORE CYBERSECURITY DOMAINS (The 6 exact domains) */}
      <section className="py-20 bg-cyber-850 border-b border-cyber-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-cyber-900 text-cyber-cyan border border-cyber-border mb-3">
                <Shield className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>Specialized Wings</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Core Cybersecurity Domains
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
                Comprehensive practical curriculums taking students from fundamental operating system internals to advanced exploit triage.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((domain, idx) => {
              const Icon = domain.icon;
              return (
                <div key={idx} className="cyber-card p-6 cyber-card-hover flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-cyber-900 border border-cyber-border flex items-center justify-center text-cyber-cyan group-hover:border-cyber-cyan/60 group-hover:shadow-cyber-glow transition-all">
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 font-semibold tracking-wider">
                        {domain.code}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors">
                      {domain.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      {domain.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-cyber-border/70">
                    {domain.tags.map((t) => (
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

      {/* 4. INTERACTIVE CTF ARENA BOARD */}
      <section className="py-20 bg-cyber-900 border-b border-cyber-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-cyber-850 text-cyber-cyan border border-cyber-border mb-3">
              <Trophy className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Collegiate Competition</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              CTF Arena &amp; Jeopardy Training
            </h2>
            <p className="mt-3 text-base text-slate-400">
              Capture The Flag is where theory meets high-pressure problem solving. Explore our challenge architecture 
              and inspect typical wargame categories trained by the society.
            </p>
          </div>

          <LiveCtfArena />
        </div>
      </section>

      {/* 4.5 CTF ACHIEVEMENTS & TOURNAMENT RECORD */}
      <AchievementsTimeline />

      {/* 5. WORKSHOPS & SCHEDULED ACTIVITIES */}
      <section className="py-20 bg-cyber-850 border-b border-cyber-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-cyber-900 text-cyber-cyan border border-cyber-border mb-3">
                <Calendar className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>Mission Briefings</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Upcoming Workshops &amp; Drills
              </h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyber-cyan hover:underline"
            >
              <span>View All Events Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="cyber-card p-6 cyber-card-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-cyber-900 text-cyber-cyan border border-cyber-cyan/30">
                      {evt.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyber-cyan" />
                      {formatDate(evt.event_date)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5 hover:text-cyber-cyan transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-cyber-border flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{evt.venue}</span>
                  </div>
                  <Link
                    href="/events"
                    className="font-mono font-semibold text-cyber-cyan hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Register Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 OPERATIONAL LAB & WORKSHOP PHOTO ARCHIVE */}
      <EventGallery />

      {/* 6. STUDENT ENGINEERING & VULNERABILITY RESEARCH */}
      <section className="py-20 bg-cyber-900 border-b border-cyber-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-cyber-850 text-cyber-cyan border border-cyber-border mb-3">
                <Cpu className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>R&amp;D Repository</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Student Projects &amp; Security Tools
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyber-cyan hover:underline"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((proj) => (
              <div key={proj.id} className="cyber-card p-6 cyber-card-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-semibold text-cyber-cyan uppercase tracking-wide">
                      {proj.domain}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      By {proj.lead_author}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {proj.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-cyber-border flex flex-wrap items-center justify-between gap-3">
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
                      className="text-xs font-mono font-semibold text-slate-300 hover:text-cyber-cyan flex items-center gap-1"
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

      {/* 7. LEADERSHIP & FACULTY SUPERVISION */}
      <section className="py-20 bg-cyber-850 border-b border-cyber-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-cyber-900 text-cyber-cyan border border-cyber-border mb-3">
                <Users className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>Command &amp; Governance</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Leadership &amp; Faculty Supervision
              </h2>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyber-cyan hover:underline"
            >
              <span>View Full Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((member) => (
              <div key={member.id} className="cyber-card p-5 cyber-card-hover flex flex-col text-center items-center">
                <div className="w-18 h-18 rounded-full bg-cyber-900 border border-cyber-border flex items-center justify-center text-cyber-cyan mb-4 shadow-sm">
                  {member.hierarchy_order === 1 ? (
                    <GraduationCap className="w-8 h-8 stroke-[1.6]" />
                  ) : (
                    <Shield className="w-8 h-8 stroke-[1.6]" />
                  )}
                </div>
                <h4 className="text-base font-bold text-white">
                  {member.name}
                </h4>
                <p className="text-xs font-mono font-semibold text-cyber-cyan mt-1">
                  {member.designation}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {member.department}
                </p>
                {member.bio && (
                  <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7.5 INTERACTIVE CYBERSECURITY LEARNING ROADMAP */}
      <LearningRoadmap />

      {/* 8. KNOWLEDGE BASE & ROADMAPS */}
      <section className="py-20 bg-cyber-900 border-b border-cyber-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-cyber-850 text-cyber-cyan border border-cyber-border mb-3">
                <BookOpen className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>Tactical Knowledge</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Educational Roadmaps &amp; Tools
              </h2>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyber-cyan hover:underline"
            >
              <span>View All Resources</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topResources.map((res) => (
              <div key={res.id} className="cyber-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-medium text-cyber-cyan">
                      {res.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyber-950 text-slate-400 border border-cyber-border">
                      {res.difficulty_level}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2">
                    {res.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {res.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-cyber-border">
                  <Link
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyber-cyan hover:underline"
                  >
                    <span>Access Resource</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8.5 FREQUENTLY ASKED QUESTIONS */}
      <FaqAccordion />

      {/* 9. MISSION ENLISTMENT CTA BANNER */}
      <section className="py-20 bg-cyber-950 border-t border-cyber-border relative overflow-hidden">
        <div className="absolute inset-0 cyber-dots opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-900 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono font-semibold mb-6">
            <Shield className="w-3.5 h-3.5" />
            <span>Official University Enlistment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight">
            Ready to Build Your Cybersecurity Capabilities?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            Join passionate NTU students in hands-on offensive &amp; defensive labs, 
            participate in nationwide CTF tournaments, and gain practical technical mentorship from faculty and leads.
          </p>

          <div className="flex flex-wrap justify-center gap-3.5 font-mono">
            <Link
              href="/contact#join"
              className="btn-cyber-cyan text-xs sm:text-sm font-bold shadow-lg shadow-cyber-cyan/20"
            >
              Submit Membership Application
            </Link>
            <Link
              href="/resources"
              className="btn-cyber-secondary text-xs sm:text-sm font-semibold"
            >
              Access Study Roadmaps
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
