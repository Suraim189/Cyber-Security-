"use client";

import React, { useRef, useState } from "react";
import {
  Mail,
  Linkedin,
  Github,
  Shield,
  Terminal,
  Trophy,
  Cpu,
  Award,
  ExternalLink,
  Target,
  Box,
} from "lucide-react";
import { TeamMember, SecurityWing } from "@/lib/types";

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / (width / 2);
    const y = (clientY - (top + height / 2)) / (height / 2);

    // Limit tilt to 7 degrees
    setRotateX(-y * 7);
    setRotateY(x * 7);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const getWingBadge = (wing?: SecurityWing) => {
    switch (wing) {
      case "Red Team":
        return {
          label: "RED TEAM // OFFENSIVE",
          style: "bg-red-500/10 text-amber-400 border-amber-500/30",
          icon: Terminal,
        };
      case "Blue Team":
        return {
          label: "BLUE TEAM // DEFENSE",
          style: "bg-blue-500/10 text-cyber-cyan border-cyber-cyan/30",
          icon: Shield,
        };
      case "CTF":
        return {
          label: "CTF // WARGAMES",
          style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
          icon: Trophy,
        };
      case "Advisor":
        return {
          label: "PATRON // ACADEMIC",
          style: "bg-purple-500/10 text-purple-300 border-purple-500/30",
          icon: Shield,
        };
      default:
        return {
          label: "EXECUTIVE COUNCIL",
          style: "bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/30",
          icon: Cpu,
        };
    }
  };

  const wingData = getWingBadge(member.wing);
  const WingIcon = wingData.icon;

  // Fallback avatar initials
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="bento-card flex flex-col justify-between group h-full select-none"
    >
      <div>
        {/* Card Header with Wing Tag & Member ID */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold border ${wingData.style}`}
          >
            <WingIcon className="w-3.5 h-3.5" />
            <span>{wingData.label}</span>
          </span>
          <span className="text-[10px] font-mono text-slate-500">
            NTU-SEC-{member.id.toUpperCase()}
          </span>
        </div>

        {/* Portrait & Core Bio */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-cyber-border group-hover:border-cyber-cyan/60 flex-shrink-0 bg-cyber-950 shadow-md">
            {/* Shimmer skeleton while loading */}
            {!imgLoaded && !imgError && member.image_url && (
              <div className="absolute inset-0 bg-cyber-900 animate-pulse flex items-center justify-center">
                <span className="text-[10px] font-mono text-slate-600">LOADING</span>
              </div>
            )}

            {member.image_url && !imgError ? (
              <img
                src={member.image_url}
                alt={member.name}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
              />
            ) : (
              /* Stylized Fallback Avatar with Gradient and Initials */
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-cyber-900 via-cyber-850 to-blue-950 text-cyber-cyan font-bold font-mono text-xl border border-cyber-cyan/30 shadow-inner">
                <span>{initials}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan mt-1 animate-pulse" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white group-hover:text-cyber-cyan transition-colors truncate">
              {member.name}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-cyber-cyan font-mono mt-0.5">
              {member.designation}
            </p>
            <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">
              {member.department}
            </p>

            {/* Certifications Row */}
            {member.certifications && member.certifications.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {member.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-medium bg-cyber-950 text-amber-300 border border-amber-500/30"
                  >
                    <Award className="w-2.5 h-2.5" />
                    <span>{cert}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Narrative */}
        {member.bio && (
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
            {member.bio}
          </p>
        )}

        {/* Technical Skills Badges */}
        {member.skills && member.skills.length > 0 && (
          <div className="mb-4 pt-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1.5">
              Specialized Skills:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyber-900/90 text-slate-300 border border-cyber-border hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Social & CTF Profiles Bar */}
      <div className="pt-3 border-t border-cyber-border/80 flex items-center justify-between text-xs font-mono">
        <span className="text-[11px] text-slate-400">Profiles &amp; Dossier</span>
        <div className="flex items-center gap-1.5">
          {member.tryhackme_url && (
            <a
              href={member.tryhackme_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-red-400 hover:text-white hover:bg-red-950/60 transition-colors border border-transparent hover:border-red-500/40"
              title="TryHackMe Profile"
            >
              <Target className="w-3.5 h-3.5" />
            </a>
          )}
          {member.hackthebox_url && (
            <a
              href={member.hackthebox_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-950/60 transition-colors border border-transparent hover:border-emerald-500/40"
              title="HackTheBox Profile"
            >
              <Box className="w-3.5 h-3.5" />
            </a>
          )}
          {member.github_url && (
            <a
              href={member.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-cyber-950 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
          {member.linkedin_url && (
            <a
              href={member.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyber-cyan hover:bg-cyber-950 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-cyber-950 transition-colors"
              title="Encrypted Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
