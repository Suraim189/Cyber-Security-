"use client";

import React, { useState, useEffect, useRef } from "react";
import { Users, Calendar, Trophy, ShieldCheck, Terminal, Flame } from "lucide-react";

interface StatItem {
  label: string;
  sublabel: string;
  value: number;
  suffix?: string;
  icon: React.ElementType;
  accent: string;
}

interface AnimatedStatsProps {
  memberCount?: number;
  eventCount?: number;
  domainCount?: number;
  solveCount?: number;
}

export function AnimatedStats({
  memberCount = 142,
  eventCount = 8,
  domainCount = 6,
  solveCount = 385,
}: AnimatedStatsProps) {
  const [counts, setCounts] = useState({
    members: 0,
    events: 0,
    domains: 0,
    solves: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800; // ms
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setCounts({
              members: Math.floor(easeProgress * memberCount),
              events: Math.floor(easeProgress * eventCount),
              domains: Math.floor(easeProgress * domainCount),
              solves: Math.floor(easeProgress * solveCount),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts({
                members: memberCount,
                events: eventCount,
                domains: domainCount,
                solves: solveCount,
              });
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, memberCount, eventCount, domainCount, solveCount]);

  const stats: StatItem[] = [
    {
      label: "Active Student Members",
      sublabel: "Across CS, SE & AI Departments",
      value: counts.members,
      suffix: "+",
      icon: Users,
      accent: "text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/10",
    },
    {
      label: "Hands-on Operations",
      sublabel: "Workshops, Drills & Seminars",
      value: counts.events,
      suffix: "+",
      icon: Calendar,
      accent: "text-cyber-blue border-cyber-blue/30 bg-cyber-blue/10",
    },
    {
      label: "Specialized Wings",
      sublabel: "Red, Blue, CTF & Cryptography",
      value: counts.domains,
      suffix: "",
      icon: ShieldCheck,
      accent: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    },
    {
      label: "Wargame Flag Solves",
      sublabel: "Intra-University Jeopardy Arena",
      value: counts.solves,
      suffix: "+",
      icon: Trophy,
      accent: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 font-mono"
    >
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bento-card flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`p-2.5 rounded-xl border ${stat.accent}`}>
                <Icon className="w-5 h-5" />
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                VERIFIED METRIC
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1 flex items-baseline">
                <span>{stat.value.toLocaleString()}</span>
                {stat.suffix && <span className="text-cyber-cyan ml-0.5">{stat.suffix}</span>}
              </div>
              <h4 className="text-sm font-bold text-slate-200 font-sans tracking-normal">
                {stat.label}
              </h4>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                {stat.sublabel}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
