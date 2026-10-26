import React from "react";
import Link from "next/link";
import { 
  Shield, 
  Target, 
  Eye, 
  Award, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";

export const metadata = {
  title: "About the Society",
  description: "Learn about the mission, vision, ethical principles, and academic supervision of the NTU Cyber Security Society.",
};

export default function AboutPage() {
  const coreValues = [
    {
      title: "Ethical Responsibility",
      desc: "Every skill taught—from network packet inspection to exploit theory—is grounded in legal authorization, academic integrity, and responsible disclosure.",
    },
    {
      title: "Technical Excellence",
      desc: "We focus on rigorous, deep technical competence rather than superficial tool usage, emphasizing fundamentals in operating systems, networking, and code analysis.",
    },
    {
      title: "Collaborative Learning",
      desc: "Senior students mentor junior peers, sharing notes, walkthroughs, and lab tutorials to elevate the overall cybersecurity readiness of NTU students.",
    },
    {
      title: "Community Defense",
      desc: "Our mission extends beyond competitions to fostering general cyber hygiene and awareness for university faculty, staff, and regional organizations.",
    },
  ];

  const milestones = [
    {
      year: "Establishment",
      title: "Founding under Department of Computer Science",
      desc: "Formed as the premier student-led technical body dedicated to cybersecurity education and research at National Textile University, Faisalabad.",
    },
    {
      year: "Expansion",
      title: "Launch of Dedicated Hands-On Lab Sessions",
      desc: "Instituted regular hands-on workshops in web security, Linux internals, network penetration testing, and digital forensics.",
    },
    {
      year: "Competitiveness",
      title: "CTF Team Formation & National Participation",
      desc: "Assembled competitive university CTF teams representing NTU in nationwide collegiate competitions and online global wargames.",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Header Banner */}
      <section className="bg-white border-b border-surface-border py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-50 text-brand-700 text-xs font-mono font-medium border border-brand-200">
              <span>National Textile University, Faisalabad</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-charcoal-900 leading-tight">
              About NTU Cyber Security Society
            </h1>
            <p className="text-lg text-charcoal-600 leading-relaxed">
              We are a community of student researchers, ethical hackers, and defensive architects 
              dedicated to advancing digital resilience and technical security mastery.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="surface-card p-8 border-brand-200 bg-white">
            <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700 mb-6">
              <Target className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal-900 mb-3">Our Mission</h2>
            <p className="text-charcoal-600 leading-relaxed text-sm sm:text-base">
              To cultivate an elite, responsible, and skilled community of cybersecurity practitioners 
              at National Textile University by providing hands-on lab environments, research guidance, 
              industry seminars, and competitive wargame preparation.
            </p>
          </div>

          <div className="surface-card p-8 border-charcoal-200 bg-white">
            <div className="w-12 h-12 rounded-xl bg-charcoal-100 flex items-center justify-center text-charcoal-800 mb-6">
              <Eye className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal-900 mb-3">Our Vision</h2>
            <p className="text-charcoal-600 leading-relaxed text-sm sm:text-base">
              To position National Textile University as a distinguished hub for cybersecurity research, 
              threat intelligence analysis, and defensive engineering across Pakistan, producing graduates 
              who lead modern enterprise security programs.
            </p>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white border-y border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-xs font-mono uppercase tracking-wider text-brand-700 font-semibold mb-2">
              Foundational Principles
            </h2>
            <h3 className="text-3xl font-bold text-charcoal-900">
              The Values That Direct Our Practice
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((v, i) => (
              <div key={i} className="p-6 rounded-xl border border-charcoal-200 bg-surface-muted">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-700 flex-shrink-0" />
                  <h4 className="text-lg font-bold text-charcoal-900">{v.title}</h4>
                </div>
                <p className="text-sm text-charcoal-600 leading-relaxed pl-8">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Faculty Oversight */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="surface-card p-8 sm:p-12 border-charcoal-200 bg-white flex flex-col md:flex-row gap-8 items-center">
          <div className="w-20 h-20 rounded-2xl bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-10 h-10 stroke-[1.5]" />
          </div>
          <div className="space-y-3 flex-1">
            <div className="text-xs font-mono uppercase tracking-wider text-brand-700 font-semibold">
              Academic Supervision
            </div>
            <h3 className="text-2xl font-bold text-charcoal-900">
              Department of Computer Science Oversight
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              The NTU Cyber Security Society functions under the official patronage and mentorship of the 
              Department of Computer Science at National Textile University, Faisalabad. 
              All lab activities, curriculum workshops, and public events adhere strictly to academic 
              governance and state cybersecurity regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Milestones / Journey */}
      <section className="py-16 bg-surface-muted border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-xs font-mono uppercase tracking-wider text-brand-700 font-semibold mb-2">
              Our Trajectory
            </h2>
            <h3 className="text-3xl font-bold text-charcoal-900">
              Milestones & Continuing Growth
            </h3>
          </div>

          <div className="space-y-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="surface-card p-6 flex flex-col sm:flex-row gap-6 items-start">
                <div className="px-3 py-1.5 rounded bg-brand-50 border border-brand-200 text-brand-700 font-mono text-xs font-semibold whitespace-nowrap">
                  {m.year}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-charcoal-900 mb-1">{m.title}</h4>
                  <p className="text-sm text-charcoal-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Join CTA */}
          <div className="mt-12 text-center pt-8 border-t border-charcoal-200">
            <Link
              href="/contact#join"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-700 text-white font-medium text-sm hover:bg-brand-800 transition-colors shadow-sm"
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
